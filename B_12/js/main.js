$(document).ready(function() {
  showNumber();
  showLeaderBoard();
  saveData(secretNumber,1,life,objSaveGame);
  $( document ).tooltip();
  $('.slt-level').select2({ 
    width: '100%',
    minimumResultsForSearch: -1 
  }).on('change', function() {
    showNumber($(this).val());
    reset();
    saveData(secretNumber,$(this).val(),life,objSaveGame);
  });
  $('#play-again').click(function() {
    location.reload();
  });
  $('#save-game').click(function(e) {
    $.notify("Save!", "success");
    $(this).addClass('disabled');
    setTimeout(() => {$(this).removeClass('disabled')}, 10000);
    localStorage.setItem('saveTime', Date.now());
    
  });
});