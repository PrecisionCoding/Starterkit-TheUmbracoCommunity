;(function() {
    'use strict';

    $(document).ready(function() {

		// Navigation Scroll
        $(window).bind('scroll', function() {
            var navHeight = 150;
            if ($(window).scrollTop() > navHeight) {
                $('body').addClass('fixed');
            } else {
                $('body').removeClass('fixed');
            }
        });


		 $('.mobile-nav-handler').click(function(e){
            $('.top-nav').toggleClass('-open');
            $('#toggle-nav').toggleClass('active');
            $('body').toggleClass('nav-open');
        });

        $('.nav-link').click(function(e){
            $('.top-nav').removeClass('-open');
            $('#toggle-nav').removeClass('active');
        });
    });

}());
