class User < ActiveRecord::Base
  authenticates_with_sorcery!



  validates :email, :handle, uniqueness: true, presence: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true
  has_many :game_players, foreign_key: :player_id
  has_many :games, through: :game_players
  has_many :authored_comments, foreign_key: :author_id, class_name: "Comment"
  has_many :recieved_comments, foreign_key: :subject_id, class_name: "Comment"

  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100#" }, :default_url => "/images/:style/missing.png"


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
