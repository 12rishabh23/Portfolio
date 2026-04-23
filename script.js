document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. GLOBAL BACKGROUND: 3D STARFIELD
    ========================================= */
    const starCanvas = document.getElementById('bg-stars');
    const starScene = new THREE.Scene();
    const starCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const starRenderer = new THREE.WebGLRenderer({ canvas: starCanvas, alpha: true, antialias: true });
    
    starRenderer.setSize(window.innerWidth, window.innerHeight);
    starRenderer.setPixelRatio(window.devicePixelRatio);
    starCamera.position.z = 5;document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Vanilla JS 3D Tilt Effect for "Wow" Cards ---
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Disable on mobile/small screens
            if(window.innerWidth < 768) return; 

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // --- 2. Scroll Reveal Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // --- 3. Interactive Particle Constellation Background ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Mouse tracking
    let mouse = {
        x: null,
        y: null,
        radius: 150 // Area of effect for mouse interactions
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', () => {
        initCanvas();
        initParticles();
    });

    // Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = '#00f2fe';
            ctx.fill();
        }

        update() {
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
            if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }

            // Mouse collision detection & push effect
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * 5;
                const directionY = forceDirectionY * force * 5;

                // Push particles away smoothly
                this.x -= directionX;
                this.y -= directionY;
            }

            // Move particle normally
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        // Calculate number of particles based on screen size (performance control)
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = '#00f2fe';
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles with glowing lines
    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0,0,innerWidth, innerHeight);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    initCanvas();
    initParticles();
    animate();
});

    // Create thousands of stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 4000;
    const posArray = new Float32Array(starCount * 3);

    for(let i = 0; i < starCount * 3; i++) {
        // Spread stars widely across 3D space
        posArray[i] = (Math.random() - 0.5) * 15; 
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });

    const starMesh = new THREE.Points(starGeometry, starMaterial);
    starScene.add(starMesh);

    /* =========================================
       2. CONTACT SECTION: INTERACTIVE 3D GLOBE
    ========================================= */
    const globeContainer = document.getElementById('globe-container');
    const globeScene = new THREE.Scene();
    
    // Setup camera based on container size
    const globeCamera = new THREE.PerspectiveCamera(45, globeContainer.clientWidth / globeContainer.clientHeight, 0.1, 1000);
    globeCamera.position.z = 18; // Pull back to see the whole planet

    const globeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    globeRenderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
    globeRenderer.setPixelRatio(window.devicePixelRatio);
    globeContainer.appendChild(globeRenderer.domElement);

    // OrbitControls allows the user to grab and spin the globe
    const controls = new THREE.OrbitControls(globeCamera, globeRenderer.domElement);
    controls.enableZoom = false; // Prevent zooming in/out
    controls.enablePan = false;
    controls.autoRotate = true; // Slowly spins on its own
    controls.autoRotateSpeed = 2.0;

    // Create the Cyber-Globe Geometry
    // Layer 1: Solid inner core
    const sphereGeo = new THREE.IcosahedronGeometry(6, 2);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x151030 });
    const planet = new THREE.Mesh(sphereGeo, sphereMat);
    
    // Layer 2: Wireframe outer cage
    const wireMat = new THREE.MeshBasicMaterial({ 
        color: 0x915eff, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const planetWire = new THREE.Mesh(sphereGeo, wireMat);
    planetWire.scale.set(1.02, 1.02, 1.02);

    // Layer 3: Particle dots representing cities/nodes
    const dotsGeo = new THREE.IcosahedronGeometry(6, 4);
    const dotsMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1
    });
    const planetDots = new THREE.Points(dotsGeo, dotsMat);
    planetDots.scale.set(1.05, 1.05, 1.05);

    // Group them together
    const globeGroup = new THREE.Group();
    globeGroup.add(planet);
    globeGroup.add(planetWire);
    globeGroup.add(planetDots);
    globeScene.add(globeGroup);

    /* =========================================
       3. RESIZE HANDLER
    ========================================= */
    window.addEventListener('resize', () => {
        // Resize Stars
        starCamera.aspect = window.innerWidth / window.innerHeight;
        starCamera.updateProjectionMatrix();
        starRenderer.setSize(window.innerWidth, window.innerHeight);

        // Resize Globe
        globeCamera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
        globeCamera.updateProjectionMatrix();
        globeRenderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
    });

    /* =========================================
       4. ANIMATION LOOP
    ========================================= */
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Slowly rotate global stars
        starMesh.rotation.y = elapsedTime * 0.05;
        starMesh.rotation.x = elapsedTime * 0.02;

        // Update globe controls (handles auto-rotation and grabbing)
        controls.update();

        // Render both scenes
        starRenderer.render(starScene, starCamera);
        globeRenderer.render(globeScene, globeCamera);
    }
    
    animate();

    /* =========================================
       5. SCROLL REVEAL (CSS Animations)
    ========================================= */
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});
