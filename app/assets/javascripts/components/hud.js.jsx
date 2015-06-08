var HUD = React.createClass({
  render: function(){
    return(
      <div className='hud'>
      <MovesList max={this.props.max} moves={this.props.moves} />
      <MoveSelector {...this.props} />
       </div>
      );
  }
});


//left one (buttons) %30 right (actions) %70
