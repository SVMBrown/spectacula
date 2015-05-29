class GamePlayer < ActiveRecord::Base
  belongs_to :game
  belongs_to :player, class_name: 'User'
  def set_move_list(jsonlist)
    self[:movelist] = jsonlist
    self.save
  end
end
