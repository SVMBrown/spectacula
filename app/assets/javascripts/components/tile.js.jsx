var Tile = React.createClass({
  getStyle: function () {
    var style = {};
    var that = this;
    if(this.props.highlight({x: that.props.x, y: that.props.y})) {
      style.backgroundColor = 'yellow';
      console.log("highlighted");
    }
    style.color = this.props.occupant;
    return style;
  },
  render: function () {
    return(
      <td style={this.getStyle()}> {this.props.x}, {this.props.y} </td>
    )
  }
});
