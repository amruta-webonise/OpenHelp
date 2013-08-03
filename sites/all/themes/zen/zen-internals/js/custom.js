/**
 * Created with JetBrains PhpStorm.
 * User: amol
 * Date: 14/2/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    /* for tooltip */
    $('.helpIcon, .newsLtrTooltip, .infoIcon').qtip({
        position:{
            my:'left middle', // Position my top left...
            at:'middle right' // at the bottom right of...
        },
        style:{
            name:'dark' // Inherit from preset style
        }
    });


    $('.subNavBg').hide();
   if(window.location.pathname=="\/"){

    $('ul.mainNav > li.hasSubNav').hover(function(){
        if($(this).hasClass('active')){
        }
        else{
            if($('ul.mainNav > li').hasClass('active')){
                $('ul.mainNav > li.active').addClass('inActive');
                $('.inActive .subNavBg').fadeOut('fast');
               $('ul.mainNav > li.hasSubNav').addClass('noSubNav');
            }
            
            $(this).children('.subNavBg').fadeIn('fast');
        }
    },function(){
        if($(this).hasClass('active')){
        }
        else{
            var space = $(this).offset();
            $(this).children('.subNavBg').fadeOut('fast');
            
            if($('ul.mainNav > li').hasClass('active')){
                $('ul.mainNav > li.active').removeClass('inActive');
                $('.active .subNavBg').fadeIn('fast');
               $('ul.mainNav > li.hasSubNav').removeClass('noSubNav');
            }
        }
    });}
    
    $('.active .subNavBg').show();
    $('ul.subNav li.active').parents('.subNavBg').show();
    $('ul.subNav li.active').parents('ul.mainNav > li').addClass('active');
    $('ul.subNav li.active').parents('ul.mainNav > li.active').addClass('actSubNavLink');

    /* Routes tabs (this js should be hide on main tta site)*/
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
        
    $("ul.myTripsList li:last-child, ul.myRoutesList li:last-child, ul.myStopsList li:last-child, .psngrVanBox li:last-child").addClass('last');

    /* trip planner */
    var space = $('.container').offset();
    var rhtSpace = space.left;
    var mapWidth = 535;
    var totalWidth = mapWidth + rhtSpace -1;
    $('#map').width(totalWidth);

    /* events calendar */
    $('ul.eventsCalendar-list a.eventTitle').live("click", function(){
        $('ul.eventsCalendar-list a.eventTitle').removeClass('active');
        $(this).addClass('active');
    });

});

$(window).resize(function() {
    var spaceNew = $('.container').offset();
    var rhtSpaceNew = spaceNew.left;
    var mapWidthNew = 535;
    var totalWidthNew = mapWidthNew + rhtSpaceNew -1;
    $('#map').width(totalWidthNew);
});

