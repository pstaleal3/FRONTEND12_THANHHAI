$(document).ready(function () {
  $('ul#filter li ').click(function(e) {
    $('#filter-status').text($(this).text());
    filter($(this).text());
  });
  $('#add-task').click(function(e) {
    $('#area-form').slideDown();
  });
  $('#cancel').click(function(e) {
    $('#area-form').slideUp();
  });
  $('#search').keyup(function(e) {
    searchTask($(this).val());
  });
  getLocalStorage('task');
  $('#btn-submit').click(function (e) { 
    e.preventDefault();
    let taskName = $('#input-name').val();
    if(taskName.trim() != '') {
      let inputLevel = $('#input-level').val();
      addLocalStorage(taskName,inputLevel);
      clear();
    } else {
      $('#input-name').notify(
        "Please Enter Task Name", 
      { position:"top",autoHideDelay: 2000,}
      );
    }
  });
});
