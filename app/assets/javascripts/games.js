var Tile = React.createClass({displayName: "Tile",
  render: function () {
    return( React.createElement("td", null, " ", this.props.x + ", " + this.props.y, " "))
  }
});

var Board = React.createClass({displayName: "Board",
    render: function () {
        var rows = [];
        for(var y = 0; y < 8; y++) {
          rows.push((function (y) {
            var row = [];
            for(var x = 0; x < 8; x++) {
              row.push(React.createElement(Tile, {x: x, y: y}));
            }
            return (React.createElement("tr", null, " ", row, " "));
          })(y));
        }
        return (
            React.createElement("table", null, React.createElement("tbody", null, rows))
        );
    }
});
var setupWS = function (ws) {

  ws.onmessage = function(e) {
    console.log(e);
    $('#log').append(e.data + "\n");
    $('#msg').prop('disabled', false);
    $('#submit').prop('disabled', false);
    $('#msg').val('');
  };
  $("body").on('submit', "form", function(e) {
    var move = $('#msg').val();
    ws.send(move);
    $('#msg').prop('disabled', true);
    $('#submit').prop('disabled', true);
    e.preventDefault();
  });
}
var ready = function () {
  var body = document.getElementsByTagName('body')[0];
  if(body.classList.contains('games') && body.classList.contains('show')) {
    var ws = new WebSocket("ws://" + window.location.host + "/games/" + $('#container').data('game-id') + "/play");
    setupWS(ws);
    React.render(React.createElement(Board, null), $('div#container')[0]);
  }
}
$(document).ready(ready);
