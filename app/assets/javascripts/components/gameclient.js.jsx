// var Board = require('board');
// var HUD = require('hud')
var GameClient = React.createClass({
  getInitialState: function(){return {
    pendingMoves: [null, null, null]
  };},
  render: function(){
    return (
      <div>
        <Board />
        <HUD moves=this.state.pendingMoves />
      </div>
    );

  }
})