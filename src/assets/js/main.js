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
});
