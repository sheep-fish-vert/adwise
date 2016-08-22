function changeFont(){
	$('.item-big-number').each(function(){
		var numOfLetters = $(this).html().length;
		console.log(numOfLetters);
		if(numOfLetters > 1){
			$(this).css('font-family', 'CoreSansCn');
		}
	})
	
}	


$(document).ready(function(){
	changeFont()
});

$(window).load(function(){

});

$(window).resize(function(){

});