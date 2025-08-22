import { fetchPricingData } from './contentful-service.js';

function initMobileCarousel(pricingSection) {
    const container = pricingSection.querySelector('.pricing-cards-container');
    const prevBtn = pricingSection.querySelector('.pricing-prev');
    const nextBtn = pricingSection.querySelector('.pricing-next');
    const viewport = pricingSection.querySelector('.pricing-carousel-viewport');

    if (!container || !prevBtn || !nextBtn || !viewport) {
        return;
    }

    let currentIndex = 0;
    const totalCards = container.querySelectorAll('.pricing-card').length;

    const updateCarousel = () => {
        if (window.innerWidth >= 992) {
            container.style.transform = 'none';
            return;
        }
        const offset = -currentIndex * 100;
        container.style.transform = `translateX(${offset}%)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalCards - 1;
    };

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    let startX = null;
    viewport.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;
        if (diffX > 50) prevBtn.click();
        else if (diffX < -50) nextBtn.click();
        startX = null;
    });

    updateCarousel();
    window.addEventListener('resize', updateCarousel);
}

async function initPricingLogic(pricingSection) {
    const locationButtons = pricingSection.querySelectorAll('.location-btn');
    const priceValueElements = pricingSection.querySelectorAll('.price-value');
    let pricingData = {};

    const updatePrices = (locationSlug) => {
        const pricesForLocation = pricingData[locationSlug];
        priceValueElements.forEach(el => {
            const consultationType = el.dataset.consultationType;

            if (locationSlug === 'clear') {
                el.textContent = '- RON'; 
            } else if (pricesForLocation && typeof pricesForLocation[consultationType] !== 'undefined') {
                el.textContent = 'RON ' + pricesForLocation[consultationType];
            } else {
                el.textContent = 'N/A';
            }
        });
    };

    try {
        pricingData = await fetchPricingData();
        if (Object.keys(pricingData).length === 0) {
            throw new Error("No pricing data was loaded from Contentful.");
        }

        locationButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                locationButtons.forEach(btn => btn.classList.remove('active'));
                const currentButton = event.currentTarget;
                currentButton.classList.add('active');
                updatePrices(currentButton.dataset.location);
            });
        });

    } catch (error) {
        console.error("Failed to initialize pricing section:", error);
    }
}

function main() {
    const pricingSection = document.getElementById('pricing');
    if (!pricingSection) return;
    
    initPricingLogic(pricingSection);
    initMobileCarousel(pricingSection);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}