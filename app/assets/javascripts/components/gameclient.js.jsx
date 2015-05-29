// var Board = require('board');
// var HUD = require('hud')
var GameClient = React.createClass({
  getDefaultProps: function() {
    return {
      max: 4,
      size: 8,
      players: 2
    }
  },
  getInitialState: function(){
    return {
        pendingMoves: [],
        player: {
          x: 0,
          y: 0
        },
        moveQueue: []
      }
  },
  render: function(){
    return (
      <div>
        <Board {...this.props} moves={this.state.moveQueue} />
        <HUD {...this.props} moves={this.state.pendingMoves} load={this.loadMove} commit={this.commitMoves} />
      </div>
    );
  },
  commitMoves: function() {
    var that = this;
    this.state.pendingMoves.forEach(function(elem){
      that.props.websocket.send(JSON.stringify(elem));
    });
    this.setState({pendingMoves: []});
  },
  loadMove: function(move) {
    var newMoves = this.state.pendingMoves;
    if(newMoves.length < this.props.max) {
      newMoves.push(move);
    }
    this.setState({
      pendingMoves: newMoves
    });
  },
  handleMessage: function (e) {
    var newQ = this.state.moveQueue;
    newQ.push(JSON.parse(e.data));
    this.setState({moveQueue: newQ});
  },
  componentDidMount: function () {
    var that = this;
    this.props.websocket.onmessage = function(e) {
      console.log(e);
      that.handleMessage(e);
    }
  }
});
