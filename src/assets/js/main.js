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

  $(document).on("focus", ".turnkey_form__label input", function () {
    $(this).parent().addClass("active");
    $(this).parent().removeClass("error");
  });

  $(document).on("blur", ".turnkey_form__label input", function () {
    if ($(this).val() == "") {
      $(this).parent().removeClass("active");
      $(this).parent().addClass("error");
    } else {
      $(this).parent().removeClass("error");
      if (
        $(this).attr("type") == "email" &&
        !isValidEmailAddress($(this).val())
      ) {
        $(this).parent().addClass("error");
      }
    }
  });

  $(document).on("change", "#file1_input", function () {
    $("#turnkey_form__file__btn_wrapper1").removeClass("active");
    $("#turnkey_form__file__btn_wrapper2").addClass("active");
    $("#turnkey_form__file__content1").addClass("active");
  });

  $(document).on("change", "#file2_input", function () {
    $("#turnkey_form__file__content2").addClass("active");
    $(".turnkey_form__file__btn_wrapper").addClass("disabled");
  });

  $(document).on(
    "click",
    "#turnkey_form__file__content1 .turnkey_form__file__content_btn__remove",
    function () {
      $(this)
        .parent(".turnkey_form__file__content_btns")
        .parent("#turnkey_form__file__content1")
        .removeClass("active");
      $("#turnkey_form__file__btn_wrapper1").addClass("active");
      $("#turnkey_form__file__btn_wrapper2").removeClass("active");
      $(".turnkey_form__file__btn_wrapper").removeClass("disabled");
    }
  );

  $(document).on(
    "click",
    "#turnkey_form__file__content2 .turnkey_form__file__content_btn__remove",
    function () {
      $(this)
        .parent(".turnkey_form__file__content_btns")
        .parent("#turnkey_form__file__content2")
        .removeClass("active");
      $("#turnkey_form__file__btn_wrapper1").removeClass("active");
      $("#turnkey_form__file__btn_wrapper2").addClass("active");
      $(".turnkey_form__file__btn_wrapper").removeClass("disabled");
    }
  );
});
