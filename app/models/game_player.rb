class GamePlayer < ActiveRecord::Base
  belongs_to :game
  belongs_to :player, class_name: 'User'
end
