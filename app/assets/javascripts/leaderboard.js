$(function() {
  if($('body')[0].classList.contains('leaderboard')){
    users.forEach(function(element) {
      console.log("wins" + element.wins);
    });
  }
});
