

(function($) {

    var defaults = {
        ctrls:{
            play:'play_ctrl',
            stop:'stop_ctrl',
            timeLine:'timeline_ctrl',
            time:'time_ctrl',

            fullScr:'fullscreen_ctrl',
            sound:'sound_ctrl',
            title:'title'

        },
        ctrlsWrap:'vid-ctrls',
        bigPlay:'big-play'

    };

    var state = 0 ; // текущее состояние плеера; 0-стартовок; 1-проигрывается; 2-на паузе;
    var methods = {
        init:function(params) {
            var options = $.extend({}, defaults, params);
            return this.each(function () {

                var objects = {
                        main:$(this),
                        ctrl:{
                            hasHours: false
                        },
                        player:$(this).find('video')[0]
                    };
                objects.ctrlWrap = methods.initUI(objects.main, options);
                //сылки на обьекты
               objects.ctrl.play = objects.ctrlWrap.find('.'+options.ctrls.play);
               objects.ctrl.stop = objects.ctrlWrap.find('.'+options.ctrls.stop);
               objects.ctrl.timeline = objects.ctrlWrap.find('.'+options.ctrls.timeLine);
               objects.ctrl.time = objects.ctrlWrap.find('.'+options.ctrls.time);
               objects.ctrl.sound = objects.ctrlWrap.find('.'+options.ctrls.sound);
               objects.ctrl.fullScr = objects.ctrlWrap.find('.'+options.ctrls.fullScr);
               objects.ctrl.buffered = objects.ctrlWrap.find('.time_buffer');
               objects.ctrl.progress = objects.ctrlWrap.find('.time_current');
               objects.ctrl.duration = objects.ctrlWrap.find('#duration');
               objects.ctrl.currentTime = objects.ctrlWrap.find('#currenttime');
               objects.bigPlay = objects.main.find('.'+options.bigPlay);
                if(options.src != "undefined"){objects.player.src = options.src;}
                if(options.poster != "undefined"){objects.player.poster = options.poster;}



                var player = objects.player;




                objects.player.addEventListener("canplay", function() {     //ивент определения  возможности проигрования
                    objects.ctrl.hasHours = (objects.player.duration / 3600) >= 1.0;
                    objects.ctrl.duration.text(formatTime(objects.player.duration, objects.ctrl.hasHours));
                    objects.ctrl.currentTime.text(formatTime(0),objects.ctrl.hasHours);

                });
                objects.ctrl.play.click(function () {methods.togglePlay(options, objects) }); //ивент кноки плей
                objects.bigPlay.click(function () {methods.togglePlay(options, objects) }); // ивент клика по видео
                objects.ctrl.stop.click(function () {methods.stopV(options, objects) }); // ивент клика по кнопке стоп

                objects.player.addEventListener("timeupdate", function() {  // ивент воспроизведения
                    objects.ctrl.currentTime.text(formatTime(objects.player.currentTime, objects.ctrl.hasHours));
                    var progress = Math.floor(objects.player.currentTime) / Math.floor(objects.player.duration);
                    objects.ctrl.progress.css('width',(Math.floor(progress * objects.ctrl.timeline.width()) + "px"));
                }, false);

                
                objects.player.addEventListener("ended", function() {// ивент окончания воспроизведения видео
                    methods.stopV(options, objects);
                });
                objects.ctrl.sound.click(function() {// ивент клика по динамику
                    methods.toggleMute(objects);
                });
                objects.ctrl.timeline.click(function(e) {// ивент клика по таймлайну (перемотка мышкой)
                    var x = (e.offsetX==undefined?e.layerX:e.offsetX)/$(this).width();
                    objects.player.currentTime = x * objects.player.duration;
                });
                objects.ctrl.fullScr.click(function () {
                    togFS();
                });
                $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange',function(){
                    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

                    if(fullscreenElement){objects.ctrlWrap.addClass('fullscreen');
                    }else{    objects.ctrlWrap.removeClass('fullscreen'); }
                });

                function togFS() {
                    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

                    if(fullscreenElement){
                        methods.exitFullscreen();
                        objects.ctrlWrap.removeClass('fullscreen');

                    }else{

                        methods.fullscreen(objects.player);
                        objects.player.controls = false;
                        objects.ctrlWrap.addClass('fullscreen');
                    }
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
                if(options.callback){
                    options.callback();
                }
                return  player;
            });
        },
        initUI:function (main, options) { //метод инициализации UI
            mass = options.ctrls;
            var content = '<div class="'+options.ctrlsWrap+'">';
            for(var key in mass) {
                if (key == 'timeLine') {
                    content = content + '<div class="' + mass[key] + '" ><span class="time_current"></span><span class="time_buffer"></span><span class="time_voiceover"></span><span class="time_voiceover-border"></span></div>';
                }else if((key == 'time')){
                    content = content + '<div class="' + mass[key] + '" ><span id="currenttime">00:00</span>/<span id="duration">00:00</span></div>';
                }else {
                    content = content + '<div class="' + mass[key] + '" ></div>';
                }
            }
            content = content + '</div>';
            var bigPlay = '<div class="'+options.bigPlay+'"></div>';

            main.append(bigPlay);
            main.append(content);

            return main.find('.'+options.ctrlsWrap);

        },
        playV:function (options, objects) { //метод вопроизведения видео
            objects.player.play();
            objects.ctrl.play.addClass('paused');
            objects.bigPlay.addClass('paused');
            state = 1;
        },
        pauseV:function (options, objects) { // метод паузы видео
            objects.player.pause();
            objects.ctrl.play.removeClass('paused');
            objects.bigPlay.removeClass('paused');
            state = 2;
        },
        togglePlay:function (options, objects) { // метод "переключатель" play/pause
            if(state!=1){
                methods.playV(options, objects);
            } else{
                methods.pauseV(options, objects);
            }
        },
        stopV:function (options, objects) {// метод сброса видео в стартовое положение
            methods.pauseV(options, objects);
            objects.player.currentTime = 0;
            objects.bigPlay.removeClass('paused');
            state = 0;
        },
        fullscreen:function (elem) {

            if (!elem.fullscreenElement &&    // alternative standard method
                !elem.mozFullScreenElement && !elem.webkitFullscreenElement && !elem.msFullscreenElement ) {  // current working methods
                var requestFullScreen = elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
                requestFullScreen.call(elem);
            }
            
        },
        exitFullscreen:function () {
            if(document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        },
        destroy:function () {
            $(this).html('<video src=""  poster=""></video>');
        },
        toggleMute : function (objects) {
            objects.player.muted = !objects.player.muted;
            objects.ctrl.sound.toggleClass('muted');
        }

    };

    $.fn.trollPlayer = function(method){ // конструктор
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод "' +  method + '" не найден в плагине jQuery.trollPlayer' );
        }
    };
})(jQuery);

