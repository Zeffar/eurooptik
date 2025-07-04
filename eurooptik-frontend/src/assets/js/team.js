/**
 * Team section functionality
 */
(function ($) {
    "use strict";

    // Hide team members initially
    $('.team-member').css('opacity', 0);

    $(document).ready(function () {
        // Initialize team filtering with delay to allow page to render
        setTimeout(function () {
            initTeamFilter();

            // Make sure filter buttons also work on mobile
            ensureMobileFilterEvents();

            // Make all doctor cards equal height
            equalizeTeamCardHeights();
        }, 300);

        // On window resize, re-apply equal heights
        $(window).on('resize', function () {
            equalizeTeamCardHeights();
        });
    });

    /**
     * Initialize team filtering system with animations
     */
    function initTeamFilter() {
        // Initial animation for all team members - show simultaneously
        $('.team-member').css('opacity', 1).addClass('cardAppear');

        // Make sure "All" button is active by default
        $('.team-filter-btn[data-filter="all"]').addClass('active');
    }

    /**
     * Make sure filter buttons work on mobile touch events
     */
    function ensureMobileFilterEvents() {
        // Add touchstart handler for mobile devices
        $('.team-filter-btn').on('touchstart', function () {
            var filterValue = $(this).attr('data-filter');
            // Update button styling - only change active state, all buttons remain magenta
            $('.team-filter-btn').removeClass('active');
            $(this).addClass('active');

            // Remove any existing animation classes
            $('.team-member').removeClass('fadeIn');

            // Show/hide team members based on filter with animation - show simultaneously
            if (filterValue === 'all') {
                // Show all members simultaneously
                $('.team-member').show().addClass('cardAppear');
            } else {
                $('.team-member').hide();
                // Show filtered members simultaneously
                $('.team-member[data-category="' + filterValue + '"]').show().addClass('cardAppear');
            }

            return false;
        });
    }

    /**
     * Make all doctor cards the same height in each row
     */
    function equalizeTeamCardHeights() {
        // Reset heights first
        $('.team-item').css('height', 'auto');

        // Skip on mobile
        if ($(window).width() < 768) {
            return;
        }

        // Find tallest card in each row
        var maxHeight = 0;
        $('.team-item').each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });

        // Apply height to all cards
        if (maxHeight > 0) {
            $('.team-item').height(maxHeight);
        }
    }

})(jQuery);
