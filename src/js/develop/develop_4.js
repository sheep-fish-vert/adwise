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

        var slidesToShow = 4;


        $('.creatives-slider').on('init', function(event, slick, direction){
            $('.creatives-wrap').addClass('active');
            var items = $(this).find('.item');
            if ( items.length <= slidesToShow ){
                $(this).find('.slick-list').addClass('remove-right'); //remove shadow on init
            }else if(items.length > slidesToShow){
                $(this).addClass('left-hide-button');//remove button
            }
        });

        $('.creatives-slider').each(function(index, el) {
            var elem = el;
            var that = $(this);

            $(this).on('init', function(event, slick, direction){
                $(this).find('.slick-list').addClass('remove-left'); //?
            });

            $(this).on('afterChange', function(event, slick, direction){
                checkItem(that);
            });

            $(this).slick({
                slidesToShow: slidesToShow,
                slidesToScroll: 1,
                dots: false,
                infinite: false,
                prevArrow:'<button type="button" class="slick-prev"></button>',
                nextArrow:'<button type="button" class="slick-next"></button>'

            });
        });

        function checkItem(that){
            var items = that.find('.item');
            var first = items.first();

            if( first.is('.slick-current.slick-active') ){ //левый шадоу
                that.find('.slick-list').addClass('remove-left');
                that.find('.slick-list').removeClass('remove-right');

                // button hide
                that.addClass('left-hide-button');
            }else{
                that.find('.slick-list').removeClass('remove-left');
                that.removeClass('left-hide-button');
            }

            var magicCount =(items.length - (items.length - slidesToShow)) - 2; // супер

            if( items.eq( magicCount ).is('.slick-current.slick-active') || items.eq( magicCount ).nextAll().is('.slick-current.slick-active')) { //правый швдоу
                that.find('.slick-list').removeClass('remove-left');
                that.find('.slick-list').addClass('remove-right');

                // button hide
                that.addClass('right-hide-button');
            }else{
                that.find('.slick-list').removeClass('remove-right');
                that.removeClass('right-hide-button');
            }
        }



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
