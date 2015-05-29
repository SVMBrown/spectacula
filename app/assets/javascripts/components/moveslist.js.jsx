var MovesList = React.createClass({
  render: function(){
    var moves = [];
    for(var i=0; i < this.props.max; i++) {
      moves.push(this.props.moves[i] || {name: "Select Move"});
    }
    return(
     <ol>
      {moves.map(function(elem){return(<li> {elem.name} </li>)})}
    </ol>);
  }
});
