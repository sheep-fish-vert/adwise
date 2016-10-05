/* parallax scroll (if you try fix some thing here - you have problems :) Good luck! ) */

    function parallaxScroll(){

        // parallax first type

        if($('.first-type').length){

            // page params

            var windowHeight = 0;
            var blurParallaxPadding = 0;
            var imgTopHeight = 0;
            var documentPercScrollForTopImage = 0;
            var hasBottomImg = false;
            var imgBottomHeight = 0;
            var documentPercScrollForBottomImage = 0;
            var bottomImageArea = 0;

            var bidloFix = 1;

            // page params write

            function pageParamsWrite(){

                windowHeight = $(window).height();

                blurParallaxPadding = parseInt($('.main').css('padding-top')) + parseInt($('header').height());

                if ( $('.monetization-page').length ){
                    bidloFix = 1.6;
                }
                documentPercScrollForTopImage = $('.global-wrapper').height() / 4 * bidloFix;

                imgTopHeight = $('.parallax-images .parallax-image-top img').height();

                if($('.parallax-image-bottom').length){
                    hasBottomImg = true;
                    bottomImageArea = documentPercScrollForTopImage;
                    documentPercScrollForBottomImage = $('.global-wrapper').height() - bottomImageArea;
                    imgBottomHeight = $('.parallax-images .parallax-image-bottom img').height();
                }

            }

            pageParamsWrite();


            // paralax scrolling

            function parallaxScrolling(){

                if($(window).width() > 1025){
                    var scrolled = $(window).scrollTop();
                    var imgScroller = scrolled * 0.6;
                    var scrolledDiference = scrolled * 0.4;

                    // "if" for blur block, top image & bottom image
                    if(scrolled < blurParallaxPadding){
                        $('.parallax-images .parallax-image-top').css({'top':'-'+imgScroller+'px'});
                        $('.parallax-blur').css({'top':'-'+scrolled+'px'});
                        $('.parallax-blur .parallax-image-top').css({'top':scrolledDiference+'px'});
                    }else{

                        $('.parallax-images .parallax-image-top').css({'top':'-'+blurParallaxPadding*0.6+'px'});
                        $('.parallax-blur').css({'top':'-'+ blurParallaxPadding +'px'});
                        $('.parallax-blur .parallax-image-top').css({'top':blurParallaxPadding*0.4+'px'});

                        if(hasBottomImg && scrolled > documentPercScrollForTopImage){

                            // "if" for scrolled more than 66.66% if page
                            if((scrolled+windowHeight) > documentPercScrollForBottomImage){

                                $('.parallax-image-bottom').removeClass('hide');

                                var bottomScroller = scrolled+windowHeight - documentPercScrollForBottomImage;
                                var pixForBottomScrolling = (windowHeight * bottomScroller * 2) / bottomImageArea;
                                var blurBottomParallax = blurParallaxPadding + pixForBottomScrolling;
                                var blurImageParallaxMoving = pixForBottomScrolling * 0.6;


                                if(blurImageParallaxMoving > (imgBottomHeight - windowHeight)){
                                    blurImageParallaxMoving = imgBottomHeight - windowHeight;
                                }

                                var bottomParallaxDiference = pixForBottomScrolling - blurImageParallaxMoving;

                                $('.parallax-blur').css({'top':'-' + blurBottomParallax + 'px'});
                                $('.parallax-images .parallax-image-bottom').css({'bottom':blurImageParallaxMoving+'px'});
                                $('.parallax-blur .parallax-image-bottom').css({'bottom':'-'+bottomParallaxDiference+'px'});

                            }else{

                                $('.parallax-image-bottom').addClass('hide');
                                $('.parallax-image-bottom').css({'bottom':'0px'});

                            }

                        }

                    }

                    // "if" for scrolled more than 33.33% of page
                    if(scrolled > 1000){
                    //if(scrolled > documentPercScrollForTopImage && scrolled > blurParallaxPadding && $('.global-wrapper').height() > $(window).height()*1.75){
                        $('.parallax-image-top').addClass('hide');
                    }else{
                        $('.parallax-image-top').removeClass('hide');
                    }

                }else{
                    $('.parallax-image-top, .parallax-image-bottom, parallax-blur').removeAttr('style');
                }

            };

            parallaxScrolling();


            // calling parallax func when scroll

            $(window).scroll(function(){

                parallaxScrolling();

            });

            // reset params & scroll position when resize page

            $(window).resize(function(){

                pageParamsWrite();
                parallaxScrolling();

            });

        }

        // parallax second type

        if($('.second-type').length){

            // page params

            var imageHeight = 0;
            var windowHeight = 0;
            var windowWidth = 0;
            var wrapperWidth = 0;
            var leftColWidth = 0;
            var rightColWidth = 0;

            // page params write

            function secondTypeParamsParallax(){

                windowHeight = $(window).height();
                windowWidth = $(window).width();

                wrapperWidth = $('.mbox.bigger-mbox').outerWidth();
                leftColWidth = $('.left-column').outerWidth() + parseInt($('.mbox').css('padding-left'));
                rightColWidth = $('.right-column').outerWidth() + parseInt($('.mbox').css('padding-left'));

                var freeSpace = (windowWidth - wrapperWidth) / 2;

                var leftParallaxWidth = freeSpace + leftColWidth;

                $('.parallax-images').css({'width':leftParallaxWidth+'px'});

                var rightParallaxWidth = freeSpace + rightColWidth;

                $('.parallax-blur').css({'width':rightParallaxWidth+'px','left':leftParallaxWidth+'px'});

                $('.parallax-blur .parallax-image-top img').css({'left':'-'+leftParallaxWidth+'px'});
                $('.parallax-block img').css({'min-width':windowWidth+'px'});

                if($('.parallax-tabs').length){
                    imageHeight = $('.parallax-image-top img.active').height();
                }else{
                    imageHeight = $('.parallax-image-top img').height();
                }

            };

            secondTypeParamsParallax();

            $(window).resize(function(){

                secondTypeParamsParallax();
                secondTypeParallaxScrolling();

            });

            // paralax scrolling

            function secondTypeParallaxScrolling(){

                var scrolled = $(window).scrollTop() * 0.4;

                var maxImageParallax = imageHeight - windowHeight;

                if(scrolled > maxImageParallax){

                    $('.parallax-image-top').css({'top':'-'+maxImageParallax+'px'});

                }else{

                    $('.parallax-image-top').css({'top':'-'+scrolled+'px'});

                }

            };

            secondTypeParallaxScrolling();

            $(window).scroll(function(){

                secondTypeParallaxScrolling();

            });

        }

        // parallax tabs

        if($('.tabs-parallax').length){

            $(document).on('click', '.tabs .parallax-tab-item', function(e){

                e.preventDefault();

                var index = $(this).index();

                $('.parallax-block img').removeClass('active');
                $('.parallax-images img').eq(index).addClass('active');
                $('.parallax-blur img').eq(index).addClass('active');

                $('.tab-item').removeClass('show');
                $('.tab-item').eq(index).addClass('show');

                $('.parallax-tab-item').removeClass('active');
                $(this).addClass('active');

                if($(window).width() <= 666){

                    var scrollBoobs = $('.left-column').height();
                    $(scroller).stop().animate({scrollTop:scrollBoobs}, 1000);

                }

            });

        }

    }

/* /parallax scroll */

/* left column scroll */

    function leftColumnScroll(){

        function leftColumnScrolling(){

            if($('.column-list-wrap').length){

                if($(window).width() > 992){

                    var minHeight = $('.column-list-wrap').height()+parseInt($('.column-list-wrap').css('padding-top'));

                    $('.left-column').css({'min-height':minHeight+'px'});

                    var topm = parseInt($('header').height()) - 10;

                    if($(window).scrollTop() < topm){
                        $('.column-list-wrap').css({'top':'-'+$(window).scrollTop()+'px'});
                    }else{
                        $('.column-list-wrap').css({'top':'-'+topm+'px'});
                    }

                    var moreThanFooter = $(window).scrollTop()+$('.column-list-wrap').outerHeight();

                    if(moreThanFooter > $('.footer').offset().top){
                        var transp = $('.footer').offset().top - moreThanFooter;
                        $('.column-list-wrap').css({'transform':'translate(0, '+transp+'px)'});
                    }else{
                        $('.column-list-wrap').css({'transform':'translate(0, 0)'});
                    }

                }else{

                    $('.left-column, .column-list-wrap').removeAttr('style');

                }

            }

        };


        $(document).on('click', '.tabs li', function(){

            leftColumnScrolling();

        });

        leftColumnScrolling();

        $(window).resize(function(){

            leftColumnScrolling();

        });

        $(window).scroll(function(){

            leftColumnScrolling();

        });

    }

/* left column scroll */

/* global-wrapper */

    function globalWrapperMinHeight(){

        $('.global-wrapper').css({'min-height':'calc(100vh - '+$('.footer').outerHeight()+'px)'});

    }

/* /global-wrapper */

/* scrolling tabs (like on vacancy) */

    function scrollingTabs(){

        if($('.scroll-content').length){

            function scrolling(){

                var scrolledValue = $(window).scrollTop() + $(window).height()/2;
                var footerScroll = $(document).height() - $(window).height()/2;

                if($(window).width() > 992){

                    $('.scroll-content>li').each(function(index, el) {

                        if(scrolledValue < $(this).offset().top && scrolledValue < footerScroll){
                            $('.scroll-list li').removeClass('active');
                            if(index > 0){
                                $('.scroll-list li').eq(index-1).addClass('active');
                            }else if(index == 0){
                                $('.scroll-list li').eq(0).addClass('active');
                            }
                            return false;
                        }else if(scrolledValue == footerScroll || scrolledValue > $('.scroll-content>li').eq($('.scroll-content>li').length-1).offset().top){
                            $('.scroll-list li').removeClass('active');
                            $('.scroll-list li').eq($('.scroll-list li').length-1).addClass('active');
                            return false;
                        }
                    });

                }

            };

            scrolling();

            $(document).on('click', '.scroll-list li', function(){

                var index = $(this).index();
                $('.scroll-list li').removeClass('active');

                var target = $('.scroll-content>li').eq(index).offset().top - $(window).height()/4;
                $(scroller).stop().animate({scrollTop:target},800,function(){
                    scrolling();
                });

            });

            $(window).load(function(){

                scrolling();

            });

            $(window).resize(function(){

                scrolling();

            });

            $(window).scroll(function(){

                scrolling();

            });

        }

    };

/* /scrolling tabs (like on vacancy) */

/* video-block new fon slider */

    function videoBackgroundSlider(){

        $('.video-block').addClass('loaded');

        var point = 1;
        var maxLength = $('.slider-class.first-slider .slider-item').length;

        if(maxLength > 1){
            setInterval(function(){

                $('.slider-class.first-slider .slider-item').removeClass('active').eq(point).addClass('active');
                $('.slider-class.second-slider .slider-item').removeClass('active').eq(point).addClass('active');

                point++;
                if(point >= maxLength){
                    point = 0;
                }
            }, 5000);
        }

    };

/* /video-block new fon slider */

/* services-geo */

    function servicesGeoScripts(){

        var slider = $('.services-geos-slider .slider-wrap');

        slider.on('init', function(){

            var country = $('.services-geos-slider .slick-current').attr('data-country');

            changeCountryOnMap(country);

        });

        slider.slick({
            slidesToShow:1,
            slidesToScroll:1,
            arrows:true,
            dots:false,
            speed:500,
            fade:true,
            cssEase:'linear',
            adaptiveHeight:true
        });


        slider.on('afterChange', function(){

            var country = $('.services-geos-slider .slick-current').attr('data-country');

            changeCountryOnMap(country);

        });

        function changeCountryOnMap(country){

            $('.services-geos-map svg .active').removeClass('active');
            $('.services-geos-map svg g[data-country='+country+']').addClass('active');

        };

        $(document).on('click', '.services-geos-map svg .work-with:not(.active)', function(){

            var country = $(this).attr('data-country');
            var countryId = $('.services-geos-slider .slider-item[data-country='+country+']').attr('data-slick-index');

            slider.slick('slickGoTo',countryId);

        });

    };

/* services-geo */

/* remove page preloader */

    function removePagePreloader(){
        setTimeout(function(){
            $('body').removeClass('loading');
        },2000);

    };

/* /remove page preloader */


$(document).ready(function(){

    globalWrapperMinHeight();

    servicesGeoScripts();

    videoBackgroundSlider();

});

$(window).load(function(){

    parallaxScroll();

    globalWrapperMinHeight();

    leftColumnScroll();

    scrollingTabs();

    removePagePreloader();

});

$(window).resize(function(){

    globalWrapperMinHeight();

});