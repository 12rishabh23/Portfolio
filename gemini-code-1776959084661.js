// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form submission handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Retrieve form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // In a real scenario, you would send this data to your backend (e.g., your Django server or PHP script)
    alert(`Thank you, ${name}! Your message has been received. I will get back to you at ${email} shortly.`);
    
    // Reset the form
    this.reset();
});