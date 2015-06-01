var Board = React.createClass({
    playerAt: function () {

    }
    render: function () {
        var rows = [];
        for(var y = 0; y < 8; y++) {
          rows.push((function (y) {
            var row = [];
            for(var x = 0; x < 8; x++) {
              row.push(<Tile x={x} y={y} occupant={this.playerAt(x, y)} />);
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
