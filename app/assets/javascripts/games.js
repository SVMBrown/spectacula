var messageObject = function(str, moves) {
  var msg = {};
  if(str === "commit") {
    msg.name = "commit";
    msg.type = "commit";
    msg.moves = moves;
  }
  return JSON.stringify(msg);
}
var setupWS = function (ws) {
  ws.onmessage = function(e) {
    console.log(e);
  };
}
var ready = function () {
  var body = document.getElementsByTagName('body')[0];
  if(body.classList.contains('games') && body.classList.contains('show')) {
    var ws = new WebSocket("wss://" + window.location.host + "/games/" + $('#container').data('game-id') + "/play");
    setupWS(ws);
    React.render(React.createElement(GameClient, {websocket: ws}), $('div#container')[0]);
  }
}
$(document).ready(ready);
$(document).on('page:load', ready);
