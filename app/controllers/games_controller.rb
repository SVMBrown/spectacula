class GamesController < ApplicationController
  include Tubesock::Hijack
  $sockets = []
  def new
    @game = Game.new(capacity: 2)
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      @game.add_player(current_user)
      redirect_to game_path(@game)
    else
      render :new, alert: "game creation failed"
    end
  end

  def show
    puts "entered Game#show"
    @game = Game.find(params[:id])
  end

  def join
    openGames = Game.all.select{|g| g && g.open}
    if openGames.length >= 1
      @game = openGames.first
    else
      @game = Game.create(capacity: 2)
    end
    @game.add_player(current_user)
    if @game.open
      notice = "waiting for more players"
    else
      notice = "BEGIN"
    end
    redirect_to game_path(@game), notice: notice
  end

  def play
    @game = Game.find(params[:id])
    $sockets[params[:id].to_i] ||= {}
    hijack do |tube|
      tube.onopen do
        $sockets[params[:id].to_i].store(tube, current_user.id)
        broadcast(JSON.generate({type: "log", name: "#{current_user.handle} joined the channel."}))
        unless @game.open
          if @game.winner_id
            tube.send_data(JSON.generate({type: "winner", winner: User.find(@game.winner_id).handle}))
          elsif @game.state
            tube.send_data(@game.state)
          else
            broadcast(JSON.generate({type: "setup",
              players: @game.players.sort_by { |e| e.game_players.where(game_id: params[:id]).first.order }.map{|p| p.handle},
              maxmoves: 4,
              boardsize: 8}))
          end
        end

      end

      tube.onmessage do |data|
        message = JSON.parse(data)
        if message["type"] == "winner"
          broadcast(JSON.generate(message))
          @game.update(winner_id: @game.players.find_by(handle: message["winner"]).id) unless @game.winner_id
          notice = "#{User.find(@game.winner_id).handle} won!"
        elsif message["type"] == "commit"
          record_move(message["moves"])
          check_for_round(tube)
        elsif message["type"] == "game state"
          if !@game.state || JSON.parse(@game.state)["round"].to_i < message["round"].to_i
            @game.update(state: JSON.generate(message))
          end
        end
      end

      tube.onclose do
        if $sockets[params[:id].to_i]
          broadcast(JSON.generate({name: "#{current_user.handle} left the channel."}))
          $sockets[params[:id].to_i].delete(tube)
        end
      end
    end
  end
private
  def game_params
    params.require(:game).permit(:capacity)
  end

  def generate_round(gameplayers)
    round = []
    moves = gameplayers.map do |gp|
      JSON.parse(gp.movelist).map do |move|
        move.store(:handle, gp.player.handle)
        move
      end
    end
    until moves.all? {|move| move.empty? }
      moves.each do |m|
        round.unshift m.pop
      end
    end
    puts "Sending #{round}"
    message = {"type" => round, "name" => "round message", "roundQueue" => round}
    message.store("gameState", JSON.parse(Game.find(params[:id]).state)) if Game.find(params[:id]).state
    JSON.generate({"type" => "round", "name" => "round message", "roundQueue" => round})
  end
  def record_move(obj)
    GamePlayer.where(player_id: current_user, game_id: params[:id]).take.update(movelist: JSON.generate(obj))
  end
  def check_for_round(tube)
    gameplayers = GamePlayer.where(game_id: params[:id])
    if gameplayers.all? {|gp| !!gp.movelist }
      broadcast generate_round(gameplayers)
      reset_moves(gameplayers)
    end
  end
  def reset_moves(gameplayers)
    gameplayers.each do |gp|
      gp.update(movelist: nil)
    end
  end
  def broadcast(message)
    $sockets[params[:id].to_i].each_key do |s|
      s.send_data(message)
    end
  end
end
