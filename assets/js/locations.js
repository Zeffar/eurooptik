document.addEventListener('DOMContentLoaded', () => {

    const locationMappings = [
        { cardSelector: 'a[href*="CF3ZXSp"]', clinicId: 'clinica_bacau' }, 
        { cardSelector: 'a[href*="kF5B3ia"]', clinicId: 'cabinet_bacau' },
        { cardSelector: 'a[href*="5yqERUP"]', clinicId: 'cabinet_moinesti' }, 
        { cardSelector: 'a[href*="c5HFjzz"]', clinicId: 'cabinet_comanesti' }, 
        { cardSelector: 'a[href*="qbvbxa7"]', clinicId: 'cabinet_onesti' }         
    ];

    const programareSection = document.getElementById('programare-section');
    if (!programareSection) return;

    locationMappings.forEach(mapping => {
        const cardLink = document.querySelector(mapping.cardSelector);
        if (cardLink) {
            cardLink.removeAttribute('target');
            cardLink.removeAttribute('rel');
            cardLink.href = '#programare';

            cardLink.addEventListener('click', (event) => {
                event.preventDefault();
                
                const iframe = programareSection.querySelector('iframe');
                if (!iframe) return;

                const baseUrl = 'https://eurooptik.ro.programarionline.sophtha.com/';
                iframe.src = 'about:blank';
                
                setTimeout(() => {
                    iframe.src = `${baseUrl}#${mapping.clinicId}`;
                }, 10); 
                
                programareSection.style.display = 'block';
                programareSection.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
});