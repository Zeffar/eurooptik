import { fetchTestimonialsFromContentful } from "./contentful-service.js";

const imageContainer = document.getElementById('image-container');
const contentWrapper = document.getElementById('testimonial-content-wrapper');

if (!imageContainer || !contentWrapper) {
    console.warn("One or both required containers for the Testimonials section are missing. The module will not run.");
} else {
    async function initializeTestimonials() {
        const testimonials = await fetchTestimonialsFromContentful();

        if (!testimonials || testimonials.length === 0) {
            imageContainer.innerHTML = '<p style="color: #fff;">No testimonials available.</p>';
            return;
        }

        imageContainer.innerHTML = '';
        contentWrapper.innerHTML = '';

        renderTestimonialHTML(testimonials);
        activateFirstTestimonial();
        setupEventListeners();
    }

    function renderTestimonialHTML(testimonials) {
        testimonials.forEach((testimonial, index) => {
            const imageNumber = index + 1;
            const extraClasses = (index >= 4) ? 'hidden-sm-down' : '';

            const imageTriggerHTML = `
                <div class="testimonial-grid-item img-${imageNumber} ${extraClasses}">
                    <a href="#" class="testimonial-trigger" data-target-id="${testimonial.id}" aria-label="View testimonial from ${testimonial.author}">
                        <img src="${testimonial.imageUrl}" alt="Photo of ${testimonial.author}" loading="lazy">
                    </a>
                </div>
            `;

            const textContentHTML = `
                <div class="testimonial-content" data-content-id="${testimonial.id}">
                    <blockquote class="testimonial-quote">"${testimonial.quote}"</blockquote>
                    <p class="testimonial-author">— ${testimonial.author}</p>
                </div>
            `;

            imageContainer.insertAdjacentHTML('beforeend', imageTriggerHTML);
            contentWrapper.insertAdjacentHTML('beforeend', textContentHTML);
        });
    }

    function activateFirstTestimonial() {
        const firstTrigger = imageContainer.querySelector('.testimonial-trigger');
        const firstContent = contentWrapper.querySelector('.testimonial-content');

        if (firstTrigger && firstContent) {
            firstTrigger.classList.add('active');
            firstContent.classList.add('active', 'visible');
        }
    }

    function setupEventListeners() {
        imageContainer.addEventListener('click', (event) => {
            const trigger = event.target.closest('.testimonial-trigger');
            if (!trigger) return;

            event.preventDefault();
            if (trigger.classList.contains('active')) return;

            imageContainer.querySelector('.testimonial-trigger.active')?.classList.remove('active');
            const activeContent = contentWrapper.querySelector('.testimonial-content.active');
            if (activeContent) {
                activeContent.classList.remove('visible');
                activeContent.addEventListener('transitionend', () => {
                    activeContent.classList.remove('active');
                }, { once: true });
            }

            const targetId = trigger.dataset.targetId;
            const newContent = contentWrapper.querySelector(`.testimonial-content[data-content-id="${targetId}"]`);
            trigger.classList.add('active');
            if (newContent) {
                newContent.classList.add('active');
                setTimeout(() => newContent.classList.add('visible'), 20);
            }
        });
    }

    initializeTestimonials();
}