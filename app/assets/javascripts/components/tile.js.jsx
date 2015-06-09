var Tile = React.createClass({
  getStyle: function () {
    var style = {};
    var that = this;
    if(this.props.highlight({x: that.props.x, y: that.props.y})) {
      style.backgroundColor = 'yellow';
    }
    style.color = this.props.occupant;
    return style;
  },
  render: function () {
    return(
      <td className="tile" style={this.getStyle()}> {this.props.x}, {this.props.y} </td>
    )
  }
});
