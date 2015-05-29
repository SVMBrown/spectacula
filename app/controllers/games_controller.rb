class GamesController < ApplicationController
  include Tubesock::Hijack

  skip_before_filter :login
  $moves = []
  def show
    @game = Game.find(params[:id])
  end
  def play
    @game = Game.find(params[:id])
    hijack do |tube|
      tube.onopen do
        tube.send_data("BEGIN")
      end

      tube.onmessage do |data|
        $moves << data
        tube.send_data("Accepted move")
        if $moves.length >= @game.players.count
          tube.send_data("ROUND START")
          until $moves.empty? do
            tube.send_data($moves.pop)
          end
          tube.send_data("ROUND END")
        end
      end

      tube.onclose do
        tube.send_data("GAME OVER")
      end
    end
  end
end
