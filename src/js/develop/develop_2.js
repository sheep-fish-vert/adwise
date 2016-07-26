


$(document).ready(function(){

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

});

$(window).load(function(){

});

$(window).resize(function(){

});