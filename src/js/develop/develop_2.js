


$(document).ready(function(){

    /* super tabs */

        $('.tab-row').on('click', '.tab', function(){
            var defr =  $(this).closest('.tabber').find('.tab-content>.con') ;
            var curr = $(this).index();
            $(this).closest('.tabber').find('.tab-row>.tab').removeClass('active').eq(curr).addClass('active');
            $(this).closest('.tabber').find('.tab-content>.active').fadeOut(100, function(){
                defr.removeClass('active').eq(curr).fadeIn(100, function(){
                    defr.removeClass('active').eq(curr).addClass('active');
                });
            })
        });

    /* super tabs */

    /* incredable page vacancy */

        $('.bot-navi>ul').on('click', 'li', function(){
            var curr = $(this).index();
            var target = $('.boxer>ul>li').eq(curr).offset().top;

            $(scroller).stop().animate({scrollTop:target},800);
            return false;
        });

        $( ".vacancy-wrap" )

    /* incredable page vacancy */

});

$(window).scroll(function(){

    if ( $( ".vacancy-wrap" ).length == 1 ){

        var wt = $(window).scrollTop();
        $('.boxer>ul>li').each( function(){
            var heCurr =  $(this).height() ;      
            var fff = $(this).offset().top - 60 ;
            if( (wt - fff < heCurr ) && (wt - fff > -1) ){
                $('.bot-navi>ul>li').removeClass('curr').eq($(this).index()).addClass('curr');
            }
            
        });        
    }

});

$(window).load(function(){

});

$(window).resize(function(){

});