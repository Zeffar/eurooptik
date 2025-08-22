import { documentToHtmlString } from 'https://cdn.jsdelivr.net/npm/@contentful/rich-text-html-renderer/+esm';
import { fetchSpecializationsData } from './contentful-service.js';

async function main() {
    const section = document.getElementById('new-specializations');
    if (!section) return;

    const { categories, specializations } = await fetchSpecializationsData();
    if (!categories.length || !specializations.length) {
        console.warn("No specializations data found. Section will not be rendered.");
        section.style.display = 'none';
        return;
    }

    renderCategories(categories);
    renderSpecializationCards(specializations);
    initializeInteractivity(categories, specializations);
}

function renderCategories(categories) {
    const container = document.querySelector('.specialization-category-buttons');
    if (!container) return;
    container.innerHTML = categories.map((cat, index) => `
        <button class="btn btn-round category-btn ${index === 0 ? 'active' : ''}" data-category="${cat.slug}">${cat.name}</button>
    `).join('');
}

function renderSpecializationCards(specializations) {
    const container = document.querySelector('.specialization-carousel-container');
    if (!container) return;
    container.innerHTML = specializations.map(spec => `
        <div class="specialization-card" data-specialization="${spec.slug}" data-category="${spec.categorySlug}">
            <div class="card-image-container"><img src="${spec.cardImage}" alt="${spec.cardTitle}"></div>
            <h4 class="card-title">${spec.cardTitle}</h4>
        </div>
    `).join('');
}

function initializeInteractivity(categories, specializations) {
    const categoryButtons = document.querySelectorAll('.specialization-category-buttons .category-btn');
    const allSpecializationCards = document.querySelectorAll('.specialization-carousel-container .specialization-card');
    const articleContainer = document.querySelector('.specialization-article-container');
    const articleTitle = articleContainer.querySelector('.article-title');
    const articleText = articleContainer.querySelector('.article-text');
    const articleImage = articleContainer.querySelector('.article-image');

    const testimonialContainer = articleContainer.querySelector('.article-testimonial');
    const testimonialContentWrapper = testimonialContainer.querySelector('.testimonial-content-wrapper');
    const authorImage = testimonialContainer.querySelector('.testimonial-author-image img');
    const testimonialLink = testimonialContainer.querySelector('.testimonial-scroll-link');
    const testimonialQuote = testimonialContainer.querySelector('.testimonial-quote');
    const blogLink = testimonialContainer.querySelector('.blog-link');

    const carouselContainer = document.querySelector('.specialization-carousel-container');
    const prevBtn = document.querySelector('.specialization-carousel-wrapper .prev-card');
    const nextBtn = document.querySelector('.specialization-carousel-wrapper .next-card');

    let globalIndex = 0;
    let visibleCards = 3;

    function updateVisibleCardsCount() {
        if (window.innerWidth <= 767) visibleCards = 1;
        else if (window.innerWidth <= 991) visibleCards = 2;
        else visibleCards = 3;
    }

    function updateCarousel() {
        if (allSpecializationCards.length === 0) return;
        const cardWidth = allSpecializationCards[0].offsetWidth;
        const gap = parseFloat(window.getComputedStyle(carouselContainer).getPropertyValue('gap')) || 0;
        const totalCardWidth = cardWidth + gap;
        carouselContainer.style.transform = `translateX(-${globalIndex * totalCardWidth}px)`;
        prevBtn.disabled = globalIndex === 0;
        nextBtn.disabled = globalIndex >= allSpecializationCards.length - visibleCards;
        syncCategoryButtons();
    }
    
    function syncCategoryButtons() {
        if (allSpecializationCards.length === 0) return;
        const currentCard = allSpecializationCards[globalIndex];
        if (!currentCard) return;
        const activeCategorySlug = currentCard.dataset.category;
        categoryButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === activeCategorySlug);
        });
    }

    nextBtn.addEventListener('click', () => {
        const maxIndex = allSpecializationCards.length - visibleCards;
        if (globalIndex < maxIndex) {
            globalIndex = Math.min(globalIndex + visibleCards, maxIndex);
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (globalIndex > 0) {
            globalIndex = Math.max(0, globalIndex - visibleCards);
            updateCarousel();
        }
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.dataset.category;
            const firstCardOfCategory = Array.from(allSpecializationCards).find(card => card.dataset.category === targetCategory);
            const targetIndex = Array.from(allSpecializationCards).indexOf(firstCardOfCategory);
            if (targetIndex !== -1) {
                globalIndex = targetIndex;
                updateCarousel();
            }
        });
    });
    
    allSpecializationCards.forEach(card => {
        card.addEventListener('click', function() {
            allSpecializationCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const specializationSlug = this.dataset.specialization;
            const articleData = specializations.find(spec => spec.slug === specializationSlug);

            if (articleData && articleData.articleDescription) {
                articleTitle.textContent = articleData.articleTitle;
                articleText.innerHTML = documentToHtmlString(articleData.articleDescription);
                articleImage.innerHTML = `<img src="${articleData.articleImage}" alt="${articleData.articleTitle}">`;

                if (articleData.testimonialId && articleData.testimonialQuote) {
                    testimonialQuote.textContent = `‘${articleData.testimonialQuote.substring(0, 120)}…’`;
                    testimonialLink.dataset.testimonialId = articleData.testimonialId;

                    if (articleData.testimonialAuthorImage) {
                        authorImage.src = articleData.testimonialAuthorImage;
                        authorImage.parentElement.style.display = 'block';
                    } else {
                        authorImage.parentElement.style.display = 'none';
                    }
                    testimonialContentWrapper.style.display = 'flex';
                } else {
                    testimonialContentWrapper.style.display = 'none'; 
                }

                if (articleData.blogSlug && articleData.blogCategorySlug) {
                    blogLink.dataset.articleSlug = articleData.blogSlug;
                    blogLink.dataset.categorySlug = articleData.blogCategorySlug;
                    blogLink.style.display = 'block';
                } else {
                    blogLink.style.display = 'none';
                }

                if (articleData.testimonialId || articleData.blogSlug) {
                    testimonialContainer.style.display = 'block';
                } else {
                    testimonialContainer.style.display = 'none';
                }
                
                showArticle();
            } else {
                hideArticle();
            }
        });
    });

    function showArticle() {
        articleContainer.style.display = 'block';
        setTimeout(() => articleContainer.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }

    function hideArticle() {
        articleContainer.style.display = 'none';
        allSpecializationCards.forEach(c => c.classList.remove('active'));
    }

    window.addEventListener('resize', () => {
        updateVisibleCardsCount();
        updateCarousel();
    });

    testimonialLink.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.dataset.testimonialId;
        const testimonialsSection = document.getElementById('testimoniale');
        if (targetId && testimonialsSection) {
            sessionStorage.setItem('scrollToTestimonial', targetId);
            testimonialsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.dispatchEvent(new CustomEvent('testimonialScroll', { detail: { id: targetId } }));
        }
    });

    blogLink.addEventListener('click', function(event) {
        event.preventDefault();
        const articleSlug = this.dataset.articleSlug;
        const categorySlug = this.dataset.categorySlug;
        const blogSection = document.getElementById('blog-section');

        if (articleSlug && categorySlug && blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.dispatchEvent(new CustomEvent('blogScroll', { 
                detail: { 
                    articleSlug: articleSlug,
                    categorySlug: categorySlug 
                } 
            }));
        }
    });

    updateVisibleCardsCount();
    updateCarousel();
}

document.addEventListener('DOMContentLoaded', main);