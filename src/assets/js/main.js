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

(function (e) {
  function t() {
    var e = document.createElement("input"),
      t = "onpaste";
    return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input";
  }
  var n,
    a = t() + ".mask",
    r = navigator.userAgent,
    i = /iphone/i.test(r),
    o = /android/i.test(r);
  (e.mask = {
    definitions: { 9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]" },
    dataName: "rawMaskFn",
    placeholder: "_",
  }),
    e.fn.extend({
      caret: function (e, t) {
        var n;
        if (0 !== this.length && !this.is(":hidden"))
          return "number" == typeof e
            ? ((t = "number" == typeof t ? t : e),
              this.each(function () {
                this.setSelectionRange
                  ? this.setSelectionRange(e, t)
                  : this.createTextRange &&
                    ((n = this.createTextRange()),
                    n.collapse(!0),
                    n.moveEnd("character", t),
                    n.moveStart("character", e),
                    n.select());
              }))
            : (this[0].setSelectionRange
                ? ((e = this[0].selectionStart), (t = this[0].selectionEnd))
                : document.selection &&
                  document.selection.createRange &&
                  ((n = document.selection.createRange()),
                  (e = 0 - n.duplicate().moveStart("character", -1e5)),
                  (t = e + n.text.length)),
              { begin: e, end: t });
      },
      unmask: function () {
        return this.trigger("unmask");
      },
      mask: function (t, r) {
        var c, l, s, u, f, h;
        return !t && this.length > 0
          ? ((c = e(this[0])), c.data(e.mask.dataName)())
          : ((r = e.extend(
              { placeholder: e.mask.placeholder, completed: null },
              r
            )),
            (l = e.mask.definitions),
            (s = []),
            (u = h = t.length),
            (f = null),
            e.each(t.split(""), function (e, t) {
              "?" == t
                ? (h--, (u = e))
                : l[t]
                ? (s.push(RegExp(l[t])), null === f && (f = s.length - 1))
                : s.push(null);
            }),
            this.trigger("unmask").each(function () {
              function c(e) {
                for (; h > ++e && !s[e]; );
                return e;
              }
              function d(e) {
                for (; --e >= 0 && !s[e]; );
                return e;
              }
              function m(e, t) {
                var n, a;
                if (!(0 > e)) {
                  for (n = e, a = c(t); h > n; n++)
                    if (s[n]) {
                      if (!(h > a && s[n].test(R[a]))) break;
                      (R[n] = R[a]), (R[a] = r.placeholder), (a = c(a));
                    }
                  b(), x.caret(Math.max(f, e));
                }
              }
              function p(e) {
                var t, n, a, i;
                for (t = e, n = r.placeholder; h > t; t++)
                  if (s[t]) {
                    if (
                      ((a = c(t)),
                      (i = R[t]),
                      (R[t] = n),
                      !(h > a && s[a].test(i)))
                    )
                      break;
                    n = i;
                  }
              }
              function g(e) {
                var t,
                  n,
                  a,
                  r = e.which;
                8 === r || 46 === r || (i && 127 === r)
                  ? ((t = x.caret()),
                    (n = t.begin),
                    (a = t.end),
                    0 === a - n &&
                      ((n = 46 !== r ? d(n) : (a = c(n - 1))),
                      (a = 46 === r ? c(a) : a)),
                    k(n, a),
                    m(n, a - 1),
                    e.preventDefault())
                  : 27 == r && (x.val(S), x.caret(0, y()), e.preventDefault());
              }
              function v(t) {
                var n,
                  a,
                  i,
                  l = t.which,
                  u = x.caret();
                t.ctrlKey ||
                  t.altKey ||
                  t.metaKey ||
                  32 > l ||
                  (l &&
                    (0 !== u.end - u.begin &&
                      (k(u.begin, u.end), m(u.begin, u.end - 1)),
                    (n = c(u.begin - 1)),
                    h > n &&
                      ((a = String.fromCharCode(l)),
                      s[n].test(a) &&
                        (p(n),
                        (R[n] = a),
                        b(),
                        (i = c(n)),
                        o
                          ? setTimeout(e.proxy(e.fn.caret, x, i), 0)
                          : x.caret(i),
                        r.completed && i >= h && r.completed.call(x))),
                    t.preventDefault()));
              }
              function k(e, t) {
                var n;
                for (n = e; t > n && h > n; n++) s[n] && (R[n] = r.placeholder);
              }
              function b() {
                x.val(R.join(""));
              }
              function y(e) {
                var t,
                  n,
                  a = x.val(),
                  i = -1;
                for (t = 0, pos = 0; h > t; t++)
                  if (s[t]) {
                    for (R[t] = r.placeholder; pos++ < a.length; )
                      if (((n = a.charAt(pos - 1)), s[t].test(n))) {
                        (R[t] = n), (i = t);
                        break;
                      }
                    if (pos > a.length) break;
                  } else R[t] === a.charAt(pos) && t !== u && (pos++, (i = t));
                return (
                  e
                    ? b()
                    : u > i + 1
                    ? (x.val(""), k(0, h))
                    : (b(), x.val(x.val().substring(0, i + 1))),
                  u ? t : f
                );
              }
              var x = e(this),
                R = e.map(t.split(""), function (e) {
                  return "?" != e ? (l[e] ? r.placeholder : e) : void 0;
                }),
                S = x.val();
              x.data(e.mask.dataName, function () {
                return e
                  .map(R, function (e, t) {
                    return s[t] && e != r.placeholder ? e : null;
                  })
                  .join("");
              }),
                x.attr("readonly") ||
                  x
                    .one("unmask", function () {
                      x.unbind(".mask").removeData(e.mask.dataName);
                    })
                    .bind("focus.mask", function () {
                      clearTimeout(n);
                      var e;
                      (S = x.val()),
                        (e = y()),
                        (n = setTimeout(function () {
                          b(), e == t.length ? x.caret(0, e) : x.caret(e);
                        }, 10));
                    })
                    .bind("blur.mask", function () {
                      y(), x.val() != S && x.change();
                    })
                    .bind("keydown.mask", g)
                    .bind("keypress.mask", v)
                    .bind(a, function () {
                      setTimeout(function () {
                        var e = y(!0);
                        x.caret(e),
                          r.completed &&
                            e == x.val().length &&
                            r.completed.call(x);
                      }, 0);
                    }),
                y();
            }));
      },
    });
})(jQuery);

function getPage() {
  links = Array.from(document.querySelectorAll(".header__menu__link"));
  body = document.querySelector("body");

  links.forEach(function (item, i, arr) {
    if (item.innerText.toUpperCase() === body.classList.value.toUpperCase()) {
      item.classList.add("active");
    } else {
      return;
    }
  });
}

function black() {
  $("body").mouseover(function (e) {
    if (
      $(e.target).hasClass("black__section") ||
      $(e.target).parents().hasClass("black__section")
    ) {
      $(".header").addClass("black");
    } else if (
      $(e.target).hasClass("black") ||
      $(e.target).parents().hasClass("black")
    ) {
      $(".header").addClass("black");
    } else {
      $(".header").removeClass("black");
    }
  });
}

$(document).ready(function () {
  getPage();

  $("input[name='phone']").mask("(999) 999-99-99");

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

  $(document).on("click", ".learn__more__link", function () {
    $("html, body").animate(
      {
        scrollTop: $(".main_screen__section").next(".section").offset().top,
      },
      1000
    );
  });

  $(document).on("click", ".modal1__btn--js", function (e) {
    e.preventDefault();

    $.fancybox.open({
      src: "#modal1",
      type: "inline",
      autoFocus: false,
    });
  });

  $(document).on("click", ".modal2__btn--js", function (e) {
    e.preventDefault();

    $.fancybox.open({
      src: "#modal2",
      type: "inline",
      autoFocus: false,
    });
  });

  black();

  $(document).scroll(function (e) {
    black();
  });

  $(window).resize(function () {
    black();
  });

  $(".expertise__circle").mousemove(function (e) {
    var x = e.pageX - $(this).offset().left;
    var y = e.pageY - $(this).offset().top;

    var w = $(this).width();
    var h = $(this).height();
    if (x > w / 2 && y > h / 2) {
      $(this).css({
        transform: `translate(-20%, -20%)`,
      });
    } else if (x < w / 2 && y < h / 2) {
      $(this).css({
        transform: `translate(20%,20%)`,
      });
    } else if (x > w / 2 && y < h / 2) {
      $(this).css({
        transform: `translate(-20%,20%)`,
      });
    } else if (x < w / 2 && y > h / 2) {
      $(this).css({
        transform: `translate(20%, -20%)`,
      });
    }

    $(this).mouseleave(function () {
      $(this).css({
        transform: `translate(0, 0)`,
      });
    });
  });
});
