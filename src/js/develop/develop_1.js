/* parallax scroll */

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


            // page params write

            function pageParamsWrite(){

                windowHeight = $(window).height();

                blurParallaxPadding = parseInt($('.main').css('padding-top')) + $('header').height();
                documentPercScrollForTopImage = $('.global-wrapper').height() / 4;
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
                    $('.parallax-blur').css({'top':'-'+blurParallaxPadding+'px'});
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

                            $('.parallax-blur').css({'top':'-'+blurBottomParallax+'px'});
                            $('.parallax-images .parallax-image-bottom').css({'bottom':blurImageParallaxMoving+'px'});
                            $('.parallax-blur .parallax-image-bottom').css({'bottom':'-'+bottomParallaxDiference+'px'});

                        }else{

                            $('.parallax-image-bottom').addClass('hide');
                            $('.parallax-image-bottom').css({'bottom':'0px'});

                        }

                    }

                }

                // "if" for scrolled more than 33.33% of page
                if(scrolled > documentPercScrollForTopImage){
                    $('.parallax-image-top').addClass('hide');
                }else{
                    $('.parallax-image-top').removeClass('hide');
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

            var imageHeight = 0;
            var windowHeight = 0;
            var windowWidth = 0;
            var wrapperWidth = 0;
            var leftColWidth = 0;
            var rightColWidth = 0;

            function secondTypeParamsParallax(){

                windowHeight = $(window).height();
                windowWidth = $(window).width();
                imageHeight = $('.parallax-image-top img.active').height();
                wrapperWidth = $('.main-wrap.tabs').width();
                leftColWidth = $('.left-column').outerWidth();
                rightColWidth = $('.right-column').outerWidth();

                var freeSpace = (windowWidth - wrapperWidth) / 2;

                var leftParallaxWidth = freeSpace + leftColWidth;

                $('.parallax-images').css({'width':leftParallaxWidth+'px'});

                var rightParallaxWidth = freeSpace + rightColWidth;

                $('.parallax-blur').css({'width':rightParallaxWidth+'px'});

            };

            secondTypeParamsParallax();

            function secondTypeParallaxScrolling(){

                var scrolled = $(window).scrollTop();



            };

            secondTypeParallaxScrolling();

            $(window).scroll(function(){

                secondTypeParallaxScrolling();

            });

        }

    }

/* /parallax scroll */

/* global-wrapper */

    function globalWrapperMinHeight(){

        $('.global-wrapper').css({'min-height':'calc(100vh - '+$('.footer').outerHeight()+'px)'});

    }

/* /global-wrapper */


$(document).ready(function(){

    globalWrapperMinHeight();

});

$(window).load(function(){

    parallaxScroll();

    globalWrapperMinHeight();

});

$(window).resize(function(){

    globalWrapperMinHeight();

});