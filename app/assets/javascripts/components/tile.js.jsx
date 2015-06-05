var Tile = React.createClass({
  getStyle: function () {
    return {color: this.props.occupant};
  },
  render: function () {
    return(
      <td style={this.getStyle()}> {this.props.x}, {this.props.y} </td>
    )
  }
});
