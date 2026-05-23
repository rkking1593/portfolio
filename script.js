// Select all sections on the page
const sections = document.querySelectorAll('section');

// Select all nav links
const navLinks = document.querySelectorAll('.navbar ul li a');

// Listen for scroll events on the window
window.addEventListener('scroll', () => {
    
    // Track which section is currently visible
    let current = '';
    
    sections.forEach(section => {
        // Get how far from top the section starts, minus 100px offset for navbar
        const sectionTop = section.offsetTop - 100;
        
        // Get the full height of the section
        const sectionHeight = section.clientHeight;

        // Check if scroll is within this section
        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute('id');
        }
    });

    // Special case — if user is at bottom of page, force Contact as active
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        current = 'contact';
    }

    navLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Add active class only to the link matching current section
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Select all sections to animate on scroll
const revealSections = document.querySelectorAll('section');

// Create an observer that watches when sections enter the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If section is visible, add 'visible' class to trigger animation
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of section is visible

// Tell the observer to watch each section
revealSections.forEach(section => observer.observe(section));

// Select the hamburger button and nav menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.navbar ul');

// When hamburger is clicked, toggle the menu open/closed
hamburger.addEventListener('click', () => {
    // Toggle 'open' class on the nav menu
    navMenu.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// Close menu when user scrolls on mobile
window.addEventListener('scroll', () => {
    navMenu.classList.remove('open');
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Prevent default jump behavior
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        // If target section exists, scroll smoothly to it
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

