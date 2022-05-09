$(document).ready(function() {
  showNumber(level,objSaveGame);
  showLeaderBoard();
  loadSaveGame();
  saveData(secretNumber,1,life,objSaveGame);
  $( document ).tooltip();
  $('.slt-level').select2({ 
    width: '100%',
    minimumResultsForSearch: -1 
  }).on('change', function() {
    showNumber($(this).val(),objSaveGame);
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
  for(let i = 1; i <= 4; i++) {
    contextLoader.addLoader('.load-message-'+i);
  }
});