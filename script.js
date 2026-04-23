// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- 1. Custom Cursor Logic ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const hoverTargets = document.querySelectorAll('.hover-target, a, button');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

// Update mouse coordinates
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate cursor follow
    gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1
    });
});

// Smooth follower animation loop
gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    gsap.set(follower, {
        x: followerX,
        y: followerY
    });
});

// Hover effect for links
hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        follower.classList.add('active');
        cursor.style.display = 'none'; // Hide inner dot on hover
    });
    target.addEventListener('mouseleave', () => {
        follower.classList.remove('active');
        cursor.style.display = 'block';
    });
});

// --- 2. Entry Animations (Hero Section) ---
const tl = gsap.timeline();

// Animating the big hero text from the bottom up
tl.from('.split-text', {
    y: 150,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.2
})
// Fade in bottom text and nav
.from('.hero-bottom .fade-up, nav', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
}, "-=0.5");

// --- 3. Scroll Animations ---
// Select all elements with the 'fade-up' class for scroll reveals
const fadeElements = document.querySelectorAll('.fade-up:not(.hero-bottom .fade-up)');

fadeElements.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%", // Trigger when element is 85% from top of viewport
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});
