function massonryImage(){  // in news page
    $('.news-images-massonry').masonry({
      columnWidth: '.item-sizer',
      itemSelector: '.item',
      percentPosition: true,
      fitWidth: true,
      isFitWidth: true
    });
}


$(document).ready(function(){

});

$(window).load(function(){
    massonryImage();
});

$(window).resize(function(){

});
