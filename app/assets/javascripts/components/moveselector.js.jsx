var MoveSelector = React.createClass({
  render: function () {
    var that = this;
    return(<div><button onClick={(function(){that.props.load({name: "move left", type: "move"})})}>left</button>
      <button onClick={(function(){that.props.load({name: "move right", type: "move"})})}>right</button>
      <button onClick={(function(){that.props.load({name: "move up", type: "move"})})}>up</button>
      <button onClick={(function(){that.props.load({name: "move down", type: "move"})})}>down</button>
      <button onClick={that.props.commit}>commit</button></div>);
  }
});
