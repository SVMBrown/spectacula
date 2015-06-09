$(function() {
  if($('body')[0].classList.contains('leaderboard')){
    $('.clearfix').css({display: 'inline-block'});
    users.forEach(function(element) {
      console.log("wins" + element.wins);
    });
  }
});
