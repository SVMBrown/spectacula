class GamesController < ApplicationController
  include Tubesock::Hijack

  def new
    puts "entered Controller"
    openGames = [] || Game.all.select{|g| g && g.open}

    @game = openGames.length >= 1 ? openGames.first : Game.create(capacity: 1)
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
    hijack do |tube|
      tube.onopen do
        tube.send_data(JSON.generate({type: "log", name: "#{current_user.handle} joined the channel."}))
        unless @game.open
          tube.send_data(JSON.generate({type: "setup",
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
        tube.send_data(JSON.generate({name: "GAME OVER"}))
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
      tube.send_data generate_round(gameplayers)
      reset_moves(gameplayers)
    end
  end
  def reset_moves(gameplayers)
    gameplayers.each do |gp|
      gp.update(movelist: nil)
    end
  end
end
