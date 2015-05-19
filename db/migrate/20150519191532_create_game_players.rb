class CreateGamePlayers < ActiveRecord::Migration
  def change
    create_table :game_players do |t|
      t.integer :player_id
      t.integer :game_id
      t.timestamps null: false
    end
  end
end
