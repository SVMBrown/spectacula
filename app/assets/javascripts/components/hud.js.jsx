var HUD = React.createClass({
  render: function(){
    return(
      <div class='hud'>
      <MovesList moves=this.props.moves />
      <MoveSelector />
       </div>
      )
  }
})


//left one (buttons) %30 right (actions) %70