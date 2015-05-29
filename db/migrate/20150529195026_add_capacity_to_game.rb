class AddCapacityToGame < ActiveRecord::Migration
  def change
    add_column :games, :capacity, :integer
  end
end
