var Tile = React.createClass({
  getStyle: function () {
    var style = {};
    for(var key in this.props.baseStyle) {
      style[key] = this.props.baseStyle[key];
    }
    for(var key in this.props.style) {
      style[key] = this.props.style[key];
    }
    style.position = 'relative';
    style.padding = "0";
    if(this.props.highlighted) {
      style.backgroundColor = 'yellow';
    }
    return style;
  },
  generateBody: function(occ) {
    var attack = false;
    if(this.props.highlighted && !occ) {
      var attackStyle = {backgroundImage: "url(http://opengameart.org/sites/default/files/projectiles.png)", width: "100%", height:"85%", backgroundColor:"",  margin: "0 auto"};
      if(this.props.attack === "left") {
        attackStyle.backgroundPosition = "4 -64";
        attack = (<div style={attackStyle}>{this.props.x + 1}, {this.props.y + 1}</div>);
      } else if(this.props.attack === "up") {
        attackStyle.backgroundPosition = "-128 -64";
        attack = (<div style={attackStyle}>{this.props.x + 1}, {this.props.y + 1}</div>);
      } else if(this.props.attack === "right") {
        attackStyle.backgroundPosition = "-264 -64";
        attack = (<div style={attackStyle}>{this.props.x + 1}, {this.props.y + 1}</div>);
      } else if(this.props.attack === "down") {
        attackStyle.backgroundPosition = "-384 -64";
        attack = (<div style={attackStyle}>{this.props.x + 1}, {this.props.y + 1}</div>);
      } else {
        attack = "";
      }
    } else if (this.props.highlighted && occ) {
      var attackStyle = {backgroundImage: "url(http://opengameart.org/sites/default/files/projectiles.png)", width: "100%", height:"85%", backgroundColor:"", position: "float"};
      if(this.props.attack === "left") {
        attackStyle.backgroundPosition = "4 -64";
        attack = (<div style={attackStyle}></div>);
      } else if(this.props.attack === "up") {
        attackStyle.backgroundPosition = "-128 -64";
        attack = (<div style={attackStyle}></div>);
      } else if(this.props.attack === "right") {
        attackStyle.backgroundPosition = "-264 -64";
        attack = (<div style={attackStyle}></div>);
      } else if(this.props.attack === "down") {
        attackStyle.backgroundPosition = "-384 -64";
        attack = (<div style={attackStyle}></div>);
      } else {
        attack = "";
      }
    }
    if(occ) {
      return(<div style={{width: "68%", height: "90%", backgroundImage: "url(http://opengameart.org/sites/default/files/Arena_Game_Sprites_by_RedKnight91-CCBYSA3.png)", backgroundPosition: "-" + this.props.players.indexOf(occ) * 35 + " 0", margin: "5% auto", opacity: '1'}}>{attack}</div>);
    } else {
      attack = attack ? attack : (<span> {this.props.x + 1}, {this.props.y + 1} </span>)
      return(<div style={{backgroundColor: this.getStyle().backgroundColor, opacity: '0.8', textAlign: 'right', height: "100%"}}>{attack}</div>);
    }
  },
  render: function () {
    var occupant;
    if(this.props.occupants.length === 1) {
      occupant = this.props.occupants[0];
    } else {
      occupant = false;
    }
    return(
      <td className="tile" style={this.getStyle()}>{this.generateBody(occupant)}</td>
    )
  }
});
