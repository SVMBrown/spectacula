var MovesList = React.createClass({
  render: function(){
    var moves = [];
    for(var i=0; i < this.props.max; i++) {
      moves.unshift(this.props.moves[i] || {name: "Select Move"});
    }
    return(
     <ol className="moves-list">
      {moves.map(function(elem, i){return(<li key={i}> {elem.name} </li>)})}
    </ol>);
  }
});
