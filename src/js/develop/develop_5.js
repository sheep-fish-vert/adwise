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



$(document).ready(function(){
    butter();
      $.getJSON('data.json',function (data) {
        constructSlides(data);
    });



});

$(window).load(function(){

});

$(window).resize(function(){
    if(!$('.butter').css('display') == 'block'){$('.menu').removeAttr('style');}
});