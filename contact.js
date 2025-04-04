document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (currentPage === 'index.html') {
        document.getElementById('home-link').classList.add('active');
    } else if (currentPage === 'about.html') {
        document.getElementById('about-link').classList.add('active');
    } else if (currentPage === 'contact.html') {
        document.getElementById('contact-link').classList.add('active');
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // send the form data to a server here
                        
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
});