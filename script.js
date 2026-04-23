document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hover Glow Effect for Cards ---
    const cards = document.querySelectorAll('.card');

    document.addEventListener('mousemove', handleGlow);

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

    // --- 2. Scroll Reveal Animation using Intersection Observer ---
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
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));

    // --- 3. Starry Night Canvas Animation ---
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');

    let width, height, stars = [];

    // Set canvas to full screen and update on resize
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Star Object Class
    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5; // Tiny, elegant stars
            this.alpha = Math.random(); // Starting opacity
            
            // Speed of twinkling
            this.alphaChange = (Math.random() * 0.008) + 0.002; 
            if (Math.random() > 0.5) this.alphaChange *= -1;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            this.alpha += this.alphaChange;
            // Reverse fading direction when reaching min or max opacity
            if (this.alpha <= 0.1 || this.alpha >= 0.8) {
                this.alphaChange *= -1;
            }
        }
    }

    // Generate initial stars (Adjust the 150 to add more or fewer stars)
    for (let i = 0; i < 150; i++) {
        stars.push(new Star());
    }

    // Animation Loop
    function animateStars() {
        // Clear the canvas every frame to redraw
        ctx.clearRect(0, 0, width, height);
        
        // Draw and update all stars
        stars.forEach(star => {
            star.draw();
            star.update();
        });

        requestAnimationFrame(animateStars);
    }

    // Start the starry animation
    animateStars();

});
