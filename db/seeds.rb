# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
20.times do
  User.create!(handle: Faker::Internet.user_name, email: Faker::Internet.email, password: "testuser", password_confirmation: "testuser")
end
50.times do
  Game.create!
end
Game.all.each do |game|
  2.times do
    GamePlayer.create!(player_id: User.all.sample.id, game_id: game.id)
  end
  game.winner_id = game.players.sample.id
  game.save!
end
