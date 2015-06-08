# Spectacula
## About
kill friends
## To - Do
### functional game prototype
* move sorting
* Matchmaking e.g. game-creation vs. join in game#new (break out into game#create)
  * Super-Stretch: white-list players for game (i.e. invites)
* Style and improve hud
* make coords smaller and in top corner or something or a mouseover or table headings maybe make divs instead of table??
* Player sprites and attack animations
* Obstacles
* Player collision handling

This will be handled by Scot(game logic/networking) and Cody(visuals/animations)

### Navigation bar
* improve session info (maybe a nameplate or something and maybe limit handle length)
* more elaborate/thematic styling??
* drop dead links before prod/demo

### News Page
* Faker up dat newsfeed homes
* Maybe (if you hate yourself) link it up to github for dem patch notes (scot)

Ashleigh will handle this

### Landing page (w/ responsive routing/redirects)
Minimal for now
* article bg for readability
* only appear if current_user == nil
  * i.e. should be our root, but have a redirect on it if current_user
  * reliant on functional news/profile page
* consider changing bg if time allows
  * very low priority esp. for tmw

Ashleigh will handle this

### Reactify Leaderboards
Lower priority, but would still be nice
* Extra Features
  * Searching
  * Sorting
  * Filtering
* populate state via AJAX to UsersController or even websockets because fuck yeah! (but actually though just use react without that bs... GOGO FULL FRONTEND PAGE)

### User#Show
* Activate link in nav bar
* View profile page (maybe edit too)

#### User Avatar
* Implement avatars similar to crowdfunder
* include default image for legacy data/inept users
* account specific
* stop breaking user validations

### Misc.
* cleaning up sorcery authentication (i.e. login if page not accessible)
* consolidate singleton controllers into meaningful ones. (possibly info controller (for landing, rules, news etc...) NOT RESTFUL (I can show you how to do the things... I am pretty sure... I will test.))
* Cut dead views
* Fix leaderboard js
* move leaderboard to user#index
* create game history partial
  * for nested list of games on user#show
