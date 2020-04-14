this["@ali/lib-applink/callApp"] = function(e) {
    function t(o) {
        if(n[o]) return n[o].exports;
        var a = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }
    var o = window.webpackJsonp_ali_lib_applink__name_;
    window.webpackJsonp_ali_lib_applink__name_ = function(r, i) {
        for(var s, l, c = 0, u = []; c < r.length; c++) l = r[c], a[l] && u.push.apply(u, a[l]), a[l] = 0;
        for(s in i) e[s] = i[s];
        for(o && o(r, i); u.length;) u.shift().call(null, t);
        if(i[0]) return n[0] = 0, t(0)
    };
    var n = {},
        a = {
            0: 0
        };
    return t.e = function(e, o) {
        if(0 === a[e]) return o.call(null, t);
        if(void 0 !== a[e]) a[e].push(o);
        else {
            a[e] = [o];
            var n = document.getElementsByTagName("head")[0],
                r = document.createElement("script");
            r.type = "text/javascript", r.charset = "utf-8", r.async = !0, r.src = t.p + "" + e + "." + ({
                1: "linksdk"
            }[e] || e) + ".js", n.appendChild(r)
        }
    }, t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, o) {
    e.exports = o(1)
}, function(e, t, o) {
    "use strict";

    function n(e) {
        if(e && e.__esModule) return e;
        var t = {};
        if(null != e)
            for(var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t["default"] = e, t
    }

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e, t) {
        var o = new p["default"](location.href);
        for(var n in o.params) e.params.hasOwnProperty(n) || (e.params[n] = o.params[n]);
        if("object" === ("undefined" == typeof t ? "undefined" : d(t)))
            for(var a in t) "number" == typeof t[a] ? e.params[a] = "" + t[a] : "function" == typeof t[a] ? e.params[a] = "" : e.params[a] = t[a];
        return e
    }

    function i(e) {
        I || (I = S.createElement("iframe"), I.id = "callapp_iframe_" + Date.now(), I.frameborder = "0", I.style.cssText = "display:none;border:0;width:0;height:0;", S.body.appendChild(I)), I.src = e
    }

    function s(e, t) {
        t === !1 || !E && t !== !0 ? location.href = e : location.replace(e)
    }

    function l(e) {
        var t = document.createElement("a");
        t.setAttribute("href", e), t.style.display = "none", document.body.appendChild(t);
        var o = document.createEvent("HTMLEvents");
        o.initEvent("click", !1, !1), t.dispatchEvent(o)
    }

    function c(e) {
        if(e instanceof p["default"])
            for(var t in e._params) null !== e.params[t] && "undefined" !== e.params[t] && "" !== e.params[t] || delete e.params[t]
    }

    function u() {
        var e = arguments,
            t = {};
        return Array.prototype.forEach.call(e, function(e, o) {
            for(var n in e) void 0 !== e[n] && null !== e[n] || delete e[n];
            t = (0, y["default"])(t, e)
        }), t
    }
    var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        f = o(2),
        p = a(f),
        h = o(3),
        m = n(h),
        v = o(10),
        y = a(v),
        w = o(11),
        b = n(w),
        g = b.BIZ_DEFAULT_CONF,
        _ = b.ERROR_ENUM,
        S = window.document,
        O = window.navigator.userAgent,
        P = m.os,
        E = (m.params, m.aliapp),
        k = m.browser;
    k.isLieBaoFast = O.match(/(?:LieBaoFast\/)([\d\.]+)/), k.isBaiduBrowser = O.match(/(?:baidubrowser\/)([\d\.]+)/);
    var A = m.os.isIOS ? 2e3 : 1e3,
        M = {
            callNative: function(e) {
                var t = "" + e.protocol + e.hostPath;
                try {
                    t = new p["default"](t)
                } catch(o) {
                    return void console.error(_.CALLNATIVE_ERROR.MSG)
                }
                e.params && r(t, e.params), c(t);
                var n = P.isAndroid && k.isChrome && !k.isWebview,
                    a = P.isAndroid && (k.isQQ || k.isLieBaoFast),
                    u = P.isAndroid && !!O.match(/samsung/i) && P.version.gte("4.3") && P.version.lt("4.5"),
                    d = P.isIPhone && P.version.gte("9.0") && k.isSafari;
                return(n || a || u || e.forceIntent) && (t.hash = "Intent;scheme=" + t.protocol.replace(":", "") + ";package=" + e["package"] + ";end", t.protocol = "intent:"), d ? setTimeout(function() {
                    l(t.toString())
                }, 300) : "intent:" === t.protocol ? setTimeout(function() {
                    s(t.toString())
                }, 300) : setTimeout(function() {
                    i(t.toString())
                }, 300), t.toString()
            },
            gotoApp: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return g[e] && g[e].protocol ? g[e].usable === !1 ? void console.error("" + _.CALLNATIVE_NOT_USABLE.MSG) : (t.protocol = t.protocol || g[e].protocol || "", t.hostPath = t.hostPath || g[e].hostPath || "", t["package"] = t["package"] || g[e]["package"] || "", M.callNative(t)) : void console.error(_.LINKKEY_ERROR.MSG + ", please check the params of callApp.gotoApp.")
            },
            download: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                if(!g[e] && !t.downloadUrl) return void console.error(_.LINKKEY_ERROR.MSG + ", please check the params of callApp.download.");
                t.downloadUrl || (t.downloadUrl = g[e].downloadUrl);
                var o = new p["default"](t.downloadUrl);
                t.exdParams && r(o, t.exdParams), c(o), o = o.toString(), s(o, t.replace)
            },
            gotoPage: function(e) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                return g[e] && g[e].protocol || console.error(_.LINKKEY_ERROR.MSG + ", please check the params of callApp.gotoPage."), t = u({
                    timeout: A
                }, t), t.targetUrl = M.gotoApp(e, t), t.isNeedDownload ? ! function() {
                    var o = window.setTimeout(function() {
                        clearTimeout(o), M.download(e, t)
                    }, t.timeout)
                }() : t.uri && ! function() {
                    var e = window.setTimeout(function() {
                        clearTimeout(e), s(t.uri, t.replace)
                    }, t.timeout)
                }(), t.targetUrl
            }
        },
        I = void 0;
    e.exports = M
}, function(e, t) {
    "use strict";

    function o(e, t) {
        if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        a = function() {
            function e(e, t) {
                var o = [],
                    n = !0,
                    a = !1,
                    r = void 0;
                try {
                    for(var i, s = e[Symbol.iterator](); !(n = (i = s.next()).done) && (o.push(i.value), !t || o.length !== t); n = !0);
                } catch(l) {
                    a = !0, r = l
                } finally {
                    try {
                        !n && s["return"] && s["return"]()
                    } finally {
                        if(a) throw r
                    }
                }
                return o
            }
            return function(t, o) {
                if(Array.isArray(t)) return t;
                if(Symbol.iterator in Object(t)) return e(t, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        r = "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? function(e) {
            return "undefined" == typeof e ? "undefined" : n(e)
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : "undefined" == typeof e ? "undefined" : n(e)
        },
        i = function() {
            function e(e, t) {
                for(var o = 0; o < t.length; o++) {
                    var n = t[o];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }();
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$", "i"),
        l = function() {
            function e(t) {
                o(this, e), this._params = {}, this._hash = "", t && this.assign(t.toString())
            }
            return i(e, [{
                key: "assign",
                value: function(e) {
                    e = e || "";
                    var t = e.match(s);
                    if(!t) throw new Error("Parse Error");
                    this.protocol = t[1] || ("object" === ("undefined" == typeof location ? "undefined" : r(location)) ? location.protocol : ""), this.username = t[2] || "", this.password = t[3] || "", this.hostname = t[4], this.port = t[5] || "", this.pathname = t[6] || "/", this.search = t[7] || "", this.hash = t[8] || "", this.origin = this.protocol + "//" + this.host
                }
            }, {
                key: "toString",
                value: function() {
                    var e = this.protocol + "//";
                    return this.username && (e += this.username, this.password && (e += ":" + this.password), e += "@"), e += this.hostname, this.port && "80" !== this.port && (e += ":" + this.port), this.pathname && (e += this.pathname), this.search && (e += this.search), this.hash && (e += this.hash), e
                }
            }, {
                key: "params",
                get: function() {
                    return this._params
                },
                set: function(e) {
                    if(e && "object" === ("undefined" == typeof e ? "undefined" : r(e)) && !(e instanceof Date) && !(e instanceof RegExp) && !(e instanceof Array) && !(e instanceof String) && !(e instanceof Number) && !(e instanceof Boolean)) {
                        for(var t in this._params) delete this._params[t];
                        for(var t in e) this._params[t] = e[t]
                    }
                }
            }, {
                key: "search",
                get: function() {
                    var e = [];
                    for(var t in this._params)
                        if(void 0 !== this._params[t])
                            if("" !== this._params[t]) try {
                                e.push(encodeURIComponent(t) + "=" + encodeURIComponent(this._params[t]))
                            } catch(o) {
                                e.push(t + "=" + this._params[t])
                            } else try {
                                e.push(encodeURIComponent(t))
                            } catch(o) {
                                e.push(t)
                            }
                    return e.length ? "?" + e.join("&") : ""
                },
                set: function(e) {
                    if("string" == typeof e || e instanceof String) {
                        e = e.toString(), 0 === e.indexOf("?") && (e = e.substr(1));
                        var t = e.split("&");
                        for(var o in this._params) delete this._params[o];
                        for(var n = 0; n < t.length; n++) {
                            var r = t[n].split("="),
                                i = a(r, 2),
                                s = i[0],
                                l = i[1];
                            if(void 0 !== l && (l = l.toString()), s) try {
                                this._params[decodeURIComponent(s)] = decodeURIComponent(l)
                            } catch(c) {
                                this._params[s] = l
                            }
                        }
                    }
                }
            }, {
                key: "hash",
                get: function() {
                    return this._hash
                },
                set: function(e) {
                    ("string" == typeof e || e instanceof String) && (e = e.toString(), e && e.indexOf("#") < 0 && (e = "#" + e), this._hash = e || "")
                }
            }, {
                key: "host",
                get: function() {
                    return this.hostname + (this.port ? ":" + this.port : "")
                },
                set: function(e) {
                    if("string" == typeof e || e instanceof String) {
                        e = e.toString();
                        var t = e.match(/([^:\/?#]+)(?:[:]([0-9]+))?/);
                        t && (this.hostname = t[1], this.port = t[2] || "")
                    }
                }
            }]), e
        }();
    t["default"] = l
}, function(e, t, o) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.Version = t.params = t.thirdapp = t.aliapp = t.os = t.browser = void 0;
    var a = o(4),
        r = n(a),
        i = o(7),
        s = n(i),
        l = o(6),
        c = n(l),
        u = o(8),
        d = n(u),
        f = o(9),
        p = n(f),
        h = o(5),
        m = n(h);
    t.browser = s["default"], t.os = c["default"], t.aliapp = r["default"], t.thirdapp = d["default"], t.params = p["default"], t.Version = m["default"]
}, function(e, t, o) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, r, i = o(5),
        s = n(i),
        l = o(6),
        c = n(l),
        u = window.navigator.userAgent,
        d = !1,
        f = "",
        p = "",
        h = "";
    (r = u.match(/WindVane[\/\s]([\d\.\_]+)/i)) && (a = r[1]), (r = u.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i)) && (d = !0, f = r[1], h = r[2], p = f.indexOf("-PD") > 0 ? c["default"].isIOS ? "iPad" : c["default"].isAndroid ? "AndroidPad" : c["default"].name : c["default"].name), !f && u.indexOf("TBIOS") > 0 && (f = "TB");
    var m = window._ua_popLayer || "",
        v = !1,
        y = "";
    m && (r = m.match(/PopLayer\/([\d\.]+)/i)) && (v = !0, y = r[1]), d && (d = {
        windvane: new s["default"](a || "0.0.0"),
        appname: f || "unkown",
        version: new s["default"](h || "0.0.0"),
        platform: p || c["default"].name,
        poplayer: v || !1,
        poplayerVersion: new s["default"](y || "0.0.0")
    }), t["default"] = d
}, function(e, t) {
    "use strict";

    function o(e, t) {
        if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function() {
            function e(e, t) {
                for(var o = 0; o < t.length; o++) {
                    var n = t[o];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }(),
        a = function() {
            function e(t) {
                o(this, e), t ? this.val = t.toString() : this.val = ""
            }
            return n(e, null, [{
                key: "compare",
                value: function(e, t) {
                    e = e.toString().split("."), t = t.toString().split(".");
                    for(var o = 0; o < e.length || o < t.length; o++) {
                        var n = parseInt(e[o], 10),
                            a = parseInt(t[o], 10);
                        if(isNaN(n) && (n = 0), isNaN(a) && (a = 0), n < a) return -1;
                        if(n > a) return 1
                    }
                    return 0
                }
            }]), n(e, [{
                key: "gt",
                value: function(t) {
                    return e.compare(this, t) > 0
                }
            }, {
                key: "gte",
                value: function(t) {
                    return e.compare(this, t) >= 0
                }
            }, {
                key: "lt",
                value: function(t) {
                    return e.compare(this, t) < 0
                }
            }, {
                key: "lte",
                value: function(t) {
                    return e.compare(this, t) <= 0
                }
            }, {
                key: "eq",
                value: function(t) {
                    return 0 === e.compare(this, t)
                }
            }, {
                key: "toString",
                value: function() {
                    return this.val.toString()
                }
            }]), e
        }();
    t["default"] = a
}, function(e, t, o) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, r, i = o(5),
        s = n(i),
        l = window.navigator.userAgent;
    if(r = l.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/)) a = {
        name: "Windows Phone",
        isWindowsPhone: !0,
        version: new s["default"](r[1])
    };
    else if(l.match(/Safari/) && (r = l.match(/Android[\s\/]([\d\.]+)/))) a = {
        version: new s["default"](r[1])
    }, l.match(/Mobile\s+Safari/) ? (a.name = "Android", a.isAndroid = !0) : (a.name = "AndroidPad", a.isAndroidPad = !0);
    else if(r = l.match(/(iPhone|iPad|iPod)/)) {
        var c = r[1];
        (r = l.match(/OS ([\d_\.]+) like Mac OS X/)) && (a = {
            name: c,
            isIPhone: "iPhone" === c || "iPod" === c,
            isIPad: "iPad" === c,
            isIOS: !0,
            version: new s["default"](r[1].split("_").join("."))
        })
    }
    a || (a = {
        name: "unknown",
        version: new s["default"]("0.0.0")
    }), t["default"] = a
}, function(e, t, o) {
    "use strict";

    function n(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, r, i = o(5),
        s = n(i),
        l = window.navigator.userAgent;
    (r = l.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) ? a = {
        name: "UC",
        isUC: !0,
        version: new s["default"](r[1])
    }: (r = l.match(/MQQBrowser\/([\d\.]+)/)) ? a = {
        name: "QQ",
        isQQ: !0,
        version: new s["default"](r[1])
    } : (r = l.match(/(?:Firefox|FxiOS)\/([\d\.]+)/)) ? a = {
        name: "Firefox",
        isFirefox: !0,
        version: new s["default"](r[1])
    } : (r = l.match(/MSIE\s([\d\.]+)/)) || (r = l.match(/IEMobile\/([\d\.]+)/)) ? (a = {
        version: new s["default"](r[1])
    }, l.match(/IEMobile/) ? (a.name = "IEMobile", a.isIEMobile = !0) : (a.name = "IE", a.isIE = !0), l.match(/Android|iPhone/) && (a.isIELikeWebkit = !0)) : (r = l.match(/(?:Chrome|CriOS)\/([\d\.]+)/)) ? (a = {
        name: "Chrome",
        isChrome: !0,
        version: new s["default"](r[1])
    }, l.match(/Version\/[\d+\.]+\s*Chrome/) && (a.name = "Chrome Webview", a.isWebview = !0)) : l.match(/Safari/) && (r = l.match(/Android[\s\/]([\d\.]+)/)) ? a = {
        name: "Android",
        isAndroid: !0,
        version: new s["default"](r[1])
    } : l.match(/iPhone|iPad|iPod/) && (l.match(/Safari/) && (r = l.match(/Version\/([\d\.]+)/)) ? a = {
        name: "Safari",
        isSafari: !0,
        version: new s["default"](r[1])
    } : (r = l.match(/OS ([\d_\.]+) like Mac OS X/)) && (a = {
        name: "iOS Webview",
        isWebview: !0,
        version: new s["default"](r[1].replace(/\_/g, "."))
    })), a || (a = {
        name: "unknown",
        version: new s["default"]("0.0.0")
    }), t["default"] = a
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o, n = window.navigator.userAgent;
    o = n.match(/Weibo/i) ? {
        appname: "Weibo",
        isWeibo: !0
    } : !!n.match(/MicroMessenger/i) && {
        appname: "Weixin",
        isWeixin: !0
    }, t["default"] = o
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = {},
        n = window.location.search.replace(/^\?/, "");
    if(n)
        for(var a = n.split("&"), r = 0; r < a.length; r++) {
            a[r] = a[r].split("=");
            try {
                o[a[r][0]] = decodeURIComponent(a[r][1])
            } catch(i) {
                o[a[r][0]] = a[r][1]
            }
        }
    t["default"] = o
}, function(e, t) {
    "use strict";

    function o() {
        for(var e = {}, t = 0; t < arguments.length; t++) {
            var o = arguments[t];
            for(var a in o) n.call(o, a) && (e[a] = o[a])
        }
        return e
    }
    e.exports = o;
    var n = Object.prototype.hasOwnProperty
}, function(e, t, o) {
    "use strict";

    function n(e) {
        if(e && e.__esModule) return e;
        var t = {};
        if(null != e)
            for(var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t["default"] = e, t
    }
    var a = o(3),
        r = n(a),
        i = {
            LINKKEY_ERROR: {
                MSG: "linkKey should be TB/TM/TBI/TMI"
            },
            CALLNATIVE_ERROR: {
                MSG: "callNative url is invalid"
            },
            CALLNATIVE_NOT_USABLE: {
                MSG: "callNative evn is invalid"
            }
        },
        s = {
            TB: {
                protocol: "tbopen://",
                hostPath: "m.taobao.com/tbopen/index.html",
                "package": "com.taobao.taobao",
                downloadUrl: "//h5.m.taobao.com/bcec/downloadTaobao.html",
                usable: "TB" != r.aliapp.appname
            },
            TBI: {
                protocol: "taobao://",
                "package": "com.taobao.taobao",
                downloadUrl: "//h5.m.taobao.com/bcec/downloadTaobao.html",
                usable: "TB" != r.aliapp.appname
            },
            TM: {
                protocol: "tmall://",
                hostPath: "page.tm/appLink",
                "package": "com.tmall.wireless",
                downloadUrl: "//pages.tmall.com/wow/portal/act/app-download",
                usable: "TM" != r.aliapp.appname
            },
            TMI: {
                protocol: "tmall://",
                "package": "com.tmall.wireless",
                downloadUrl: "//pages.tmall.com/wow/portal/act/app-download",
                usable: "TM" != r.aliapp.appname
            }
        };
    Object.keys(s).forEach(function(e) {
        Object.defineProperty(s[e], "protocol", {
            writable: !1,
            configurable: !1
        }), Object.defineProperty(s[e], "package", {
            writable: !1,
            configurable: !1
        })
    }), t.ERROR_ENUM = i, t.BIZ_DEFAULT_CONF = s
}]);
this["@ali/lib-applink/linksdk"] = webpackJsonp_ali_lib_applink__name_([1], [function(e, t, r) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function n(e) {
        var t = new i["default"](e);
        return p["default"].bcAplus(t), t
    }
    var a = r(12),
        i = o(a),
        l = r(15),
        p = o(l);
    ! function() {
        window.goldlog && window.goldlog.record || p["default"].getScript()
    }(), window.BCSDK_AppLink = window.BCSDK_AppLink || {}, window.BCSDK_AppLink.init = n, e.exports = n
}, , , , , , , , , , , , function(e, t, r) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function n(e, t) {
        if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t, r) {
        var o = new A["default"](window.location.href),
            n = e.appkey,
            a = e.params && e.params.isv_code || "",
            l = e.params && e.params.visa || o.params.visa || "",
            u = "ybh.100.1",
            c = "H46717801",
            s = [],
            d = {
                jumpType: t,
                jumpTo: encodeURIComponent(r),
                appkey: n,
                ttid: p(e),
                isv_code: a,
                source: "linksdk",
                linkKey: e.linkKey,
                v: I,
                fromUrl: encodeURIComponent(window.location.href.split("?")[0]),
                visa: l
            };
        d = h(e.params, d);
        for(var f in d) s.push(f + "=" + d[f]);
        try {
            window.goldlog && goldlog.record ? window.goldlog.record("/" + u, "", s.join("&"), c) : i("https://wgo.mmstat.com/" + u + "?" + s.join("&") + ("&t=" + (new Date).getTime() + "}"))
        } catch(v) {
            return !1
        }
    }

    function i(e) {
        var t = document.createElement("img");
        t.style.cssText = "display:none", t.src = e, document.body.appendChild(t)
    }

    function l() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            t = p(e),
            r = [],
            o = {
                ttid: t
            },
            n = e.ybhpss || "";
        if(e.trackParams && (o = (0, y["default"])(o, e.trackParams)), n) try {
            ! function() {
                var e = decodeURIComponent(n),
                    t = atob(e),
                    r = t.split("&"),
                    a = {};
                r.forEach(function(e, t) {
                    var r = e.split("=");
                    a[r[0]] = decodeURIComponent(r[1])
                }), o = (0, y["default"])(o, a)
            }()
        } catch(a) {
            console.error("ybhpss decode error:", n)
        }
        for(var i in o) {
            var l = encodeURIComponent(o[i]);
            r.push(i + "=" + l)
        }
        return n = r.join("&"), n = (0, b["default"])(n), n = encodeURIComponent(n)
    }

    function p() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            t = e.appkey,
            r = e.channelType || "0",
            o = e.channelName || "";
        return "2014_" + r + o + "_" + t + "@baichuan_h5_" + I
    }

    function u(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
            r = p(t),
            o = d(e),
            n = l(t),
            a = t.params || {};
        if(!e || !o) return console.error(N.D_ERR), !1;
        for(var i in a) {
            var u = a[i];
            "object" === ("undefined" == typeof u ? "undefined" : v(u)) ? u = JSON.stringify(u): "function" == typeof u && (u = ""), o.params[i] = u
        }
        return o.params.ttid = o.params.ttid || r, o.params.ybhpss = decodeURIComponent(n), o.toString()
    }

    function c() {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            t = arguments.length <= 1 || void 0 === arguments[1] ? "h5" : arguments[1],
            r = e.params || {},
            o = e.itemId,
            n = e.shopId,
            a = e.tkUrl,
            i = e.url,
            u = e.backURL,
            c = e.appkey,
            d = r.isv_code || "",
            f = p(e),
            h = l(e),
            v = {};
        if(v = {
                action: "ali.open.nav",
                module: t,
                appkey: c,
                backURL: u || "",
                TTID: f,
                packageName: r.packageName || "",
                source: "linksdk",
                tag: d,
                utdid: r.utdid || "",
                v: I
            }, r.ybhpss = h, delete r.packageName, delete r.utdid, o) r.itemId = o;
        else if(n) r.shopId = n;
        else if(a) v.h5Url = s(a, r);
        else {
            if(!i) return console.error(N.NULL), !1;
            v.h5Url = s(i, r)
        }
        for(var m in r) "number" == typeof r[m] && (r[m] = "" + r[m]);
        v.params = JSON.stringify(r);
        for(var g in v) "function" == typeof v[g] ? v[g] = "" : "string" != typeof v[g] && (v[g] = JSON.stringify(v[g]));
        var y = {
            uri: e.uri,
            isNeedDownload: e.isNeedDownload,
            params: v
        };
        return e.timeout && (y.timeout = e.timeout), y
    }

    function s(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
            r = d(e);
        return e && r ? (r.params.params = JSON.stringify(t), r.toString()) : (console.error(N.D_ERR), !1)
    }

    function d(e) {
        if(!e) return !1;
        try {
            return new A["default"](e)
        } catch(t) {
            return !1
        }
    }

    function f(e) {
        return !!e.appkey || (console.error(N.NULL_APPKEY), !1)
    }

    function h() {
        var e = arguments,
            t = {};
        return Array.prototype.forEach.call(e, function(e, r) {
            for(var o in e) void 0 !== e[o] && null !== e[o] || (e[o] = "");
            t = (0, y["default"])(t, e)
        }), t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        m = function() {
            function e(e, t) {
                for(var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r), o && e(t, o), t
            }
        }(),
        g = r(10),
        y = o(g),
        k = r(13),
        b = o(k),
        _ = r(2),
        A = o(_),
        w = r(1),
        C = o(w),
        I = "0.3.8",
        L = "BCSDK:",
        N = {
            D_ERR: L + "鎵句笉鍒皍rl鎴栬€卽rl涓嶇鍚堟爣鍑嗚鍒�",
            UA_ERR: L + "涓嶇鍚堢櫨宸濊鑼�",
            INIT_APPKEY: L + "鍒濆鍖栨湭鎵惧埌appkey",
            NULL: L + "鎵句笉鍒板璞�",
            NULL_ITEMID: L + "鎵句笉鍒癷temId",
            NULL_SHOPID: L + "鎵句笉鍒皊hopId",
            NULL_APPKEY: L + "鎵句笉鍒癮ppkey"
        },
        S = {
            appkey: "",
            backURL: "",
            openApp: !0,
            linkKey: "TB",
            isNeedDownload: !1,
            isDefaultRedirect: !0,
            channelType: "0",
            channelName: "",
            params: {},
            trackParams: {},
            ybhpss: ""
        },
        U = function() {
            function e(t) {
                n(this, e), this.version = I, this.options = h(S, t || {}), this.options.appkey || console.error(N.INIT_APPKEY)
            }
            return m(e, [{
                key: "openPage",
                value: function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                        t = this;
                    if(e.itemId) t.goDetail(e);
                    else if(e.shopId) t.goShop(e);
                    else if(e.tkUrl) t.goTaoke(e);
                    else {
                        if(!e.url) return console.error(N.NULL), !1;
                        t.gotoUrl(e)
                    }
                }
            }, {
                key: "goDetail",
                value: function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                        t = this;
                    if(e = h(t.options, e), e.params.forceCallApp = e.forceCallApp || 0, !f(e)) return !1;
                    var r = e.itemId,
                        o = "//h5.m.taobao.com/awp/core/detail.htm?id=" + r;
                    return e.itemId ? (a(e, "detail", r), void t.urlLink(o, e, "detail")) : (console.error(N.NULL_ITEMID), !1)
                }
            }, {
                key: "goShop",
                value: function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                        t = this;
                    if(e = h(t.options, e), e.params.forceCallApp = e.forceCallApp || 0, !f(e)) return !1;
                    var r = e.shopId,
                        o = "//shop.m.taobao.com/shop/shop_index.htm?shop_id=" + r;
                    return e.shopId ? (a(e, "shop", r), void t.urlLink(o, e, "shop")) : (console.error(N.NULL_SHOPID), !1)
                }
            }, {
                key: "goTaoke",
                value: function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                        t = this;
                    if(e = h(t.options, e), e.params.forceCallApp = e.forceCallApp || 0, !f(e)) return !1;
                    var r = e.tkUrl,
                        o = d(r);
                    return o ? (a(e, "taoke", r.split("?")[0]), void t.urlLink(r, e, "h5")) : (console.error(N.D_ERR), !1)
                }
            }, {
                key: "gotoUrl",
                value: function() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                        t = this;
                    if(e = h(t.options, e), !f(e)) return !1;
                    var r = e.url,
                        o = d(r);
                    return o ? (a(e, "other", r.split("?")[0]), void t.urlLink(r, e, "h5")) : (console.error(N.D_ERR), !1)
                }
            }, {
                key: "urlLink",
                value: function(e) {
                    var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        r = arguments.length <= 2 || void 0 === arguments[2] ? "h5" : arguments[2];
                    if(!e || !d(e)) return void console.error(N.D_ERR);
                    t.ybhpss = l(t);
                    var o = u(e, t);
                    t.uri = o;
                    var n = c(t, r);
                    t.openApp ? t.isDefaultRedirect ? C["default"].gotoPage(t.linkKey, n) : C["default"].gotoApp(t.linkKey, n) : window.location.href = o
                }
            }]), e
        }();
    t["default"] = U
}, function(e, t, r) {
    "use strict";

    function o(e) {
        var t, r, o, i, l, p, u, c = "",
            s = 0;
        for(e = n(e); s < e.length;) t = e.charCodeAt(s++), r = e.charCodeAt(s++), o = e.charCodeAt(s++), i = t >> 2, l = (3 & t) << 4 | r >> 4, p = (15 & r) << 2 | o >> 6, u = 63 & o, isNaN(r) ? p = u = 64 : isNaN(o) && (u = 64), c = c + a.charAt(i) + a.charAt(l) + a.charAt(p) + a.charAt(u);
        return c
    }
    var n = r(14),
        a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    e.exports = o
}, function(e, t) {
    "use strict";

    function r(e) {
        e = e.replace(/\r\n/g, "\n");
        for(var t = "", r = 0; r < e.length; r++) {
            var o = e.charCodeAt(r);
            o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128))
        }
        return t
    }
    e.exports = r
}, function(e, t, r) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function n(e) {
        var t = "//g.alicdn.com/alilog/mlog/aplus_wap.js",
            r = document.createElement("script");
        return r.src = t, r.onload = function() {
            e && (0, i["default"])(e)
        }, r
    }
    var a = r(16),
        i = o(a),
        l = {
            bcAplus: function(e) {
                if(window.goldlog && window.goldlog.record)(0, i["default"])(e);
                else {
                    var t = n(e);
                    document.body.appendChild(t)
                }
            },
            getScript: n
        };
    e.exports = l
}, function(e, t) {
    "use strict";

    function r() {
        function e(e) {
            e.preventDefault();
            var r = e.target,
                n = o(r);
            t.openPage(n)
        }
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            r = document.querySelectorAll("a"),
            n = t.options || {},
            i = n.dataType || "bc_applink";
        if(!r.length) return !1;
        for(var l = 0; l < r.length; l++) {
            var p = r[l],
                u = p.getAttribute("data-type");
            if(u === i) {
                var c = a;
                if(c || (a = []), c && c.length)
                    for(var s = 0; s < c.length; s++) {
                        var d = c[s];
                        if(d.a === p) {
                            p.removeEventListener("click", d.handler, !1), a.splice(s, 1);
                            break
                        }
                    }
                a.push({
                    a: p,
                    handler: e
                }), p.addEventListener("click", e, !1)
            }
        }
    }

    function o(e) {
        var t = e.getAttribute("data-appkey"),
            r = e.getAttribute("data-linkkey"),
            o = e.getAttribute("data-openapp"),
            a = e.getAttribute("data-itemid"),
            i = e.getAttribute("data-shopid"),
            l = e.getAttribute("data-taoke"),
            p = e.href,
            u = e.getAttribute("data-params"),
            c = e.getAttribute("data-trackparams"),
            s = e.getAttribute("data-ybhpss"),
            d = {
                itemId: a,
                shopId: i,
                tkUrl: l,
                url: p,
                appkey: t,
                linkKey: r,
                openApp: "false" !== o,
                ybhpss: s
            };
        if(u) try {
            d.params = JSON.parse(u)
        } catch(f) {
            delete d.params
        }
        if(c) try {
            d.trackParams = JSON.parse(c)
        } catch(f) {
            delete d.trackParams
        }
        return n(d), d
    }

    function n() {
        var e = arguments;
        Array.prototype.forEach.call(e, function(e, t) {
            for(var r in e) void 0 !== e[r] && null !== e[r] || delete e[r]
        })
    }
    var a = [];
    e.exports = r
}]);