// Smooth scrolling for anchor links (optional, can be done with CSS scroll-behavior too)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active Nav Link Highlighting (basic example)
const sections = document.querySelectorAll("section[id]");
const navLi = document.querySelectorAll(".nav-menu li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) { // Adjust offset as needed
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").substring(1) === current) {
            a.classList.add("active");
        }
    });
});

// --- tsParticles Initialization ---
// Wait for the DOM to be fully loaded before initializing particles
document.addEventListener('DOMContentLoaded', (event) => {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse", // Or "grab", "bubble"
                },
                onClick: {
                    enable: true,
                    mode: "push", // Or "remove", "trail"
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 100, // How far particles are repulsed
                    duration: 0.4,
                },
                push: {
                    quantity: 4, // Number of particles pushed on click
                },
                // You can define other modes like grab, bubble here
            },
        },
        particles: {
            color: {
                value: "#FF8F00", // var(--accent-color1) - Amber/Gold particles
            },
            links: {
                color: "#4A3B31", // var(--accent-color2) - Earthy brown links
                distance: 150,
                enable: true,
                opacity: 0.3, // Subtle links
                width: 1,
            },
            collisions: {
                enable: false, // Keep false for performance unless needed
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { // How particles behave when they reach the edge
                    default: "bounce", // Or "out"
                },
                random: false,
                speed: 1, // Slower, more ambient speed
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800, // Adjust for desired particle density
                },
                value: 60, // Number of particles
            },
            opacity: {
                value: 0.4, // Subtle particles
            },
            shape: {
                type: "circle", // Or "star", "edge", "polygon"
            },
            size: {
                value: { min: 1, max: 3 }, // Small, varied particle sizes
            },
        },
        detectRetina: true, // Better rendering on high-DPI screens
        background: { // This will be the background of the #tsparticles div itself
            // color: "transparent", // Make it transparent so hero-section bg shows
            // Or you can set a color here if hero-section has no bg image
        }
    }).then(container => {
        console.log("tsParticles loaded successfully.");
    }).catch(error => {
        console.error("Error loading tsParticles:", error);
    });

    const projectCards = document.querySelectorAll(".project-card");
    if (projectCards.length > 0) {
        VanillaTilt.init(projectCards, {
            max: 15,        // Max tilt rotation (degrees)
            speed: 400,     // Speed of the enter/exit transition
            glare: true,    // If you want a glare effect
            "max-glare": 0.3 // Glare intensity (0.1 to 1)
        });
    } else {
        console.warn("No elements with class .project-card found for Vanilla Tilt.");
    }

    // --- GSAP Hero Animation ---
    if (typeof gsap !== 'undefined') { // Check if GSAP is loaded
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(".hero-content h1", { opacity: 1, y: 0, duration: 1, delay: 0.5 })
            .to(".hero-content .hero-tagline", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6") // Overlap animation
            .to(".hero-content .btn", { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }, "-=0.4"); // Stagger buttons
    } else {
        console.warn("GSAP not loaded. Hero animations will not run.");
        // Fallback: If GSAP fails, make elements visible directly
        document.querySelectorAll(".hero-content h1, .hero-content .hero-tagline, .hero-content .btn").forEach(el => {
            el.style.opacity = 1;
            // el.style.transform = 'translateY(0)';
        });
    }

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body; // To add class for open state if needed

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open'); // For burger animation & potentially overflow hidden
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
});
