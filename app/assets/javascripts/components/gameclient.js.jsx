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
        moveQueue: [],
        freezeInput: false
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
    this.props.websocket.send(messageObject("commit", this.state.pendingMoves));
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
    var message = JSON.parse(e.data);
    console.log("handling " + message.name);
    var newQ = this.state.moveQueue;
    if(message.type === "movelist")
      newQ = message.moves;
    this.setState({moveQueue: newQ});
  },
  componentDidMount: function () {
    var that = this;
    this.props.websocket.onmessage = function(e) {
      console.log(e);
      that.handleMessage(e);
    }
  },
  componentDidUpdate: function () {
    if(this.state.moveQueue.length) {
      var moveQ = this.state.moveQueue;
      this.resolveMove(moveQ.pop());
      setTimeout(this.setState({moveQueue: moveQ,
        freezeInput: true}), 300);

    } else if(this.state.freezeInput) {
      this.setState({freezeInput: false});
    }
  },
  resolveMove: function(move) {
    console.log("resolving " + move.name);
  }
});
