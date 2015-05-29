class GamesController < ApplicationController
  include Tubesock::Hijack

  skip_before_filter :login
  def new
    @game = Game.all.select {|game| game.open }.first || Game.create(capacity: 2)
    @game.add_player(current_user)
    redirect_to game_path(@game)
  end

  def show
    @game = Game.find(params[:id])
  end

  def play
    @game = Game.find(params[:id])
    hijack do |tube|
      tube.onopen do
        tube.send_data(JSON.generate({name: "BEGIN"}))
      end

      tube.onmessage do |data|
        gp = GamePlayer.all.where("player_id = #{current_user.id} AND game_id = #{@game.id}").first
        gp.set_move_list data
        tube.send_data(JSON.generate({name: "Accepted move"}))
        if @game.game_players.all? {|gameplayer| gameplayer.movelist }
          tube.send_data(generate_round(game.game_players.map {|gp| JSON.generate(gp.movelist)[:data]})
          @game.game_players.each {|gameplayer| gameplayer.movelist = nil }
        end
      end

      tube.onclose do
        tube.send_data(JSON.generate({name: "GAME OVER"}))
      end
    end
  end
private
  def generate_round(lists)
    moveQueue = []
    until lists.all?{|list| list.empty? } do
      round = []
      lists.each do |l|
        round << l.pop
      end
      round.sort!
      moveQueue = round + moveQueue
    end
    moveQueue
  end
end
