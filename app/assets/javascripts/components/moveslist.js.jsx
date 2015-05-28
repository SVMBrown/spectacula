var MovesList = React.createClass({
  render: function(){
    return(
     <ol>
      {this.props.moves.map(function(elem){return(<li> {elem || "00"} </li>)})}
    </ol>);
  }
});
