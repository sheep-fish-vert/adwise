function butter() {
    $('.butter').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $('.menu').stop().slideDown();
        } else{
            $('.menu').stop().slideUp();
        }
    });
    $(document).on('click touchstart',function (event){
        if($('.butter').css('display') == 'block') {
            var div = $('.menu');
            if (!div.is(event.target) && div.has(event.target).length === 0 && !$('.butter').is(event.target) && $('.butter').has(event.target).length === 0)
            {
                $('.menu').slideUp();
                $('.butter').removeClass('active');
            }
        }
    });
}

function constructSlides(slides){
    var slider = $('.slider-partners');
    var filterValue = $('.menu-filter input:checked').val();
    var filteredArray = [];

    radioChangeFilter();
    filteringSlds();
    addSlidesINSlider();
    setTimeout(function () {
        hoverItmes();
    },500);



    function addSlidesINSlider(){
        if(slider.hasClass('slick-initialized')){ slider.slick('unslick');}

        slider.find('.item').remove();

        for (var i = 0; i < filteredArray.length; i++) {
            var oneSlide = '<a href="'+filteredArray[i].href+'" class="item"><img src="'+filteredArray[i].img+'" alt="'+filteredArray[i].name+'"><span class="hover"></span></a>';
                slider.append(oneSlide);
        }

        initSliderPartners(slider);

    }
    function radioChangeFilter() {
        $('.menu-filter').on('change','input',function () {
            filterValue = $('.menu-filter input:checked').val();
            filteredArray=[];
            filteringSlds();
            addSlidesINSlider();
            hoverItmes();
        });
    }
    function filteringSlds(){
        if(filterValue != "all") {
            for (var i = 0; i < slides.length; i++) {
                var catArray = slides[i].category;
                var needed = false;
                for (var j = 0; j < catArray.length; j++) { //оставлена возможность на каждый елемент вешать больше одной категории в JSON файле
                    if (catArray[j] == filterValue) {
                        needed = true;
                    }
                }
                if (needed == true) {
                    filteredArray.push(slides[i])
                }
            }
        }else{
            filteredArray = slides;
        }



    }
    function initSliderPartners(obj) {
        obj.slick({
            infinite: false,

            slidesToScroll: 1,
            swipeToSlide:true,
            slidesPerRow:5,
            rows:3,
            responsive: [
                {
                    breakpoint: 1140,
                    settings: {
                        slidesPerRow:4


                    }
                },
                {
                    breakpoint: 940,
                    settings: {
                        slidesPerRow: 3

                    }
                },
                {
                    breakpoint: 730,
                    settings: {
                        slidesPerRow: 2

                    }
                },
                {
                    breakpoint: 530,
                    settings: {
                        slidesPerRow:1

                    }
                }
            ]
        });
    }
    function hoverItmes(){
        $('.slider-partners .item').each(function () {
            var obj = $(this);
            obj.on("mousemove",function (e) {
                var x = e.offsetX==undefined?e.layerX:e.offsetX;
                var y = e.offsetY==undefined?e.layerY:e.offsetY;
                obj.find('.hover').attr('style','left:'+x+'px;top:'+y+'px;');
            });
        });
    }
}

function menuSecondLevelHover(){

    var secondLevelIndex = $('.second-level').length;

    $('.second-level').each(function(){
        $(this).css({'z-index':secondLevelIndex});
        secondLevelIndex--;
    });

    $('.second-level').hover(
        function(){
            if($(window).width() > 992){
                $(this).addClass('hovered').find('ul').stop().slideDown(300);
            }
        },
        function(){
            if($(window).width() > 992){
                $(this).removeClass('hovered').find('ul').stop().slideUp(300);
            }
        }
    );

    $(document).on('click', function(e){
        if($(window).width() <= 992){

            if($(e.target).is('.mobile-arrow')){

                var parent = $(e.target).parents('.second-level');

                if(parent.is('.hovered')){
                    parent.removeClass('hovered').find('ul').stop().slideUp(300);
                }else{
                    parent.addClass('hovered').find('ul').stop().slideDown(300);
                }

            }else if(!$(e.target).is('.second-level-list') && !$(e.target).parents('.second-level-list').length){

                if($('.second-level').is('.hovered')){
                    $('.second-level').removeClass('hovered').find('ul').stop().slideUp(300);
                }

            }
        }
    });

    $(window).resize(function(){

        $('.second-level-list').css('height','auto');
        if($(window).width() > 992){
            $('.second-level-list').removeAttr('style');
            $('.second-level').removeClass('hovered');
        }
    });

};

function oneSizeForMainNews(){

    var timer = null;

    function oneSizeMain(){

        $('.col-wrap-sample, .col-wrap-main-sample').removeAttr('style');
        clearTimeout(timer);

        if($(window).width() > 767){

            timer = setTimeout(function(){

                var mainSampleHeight = $('.col-wrap-main-sample').height();
                var sampleMaxHeight = 0;
                var buttonHeight = $('.news .col .button').height();

                $('.col-wrap-sample').each(function(){
                    if($(this).height()>sampleMaxHeight){
                        sampleMaxHeigth = $(this).height();
                    }
                });

                if((sampleMaxHeight-buttonHeight) < mainSampleHeight){
                    $('.col-wrap-sample').height(mainSampleHeight - buttonHeight);
                }else{
                    $('.col-wrap-sample').height(samplesMaxHeight-buttonHeight);
                }

            }, 300);
        }

    };

    oneSizeMain();

    $(window).resize(function(){
        oneSizeMain();
    });


};

$(document).ready(function(){

    butter();

    menuSecondLevelHover();

    $.getJSON('data.json',function (data) {
        constructSlides(data);
    });


});

$(window).load(function(){

    oneSizeForMainNews();

});

$(window).resize(function(){
    if(!$('.butter').css('display') == 'block'){$('.menu').removeAttr('style');}
});