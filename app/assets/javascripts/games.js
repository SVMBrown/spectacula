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
var ready = function () {
  React.render(React.createElement(Board, null), $('div#container')[0]);
}
$(document).ready(ready);
