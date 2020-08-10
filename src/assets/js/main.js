!(function (t) {
  var i = t(window);
  t.fn.visible = function (t, e, o) {
    if (!(this.length < 1)) {
      var r = this.length > 1 ? this.eq(0) : this,
        n = r.get(0),
        f = i.width(),
        h = i.height(),
        o = o ? o : "both",
        l = e === !0 ? n.offsetWidth * n.offsetHeight : !0;
      if ("function" == typeof n.getBoundingClientRect) {
        var g = n.getBoundingClientRect(),
          u = g.top >= 0 && g.top < h,
          s = g.bottom > 0 && g.bottom <= h,
          c = g.left >= 0 && g.left < f,
          a = g.right > 0 && g.right <= f,
          v = t ? u || s : u && s,
          b = t ? c || a : c && a;
        if ("both" === o) return l && v && b;
        if ("vertical" === o) return l && v;
        if ("horizontal" === o) return l && b;
      } else {
        var d = i.scrollTop(),
          p = d + h,
          w = i.scrollLeft(),
          m = w + f,
          y = r.offset(),
          z = y.top,
          B = z + r.height(),
          C = y.left,
          R = C + r.width(),
          j = t === !0 ? B : z,
          q = t === !0 ? z : B,
          H = t === !0 ? R : C,
          L = t === !0 ? C : R;
        if ("both" === o) return !!l && p >= q && j >= d && m >= L && H >= w;
        if ("vertical" === o) return !!l && p >= q && j >= d;
        if ("horizontal" === o) return !!l && m >= L && H >= w;
      }
    }
  };
})(jQuery);

function checkBlack() {
  if (
    $(".main_screen__section.black__section .black__section__trigger").visible({
      detectPartial: false,
    }) ||
    $(".footer.black__section .black__section__trigger").visible({
      detectPartial: false,
    }) ||
    $(".b2broker__section.black__section .black__section__trigger").visible({
      detectPartial: false,
    }) ||
    $(".b2broker__section2.black__section .black__section__trigger").visible({
      detectPartial: false,
    })
  ) {
    $(".header").addClass("black");
  } else {
    $(".header").removeClass("black");
  }
}

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

  checkBlack();
  $(document).scroll(function () {
    checkBlack();
  });
  $(window).resize(function () {
    checkBlack();
  });

  $(document).on("click", ".learn__more__link", function () {
    $("html, body").animate(
      {
        scrollTop: $(".main_screen__section").next(".section").offset().top,
      },
      1000
    );
  });
});
