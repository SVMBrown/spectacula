class Game < ActiveRecord::Base
  has_many :game_players
  has_many :players, through: :game_players
  def set_players(players)
    players.each do |p|
      GamePlayer.create(player_id: p.id, game_id: id)
    end
  end
end
