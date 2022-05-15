$(document).ready(function () {
  createCanvas();
  let count = 0;
  let fontSize = parseInt($('p').css('font-size'));
  $('#zoom-in').click(function(e) {
    fontSize += 10;
    $('p').css('font-size',fontSize);
    count++;
    if(count == 3) {
      $(this).addClass('disabled');
    };
    $('#zoom-out').removeClass('disabled');
  });
  $('#zoom-out').click(function(e) {
    fontSize -= 10;
    $('p').css('font-size',fontSize);
    count--;
    if(count == 0) {
      $(this).addClass('disabled');
    }
    $('#zoom-in').removeClass('disabled');
  });
  $('#copy').click(function(e) {
    $(this).notify('Copy!',{
      className: 'success',
      position: 'top left',
      autoHideDelay: 2000,
    });
    navigator.clipboard.writeText($('p').text());
  });
  let check = false;
  $('#theme').click(function(e) {
    if(!check) {
      $(this).text('Light');
      check = true;
      changeTheme('dark');
    } else {
      $(this).text('Dark');
      check = false;
      changeTheme('light');
    }
  });
});