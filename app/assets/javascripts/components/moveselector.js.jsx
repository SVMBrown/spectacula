var MoveSelector = React.createClass({
  render: function () {
    var that = this;
    return(<div><button onClick={(function(){that.props.load({name: "test 1", type: "move"})})}>test 1</button>
      <button onClick={(function(){that.props.load({name: "test 2", type: "move"})})}>test 2</button>
      <button onClick={(function(){that.props.load({name: "test 3", type: "move"})})}>test 3</button>
      <button onClick={(function(){that.props.load({name: "test 4", type: "move"})})}>test 4</button>
      <button onClick={that.props.commit}>commit</button></div>);
  }
});
