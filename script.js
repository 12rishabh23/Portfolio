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
    starCamera.position.z = 5;

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
