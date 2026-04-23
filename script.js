document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hover Glow Effect for Glass Cards ---
    const cards = document.querySelectorAll('.card');

    document.addEventListener('mousemove', handleGlow);

    function handleGlow(e) {
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Updates CSS variables for the spotlight gradient
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    }

    // --- 2. Scroll Reveal Animation ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));
});
