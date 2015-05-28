# Spectacula
## About

## To - Do
### functional game prototype
i.e. 2 ppl and murder
* board rendering, i.e. loading image of blank tile and each player
* rudimentary control scheme
* win condition checking
* move sorting/handling
  * consider making it only one move per round for now
* Matchmaking/game creation/termination

This will be handled by Scot(game logic/networking) and Cody(visuals/animations)

### Navigation bar
* display session info (logged in as: logout/ log in sign up)
* Link to:
  * Game#new ***
  * Rules#index
  * Leaderboard#index ***

Ashleigh will handle this

### Landing page (w/ responsive routing/redirects)
Minimal for now
* link to login/signup
* only appear if current_user == nil
  * i.e. should be our root, but have a redirect on it if current_user
* consider changing bg if time allows
  * very low priority esp. for tmw
Ashleigh will handle this

### Reactify Leaderboards
Lower priority, but would still be nice
* Fix table headers
* Extra Features
  * Searching
  * Sorting
  * Filtering
* populate state via AJAX to UsersController

### User#Show
* View profile page (maybe edit too)

### User Avatar
* Implement avatars similar to crowdfunder
* include default image for legacy data/inept users
* account specific

### Misc.
* cleaning up sorcery authentication (i.e. login if page not accessible)
