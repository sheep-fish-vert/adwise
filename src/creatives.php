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
    case 2:
    case 4:
    case 5:
        $resp = '<div class="item"><div class="item-link-wrap"><a href="images/creativ01big.jpg"  data-fancybox-group="gal" class="item-link fancy-gallery"><img src="images/land01.jpg" alt=""><span class="hover"></span></a></div></div>';
        break;
    case 3:
        $resp = '<div class="item-preroll"><a href="#" data-src="images/SampleVideo_1280x720_5mb.mp4" data-poster="images/pre-rol04.jpg"><img src="images/pre-rol04.jpg" alt=""><div class="title-item">Parimatch - Promo clip</div></a></div>';
        break;

    case 6:
        $resp = ' <div class="item-audio"><a href="#" data-src="images/audio.mp3"><img src="images/au01.jpg" alt=""></a></div>';
        break;
    case 7:
        $resp = '<div class="item-voiceover"><a href="#" data-start="20"  data-stop="33" data-srcvideo="images/tyran_s3_e1_2.mp4" data-poster="images/pre-rol01.jpg"><img src="images/voice01.jpg" alt=""><div class="title-item">Got a problems with Joycasino</div></a></div>';

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
