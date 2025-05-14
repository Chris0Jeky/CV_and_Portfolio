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

// AOS Initialization (already in HTML, but good to keep JS logic separate)
// AOS.init({
//     duration: 1000,
//     once: true,
// });

// TODO: Add mobile navigation toggle functionality