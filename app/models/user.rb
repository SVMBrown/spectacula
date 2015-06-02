class User < ActiveRecord::Base
  authenticates_with_sorcery!



  validates :email, :handle, uniqueness: true, presence: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true
  has_many :game_players, foreign_key: :player_id
  has_many :games, through: :game_players
  has_many :comments

  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100#" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def total_wins
    self.games.where.not(winner_id: nil).where(winner_id: self.id).count
  end

  def total_games
    self.games.where.not(winner_id: nil).count
  end

  def total_losses
    total_games - total_wins
  end

  def win_rate
    total_games != 0 ? total_wins / total_games.to_f : 0
  end
end

class Comment < ActiveRecord::Base
  belongs_to :user
end