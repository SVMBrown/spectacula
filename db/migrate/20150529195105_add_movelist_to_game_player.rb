class AddMovelistToGamePlayer < ActiveRecord::Migration
  def change
    add_column :game_players, :movelist, :text
  end
end
