// assets/js/new-specializations.js

document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.specialization-category-buttons .category-btn');
  const allSpecializationCards = document.querySelectorAll('.specialization-carousel-container .specialization-card');
  const articleContainer = document.querySelector('.specialization-article-container');
  const articleTitle = articleContainer.querySelector('.article-title');
  const articleText = articleContainer.querySelector('.article-text');
  const articleImage = articleContainer.querySelector('.article-image');

  const carouselContainer = document.querySelector('.specialization-carousel-container');
  const carouselWrapper = document.querySelector('.specialization-carousel-wrapper');
  const prevBtn = document.querySelector('.specialization-carousel-wrapper .prev-card');
  const nextBtn = document.querySelector('.specialization-carousel-wrapper .next-card');

  let currentCarouselIndex = 0; // Index within the *active category*
  let visibleCardsCount = 3; // Default for desktop
  let activeCategory = 'surgical'; // Initial active category
  const categoryOrder = ['surgical', 'pediatric']; // Explicit order of categories

  // Define article content for each specialization
  const articles = {
    cataracta: {
      title: "Operații de Cataractă: Redobândirea Vederii Clare",
      text: "Cataracta este o afecțiune oculară comună, caracterizată prin opacifierea cristalinului natural al ochiului, ducând la vedere încețoșată și dificultăți în perceperea culorilor. La Eurooptik, realizăm operații de cataractă utilizând tehnici moderne de facoemulsificare, o metodă minim invazivă care permite îndepărtarea cristalinului opacifiat și înlocuirea acestuia cu un cristalin artificial (lentilă intraoculară) personalizat. Intervenția este rapidă, sigură și oferă o recuperare rapidă, redând pacienților o vedere clară și o calitate a vieții îmbunătățite. Folosim lentile de ultimă generație, inclusiv monofocale, multifocale și torice, adaptate nevoilor individuale ale fiecărui pacient.",
      image: "assets/images/specializations/cataracta-article.jpg" // Placeholder image
    },
    glaucom: {
      title: "Glaucomul: Diagnostic și Tratament Avansat",
      text: "Glaucomul este o boală progresivă a nervului optic, adesea asociată cu o presiune intraoculară crescută, care poate duce la pierderea ireversibilă a vederii dacă nu este diagnosticată și tratată la timp. Clinica Eurooptik oferă servicii complete de diagnosticare a glaucomului, inclusiv tomografie în coerență optică (OCT) a nervului optic și câmp vizual, precum și opțiuni de tratament variate: de la picături oculare și terapie laser (trabeculoplastie selectivă laser - SLT) până la intervenții chirurgicale complexe, cum ar fi trabeculectomia sau implantarea de valve de drenaj. Scopul nostru este de a încetini progresia bolii și de a menține vederea pacienților.",
      image: "assets/images/specializations/glaucom-article.jpg" // Placeholder image
    },
    laser: {
      title: "Operații Laser: Corectarea Viciilor de Refracție",
      text: "Operațiile laser reprezintă o soluție eficientă pentru corectarea viciilor de refracție precum miopia, hipermetropia și astigmatismul, eliminând dependența de ochelari sau lentile de contact. La Eurooptik, utilizăm tehnologii laser de ultimă generație (ex. LASIK, PRK) pentru a remodela cu precizie corneea, îmbunătățind acuitatea vizuală. Procedurile sunt sigure, rapide și minim invazive, cu o perioadă de recuperare scurtă. Echipa noastră de specialiști evaluează cu atenție fiecare caz pentru a recomanda cea mai potrivită metodă, asigurând rezultate optime și o vedere excelentă.",
      image: "assets/images/specializations/laser-article.jpg" // Placeholder image
    },
    stellest: {
      title: "Lentile Stellest: Soluția Inovatoare pentru Controlul Miopiei la Copii",
      text: "Miopia la copii este o problemă globală în creștere, iar lentilele Stellest de la Essilor reprezintă o inovație majoră în controlul progresiei acesteia. Aceste lentile speciale încetinesc alungirea globului ocular, principala cauză a agravării miopiei, oferind în același timp o corecție vizuală clară. La Eurooptik, recomandăm și adaptăm lentile Stellest pentru a proteja vederea copiilor pe termen lung, reducând riscul de complicații asociate miopiei puternice la vârsta adultă. Este o soluție confortabilă și eficientă pentru viitorul ochilor copiilor dumneavoastră.",
      image: "assets/images/specializations/stellest-article.jpg" // Placeholder image
    },
    plusoptix: {
      title: "PlusoptiX: Screening Vizual Rapid și Precis pentru Copii",
      text: "Detectarea precoce a problemelor de vedere la copii este crucială pentru un tratament eficient. Cu aparatul PlusoptiX, oferim un screening vizual rapid, non-invaziv și extrem de precis, ideal pentru bebeluși și copii mici. Acest dispozitiv portabil permite măsurarea automată a viciilor de refracție, detectarea strabismului și a altor anomalii oculare de la o distanță sigură, fără contact direct cu ochiul. Rezultatele sunt obținute în câteva secunde, facilitând identificarea timpurie a afecțiunilor care, netratate, pot duce la ambliopie (ochi leneș).",
      image: "assets/images/specializations/plusoptix-article.jpg" // Placeholder image
    },
    ortokeratologie: {
      title: "Ortokeratologie: Corecția Vederii Fără Ochelari sau Operație",
      text: "Ortokeratologia (Orto-K) este o metodă non-chirurgicală de corectare temporară a miopiei și astigmatismului, prin purtarea unor lentile de contact rigide, permeabile la gaze, pe timpul nopții. Aceste lentile remodelează ușor corneea în timpul somnului, oferind o vedere clară pe parcursul zilei, fără a fi nevoie de ochelari sau lentile de contact. Orto-K este o opțiune excelentă pentru copii și adolescenți, contribuind la încetinirea progresiei miopiei, dar și pentru adulții activi care doresc libertate vizuală. La Eurooptik, efectuăm evaluări detaliate și adaptăm lentile Orto-K personalizate pentru fiecare pacient.",
      image: "assets/images/specializations/ortokeratologie-article.jpg" // Placeholder image
    }
  };

  // Helper function to get currently active cards based on category
  function getActiveCards() {
    return Array.from(allSpecializationCards).filter(card => card.dataset.category === activeCategory);
  }

  // Updates the number of visible cards based on screen width
  function updateVisibleCardsCount() {
    if (window.innerWidth <= 767) {
      visibleCardsCount = 1;
    } else if (window.innerWidth <= 991) {
      visibleCardsCount = 2;
    } else {
      visibleCardsCount = 3;
    }
  }

  // Calculates the total offset needed to bring the currentCarouselIndex of the active category into view
  function calculateTransformOffset() {
    const activeCards = getActiveCards();
    if (activeCards.length === 0) return 0;

    const firstActiveCard = activeCards[0];
    const cardWidth = firstActiveCard.offsetWidth;
    const gapStyle = window.getComputedStyle(carouselContainer).getPropertyValue('gap');
    const gap = parseFloat(gapStyle) || 0;
    const totalCardWidthWithGap = cardWidth + gap;

    // Find the index of the first card of the active category within the *allSpecializationCards* array
    const firstCardOfActiveCategory = Array.from(allSpecializationCards).find(card => card.dataset.category === activeCategory);
    const startIndexInAllCards = Array.from(allSpecializationCards).indexOf(firstCardOfActiveCategory);

    // Calculate the total offset: offset to the start of the active category + offset within the active category
    return (startIndexInAllCards + currentCarouselIndex) * totalCardWidthWithGap;
  }

  // Updates the carousel's transform property to show the correct cards
  function updateCarouselPosition() {
    const offset = calculateTransformOffset();
    carouselContainer.style.transform = `translateX(-${offset}px)`;
    updateCarouselNavigation();
  }

  // Updates the state (disabled/visible) of carousel navigation buttons
  function updateCarouselNavigation() {
    const activeCards = getActiveCards();
    const totalActiveCards = activeCards.length;
    const currentCategoryIndex = categoryOrder.indexOf(activeCategory);

    // Determine if previous button should be disabled
    prevBtn.disabled = currentCarouselIndex === 0 && currentCategoryIndex === 0;

    // Determine if next button should be disabled
    nextBtn.disabled = currentCarouselIndex >= totalActiveCards - visibleCardsCount && currentCategoryIndex === categoryOrder.length - 1;

    // Handle button visibility based on whether scrolling is needed within the current category
    // or if cross-category navigation is possible.
    // Buttons are always 'flex' unless truly no navigation is possible.
    if (totalActiveCards <= visibleCardsCount && categoryOrder.length === 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }

    // Handle mobile button positioning (move them below the carousel)
    if (window.innerWidth <= 767) {
      let mobileNavWrapper = carouselWrapper.querySelector('.specialization-carousel-nav-mobile');
      if (!mobileNavWrapper) {
        mobileNavWrapper = document.createElement('div');
        mobileNavWrapper.classList.add('specialization-carousel-nav-mobile');
        carouselWrapper.appendChild(mobileNavWrapper);
      }
      mobileNavWrapper.innerHTML = ''; // Clear existing buttons

      // Only add buttons to mobile wrapper if they are not disabled
      if (!prevBtn.disabled || !nextBtn.disabled) {
        mobileNavWrapper.appendChild(prevBtn);
        mobileNavWrapper.appendChild(nextBtn);
      } else {
        if (mobileNavWrapper.parentNode) mobileNavWrapper.remove();
      }
    } else {
      // Restore desktop positioning
      prevBtn.style.position = 'absolute';
      nextBtn.style.position = 'absolute';
      prevBtn.style.transform = 'translateY(-50%)';
      nextBtn.style.transform = 'translateY(-50%)';
      prevBtn.style.left = '0';
      nextBtn.style.right = '0';

      const mobileNavWrapper = carouselWrapper.querySelector('.specialization-carousel-nav-mobile');
      if (mobileNavWrapper) {
        if (mobileNavWrapper.parentNode) mobileNavWrapper.remove();
      }
      // Re-append buttons to the main carousel wrapper if they were moved
      if (!carouselWrapper.contains(prevBtn)) {
        carouselWrapper.appendChild(prevBtn);
      }
      if (!carouselWrapper.contains(nextBtn)) {
        carouselWrapper.appendChild(nextBtn);
      }
    }
  }

  // Function to filter and display cards based on category
  function filterCardsByCategory(category, targetIndex = 0) {
    activeCategory = category;
    currentCarouselIndex = targetIndex;

    updateVisibleCardsCount();

    // Update active state on category buttons
    categoryButtons.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update visibility/opacity of cards based on the active category
    // All cards remain in the DOM, but inactive ones are hidden via CSS opacity/pointer-events
    allSpecializationCards.forEach(card => {
      if (card.dataset.category === category) {
        card.classList.add('active-category-card'); // Use a class for styling (opacity, transform)
      } else {
        card.classList.remove('active-category-card');
      }
      card.classList.remove('active'); // Deselect any active card when category changes
    });

    hideArticle(); // Hide article when category changes

    // Update carousel position. This will now trigger a smooth slide if transition is enabled.
    updateCarouselPosition();
  }

  // Event listener for the "Previous" carousel button
  prevBtn.addEventListener('click', () => {
    const activeCards = getActiveCards();
    if (currentCarouselIndex > 0) {
      currentCarouselIndex--;
      updateCarouselPosition(); // This will use the CSS transition
    } else {
      // If at the beginning of the current category, try to go to the previous category
      const currentCategoryIndex = categoryOrder.indexOf(activeCategory);
      if (currentCategoryIndex > 0) {
        const prevCategory = categoryOrder[currentCategoryIndex - 1];
        // Calculate the last possible index for the previous category
        const prevCategoryCards = Array.from(allSpecializationCards).filter(card => card.dataset.category === prevCategory);
        const lastIndex = Math.max(0, prevCategoryCards.length - visibleCardsCount);
        filterCardsByCategory(prevCategory, lastIndex); // This will now slide smoothly
      }
    }
  });

  // Event listener for the "Next" carousel button
  nextBtn.addEventListener('click', () => {
    const activeCards = getActiveCards();
    if (currentCarouselIndex < activeCards.length - visibleCardsCount) {
      currentCarouselIndex++;
      updateCarouselPosition(); // This will use the CSS transition
    } else {
      // If at the end of the current category, try to go to the next category
      const currentCategoryIndex = categoryOrder.indexOf(activeCategory);
      if (currentCategoryIndex < categoryOrder.length - 1) {
        const nextCategory = categoryOrder[currentCategoryIndex + 1];
        filterCardsByCategory(nextCategory, 0); // This will now slide smoothly
      }
    }
  });

  // Event listeners for the main category filter buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterCardsByCategory(this.dataset.category, 0); // Always start from index 0 when category button is clicked
    });
  });

  // Event listeners for individual specialization cards
  allSpecializationCards.forEach(card => {
    card.addEventListener('click', function() {
      // Deselect all cards first
      allSpecializationCards.forEach(c => c.classList.remove('active'));
      // Select the clicked card
      this.classList.add('active');

      const specializationKey = this.dataset.specialization;
      const articleData = articles[specializationKey];

      if (articleData) {
        articleTitle.textContent = articleData.title;
        articleText.innerHTML = `<p>${articleData.text}</p>`; // Wrap text in p tag
        articleImage.innerHTML = `<img src="${articleData.image}" alt="${articleData.title}">`;
        showArticle();

        // Ensure the correct category button is highlighted
        categoryButtons.forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.category === this.dataset.category) {
            btn.classList.add('active');
          }
        });
      }
    });
  });

  // Shows the article container and scrolls it into view
  function showArticle() {
    articleContainer.style.display = 'block';
    // Small delay to allow display change before scrolling
    setTimeout(() => {
      articleContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  // Hides the article container and deselects any active card
  function hideArticle() {
    articleContainer.style.display = 'none';
    allSpecializationCards.forEach(c => c.classList.remove('active')); // Deselect any active card
  }

  // Initial setup when the page loads
  updateVisibleCardsCount(); // Determine initial visible cards count
  window.addEventListener('resize', () => {
    // Re-evaluate visible cards count and carousel position on window resize
    updateVisibleCardsCount();
    // When resizing, re-calculate position for the current category to adjust for new visibleCardsCount
    filterCardsByCategory(activeCategory, currentCarouselIndex);
  });

  // Trigger initial category filter to show "Clinica Chirurgicală" cards by default
  // and set the carousel to the beginning.
  filterCardsByCategory('surgical', 0);
});