$(document).ready(function() {
  showNumber();
  showLeaderBoard();
  saveData(secretNumber,1,life);
  $( document ).tooltip();
  $('.slt-level').select2({ 
    width: '100%',
    minimumResultsForSearch: -1 
  }).on('change', function() {
    showNumber($(this).val());
    saveData(secretNumber,$(this).val(),life);
    reset();
  });
  $('#play-again').click(function() {
    location.reload();
  });
});