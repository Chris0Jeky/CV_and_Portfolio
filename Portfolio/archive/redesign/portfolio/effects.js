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
      '874 TESTS FOR SLEEP AT NIGHT',
      '⌘K FOR THE INDEX',
      'TRUST-FIRST AUTOMATION',
      'LOCAL-FIRST BY DEFAULT',
      'IF IT\u2019S NOT IN THE AUDIT LOG IT DIDN\u2019T HAPPEN',
      '£17 TRILLION · VISUALISED',
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
      @media print { .ink-underline::after { display: none; } .scramble-char { color: inherit !important; } }
    `;
    document.head.appendChild(style);

    const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#@&%$+=*?!';
    const h2s = [];
    document.querySelectorAll('section h2').forEach(h => {
      const cs = parseFloat(getComputedStyle(h).fontSize);
      if (cs >= 40) {
        h.classList.add('ink-underline');
        // Wrap each character in a span for scramble
        const text = h.textContent;
        h.dataset.scrambleText = text;
        h.innerHTML = '';
        for (const ch of text) {
          const span = document.createElement('span');
          span.className = 'scramble-char';
          span.textContent = ch === ' ' ? '\u00A0' : ch;
          span.dataset.final = ch;
          h.appendChild(span);
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
     ⑦ CLICK-TO-STAMP — fading rouge press mark
     ─────────────────────────────────────────────── */
  function initStamp() {
    if (REDUCED) return;

    document.addEventListener('click', (e) => {
      // Skip if click is on interactive UI
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .navbar, #tcaci-boot, #marquee')) return;

      const x = e.clientX, y = e.clientY;
      const stamp = document.createElement('div');
      const variant = Math.random() < 0.5 ? 'plus' : 'circle';
      stamp.style.cssText = `
        position: fixed; left: ${x - 20}px; top: ${y - 20}px;
        width: 40px; height: 40px; pointer-events: none; z-index: 9997;
        color: #cc3a2e;
        animation: stamp-fade 1.4s ease-out forwards;
        transform: rotate(${(Math.random() * 20 - 10).toFixed(1)}deg);
      `;
      stamp.innerHTML = variant === 'plus'
        ? `<svg viewBox="-20 -20 40 40" width="100%" height="100%">
            <line x1="-12" y1="0" x2="12" y2="0" stroke="currentColor" stroke-width="2"/>
            <line x1="0" y1="-12" x2="0" y2="12" stroke="currentColor" stroke-width="2"/>
            <circle r="14" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>
          </svg>`
        : `<svg viewBox="-20 -20 40 40" width="100%" height="100%">
            <circle r="12" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle r="3" fill="currentColor"/>
          </svg>`;
      document.body.appendChild(stamp);
      setTimeout(() => stamp.remove(), 1500);
    });

    const css = document.createElement('style');
    css.textContent = `
      @keyframes stamp-fade {
        0%   { opacity: 1; transform: scale(0.4) rotate(0deg); }
        15%  { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(0.9); }
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
          taskdeck:   { k: 'taskdeck',   b: "The local-first one. 4,500+ commits of stubbornness about who is actually in charge of your board." },
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
    };

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

    const css = document.createElement('style');
    css.textContent = `
      @keyframes tcaci-hint {
        0% { opacity: 0; transform: translateY(8px); }
        12% { opacity: 1; transform: translateY(0); }
        85% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-4px); }
      }
    `;
    document.head.appendChild(css);
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
      }
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
