document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hover Glow Effect for Cards ---
    const cards = document.querySelectorAll('.card');

    document.addEventListener('mousemove', handleGlow);

    function handleGlow(e) {
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

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

    // --- 3. Night Clouds & Stars Canvas Animation ---
    const canvas = document.getElementById('sky-canvas');
    const ctx = canvas.getContext('2d');

    let width, height, stars = [], clouds = [];

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Distant Star Class
    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.2;
            this.alpha = Math.random() * 0.5; // Dim stars
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Drifting Cloud Class
    class Cloud {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = 150 + Math.random() * 300; 
            this.speedX = (Math.random() * 0.2) + 0.05; 
            this.speedY = (Math.random() * 0.1) - 0.05; 
            this.maxAlpha = (Math.random() * 0.03) + 0.01; 
        }

        draw() {
            ctx.globalAlpha = 1; 
            let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            
            // Soft moonlit blue/grey gradient
            gradient.addColorStop(0, `rgba(160, 180, 220, ${this.maxAlpha})`);
            gradient.addColorStop(0.5, `rgba(160, 180, 220, ${this.maxAlpha * 0.5})`);
            gradient.addColorStop(1, `rgba(160, 180, 220, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Seamless wrap around the screen
            if (this.x - this.radius > width) {
                this.x = -this.radius;
                this.y = Math.random() * height;
            }
            if (this.y - this.radius > height) {
                this.y = -this.radius;
            } else if (this.y + this.radius < 0) {
                this.y = height + this.radius;
            }
        }
    }

    // Generate elements
    for (let i = 0; i < 70; i++) stars.push(new Star()); 
    for (let i = 0; i < 15; i++) clouds.push(new Cloud()); 

    // Animation Loop
    function animateSky() {
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => star.draw());
        clouds.forEach(cloud => {
            cloud.draw();
            cloud.update();
        });

        requestAnimationFrame(animateSky);
    }

    animateSky();
});
