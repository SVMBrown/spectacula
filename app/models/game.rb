class Game < ActiveRecord::Base
  has_many :game_players
  has_many :players, through: :game_players
  def set_players(players)
    players.each do |p|
      GamePlayer.create(player_id: p.id, game_id: id)
    end
  end
  def add_player(player)
    GamePlayer.where(player_id: player.id, game_id: id).take || GamePlayer.create(player_id: player.id, game_id: id)
  end
  def open
    players.count < (capacity || 0)
  end
  def active
    !(open || winner_id)
  end
end
