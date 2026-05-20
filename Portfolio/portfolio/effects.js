/* eslint-disable */
// Theatre layer — paper shader, custom cursor, magnetic buttons,
// marquee ticker, hot-metal h2 reveal, drifting ink blots, click-to-stamp.
// Plain JS. Runs after the React tree mounts.

(function () {
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────────────────────────────────────────
     ① WEBGL PAPER GRAIN (no mouse halo — pure texture)
     ─────────────────────────────────────────────── */
  const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`;
  const FRAG = `
    precision highp float;
    uniform vec2  u_res;
    uniform float u_time;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p){
      vec2 i=floor(p), f=fract(p);
      f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),
                 mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x), f.y);
    }
    float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
    void main(){
      vec2 uv = gl_FragCoord.xy / u_res.xy;
      uv.y = 1.0 - uv.y;
      float coarse = fbm(gl_FragCoord.xy * 0.0035 + u_time * 0.00002);
      float fine   = fbm(gl_FragCoord.xy * 0.55);
      float breath = sin(u_time * 0.0004) * 0.5 + 0.5;
      // vignette pulls down at edges so middle reads "fresh page"
      vec2 c = uv - 0.5;
      float vign = smoothstep(0.78, 0.35, length(c));
      vec3 paper = vec3(0.957, 0.945, 0.918);
      vec3 col = paper;
      col -= (coarse * 0.045 + fine * 0.018);
      col -= breath * 0.006;
      col *= mix(0.97, 1.0, vign);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function initShader() {
    if (REDUCED) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'paper-shader';
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;display:block;';
    document.body.prepend(canvas);
    document.body.style.background = 'transparent';
    document.body.style.backgroundImage = 'none';

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false }) || canvas.getContext('experimental-webgl');
    if (!gl) { canvas.remove(); document.body.style.background = ''; return; }
    const c = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null; };
    const vs = c(gl.VERTEX_SHADER, VERT), fs = c(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { canvas.remove(); return; }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    addEventListener('resize', resize);
    const start = performance.now();
    function frame(t) {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t - start);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ───────────────────────────────────────────────
     ② AMBIENT DRIFTING INK BLOTS (CSS-animated)
     ─────────────────────────────────────────────── */
  function initBlots() {
    if (REDUCED) return;
    const wrap = document.createElement('div');
    wrap.id = 'ink-blots';
    wrap.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
    document.body.appendChild(wrap);

    const N = 7;
    for (let i = 0; i < N; i++) {
      const blot = document.createElement('div');
      const size = 80 + Math.random() * 220;
      const dur = 24 + Math.random() * 22;
      const delay = -Math.random() * dur;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const ang = Math.random() * 360;
      const hue = Math.random() < 0.7 ? 'rgba(22, 21, 20, 0.05)' : 'rgba(204, 58, 46, 0.04)';
      blot.style.cssText = `
        position:absolute; left:${x}%; top:${y}%;
        width:${size}px; height:${size}px;
        background: radial-gradient(circle at 50% 50%, ${hue} 0%, transparent 65%);
        transform: rotate(${ang}deg);
        animation: blot-drift ${dur}s ease-in-out ${delay}s infinite;
        filter: blur(${10 + Math.random()*14}px);
        opacity: 0;
      `;
      wrap.appendChild(blot);
    }

    const css = document.createElement('style');
    css.textContent = `
      @keyframes blot-drift {
        0%   { transform: translate(0, 0) rotate(0deg) scale(0.8); opacity: 0; }
        25%  { opacity: 0.6; }
        50%  { transform: translate(40px, -30px) rotate(40deg) scale(1.1); opacity: 0.8; }
        75%  { opacity: 0.5; }
        100% { transform: translate(-30px, 50px) rotate(80deg) scale(0.9); opacity: 0; }
      }
      @media print { #ink-blots { display: none; } }
    `;
    document.head.appendChild(css);
  }

  /* ───────────────────────────────────────────────
     ③ CUSTOM CURSOR — printing registration mark
     ─────────────────────────────────────────────── */
  function initCursor() {
    if (REDUCED) return;
    if (matchMedia('(pointer: coarse)').matches) return; // touch devices: skip

    const cur = document.createElement('div');
    cur.id = 'tcaci-cursor';
    cur.innerHTML = `
      <svg viewBox="-12 -12 24 24" width="100%" height="100%" style="overflow:visible;">
        <path d="M -11,-5 L -11,-11 L -5,-11" fill="none" stroke="currentColor" stroke-width="1.4"/>
        <path d="M 11,5 L 11,11 L 5,11" fill="none" stroke="currentColor" stroke-width="1.4"/>
        <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="currentColor" stroke-width="1"/>
        <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="currentColor" stroke-width="1"/>
        <circle r="0.9" fill="currentColor"/>
      </svg>
    `;
    cur.style.cssText = `
      position: fixed; top: 0; left: 0; width: 26px; height: 26px;
      pointer-events: none; z-index: 9998;
      color: #cc3a2e;
      transform: translate3d(-100px, -100px, 0) rotate(0deg);
      mix-blend-mode: multiply;
      will-change: transform;
      transition: width 0.18s ease, height 0.18s ease, color 0.18s ease;
    `;
    document.body.appendChild(cur);

    const css = document.createElement('style');
    css.textContent = `
      html, body, * { cursor: none !important; }
      input, textarea, [contenteditable="true"] { cursor: text !important; }
      input[type="range"] { cursor: ew-resize !important; }
      #tcaci-cursor.is-press { width: 38px; height: 38px; color: #161514; }
      #tcaci-cursor.is-text  { width: 14px; height: 28px; color: #161514; }
      @media print { #tcaci-cursor { display: none; } html, body, * { cursor: auto !important; } }
    `;
    document.head.appendChild(css);

    let tx = -100, ty = -100, cx = -100, cy = -100, rot = 0;
    addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    addEventListener('pointerdown', () => { cur.style.transform += ' scale(0.6)'; setTimeout(() => { cur.style.transform = cur.style.transform.replace(' scale(0.6)',''); }, 120); });

    function tick() {
      cx += (tx - cx) * 0.35;
      cy += (ty - cy) * 0.35;
      rot += 0.2;
      cur.style.transform = `translate3d(${(cx - 13).toFixed(1)}px, ${(cy - 13).toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // State changes
    document.addEventListener('mouseover', (e) => {
      const t = e.target;
      cur.classList.remove('is-press', 'is-text');
      if (t.closest('a, button, .btn, [role="button"]')) {
        cur.classList.add('is-press');
      } else if (t.closest('input, textarea, [contenteditable="true"], p, h1, h2, h3, h4, li, blockquote, em, strong')) {
        // soften over text
        cur.classList.add('is-text');
      }
    });
  }

  /* ───────────────────────────────────────────────
     ④ MAGNETIC BUTTONS
     ─────────────────────────────────────────────── */
  function initMagnetic() {
    if (REDUCED) return;
    const targets = document.querySelectorAll('.btn, .navbar a, button.btn');
    const RADIUS = 90;
    const STRENGTH = 0.32;

    let mx = -1, my = -1;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

    function tick() {
      targets.forEach(el => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx, dy = my - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS) {
          const t = 1 - dist / RADIUS;
          el.style.transform = `translate(${(dx * t * STRENGTH).toFixed(2)}px, ${(dy * t * STRENGTH).toFixed(2)}px)`;
          el.style.transition = 'transform 0.08s linear';
        } else if (el.style.transform) {
          el.style.transform = 'translate(0,0)';
          el.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
        }
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ───────────────────────────────────────────────
     ⑤ MARQUEE TICKER — under the masthead
     ─────────────────────────────────────────────── */
  function initMarquee() {
    // First .container child of #root is the masthead
    const root = document.getElementById('root');
    if (!root) return;
    const masthead = root.querySelector('.container');
    if (!masthead) return;

    const items = [
      '★ STOP PRESS',
      'VOL IV · N° 043',
      'THE BORING HALF OF SOFTWARE',
      'PROPOSALS OVER COMMITS',
      'CITE YOUR SOURCES',
      '9,799 TESTS FOR SLEEP AT NIGHT',
      '⌘K FOR THE INDEX',
      'TRUST-FIRST AUTOMATION',
      'LOCAL-FIRST BY DEFAULT',
      'IF IT\u2019S NOT IN THE AUDIT LOG IT DIDN\u2019T HAPPEN',
      '£17 TRILLION · VISUALISED',
      '△ ○ ✕ ▢  ·  PRESS START',
      'INSERT COIN · CONTINUE? 9',
      '★ STOP PRESS',
    ];
    const line = items.join('   ·   ');

    const wrap = document.createElement('div');
    wrap.id = 'marquee';
    wrap.innerHTML = `
      <div class="marquee-rule top"></div>
      <div class="marquee-track" aria-hidden="true">
        <span class="marquee-chunk">${line}</span>
        <span class="marquee-chunk">${line}</span>
      </div>
      <div class="marquee-rule bot"></div>
    `;
    masthead.appendChild(wrap);

    const css = document.createElement('style');
    css.textContent = `
      #marquee {
        position: relative;
        margin: 14px 0 0;
        overflow: hidden;
        font-family: 'IBM Plex Mono', ui-monospace, monospace;
        font-size: 11px;
        letter-spacing: 0.18em;
        color: #2a2723;
      }
      #marquee .marquee-rule { height: 1px; background: var(--rule, #1a1817); opacity: 0.85; }
      #marquee .marquee-rule.bot { margin-top: 6px; }
      #marquee .marquee-track {
        display: flex; gap: 0;
        width: max-content;
        padding: 6px 0;
        animation: marquee-scroll 56s linear infinite;
      }
      #marquee .marquee-chunk {
        white-space: nowrap;
        padding-right: 0.75em;
      }
      #marquee:hover .marquee-track { animation-play-state: paused; }
      @keyframes marquee-scroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @media (prefers-reduced-motion: reduce) {
        #marquee .marquee-track { animation: none; }
      }
      @media print { #marquee { display: none; } }
    `;
    document.head.appendChild(css);
  }

  /* ───────────────────────────────────────────────
     ⑥ HOT-METAL H2 REVEAL — scramble in, then underline
     ─────────────────────────────────────────────── */
  function initScramble() {
    const style = document.createElement('style');
    style.textContent = `
      .ink-underline { position: relative; }
      .ink-underline::after {
        content: ''; position: absolute;
        left: 0; bottom: -0.04em;
        height: 0.055em; width: 100%;
        background: var(--rouge, #cc3a2e);
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 1.4s cubic-bezier(0.7, 0, 0.3, 1) 0s;
        box-shadow: 0 0.02em 0 rgba(204, 58, 46, 0.18);
      }
      .ink-underline.is-drawn::after { transform: scaleX(1); }
      .scramble-char { display: inline-block; min-width: 0.3em; }
      .scramble-char.is-shuffling { color: var(--rouge, #cc3a2e); }
      .scramble-word { display: inline-block; white-space: nowrap; }
      @media print { .ink-underline::after { display: none; } .scramble-char { color: inherit !important; } }
    `;
    document.head.appendChild(style);

    const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#@&%$+=*?!';
    const h2s = [];
    document.querySelectorAll('section h2').forEach(h => {
      const cs = parseFloat(getComputedStyle(h).fontSize);
      if (cs >= 40) {
        h.classList.add('ink-underline');
        // Wrap each WORD in a nowrap span so the browser only breaks between words,
        // not between letters of "caused" or "Projects, ".
        const text = h.textContent;
        h.dataset.scrambleText = text;
        h.innerHTML = '';
        const tokens = text.split(/(\s+)/);
        for (const token of tokens) {
          if (/^\s+$/.test(token)) {
            // a real, breakable space between words
            h.appendChild(document.createTextNode(' '));
            continue;
          }
          const word = document.createElement('span');
          word.className = 'scramble-word';
          for (const ch of token) {
            const span = document.createElement('span');
            span.className = 'scramble-char';
            span.textContent = ch;
            span.dataset.final = ch;
            word.appendChild(span);
          }
          h.appendChild(word);
        }
        h2s.push(h);
      }
    });

    function scramble(h) {
      if (REDUCED) {
        h.classList.add('is-drawn');
        return;
      }
      const chars = [...h.querySelectorAll('.scramble-char')];
      const total = chars.length;
      chars.forEach((sp, i) => {
        const final = sp.dataset.final;
        if (final === ' ' || final === '\u00A0') return;
        const start = i * 35; // stagger
        const cycles = 9;
        sp.classList.add('is-shuffling');
        for (let k = 0; k < cycles; k++) {
          setTimeout(() => {
            sp.textContent = POOL[Math.floor(Math.random() * POOL.length)];
          }, start + k * 36);
        }
        setTimeout(() => {
          sp.textContent = final;
          sp.classList.remove('is-shuffling');
        }, start + cycles * 36);
      });
      // After scramble completes, draw the underline
      const done = total * 35 + 9 * 36 + 120;
      setTimeout(() => h.classList.add('is-drawn'), done);
    }

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            scramble(e.target);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.25 });
      h2s.forEach(t => obs.observe(t));
    } else {
      h2s.forEach(t => scramble(t));
    }
  }

  /* ───────────────────────────────────────────────
     ⑦ CLICK-TO-STAMP — PlayStation shapes (rouge ink press)
     ─────────────────────────────────────────────── */
  function initStamp() {
    if (REDUCED) return;

    // PlayStation palette (Western order)
    const PS_SHAPES = [
      { name: 'triangle', color: '#2a9d4f', svg: `<polygon points="0,-13 12,9 -12,9" fill="none" stroke="currentColor" stroke-width="2.2"/>` },
      { name: 'circle',   color: '#e44b56', svg: `<circle r="12" fill="none" stroke="currentColor" stroke-width="2.2"/>` },
      { name: 'cross',    color: '#3a9ee0', svg: `<line x1="-10" y1="-10" x2="10" y2="10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><line x1="10" y1="-10" x2="-10" y2="10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>` },
      { name: 'square',   color: '#d063a8', svg: `<rect x="-10" y="-10" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"/>` },
    ];

    let psIdx = 0;
    document.addEventListener('click', (e) => {
      // Skip if click is on interactive UI
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .navbar, #tcaci-boot, #marquee')) return;

      const x = e.clientX, y = e.clientY;
      const shape = PS_SHAPES[psIdx % PS_SHAPES.length];
      psIdx++;

      const stamp = document.createElement('div');
      stamp.style.cssText = `
        position: fixed; left: ${x - 20}px; top: ${y - 20}px;
        width: 40px; height: 40px; pointer-events: none; z-index: 9997;
        color: ${shape.color};
        animation: stamp-fade 1.4s ease-out forwards;
        transform: rotate(${(Math.random() * 14 - 7).toFixed(1)}deg);
        filter: drop-shadow(0 1px 0 rgba(0,0,0,0.18));
      `;
      stamp.innerHTML = `<svg viewBox="-20 -20 40 40" width="100%" height="100%" style="overflow:visible;">${shape.svg}</svg>`;
      document.body.appendChild(stamp);
      setTimeout(() => stamp.remove(), 1500);
    });

    const css = document.createElement('style');
    css.textContent = `
      @keyframes stamp-fade {
        0%   { opacity: 0; transform: scale(0.3) rotate(-20deg); }
        12%  { opacity: 1; transform: scale(1.15) rotate(0deg); }
        25%  { opacity: 0.95; transform: scale(0.95); }
        100% { opacity: 0; transform: scale(1.4) rotate(15deg); }
      }
      @media print { .stamp { display: none; } }
    `;
    document.head.appendChild(css);
  }

  /* ───────────────────────────────────────────────
     ⑧ TILT CARDS (kept from previous)
     ─────────────────────────────────────────────── */
  function initTilt() {
    if (REDUCED) return;
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.25s cubic-bezier(0.2, 0.6, 0.2, 1)';
      card.style.willChange = 'transform';

      const sheen = document.createElement('div');
      sheen.style.cssText = `
        position:absolute; inset:0; pointer-events:none; z-index:1;
        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22), transparent 35%);
        opacity:0; transition: opacity 0.2s ease;
        mix-blend-mode: overlay;
      `;
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
      card.appendChild(sheen);

      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(1100px) rotateX(${((y - 0.5) * -8).toFixed(2)}deg) rotateY(${((x - 0.5) * 8).toFixed(2)}deg) translateZ(2px)`;
        sheen.style.background = `radial-gradient(circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255,255,255,0.30), transparent 38%)`;
        sheen.style.opacity = '1';
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
        sheen.style.opacity = '0';
      });
    });
  }

  /* ───────────────────────────────────────────────
     ⑨ "PRESS RUN" BOOT (once per tab)
     ─────────────────────────────────────────────── */
  function initBoot() {
    if (sessionStorage.getItem('tcaci_boot_seen')) return;
    sessionStorage.setItem('tcaci_boot_seen', '1');

    const overlay = document.createElement('div');
    overlay.id = 'tcaci-boot';
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: #f4f1ea;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      cursor: pointer; overflow: hidden;
      animation: tcaci-boot-out 0.55s ease-in 2.4s forwards;
    `;
    overlay.innerHTML = `
      <style>
        @keyframes tcaci-boot-out { to { opacity: 0; pointer-events: none; transform: translateY(-1.5%); } }
        @keyframes tcaci-press { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-3px,1px)} 40%{transform:translate(3px,-1px)} 60%{transform:translate(-2px,2px)} 80%{transform:translate(2px,-2px)} }
        @keyframes tcaci-line-in { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes tcaci-bar-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes tcaci-strip { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .tcaci-boot-rouge { position: absolute; top: 0; left: 0; height: 6px; width: 100%; background: #cc3a2e; transform-origin: left; animation: tcaci-strip 0.5s ease-out forwards; }
        .tcaci-boot-rouge.bottom { top: auto; bottom: 0; transform-origin: right; animation-delay: 0.2s; }
        .tcaci-boot-press { font-family: 'Newsreader', serif; font-size: clamp(72px, 14vw, 168px); font-weight: 400; color: #161514; letter-spacing: -0.045em; line-height: 0.9; animation: tcaci-press 0.13s steps(2) infinite; }
        .tcaci-boot-kicker { font-family: 'IBM Plex Sans', system-ui, sans-serif; font-size: 11px; letter-spacing: 0.28em; color: #cc3a2e; margin-bottom: 20px; }
        .tcaci-boot-sub { font-family: 'Newsreader', serif; font-style: italic; font-size: clamp(18px, 2.6vw, 26px); color: #cc3a2e; margin-top: 10px; }
        .tcaci-boot-stack { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #5a554d; letter-spacing: 0.06em; margin-top: 28px; width: min(360px, 80vw); }
        .tcaci-boot-row { display: flex; align-items: center; gap: 10px; margin: 6px 0; opacity: 0; animation: tcaci-line-in 0.35s ease-out forwards; }
        .tcaci-boot-row .bar { flex: 1; height: 2px; background: rgba(22,21,20,0.1); position: relative; overflow: hidden; }
        .tcaci-boot-row .bar::after { content:''; position:absolute; inset:0; background:#1a4d3a; transform:scaleX(0); transform-origin:left; animation: tcaci-bar-fill 0.45s ease-out forwards; }
        .tcaci-boot-row .ok { color: #1a4d3a; font-weight: 600; }
        .tcaci-boot-hint { position: absolute; bottom: 24px; right: 24px; font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: rgba(22,21,20,0.5); letter-spacing: 0.18em; text-transform: uppercase; }
      </style>
      <div class="tcaci-boot-rouge"></div>
      <div class="tcaci-boot-rouge bottom"></div>
      <div class="tcaci-boot-kicker">★ THE TCACI QUARTERLY · VOL. IV · N° 043 ★</div>
      <div class="tcaci-boot-press">PRESS RUN</div>
      <div class="tcaci-boot-sub">— a practitioner's notebook —</div>
      <div class="tcaci-boot-stack">
        <div class="tcaci-boot-row" style="animation-delay: 0.25s"><span>▸ ink_loaded</span><span class="bar"></span><span class="ok">ok</span></div>
        <div class="tcaci-boot-row" style="animation-delay: 0.55s"><span>▸ plates_set</span><span class="bar"></span><span class="ok">ok</span></div>
        <div class="tcaci-boot-row" style="animation-delay: 0.85s"><span>▸ paper_loaded</span><span class="bar"></span><span class="ok">ok</span></div>
        <div class="tcaci-boot-row" style="animation-delay: 1.15s"><span>▸ rollers_engaged</span><span class="bar"></span><span class="ok">go</span></div>
      </div>
      <div class="tcaci-boot-hint">click anywhere to skip</div>
    `;
    overlay.addEventListener('click', () => { overlay.style.transition = 'opacity 0.3s ease'; overlay.style.opacity = '0'; setTimeout(() => overlay.remove(), 320); });
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 3200);
  }

  /* ───────────────────────────────────────────────
     ⑩ READING PROGRESS RIBBON (rouge fill at top)
     ─────────────────────────────────────────────── */
  function initProgress() {
    const bar = document.createElement('div');
    bar.id = 'tcaci-progress';
    bar.innerHTML = '<span></span>';
    bar.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; height: 3px;
      z-index: 60; pointer-events: none;
      background: linear-gradient(to bottom, rgba(22,21,20,0.12), rgba(22,21,20,0.03));
    `;
    const fill = bar.firstElementChild;
    fill.style.cssText = `
      display: block; height: 100%; width: 0%;
      background: linear-gradient(90deg, var(--rouge, #cc3a2e) 0%, var(--ink, #161514) 100%);
      box-shadow: 0 0 10px rgba(204, 58, 46, 0.45);
      transition: width 0.08s linear;
    `;
    document.body.appendChild(bar);
    function onScroll() {
      const sc = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, (sc / Math.max(max, 1)) * 100));
      fill.style.width = pct + '%';
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
    const css = document.createElement('style');
    css.textContent = `@media print { #tcaci-progress { display: none; } }`;
    document.head.appendChild(css);
  }

  /* ───────────────────────────────────────────────
     ⑪ § PAGE COUNTER — in the navbar, updates live
     ─────────────────────────────────────────────── */
  function initPageCounter() {
    const navInner = document.querySelector('.nav-inner');
    const sections = [...document.querySelectorAll('section[id]')];
    if (!navInner || sections.length === 0) return;

    const NAMES = {
      about: 'about', experience: 'field reports', credentials: 'credentials',
      projects: 'projects', skills: 'apparatus', contact: 'correspondence',
    };

    const counter = document.createElement('span');
    counter.id = 'tcaci-counter';
    counter.style.cssText = `
      margin-right: 18px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--ink-dim, #5a554d);
      transition: color 0.3s;
    `;
    counter.innerHTML = `<span style="color: var(--rouge);">§</span> 00 / ${String(sections.length).padStart(2, '0')} <span style="opacity:0.6">·</span> <span data-cn>—</span>`;
    const status = navInner.lastElementChild;
    if (status) navInner.insertBefore(counter, status);
    else navInner.appendChild(counter);
    const nameEl = counter.querySelector('[data-cn]');

    const visibilities = new Map();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => visibilities.set(e.target, e.intersectionRatio));
      // pick the section with the highest visibility
      let best = null, bestV = 0;
      sections.forEach(s => {
        const v = visibilities.get(s) || 0;
        if (v > bestV) { bestV = v; best = s; }
      });
      if (best && bestV > 0.15) {
        const idx = sections.indexOf(best) + 1;
        const name = NAMES[best.id] || best.id;
        counter.firstChild.nextSibling.textContent = ` ${String(idx).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')} `;
        nameEl.textContent = name;
        counter.style.color = 'var(--ink)';
      }
    }, { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] });
    sections.forEach(s => obs.observe(s));
  }

  /* ───────────────────────────────────────────────
     ⑫ RIGHT-CLICK · THE EDITOR'S NOTE
     ─────────────────────────────────────────────── */
  function initContextNote() {
    const pop = document.createElement('div');
    pop.id = 'tcaci-context';
    pop.style.cssText = `
      position: fixed; z-index: 9996;
      background: var(--paper, #f4f1ea);
      border: 1.5px solid var(--rule, #1a1817);
      box-shadow: 4px 4px 0 var(--rouge, #cc3a2e);
      padding: 14px 18px;
      min-width: 240px; max-width: 340px;
      display: none;
      font-family: 'Newsreader', serif;
    `;
    document.body.appendChild(pop);

    function hide() { pop.style.display = 'none'; }
    document.addEventListener('click', (e) => { if (!pop.contains(e.target)) hide(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
    addEventListener('scroll', hide, { passive: true });

    function annotationFor(target) {
      const cl = target.classList;
      const closest = (sel) => target.closest(sel);
      const txt = (target.textContent || '').trim();
      const tl = txt.toLowerCase();

      // Project mentions
      if (cl.contains('tx-proj')) {
        const p = target.dataset.proj;
        return ({
          wealthlens: { k: 'wealthlens', b: "The civic-data one. £17 trillion of UK wealth, 874 tests, ten cited datasets, zero opinions disguised as facts." },
          taskdeck:   { k: 'taskdeck',   b: "The local-first one. 5,300+ commits and 620+ PRs of stubbornness about who is actually in charge of your board." },
          metrix:     { k: 'metrix',     b: "The ambitious one. ~3,144 commits of opinions about backtests, plus an AI assistant that knows it is a tool." },
          navsentinel:{ k: 'navsentinel',b: "The security one. 112 Gym fixtures, zero remote lookups, every decision explainable." },
          npdl:       { k: 'npdl',       b: "The research one. Springer / SGAI-AI 2025. Cooperation emerges, defection spreads in clusters. Same instinct as the day job." },
        }[p]) || { k: 'project', b: "Yes, it's real. The repo is one click away." };
      }

      const tn = target.tagName;
      if (tn === 'H1') return { k: 'masthead', b: "The masthead has been quietly second-guessed seventeen times. This is version seventeen." };
      if (tn === 'H2') return { k: 'heading', b: "Section headings are the load-bearing prose. The editor reserves the right to revise by Q3." };
      if (tn === 'H3') return { k: 'subhead', b: "Subheads are where most of the actual argument lives. Read these twice." };
      if (cl.contains('hand') || cl.contains('margin-note')) return { k: 'marginalia', b: "If you are reading the handwritten bits, you are my favourite kind of reader." };
      if (cl.contains('stamp')) return { k: 'stamp', b: "Stamped in actual rouge ink. The metaphor is doing a lot of work here." };
      if (cl.contains('label')) return { k: 'label', b: "Yes, that is exactly how this is filed in the repo." };
      if (cl.contains('term-label') || closest('.term')) return { k: 'engineering log', b: "Real terminal output. The dim grey comments are real too. The editor cannot help himself." };
      if (cl.contains('fn')) return { k: 'footnote', b: "Footnotes are how I sneak the actual opinion past the editor." };
      if (cl.contains('pull-quote')) return { k: 'pull-quote', b: "Pulled from a draft no one asked to see. Now you have." };
      if (cl.contains('dropcap') || closest('.dropcap')) return { k: 'dropcap', b: "The dropcap is the most expensive piece of typography in this issue. Please appreciate accordingly." };
      if (closest('button, .btn') || tn === 'BUTTON') return { k: 'button', b: "Buttons are proposals. The button does nothing until you tell it to. We have rules around here." };
      if (closest('a')) return { k: 'link', b: "External link. Opens in a new tab. The editor refuses to hijack your back button." };
      if (tn === 'CODE' || closest('code')) return { k: 'code', b: "Real symbol names from the codebase. I do not invent stack chips." };
      if (/^[\d£€$]/.test(txt) && txt.length < 12) return { k: 'number', b: "The receipt for this number is on github. Right-click to verify." };
      if (closest('section h2, section h3')) return { k: 'heading', b: "A heading. Underlined in rouge for emphasis. Revisable by Q3." };
      if (closest('#about')) return { k: 'about', b: "About paragraphs run long because the alternative is to summarise, and the editor refuses." };
      if (closest('#projects')) return { k: 'projects', b: "Every project in this catalogue ships, has tests, and is auditable on github." };
      if (closest('#skills')) return { k: 'skills', b: "Self-assessed and honest-ish. The radar chart is conservative on purpose." };
      if (closest('#contact')) return { k: 'contact', b: "Mention 'audit log' in your subject line. It really does make my week." };

      return { k: 'marginalia', b: "Marginalia welcome. You are already here." };
    }

    document.addEventListener('contextmenu', (e) => {
      if (e.shiftKey) return; // shift+right-click = native menu
      // skip in form fields
      if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
      e.preventDefault();
      const note = annotationFor(e.target);
      pop.innerHTML = `
        <div style="font-family:'IBM Plex Sans',sans-serif; font-size:9px;
          letter-spacing:0.22em; text-transform:uppercase; color: var(--rouge);
          margin-bottom:6px; display:flex; justify-content:space-between; gap:12px;">
          <span>★ The Editor's Note ★</span>
          <span style="color: var(--ink-mute); font-weight:400; opacity:0.7;">${note.k}</span>
        </div>
        <div style="font-family:'Newsreader',serif; font-size:15.5px; line-height:1.5; color: var(--ink); font-style: italic;">
          ${note.b}
        </div>
        <div style="margin-top:12px; padding-top:8px; border-top:1px dashed var(--rule);
          font-family:'IBM Plex Mono',monospace; font-size:9px; letter-spacing:0.12em;
          color: var(--ink-mute); text-transform: uppercase; display:flex; justify-content:space-between;">
          <span>esc to close</span>
          <span>shift + right-click → native</span>
        </div>
      `;
      const w = 340, h = 160, m = 12;
      let x = e.clientX, y = e.clientY;
      if (x + w + m > innerWidth) x -= w;
      if (y + h + m > innerHeight) y -= h;
      pop.style.left = Math.max(m, x) + 'px';
      pop.style.top = Math.max(m, y) + 'px';
      pop.style.display = 'block';
    });

    const css = document.createElement('style');
    css.textContent = `@media print { #tcaci-context { display: none !important; } }`;
    document.head.appendChild(css);
  }

  /* ───────────────────────────────────────────────
     ⑬ CROSS-PROJECT HOVER HIGHLIGHT
     ─────────────────────────────────────────────── */
  function initCrossHighlight() {
    const PROJECTS = {
      wealthlens: /WealthLens/g,
      taskdeck:   /Taskdeck/g,
      metrix:     /Metrix/g,
      navsentinel:/NavSentinel/g,
      npdl:       /\bNPDL\b/g,
    };

    function shouldSkip(node) {
      let p = node.parentElement;
      while (p) {
        if (p.tagName === 'SCRIPT' || p.tagName === 'STYLE') return true;
        if (p.id === 'tcaci-context' || p.id === 'tcaci-cursor' ||
            p.id === 'tcaci-counter' || p.id === 'marquee' ||
            p.id === 'tcaci-boot' || p.id === 'tcaci-progress') return true;
        if (p.classList && p.classList.contains('tx-proj')) return true; // already wrapped
        p = p.parentElement;
      }
      return false;
    }

    function wrap(node) {
      if (node.nodeType === 3) {
        if (shouldSkip(node)) return;
        const text = node.nodeValue;
        let hasMatch = false;
        for (const re of Object.values(PROJECTS)) { re.lastIndex = 0; if (re.test(text)) { hasMatch = true; break; } }
        if (!hasMatch) return;

        let parts = [text];
        for (const [key, re] of Object.entries(PROJECTS)) {
          const next = [];
          for (const part of parts) {
            if (typeof part !== 'string') { next.push(part); continue; }
            let last = 0, m;
            re.lastIndex = 0;
            while ((m = re.exec(part)) !== null) {
              if (m.index > last) next.push(part.slice(last, m.index));
              const span = document.createElement('span');
              span.className = 'tx-proj';
              span.dataset.proj = key;
              span.textContent = m[0];
              next.push(span);
              last = re.lastIndex;
            }
            if (last < part.length) next.push(part.slice(last));
          }
          parts = next;
        }

        const frag = document.createDocumentFragment();
        for (const p of parts) {
          if (typeof p === 'string') frag.appendChild(document.createTextNode(p));
          else frag.appendChild(p);
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        if (shouldSkip(node)) return;
        const kids = [...node.childNodes];
        kids.forEach(wrap);
      }
    }

    const root = document.getElementById('root');
    if (root) wrap(root);

    document.addEventListener('mouseover', (e) => {
      if (!e.target.classList || !e.target.classList.contains('tx-proj')) return;
      const proj = e.target.dataset.proj;
      document.querySelectorAll(`.tx-proj[data-proj="${proj}"]`).forEach(el => el.classList.add('is-active'));
    });
    document.addEventListener('mouseout', (e) => {
      if (!e.target.classList || !e.target.classList.contains('tx-proj')) return;
      document.querySelectorAll('.tx-proj.is-active').forEach(el => el.classList.remove('is-active'));
    });

    const css = document.createElement('style');
    css.textContent = `
      .tx-proj { transition: color 0.18s, background 0.18s, box-shadow 0.18s; }
      .tx-proj.is-active {
        color: var(--rouge, #cc3a2e) !important;
        background: rgba(204, 58, 46, 0.10);
        box-shadow: inset 0 -2px 0 var(--rouge, #cc3a2e);
      }
      @media print { .tx-proj.is-active { background: transparent; box-shadow: none; } }
    `;
    document.head.appendChild(css);
  }

  /* ───────────────────────────────────────────────
     ⑭ SECRET KEYWORD CODES (audit / press / dark / lychee / boring)
     ─────────────────────────────────────────────── */
  function initSecretCodes() {
    function toast(text, tone) {
      const t = document.createElement('div');
      t.style.cssText = `
        position: fixed; bottom: 60px; right: 16px;
        background: var(--ink, #161514);
        color: var(--paper, #f4f1ea);
        font-family: 'IBM Plex Mono', monospace; font-size: 11px;
        letter-spacing: 0.18em; text-transform: uppercase;
        padding: 9px 14px;
        box-shadow: 4px 4px 0 ${tone === 'rouge' ? 'var(--rouge)' : tone === 'forest' ? 'var(--forest)' : 'var(--rouge)'};
        z-index: 9995;
        animation: tcaci-hint 2.6s ease-out forwards;
      `;
      t.textContent = text;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 2700);
    }

    const codes = {
      audit: () => {
        const re = /audit ?log/gi;
        let found = 0;
        document.querySelectorAll('body *').forEach(el => {
          if (el.children.length !== 0) return;
          const txt = el.textContent || '';
          if (re.test(txt)) {
            found++;
            const prev = el.style.background;
            el.style.transition = 'background 0.8s ease';
            el.style.background = 'rgba(204, 58, 46, 0.18)';
            setTimeout(() => { el.style.background = prev || ''; }, 2400);
          }
        });
        toast(`audit log · ${found} mention${found === 1 ? '' : 's'} flagged`, 'rouge');
      },
      press: () => {
        document.body.style.transition = 'transform 0.04s linear';
        let frames = 0;
        const id = setInterval(() => {
          frames++;
          const dx = (Math.random() * 6 - 3).toFixed(1);
          const dy = (Math.random() * 6 - 3).toFixed(1);
          document.body.style.transform = `translate(${dx}px, ${dy}px)`;
          if (frames > 18) {
            clearInterval(id);
            document.body.style.transform = '';
          }
        }, 45);
        toast('★ press run ★', 'rouge');
      },
      dark: () => {
        const cur = document.documentElement.style.filter;
        const on = cur && cur.includes('invert');
        document.documentElement.style.filter = on ? '' : 'invert(1) hue-rotate(180deg)';
        toast(on ? 'morning edition · paper' : 'late edition · dark mode', 'forest');
      },
      lychee: () => {
        toast('rhymes with lychee · thank you for noticing', 'rouge');
      },
      boring: () => {
        sessionStorage.removeItem('tcaci_boot_seen');
        toast('reloading the press…', 'rouge');
        setTimeout(() => location.reload(), 700);
      },

      /* ── retro arcade easter eggs ── */
      sega: () => {
        const ov = document.createElement('div');
        ov.style.cssText = `
          position:fixed; inset:0; z-index:9994; pointer-events:none;
          background: radial-gradient(circle at 50% 50%, #2451c6 0%, #0a1738 70%);
          display:flex; align-items:center; justify-content:center;
          animation: sega-flash 1.6s ease-out forwards;
        `;
        ov.innerHTML = `
          <div style="font-family: Impact, 'Arial Black', sans-serif; font-style: italic;
            font-size: clamp(72px, 14vw, 180px); color: #fff;
            letter-spacing: -0.04em; text-shadow: 0 6px 0 #0a1738, 0 8px 24px rgba(0,0,0,0.6);
            animation: sega-bounce 1.4s cubic-bezier(0.6, -0.2, 0.4, 1.4) forwards;">
            SEGA
          </div>
        `;
        document.body.appendChild(ov);
        setTimeout(() => ov.remove(), 1700);
        toast('★ sega · console intro ★', 'rouge');
      },
      pacman: () => {
        const pm = document.createElement('div');
        const y = 80 + Math.random() * (innerHeight - 200);
        pm.style.cssText = `
          position:fixed; top:${y}px; left:-60px; width:48px; height:48px; z-index:9994;
          pointer-events:none;
          animation: pac-walk 4s linear forwards;
        `;
        pm.innerHTML = `
          <svg viewBox="0 0 48 48" width="48" height="48">
            <defs>
              <clipPath id="pac-mouth">
                <polygon points="24,24 56,8 56,40">
                  <animate attributeName="points" dur="0.34s" repeatCount="indefinite"
                    values="24,24 56,8 56,40;24,24 56,22 56,26;24,24 56,8 56,40"/>
                </polygon>
              </clipPath>
            </defs>
            <circle cx="24" cy="24" r="22" fill="#ffcc00" clip-path="url(#pac-mouth)"/>
            <circle cx="24" cy="24" r="22" fill="none" stroke="#0a0a0a" stroke-width="1" opacity="0.2"/>
            <circle cx="30" cy="14" r="2" fill="#0a0a0a"/>
          </svg>
        `;
        document.body.appendChild(pm);
        // dots being eaten
        for (let i = 0; i < 14; i++) {
          const dot = document.createElement('div');
          dot.style.cssText = `
            position:fixed; top:${y + 16}px; left:${(i + 1) * (innerWidth / 16)}px;
            width: 8px; height: 8px; border-radius: 50%; background: #ffe27a;
            z-index:9993; pointer-events:none;
            box-shadow: 0 0 8px rgba(255, 226, 122, 0.7);
            animation: pac-dot ${4 + i * 0.05}s linear forwards;
            opacity: 0;
          `;
          document.body.appendChild(dot);
          setTimeout(() => dot.remove(), 5000);
        }
        setTimeout(() => pm.remove(), 4200);
        toast('★ namco · waka waka waka ★', 'rouge');
      },
      namco: () => codes.pacman(),
      hadouken: () => {
        const fb = document.createElement('div');
        const y = innerHeight * 0.55;
        fb.style.cssText = `
          position:fixed; top:${y}px; left:-100px; width:120px; height:90px;
          z-index:9994; pointer-events:none;
          animation: hadouken-fly 1.2s linear forwards;
          filter: drop-shadow(0 0 18px rgba(80, 180, 255, 0.85));
        `;
        fb.innerHTML = `
          <svg viewBox="0 0 120 90" width="100%" height="100%">
            <defs>
              <radialGradient id="ha-grad" cx="35%" cy="50%">
                <stop offset="0%" stop-color="#fff"/>
                <stop offset="40%" stop-color="#9ed7ff"/>
                <stop offset="100%" stop-color="#1a6dc4"/>
              </radialGradient>
            </defs>
            <ellipse cx="55" cy="45" rx="48" ry="32" fill="url(#ha-grad)"/>
            <ellipse cx="35" cy="45" rx="20" ry="22" fill="#fff" opacity="0.85"/>
            <path d="M 0 45 Q 30 30 60 45 Q 30 60 0 45 Z" fill="#bfe2ff" opacity="0.6"/>
          </svg>
        `;
        document.body.appendChild(fb);
        setTimeout(() => fb.remove(), 1300);
        toast('★ hadouken ★', 'rouge');
      },
      shoryuken: () => {
        const x = innerWidth * 0.5;
        const flame = document.createElement('div');
        flame.style.cssText = `
          position:fixed; left:${x - 60}px; bottom:-120px; width:120px; height:240px;
          z-index:9994; pointer-events:none;
          animation: shoryu-rise 1.1s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
        `;
        flame.innerHTML = `
          <svg viewBox="0 0 120 240" width="100%" height="100%">
            <defs>
              <linearGradient id="sh-grad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stop-color="#cc3a2e"/>
                <stop offset="50%" stop-color="#ffb454"/>
                <stop offset="100%" stop-color="#fff7d8"/>
              </linearGradient>
            </defs>
            <path d="M 60 240 Q 20 180 40 120 Q 10 80 60 40 Q 80 80 100 130 Q 80 180 60 240 Z"
              fill="url(#sh-grad)"/>
            <path d="M 60 230 Q 40 180 55 130 Q 50 90 60 60 Q 70 100 70 150 Q 65 200 60 230 Z"
              fill="#fff" opacity="0.55"/>
          </svg>
        `;
        document.body.appendChild(flame);
        setTimeout(() => flame.remove(), 1200);
        toast('★ shoryuken ★', 'rouge');
      },
      capcom: () => {
        const banner = document.createElement('div');
        banner.style.cssText = `
          position:fixed; top:0; left:0; right:0; bottom:0; z-index:9994; pointer-events:none;
          display:flex; align-items:center; justify-content:center;
          background: rgba(20, 20, 30, 0.0);
          animation: fight-pulse 1.3s ease-out forwards;
        `;
        banner.innerHTML = `
          <div style="font-family: Impact, 'Arial Black', sans-serif;
            font-size: clamp(80px, 18vw, 260px); color: #ffd84a;
            -webkit-text-stroke: 4px #cc3a2e;
            text-shadow: 0 8px 0 #6b1a14, 0 12px 28px rgba(0,0,0,0.6);
            letter-spacing: -0.02em;
            animation: fight-zoom 1.2s cubic-bezier(0.2, 0.9, 0.2, 1) forwards;">
            FIGHT!
          </div>
        `;
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 1400);
        toast('★ capcom · round 1 ★', 'rouge');
      },
      sonic: () => {
        const blur = document.createElement('div');
        const y = 100 + Math.random() * (innerHeight - 300);
        blur.style.cssText = `
          position:fixed; top:${y}px; left:-200px;
          width: 220px; height: 60px;
          z-index: 9994; pointer-events:none;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 154, 230, 0.0) 10%,
            rgba(0, 154, 230, 0.65) 60%, #1f9dff 95%, #fff 100%);
          filter: blur(0.5px);
          animation: sonic-dash 0.6s linear forwards;
        `;
        document.body.appendChild(blur);
        setTimeout(() => blur.remove(), 700);
        toast('★ sega · gotta go fast ★', 'rouge');
      },
      mario: () => {
        const x = Math.random() * (innerWidth - 60) + 30;
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const m = document.createElement('div');
            m.style.cssText = `
              position:fixed; left:${x + i * 12}px; bottom:20px;
              z-index:9994; pointer-events:none;
              font-family: monospace; font-size: 24px;
              color: ${['#e44b56','#ffcc00','#3a9ee0'][i]};
              animation: mario-hop 1.2s ease-out forwards;
              text-shadow: 0 2px 0 rgba(0,0,0,0.5);
            `;
            m.textContent = ['▲','★','◆'][i];
            document.body.appendChild(m);
            setTimeout(() => m.remove(), 1300);
          }, i * 130);
        }
        toast('★ +1up · nintendo ★', 'forest');
      },
      fatality: () => {
        const fl = document.createElement('div');
        fl.style.cssText = `
          position:fixed; inset:0; z-index:9994; pointer-events:none;
          background: radial-gradient(circle at 50% 50%, rgba(204, 58, 46, 0.0), rgba(80, 0, 0, 0.85));
          display:flex; align-items:center; justify-content:center;
          animation: fatal-flash 1.6s ease-out forwards;
        `;
        fl.innerHTML = `
          <div style="font-family: Impact, sans-serif;
            font-size: clamp(60px, 12vw, 140px); color: #ff2030;
            letter-spacing: 0.05em; text-shadow: 0 0 20px #ff2030, 0 0 60px #6b0a14;
            animation: fatal-shake 0.18s steps(2) 5;">
            FINISH HIM
          </div>
        `;
        document.body.appendChild(fl);
        setTimeout(() => fl.remove(), 1700);
        toast('★ midway · mortal kombat ★', 'rouge');
      },
      tatsu: () => {
        const sp = document.createElement('div');
        sp.style.cssText = `
          position:fixed; left:50%; top:50%; width:140px; height:140px;
          margin-left:-70px; margin-top:-70px;
          z-index:9994; pointer-events:none;
          animation: tatsu-spin 1s linear forwards;
        `;
        sp.innerHTML = `
          <svg viewBox="-70 -70 140 140" width="100%" height="100%">
            <g fill="none" stroke="#ffb454" stroke-width="3">
              <path d="M 0 -50 Q 50 -30 50 0 Q 30 50 0 50 Q -50 30 -50 0 Q -30 -50 0 -50 Z" opacity="0.85"/>
              <path d="M 0 -30 Q 30 -20 30 0 Q 20 30 0 30 Q -30 20 -30 0 Q -20 -30 0 -30 Z" opacity="0.5"/>
            </g>
          </svg>
        `;
        document.body.appendChild(sp);
        setTimeout(() => sp.remove(), 1100);
        toast('★ tatsumaki ★', 'rouge');
      },
      konami: () => triggerKonami(),
      cheat: () => triggerKonami(),
    };

    function triggerKonami() {
      if (document.documentElement.dataset.cheatOn === '1') return;
      document.documentElement.dataset.cheatOn = '1';

      // arcade border
      const border = document.createElement('div');
      border.id = 'tcaci-arcade-frame';
      border.style.cssText = `
        position:fixed; inset:0; z-index:60; pointer-events:none;
        border: 4px double #cc3a2e;
        box-shadow: inset 0 0 0 8px rgba(11,20,28,0.0),
                    inset 0 0 0 14px rgba(204, 58, 46, 0.35),
                    inset 0 0 60px rgba(204, 58, 46, 0.25);
        animation: arcade-glow 2.4s ease-in-out infinite alternate;
      `;
      document.body.appendChild(border);

      // HUD pill
      const hud = document.createElement('div');
      hud.id = 'tcaci-arcade-hud';
      hud.style.cssText = `
        position:fixed; bottom: 16px; left: 16px; z-index: 9990;
        font-family: 'IBM Plex Mono', monospace; font-size: 11px;
        letter-spacing: 0.16em; text-transform: uppercase;
        background: #0e1418; color: #ffd84a;
        padding: 10px 14px; border: 2px solid #cc3a2e;
        box-shadow: 0 0 0 2px #0e1418, 4px 4px 0 #cc3a2e;
        display: flex; gap: 14px; align-items: center;
      `;
      hud.innerHTML = `
        <span><span style="color:#7cf4b8">●</span> CHEAT MODE</span>
        <span style="color:#6fc3df">1UP · 30</span>
        <span style="color:#ff6b7a">HI · 999900</span>
        <span style="color:#fff;opacity:0.5">PRESS ESC TO QUIT</span>
      `;
      document.body.appendChild(hud);

      // Ghost trail follows cursor
      const ghosts = ['#ff4d4d','#ff9aff','#7adfff','#ffb454'];
      let trail = [];
      let mx = -100, my = -100;
      const handler = (e) => { mx = e.clientX; my = e.clientY; };
      window.addEventListener('pointermove', handler, { passive: true });

      let ghostId;
      let g = 0;
      function spawnGhost() {
        const col = ghosts[g++ % ghosts.length];
        const node = document.createElement('div');
        node.style.cssText = `
          position:fixed; left:${mx - 14}px; top:${my - 14}px;
          width:28px; height:28px; z-index:9989; pointer-events:none;
          opacity:0.85;
          transition: opacity 0.9s ease-out, transform 0.9s ease-out;
        `;
        node.innerHTML = `
          <svg viewBox="0 0 28 28" width="28" height="28">
            <path d="M 2 16 V 26 L 6 22 L 10 26 L 14 22 L 18 26 L 22 22 L 26 26 V 16 A 12 12 0 0 0 2 16 Z" fill="${col}"/>
            <circle cx="10" cy="14" r="3" fill="#fff"/>
            <circle cx="20" cy="14" r="3" fill="#fff"/>
            <circle cx="11" cy="15" r="1.5" fill="#0a1738"/>
            <circle cx="21" cy="15" r="1.5" fill="#0a1738"/>
          </svg>
        `;
        document.body.appendChild(node);
        requestAnimationFrame(() => {
          node.style.opacity = '0';
          node.style.transform = `translateY(-30px) scale(0.6)`;
        });
        setTimeout(() => node.remove(), 950);
      }
      ghostId = setInterval(spawnGhost, 120);

      function quit(e) {
        if (e && e.key !== 'Escape') return;
        clearInterval(ghostId);
        window.removeEventListener('pointermove', handler);
        window.removeEventListener('keydown', quit);
        border.remove(); hud.remove();
        document.documentElement.dataset.cheatOn = '';
        toast('★ game over ★', 'rouge');
      }
      window.addEventListener('keydown', quit);
      toast('★ konami · 30 lives ★', 'rouge');
    }

    let buf = '';
    let bufT = null;
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
      if (e.key.length !== 1 || !/^[a-z]$/i.test(e.key)) return;
      buf += e.key.toLowerCase();
      buf = buf.slice(-20);
      clearTimeout(bufT);
      bufT = setTimeout(() => buf = '', 1500);
      for (const [code, fn] of Object.entries(codes)) {
        if (buf.endsWith(code)) { fn(); buf = ''; break; }
      }
    });

    /* ── Konami arrow-key listener: ↑↑↓↓←→←→ba ── */
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let kIdx = 0;
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
      const need = KONAMI[kIdx];
      const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === need) {
        kIdx++;
        if (kIdx === KONAMI.length) { triggerKonami(); kIdx = 0; }
      } else {
        kIdx = (got === KONAMI[0]) ? 1 : 0;
      }
    });

    const css = document.createElement('style');
    css.textContent = `
      @keyframes tcaci-hint {
        0% { opacity: 0; transform: translateY(8px); }
        12% { opacity: 1; transform: translateY(0); }
        85% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-4px); }
      }
      @keyframes sega-flash {
        0% { opacity: 0; }
        12% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; }
      }
      @keyframes sega-bounce {
        0% { transform: scale(0.2) translateY(20px); opacity: 0; }
        45% { transform: scale(1.2); opacity: 1; }
        65% { transform: scale(0.95); }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes pac-walk {
        from { transform: translateX(0); }
        to { transform: translateX(${window.innerWidth + 120}px); }
      }
      @keyframes pac-dot {
        0%, 30% { opacity: 1; }
        65% { opacity: 1; transform: scale(1); }
        70% { opacity: 0; transform: scale(0.2); }
        100% { opacity: 0; }
      }
      @keyframes hadouken-fly {
        from { transform: translateX(0) scaleX(1); }
        to { transform: translateX(${window.innerWidth + 200}px) scaleX(1.1); }
      }
      @keyframes shoryu-rise {
        0% { transform: translateY(120px) scale(0.6); opacity: 0; }
        20% { opacity: 1; }
        100% { transform: translateY(-${window.innerHeight}px) scale(1.1); opacity: 0; }
      }
      @keyframes fight-pulse {
        0% { background: rgba(20,20,30,0); }
        20% { background: rgba(20,20,30,0.55); }
        90% { background: rgba(20,20,30,0.2); }
        100% { background: rgba(20,20,30,0); }
      }
      @keyframes fight-zoom {
        0% { transform: scale(0.2) rotate(-12deg); opacity: 0; }
        25% { transform: scale(1.3) rotate(2deg); opacity: 1; }
        45% { transform: scale(1) rotate(-1deg); }
        100% { transform: scale(1.15) rotate(0); opacity: 0; }
      }
      @keyframes sonic-dash {
        from { transform: translateX(0); }
        to { transform: translateX(${window.innerWidth + 300}px); }
      }
      @keyframes mario-hop {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        50% { transform: translateY(-${window.innerHeight * 0.7}px) rotate(180deg); opacity: 1; }
        100% { transform: translateY(-${window.innerHeight + 60}px) rotate(360deg); opacity: 0; }
      }
      @keyframes fatal-flash {
        0% { opacity: 0; }
        15% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; }
      }
      @keyframes fatal-shake { 0%,100% { transform: translate(0,0)} 25% { transform: translate(-3px, 1px)} 50% { transform: translate(3px, -2px)} 75% { transform: translate(-2px, 2px)} }
      @keyframes tatsu-spin {
        0% { transform: rotate(0deg) scale(0.4); opacity: 0; }
        30% { opacity: 1; }
        100% { transform: rotate(720deg) scale(2); opacity: 0; }
      }
      @keyframes arcade-glow {
        from { box-shadow: inset 0 0 0 14px rgba(204, 58, 46, 0.35), inset 0 0 60px rgba(204, 58, 46, 0.25); }
        to   { box-shadow: inset 0 0 0 14px rgba(255, 184, 84, 0.45), inset 0 0 80px rgba(255, 184, 84, 0.35); }
      }
    `;
    document.head.appendChild(css);
  }

  /* ───────────────────────────────────────────────
     ⑮ ARCADE MINI-GAME — ghosts chase your cursor.
     · Live HUD: LIVES · SCORE · STAGE
     · Ghosts spawn every ~10s, chase the cursor, click them to kill (+50)
     · Catching your cursor → −1 life, screen flash
     · 0 lives → GAME OVER screen, INSERT COIN to restart
     · Each new section bumps the stage with an arcade banner
     · BOSS appears when you enter the contact section
     · Section transitions get a brief retro-banner reveal
     ─────────────────────────────────────────────── */
  function initArcadeChaos() {
    if (REDUCED) return;

    // ── Persistent game state ──
    const STATE = {
      lives: 3,
      maxLives: 3,
      score: 0,
      stage: 1,
      combo: 0,
      comboT: null,
      kills: 0,
      catches: 0,
      coins: 0,
      multiplier: 1,
      multUntil: 0,
      shieldUntil: 0,
      slowUntil: 0,
      achievements: new Set(),
      seenSections: new Set(),
      paused: false,
      gameOver: false,
      arcadeOff: false,
    };
    window.__tcaciGame = STATE; // dev hook

    const SECTION_NAMES = {
      about: 'ABOUT THE EDITOR',
      experience: 'FIELD REPORTS',
      credentials: 'CREDENTIALS',
      projects: 'PROJECTS',
      skills: 'APPARATUS',
      contact: 'CORRESPONDENCE',
    };
    const GHOST_COLORS = ['#ff4d4d','#ff9aff','#7adfff','#ffb454'];

    // ── HUD ──
    const hud = document.createElement('div');
    hud.id = 'tcaci-coin-hud';
    hud.style.cssText = `
      position: fixed; bottom: 14px; left: 14px; z-index: 9988;
      font-family: 'IBM Plex Mono', monospace; font-size: 11px;
      letter-spacing: 0.14em; color: var(--ink, #161514);
      background: rgba(244, 241, 234, 0.94);
      border: 1.5px solid var(--ink, #161514);
      box-shadow: 3px 3px 0 var(--rouge, #cc3a2e);
      padding: 8px 12px;
      display: flex; gap: 12px; align-items: center;
      pointer-events: none;
      transition: box-shadow 0.2s, transform 0.2s;
    `;
    document.body.appendChild(hud);
    function renderHUD() {
      const hearts = Array.from({ length: STATE.maxLives }, (_, i) =>
        i < STATE.lives
          ? `<span style="color:#cc3a2e;">♥</span>`
          : `<span style="color:rgba(0,0,0,0.18);">♡</span>`
      ).join('');
      const now = Date.now();
      const shieldOn = now < STATE.shieldUntil;
      const slowOn   = now < STATE.slowUntil;
      const multOn   = now < STATE.multUntil;
      const buffs = [
        shieldOn ? `<span title="Shield" style="color:#3a9ee0;">⛨</span>` : '',
        slowOn   ? `<span title="Bullet time" style="color:#7adfff;">❄</span>` : '',
        multOn   ? `<span title="2× score" style="color:#ffd84a;">2×</span>` : '',
      ].filter(Boolean).join(' ');
      hud.innerHTML = `
        <span style="color: var(--rouge, #cc3a2e); font-weight: 700;">P1</span>
        <span data-lives>${hearts}</span>
        <span style="opacity:0.35">│</span>
        <span data-score style="color: var(--ink, #161514);">${String(STATE.score).padStart(5, '0')}</span>
        <span style="opacity:0.35">│</span>
        <span style="color:#b08a2e; font-weight:700;">¢${String(STATE.coins).padStart(2, '0')}</span>
        <span style="opacity:0.35">│</span>
        <span data-stage style="color: var(--forest, #1a4d3a);">S ${String(STATE.stage).padStart(2, '0')}</span>
        <span style="opacity:0.35">│</span>
        <span style="color: var(--rouge, #cc3a2e); font-size: 10px; letter-spacing: 0.08em;">▲ ○ ✕ ▢</span>
        ${STATE.combo > 1 ? `<span style="opacity:0.35">│</span><span style="color:#ffb454; font-weight:700;">×${STATE.combo}</span>` : ''}
        ${buffs ? `<span style="opacity:0.35">│</span>${buffs}` : ''}
      `;
    }
    renderHUD();

    // ── Cursor tracking ──
    let cx = -200, cy = -200;
    addEventListener('pointermove', (e) => { cx = e.clientX; cy = e.clientY; }, { passive: true });

    // ── Ghosts ──
    const ghosts = [];
    function spawnGhost(opts = {}) {
      if (STATE.gameOver || STATE.paused || STATE.arcadeOff) return;
      const side = Math.floor(Math.random() * 4);
      let x, y;
      const margin = 40;
      if (side === 0) { x = -margin; y = Math.random() * innerHeight; }
      else if (side === 1) { x = innerWidth + margin; y = Math.random() * innerHeight; }
      else if (side === 2) { x = Math.random() * innerWidth; y = -margin; }
      else { x = Math.random() * innerWidth; y = innerHeight + margin; }

      const isBoss = !!opts.boss;
      const color = opts.color || (isBoss ? '#8b3df0' : GHOST_COLORS[Math.floor(Math.random() * GHOST_COLORS.length)]);
      const size = opts.size || (isBoss ? 80 : 36);
      const speedBase = isBoss
        ? 0.9
        : 0.55 + STATE.stage * 0.18 + Math.random() * 0.25;
      const speed = speedBase * (opts.speedMul || 1);
      const hp = opts.hp != null ? opts.hp : (isBoss ? 4 : 1);
      const kind = opts.kind || (isBoss ? 'boss' : 'ghost');

      // Movement mode: bosses always chase, others random
      let mode = 'chase', patrol = null, wander = null;
      if (!isBoss) {
        const modeRoll = Math.random();
        if (modeRoll < 0.25) {
          mode = 'chase';
        } else if (modeRoll < 0.75) {
          mode = 'patrol';
          const patterns = ['linear', 'slalom', 'zigzag'];
          const pattern = patterns[Math.floor(Math.random() * patterns.length)];
          let angle;
          if (side === 0) angle = (Math.random() * 0.6 - 0.3) * Math.PI;
          else if (side === 1) angle = Math.PI + (Math.random() * 0.6 - 0.3) * Math.PI;
          else if (side === 2) angle = Math.PI / 2 + (Math.random() * 0.6 - 0.3) * Math.PI;
          else angle = -Math.PI / 2 + (Math.random() * 0.6 - 0.3) * Math.PI;
          patrol = { pattern, angle, phase: Math.random() * 100 };
        } else {
          mode = 'wander';
          wander = { angle: Math.random() * Math.PI * 2, timer: 0, interval: 50 + Math.random() * 100 };
        }
      }

      const el = document.createElement('div');
      el.className = 'tcaci-ghost';
      el.dataset.kind = kind;
      el.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        z-index: 70; cursor: crosshair;
        pointer-events: auto;
        transition: transform 0.12s ease;
        filter: drop-shadow(0 3px 6px rgba(0,0,0,0.25));
        ${isBoss ? `animation: boss-pulse 1.4s ease-in-out infinite;` : ''}
      `;
      el.innerHTML = opts.svg || `
        <svg viewBox="0 0 36 36" width="100%" height="100%" style="overflow:visible;">
          <path d="M 3 20 V 33 L 6 29 L 10 33 L 14 29 L 18 33 L 22 29 L 26 33 L 30 29 L 33 33 V 20 A 15 15 0 0 0 3 20 Z" fill="${color}"/>
          <circle cx="12" cy="18" r="4.2" fill="#fff"/>
          <circle cx="24" cy="18" r="4.2" fill="#fff"/>
          <circle class="eye eye-l" cx="13" cy="19" r="2" fill="#0a1738"/>
          <circle class="eye eye-r" cx="25" cy="19" r="2" fill="#0a1738"/>
          ${isBoss ? `<path d="M 8 13 L 11 9 L 14 13 M 18 11 L 21 7 L 24 11 M 28 13 L 31 9" stroke="#fff" stroke-width="1.5" fill="none"/>` : ''}
        </svg>
      `;
      document.body.appendChild(el);

      const ghost = { el, x, y, color, speed, alive: true, age: 0, diedAt: 0, isBoss, hp, size, kind, points: opts.points, mode, patrol, wander };

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!ghost.alive) return;
        ghost.hp--;
        if (ghost.hp > 0) {
          // boss hit feedback
          el.style.transform = 'scale(1.18)';
          setTimeout(() => { if (ghost.alive) el.style.transform = ''; }, 140);
          STATE.score += 25;
          renderHUD();
        } else {
          killGhost(ghost, e.clientX, e.clientY);
        }
      });

      ghosts.push(ghost);
    }

    function killGhost(g, sx, sy) {
      g.alive = false;
      g.diedAt = Date.now();
      STATE.kills++;
      STATE.combo++;
      clearTimeout(STATE.comboT);
      STATE.comboT = setTimeout(() => { STATE.combo = 0; renderHUD(); }, 2500);
      const basePts = g.points != null ? g.points : (g.isBoss ? 500 : 50);
      const multBuff = Date.now() < STATE.multUntil ? 2 : 1;
      const pts = basePts * Math.max(1, STATE.combo) * multBuff;
      STATE.score += pts;
      renderHUD();
      window.dispatchEvent(new CustomEvent('tcaci:kill', { detail: { ghost: g, pts } }));

      // explode
      g.el.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1.4), opacity 0.45s ease';
      g.el.style.transform = `scale(0) rotate(720deg)`;
      g.el.style.opacity = '0';
      setTimeout(() => g.el.remove(), 480);

      // pop
      const pop = document.createElement('div');
      pop.style.cssText = `
        position: fixed; left: ${(sx || g.x) - 20}px; top: ${(sy || g.y) - 24}px;
        z-index: 9989; pointer-events: none;
        font-family: 'IBM Plex Mono', monospace; font-weight: 700;
        font-size: ${g.isBoss ? 26 : 16}px; color: #ffd84a;
        text-shadow: 0 2px 0 #6b1a14, 0 0 16px rgba(255, 216, 74, 0.7);
        animation: score-pop 1s ease-out forwards;
        letter-spacing: 0.08em;
      `;
      pop.textContent = `+${pts}`;
      document.body.appendChild(pop);
      setTimeout(() => pop.remove(), 1050);

      // burst particles
      for (let i = 0; i < (g.isBoss ? 12 : 6); i++) {
        const p = document.createElement('div');
        const ang = (Math.PI * 2 * i) / (g.isBoss ? 12 : 6);
        const dist = 40 + Math.random() * 30;
        p.style.cssText = `
          position: fixed; left: ${g.x + g.size / 2 - 3}px; top: ${g.y + g.size / 2 - 3}px;
          width: 6px; height: 6px; background: ${g.color};
          border-radius: 50%;
          z-index: 9988; pointer-events: none;
          transition: transform 0.7s ease-out, opacity 0.7s ease-out;
        `;
        document.body.appendChild(p);
        requestAnimationFrame(() => {
          p.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`;
          p.style.opacity = '0';
        });
        setTimeout(() => p.remove(), 750);
      }
    }

    function loseLife() {
      if (STATE.gameOver) return;
      if (Date.now() < STATE.shieldUntil) {
        // shield absorbs hit — bounce + spark
        const flash = document.createElement('div');
        flash.style.cssText = `
          position: fixed; inset: 0; background: rgba(58, 158, 224, 0.16);
          z-index: 9990; pointer-events: none;
          animation: hit-flash 0.35s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 380);
        window.dispatchEvent(new CustomEvent('tcaci:shield-block'));
        return;
      }
      STATE.lives--;
      STATE.catches++;
      STATE.combo = 0;
      renderHUD();
      window.dispatchEvent(new CustomEvent('tcaci:hit'));
      hud.style.boxShadow = '3px 3px 0 #ff2030';
      hud.style.transform = 'translateX(-3px)';
      setTimeout(() => {
        hud.style.boxShadow = '';
        hud.style.transform = '';
      }, 200);

      // red flash
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: fixed; inset: 0; background: rgba(204, 58, 46, 0.18);
        z-index: 9990; pointer-events: none;
        animation: hit-flash 0.4s ease-out forwards;
      `;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 450);

      if (STATE.lives <= 0) gameOver();
    }

    function gameOver() {
      STATE.gameOver = true;
      // kill all ghosts
      ghosts.forEach(g => { if (g.alive) { g.alive = false; g.el.remove(); } });

      const ov = document.createElement('div');
      ov.id = 'tcaci-gameover';
      ov.style.cssText = `
        position: fixed; inset: 0; z-index: 9995;
        background: rgba(11, 20, 28, 0.85);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
        pointer-events: auto;
        animation: gameover-in 0.5s ease-out forwards;
      `;
      ov.innerHTML = `
        <div style="font-family: Impact, sans-serif; font-size: clamp(60px, 12vw, 150px);
          color: #ff2030; text-shadow: 0 0 30px #ff2030, 0 0 80px #6b0a14;
          letter-spacing: 0.06em; animation: fatal-shake 0.18s steps(2) 6 both;
          line-height: 0.9;">
          GAME OVER
        </div>
        <div style="font-family: 'Newsreader', serif; font-style: italic;
          color: #d8e0e8; margin-top: 18px; font-size: clamp(16px, 2vw, 22px);
          opacity: 0.85; letter-spacing: 0.04em;">
          — caught ${STATE.catches} times · vanquished ${STATE.kills} —
        </div>
        <div style="font-family: 'IBM Plex Mono', monospace; color: #fff; margin-top: 24px;
          font-size: 13px; letter-spacing: 0.18em; display: flex; gap: 24px;">
          <span>FINAL SCORE</span>
          <span style="color:#ffd84a; font-weight:700;">${String(STATE.score).padStart(5, '0')}</span>
        </div>
        <div style="margin-top: 40px; display: flex; gap: 12px;">
          <button class="btn" style="border-color: #ffd84a; color: #ffd84a; pointer-events:auto;" data-restart>
            ↻ INSERT COIN
          </button>
          <button class="btn" style="border-color: rgba(255,255,255,0.4); color: rgba(255,255,255,0.7); pointer-events:auto;" data-quit>
            ✕ QUIT
          </button>
        </div>
        <div style="margin-top: 36px; font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          color: rgba(255,255,255,0.4); letter-spacing: 0.24em;">
          PRESS R TO RESTART · ESC TO QUIT
        </div>
      `;
      document.body.appendChild(ov);

      function restart() {
        STATE.lives = STATE.maxLives;
        STATE.score = 0;
        STATE.stage = 1;
        STATE.combo = 0;
        STATE.kills = 0;
        STATE.catches = 0;
        STATE.gameOver = false;
        renderHUD();
        ov.remove();
        window.removeEventListener('keydown', keyH);
      }
      function quit() {
        STATE.paused = true;
        ov.remove();
        window.removeEventListener('keydown', keyH);
      }
      function keyH(e) {
        if (e.key === 'r' || e.key === 'R' || e.key === 'Enter') restart();
        else if (e.key === 'Escape') quit();
      }
      ov.querySelector('[data-restart]').addEventListener('click', restart);
      ov.querySelector('[data-quit]').addEventListener('click', quit);
      window.addEventListener('keydown', keyH);
    }

    // ── Animation loop ──
    function tick() {
      if (!STATE.gameOver && !STATE.paused && !STATE.arcadeOff) {
        const now = Date.now();
        const slowMul = now < STATE.slowUntil ? 0.32 : 1;
        const shieldOn = now < STATE.shieldUntil;
        for (let i = ghosts.length - 1; i >= 0; i--) {
          const g = ghosts[i];
          if (!g.alive) {
            if (g.diedAt && now - g.diedAt > 2000) ghosts.splice(i, 1);
            continue;
          }
          g.age++;
          let dx = cx - (g.x + g.size / 2);
          let dy = cy - (g.y + g.size / 2);
          let dist = Math.hypot(dx, dy);

          if (g.mode === 'chase') {
            if (shieldOn && dist < 140 && dist > 1) { dx = -dx; dy = -dy; }
            if (dist > 1) {
              g.x += (dx / dist) * g.speed * slowMul;
              g.y += (dy / dist) * g.speed * slowMul;
            }
          } else if (g.mode === 'patrol') {
            const pd = g.patrol;
            pd.phase++;
            const spd = g.speed * slowMul;
            if (pd.pattern === 'linear') {
              g.x += Math.cos(pd.angle) * spd * 1.2;
              g.y += Math.sin(pd.angle) * spd * 1.2;
            } else if (pd.pattern === 'slalom') {
              g.x += Math.cos(pd.angle) * spd;
              g.y += Math.sin(pd.angle) * spd;
              const perp = pd.angle + Math.PI / 2;
              const wave = Math.sin(pd.phase * 0.05) * spd * 1.8;
              g.x += Math.cos(perp) * wave;
              g.y += Math.sin(perp) * wave;
            } else if (pd.pattern === 'zigzag') {
              g.x += Math.cos(pd.angle) * spd;
              g.y += Math.sin(pd.angle) * spd;
              const za = pd.phase % 60 < 30 ? pd.angle + Math.PI / 4 : pd.angle - Math.PI / 4;
              g.x += Math.cos(za) * spd * 0.5;
              g.y += Math.sin(za) * spd * 0.5;
            }
            dx = cx - (g.x + g.size / 2);
            dy = cy - (g.y + g.size / 2);
            dist = Math.hypot(dx, dy);
          } else if (g.mode === 'wander') {
            const wd = g.wander;
            wd.timer++;
            if (wd.timer >= wd.interval) {
              wd.angle += (Math.random() - 0.5) * Math.PI * 0.8;
              wd.timer = 0;
              wd.interval = 50 + Math.random() * 100;
            }
            g.x += Math.cos(wd.angle) * g.speed * slowMul * 0.7;
            g.y += Math.sin(wd.angle) * g.speed * slowMul * 0.7;
            if (g.x < 10) { g.x = 10; wd.angle = Math.PI - wd.angle; }
            if (g.x > innerWidth - g.size - 10) { g.x = innerWidth - g.size - 10; wd.angle = Math.PI - wd.angle; }
            if (g.y < 10) { g.y = 10; wd.angle = -wd.angle; }
            if (g.y > innerHeight - g.size - 10) { g.y = innerHeight - g.size - 10; wd.angle = -wd.angle; }
            dx = cx - (g.x + g.size / 2);
            dy = cy - (g.y + g.size / 2);
            dist = Math.hypot(dx, dy);
          }

          g.el.style.left = g.x + 'px';
          g.el.style.top = g.y + 'px';

          const eyes = g.el.querySelectorAll('.eye');
          if (eyes.length === 2) {
            const ex = Math.max(-1.4, Math.min(1.4, dx * 0.004));
            const ey = Math.max(-1.4, Math.min(1.4, dy * 0.004));
            eyes[0].setAttribute('cx', 13 + ex);
            eyes[0].setAttribute('cy', 19 + ey);
            eyes[1].setAttribute('cx', 25 + ex);
            eyes[1].setAttribute('cy', 19 + ey);
          }

          const catchR = g.isBoss ? 32 : 18;
          if (dist < catchR) {
            g.alive = false;
            g.diedAt = now;
            g.el.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
            g.el.style.transform = `scale(2) rotate(${(Math.random() * 80 - 40).toFixed(0)}deg)`;
            g.el.style.opacity = '0';
            setTimeout(() => g.el.remove(), 420);
            loseLife();
          }

          const offScreen = g.x < -g.size * 3 || g.x > innerWidth + g.size * 3 ||
                            g.y < -g.size * 3 || g.y > innerHeight + g.size * 3;
          if (g.mode === 'patrol' && g.age > 180 && offScreen) {
            g.alive = false;
            g.diedAt = now;
            g.el.remove();
          } else if (g.age > 60 * 30) {
            g.alive = false;
            g.diedAt = now;
            g.el.style.transition = 'opacity 0.6s ease';
            g.el.style.opacity = '0';
            setTimeout(() => g.el.remove(), 700);
          }
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // ── Spawn cadence ──
    function scheduleSpawn() {
      const wait = Math.max(3800, 13000 - STATE.stage * 900) + Math.random() * 5000;
      setTimeout(() => {
        if (!STATE.gameOver && !STATE.paused && !STATE.arcadeOff) {
          spawnGhost();
          if (STATE.stage >= 3 && Math.random() < 0.25) {
            setTimeout(() => spawnGhost(), 600);
          }
        }
        scheduleSpawn();
      }, wait);
    }
    setTimeout(scheduleSpawn, 6500);

    // ── Section transition banners ──
    function showStageBanner(stageNum, name, tone) {
      const banner = document.createElement('div');
      banner.style.cssText = `
        position: fixed; left: 0; right: 0; top: 35%;
        z-index: 9986; pointer-events: none;
        display: flex; flex-direction: column; align-items: center;
        animation: stage-banner 2.2s cubic-bezier(0.4, 1.2, 0.4, 1) forwards;
      `;
      banner.innerHTML = `
        <div style="font-family: 'IBM Plex Mono', monospace; font-size: 10px;
          letter-spacing: 0.36em; color: ${tone}; opacity: 0.9; margin-bottom: 6px;">
          ★ READY ★
        </div>
        <div style="font-family: Impact, 'Arial Black', sans-serif;
          font-size: clamp(48px, 9vw, 120px); color: ${tone};
          letter-spacing: -0.02em; line-height: 0.9;
          -webkit-text-stroke: 1px rgba(0,0,0,0.15);
          text-shadow: 0 6px 0 rgba(0,0,0,0.18), 0 14px 28px rgba(0,0,0,0.18);">
          STAGE ${String(stageNum).padStart(2, '0')}
        </div>
        <div style="font-family: 'Newsreader', serif; font-style: italic;
          font-size: clamp(20px, 3vw, 32px); color: var(--ink, #161514);
          margin-top: 12px; letter-spacing: 0.01em;">
          ${name}
        </div>
      `;
      document.body.appendChild(banner);
      setTimeout(() => banner.remove(), 2300);
    }

    // intersection observer hooks into existing sections
    setTimeout(() => {
      const sections = [...document.querySelectorAll('section[id]')];
      const sectionTone = {
        about: '#cc3a2e', experience: '#1a4d3a', credentials: '#b08a2e',
        projects: '#2a6b78', skills: '#cc3a2e', contact: '#8b3df0',
      };
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting && en.intersectionRatio > 0.35) {
            const id = en.target.id;
            if (STATE.seenSections.has(id)) return;
            STATE.seenSections.add(id);
            STATE.stage = STATE.seenSections.size;
            renderHUD();
            const name = SECTION_NAMES[id] || id.toUpperCase();
            const tone = sectionTone[id] || '#cc3a2e';
            showStageBanner(STATE.stage, name, tone);
            window.dispatchEvent(new CustomEvent('tcaci:section', { detail: { id, stage: STATE.stage, name, tone } }));

            // Boss appears on contact section
            if (id === 'contact' && !STATE.gameOver) {
              setTimeout(() => spawnGhost({ boss: true }), 1500);
            }
            // Stage 4+ triple-spawn welcome
            if (STATE.stage >= 4 && !STATE.gameOver) {
              setTimeout(() => { spawnGhost(); spawnGhost(); }, 1200);
            }
          }
        });
      }, { threshold: [0.35, 0.6] });
      sections.forEach(s => obs.observe(s));
    }, 2000);

    // ── Click bonus (extra +5 per non-game click as before, gentle) ──
    document.addEventListener('click', (e) => {
      if (STATE.gameOver || STATE.arcadeOff) return;
      if (e.target.closest('.tcaci-ghost')) return;
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .navbar, #tcaci-boot, #marquee, #tcaci-coin-hud, #tcaci-gameover')) return;
      STATE.score += 5;
      renderHUD();
    });

    // ── Pause/Resume + manual restart via keyboard ──
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
      if (e.key === 'p' || e.key === 'P') {
        STATE.paused = !STATE.paused;
        hud.style.boxShadow = STATE.paused ? '3px 3px 0 #ffb454' : '3px 3px 0 var(--rouge, #cc3a2e)';
      }
      if ((e.key === 'g' || e.key === 'G') && !STATE.gameOver) {
        // Manual spawn for fun
        spawnGhost();
      }
    });

    // ── Sparse "shooting PS shape" every 28–48s — gentle ambient chaos ──
    function shoot() {
      const shapes = [
        { c: '#2a9d4f', s: `<polygon points="14,4 26,24 2,24" fill="none" stroke="#2a9d4f" stroke-width="2"/>` },
        { c: '#e44b56', s: `<circle cx="14" cy="14" r="11" fill="none" stroke="#e44b56" stroke-width="2"/>` },
        { c: '#3a9ee0', s: `<line x1="4" y1="4" x2="24" y2="24" stroke="#3a9ee0" stroke-width="2.4"/><line x1="24" y1="4" x2="4" y2="24" stroke="#3a9ee0" stroke-width="2.4"/>` },
        { c: '#d063a8', s: `<rect x="4" y="4" width="20" height="20" fill="none" stroke="#d063a8" stroke-width="2"/>` },
      ];
      const sh = shapes[Math.floor(Math.random() * shapes.length)];
      const y = 60 + Math.random() * (innerHeight - 200);
      const dir = Math.random() < 0.5 ? 1 : -1;
      const startX = dir > 0 ? -40 : innerWidth + 40;
      const endX = dir > 0 ? innerWidth + 40 : -40;
      const dur = 5 + Math.random() * 4;
      const el = document.createElement('div');
      el.style.cssText = `
        position:fixed; left:${startX}px; top:${y}px; width:28px; height:28px;
        z-index: 9; pointer-events:none; opacity: 0.85;
        transition: left ${dur}s linear, top ${dur}s ease-in-out, transform ${dur}s linear, opacity ${dur}s linear;
      `;
      el.innerHTML = `<svg viewBox="0 0 28 28" width="28" height="28">${sh.s}</svg>`;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.left = endX + 'px';
        el.style.top = (y + (Math.random() * 60 - 30)) + 'px';
        el.style.transform = `rotate(${dir * 540}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), dur * 1000 + 100);
    }
    function scheduleShoot() {
      const wait = 28000 + Math.random() * 20000;
      setTimeout(() => { shoot(); scheduleShoot(); }, wait);
    }
    setTimeout(scheduleShoot, 12000);

    // ── Expose API for arcade-plus.js ──
    STATE.api = {
      spawnGhost,
      killGhost,
      loseLife,
      renderHUD,
      addScore: (n) => { STATE.score = Math.max(0, STATE.score + n); renderHUD(); },
      addCoin: (n = 1) => { STATE.coins += n; STATE.score += 10 * n; renderHUD(); },
      gainLife: (n = 1) => { STATE.lives = Math.min(STATE.maxLives + 6, STATE.lives + n); STATE.maxLives = Math.max(STATE.maxLives, STATE.lives); renderHUD(); },
      shield: (ms = 5000) => { STATE.shieldUntil = Date.now() + ms; renderHUD(); setTimeout(renderHUD, ms + 20); },
      slow:   (ms = 5000) => { STATE.slowUntil   = Date.now() + ms; renderHUD(); setTimeout(renderHUD, ms + 20); },
      multi:  (ms = 8000) => { STATE.multUntil   = Date.now() + ms; renderHUD(); setTimeout(renderHUD, ms + 20); },
      cursor: () => ({ x: cx, y: cy }),
      ghosts,
      STATE,
    };
    window.dispatchEvent(new CustomEvent('tcaci:ready'));

    // ── CSS once ──
    const css = document.createElement('style');
    css.textContent = `
      @keyframes score-pop {
        0% { opacity: 0; transform: translateY(0) scale(0.8); }
        20% { opacity: 1; transform: translateY(-6px) scale(1.1); }
        100% { opacity: 0; transform: translateY(-40px) scale(0.95); }
      }
      @keyframes hit-flash {
        0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; }
      }
      @keyframes gameover-in {
        0% { opacity: 0; transform: scale(1.04); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes boss-pulse {
        0%, 100% { filter: drop-shadow(0 0 14px rgba(139, 61, 240, 0.7)) drop-shadow(0 4px 8px rgba(0,0,0,0.3)); }
        50% { filter: drop-shadow(0 0 28px rgba(139, 61, 240, 0.95)) drop-shadow(0 4px 8px rgba(0,0,0,0.3)); }
      }
      @keyframes stage-banner {
        0% { opacity: 0; transform: translateY(20px) scale(0.95); }
        14% { opacity: 1; transform: translateY(0) scale(1); }
        80% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-8px) scale(1.02); }
      }
      .tcaci-ghost:hover { transform: scale(1.08); }
      @media print { #tcaci-coin-hud, .tcaci-ghost, #tcaci-gameover { display: none !important; } }
    `;
    document.head.appendChild(css);
  }

  /* ───────────────────────────────────────────────
     ARCADE TOGGLE — on/off switch for the mini-game
     ─────────────────────────────────────────────── */
  function initArcadeToggle() {
    function whenGame(cb) {
      if (window.__tcaciGame && window.__tcaciGame.api) return cb();
      window.addEventListener('tcaci:ready', cb, { once: true });
    }
    whenGame(() => {
      const game = window.__tcaciGame;
      const hud = document.getElementById('tcaci-coin-hud');

      const toggle = document.createElement('div');
      toggle.id = 'tcaci-arcade-toggle';
      toggle.innerHTML = `
        <button id="tcaci-toggle-btn" title="Toggle arcade mini-game">
          <span class="tcaci-toggle-track">
            <span class="tcaci-toggle-thumb"></span>
          </span>
          <span class="tcaci-toggle-label">ARCADE</span>
        </button>
      `;
      const navInner = document.querySelector('.nav-inner');
      if (navInner) {
        navInner.appendChild(toggle);
      } else {
        toggle.style.position = 'fixed';
        toggle.style.top = '14px';
        toggle.style.right = '14px';
        toggle.style.zIndex = '55';
        document.body.appendChild(toggle);
      }

      const btn = document.getElementById('tcaci-toggle-btn');
      let isOn = true;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOn = !isOn;
        game.arcadeOff = !isOn;
        btn.classList.toggle('is-off', !isOn);

        if (!isOn) {
          // Remove all alive ghosts
          const list = (game.api.ghosts || []).slice();
          for (const g of list) {
            if (g.alive) {
              g.alive = false;
              g.diedAt = Date.now();
              g.el.style.transition = 'opacity 0.3s ease';
              g.el.style.opacity = '0';
              setTimeout(() => g.el.remove(), 320);
            }
          }
          // Remove pickups
          document.querySelectorAll('[data-pickup]').forEach(el => {
            el.style.transition = 'opacity 0.3s';
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 320);
          });
          if (hud) hud.style.display = 'none';
          const mp = document.getElementById('tcaci-music');
          if (mp) mp.style.display = 'none';
        } else {
          game.arcadeOff = false;
          if (hud) hud.style.display = '';
          const mp = document.getElementById('tcaci-music');
          if (mp) mp.style.display = '';
        }
      });

      const css = document.createElement('style');
      css.textContent = `
        #tcaci-arcade-toggle { display: flex; align-items: center; }
        #tcaci-toggle-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: none; border: none; cursor: pointer;
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--ink-dim, #5a554d); padding: 4px 0;
        }
        #tcaci-toggle-btn:hover { color: var(--rouge, #cc3a2e); }
        .tcaci-toggle-track {
          display: inline-block; width: 28px; height: 14px;
          background: var(--forest, #1a4d3a); border-radius: 7px;
          position: relative; transition: background 0.2s;
        }
        .tcaci-toggle-thumb {
          display: block; width: 10px; height: 10px;
          background: var(--paper, #f4f1ea); border-radius: 50%;
          position: absolute; top: 2px; left: 16px;
          transition: left 0.2s;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        #tcaci-toggle-btn.is-off .tcaci-toggle-track {
          background: var(--ink-mute, #8a847a);
        }
        #tcaci-toggle-btn.is-off .tcaci-toggle-thumb { left: 2px; }
        #tcaci-toggle-btn.is-off .tcaci-toggle-label { opacity: 0.45; }
        @media print { #tcaci-arcade-toggle { display: none !important; } }
        @media (max-width: 900px) {
          #tcaci-arcade-toggle { position: fixed; top: 10px; right: 10px; z-index: 55; }
        }
      `;
      document.head.appendChild(css);
    });
  }

  /* ─────────────────────────────────────────────── */
  function init() {
    initBoot();
    initShader();
    initBlots();

    let tries = 0;
    const wait = setInterval(() => {
      tries++;
      if (document.querySelector('[data-tilt]') || tries > 40) {
        clearInterval(wait);
        initTilt();
        initScramble();
        initMarquee();
        initMagnetic();
        initCursor();
        initStamp();
        initProgress();
        initPageCounter();
        initContextNote();
        initCrossHighlight();
        initSecretCodes();
        initArcadeChaos();
        initArcadeToggle();
      }
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
