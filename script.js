document.addEventListener('DOMContentLoaded', () => {

    // 1. Hover Glow Effect for Cards
    const cards = document.querySelectorAll('.card');

    document.getElementById('work').addEventListener('mousemove', handleGlow);
    document.getElementById('about').addEventListener('mousemove', handleGlow);

    function handleGlow(e) {
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables for the radial gradient center
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    }

    // 2. Scroll Reveal Animation using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is in view
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));
});
