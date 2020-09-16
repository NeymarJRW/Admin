(function (e) {
  function t(t) {
    for (var r, o, c = t[0], i = t[1], l = t[2], f = 0, d = []; f < c.length; f++) o = c[f], a[
      o] && d.push(a[o][0]), a[o] = 0;
    for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
    s && s(t);
    while (d.length) d.shift()();
    return u.push.apply(u, l || []), n()
  }

  function n() {
    for (var e, t = 0; t < u.length; t++) {
      for (var n = u[t], r = !0, o = 1; o < n.length; o++) {
        var c = n[o];
        0 !== a[c] && (r = !1)
      }
      r && (u.splice(t--, 1), e = i(i.s = n[0]))
    }
    return e
  }
  var r = {},
    o = {
      app: 0
    },
    a = {
      app: 0
    },
    u = [];

  function c(e) {
    return i.p + "Public/admin/js/" + ({} [e] || e) + "." + {
      "chunk-020fe9eb": "ee63c0e7",
      "chunk-03364c4b": "b1c553af",
      "chunk-24e6f6a5": "0848d7a0",
      "chunk-38c3dd7a": "66815f0a",
      "chunk-74739484": "09d22a90",
      "chunk-5d2f9696": "fd21b904",
      "chunk-6a64967a": "5750dfe3",
      "chunk-cf05ffa6": "396b1838",
      "chunk-75f3b766": "0f7312aa",
      "chunk-96f6c494": "2b8012b6",
      "chunk-a4ba5698": "cb535fc4",
      "chunk-d9906980": "e7833037"
    } [e] + ".js"
  }

  function i(t) {
    if (r[t]) return r[t].exports;
    var n = r[t] = {
      i: t,
      l: !1,
      exports: {}
    };
    return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
  }
  i.e = function (e) {
    var t = [],
      n = {
        "chunk-020fe9eb": 1,
        "chunk-03364c4b": 1,
        "chunk-24e6f6a5": 1,
        "chunk-38c3dd7a": 1,
        "chunk-5d2f9696": 1,
        "chunk-6a64967a": 1,
        "chunk-cf05ffa6": 1,
        "chunk-75f3b766": 1,
        "chunk-96f6c494": 1,
        "chunk-a4ba5698": 1,
        "chunk-d9906980": 1
      };
    o[e] ? t.push(o[e]) : 0 !== o[e] && n[e] && t.push(o[e] = new Promise(function (t, n) {
      for (var r = "Public/admin/css/" + ({} [e] || e) + "." + {
          "chunk-020fe9eb": "ef4db40a",
          "chunk-03364c4b": "98d2300d",
          "chunk-24e6f6a5": "7967d319",
          "chunk-38c3dd7a": "e090a530",
          "chunk-74739484": "31d6cfe0",
          "chunk-5d2f9696": "6ba9eb7e",
          "chunk-6a64967a": "3a6d5f38",
          "chunk-cf05ffa6": "fbd9e8af",
          "chunk-75f3b766": "11228bfe",
          "chunk-96f6c494": "0f561ec5",
          "chunk-a4ba5698": "350427ef",
          "chunk-d9906980": "632ae78a"
        } [e] + ".css", a = i.p + r, u = document.getElementsByTagName("link"), c = 0; c <
        u.length; c++) {
        var l = u[c],
          f = l.getAttribute("data-href") || l.getAttribute("href");
        if ("stylesheet" === l.rel && (f === r || f === a)) return t()
      }
      var d = document.getElementsByTagName("style");
      for (c = 0; c < d.length; c++) {
        l = d[c], f = l.getAttribute("data-href");
        if (f === r || f === a) return t()
      }
      var s = document.createElement("link");
      s.rel = "stylesheet", s.type = "text/css", s.onload = t, s.onerror = function (t) {
        var r = t && t.target && t.target.src || a,
          u = new Error("Loading CSS chunk " + e + " failed.\n(" + r + ")");
        u.request = r, delete o[e], s.parentNode.removeChild(s), n(u)
      }, s.href = a;
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s)
    }).then(function () {
      o[e] = 0
    }));
    var r = a[e];
    if (0 !== r)
      if (r) t.push(r[2]);
      else {
        var u = new Promise(function (t, n) {
          r = a[e] = [t, n]
        });
        t.push(r[2] = u);
        var l, f = document.getElementsByTagName("head")[0],
          d = document.createElement("script");
        d.charset = "utf-8", d.timeout = 120, i.nc && d.setAttribute("nonce", i.nc), d.src = c(
          e), l = function (t) {
          d.onerror = d.onload = null, clearTimeout(s);
          var n = a[e];
          if (0 !== n) {
            if (n) {
              var r = t && ("load" === t.type ? "missing" : t.type),
                o = t && t.target && t.target.src,
                u = new Error("Loading chunk " + e + " failed.\n(" + r + ": " + o + ")");
              u.type = r, u.request = o, n[1](u)
            }
            a[e] = void 0
          }
        };
        var s = setTimeout(function () {
          l({
            type: "timeout",
            target: d
          })
        }, 12e4);
        d.onerror = d.onload = l, f.appendChild(d)
      } return Promise.all(t)
  }, i.m = e, i.c = r, i.d = function (e, t, n) {
    i.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    })
  }, i.r = function (e) {
    "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol
      .toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, i.t = function (e, t) {
    if (1 & t && (e = i(e)), 8 & t) return e;
    if (4 & t && "object" === typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var r in e) i.d(n, r, function (t) {
        return e[t]
      }.bind(null, r));
    return n
  }, i.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e["default"]
    } : function () {
      return e
    };
    return i.d(t, "a", t), t
  }, i.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, i.p = "/", i.oe = function (e) {
    throw console.error(e), e
  };
  var l = window["webpackJsonp"] = window["webpackJsonp"] || [],
    f = l.push.bind(l);
  l.push = t, l = l.slice();
  for (var d = 0; d < l.length; d++) t(l[d]);
  var s = f;
  u.push([0, "chunk-vendors"]), n()
})({
  0: function (e, t, n) {
    e.exports = n("56d7")
  },
  "034f": function (e, t, n) {
    "use strict";
    var r = n("64a9"),
      o = n.n(r);
    o.a
  },
  "135b": function (e, t, n) {},
  "365c": function (e, t, n) {
    "use strict";
    n.d(t, "b", function () {
      return l
    }), n.d(t, "a", function () {
      return f
    }), n.d(t, "D", function () {
      return d
    }), n.d(t, "E", function () {
      return s
    }), n.d(t, "j", function () {
      return h
    }), n.d(t, "c", function () {
      return p
    }), n.d(t, "h", function () {
      return m
    }), n.d(t, "d", function () {
      return g
    }), n.d(t, "A", function () {
      return k
    }), n.d(t, "r", function () {
      return b
    }), n.d(t, "t", function () {
      return v
    }), n.d(t, "q", function () {
      return y
    }), n.d(t, "n", function () {
      return w
    }), n.d(t, "u", function () {
      return _
    }), n.d(t, "f", function () {
      return H
    }), n.d(t, "C", function () {
      return x
    }), n.d(t, "l", function () {
      return S
    }), n.d(t, "z", function () {
      return j
    }), n.d(t, "m", function () {
      return P
    }), n.d(t, "e", function () {
      return C
    }), n.d(t, "o", function () {
      return B
    }), n.d(t, "p", function () {
      return E
    }), n.d(t, "s", function () {
      return O
    }), n.d(t, "x", function () {
      return L
    }), n.d(t, "y", function () {
      return R
    }), n.d(t, "v", function () {
      return T
    }), n.d(t, "w", function () {
      return K
    }), n.d(t, "k", function () {
      return A
    }), n.d(t, "B", function () {
      return I
    }), n.d(t, "g", function () {
      return N
    }), n.d(t, "F", function () {
      return $
    }), n.d(t, "G", function () {
      return q
    }), n.d(t, "i", function () {
      return M
    });
    var r = n("4328"),
      o = n.n(r),
      a = n("bc3a"),
      u = n.n(a);
    if (u.a.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded",
      "localhost" === location.hostname) var c = "http://search.localhost.com";
    else if ("https:" === document.location.protocol) c = "https://audit.123456q.com";
    else c = "http://audit.123456q.com";
    var i = function (e, t) {
        var n = {
          method: e.method || "get",
          url: e.url,
          baseURL: c,
          params: t,
          data: o.a.stringify(t),
          withCredentials: !0
        };
        return "post" === e.method ? delete n.params : delete n.data, new Promise(function (e,
          t) {
          u()(n).then(function (t) {
            e(t.data)
          }).catch(function (e) {
            t(e)
          })
        })
      },
      l = function (e) {
        return i({
          method: "post",
          url: "/Home/Back/addGame"
        }, e)
      },
      f = function (e) {
        return i({
          url: "/Home/Back/User"
        })
      },
      d = function (e) {
        return i({
          method: "post",
          url: "/Home/Back/showIPInfo"
        }, e)
      },
      s = function (e) {
        return i({
          method: "post",
          url: "/Home/Back/updateAuditState"
        }, e)
      },
      h = function (e) {
        return i({
          method: "post",
          url: "/Home/Back/get_all_audit"
        }, e)
      },
      p = function (e) {
        return i({
          method: "post",
          url: "/Home/Back/add_user"
        }, e)
      },
      m = function (e) {
        return i({
          method: "post",
          url: "/Home/Back/edit_app"
        }, e)
      },
      g = function (e) {
        return i({
          url: "/Home/Login/checkLogin"
        }, e)
      },
      k = function (e) {
        return i({
          method: "post",
          url: "/Home/Login/login"
        }, e)
      },
      b = function (e) {
        var t = localStorage.getItem("language") ? localStorage.getItem("language") : "cn";
        return i({
          method: "get",
          url: "/Home/KeywordRank/get_category?language=" + t
        }, e)
      },
      v = function (e) {
        return i({
          url: "/Home/KeywordRank/get_language "
        }, e)
      },
      y = function (e) {
        var t = localStorage.getItem("language") ? localStorage.getItem("language") : "cn";
        return i({
          method: "post",
          url: "/Home/KeywordRank/get_key_str?language=" + t
        }, e)
      },
      w = function (e) {
        var t = localStorage.getItem("language") ? localStorage.getItem("language") : "cn";
        return i({
          method: "get",
          url: "/Home/KeywordRank/download_excel?language=" + t
        }, e)
      },
      _ = function (e) {
        return i({
          method: "post",
          url: "/Home/KeywordRetrieval/get_key_list"
        }, e)
      },
      H = function (e) {
        return i({
          method: "post",
          url: "/Home/KeywordRetrieval/get_key_excel"
        }, e)
      },
      x = function (e) {
        return i({
          method: "post",
          url: "/Home/KeywordRetrieval/get_key_str"
        }, e)
      },
      S = function (e) {
        return i({
          url: "/Home/ClearList/get_key_info"
        }, e)
      },
      j = function (e) {
        return i({
          url: "/Home/ClearList/time_set"
        }, e)
      },
      P = function (e) {
        return i({
          method: "post",
          url: "/Home/ClearList/get_key_list"
        }, e)
      },
      C = function (e) {
        return i({
          method: "post",
          url: "/Home/ClearList/delete_key"
        }, e)
      },
      B = function (e) {
        return i({
          method: "post",
          url: "/Home/ClearList/get_history_judge"
        }, e)
      },
      E = function (e) {
        return i({
          method: "post",
          url: "/Home/ClearList/get_history_keyword"
        }, e)
      },
      O = function (e) {
        return i({
          url: "/Home/KeywordApp/index"
        }, e)
      },
      L = function (e) {
        return i({
          url: "/laravel/public/admin/api/search_sub"
        }, e)
      },
      R = function (e) {
        return i({
          url: "/laravel/public/admin/api/search_wechat_sub"
        }, e)
      },
      T = function (e) {
        return i({
          url: "/laravel/public/admin/api/search_app"
        }, e)
      },
      K = function (e) {
        return i({
          url: "/laravel/public/admin/api/search_wechat_app"
        }, e)
      },
      A = function (e) {
        return i({
          url: "/laravel/public/admin/api/get_cnipa"
        }, e)
      },
      I = c + "Home/KeywordRank/add_jieba_dict",
      N = c,
      $ = c + "Home/KeywordRank/upload_excel",
      q = c + "/Home/Login/verify",
      M = c + "/laravel/public/admin/api/download_cnipa"
  },
  "490c": function (e, t, n) {
    "use strict";
    var r = n("135b"),
      o = n.n(r);
    o.a
  },
  "56d7": function (e, t, n) {
    "use strict";
    n.r(t);
    n("7f7f"), n("cadf"), n("551c"), n("097d");
    var r = n("2b0e"),
      o = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t;
        return n("div", {
          attrs: {
            id: "app"
          }
        }, [n("router-view")], 1)
      },
      a = [],
      u = n("365c"),
      c = {
        data: function () {
          return {
            isPc: !0
          }
        },
        mounted: function () {
          this.$router.push({
            path: "/examination"
          })
        },
        methods: {}
      },
      i = c,
      l = (n("034f"), n("490c"), n("2877")),
      f = Object(l["a"])(i, o, a, !1, null, null, null);
    f.options.__file = "App.vue";
    var d = f.exports,
      s = n("8c4f"),
      h = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t;
        return n("div", {
          staticClass: "content"
        }, [e.isPc ? n("Menu", {
          staticClass: "menu",
          attrs: {
            theme: "dark",
            accordion: "",
            "open-names": ["1"],
            "active-name": e.activeName
          },
          on: {
            "on-select": e.route
          }
        }, [n("Submenu", {
          attrs: {
            name: "1"
          }
        }, [n("template", {
          slot: "title"
        }, [n("i", {
          staticClass: "fas fa-tasks"
        }), e._v("\n        管理区\n      ")]), e._l(e.tasks, function (t) {
          return n("MenuItem", {
            key: t.title,
            attrs: {
              name: t.path
            }
          }, [n("i", {
            class: t.icon
          }), e._v("\n        " + e._s(t.title) + "\n      ")])
        })], 2)], 1) : e._e(), n("main", {
          ref: "main",
          staticStyle: {
            background: "#f0f2f5"
          }
        }, [n("router-view")], 1)], 1)
      },
      p = [],
      m = {
        components: {},
        data: function () {
          return {
            activeName: "/examination",
            tasks: [{
              title: "提审游戏管理",
              icon: "fas fa-chalkboard-teacher",
              path: "/examination"
            }, {
              title: "游戏横竖屏管理",
              icon: "fas fa-tablet-alt",
              path: "/direction"
            }, {
              title: "技术支持网站管理",
              icon: "fas fa-question",
              path: "/support"
            }, {
              title: "热门关键词",
              icon: "fas fa-fire",
              path: "/hotkeyword"
            }, {
              title: "关键词联想",
              icon: "fas fa-server",
              path: "/keywordthink"
            }, {
              title: "清榜统计",
              icon: "fas fa-th-list",
              path: "/clearlist"
            }, {
              title: "微信联想词",
              icon: "fas fa-th-list",
              path: "/WechatThink"
            }, {
              title: "微信小程序搜索",
              icon: "fas fa-th-list",
              path: "/WechatSearch"
            }, {
              title: "商标注册检索",
              icon: "fas fa-th-list",
              path: "/BrandRegister"
            }],
            isPc: !0
          }
        },
        mounted: function () {
          var e = this;
          Object(u["d"])().then(function (t) {
            -1 === t.code ? e.$router.push({
              path: "/login"
            }) : "adtester" == t.msg ? (e.activeName = "/hotkeyword", e.tasks = [{
              title: "热门关键词",
              icon: "fas fa-fire",
              path: "/hotkeyword"
            }, {
              title: "关键词联想",
              icon: "fas fa-server",
              path: "/keywordthink"
            }, {
              title: "清榜统计",
              icon: "fas fa-th-list",
              path: "/clearlist"
            }], e.$router.push({
              path: "/hotkeyword"
            })) : e.$router.push({
              path: "/examination"
            })
          })
        },
        methods: {
          route: function (e) {
            this.$router.push({
              path: e
            })
          }
        }
      },
      g = m,
      k = Object(l["a"])(g, h, p, !1, null, null, null);
    k.options.__file = "Home.vue";
    var b = k.exports;
    r["default"].use(s["a"]);
    var v = function (e, t, n) {
        console.log("router"), n(), Object(u["d"])().then(function (e) {
          1 == e.code && ("adtester" != e.msg ? n() : n("/hotkeyword"))
        })
      },
      y = new s["a"]({
        base: "/",
        routes: [{
          path: "/login",
          name: "login",
          component: function () {
            return n.e("chunk-a4ba5698").then(n.bind(null, "7101"))
          }
        }, {
          path: "/",
          name: "index",
          component: b,
          children: [{
            path: "/examination",
            name: "examination",
            component: function () {
              return n.e("chunk-24e6f6a5").then(n.bind(null, "cd82"))
            },
            beforeEnter: v
          }, {
            path: "/direction",
            name: "direction",
            component: function () {
              return n.e("chunk-d9906980").then(n.bind(null, "46ec"))
            },
            beforeEnter: v
          }, {
            path: "/support",
            name: "support",
            component: function () {
              return n.e("chunk-75f3b766").then(n.bind(null, "69d2"))
            },
            beforeEnter: v
          }, {
            path: "/hotkeyword",
            name: "hotkeyword",
            component: function () {
              return Promise.all([n.e("chunk-74739484"), n.e("chunk-cf05ffa6")])
                .then(n.bind(null, "dd56"))
            }
          }, {
            path: "/keywordthink",
            name: "keywordthink",
            component: function () {
              return Promise.all([n.e("chunk-74739484"), n.e("chunk-6a64967a")])
                .then(n.bind(null, "691a"))
            }
          }, {
            path: "/clearlist",
            name: "clearlist",
            component: function () {
              return n.e("chunk-03364c4b").then(n.bind(null, "9d73"))
            }
          }, {
            path: "/KeywordApp",
            name: "KeywordApp",
            component: function () {
              return n.e("chunk-020fe9eb").then(n.bind(null, "a852"))
            }
          }, {
            path: "/WechatThink",
            name: "WechatThink",
            component: function () {
              return n.e("chunk-38c3dd7a").then(n.bind(null, "8e43"))
            }
          }, {
            path: "/WechatSearch",
            name: "WechatSearch",
            component: function () {
              return n.e("chunk-96f6c494").then(n.bind(null, "ebeb"))
            }
          }, {
            path: "/BrandRegister",
            name: "BrandRegister",
            component: function () {
              return Promise.all([n.e("chunk-74739484"), n.e("chunk-5d2f9696")])
                .then(n.bind(null, "9590"))
            }
          }]
        }]
      }),
      w = n("2f62");
    r["default"].use(w["a"]);
    var _ = new w["a"].Store({
        state: {
          language: "cn"
        },
        mutations: {},
        actions: {}
      }),
      H = n("e069"),
      x = n.n(H);
    n("dcad"), n("15f5");

    function S(e) {
      console.log(e)
    }
    r["default"].use(x.a), window.log = S, r["default"].config.productionTip = !1, y.beforeEach(
      function (e, t, n) {
        "login" == e.name ? Object(u["d"])().then(function (e) {
          -1 === e.code ? n() : n("/examination")
        }) : "/" == e.path ? n("/examination") : Object(u["d"])().then(function (e) {
          -1 === e.code ? n("/login") : n()
        })
      }), new r["default"]({
      router: y,
      store: _,
      render: function (e) {
        return e(d)
      }
    }).$mount("#app")
  },
  "64a9": function (e, t, n) {}
});
//# sourceMappingURL=app.9d4d45ef.js.map
