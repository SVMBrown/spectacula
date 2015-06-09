# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
20.times do
  @user = User.new(handle: Faker::Internet.user_name, email: Faker::Internet.email, password: "testuser", password_confirmation: "testuser")
  if User.find_by(handle: @user.handle) && User.find_by(email: @user.email)
    @user.save
  end
end
200.times do
  players = User.all.sample(rand(2..6))
  g = Game.create!(winner_id: players.sample.id)
  g.set_players(players)
end
50.times do
  Article.create(title: Faker::Lorem.sentence, body: Faker::Lorem.paragraph(6, true, 4))
end

