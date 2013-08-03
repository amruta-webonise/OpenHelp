/**
 * Created with JetBrains PhpStorm.
 * User: swapnil
 * Date: 14/2/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
//    var spaceLft = $('ul.mainNav > li.active').offset();
    
    $('.subNavBg').hide();
    
    $('ul.mainNav > li.hasSubNav').hover(function(){
//        var space = $(this).offset();
        if($(this).hasClass('active')){
        }
        else{
            if($('ul.mainNav > li').hasClass('active')){
                $('ul.mainNav > li.active').addClass('inActive');
                $('.inActive .subNavBg').fadeOut('fast');
            }
            
            $(this).children('.subNavBg').fadeIn('fast');
//            $('.subNavBg ul.subNav').css({
//                marginLeft:space.left
//            });
        }
    },function(){
        if($(this).hasClass('active')){
        }
        else{
            var space = $(this).offset();
            $(this).children('.subNavBg').fadeOut('fast');
//            $('.subNavBg ul.subNav').css({
//                marginLeft:space.left
//            });
            if($('ul.mainNav > li').hasClass('active')){
                $('ul.mainNav > li.active').removeClass('inActive');
                $('.active .subNavBg').fadeIn('fast');
//                $('.active .subNavBg ul.subNav').css({
//                    marginLeft:spaceLft.left
//                });
            }
        }
    });
    
    
    $('.active .subNavBg').show();
//    if($('ul.mainNav > li').hasClass('active')){
//        $('.active .subNavBg ul.subNav').css({
//            marginLeft:spaceLft.left
//        });
//    }
    
    $('ul.subNav li.active').parents('ul.mainNav > li.active').addClass('actSubNavLink');
    
    
    /* Routes tabs*/
    $('.routTabsWrap .routTabCnt').hide();
    $('.routTabsWrap .routTabCnt:first-child').show();
    $('.routesList a').click(function(){
        var actTab = $(this).attr('href');
        $('.routTabsWrap .routTabCnt').hide();
        $(actTab).show();
        $('.routesList a').removeClass('active');
        $(this).addClass('active');
        return false;     
    });
    
    /* inOutBound tabs*/
    $('.boundCntWrap .boundCnt').hide();
    $('.boundCntWrap .boundCnt:first-child').show();
    $('.boundLink a').click(function(){
        var actTab = $(this).attr('href');
        $('.boundCntWrap .boundCnt').hide();
        $(actTab).show();
        $('.boundLink a').removeClass('active');
        $(this).addClass('active');
        return false;     
    });
    
    /* tabs */
    $('.tabsCntWrap .tabsCnt').hide();
    $('.tabsCntWrap .tabsCnt:first-child').show();
    $('.tabsLink a').click(function(){
        var actTab = $(this).attr('href');
        $('.tabsCntWrap .tabsCnt').hide();
        $(actTab).show();
        $('.tabsLink a').removeClass('active');
        $(this).addClass('active');
        return false;     
    });
    
    
    $("ul.myTripsList li:last-child, ul.myRoutesList li:last-child, ul.myStopsList li:last-child").addClass('last');
/*setTimeout(function(){
        alert('hi');
        $('#banner-slide').bjqs({
            animtype      : 'slide',
            height        : 358,
            width         : 1900,
            animduration : 450, // how fast the animation are
            animspeed : 2000, // the delay between each slide
            responsive    : true,
            showcontrols : false,
            containerResize: false,
            randomstart   : true
        });
    },2000)*/
/*$('.slideshow').cycle({
        timeout: 4000,
        fx:'scrollHorz',
        speed: 500,
//        width:1200,
        slideResize: false,
        fit:1,
        width:null,
        auto:'true',
        pager:  '#nav',
        slideExpr: 'img'
    });*/
/* var contentWidth = $('#content').width();
    var bannerWidth = $('#banner-slide').width();
    var bannerLeft = (contentWidth - bannerWidth)/2;
    $('#banner-slide').css({marginLeft:bannerLeft});*/
})
/*
$(window).resize(function(){
    var contentWidth = $('#content').width();
    var bannerWidth = $('#banner-slide').width();
    var bannerLeft = (contentWidth - bannerWidth)/2;
    $('#banner-slide').css({marginLeft:bannerLeft});
})*/
