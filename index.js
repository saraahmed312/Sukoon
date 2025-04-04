document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Get Started button functionality
    document.getElementById('getStartedBtn').addEventListener('click', function() {
        alert('This would navigate to the duaa search page in the full implementation.');
    });
    
    // Tooltip initialization
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            this.querySelector('.tooltiptext').style.visibility = 'visible';
            this.querySelector('.tooltiptext').style.opacity = '1';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            this.querySelector('.tooltiptext').style.visibility = 'hidden';
            this.querySelector('.tooltiptext').style.opacity = '0';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove active class from all links first
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    if (currentPage === 'index.html') {
        document.getElementById('home-link').classList.add('active');
    } else if (currentPage === 'about.html') {
        document.getElementById('about-link').classList.add('active');
    }
});