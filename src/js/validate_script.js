/*валидация формы*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.form_row').is('.error')){
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "You skipped it"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "*This e-mail is not active "
                 }
            });

        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Enter your mobile phone number"
                }
            });
        }

        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:3,
                    equalTo:"#password",
                    messages:{
                        equalTo:"Incorrect password",
                        minlength:"Not enough characters"
                    }
                });
            }
        });
    }
}

/*Отправка формы с вызовом попапа*/
function validationCall(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNext("#call_success", "call-popup");
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });
}

function popNext(popupId, popupWrap){

    $.fancybox.open(popupId,{
        padding:0,
        fitToView:false,
        wrapCSS:popupWrap,
        autoSize:true,
        'closeBtn' : false,
        afterClose: function(){
            $('form').trigger("reset");
            clearTimeout(timer);
        }
    });

    var timer = null;

    // timer = setTimeout(function(){
    //     $('form').trigger("reset");
    //     $.fancybox.close(popupId);
    // },2000);

}


/*маска на инпуте*/
function Maskedinput(){
    if($('.tel-mask')){
        $('.tel-mask').mask('+9 (999) 999-99-99 ');
    }
}

/*fansybox на форме*/
function fancyboxForm(){
  $('.fancybox-form').fancybox({
    openEffect  : 'fade',
    closeEffect : 'fade',
    autoResize:true,
    wrapCSS:'fancybox-form',
    'closeBtn' : true,
    fitToView:true,
    padding:'0'
  });
}

/* websites */

    function websitesScript(){

        // loading svg website circles
        function svgCircles(){

            var circleTime = 0;
            var websitesParamLenght = $('.websites-statistic-param-circle').length;
            var maxValue = 0;

            $('.websites-statistic-param-circle').each(function(index){

                var percent = parseInt($(this).attr('data-value'));
                var circle = $(this).find('.circle-lines');
                var circleRadius = circle.attr('r');
                var circleLength = Math.PI*(circleRadius*2);

                circle.css({'stroke-dasharray':circleLength+'px','stroke-dashoffset':circleLength+'px','transition':' stroke-dashoffset 0s linear'});
                var circleLengthPercent = ((100-percent)/100)*circleLength;

                circleTime = circleTime + 300;

                setTimeout(function(){
                    circle.css({'stroke-dashoffset':circleLengthPercent+'px','transition':' stroke-dashoffset 1s linear'});
                },circleTime);

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
                    $('.column-list-sites-filter, .websites-slider-wrap').removeClass('not-ajax');
                }

            });
        }

        // website slider initialization
        function sliderInit(){

            $('.sites-filter-slider').init('init', function(event, slick){

                $('.column-list-sites-filter').removeClass('adding');
                $('.websites-slider-wrap').removeClass('loading');
                setTimeout(function(){ // working for ajax. Do not delete it
                   websitesSliderItemClicking($('.websites-slider-wrap .slick-current'));
               },0);

            });

            $('.sites-filter-slider').on('afterChange', function(slick, currentSlide){
                if($(window).width() < 666){
                    $('.websites-slider-wrap .slick-current').click();
                }
            });

            $('.sites-filter-slider').slick({
                slidesToShow:5,
                dots:false,
                arrows:true,
                vertical:true,
                focusOnSelect:true,
                responsive: [
                    {
                      breakpoint: 992,
                      settings: {
                        vertical:false,
                        centerMode: true,
                        customPadding:0,
                        slidesToShow:3
                      }
                    },
                    {
                        breakpoint:666,
                        settings:{
                            slidesToShow:1,
                            vertical:false
                        }
                    }
                ]
            });

        }

        // clicking by webside slider item
        function websitesSliderItemClicking(clickedItem){

            $('.column-list-sites-filter, .websites-slider-wrap').addClass('not-ajax');

            $('.sites-filter-slider-item').removeClass('active');

            var site = clickedItem.attr('data-site');
            $('.sites-filter-slider-item[data-site="'+site+'"]').addClass('active');

            $('.websites-content').addClass('loading');

            setTimeout(function(){
                $('.websites-content').css({'height':$('.websites-content').outerHeight()+'px'});
                $('.websites-content .loading-by-ajax').remove();

                $.ajax({
                    url:'js/json/website_content.json',
                    data:{action:'website_content_load', siteName:site},
                    method:'POST',
                    success:function(data){

                        var websiteData = data;

                        if(typeof data != 'object'){
                            websiteData = JSON.parse(data);
                        }

                        $('.websites-content').append('<div class="websites-text loading-by-ajax loading">'+websiteData.text+'</div><div class="websites-audience loading-by-ajax loading"><div class="websites-audience-title">Audience</div><div class="websites-audience-main"><div clas="websites-audience-icon"><img src="images/female-icon.png" alt="" /></div><div class="websites-audience-text">'+websiteData.audience.female+'</div></div><div class="websites-audience-main"><div clas="websites-audience-icon"><img src="images/male-icon.png" alt="" /></div><div class="websites-audience-text">'+websiteData.audience.male+'</div></div></div><div class="websites-statistic loading-by-ajax loading"><div class="websites-statistic-title"><div class="websites-statistic-title-top">Ad formats</div><div class="websites-statistic-title-bottom">Efficiency</div></div><div class="websites-statistic-params"><div class="websites-statistic-param-item"><div class="websites-statistic-param-item-wrap"><div class="websites-statistic-param-title">Banners</div><div class="websites-statistic-param-circle" data-value='+websiteData.statistic.banners+'><span class="circle-value-text">0%</span><svg width="47" height="47" viewBox="0 0 47 47"><circle class="circle-background" cx="23.5" cy="23.5" r="20.5"></circle><circle class="circle-lines" cx="23.5" cy="23.5" r="20.5"></circle></svg></div></div></div><div class="websites-statistic-param-item"><div class="websites-statistic-param-item-wrap"><div class="websites-statistic-param-title">Branding</div><div class="websites-statistic-param-circle" data-value='+websiteData.statistic.branding+'><span class="circle-value-text">0%</span><svg width="47" height="47" viewBox="0 0 47 47"><circle class="circle-background" cx="23.5" cy="23.5" r="20.5"></circle><circle class="circle-lines" cx="23.5" cy="23.5" r="20.5"></circle></svg></div></div></div><div class="websites-statistic-param-item"><div class="websites-statistic-param-item-wrap"><div class="websites-statistic-param-title">Clickunder</div><div class="websites-statistic-param-circle" data-value='+websiteData.statistic.clickunder+'><span class="circle-value-text">0%</span><svg width="47" height="47" viewBox="0 0 47 47"><circle class="circle-background" cx="23.5" cy="23.5" r="20.5"></circle><circle class="circle-lines" cx="23.5" cy="23.5" r="20.5"></circle></svg></div></div></div><div class="websites-statistic-param-item"><div class="websites-statistic-param-item-wrap"><div class="websites-statistic-param-title">Pre-roll</div><div class="websites-statistic-param-circle" data-value='+websiteData.statistic.pre_roll+'><span class="circle-value-text">0%</span><svg width="47" height="47" viewBox="0 0 47 47"><circle class="circle-background" cx="23.5" cy="23.5" r="20.5"></circle><circle class="circle-lines" cx="23.5" cy="23.5" r="20.5"></circle></svg></div></div></div></div></div>');


                        var contentPaddingTop = parseInt($('.websites-content').css('padding-top'));
                        var contentPaddingBottom = parseInt($('.websites-content').css('padding-bottom'));
                        var newHeight = contentPaddingTop + contentPaddingBottom;

                        $('.loading-by-ajax').each(function(){

                            newHeight = newHeight + $(this).outerHeight(true);

                        });

                        $('.websites-content').removeClass('loading').css({'height':newHeight+'px'});

                        var time = 300;

                        $('.loading-by-ajax').each(function(){

                            var item = $(this);

                            setTimeout(function(){
                                item.removeClass('loading');

                                if(item.is('.websites-statistic')){
                                    svgCircles();
                                    $('.websites-content').css('height', 'auto');
                                }

                            },time);

                            time = time + 200;

                        });


                    }
                });

            },300);

        }

        $(document).on('click', '.websites-slider-wrap:not(.not-ajax) .sites-filter-slider-item', function(){
            websitesSliderItemClicking($(this));
        });

        // clicing by website filter item
        $(document).on('click', '.column-list-sites-filter:not(.adding):not(.not-ajax) li', function(){

            $('.column-list-sites-filter').addClass('adding');

            $('.column-list-sites-filter li').removeClass('active');
            $(this).addClass('active');

            var chossenFilter = $(this).attr('data-sites');

            $('.websites-slider-wrap, .websites-content').addClass('loading');



                if($('.sites-filter-slider').is('.slick-slider')){
                    $('.sites-filter-slider').slick('destroy');
                    $('.sites-filter-slider-item').remove();
                }

                $.ajax({
                    url:'js/json/website_slider.json',
                    data:{action:"websites_slider_filtering", filter:chossenFilter},
                    method:'POST',
                    success:function(data){

                        var filterData = data;

                        if(typeof data != 'object'){
                            filterData = JSON.parse(data);
                        }

                        setTimeout(function(){

                            var objectLength = filterData.length;

                            filterData.forEach(function(item, index){

                                $('.sites-filter-slider').append('<div class="sites-filter-slider-item" data-site='+item.site+'>'+item.name+'</div>');

                                if(index == (objectLength-1)){

                                    sliderInit();

                                }

                            });

                        }, 1000);

                    }
                });



        });

        $('.column-list-sites-filter li').eq(0).click();

    }

/* /websites */

$(document).ready(function(){

   validate('.contact-form form', {submitFunction:validationCall});
   Maskedinput();
   fancyboxForm();

   websitesScript();

});