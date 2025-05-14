// portfolio-script.js — consolidated (GSAP-only, no duplicate vanilla code/AOS)
// Required CDNs (place before this script):
//  gsap.min.js, ScrollTrigger.min.js, ScrollToPlugin.min.js, tsparticles.bundle.min.js, vanilla-tilt.min.js

(function(){
    /* ------------------------------------------------
       Utility — throttle resize/scroll events refresh
    ------------------------------------------------ */
    const raf = fn => { let ticking = false; return (...args)=>{ if(!ticking){ requestAnimationFrame(()=>{ fn.apply(this,args); ticking=false; }); ticking=true; } }; };

    /* ------------------------------------------------
       1️⃣  Smooth-scrolling nav (GSAP ScrollTo)
    ------------------------------------------------ */
    function enableSmoothScroll(){
        document.querySelectorAll('a[href^="#"]').forEach(link=>{
            const targetSel = link.getAttribute('href');
            if(targetSel.length>1 && document.querySelector(targetSel)){
                link.addEventListener('click',e=>{
                    e.preventDefault();
                    gsap.to(window,{duration:.8,scrollTo:targetSel,ease:'power2.out'});
                });
            }
        });
    }

    /* ------------------------------------------------
       2️⃣  Active link highlight via IntersectionObserver
    ------------------------------------------------ */
    function setupActiveLinks(){
        const links = document.querySelectorAll('.nav-menu li a');
        const observer = new IntersectionObserver(entries=>{
            entries.forEach(en=>{
                if(en.isIntersecting){
                    const id = en.target.id;
                    links.forEach(l=>l.classList.toggle('active',l.getAttribute('href').slice(1)===id));
                }
            });
        },{threshold:.45});
        document.querySelectorAll('section[id]').forEach(sec=>observer.observe(sec));
    }

    /* ------------------------------------------------
       3️⃣  Particle background in hero
    ------------------------------------------------ */
    function initParticles(){
        if(window.tsParticles && document.getElementById('tsparticles')){
            tsParticles.load('tsparticles',{
                fullScreen:{enable:false}, background:{color:{value:'transparent'}},
                particles:{
                    number:{value:60,density:{enable:true,area:800}},
                    color:{value:['#FF8F00','#B71C1C']},
                    opacity:{value:{min:.2,max:.8}},
                    size:{value:{min:1,max:3}},
                    move:{enable:true,speed:.6,direction:'top',straight:false}
                }
            });
        }
    }

    /* ------------------------------------------------
       4️⃣  Intro animations (GSAP timeline)
    ------------------------------------------------ */
    function heroIntro(){
        const tl = gsap.timeline();
        tl.from('.hero-content h1',{y:60,opacity:0,duration:1.1,ease:'back.out(1.6)'})
            .from('.hero-tagline',{y:30,opacity:0,duration:.9},'-=.5')
            .from('.hero-content .btn',{scale:0,opacity:0,stagger:.15,duration:.6},'-=.3');
    }

    /* ------------------------------------------------
       5️⃣  Scroll triggers
    ------------------------------------------------ */
    function registerScrollAnim(){
        const defaults={toggleActions:'play none none reverse'};
        gsap.utils.toArray('.timeline-item').forEach((item,i)=>{
            gsap.from(item,{x:i%2?120:-120,opacity:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:item,start:'top 80%',...defaults}});
        });
        gsap.utils.toArray('.skill-area').forEach(el=>{
            gsap.from(el,{y:60,opacity:0,duration:.6,scrollTrigger:{trigger:el,start:'top 85%',...defaults}});
        });
        gsap.utils.toArray('.project-card').forEach(card=>{
            gsap.from(card,{scale:.88,opacity:0,duration:.7,scrollTrigger:{trigger:card,start:'top 95%',...defaults}});
        });
    }

    /* ------------------------------------------------
       6️⃣  Tilt effect on project cards
    ------------------------------------------------ */
    function enableTilt(){
        if(window.VanillaTilt){
            VanillaTilt.init(document.querySelectorAll('.project-card'),{max:10,speed:400,glare:true,'max-glare':.25});
        }
    }

    /* ------------------------------------------------
       7️⃣  Skill glow hover
    ------------------------------------------------ */
    function skillGlow(){
        document.querySelectorAll('.skill-area').forEach(el=>{
            el.addEventListener('mouseenter',()=>el.classList.add('skill-glow'));
            el.addEventListener('mouseleave',()=>el.classList.remove('skill-glow'));
        });
    }

    /* ------------------------------------------------
       Boot
    ------------------------------------------------ */
    window.addEventListener('DOMContentLoaded',()=>{
        enableSmoothScroll();
        setupActiveLinks();
        initParticles();
        heroIntro();
        registerScrollAnim();
        enableTilt();
        skillGlow();
    });

    /* If images load later (e.g., project thumbs) refresh ScrollTrigger */
    window.addEventListener('load',()=>ScrollTrigger.refresh());
})();