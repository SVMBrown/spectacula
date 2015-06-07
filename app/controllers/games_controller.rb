class GamesController < ApplicationController
  include Tubesock::Hijack
  $sockets = []
  def new
    puts "entered Game#new"
    openGames = Game.all.select{|g| g && g.open}

    @game = openGames.length >= 1 ? openGames.first : Game.create(capacity: 2)
    if(openGames.length >= 1)
      puts "Selected game #{@game.id}"
    else
      puts "Created game #{@game.id}"
    end

    @game.add_player(current_user)
    puts "added player"
    redirect_to game_path(@game)
  end

  def show
    puts "entered Game#show"
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
          if @game.state
            broadcast(@game.state)
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
        puts message
        if message["type"] == "commit"
          puts "commit"
          record_move(message["moves"])
          check_for_round(tube)
        elsif message["type"] == "game state"
          unless @game.state && JSON.parse(@game.state)["round"].to_i > message["round"].to_i
            @game.update(state: JSON.generate(message))
          end
        end
      end

      tube.onclose do
        if $sockets[params[:id].to_i]
          broadcast(JSON.generate({name: "#{current_user.handle} joined the channel."}))
          $sockets[params[:id].to_i].delete(current_user.id)
        end
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
    JSON.generate({"type" => "round", "name" => "round message", "roundQueue" => round, "gameState" => JSON.parse(Game.find(params[:id]).state)})
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
