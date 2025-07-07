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
    // Hide page loader when content is ready
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 500);
    }
    
    // Add typing effect to hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        // Store original text
        const fullText = heroTagline.textContent.trim();
        heroTagline.textContent = '';
        heroTagline.style.visibility = 'visible';
        heroTagline.style.minHeight = '1.5em'; // Prevent layout shift
        
        // Add cursor effect
        const cursor = document.createElement('span');
        cursor.style.borderRight = '3px solid #8b5cf6';
        cursor.style.animation = 'blink 0.75s step-end infinite';
        cursor.style.paddingRight = '2px';
        heroTagline.appendChild(cursor);
        
        // Type out the text character by character
        let charIndex = 0;
        const textSpan = document.createElement('span');
        heroTagline.insertBefore(textSpan, cursor);
        
        const typeInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                textSpan.textContent += fullText[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    cursor.style.display = 'none';
                }, 1000);
            }
        }, 40);
    }
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
    if (heroElements.length > 0) {
        // Add animation class instead of inline styles
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${0.2 + (index * 0.15)}s`;
            el.classList.add('hero-fade-in');
        });
    }
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

// Parallax scrolling effect
const parallaxElements = document.querySelectorAll('.hero-section, .shape-1');
if (parallaxElements.length > 0) {
    const parallaxScroll = debounce(() => {
        const scrolled = window.pageYOffset;
        const speed = 0.5;
        
        parallaxElements.forEach(element => {
            if (element.classList.contains('hero-section')) {
                element.style.transform = `translateY(${scrolled * speed}px)`;
            } else if (element.classList.contains('shape-1')) {
                element.style.transform = `translateY(${scrolled * speed * 0.8}px)`;
            }
        });
    }, 10);
    
    window.addEventListener('scroll', parallaxScroll, { passive: true });
}

// Add smooth reveal animations to sections
const revealSections = () => {
    const sections = document.querySelectorAll('.content-section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(section);
    });
};

// Initialize reveal animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealSections);
} else {
    revealSections();
}