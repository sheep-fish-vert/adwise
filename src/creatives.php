<?php
$page = $_REQUEST['page'];
$tab = $_REQUEST['tab'];
$count = $_REQUEST['count'];
$total = 27;

$left = intval($page)*intval($count);
$left = $total-$left;
$left = ($left>0?$left:0);
switch ($tab){
    case 1: 
        $resp = [
            [
                'fancyGroup'=>'gal',
                'img'=>'images/land01.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ],
            [
                'fancyGroup'=>'gal',
                'img'=>'images/land02.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ],
            [
                'fancyGroup'=>'gal',
                'img'=>'images/land03.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ]
        ];
        break;
    case 2:
        $resp = [
            [
                'fancyGroup'=>'gal1',
                'img'=>'images/brand02.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ],
            [
                'fancyGroup'=>'gal1',
                'img'=>'images/brand03.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ],
            [
                'fancyGroup'=>'gal1',
                'img'=>'images/brand04.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ]
        ];
        break;
    case 3:
        $resp = [
            [
                'video'=>'images/SampleVideo_1280x720_5mb.mp4',
                'poster'=>'images/pre-rol04.jpg',
                'img'=>'images/pre-rol04.jpg',
                'title'=>'Parimatch - Promo clip'
            ],
            [
                'video'=>'images/vid02.mp4',
                'poster'=>'images/silicondsad.jpg',
                'img'=>'images/pre-rol02.jpg',
                'title'=>'Parimatch - Promo clip'
            ],
            [
                'video'=>'images/videoo03.mp4',
                'poster'=>'images/pre-rol03.jpg',
                'img'=>'images/pre-rol03.jpg',
                'title'=>'Parimatch - Promo clip'
            ]

        ];
        break;
    case 4:
        $resp = [
            [
                'fancyGroup'=>'gal2',
                'img'=>'images/ban02.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ],
            [
                'fancyGroup'=>'gal2',
                'img'=>'images/ban03.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ],
            [
                'fancyGroup'=>'gal2',
                'img'=>'images/ban04.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ]
        ];
        break;
    case 5:
        $resp = [
            [
                'fancyGroup'=>'gal2',
                'img'=>'images/ban02.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ],
            [
                'fancyGroup'=>'gal2',
                'img'=>'images/ban03.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ],
            [
                'fancyGroup'=>'gal2',
                'img'=>'images/ban04.jpg',
                'imgBig'=>'images/creativ01big.jpg'
            ]
        ];
        break;
    case 6:
        $resp = [
            [
                'img'=>'images/au01.jpg',
                'audio'=>'images/audio.mp3'
            ],
            [
                'img'=>'images/au02.jpg',
                'audio'=>'images/audio.mp3'
            ],
            [
                'img'=>'images/au03.jpg',
                'audio'=>'images/audio.mp3'
            ]
        ];
        break;
    case 7:
        $resp = [
            [
                'startTime'=>'20',
                'stopTime'=>'33',
                'video'=>'images/tyran_s3_e1_2.mp4',
                'poster'=>'images/pre-rol01.jpg',
                'img'=>'images/voice01.jpg',
                'title'=>'Got a problems with Joycasino'
            ],
            [
                'startTime'=>'35',
                'stopTime'=>'46',
                'video'=>'images/tyran_s3_e1_1.mp4',
                'poster'=>'images/pre-rol01.jpg',
                'img'=>'images/voice02.jpg',
                'title'=>'Got a problems with Joycasino'
            ],
            [
                'startTime'=>'20',
                'stopTime'=>'33',
                'video'=>'images/videoo03.mp4',
                'poster'=>'images/pre-rol01.jpg',
                'img'=>'images/voice01.jpg',
                'title'=>'Got a problems with Joycasino'
            ]
        ];
        break;
    default;
        $resp=[];
}
echo json_encode([
   'items'=>$resp,
    'meta'=>[
        'count_left'=>$left, 'page'=>$page, $tab, $count
    ]
]);
