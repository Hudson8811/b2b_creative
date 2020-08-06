$(document).ready(function () {
  if ($(window).scrollTop() > 50 && !$(".header").hasClass("active"))
    $(".header").addClass("scrollable");
  else $(".header").removeClass("scrollable");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50 && !$(".header").hasClass("active"))
      $(".header").addClass("scrollable");
    else $(".header").removeClass("scrollable");
  });

  $(document).on("click", ".header__burger", function () {
    $(".header").toggleClass("active");
  });
});
