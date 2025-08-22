import { fetchTestimonialsFromContentful } from "./contentful-service.js";

const imageContainer = document.getElementById('image-container');
const contentWrapper = document.getElementById('testimonial-content-wrapper');

if (!imageContainer || !contentWrapper) {
    console.warn("Container-ele necesare pentru secțiunea Testimoniale lipsesc. Modulul nu va rula.");
} else {
    async function initializeTestimonials() {
        const testimonials = await fetchTestimonialsFromContentful();

        if (!testimonials || testimonials.length === 0) {
            imageContainer.innerHTML = '<p style="color: #fff;">Nu există testimoniale disponibile.</p>';
            return;
        }

        imageContainer.innerHTML = '';
        contentWrapper.innerHTML = '';

        renderTestimonialHTML(testimonials);
        setupEventListeners();
        
        handleDeepLink();
    }

    function renderTestimonialHTML(testimonials) {
        testimonials.forEach((testimonial, index) => {
            const imageNumber = index + 1;
            const extraClasses = (index >= 4) ? 'hidden-sm-down' : '';

            const imageTriggerHTML = `
                <div class="testimonial-grid-item img-${imageNumber} ${extraClasses}">
                    <a href="#" class="testimonial-trigger" data-target-id="${testimonial.id}" aria-label="Vezi testimonialul de la ${testimonial.author}">
                        <img src="${testimonial.imageUrl}" alt="Poză ${testimonial.author}" loading="lazy">
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

    function setupEventListeners() {
        imageContainer.addEventListener('click', (event) => {
            const trigger = event.target.closest('.testimonial-trigger');
            if (!trigger) return;
            event.preventDefault();
            if (trigger.classList.contains('active')) return;
            activateTestimonialById(trigger.dataset.targetId);
        });
        
        window.addEventListener('testimonialScroll', (event) => {
            const { id } = event.detail;
            if (id) {
                activateTestimonialById(id);
            }
        });
    }
    
    function activateTestimonialById(targetId) {
        const activeTrigger = imageContainer.querySelector('.testimonial-trigger.active');

        if (activeTrigger && activeTrigger.dataset.targetId === targetId) { return; }

        const trigger = imageContainer.querySelector(`.testimonial-trigger[data-target-id="${targetId}"]`);
        if (!trigger) {
            console.warn(`Nu am găsit testimonialul cu ID-ul: ${targetId}`);
            return;
        }

        if (activeTrigger) activeTrigger.classList.remove('active');
        
        const activeContent = contentWrapper.querySelector('.testimonial-content.active');
        if (activeContent) {
            activeContent.classList.remove('visible');
            activeContent.addEventListener('transitionend', () => activeContent.classList.remove('active'), { once: true });
        }

        const newContent = contentWrapper.querySelector(`.testimonial-content[data-content-id="${targetId}"]`);
        trigger.classList.add('active');
        if (newContent) {
            newContent.classList.add('active');
            setTimeout(() => newContent.classList.add('visible'), 20);
        }
    }

    function handleDeepLink() {
        const targetId = sessionStorage.getItem('scrollToTestimonial');
        if (targetId) {
            activateTestimonialById(targetId);
            sessionStorage.removeItem('scrollToTestimonial');
        } else {
            const firstTrigger = imageContainer.querySelector('.testimonial-trigger');
            if (firstTrigger) {
                activateTestimonialById(firstTrigger.dataset.targetId);
            }
        }
    }

    initializeTestimonials();
}