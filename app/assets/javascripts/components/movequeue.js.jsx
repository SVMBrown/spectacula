var MoveQueue = React.createClass({
  render: function () {
    return(
      <ul className="move-queue">
      {this.props.moves.map(
        function(elem){
          return(<li>{elem.name}</li>)
        })}
      </ul>);
  }
});
