(function() {
    const container = document.querySelector('.location-cards-container');
    if (!container) return; // Exit if the container doesn't exist

    const cards = container.querySelectorAll('.location-card');
    const prevBtn = document.getElementById('prev-location');
    const nextBtn = document.getElementById('next-location');
    const viewport = document.querySelector('.carousel-viewport');

    let currentIndex = 0;
    const totalCards = cards.length;
    const desktopBreakpoint = 992; // Must match CSS breakpoint

    function updateCarousel() {
        // Calculate offset based on current index
        const offset = -currentIndex * 100; // Each card takes 100% of the viewport width
        container.style.transform = 'translateX(' + offset + '%)';

        // Update button states
        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentIndex >= totalCards - 1);
    }

    function enableCarousel() {
        // Reset index when enabling
        currentIndex = 0;
        updateCarousel();

        // Add event listeners if not already added
        if (prevBtn && nextBtn && viewport && !prevBtn.hasAttribute('data-listener-added')) {
            prevBtn.addEventListener('click', handlePrevClick);
            nextBtn.addEventListener('click', handleNextClick);
            viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
            viewport.addEventListener('touchend', handleTouchEnd);
            prevBtn.setAttribute('data-listener-added', 'true');
        }
    }

    function disableCarousel() {
        // Reset transform and remove listeners
        container.style.transform = 'none'; // Remove any active transform
        if (prevBtn && nextBtn && viewport && prevBtn.hasAttribute('data-listener-added')) {
            prevBtn.removeEventListener('click', handlePrevClick);
            nextBtn.removeEventListener('click', handleNextClick);
            viewport.removeEventListener('touchstart', handleTouchStart);
            viewport.removeEventListener('touchend', handleTouchEnd);
            prevBtn.removeAttribute('data-listener-added');
        }
        // Ensure buttons are not disabled if they were hidden by JS (though CSS handles this now)
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
    }

    // Event handlers (to be able to remove them)
    function handlePrevClick() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function handleNextClick() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    let startX = null;
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        let diffX = endX - startX;

        if (diffX > 50) { // Swiped right
            handlePrevClick();
        } else if (diffX < -50) { // Swiped left
            handleNextClick();
        }
        startX = null;
    }

    let isCarouselActive = false; // Track current state to prevent redundant calls

    function checkScreenSize() {
        if (window.innerWidth < desktopBreakpoint) {
            if (!isCarouselActive) {
                enableCarousel();
                isCarouselActive = true;
            }
        } else {
            if (isCarouselActive) {
                disableCarousel();
                isCarouselActive = false;
            }
        }
    }

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);

    // Also call checkScreenSize on DOMContentLoaded to ensure it runs after elements are loaded
    document.addEventListener('DOMContentLoaded', checkScreenSize);

})();