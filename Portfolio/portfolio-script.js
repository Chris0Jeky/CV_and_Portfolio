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
});

// AOS Initialization (already in HTML, but good to keep JS logic separate)
// AOS.init({
//     duration: 1000,
//     once: true,
// });

// TODO: Add mobile navigation toggle functionality