console.log('%c Proudly Crafted with ZiOn.', 'background: #222; color: #bada55');

/* ---------------------------------------------- /*
 * Preloader
 /* ---------------------------------------------- */
(function () {
    $(window).on('load', function () {
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    });

    $(document).ready(function () {

        /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
         /* ---------------------------------------------- */

        wow = new WOW({
            mobile: false
        });
        wow.init();


        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });

        /* ---------------------------------------------- /*
         * Location Pricing System
         /* ---------------------------------------------- */

        $('.location-btn').click(function () {
            var location = $(this).data('location');

            // Change active state of buttons
            $('.location-btn').removeClass('btn-d').addClass('btn-border-d');
            $(this).removeClass('btn-border-d').addClass('btn-d');

            // Hide the prompt when a location is selected
            $('.location-prompt').fadeOut();

            // Update all price values based on the selected location
            $('.price-value').each(function () {
                var price = $(this).data(location);
                $(this).text(price);
            });
        });

        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var homeSection = $('.home-section'),
            navbar = $('.navbar-custom'),
            navHeight = navbar.height(),
            worksgrid = $('#works-grid'),
            width = Math.max($(window).width(), window.innerWidth),
            mobileTest = false;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildHomeSection(homeSection);
        navbarAnimation(navbar, homeSection, navHeight);
        navbarSubmenu(width);
        hoverDropdown(width, mobileTest);

        $(window).resize(function () {
            var width = Math.max($(window).width(), window.innerWidth);
            buildHomeSection(homeSection);
            hoverDropdown(width, mobileTest);
        });

        $(window).scroll(function () {
            effectsHomeSection(homeSection, this);
            navbarAnimation(navbar, homeSection, navHeight);
        });

        /* ---------------------------------------------- /*
         * Set sections backgrounds
         /* ---------------------------------------------- */

        var module = $('.home-section, .module, .module-small, .side-image');
        module.each(function (i) {
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */

        function buildHomeSection(homeSection) {
            if (homeSection.length > 0) {
                if (homeSection.hasClass('home-full-height')) {
                    homeSection.height($(window).height());
                } else {
                    homeSection.height($(window).height() * 0.85);
                }
            }
        }


        /* ---------------------------------------------- /*
         * Home section effects
         /* ---------------------------------------------- */

        function effectsHomeSection(homeSection, scrollTopp) {
            if (homeSection.length > 0) {
                var homeSHeight = homeSection.height();
                var topScroll = $(document).scrollTop();
                if ((homeSection.hasClass('home-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    homeSection.css('top', (topScroll * 0.55));
                }
                if (homeSection.hasClass('home-fade') && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    var caption = $('.caption-content');
                    caption.css('opacity', (1 - topScroll / homeSection.height() * 1));
                }
            }
        }

        /* ---------------------------------------------- /*
         * Intro slider setup
         /* ---------------------------------------------- */

        if ($('.hero-slider').length > 0) {
            $('.hero-slider').flexslider({
                animation: "fade",
                animationSpeed: 1000,
                animationLoop: true,
                prevText: '',
                nextText: '',
                before: function (slider) {
                    $('.titan-caption').fadeOut().animate({ top: '-80px' }, { queue: false, easing: 'swing', duration: 700 });
                    slider.slides.eq(slider.currentSlide).delay(500);
                    slider.slides.eq(slider.animatingTo).delay(500);
                },
                after: function (slider) {
                    $('.titan-caption').fadeIn().animate({ top: '0' }, { queue: false, easing: 'swing', duration: 700 });
                },
                useCSS: true
            });
        }


        /* ---------------------------------------------- /*
         * Rotate
         /* ---------------------------------------------- */

        $(".rotate").textrotator({
            animation: "dissolve",
            separator: "|",
            speed: 3000
        });


        /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

        function navbarAnimation(navbar, homeSection, navHeight) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && homeSection.length > 0) {
                if (topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }

        /* ---------------------------------------------- /*
         * Navbar submenu
         /* ---------------------------------------------- */

        function navbarSubmenu(width) {
            if (width > 767) {
                $('.navbar-custom .navbar-nav > li.dropdown').hover(function () {
                    var MenuLeftOffset = $('.dropdown-menu', $(this)).offset().left;
                    var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
                    if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                        $(this).children('.dropdown-menu').addClass('leftauto');
                    } else {
                        $(this).children('.dropdown-menu').removeClass('leftauto');
                    }
                    if ($('.dropdown', $(this)).length > 0) {
                        var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
                        if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                            $(this).children('.dropdown-menu').addClass('left-side');
                        } else {
                            $(this).children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desctop
         /* ---------------------------------------------- */

        function hoverDropdown(width, mobileTest) {
            if ((width > 767) && (mobileTest !== true)) {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function () {
                    var $this = $(this);
                    setTimeoutConst = setTimeout(function () {
                        $this.addClass('open');
                        $this.find('.dropdown-toggle').addClass('disabled');
                    }, delay);
                },
                    function () {
                        clearTimeout(setTimeoutConst);
                        $(this).removeClass('open');
                        $(this).find('.dropdown-toggle').removeClass('disabled');
                    });
            } else {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
                $('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).parent().siblings().removeClass('open');
                    $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    $(this).parent().toggleClass('open');
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar collapse on click
         /* ---------------------------------------------- */

        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });


        /* ---------------------------------------------- /*
         * Video popup, Gallery
         /* ---------------------------------------------- */

        $('.video-pop-up').magnificPopup({
            type: 'iframe'
        });

        $(".gallery-item").magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                titleSrc: 'title',
                tError: 'The image could not be loaded.'
            }
        });

        /* ---------------------------------------------- /*
         * Portfolio
         /* ---------------------------------------------- */

        var worksgrid = $('#works-grid'),
            worksgrid_copy = $('#works-grid-copy'), // Added for the new grid
            worksgrid_mode;

        if (worksgrid.hasClass('works-grid-masonry')) {
            worksgrid_mode = 'masonry';
        } else {
            worksgrid_mode = 'fitRows';
        }

        worksgrid.imagesLoaded(function () {
            worksgrid.isotope({
                layoutMode: worksgrid_mode,
                itemSelector: '.work-item'
            });
        });

        // Initialize Isotope for the copied grid
        if (worksgrid_copy.length) {
            worksgrid_copy.imagesLoaded(function () {
                worksgrid_copy.isotope({
                    layoutMode: worksgrid_mode, // Assuming same layout mode
                    itemSelector: '.work-item'
                });
            });
        }

        $('#filters a').click(function () {
            $('#filters .current').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');

            worksgrid.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            return false;
        });

        // Event listeners for the copied filters
        $('#filters-copy a').click(function (e) {
            e.preventDefault(); // Prevent default anchor behavior
            var $this = $(this);
            var selector = $this.attr('data-filter');
            var $arrow = $this.find('.arrow-indicator'); // Get the arrow indicator

            if ($this.hasClass('current')) {
                // Clicked on the currently active button, toggle the grid display
                worksgrid_copy.slideToggle(300, function () {
                    // Toggle arrow direction based on grid visibility
                    if (worksgrid_copy.is(':visible')) {
                        $this.addClass('grid-open');
                    } else {
                        $this.removeClass('grid-open');
                    }
                });
            } else {
                // Clicked on a new filter button or the first click
                $('#filters-copy .current').removeClass('current').removeClass('grid-open'); // Also remove grid-open from previously active
                $this.addClass('current').addClass('grid-open'); // Add grid-open to the new active button

                // Ensure the grid is visible, then filter
                worksgrid_copy.slideDown(300, function () { // 300ms animation
                    worksgrid_copy.isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 750,
                            easing: 'linear',
                            queue: false
                        }
                    });
                    worksgrid_copy.isotope('layout'); // Force a re-layout after filtering
                });
            }
        });

        // Initialize Magnific Popup for portfolio items
        $('.work-item').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: false
            },
            image: {
                titleSrc: function (item) {
                    return item.el.attr('data-caption');
                }
            }
        });

        /* ---------------------------------------------- /*
         * Set minimum date for appointment form
         /* ---------------------------------------------- */

        // Set min date on the date picker to today
        if ($("#date").length) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            $("#date").attr("min", today);
        }

        /* ---------------------------------------------- /*
         * Appointment Form Processing
         /* ---------------------------------------------- */

        $("#appointmentForm").submit(function (e) {
            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $formResponse = $('#appointmentFormResponse'),
                $submitButton = $("#appointmentSubmit"),
                submitText = $submitButton.text();

            $submitButton.text("Se trimite...");

            // Simulate AJAX call for demo purposes
            setTimeout(function () {
                $formResponse.html('<div class="alert alert-success">Programarea dumneavoastră a fost înregistrată cu succes! Veți primi un email de confirmare în curând.</div>');
                $submitButton.text(submitText);
                $('#appointmentForm')[0].reset();
            }, 1500);

            return false;
        });

        // Clear error state when field is focused
        $('#appointmentForm').find('input, select, textarea').on('focus', function () {
            $(this).removeClass('input-error');
        });

        /* ---------------------------------------------- /*
         * Funfact Count-up
         /* ---------------------------------------------- */

        $('.count-item').each(function (i) {
            $(this).appear(function () {
                var number = $(this).find('.count-to').data('countto');
                $(this).find('.count-to').countTo({ from: 0, to: number, speed: 1200, refreshInterval: 30 });
            });
        });

        /* ---------------------------------------------- /*
         * Youtube video background
         /* ---------------------------------------------- */

        $(function () {
            $(".video-player").mb_YTPlayer();
        });

        /* ---------------------------------------------- /*
         * Scroll Animation
         /* ---------------------------------------------- */

        $('.section-scroll').bind('click', function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });

        /*===============================================================
         Working Contact Form
         ================================================================*/

        $("#contactForm").submit(function (e) {
            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $cfResponse = $('#contactFormResponse'),
                $cfsubmit = $("#cfsubmit"),
                cfsubmitText = $cfsubmit.text();

            $cfsubmit.text("Se trimite...");

            // Simulate AJAX call for demo purposes
            setTimeout(function () {
                $cfResponse.html('<div class="alert alert-success">Mesajul dumneavoastră a fost trimis cu succes! Vă vom contacta în curând.</div>');
                $cfsubmit.text(cfsubmitText);
                $('#contactForm')[0].reset();
            }, 1500);

            return false;
        });

        /* ---------------------------------------------- /*
         * Address Cards Navigation
         /* ---------------------------------------------- */
        const initAddressCardsNav = function () {
            const cardContainer = document.getElementById('addressCards');
            const prevBtn = document.querySelector('.addresses-wrapper .prev-arrow');
            const nextBtn = document.querySelector('.addresses-wrapper .next-arrow');

            if (!cardContainer || !prevBtn || !nextBtn) {
                console.error('Missing required elements for address cards navigation');
                return;
            }

            const scrollCard = () => {
                if (!cardContainer.firstElementChild) return 0;
                const cardWidth = cardContainer.firstElementChild.offsetWidth;
                return cardWidth + 20; // Add gap
            };

            prevBtn.addEventListener('click', function () {
                const scrollAmount = -scrollCard();
                cardContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', function () {
                const scrollAmount = scrollCard();
                cardContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Update arrow states
            const updateArrows = () => {
                const isAtStart = cardContainer.scrollLeft <= 0;
                const isAtEnd = cardContainer.scrollLeft >= (cardContainer.scrollWidth - cardContainer.clientWidth - 1);

                prevBtn.style.opacity = isAtStart ? '0.5' : '1';
                prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

                nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
                nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
            };

            // Listen for scroll events to update arrows
            cardContainer.addEventListener('scroll', updateArrows);

            // Initial arrow state
            updateArrows();

            // Also update arrows when window resizes
            window.addEventListener('resize', updateArrows);
        };

        // Initialize address cards navigation
        initAddressCardsNav();
    });
})(jQuery);


