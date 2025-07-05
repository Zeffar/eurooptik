document.addEventListener('DOMContentLoaded', function() {
    const viewport = document.querySelector('.carousel-viewport');
    const container = document.querySelector('.location-cards-container');
    const nav = document.querySelector('.carousel-nav');
    const prevBtn = document.getElementById('prev-location');
    const nextBtn = document.getElementById('next-location');
    
    let isCarouselActive = false;
    let autoPlayInterval;
    let currentIndex = 0;
    
    function randomizeCards(containerElement) {
        const cards = Array.from(containerElement.children);
        cards.sort(() => Math.random() - 0.5);
        cards.forEach(card => containerElement.appendChild(card));
    }
    randomizeCards(container);

    let totalCards = 0; 
    
    function goToSlide(index) {
        if (!isCarouselActive) return;
        container.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        goToSlide(currentIndex);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    const handleNextClick = () => nextSlide();
    const handlePrevClick = () => prevSlide();
    const handleMouseEnter = () => stopAutoPlay();
    const handleMouseLeave = () => startAutoPlay();
    
    function setupCarousel() {
        if (isCarouselActive) return;
        
        totalCards = container.querySelectorAll('.location-card').length;
        nav.style.display = 'flex';

        nextBtn.addEventListener('click', handleNextClick);
        prevBtn.addEventListener('click', handlePrevClick);
        viewport.addEventListener('mouseenter', handleMouseEnter);
        viewport.addEventListener('mouseleave', handleMouseLeave);
        
        isCarouselActive = true;
        goToSlide(0); 
        // startAutoPlay();
    }

    function tearDownCarousel() {
        if (!isCarouselActive) return;

        stopAutoPlay();
        container.style.transform = 'translateX(0)';
        nav.style.display = 'none';
        
        nextBtn.removeEventListener('click', handleNextClick);
        prevBtn.removeEventListener('click', handlePrevClick);
        viewport.removeEventListener('mouseenter', handleMouseEnter);
        viewport.removeEventListener('mouseleave', handleMouseLeave);
        
        isCarouselActive = false;
    }

    function handleResize() {
        if (window.innerWidth <= 767) {
            setupCarousel();
        } else {
            tearDownCarousel();
        }
    }

    handleResize();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
});