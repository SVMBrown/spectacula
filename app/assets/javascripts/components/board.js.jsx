var Board = React.createClass({
    getDefaultProps: function() {
      return {
        baseStyle:{
          border: '2px solid rgba(5, 5, 5, 0.4)',
          fontSize: '0.4em',
          verticalAlign: 'top',
          backgroundImage: "url(http://opengameart.org/sites/default/files/04pavinform256.png)",
          backgroundSize: "contain"
        },
        emptyStyle: {color: 'black'},
        collisionStyle: {color: 'red'}
      }
    },
    getOccupants: function (x, y) {
      return this.props.players.filter(function(elem){return(elem.position.x === x && elem.position.y === y)});
    },
    getStyleFor: function (x, y) {
      var empty = this.props.emptyStyle;
      var collision = this.props.collisionStyle;
      var occupants = this.getOccupants(x, y);
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
        for(var i = 0; i < 8; i++) {
          rows.push((function (i) {
            var row = [];
            for(var j = 0; j < 8; j++) {
              var x = j;
              var y = i;
              row.push(<Tile {...that.props} key={x} x={x} y={y} style={that.getStyleFor(x, y)} occupants={that.getOccupants(x, y)} highlighted={that.props.highlight({x: x, y: y})}/>);
            }
            return (<tr key={i}>{row}</tr>);
          })(i));
        }
        return (
          <div className="board" style={{position: 'relative'}}>
            <table style={{margin: "15 auto", width: 450, height: 450}}><tbody>{rows}</tbody></table>
            <MoveQueue {...this.props} />
          </div>
        );
    }
});
