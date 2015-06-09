var Board = React.createClass({
    getDefaultProps: function() {
      return {
        emptyStyle: {color: 'black'},
        collisionStyle: {color: 'red'}
      }
    },
    getStyleFor: function (x, y) {
      var empty = this.props.emptyStyle;
      var collision = this.props.collisionStyle;
      var occupants = this.props.players.filter(function(elem){return(elem.position.x === x && elem.position.y === y)});
      if(occupants.length === 0) {
        return empty;
      } else if (occupants.length === 1) {
        return occupants[0].style;
      } else {
        return collision;
      }
    },
    render: function () {
        var rows = [];
        var that = this;
        for(var y = 0; y < 8; y++) {
          rows.push((function (y) {
            var row = [];
            for(var x = 0; x < 8; x++) {
              row.push(<Tile {...that.props} key={x} x={x} y={y} style={that.getStyleFor(x, y)} />);
            }
            return (<tr key={y}>{row}</tr>);
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
