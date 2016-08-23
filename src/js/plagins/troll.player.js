// function trollPlayer() {
//     var controls = {
//         video: $("#myvideo"),
//         playpause: $("#playpause")
//     };
//
//     var video = controls.video[0];
//
//     controls.playpause.click(function(){
//         if (video.paused) {
//             video.play();
//
//         } else {
//             video.pause();
//         }
//
//         $(this).toggleClass("paused");
//     });
//
// }
var player;
(function($) {

    var defaults = {
        ctrls:{
            play:'play_ctrl',
            stop:'stop_ctrl',
            timeLine:'timeline_ctrl',
            time:'time_ctrl',
            sound:'sound_ctrl',
            fullScr:'fullscreen_ctrl',
            smallScr:'smallscreen_ctrl'

        },
        ctrlsWrap:'vid-ctrls'

    };

    var state = 0 ;
    var methods = {
        init:function(params) {
            var options = $.extend({}, defaults, params);
            return this.each(function () {

                var objects = {
                        main:$(this),
                        ctrlWrap : {},
                        ctrl:{
                            play:{},
                            stop:{},
                            timeline:{},
                            time:{},
                            sound:{},
                            fullScr:{},
                            smallScr:{}
                        },
                        player:$(this).find('video')[0]
                    };
                objects.ctrlWrap = methods.initUI(objects.main, options);

               objects.ctrl.play = objects.ctrlWrap.find('.'+options.ctrls.play);
               objects.ctrl.stop = objects.ctrlWrap.find('.'+options.ctrls.stop);
               objects.ctrl.timeline = objects.ctrlWrap.find('.'+options.ctrls.timeLine);
               objects.ctrl.time = objects.ctrlWrap.find('.'+options.ctrls.time);
               objects.ctrl.sound = objects.ctrlWrap.find('.'+options.ctrls.sound);
               objects.ctrl.fullScr = objects.ctrlWrap.find('.'+options.ctrls.fullScr);
               objects.ctrl.smallScr = objects.ctrlWrap.find('.'+options.ctrls.smallScr);
                player = objects.player;
                console.log(player);
                objects.ctrl.play.click(function () {
                   if(state!=1){
                       methods.playV(objects.player, options, objects);
                   } else{
                       methods.pauseV(objects.player, options, objects);
                   }
                });
            });
        },
        initUI:function (main, options) {
            mass = options.ctrls;
            var content = '<div class="'+options.ctrlsWrap+'">';
            for(var key in mass){
                content = content + '<div class="'+mass[key]+'" ></div>';
            }
            content = content + '</div>';
            main.append(content);
            return main.find('.'+options.ctrlsWrap);

        },
        playV:function (player, options, objects) {
            player.play();
            objects.ctrl.play.addClass('paused');
            state = 1;
        },
        pauseV:function (player, options, objects) {
            player.pause();
            objects.ctrl.play.removeClass('paused');
            state = 2;
        }

    };

    $.fn.trollPlayer = function(method){
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод "' +  method + '" не найден в плагине jQuery.trollPlayer' );
        }
    };
})(jQuery);