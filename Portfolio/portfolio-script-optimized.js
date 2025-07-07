// Optimized portfolio-script.js with performance improvements

// Use requestAnimationFrame for smooth animations
const raf = window.requestAnimationFrame || ((cb) => setTimeout(cb, 16));

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

// Smooth scrolling with performance optimization
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

// Optimized scroll-based nav highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu li a");

// Create map for faster lookup
const navLinkMap = new Map();
navLinks.forEach(link => {
    const href = link.getAttribute("href").substring(1);
    navLinkMap.set(href, link);
});

// Optimized scroll handler with debouncing
const handleScroll = debounce(() => {
    const scrollY = window.pageYOffset;
    
    // Find current section
    let current = "";
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
            break;
        }
    }
    
    // Update active class
    navLinks.forEach(link => link.classList.remove("active"));
    const activeLink = navLinkMap.get(current);
    if (activeLink) {
        activeLink.classList.add("active");
    }
}, 100);

// Use passive listener for better scroll performance
window.addEventListener("scroll", handleScroll, { passive: true });

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open');
        });
        
        // Close mobile menu when link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    body.classList.remove('nav-open');
                }
            });
        });
    }
    
    // Lazy load particles (moved from inline script)
    if (window.tsParticles && document.getElementById('tsparticles')) {
        tsParticles.load("tsparticles", {
            fpsLimit: 30, // Reduced from 60 for better performance
            interactivity: {
                events: {
                    onHover: { enable: false }, // Disable hover for performance
                    onClick: { enable: false }, // Disable click for performance
                    resize: true,
                },
            },
            particles: {
                color: { value: "#FF8F00" },
                links: {
                    color: "#4A3B31",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                collisions: { enable: false },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: false,
                    speed: 0.5, // Reduced speed
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 1200, // Increased area = fewer particles
                    },
                    value: 30, // Reduced particle count
                },
                opacity: { value: 0.4 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        });
    }
    
    // Initialize Vanilla Tilt only for visible elements
    const initTilt = () => {
        const projectCards = document.querySelectorAll(".project-card:not(.tilt-initialized)");
        const skillCards = document.querySelectorAll(".skill-area:not(.tilt-initialized)");
        
        if (window.VanillaTilt) {
            projectCards.forEach(card => {
                VanillaTilt.init(card, {
                    max: 15,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.3
                });
                card.classList.add('tilt-initialized');
            });
            
            skillCards.forEach(card => {
                VanillaTilt.init(card, {
                    max: 10,
                    speed: 600,
                    glare: true,
                    "max-glare": 0.1,
                    scale: 1.03
                });
                card.classList.add('tilt-initialized');
            });
        }
    };
    
    // Run tilt initialization after a delay
    setTimeout(initTilt, 500);
    
    // GSAP animations - only if loaded
    if (window.gsap) {
        // Set initial states via CSS instead of GSAP for better performance
        const heroElements = document.querySelectorAll(".hero-content h1, .hero-content .hero-tagline, .hero-content .btn");
        heroElements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
        });
        
        // Simple fade in animation
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.to(".hero-content h1", { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
          .to(".hero-content .hero-tagline", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to(".hero-content .btn", { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, "-=0.3");
    } else {
        // Fallback: Show elements immediately if GSAP not loaded
        document.querySelectorAll(".hero-content h1, .hero-content .hero-tagline, .hero-content .btn").forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        });
    }
});