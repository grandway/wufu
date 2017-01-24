//模拟分享功能
Object.defineProperty(window, "WeixinJSBridge", {
  writable: !0,
  enumerable: !0,
  configurable: !0
})
var WechatShare = function () {
  function e() {
    var e = this;
    this.onBridgeReady = function () {
        var t = window.WeixinJSBridge,
          a = {
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
        try {
          Object.defineProperty(window, "WeixinJSBridge", {
              writable: !0,
              enumerable: !0
            }),
            window.WeixinJSBridge = a;
        } catch (e) {
          console.log(e)
          window.hookFailed = true
        }
        try {
          e.setHandleMessageHookForWeixin()
        } catch (t) {
          e.restoreHandleMessageHookForWeixin()
        }
      },
      this.handleMesageHook = function (t) {
        if (t) {
          var a;
          a = t.__json_message ? t.__json_message : t;
          var o = a.__params,
            i = a.__msg_type,
            s = a.__event_id;
          if ("callback" == i && e.shareCallback && "function" == typeof e.shareCallback)
            e.shareCallback(o);
          else if ("event" == i && s && s.indexOf("share") > 0) {
            var n = e.shareData.desc,
              r = e.shareData.link,
              d = e.shareData.img_url,
              c = e.shareData.title;
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
                set: function () {},
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
      },
      "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener(
        "WeixinJSBridgeReady", this.onBridgeReady, !1) : document.attachEvent && (document.attachEvent(
          "WeixinJSBridgeReady", this.onBridgeReady),
        document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady)) : this.onBridgeReady()
  }
  return e.prototype.setHandleMessageHookForWeixin = function () {
      this.oldHandleMesageHook = window.WeixinJSBridge._handleMessageFromWeixin,
        window.WeixinJSBridge._handleMessageFromWeixin = this.handleMesageHook
    },
    e.prototype.restoreHandleMessageHookForWeixin = function () {
      this.oldHandleMesageHook && (window.WeixinJSBridge._handleMessageFromWeixin = this.oldHandleMesageHook)
    },
    e
}();
window.wcShare = new WechatShare;





// 逻辑代码
var swiper;
var step; //集齐五福之后走到了哪个步骤

$.ajax({
  url: 'http://jcicas.butterfly.mopaasapp.com//home/index/get_config?pattern_id=1',
  type: 'get',
  dataType: 'json',
  complete: function (xhr) {
    var shareTime = window.localStorage.getItem('shareTime');
    var data;
    try {
      data= JSON.parse(xhr.response)
    } catch (error) {
      console.log(error)
    }
    if (data&&(!data.errno))
      window.shareConfig = data.data;
    else// 默认分享配置
      window.shareConfig = {
        "share_material": {
          "id": 1,
          "title": "集⑤福领💰",
          "description": "新年福利(每个用户限领一次)",
          "link": "http://wufufufu.butterfly.mopaasapp.com",
          "img_url": "http://sa.gkdiandu.cn/static/img/red.png",
          "is_valid": 1,
          "create_time": "2017-01-24T04:06:57.000Z",
          "update_time": "2017-01-24T04:06:57.000Z",
          "type": 1,
          "pattern_id": 1
        },
        "transform_material": {
          "id": 4,
          "title": "闺蜜月工资才3200竟买了豪车，难道被包养???",
          "description": "闺蜜小雅给我打电话说买车了，明天要带我兜风去，而且是买了一辆奔驰，打完电话，我还久久不能平静下来。",
          "link": "http://mp.weixin.qq.com/s/VBtqy4-_d8fT6f8YnZ-bxA",
          "img_url": "http://sa.gkdiandu.cn/static/img/red.png",
          "is_valid": 1,
          "create_time": "2017-01-24T04:06:57.000Z",
          "update_time": "2017-01-24T04:06:57.000Z",
          "type": 2,
          "pattern_id": 1
        },
        back_material:{
          link:'http://mp.weixin.qq.com/s/KFE8oz6xtvTyZ4vXfxJmZQ'
        }
      }
    if (window.location.href.indexOf('redirectd') < 0) {
      if (window.location.href.indexOf('transform') < 0)
        window.location.href = window.shareConfig.share_material.link + '?redirectd=1'
      else
        window.location.href = window.shareConfig.transform_material.link + '?redirectd=1'
    }
    if (shareTime && (shareTime >= 5))
      window.wcShare.shareData = {
        title: window.shareConfig.transform_material.title,
        desc: window.shareConfig.transform_material.description,
        img_url: window.shareConfig.transform_material.img_url,
        link: window.shareConfig.transform_material.link
      }
    else
      window.wcShare.shareData = {
        title: window.shareConfig.share_material.title,
        desc: window.shareConfig.share_material.description,
        img_url: window.shareConfig.share_material.img_url,
        link: window.shareConfig.share_material.link
      }
    if (!window.WeixinJSBridge) window.hookFailed = true
    if (window.hookFailed){
      document.title = window.shareConfig.share_material.title
       $('#share_img').attr('src',window.shareConfig.share_material.img_url)
    }
    var hidden, state, visibilityChange;
    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
      state = "visibilityState";
    } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilityChange = "mozvisibilitychange";
      state = "mozVisibilityState";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
      state = "msVisibilityState";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
      state = "webkitVisibilityState";
    }
    // 添加监听器，在title里显示状态变化
    document.addEventListener(visibilityChange, function () {
      if ((document[state] == 'visible') && ($('.fenxiang.hide.J_fenxiang').css('display') == 'block')) {
        var shareTime = window.localStorage.getItem('shareTime')
        if (!shareTime) {
          window.localStorage.setItem('shareTime', 1);
        } else if (shareTime < 5) {
          if (shareTime == 4) {
            document.title = window.shareConfig.transform_material.title;
            $('#share_img').attr('src',window.shareConfig.transform_material.img_url)
            history.replaceState(null, null, "?transform")
          }
          shareTime++;
          window.localStorage.setItem('shareTime', shareTime);
        } else if (shareTime >= 5) {
          //分享到朋友圈才会超过5
          shareTime++;
          window.localStorage.setItem('shareTime', shareTime);
        }
        $('.J_fenxiang').hide();
        $('.J_tixian').hide();
        fuAdd()
      }
      if((document[state]=='visible') && ($('.tixian.hide.J_tixian').css('display')=='block')){
        var shareTime = window.localStorage.getItem('shareTime')
        if (!shareTime) {
          window.localStorage.setItem('shareTime', 1);
        } else if (shareTime < 5) {
          if (shareTime == 4) {
            document.title = window.shareConfig.transform_material.title;
             $('#share_img').attr('src',window.shareConfig.transform_material.img_url)
            history.replaceState(null, null, "?transform")
          }
          shareTime++;
          window.localStorage.setItem('shareTime', shareTime);
        } else if (shareTime >= 5) {
          //分享到朋友圈才会超过5
          shareTime++;
          window.localStorage.setItem('shareTime', shareTime);
        }
        $('.J_fenxiang').hide();
        $('.J_tixian').hide();
        fuAdd()
      }
    }, false);
  },
});
window.localStorage.getItem('step') ? step = window.localStorage.getItem('step') : step = 1;
swiper = new Swiper('.swiper-container1', {
  // pagination: '.swiper-pagination',
  slidesPerView: '2',
  centeredSlides: true,
  paginationClickable: true,
  spaceBetween: 20,
  slidesOffsetBefor: 10,
  onSlideChangeStart: function (swiper) {
    $('.swiper-wrapper-x').scrollLeft(swiper.activeIndex * 10);
    $('.in-swiper-item').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active')
  }
});
$('.in-thumbs').on('click', '.in-swiper-item', function () {
  var $this = $(this);
  swiper.slideTo($this.index())
});
//点击去集福
$('.fu-box').click(function () {
  if ($('.J_swiper-wrapper .swiper-slide').length == 5) {
    $('.fenxiang').show();
  }
});
//点击申请提现
$(document).on('click', '.J_tixian-shen', function () {
  $(".J_tixian").show();
})
//点击合成
$('.mainBox').on('click', '.J_hecheng', function () {
  step = 2;
  window.localStorage.setItem('step', step);
  fuAdd()
});
$('.J_clearStorage').click(function () {
  window.localStorage.clear();
})
// 集齐五福调用这个方法显示五福
// getAllfu();
function getAllfu() {
  if ($('.J_swiper-wrapper .swiper-slide').length == 6) {
    return false;
  }
  swiper.prependSlide('<div class="swiper-slide">' +
    //合成
    '<div class="fu-box J_fu-box J_hecheng fu-box-man">' +
    '<img src="./img/hecheng.png">' +
    '</div>' +
    //提现申请
    '<div class="fu-box J_fu-box tixian-shen J_tixian-shen hide">' +
    '<p>恭喜，合成成功</p>' +
    '<p>申请</p>' +
    '<p>提现</p>' +
    '</div>' +
    //审核中
    '<div class="fu-box J_fu-box tixian-shen log hide"><p>温馨提示：审核需5个工作日</p>' +
    '<p>提现</p>' +
    '<p>审核中</p></div>' +

    //获得奖金
    '<div class="fu-box J_fu-box tixian-gong hide">' +
    '<img src="./img/tixian-cheng.png">' +
    '<p>您已获得88元现金</p>' +
    '</div>' +
    '</div>');
  $('.swiper-slide-x').prepend('<div class="in-swiper-item diffrent active">' +
    '<span class="in-swiper-ico"> <i class="in-swiper-ico-bg">&nbsp;</i>' +
    '</span>' +
    '<span>五福到</span>' +
    '</div>');
  $('.swiper-slide-x .in-swiper-item').eq(0).siblings().removeClass('active')
  swiper.update();
  swiper.slideTo(0);
}
fuAdd();
// 判断显示多少福字
function fuAdd() {
  var shareTime = window.localStorage.getItem('shareTime');
  if (!shareTime) {
    return false;
  } else {
    $('.J_swiper-wrapper .swiper-slide').each(function (index) {
      if (index < shareTime) {
        $(this).removeClass('in-no-has')
      }
    });
    $('.in-swiper-item').each(function (index) {
      if (index < shareTime) {
        $(this).addClass('in-has')
      }
    })
    // 分享大于等于5
    if (shareTime >= 5) {
      getAllfu();
      $('.go-ji').hide();
      if (shareTime >= 6 && step == 2) {
        step = 3;
        window.localStorage.setItem('step', step);
      }
      $('.J_fu-box').eq(step - 1).removeClass('hide').siblings().addClass('hide');
    }
  }
}
if ($('.J_swiper-wrapper .swiper-slide').length == 5) {
  $('.J_gotoCollectFu').show();
}




window.onload = function () {
  window.wcShare && (window.wcShare.shareCallback = function (t) {
    if (t.err_msg == "send_app_msg:ok" || t.err_msg == "send_app_msg:confirm" || t.err_msg == "share_timeline:confirm" || t.err_msg == "share_timeline:ok") {
      var shareTime = window.localStorage.getItem('shareTime')
      if (!shareTime) {
        window.localStorage.setItem('shareTime', 1);
      } else if (shareTime < 5) {
        if (shareTime == 4) {
          // 测试
          window.wcShare.shareData = {
            title: window.shareConfig.transform_material.title,
            desc: window.shareConfig.transform_material.description,
            img_url: window.shareConfig.transform_material.img_url,
            link: window.shareConfig.transform_material.link
          }
        }
        shareTime++;
        window.localStorage.setItem('shareTime', shareTime);
      } else if (shareTime >= 5 && t.err_msg == "share_timeline:ok") {
        //分享到朋友圈才会超过5
        shareTime++;
        window.localStorage.setItem('shareTime', shareTime);
      }
      $('.J_fenxiang').hide();
      $('.J_tixian').hide();
      fuAdd()
    }
  });
};