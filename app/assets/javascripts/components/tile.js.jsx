var Tile = React.createClass({
  getStyle: function () {
    if(this.props.occupant !== "empty") {
      return {color: 'red'};
    }
  },
  render: function () {
    return(
      <td style={this.getStyle()}> {this.props.x}, {this.props.y} </td>
    )
  }
});
