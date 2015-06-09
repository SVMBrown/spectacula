class LeaderboardController < ApplicationController
  def index
    @users=User.all.sort_by{|user| user.win_rate}.reverse!
   
  end

  def show
  end
end
