var commitMessage = function(moves) {
  var msg = {};
  msg.name = "commit";
  msg.type = "commit";
  msg.moves = moves;
  return JSON.stringify(msg);
}
var setupWS = function (ws) {
  ws.onmessage = function(e) {
    var message = JSON.parse(e.data);
    if(message.type === "setup" || message.type === "game state") {
      React.render(React.createElement(GameClient, {websocket: ws, players: message.players, round: message.round || 0, maxmoves: message.maxmoves, size: message.boardsize}), $('div#container')[0]);
    }
  };
  ws.addEventListener('message', function(e) {
    console.log(JSON.parse(e.data));
  })
}
var ready = function () {
  var body = document.getElementsByTagName('body')[0];
  if(body.classList.contains('games') && body.classList.contains('show')) {
    if(window.location.protocol === "https:") {
      var wsurl = "wss://" + window.location.host + "/games/" + $('#container').data('game-id') + "/play";
    } else {
      var wsurl = "ws://" + window.location.host + "/games/" + $('#container').data('game-id') + "/play";
    }
    var ws = new WebSocket(wsurl);
    setupWS(ws);
  }
}
$(document).ready(ready);
$(document).on('page:load', ready);
