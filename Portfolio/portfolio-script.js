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

// portfolio-script.js – advanced, flashy & convoluted 🌟
// Requires: GSAP 3 (core + ScrollTrigger + ScrollTo), tsParticles, VanillaTilt
// Add these before this script in your HTML (just above </body>):
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/tsparticles@2.11.1/tsparticles.bundle.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.2/vanilla-tilt.min.js"></script>

(function(){
    // Wait for DOM + external libraries
    window.addEventListener('DOMContentLoaded', () => {
        /* --------------------------------------------------
           1️⃣ Smooth scroll using GSAP ScrollTo
        -------------------------------------------------- */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                const target = anchor.getAttribute('href');
                if (target.length > 1 && document.querySelector(target)) {
                    e.preventDefault();
                    gsap.to(window, {duration: .8, scrollTo: target, ease: 'power2.out'});
                }
            });
        });

        /* --------------------------------------------------
           2️⃣ Active‑link highlighting via IntersectionObserver
        -------------------------------------------------- */
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu li a');
        const io = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    const id = entry.target.id;
                    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href').substring(1) === id));
                }
            });
        }, {threshold: 0.4});
        sections.forEach(sec => io.observe(sec));

        /* --------------------------------------------------
           3️⃣ tsParticles – drifting embers behind hero
        -------------------------------------------------- */
        if(window.tsParticles && document.getElementById('tsparticles')){
            tsParticles.load('tsparticles', {
                background: { color: { value: 'transparent' } },
                fullScreen: { enable: false },
                particles: {
                    number: { value: 70, density: { enable: true, area: 800 } },
                    color: { value: [ '#FF8F00', '#B71C1C' ] },
                    opacity: { value: { min: 0.2, max: 0.7 } },
                    size: { value: { min: 1, max: 3 } },
                    move: { enable: true, speed: 0.6, direction: 'top', straight: false },
                }
            });
        }

        /* --------------------------------------------------
           4️⃣ Hero text entrance with GSAP timeline
        -------------------------------------------------- */
        gsap.from('.hero-content h1', {y: 60, opacity: 0, duration: 1.1, ease: 'back.out(1.6)'});
        gsap.from('.hero-tagline', {y: 30, opacity: 0, duration: 0.9, delay: 0.4});
        gsap.from('.hero-content .btn', {scale: 0, opacity: 0, stagger: 0.15, duration: 0.6, delay: 0.8});

        /* --------------------------------------------------
           5️⃣ Scroll‑triggered reveals (timeline, skills, project cards)
        -------------------------------------------------- */
        gsap.utils.toArray('.timeline-item').forEach((item,i)=>{
            gsap.from(item, {
                x: i%2 ? 120 : -120,
                opacity: 0,
                duration: .8,
                ease: 'power2.out',
                scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        });

        gsap.utils.toArray('.skill-area').forEach(area => {
            gsap.from(area, {
                y: 60, opacity: 0, duration: 0.6,
                scrollTrigger: { trigger: area, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });

        gsap.utils.toArray('.project-card').forEach(card => {
            gsap.from(card, {
                scale: 0.85, opacity: 0, duration: 0.7,
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });

        /* --------------------------------------------------
           6️⃣ VanillaTilt for interactive project card tilt
        -------------------------------------------------- */
        if(window.VanillaTilt){
            VanillaTilt.init(document.querySelectorAll('.project-card'), {
                max: 10, speed: 400, glare: true, 'max-glare': 0.25
            });
        }

        /* --------------------------------------------------
           7️⃣ Extra flair – glow on skill boxes
        -------------------------------------------------- */
        document.querySelectorAll('.skill-area').forEach(el => {
            el.addEventListener('mouseenter', ()=> el.classList.add('skill-glow'));
            el.addEventListener('mouseleave', ()=> el.classList.remove('skill-glow'));
        });
    });
})();
