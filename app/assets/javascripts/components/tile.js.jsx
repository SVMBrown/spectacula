var Tile = React.createClass({
  render: function () {
    return(
      <td> {this.props.x}, {this.props.y}</td>
    )
  }
});