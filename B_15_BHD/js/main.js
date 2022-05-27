$(document).ready(function () {
  $('header nav button').click(function(e) {
    e.stopPropagation();
    $('header nav .line').toggleClass("open");
    $('header nav .menu').slideToggle();
  });
  $('.login button').click(function(e) {
    $('.login form').slideToggle();
  });
  $('.move-down a').click(function(e) {
    e.preventDefault();
    $('html,body').animate({
    scrollTop: $('#movie').offset().top},'fast');
  });
  $('#movie #pills-home .swiper-slide').click(function() {
    sessionStorage.setItem("movieID", $(this).data('id'));
    window.location = 'movie.html';
  });
});