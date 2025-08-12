document.addEventListener('DOMContentLoaded', function() {
    const sponsorsContainer = document.querySelector('.sponsors-cards-container');
    if (!sponsorsContainer) return;

    const sponsorCards = sponsorsContainer.querySelectorAll('.sponsor-card');
    const sponsorsViewport = document.querySelector('.sponsors-carousel-viewport');

    // Target the single set of navigation buttons
    const prevSponsorBtn = document.getElementById('prev-sponsor');
    const nextSponsorBtn = document.getElementById('next-sponsor');

    let currentSponsorIndex = 0;
    const cardsPerView = 1; // Always show one card at a time

    function updateSponsorsCarousel() {
        if (sponsorCards.length === 0) {
            if (prevSponsorBtn) prevSponsorBtn.disabled = true;
            if (nextSponsorBtn) nextSponsorBtn.disabled = true;
            return;
        }

        // Calculate the width of a single card within the current view
        const cardWidth = sponsorCards[0].offsetWidth; 
        const offset = -currentSponsorIndex * cardWidth;
        sponsorsContainer.style.transform = 'translateX(' + offset + 'px)';

        const isPrevDisabled = (currentSponsorIndex === 0);
        // For two cards and cardsPerView=1, next is disabled when current index is 1 (last card)
        const isNextDisabled = (currentSponsorIndex >= sponsorCards.length - cardsPerView);

        if (prevSponsorBtn) prevSponsorBtn.disabled = isPrevDisabled;
        if (nextSponsorBtn) nextSponsorBtn.disabled = isNextDisabled;
    }

    function navigateSponsors(direction) {
        if (direction === 'prev') {
            if (currentSponsorIndex > 0) {
                currentSponsorIndex--;
                updateSponsorsCarousel();
            }
        } else if (direction === 'next') {
            if (currentSponsorIndex < sponsorCards.length - cardsPerView) {
                currentSponsorIndex++;
                updateSponsorsCarousel();
            }
        }
    }

    // Add event listeners for navigation buttons
    if (prevSponsorBtn) {
        prevSponsorBtn.addEventListener('click', () => navigateSponsors('prev'));
    }
    if (nextSponsorBtn) {
        nextSponsorBtn.addEventListener('click', () => navigateSponsors('next'));
    }

    // Swipe support (still on the viewport element)
    let startX = null;
    sponsorsViewport.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    sponsorsViewport.addEventListener('touchend', (e) => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        let diffX = endX - startX;

        if (diffX > 50) { // Swiped right
            navigateSponsors('prev');
        } else if (diffX < -50) { // Swiped left
            navigateSponsors('next');
        }
        startX = null;
    });

    // Initialize and update on resize
    window.addEventListener('resize', updateSponsorsCarousel); 
    updateSponsorsCarousel(); // Initial call
});