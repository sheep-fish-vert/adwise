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

    $(window).resize(function(){
        if($(window).width() > 992){
            $('header .menu').removeAttr('style');
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
    hoverItmes();

    // reinit & markuping slider

        function addSlidesINSlider(){
            if(slider.hasClass('slick-initialized')){
                slider.slick('unslick');
            }

            slider.find('.item').remove();

            for (var i = 0; i < filteredArray.length; i++) {
                var oneSlide = '<div class="item"><div class="item-link-wrap"><a href="'+filteredArray[i].href+'" class="item-link"><img src="'+filteredArray[i].img+'" alt="'+filteredArray[i].name+'"><span class="hover"></span></a></div></div>';
                    slider.append(oneSlide);
            }

            initSliderPartners(slider);

        };

    // /reinit & markuping slider

    // radio change func

        function radioChangeFilter() {
            $('.menu-filter').on('change','input',function () {
                filterValue = $('.menu-filter input:checked').val();
                filteredArray=[];
                filteringSlds();
                addSlidesINSlider();
                //hoverItmes();
            });
        };

    // /radio change func

    // adding slides in array

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
                        filteredArray.push(slides[i]);
                    }
                }
            }else{
                filteredArray = slides;
            }
        };

    // /adding slides in array

    // init slider when filter change

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

        };

    // /init slider when filter change

    // hover items anim

        function hoverItmes(){

            $(document).on('mouseenter', '.item-link-wrap', function(){
                $(this).find('.item-link').addClass('hovered');
            });

            $(document).on('mousemove','.item-link-wrap', function(e){

                var linkWrap = $(this);
                var offsetX = e.offsetX;
                var offsetY = e.offsetY;
                var linkParams = this.getBoundingClientRect();
                var linkWidth = linkParams.width/2;
                var linkHeight = linkParams.height/2;
                var titlLimit = 15;
                var positionX = (linkHeight - offsetY) * (titlLimit / linkHeight);
                var positionY = (linkWidth - offsetX) * (titlLimit / linkWidth) * (-1);

                linkWrap.find('.item-link').css({'transform': 'rotateX( ' + positionX + 'deg ) rotateY( ' + positionY + 'deg )'});

                linkWrap.find('.hover').css({'transform': 'translate3d( ' + offsetX + 'px, ' + offsetY + 'px, '  + '0 )'});

            });

            $(document).on('mouseleave', '.item-link-wrap', function(){

                $(this).find('.item-link').removeClass('hovered');
                $(this).find('.item-link').removeAttr('style');

            });

        };

    // /hover items anim

};

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
                    $('.col-wrap-sample').height(sampleMaxHeight-buttonHeight);
                }

            }, 300);
        }

    };

    oneSizeMain();

    $(window).resize(function(){
        oneSizeMain();
    });


};



//video creatives---------------------------------------------------------------------------------
function prerollFancyOpen() {
    $(document).on('click', '.item-preroll a', function (e) {
        var src = $(this).data('src');
        var poster = $(this).data('poster');
        var title = $(this).find('.title-item').text();
        $('#video-popup .trollPlayer').trollPlayer({
            src:src,
            poster:poster
        });
        $.fancybox.open('#video-popup',{
            openEffect  : 'fade',
            closeEffect : 'fade',
            width:'80%',
            autoResize:true,
            wrapCSS:'fancybox-standart',
            'closeBtn' : false,
            fitToView:true,
            padding:'0'
        });
        e.preventDefault();
        return false;

    })
}
    prerollFancyOpen();

var wavesurfer
function audioFancyOpen() {
    $(document).on('click', '.item-audio a', function (e) {
        if($(this).hasClass('initialized')){
            $.fancybox.open('#audio-popup',{
                'closeBtn' : false,
                padding:0,
                afterClose: function () {
                    wavesurfer.stop();
                }
            });
        }else {
            $('.item-audio a').removeClass('initialized');
            $('.play-bttn').removeClass('paused');
            $('.play-bttn').unbind();
            $('.stop-bttn').unbind();
            var src = $(this).data('src');


            $('#waveform').html('');

            wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'violet',
                progressColor: 'purple'
            });
            wavesurfer.load(src);

            $.fancybox.open('#audio-popup', {
                'closeBtn': false,
                padding:0,
                afterClose: function () {
                    wavesurfer.stop();
                }
            });
            var hasHour;
            wavesurfer.on('ready', function () {    //ивент определения  возможности проигрования
                hasHours = (wavesurfer.getDuration() / 3600) >= 1.0;
                $('#audio-popup .total-time').text(formatTime(wavesurfer.getDuration(), hasHours));
                $('#audio-popup .curent-time').text(formatTime(0), hasHours);

            });
            wavesurfer.on('audioprocess', function () {
                var current = wavesurfer.getCurrentTime();
                var progress = (Math.floor(current) / Math.floor(wavesurfer.getDuration()));
                $('#audio-popup .curent-time').text(formatTime(current, hasHours));
                $('#audio-popup .curent-progress').css('width',(Math.floor(progress * $('.total-progress').width()) + "px"));

            });
            $('.total-progress').click(function(e) {// ивент клика по таймлайну (перемотка мышкой)
                var x = (e.offsetX==undefined?e.layerX:e.offsetX)/$(this).width();
                wavesurfer.seekTo(x);

                $('#audio-popup .curent-progress').css('width',(e.offsetX==undefined?e.layerX:e.offsetX) + "px");
            });
            $(this).addClass('initialized');
            $('.play-bttn').click(function () {
                wavesurfer.playPause();
                $(this).toggleClass('paused');
            });
            $('.mute-bttn').click(function () {
                wavesurfer.toggleMute();
                $(this).toggleClass('muted');
            });
        }
        e.preventDefault();
        return false;
    });
}



function voiceoverFancyOpen() {
    $(document).on('click', '.item-voiceover a', function (e) {

            var srcVideo = $(this).data('srcvideo');
            var poster = $(this).data('poster');
            var title = $(this).find('.title-item').text();
            $('.title-audio').text(title);
            var start = parseInt($(this).data('start'));
            var stop = parseInt($(this).data('stop'));
            var wrap = $('.voiceover-container .trollPlayer').trollPlayer({
                src: srcVideo,
                poster: poster

            });

            var player = wrap.find('video')[0];


            setTimeout(function () {

                $.fancybox.open('#voiceover-popup',{
                    'closeBtn' : false,
                    padding:0,
                    afterShow:function(){
                        var vD = player.duration;
                        var wT = $('.voiceover-container .trollPlayer').width();

                        var aD = stop - start;
                        var waveWidth = (wT * aD) / vD;
                        var waveLeft = (start * wT) / vD;

                        $('#waveformAudio').attr('style', 'width:' + waveWidth + 'px; left:' + waveLeft + 'px;');
                        wrap.find('.time_voiceover').attr('style', 'width:' + waveWidth + 'px; left:' + waveLeft + 'px;');
                        wrap.find('.time_voiceover-border').attr('style', 'width:' + waveWidth + 'px; left:' + waveLeft + 'px;');
                        var wavesurferV = WaveSurfer.create({
                            container: '#waveformVideo',
                            waveColor: '#810000',
                            progressColor: 'purple',
                            backend: 'MediaElement'
                        });
                        wavesurferV.load(srcVideo);
                        wavesurferV.setVolume(0);
                        player.addEventListener("timeupdate", function () {
                            var progress = Math.floor(player.currentTime) / Math.floor(player.duration);
                            wavesurferV.seekTo(progress);
                        }, false);
                    },
                    afterClose: function () {
                        $('#waveformVideo').html('');
                        wrap.trollPlayer('destroy');

                        $('#waveformAudio').removeAttr('style');

                    }
                });

            }, 300);



        e.preventDefault();
        return false;
    });
}
// функция для форматирования времени
function formatTime(time, hours) {
    if (hours) {
        var h = Math.floor(time / 3600);
        time = time - h * 3600;

        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);

        return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
    } else {
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);

        return m.lead0(2) + ":" + s.lead0(2);
    }
}

Number.prototype.lead0 = function(n) {
    var nz = "" + this;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
};
// конец функции для форматирования времени
//END video creatives---------------------------------------------------------------------------------

$(document).ready(function(){
    audioFancyOpen();
    butter();
    voiceoverFancyOpen();
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