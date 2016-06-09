;(function(){
	'use strict';

	$(document).ready(function(){
		$(window).bind('scroll', function() {
			var navHeight = 100;
			  if ($(window).scrollTop() > navHeight) {
				  $('body').addClass('fixed');
			  }
			  else {
				  $('body').removeClass('fixed');
			  }
		 });
	 });

}());
