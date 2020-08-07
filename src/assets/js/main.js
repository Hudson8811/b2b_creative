$(document).ready(function () {
  if ($(window).scrollTop() > 50 && !$(".header").hasClass("active"))
    $(".header").addClass("scrollable");
  else $(".header").removeClass("scrollable");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50 && !$(".header").hasClass("active"))
      $(".header").addClass("scrollable");
    else {
      $(".header").removeClass("scrollable");
      $(".header").removeClass("active");
    }
  });

  $(document).on("click", ".header__burger", function () {
    if (!$(".header").hasClass("active")) {
      $(".header").addClass("active");
    } else {
      $(".header").removeClass("active");

      if ($(window).scrollTop() > 50) {
        $(".header").addClass("scrollable");
      }
    }
  });

  $(document).on("click", ".services__heading", function () {
    if (!$(this).hasClass("active")) {
      $(".services__heading").removeClass("active");

      $(".services__text").slideUp();
      $(this).addClass("active");
      $(this).siblings(".services__text").slideDown();
    } else {
      $(".services__heading").removeClass("active");
      $(".services__text").slideUp();
    }
  });
});
