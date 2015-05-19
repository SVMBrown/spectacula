class User < ActiveRecord::Base
  authenticates_with_sorcery!
  validates :email, :handle, uniqueness: true, presence: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true
  has_many :game_players
  has_many :games, through: :game_players
end
