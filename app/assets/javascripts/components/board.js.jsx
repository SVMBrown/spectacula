var Board = React.createClass({
    playerAt: function (x, y) {
      occupants = this.props.players.filter(function(elem){return(elem.position.x === x && elem.position.y === y)});
      if(occupants.length === 0) {
        return 'white';
      } else if (occupants.length === 1) {
        return occupants[0].color;
      } else {
        return 'red';
      }
    },
    render: function () {
        var rows = [];
        var that = this;
        for(var y = 0; y < 8; y++) {
          rows.push((function (y) {
            var row = [];
            for(var x = 0; x < 8; x++) {
              row.push(<Tile x={x} y={y} occupant={that.playerAt(x, y)} />);
            }
            return (<tr>{row}</tr>);
          })(y));
        }
        return (
          <div>
            <table><tbody>{rows}</tbody></table>
            <MoveQueue {...this.props} />
          </div>
        );
    }
});
