
/* websites */

    function websitesScript(){

        function svgCircles(){

            var time = 0;
            var websitesParamLenght = $('.websites-statistic-param-circle').length;
            var maxValue = 0;

            $('.websites-statistic-param-circle').each(function(index){

                var percent = parseInt($(this).attr('data-value'));
                var circle = $(this).find('.circle-lines');
                var circleRadius = circle.attr('r');
                var circleLength = Math.PI*(circleRadius*2);

                circle.css({'stroke-dasharray':circleLength+'px','stroke-dashoffset':circleLength+'px','transition':' stroke-dashoffset 0s linear'});
                var circleLengthPercent = ((100-percent)/100)*circleLength;

                time = time + 300;

                setTimeout(function(){
                    circle.css({'stroke-dashoffset':circleLengthPercent+'px','transition':' stroke-dashoffset 1s linear'});
                },time);

                var textItem = $(this);
                var textCurrValue = 0;
                var textTimeValue = 1000/percent;

                var timerId = setInterval(function(){
                    textItem.find('.circle-value-text').text(textCurrValue+'%');
                    textCurrValue = textCurrValue + 1;
                    if(textCurrValue > percent){
                        clearInterval(timerId);
                    }
                },textTimeValue);

                if(percent > maxValue){
                    maxValue = percent;
                }

                if(index == (websitesParamLenght - 1)){
                    $('.websites-statistic-param-circle[data-value='+maxValue+']').each(function(){
                        $(this).parents('.websites-statistic-param-item-wrap').addClass('active');
                    });
                }

            });
        }

        function sliderInit(){

            $('.sites-filter-slider').init('init', function(event, slick){
                $('.sites-filter-slider .slick-current').click();
            });

            $('.sites-filter-slider').slick({
                slidesToShow:5,
                dots:false,
                arrows:true,
                vertical:true
            });

        }

        $(document).on('click', '.sites-filter-slider-item', function(){
            $('.sites-filter-slider-item').removeClass('active');
            $(this).addClass('active');

            /* write here ajax */

            svgCircles();

        });

        $(document).on('click', '.column-list-sites-filter li', function(){
            console.log('s');
            $('.column-list-sites-filter li').removeClass('active');
            $(this).addClass('active');

            /* here write ajax */

            sliderInit();

        });

        $('.column-list-sites-filter li').eq(0).click();

    }

/* /websites */

$(document).ready(function(){

    websitesScript();

});

$(window).load(function(){

});

$(window).resize(function(){

});