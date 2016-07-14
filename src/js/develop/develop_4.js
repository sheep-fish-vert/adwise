function massonryImage(){  // in news page
    $('.news-images-massonry').masonry({
      columnWidth: '.item-sizer',
      itemSelector: '.item',
      percentPosition: true,
      fitWidth: true,
      isFitWidth: true
    });
}

function creativesSlider(){
    if( $('.creatives').length ){

        $('.creatives-slider').on('init', function(event, slick, direction){
            $('.creatives-wrap').addClass('active');
        });

        $('.creatives-slider').each(function(index, el) {
            var elem = el;

            $(this).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false,
                infinite: false,
                prevArrow:'<button type="button" class="slick-prev"></button>',
                nextArrow:'<button type="button" class="slick-next">Next</button>'

            });
        });





        // tabs on slider
        $('.tab-item').not(':first').removeClass('show');
        $('.main-wrap.tabs .column-list-main li').click(function(event){
            event.preventDefault();
            $('.main-wrap.tabs .column-list-main li').removeClass('active').eq($(this).index()).addClass('active');
            $('.tab-item').removeClass('show').eq($(this).index()).addClass('show');
        }).eq(0).addClass('active');
    }
}


$(document).ready(function(){

});

$(window).load(function(){
    massonryImage();
    creativesSlider();
});

$(window).resize(function(){

});
