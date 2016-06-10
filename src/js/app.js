;
(function() {
    'use strict';

    $(document).ready(function() {

        // Navigation Scroll
        $(window).bind('scroll', function() {
            var navHeight = 150;
            if ($(window).scrollTop() > navHeight) {
                $('.header').addClass('header--fixed');
            } else {
                $('.header').removeClass('header--fixed');
            }
        });


        $('.mobile-nav-handler').click(function(e) {
            $('.mobile-nav').toggleClass('mobile-nav--open');
            $('.header').toggleClass('header--hide');
            $('body').toggleClass('no-scroll');
            $('#toggle-nav').toggleClass('active');
        });

        $('.nav-link').click(function(e) {
            $('.mobile-nav').removeClass('mobile-nav--open');
            $('.header').removeClass('header--hide');
            $('body').removeClass('no-scroll');
            $('#toggle-nav').removeClass('active');
        });
    });

}());
