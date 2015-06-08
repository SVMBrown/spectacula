class AddOrderToGamePlayer < ActiveRecord::Migration
  def change
    add_column :game_players, :order, :integer
  end
end
