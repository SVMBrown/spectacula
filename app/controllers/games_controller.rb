class GamesController < ApplicationController
  include Tubesock::Hijack
  $sockets = []
  def new
    puts "entered Controller"
    openGames = Game.all.select{|g| g && g.open}

    @game = openGames.length >= 1 ? openGames.first : Game.create(capacity: 2)
    puts "Selected game #{@game.id}"
    @game.add_player(current_user)
    puts "added Player"
    redirect_to game_path(@game)
  end

  def show
    puts "show controller"
    @game = Game.find(params[:id])
  end

  def play
    @game = Game.find(params[:id])
    $sockets[params[:id].to_i] ||= {}
    hijack do |tube|
      tube.onopen do
        $sockets[params[:id].to_i].store(current_user.id, tube)
        broadcast(JSON.generate({type: "log", name: "#{current_user.handle} joined the channel."}))
        puts tube
        unless @game.open
          broadcast(JSON.generate({type: "setup",
            players: @game.players.map{|p| p.handle},
            maxmoves: 4,
            boardsize: 8}))
        end

      end

      tube.onmessage do |data|
        message = JSON.parse(data)
        puts message
        if message["type"] == "commit"
          puts "commit"
          record_move(message["moves"])
          check_for_round(tube)
        end
      end

      tube.onclose do
        $sockets[params[:id].to_i].delete(current_user.id)
        broadcast(JSON.generate({name: "#{current_user.handle} joined the channel."}))
      end
    end
  end
private
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
    $sockets[params[:id].to_i].each_value do |s|
      s.send_data(message)
    end
  end
end
