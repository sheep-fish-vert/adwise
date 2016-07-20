/* parallax scroll */

    function parallaxScroll(){

        // page params

        var windowHeight = 0;
        var blurParallaxPadding = 0;
        var imageTopDiferent = 0;
        var imageBottomDiferent = 0;

        // page params write

        function pageParamsWrite(){

            windowHeight = $(window).height();

            blurParallaxPadding = parseInt($('.main').css('padding-top')) + $('.header').height();

            imageTopDiferent = $('.parallax-images .parallax-image-top img').height() - windowHeight;
            if($('.parallax-image-bottom').length){
                imageBottomDiferent = $('.parallax-images .parallax-image-bottom img').height() - windowHeight;
            }

        }

        pageParamsWrite();


        // parallax scrolling

        $(window).scroll(function(){

            var scrolled = $(window).scrollTop();
            var imgScroller = parseInt(scrolled * 1);
            console.log(imgScroller, imageTopDiferent);
            if(imgScroller < imageTopDiferent){

                $('.parallax-images').css({'top':'-'+imgScroller+'px'});

            }else{
                $('parallax-images').css({'top':'-'+imageTopDiferent+'px'});
            }

            if(scrolled < blurParallaxPadding){
                $('.parallax-blur').css({'top':'-'+scrolled+'px'});
            }else{
               $('.parallax-blur').css({'top':'-'+blurParallaxPadding+'px'});
            }


        });

    }

/* /parallax scroll */


$(document).ready(function(){

    parallaxScroll();

});

$(window).load(function(){

});

$(window).resize(function(){

});