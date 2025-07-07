// Optimized portfolio-script.js for better performance

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Nav Link Highlighting - Optimized
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu li a");

// Create a map for faster lookup
const linkMap = new Map();
navLinks.forEach(link => {
    const href = link.getAttribute("href").substring(1);
    linkMap.set(href, link);
});

// Optimized scroll handler
const updateActiveNav = debounce(() => {
    const scrollY = window.pageYOffset;
    let current = "";
    
    // Find current section more efficiently
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollY >= section.offsetTop - 100) {
            current = section.getAttribute("id");
            break;
        }
    }
    
    // Update active class
    navLinks.forEach(link => link.classList.remove("active"));
    const activeLink = linkMap.get(current);
    if (activeLink) {
        activeLink.classList.add("active");
    }
}, 50);

// Use passive listener for better performance
window.addEventListener("scroll", updateActiveNav, { passive: true });

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open');
        });
        
        // Close mobile menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    body.classList.remove('nav-open');
                }
            });
        });
    }
    
    // Simple fade-in for hero content (no GSAP needed)
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content .hero-tagline, .hero-content .btn');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
});

// Lazy load images if needed
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

// Observe all images with data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});