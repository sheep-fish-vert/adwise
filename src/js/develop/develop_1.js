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

                blurParallaxPadding = parseInt($('.main').css('padding-top')) + parseInt($('header').height());

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

                $('.parallax-blur').css({'width':rightParallaxWidth+'px'});

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

            $(document).on('click', '.tabs .parallax-tab-item', function(){

                var index = $(this).index();

                $('.parallax-block img').removeClass('active');
                $('.parallax-images img').eq(index).addClass('active');
                $('.parallax-blur img').eq(index).addClass('active');

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

                    var moreThanFooter = $(window).scrollTop()+$('.column-list-wrap').height();

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

/* event-page */

    function eventPage(){

        // need for calendar
        var eventsDates = null;

        // event-page slider

        function eventPageSlider(){

            var eventPageSlider = $('.event-page-slider');

            eventPageSlider.on('init', function(slick){

                var wrapWidth = parseInt($('.event-page-slider-wrap').width());
                var slickLength = $('.event-page-slider-item').length;
                var wrapItemsWidth = slickLength * wrapWidth;
                $('.event-page-slider-item').width(wrapWidth);
                $('.slick-track').css({'opacity':'1', 'width':wrapItemsWidth+'px', 'transform':'translate3d(-'+wrapWidth+'px, 0px, 0px)'});


                console.log('s');
            });

            eventPageSlider.on('afterChange', function(slick, currentSlide){
                console.log('d');
            });

            eventPageSlider.slick({
                arrows:true,
                dots:false,
                slidesToShow:1
            });

        };

        eventPageSlider();

        // /event-page slider

        // event-page calendar

        function eventPageCalendar(){

            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];

            var date = new Date();

            var currentMonth = date.getMonth();
            var weekDay = date.getDay();
            var dayDate = date.getDate();
            var yearDate = date.getFullYear();

            var firstDate = new Date();
            firstDate.setDate(1);
            var firstDateWeekDay = firstDate.getDay();

            // var monthLength = new Date(yearDate, currentMonth, 0).getDate();

            function loadCalendar(){

                var firstSliderMonth = currentMonth - 2;
                var monthNumArray = [];

                for(var i = 0;i < 5;i++){

                        monthNumArray[i] = {};

                    if(firstSliderMonth == (-2)){
                        monthNumArray[i].month = 10;
                        monthNumArray[i].year = yearDate-1;
                        monthNumArray[i].monthDaysLength = new Date(monthArray[i].year, 11, 0).getDate();
                    }else if(firstSliderMonth == (-1)){
                        monthNumArray[i].month = 11;
                        monthNumArray[i].year = yearDate-1;
                        monthNumArray[i].monthDaysLength = new Date(monthArray[i].year+1, 0, 0).getDate();
                    }else if(firstSliderMonth == 12){
                        monthNumArray[i].month = 0;
                        monthNumArray[i].year = yearDate+1;
                        monthNumArray[i].monthDaysLength = new Date(monthArray[i].year, monthNumArray[i].month+1, 0).getDate();
                    }else if(firstSliderMonth == 13){
                        monthNumArray[i].month = 1;
                        monthNumArray[i].year = yearDate+1;
                        monthNumArray[i].monthDaysLength = new Date(monthArray[i].year, monthNumArray[i].month+1, 0).getDate();
                    }else{
                        monthNumArray[i].month = firstSliderMonth;
                        monthNumArray[i].year = yearDate;
                        var monthNumForCurrentMonth = monthNumArray[i].month + 1;
                        if(monthNumForCurrentMonth == 12){
                            monthNumArray[i].monthDaysLength = new Date(monthNumArray[i].year+1, 0, 0).getDate();
                        }else{
                            monthNumArray[i].monthDaysLength = new Date(monthNumArray[i].year, monthNumArray[i].month+1, 0).getDate();
                        }

                    }

                    firstSliderMonth = firstSliderMonth + 1;

                }



                console.log(monthNumArray);

            };

            loadCalendar();

        };

        eventPageCalendar();

        // /event-page calendar


    }

/* /event-page */


$(document).ready(function(){

    globalWrapperMinHeight();

});

$(window).load(function(){

    parallaxScroll();

    globalWrapperMinHeight();

    leftColumnScroll();

    eventPage();

});

$(window).resize(function(){

    globalWrapperMinHeight();

});