// Toggle Function
//$('.toggle').click(function(){
$(document).on("click",".toggle",function(){
		// Switches the Icon
		  $(this).children('i').toggleClass('fa-pencil');
		  // Switches the forms  
		  $('.form').animate({
		    height: "toggle",
		    'padding-top': 'toggle',
		    'padding-bottom': 'toggle',
		    opacity: "toggle"
		  }, "slow");
});
  
//});