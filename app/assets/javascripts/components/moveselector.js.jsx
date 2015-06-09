var MoveSelector = React.createClass({
  render: function () {
    var that = this;
    return(<div className="move-selector">
      <button onClick={(function(){that.props.load({name: "move left", type: "move"})})}>move left</button>
      <button onClick={(function(){that.props.load({name: "move right", type: "move"})})}>move right</button>
      <button onClick={(function(){that.props.load({name: "move up", type: "move"})})}>move up</button>
      <button onClick={(function(){that.props.load({name: "move down", type: "move"})})}>move down</button>
      <button onClick={(function(){that.props.load({name: "attack left", type: "move"})})}>attack left</button>
      <button onClick={(function(){that.props.load({name: "attack right", type: "move"})})}>attack right</button>
      <button onClick={(function(){that.props.load({name: "attack up", type: "move"})})}>attack up</button>
      <button onClick={(function(){that.props.load({name: "attack down", type: "move"})})}>attack down</button>
      <button onClick={that.props.commit}>commit</button>
      <button onClick={that.props.clearMoves}>clear</button>
  </div>);
  }
});
