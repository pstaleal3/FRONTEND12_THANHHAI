var swiper = new Swiper(".mySwiper", {
  slidesPerView: 8,
  spaceBetween: 20,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 2,          
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 6,
    },
    1300: {
      slidesPerView: 8,
    },
  },
});
var swiper = new Swiper(".phim_sap_chieu", {
  slidesPerView: 8,
  spaceBetween: 20,
  centerInsufficientSlides: true,
  breakpoints: {
    576: {
      slidesPerView: 2,          
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 8,
    },
  },
});
var swiper = new Swiper(".ve_ban_truoc", {
  slidesPerView: 8,
  spaceBetween: 20,
  centerInsufficientSlides: true,
  breakpoints: {
    576: {
      slidesPerView: 2,          
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 8,
    },
  },
});
var swiper = new Swiper(".discountSwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + '' + "</span>";
    },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,          
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});