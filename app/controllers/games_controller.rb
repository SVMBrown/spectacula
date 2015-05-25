class GamesController < ApplicationController
  skip_before_filter :login
  def show
    @game = Game.find(params[:id])
  end
end
