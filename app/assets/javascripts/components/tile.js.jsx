var Tile = React.createClass({
  getStyle: function () {
    var style = this.props.style;
    var pos = {x: this.props.x, y: this.props.y};
    if(this.props.highlight(pos)) {
      style.backgroundColor = 'yellow';
    }
    return style;
  },
  render: function () {
    return(
      <td className="tile" style={this.getStyle()}> {this.props.x}, {this.props.y} </td>
    )
  }
});
