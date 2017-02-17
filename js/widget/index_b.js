var swiper;
var step; //集齐五福之后走到了哪个步骤
var randdd = parseInt(10 * Math.random())
if (!localStorage.getItem('randdd'))
    $.ajax({
        url: 'https://jciii.butterfly.mopaasapp.com/home/index/get_config?pattern_id=1',
        type: 'get',
        dataType: 'json',
        complete: function(xhr) {
            var shareTime = window.localStorage.getItem('shareTime');
            var data;
            try {
                data = JSON.parse(xhr.response)
            } catch (error) {
                console.log(error)
            }
            window.shareConfig = data.data;
            if (window.location.href.indexOf('redirectd') < 0) {
                if (window.location.href.indexOf('transform') < 0)
                    window.location.href = window.shareConfig.share_material.link + '?redirectd=1'
                else
                    window.location.href = window.shareConfig.transform_material.link + '?redirectd=1'
            }
            document.title = window.shareConfig.share_material.title
            $('#share_img').attr('src', window.shareConfig.share_material.img_url)
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
            document.addEventListener(visibilityChange, function() {
                if ((document[state] == 'visible') && ($('.fenxiang.hide.J_fenxiang').css('display') == 'block')) {
                    var shareTime = window.localStorage.getItem('shareTime')
                    if (!shareTime) {
                        window.localStorage.setItem('shareTime', 1);
                    } else if (shareTime < 5) {
                        if (shareTime == 4) {
                            document.title = window.shareConfig.transform_material.title;
                            $('#share_img').attr('src', window.shareConfig.transform_material.img_url)
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
                if ((document[state] == 'visible') && ($('.tixian.hide.J_tixian').css('display') == 'block')) {
                    var shareTime = window.localStorage.getItem('shareTime')
                    if (!shareTime) {
                        window.localStorage.setItem('shareTime', 1);
                    } else if (shareTime < 5) {
                        if (shareTime == 4) {
                            document.title = window.shareConfig.transform_material.title;
                            $('#share_img').attr('src', window.shareConfig.transform_material.img_url)
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
    onSlideChangeStart: function(swiper) {
        $('.swiper-wrapper-x').scrollLeft(swiper.activeIndex * 10);
        $('.in-swiper-item').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active')
    }
});
$('.in-thumbs').on('click', '.in-swiper-item', function() {
    var $this = $(this);
    swiper.slideTo($this.index())
});
//点击去集福
$('.fu-box').click(function() {
    if ($('.J_swiper-wrapper .swiper-slide').length == 5) {
        $('.fenxiang').show();
    }
});
//点击申请提现
$(document).on('click', '.J_tixian-shen', function() {
        $(".J_tixian").show();
    })
    //点击合成
$('.mainBox').on('click', '.J_hecheng', function() {
    step = 2;
    window.localStorage.setItem('step', step);
    fuAdd()
});
$('.J_clearStorage').click(function() {
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
        '<img src="https://img.alicdn.com/imgextra/i4/685303989/TB2UxAHc1J8puFjy1XbXXagqVXa_!!685303989.png">' +
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
        '<img src="https://img.alicdn.com/imgextra/i3/685303989/TB2xa.vdJBopuFjSZPcXXc9EpXa_!!685303989.png">' +
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
        $('.J_swiper-wrapper .swiper-slide').each(function(index) {
            if (index < shareTime) {
                $(this).removeClass('in-no-has')
            }
        });
        $('.in-swiper-item').each(function(index) {
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