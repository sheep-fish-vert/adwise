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
        fitToView:true,
        wrapCSS:popupWrap,
        autoSize:true,
        'closeBtn' : false,
        afterClose: function(){
            $('form').trigger("reset");
            clearTimeout(timer);
        }
    });

    var timer = null;
    /*
     timer = setTimeout(function(){
         $('form').trigger("reset");
         $.fancybox.close(popupId);
     },2000);
    */
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

                        $('.websites-content').append('<div class="websites-text loading-by-ajax loading">'+websiteData.text+'</div><div class="websites-audience loading-by-ajax loading"><div class="websites-audience-title">Audience</div><div class="websites-audience-main"><div clas="websites-audience-icon"><img src="images/female-icon.png" alt="" onError="this.src=\'/wp-content/themes/sf_Theme/images/female-icon.png\'"/></div><div class="websites-audience-text">'+websiteData.audience.female+'</div></div><div class="websites-audience-main"><div clas="websites-audience-icon"><img src="images/male-icon.png" alt="" onError="this.src=\'/wp-content/themes/sf_Theme/images/male-icon.png\'"/></div><div class="websites-audience-text">'+websiteData.audience.male+'</div></div></div><div class="websites-statistic loading-by-ajax loading"><div class="websites-statistic-title"><div class="websites-statistic-title-top">Ad formats</div><div class="websites-statistic-title-bottom">Efficiency</div></div><div class="websites-statistic-params"><div class="websites-statistic-param-item"><div class="websites-statistic-param-item-wrap"><div class="websites-statistic-param-title">Banners</div><div class="websites-statistic-param-circle" data-value='+websiteData.statistic.banners+'><span class="circle-value-text">0%</span><svg width="47" height="47" viewBox="0 0 47 47"><circle class="circle-background" cx="23.5" cy="23.5" r="20.5"></circle><circle class="circle-lines" cx="23.5" cy="23.5" r="20.5"></circle></svg></div></div></div><div class="websites-statistic-param-item"><div class="websites-statistic-param-item-wrap"><div class="websites-statistic-param-title">Branding</div><div class="websites-statistic-param-circle" data-value='+websiteData.statistic.branding+'><span class="circle-value-text">0%</span><svg width="47" height="47" viewBox="0 0 47 47"><circle class="circle-background" cx="23.5" cy="23.5" r="20.5"></circle><circle class="circle-lines" cx="23.5" cy="23.5" r="20.5"></circle></svg></div></div></div><div class="websites-statistic-param-item"><div class="websites-statistic-param-item-wrap"><div class="websites-statistic-param-title">Clickunder</div><div class="websites-statistic-param-circle" data-value='+websiteData.statistic.clickunder+'><span class="circle-value-text">0%</span><svg width="47" height="47" viewBox="0 0 47 47"><circle class="circle-background" cx="23.5" cy="23.5" r="20.5"></circle><circle class="circle-lines" cx="23.5" cy="23.5" r="20.5"></circle></svg></div></div></div><div class="websites-statistic-param-item"><div class="websites-statistic-param-item-wrap"><div class="websites-statistic-param-title">Pre-roll</div><div class="websites-statistic-param-circle" data-value='+websiteData.statistic.pre_roll+'><span class="circle-value-text">0%</span><svg width="47" height="47" viewBox="0 0 47 47"><circle class="circle-background" cx="23.5" cy="23.5" r="20.5"></circle><circle class="circle-lines" cx="23.5" cy="23.5" r="20.5"></circle></svg></div></div></div></div></div>');

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

/* services-websites */

    function servicesWebsitesScripts(){

        var timer = [];

        $('.services-websites').each(function(){

            var slider = $(this).find('.slider');

            slider.on('init', function(){

                var parent = slider.parents('.services-websites');
                var siteName = slider.find('.slick-current .slider-text').text();

                reloadServicesWebsitesContent(parent, siteName);

            });

            slider.on('afterChange', function(slick, currentSlide){

                var parent = slider.parents('.services-websites');
                var siteName = slider.find('.slick-current .slider-text').text();

                reloadServicesWebsitesContent(parent, siteName);

            });

            slider.slick({
                slidesToShow:5,
                slidesToScroll:1,
                vertical:true,
                arrows:true,
                dots:false,
                focusOnSelect: true,
                responsive:[
                    {
                        breakpoint:767,
                        settings:{
                            slidesToShow:3,
                            slidesToScroll:1,
                            vertical:false
                        }
                    },
                    {
                        breakpoint:666,
                        settings:{
                            slidesToShow:1,
                            slidesToScroll:1,
                            vertical:false
                        }
                    },
                    {
                        breakpoint:479,
                        settings:{
                            slidesToShow:1,
                            slidesToScroll:1,
                            vertical:false
                        }
                    }
                ]
            });

        });

        function reloadServicesWebsitesContent(parent, siteName){

            parent.find('.right').addClass('loading');
            parent.find('.white-block').addClass('loading');

            var contentNumId = parent.attr('data-services');

            clearTimeout(timer[contentNumId]);

            timer[contentNumId] = setTimeout(function(){
                parent.find('.img-item').remove();
                $.ajax({
                    url:'js/json/services_websites_info.json',
                    data:{'action':'loadServicesWebsitesContent', 'siteName':siteName, 'contentNum':contentNumId},
                    method:'POST',
                    success:function(data){

                        var dataParsed = data;

                        if(typeof data != 'object'){
                            dataParsed = JSON.parse(data);
                        }

                        dataParsed.images.forEach(function(item){
                            var itemWrap = '<div class="img-item"><div class="img-item-wrap">'+item.image+'</div><div class="img-item-text">'+item.text+'</div></div>';
                            parent.find('.img-wrap').append(itemWrap);
                        });

                        parent.find('.value-item.people .value-item-text').text(dataParsed.people_value);
                        parent.find('.value-item.female .value-item-text').text(dataParsed.female_value);
                        parent.find('.value-item.male .value-item-text').text(dataParsed.male_value);
                        //parent.find('.right-text').text(dataParsed.main_text);

                        parent.find('.right').removeClass('loading');
                        parent.find('.white-block').removeClass('loading');

                    }
                });
            },600);

        };

    };

/* /services-websites */

/* event-page */

    function eventPage(){

        // conteing events dates

            var eventsDates = null;

        // conteing events dates

        // conteing chossen date

            var chossenDate = [];

        // contein chossen date

        function eventPageSlider(){

            var eventPageSlider = $('.event-page-slider');

            eventPageSlider.on('init', function(slick){

                var wrapWidth = parseInt($('.event-page-slider-wrap').width());
                var slickLength = $('.event-page-slider-item').length;
                var wrapItemsWidth = slickLength * wrapWidth;
                $('.event-page-slider-item').width(wrapWidth);
                $('.slick-track').css({'opacity':'1', 'width':wrapItemsWidth+'px', 'transform':'translate3d(-'+wrapWidth+'px, 0px, 0px)'});

                var eventName = $('.event-page-slider-item.slick-current').attr('data-event');

                changeCalendarEvents(eventName);

            });

            eventPageSlider.on('afterChange', function(slick, currentSlide){

                var eventName = $('.event-page-slider-item.slick-current').attr('data-event');

                changeCalendarEvents(eventName);

            });

            eventPageSlider.slick({
                arrows:true,
                dots:false,
                slidesToShow:1
            });

        };

        eventPageSlider();

        // /event-page slider

        // change calendar events by ajax

            function changeCalendarEvents(eventName){

                $('.event-page-slider-main, .event-page-datepicker-content').addClass('loading');
                chossenDate = [];

                $.ajax({
                    url:'js/json/data_events_'+eventName+'.json', // ajaxUrl
                    method:"POST",
                    data:{'action':'load_event_info_calendar','event_name':eventName},
                    success:function(data){

                        setTimeout(function(){

                            eventsDates = data;
                            if(typeof data != 'object'){
                                eventsDates = JSON.parse(data);
                            }

                            loadCalendarInfo(eventsDates[0].year, eventsDates[0].month);

                            loadingCalendarByLoop();

                            lookingCurrentEventChossenDate();

                            $('.event-page-slider-main, .event-page-datepicker-content').removeClass('loading');

                        },300);

                    }
                });

            }

        // /change calendar events by ajax

        // event-page calendar

            dayNames.forEach(function(item, index){
                if(index != 0){
                    $('.event-page-datepicker-days ul').append('<li>'+item+'</li>');
                }
                if(index == (dayNames.length - 1)){
                    $('.event-page-datepicker-days ul').append('<li>'+dayNames[0]+'</li>');
                }
            });

            // showing calendar length

                var calendarLength = 0;

                function calendarLengthFunc(){
                    calendarLength = 5;
                    if($(window).width() < 768){
                        calendarLength = 5; // change if on adaptation want arrows
                    }
                }

                calendarLengthFunc();

                $(window).resize(function(){
                    calendarLengthFunc();
                });

            // /showing calendar length

            var date = new Date();

            var currentMonth = date.getMonth();
            var weekDay = date.getDay();
            var dayDate = date.getDate();
            var yearDate = parseInt(date.getFullYear());

            // loading calendar info into array

            var monthNumArray = [];

            function loadCalendarInfo(year, month){

                var firstSliderMonth = month - 2;

                for(var i = 0;i < calendarLength;i++){

                    monthNumArray[i] = {};

                    if(firstSliderMonth == (-2)){
                        monthNumArray[i].month = 10;
                        monthNumArray[i].year = +year- +1;
                        monthNumArray[i].monthDaysLength = new Date(monthNumArray[i].year, 11, 0).getDate();
                        monthNumArray[i].firstDate = new Date(monthNumArray[i].year, 10, 1).getDay();
                    }else if(firstSliderMonth == (-1)){
                        monthNumArray[i].month = 11;
                        monthNumArray[i].year = +year- +1;
                        monthNumArray[i].monthDaysLength = new Date(monthNumArray[i].year+1, 0, 0).getDate();
                        monthNumArray[i].firstDate = new Date(monthNumArray[i].year, 11, 1).getDay();
                    }else if(firstSliderMonth == 12){

                        monthNumArray[i].month = 0;
                        monthNumArray[i].year = +year+ +1;
                        monthNumArray[i].monthDaysLength = new Date(monthNumArray[i].year, monthNumArray[i].month+1, 0).getDate();
                        monthNumArray[i].firstDate = new Date(monthNumArray[i].year, 0, 1).getDay();
                    }else if(firstSliderMonth == 13){
                        monthNumArray[i].month = 1;
                        monthNumArray[i].year = +year+ +1;
                        monthNumArray[i].monthDaysLength = new Date(monthNumArray[i].year, monthNumArray[i].month+1, 0).getDate();
                        monthNumArray[i].firstDate = new Date(monthNumArray[i].year, monthNumArray[i].month, 1).getDay();
                    }else{
                        monthNumArray[i].month = firstSliderMonth;
                        monthNumArray[i].year = year;
                        var monthNumForCurrentMonth = monthNumArray[i].month + 1;
                        if(monthNumForCurrentMonth == 12){
                            monthNumArray[i].monthDaysLength = new Date(monthNumArray[i].year+1, 0, 0).getDate();
                        }else{
                            monthNumArray[i].monthDaysLength = new Date(monthNumArray[i].year, monthNumArray[i].month+1, 0).getDate();
                        }
                        monthNumArray[i].firstDate = new Date(monthNumArray[i].year, monthNumArray[i].month, 1).getDay();

                    }

                    firstSliderMonth = firstSliderMonth + 1;

                }

            };

            loadCalendarInfo(yearDate, currentMonth);

            // /loading calendar info into array

            // loading calendars on page

                function loadingCalendarsOnPage(item, index){

                    var dayPoint = 1;

                    for(var i=0;i<5;i++){

                        $('.calendar').eq(index).append('<div class="calendar-row"></div>');

                        for(var j=1;j<8;j++){
                            if(i == 0){
                                if(j >= item.firstDate && item.firstDate != 0){
                                    $('.calendar').eq(index).find('.calendar-row').eq(i).append('<div class="calendar-col"><span class="outside-date-wrap" data-date='+dayPoint+'><span class="inside-date-wrap">'+dayPoint+'</span></span></div>');
                                    dayPoint++;
                                }else{
                                    if($('.calendar').eq(index).find('.calendar-row').eq(i).find('.calendar-col').length < 6){
                                        $('.calendar').eq(index).find('.calendar-row').eq(i).append('<div class="calendar-col"></div>');
                                    }else{
                                        $('.calendar').eq(index).find('.calendar-row').eq(i).append('<div class="calendar-col"><span class="outside-date-wrap" data-date='+dayPoint+'><span class="inside-date-wrap">'+dayPoint+'</span></span></div>');
                                        dayPoint++;
                                    }
                                }
                            }else if(i == 4){
                                if(dayPoint < item.monthDaysLength){
                                    $('.calendar').eq(index).find('.calendar-row').eq(i).append('<div class="calendar-col"><span class="outside-date-wrap" data-date='+dayPoint+'><span class="inside-date-wrap">'+dayPoint+'</span></span></div>');
                                    dayPoint++;
                                }else{
                                    $('.calendar').eq(index).find('.calendar-row').eq(i).append('<div class="calendar-col"></div>');
                                }
                            }else{
                                $('.calendar').eq(index).find('.calendar-row').eq(i).append('<div class="calendar-col"><span class="outside-date-wrap" data-date='+dayPoint+'><span class="inside-date-wrap">'+dayPoint+'</span></span></div>');
                                dayPoint++;
                            }
                        }
                    }
                }

            // /loading calendars on page

            // loading calendar on page by loop

                function loadingCalendarByLoop(){

                    $('.event-page-datepicker-top-item, .calendar').remove();

                    monthNumArray.forEach(function(item, index){

                        $('.event-page-datepicker-top-wrap').append('<div class="event-page-datepicker-top-item" data-year='+item.year+' data-month='+item.month+'>'+monthNames[item.month]+'</div>');

                        $('.event-page-datepicker-bottom').append('<div class="calendar" data-year='+item.year+' data-month='+item.month+'></div>');
                        if(index+1 == Math.round(calendarLength/2)){
                            $('.calendar:last-child').addClass('active-month');
                            $('.event-page-datepicker-top-item:last-child').addClass('active-month');
                        }

                        loadingCalendarsOnPage(item, index);

                    });
                };

                loadingCalendarByLoop();

            // loading calendar on page by loop

            // looking current date func

                function lookingCurrentEventChossenDate(){

                    $('.calendar[data-month='+currentMonth+'][data-year='+yearDate+'] .outside-date-wrap[data-date ='+dayDate+']').addClass('current-day');

                    if(eventsDates != null){
                        eventsDates.forEach(function(item, index){
                            $('.calendar[data-year='+item.year+'][data-month='+item.month+'] .outside-date-wrap[data-date='+item.day+']').addClass('event-day');
                        });
                    }

                    if(chossenDate.length != null){
                        chossenDate.forEach(function(item, index){
                            $('.calendar[data-month='+item.month+'][data-year='+item.year+'] .outside-date-wrap[data-date ='+item.day+']').addClass('chossen-day');
                        });

                    }

                };
                lookingCurrentEventChossenDate();

            // /looking current date func

            // change month by click

                var newYear = 0;
                var newMonth = 0;

                function changeMonth(){

                    $(document).on('click', '.event-page-datepicker-top-wrap:not(.moving) .event-page-datepicker-top-item:not(.active-month)', function(){

                        var thisIndex = $(this).index();
                        var currentIndex = $('.event-page-datepicker-top-item.active-month').index();
                        $('.event-page-datepicker-top-wrap').addClass('moving');

                        var newYear = $(this).attr('data-year');
                        var newMonth = $(this).attr('data-month');

                        loadCalendarInfo(newYear, newMonth);

                        if(thisIndex > currentIndex){

                            $('.event-page-datepicker-top-wrap').addClass('moving-left');
                        }else{
                            $('.event-page-datepicker-top-wrap').addClass('moving-right');
                        }

                        $('.event-page-datepicker-top-item.active-month').removeClass('active-month');
                        $(this).addClass('active-month');

                        $('.calendar').removeClass('active-month');
                        $('.calendar').eq(thisIndex).addClass('active-month');

                        setTimeout(function(){
                            if(thisIndex > currentIndex){

                                $('.event-page-datepicker-top-wrap .event-page-datepicker-top-item:first-child').remove();
                                $('.event-page-datepicker-top-wrap').append('<div class="event-page-datepicker-top-item" data-year='+monthNumArray[calendarLength-1].year+' data-month='+monthNumArray[calendarLength-1].month+'>'+monthNames[monthNumArray[calendarLength-1].month]+'</div>')

                                $('.calendar:first-child').remove();
                                $('.event-page-datepicker-bottom').append('<div class="calendar" data-year='+monthNumArray[calendarLength-1].year+' data-month='+monthNumArray[calendarLength-1].month+'></div>');

                                loadingCalendarsOnPage(monthNumArray[calendarLength-1], calendarLength-1);

                            }else{
                                $('.event-page-datepicker-top-wrap .event-page-datepicker-top-item:last-child').remove();

                                $('.event-page-datepicker-top-wrap').prepend('<div class="event-page-datepicker-top-item" data-year='+monthNumArray[0].year+' data-month='+monthNumArray[0].month+'>'+monthNames[monthNumArray[0].month]+'</div>')

                                $('.calendar:last-child').remove();
                                $('.event-page-datepicker-bottom').prepend('<div class="calendar" data-year='+monthNumArray[0].year+' data-month='+monthNumArray[0].month+'></div>');

                                loadingCalendarsOnPage(monthNumArray[0], 0);
                            }
                            $('.event-page-datepicker-top-wrap').removeClass('moving moving-left moving-right');

                            lookingCurrentEventChossenDate();

                        }, 300);

                    });

                }

                changeMonth();

            // /change month by click

            // chosse day for something

                $(document).on('click', '.outside-date-wrap.event-day:not(.current-day)', function(){

                    if(!$(this).is('.chossen-day')){

                        var newElementPoint = chossenDate.length;
                        chossenDate[newElementPoint] = {};
                        chossenDate[newElementPoint].day = $(this).attr('data-date');
                        chossenDate[newElementPoint].year = $(this).parents('.calendar').attr('data-year');
                        chossenDate[newElementPoint].month = $(this).parents('.calendar').attr('data-month');

                        $(this).addClass('chossen-day');

                        var chossenDateString = '';
                        chossenDate.forEach(function(item, index){
                            chossenDateString = chossenDateString + item.day + '.' + item.month + '.' + item.year + ' | ';
                        });

                        $('.event-page-form-main input[type="hidden"]').val(chossenDateString);

                    }else{

                        var chossenDay = $(this).attr('data-date');
                        var chossenYear = $(this).parents('.calendar').attr('data-year');
                        var chossenMonth = $(this).parents('.calendar').attr('data-month');

                        var indexOfChossenArray = null;

                        chossenDate.forEach(function(item, index){
                            if(item.day == chossenDay && item.year == chossenYear && item.month == chossenMonth){
                                indexOfChossenArray = index;
                            }
                        });

                        chossenDate.splice(indexOfChossenArray, 1);

                        $(this).removeClass('chossen-day');

                        var chossenDateString = '';
                        chossenDate.forEach(function(item, index){
                            chossenDateString = chossenDateString + item.day + '.' + item.month + '.' + item.year + ' | ';
                        });

                        $('.event-page-form-main input[type="hidden"]').val(chossenDateString);

                    }

                });

            // chosse day for something

        // /event-page calendar


    }

/* /event-page */

/* geo-page */

    function geoPage(){

        //init slider & events on map

            var geoSlider = $('.column-list-countries-wrap');

            geoSlider.on('init',function(slick){

                var country = $('.slick-current').attr('data-country');

                $('.work-with').removeClass('active');
                $('.work-with[data-country='+country+']').addClass('active');

                callingAjax(country);

            });

            geoSlider.slick({
                slidesToShow:5,
                dots:false,
                arrows:true,
                vertical:true,
                focusOnSelect:true,
                responsive:[
                    {
                        breakpoint:992,
                        settings:{
                            vertical:false,
                            centerMode:true,
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

            geoSlider.on('afterChange', function(slick, currentSlide){

                var country = $('.slick-current').attr('data-country');

                $('.work-with').removeClass('active');
                $('.work-with[data-country='+country+']').addClass('active');

                callingAjax(country);

            });

            $(document).on('click','.work-with:not(.active)',function(){

                $('.work-with').removeClass('active');
                $(this).addClass('active');

                var country = $(this).attr('data-country');
                var countryId = $('.column-list-country:not(.slick-cloned)[data-country='+country+']').attr('data-slick-index');

                geoSlider.slick('slickGoTo',countryId);

            });

        // init slider & events on map

        // calling ajax and reset params

            function callingAjax(country){

                $('.geo-page .column-list, .geo-map, .geo-content').addClass('loading');

                $.ajax({
                    url:'js/json/country_circle_params.json', // ajax.php
                    data:{action:'load_geo_circles', country:country},
                    method:'POST',
                    success:function(data){

                        setTimeout(function(){

                            var dataCountry = data;

                            if(typeof data != 'object'){
                                dataCountry = JSON.parse(data);
                            }

                            var dataLength = dataCountry.length;

                            dataCountry.forEach(function(item, index){
                                $('.geo-svg-circle').eq(index).find('.geo-svg-value').text(item.text);
                                $('.geo-svg-circle').eq(index).find('svg').attr('data-value', item.value);
                                if(index == (dataLength - 1)){
                                    svgCirclesGeo();
                                }
                            });

                        }, 300);

                    }
                });

            };

        // calling ajax and reset params

        // loading svg geo circles

            function svgCirclesGeo(){

                $('.geo-content, .geo-page .column-list, .geo-map').removeClass('loading');

                var circleTime = 0;

                $('.geo-svg').each(function(index){

                    var percent = parseInt($(this).find('svg').attr('data-value'));
                    var circle = $(this).find('.circle-lines');
                    var circleRadius = circle.attr('r');
                    var circleLength = Math.PI*(circleRadius*2);

                    circle.css({'stroke-dasharray':circleLength+'px','stroke-dashoffset':circleLength+'px','transition':' stroke-dashoffset 0s linear'});
                    var circleLengthPercent = ((100-percent)/100)*circleLength;

                    circleTime = circleTime + 300;

                    setTimeout(function(){
                        circle.css({'stroke-dashoffset':circleLengthPercent+'px','transition':' stroke-dashoffset 1s linear'});
                    },circleTime);

                });
            }

        // /loading svg geo circles

    }

/* /geo-page */

    function validationCallDocument(form){

        var thisForm = $(form);
        var formData = new FormData($(form)[0]);

        //formData.append('file', thisForm.find('input[type=file]')[0].files[0]);

        $.ajax({
            url: thisForm.attr('action'),
            type: "POST",
            data: formData,
            processData:false,
            cache:false,
            success: function(response) {
                thisForm.trigger("reset");
                $('.write-message-file div').removeClass('active');
                // $.fancybox.close();
                popNext("#call_success", "call-popup");
            }
        });

    }

    function selectFilePopup(){
        var preload = true;
        $('.form_input_file input[type="file"]').on('change',function() {
            if (preload == true){
                $('.write-message-file .item-uploaded').removeClass('active');
                $('.write-message-file .item-uploading').addClass('active');
                setTimeout(function () {
                    $('.write-message-file .item-uploading').removeClass('active');
                    $('.write-message-file .item-uploaded').addClass('active');
                },2000)
            }
        });

        $(document).on('click', '.form_input_file_span span', function(event) {
            event.preventDefault();
            $(this).siblings('input').click();
        });
    }


$(document).ready(function(){

    validate('.contact-form form', {submitFunction:validationCall});

    validate('.popup-join-us-form', {submitFunction:validationCall});

    validate('.popup-write-message', {submitFunction:validationCallDocument});

    validate('.popup-login-form');
    validate('.write-message-popap-write-vacancy', {submitFunction:validationCallDocument});

    //validate('.get-in-t', {submitFunction:validationCall});
    validate('.login-form', {submitFunction:validationCall});
    validate('.event-page-form-main', {submitFunction:validationCall});

    Maskedinput();
    fancyboxForm();

    websitesScript();

    eventPage();
    geoPage();
    selectFilePopup();

});

$(window).load(function() {

    servicesWebsitesScripts();

});