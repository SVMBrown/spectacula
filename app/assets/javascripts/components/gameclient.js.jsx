// var Board = require('board');
// var HUD = require('hud')
var GameClient = React.createClass({
  getDefaultProps: function() {
    return {
      max: 4,
      size: 8,
      colors: ['green', 'blue', 'yellow', 'purple'],
      positions: [{x: 0, y: 0}, {x: 7, y: 7},
      {x: 0, y: 7}, {x: 7, y: 0}],
      health: 5
    };
  },
  getInitialState: function(){
    var that = this;
    return {
        pendingMoves: [],
        players: this.props.players.map(function(elem, i) {
          var player = {};
          return {
            handle: elem.handle || elem,
            color: elem.color || that.props.colors[i],
            position: elem.position || that.props.positions[i],
            health: elem.health || that.props.health
          };
        }),
        moveQueue: [],
        round: this.props.round || 0,
        freezeInput: false,
        winner: this.props.winner || null,
        highlight: function(){console.log("initial state function"); return false;}
      };
  },
  render: function(){
    if(this.state.winner) {
      return <a href="/leaderboard">{this.state.winner} wins!</a>
    } else {
      return (
        <div>
          <Board {...this.props} moves={this.state.moveQueue} players={this.state.players} highlight={this.state.highlight} />
          <HUD {...this.props} moves={this.state.pendingMoves} load={this.loadMove} commit={this.commitMoves} clearMoves={this.clearMoves} />
          <p> round: {this.state.round} </p>
          <dl>
            {this.state.players.map(function(elem, i){return(<div key={i}><dt>{elem.handle}, {elem.health}</dt><dd style={{backgroundColor: elem.color}}>{elem.color}</dd></div>);})}
          </dl>
        </div>
      );
    }
  },
  clearMoves: function() {
    this.setState({pendingMoves: []});
  },
  commitMoves: function() {
    var moves = this.state.pendingMoves;
    while(moves.length < this.props.max) {
      moves.unshift({type: "move", name: "do nothing"});
    }
    this.props.websocket.send(commitMessage(this.state.pendingMoves));
    this.clearMoves();
  },
  loadMove: function(move) {
    var newMoves = this.state.pendingMoves;
    if(newMoves.length < this.props.max) {
      newMoves.unshift(move);
    }
    this.setState({
      pendingMoves: newMoves
    });
  },
  handleMessage: function (message) {
    console.log("handling " + message.name);
    if(message.type === "winner") {
      this.setState({winner: message.winner})
    } else if(message.type === "round") {
      var newQ = this.state.moveQueue;
      var checkState = message.gameState;
      if(checkState && (checkState.round !== this.state.round || checkState.players !== this.state.players)) {
        this.setState({round: checkState.round, players: checkState.players});
      }
      newQ = message.roundQueue;
      this.setState({moveQueue: newQ});
    }
  },
  componentDidMount: function () {
    var that = this;
    this.props.websocket.onmessage = function(e) {
      that.handleMessage(JSON.parse(e.data));
    }
  },
  componentDidUpdate: function (prevProps, prevState) {
    console.log(this.state.highlight({x: 0, y: 0}));
    if(this.state.winner && !prevState.winner) {
      this.props.websocket.send(JSON.stringify({name: ("winner is " + this.state.winner), type: "winner", winner: this.state.winner}));
    } else if(this.state.moveQueue.length && (this.state.moveQueue !== prevState.moveQueue)) {
      var that = this;
      setTimeout(function() {
        that.resolveMove();
      }, 1000);
    } else if(this.state.moveQueue !== prevState.moveQueue) {
      var that = this;
      setTimeout(function() {
        that.setState({highlight: (function(){console.log("reset state function"); return false;})});
      }, 1000);
    } else if(this.state.freezeInput && (this.state.moveQueue.length === 0)) {
      var newRound = this.state.round + 1;
      this.props.websocket.send(JSON.stringify({name: ("round " + newRound), type: "game state", round: newRound, players: this.state.players}));
      this.setState({freezeInput: false, round: newRound, highlight: (function(){console.log("reset state function"); return false;})});
    }
  },
  resolveMove: function() {
    var squareIsAttacked = function(){console.log("reset state function"); return false;};
    var attackFlag = false;
    var tempQueue = this.state.moveQueue.slice();
    var move = tempQueue.pop();
    console.log("resolving " + move.name);
    console.log(this.state.players);
    var player = this.state.players.filter(function(element){
      return element.handle === move.handle;
    })[0];
    var playerIndex = this.state.players.indexOf(player);
    var newPlayers = this.state.players;
    if(move.name === "move left") {
      player.position.x = Math.max(0, player.position.x - 1);
      newPlayers[playerIndex] = player;
    } else if(move.name === "move right") {
      player.position.x = Math.min(this.props.size - 1, player.position.x + 1);
      newPlayers[playerIndex] = player;
    } else if(move.name === "move up") {
      player.position.y = Math.max(0, player.position.y - 1);
      newPlayers[playerIndex] = player;
    } else if(move.name === "move down") {
      player.position.y = Math.min(this.props.size - 1, player.position.y + 1);
      newPlayers[playerIndex] = player;
    } else if(move.name === "attack left") {
      var tmpx = player.position.x;
      var tmpy = player.position.y;
      attackFlag = true;
      squareIsAttacked = function(pos) {
        console.log("checking attacked");
        return(pos.y == tmpy && pos.x < tmpx);
      };
    } else if(move.name === "attack right") {
      var tmpx = player.position.x;
      var tmpy = player.position.y;
      attackFlag = true;
      squareIsAttacked = function(pos) {
        console.log("checking attacked");
        return(pos.y == tmpy && pos.x > tmpx);
      };
    } else if(move.name === "attack up") {
      var tmpx = player.position.x;
      var tmpy = player.position.y;
      attackFlag = true;
      squareIsAttacked = function(pos) {
        console.log("checking attacked");
        return(pos.x == tmpx && pos.y < tmpy);
      };
    } else if(move.name === "attack down") {
      var tmpx = player.position.x;
      var tmpy = player.position.y;
      attackFlag = true;
      squareIsAttacked = function(pos) {
        console.log("checking attacked");
        return(pos.x == tmpx && pos.y > tmpy);
      };
    } else {
      console.log(move.handle + "did nothing, or used invalid move");
    }

    if(attackFlag) {
      newPlayers = newPlayers.map(function(target) {
        if(squareIsAttacked(target.position)){
          target.health -= 1;
        }
        return target;
      });
    }

    newPlayers[playerIndex] = player;
    this.setState({highlight: (function(pos){console.log("state function"); return squareIsAttacked(pos);}), players: newPlayers, freezeInput: true, winner: this.checkWinner(), moveQueue: tempQueue});
  },
  checkWinner: function() {
    var stillAlive = this.state.players.filter(function(player){return player.health > 0;});
    if(stillAlive.length > 1) {
      return null;
    } else if(stillAlive.length === 1) {
      return stillAlive[0].handle;
    } else {
      return "TIE";
    }
  }
});
