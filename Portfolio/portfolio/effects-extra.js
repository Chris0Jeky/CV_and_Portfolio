/* eslint-disable */
// Ambient theatre extras — paper airplane drifts, occasional newsboy
// running with a headline, and a "STOP PRESS" extra-extra stamp burst.
// Plain JS. Light by design — the page already has plenty going on.

(function () {
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCED) return;

  /* ──────────────────────────────────────────
     ① PAPER AIRPLANE — drifts diagonally every ~45-90s
     ────────────────────────────────────────── */
  function spawnAirplane() {
    const fromLeft = Math.random() < 0.5;
    const yStart = 80 + Math.random() * (innerHeight - 240);
    const yEnd   = yStart + (Math.random() * 240 - 120);
    const dur    = 8 + Math.random() * 6;
    const tilt   = (Math.random() * 18 - 9);
    const sx = fromLeft ? -90 : innerWidth + 90;
    const ex = fromLeft ? innerWidth + 90 : -90;
    const rot = fromLeft ? -8 + tilt : 188 + tilt;

    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed; top: ${yStart}px; left: ${sx}px;
      width: 64px; height: 28px; z-index: 8; pointer-events: none;
      transform: rotate(${rot}deg);
      transition: left ${dur}s linear, top ${dur}s cubic-bezier(0.4, 0, 0.6, 1), transform ${dur}s linear, opacity 0.6s ease;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.12));
      opacity: 0;
    `;
    el.innerHTML = `
      <svg viewBox="0 0 64 28" width="100%" height="100%" style="overflow:visible;">
        <path d="M 0 14 L 64 2 L 28 14 L 64 26 Z" fill="#f4f1ea" stroke="#2a2723" stroke-width="1" stroke-linejoin="round"/>
        <path d="M 28 14 L 36 8" stroke="#2a2723" stroke-width="0.8" fill="none"/>
        <path d="M 28 14 L 36 20" stroke="#2a2723" stroke-width="0.8" fill="none"/>
        <line x1="44" y1="6" x2="40" y2="11" stroke="#cc3a2e" stroke-width="1" opacity="0.7"/>
        <line x1="44" y1="22" x2="40" y2="17" stroke="#cc3a2e" stroke-width="1" opacity="0.7"/>
      </svg>
    `;
    document.body.appendChild(el);

    // Trail of small ink dots, drawn from the plane's path
    const trail = [];
    let trailFrames = 0;
    const trailMax = Math.floor(dur * 60 / 4);

    requestAnimationFrame(() => {
      el.style.opacity = '0.85';
      el.style.left = ex + 'px';
      el.style.top  = yEnd + 'px';
      el.style.transform = `rotate(${rot + (fromLeft ? 6 : -6)}deg)`;
    });

    // Sample plane position periodically to drop tiny ink dots
    const start = performance.now();
    function drip() {
      const t = (performance.now() - start) / (dur * 1000);
      if (t > 1) return;
      trailFrames++;
      if (trailFrames % 8 === 0) {
        const r = el.getBoundingClientRect();
        const dot = document.createElement('div');
        const sz = 2 + Math.random() * 2;
        dot.style.cssText = `
          position: fixed; left: ${r.left + r.width / 2}px; top: ${r.top + r.height / 2}px;
          width: ${sz}px; height: ${sz}px; border-radius: 50%;
          background: rgba(22, 21, 20, 0.35);
          z-index: 7; pointer-events: none;
          transition: opacity 2.4s ease, transform 2.4s ease;
        `;
        document.body.appendChild(dot);
        requestAnimationFrame(() => {
          dot.style.opacity = '0';
          dot.style.transform = `translateY(${4 + Math.random() * 8}px)`;
        });
        setTimeout(() => dot.remove(), 2500);
      }
      requestAnimationFrame(drip);
    }
    requestAnimationFrame(drip);

    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 700);
    }, dur * 1000);
  }
  function schedulePlane() {
    const wait = 45000 + Math.random() * 45000;
    setTimeout(() => { spawnAirplane(); schedulePlane(); }, wait);
  }
  // First plane after a short delay so the boot is over
  setTimeout(spawnAirplane, 12000);
  schedulePlane();

  /* ──────────────────────────────────────────
     ② NEWSBOY — runs across the bottom every ~2 min holding a headline
     ────────────────────────────────────────── */
  const HEADLINES = [
    'EXTRA · EXTRA · TASKDECK SHIPS LOCAL-FIRST',
    'STOP PRESS · METRIX BACKTEST CITES SOURCES',
    'LATEST · WEALTHLENS · 874 TESTS HOLD',
    'BULLETIN · AUDIT LOG TURNS 3 YEARS OLD',
    'EXCLUSIVE · NPDL ACCEPTED AT SGAI-AI 2025',
    'PROOFREAD · ONE HUNDRED RELEASES, ZERO ROLLBACKS',
    'EXTRA · NAVSENTINEL · ZERO REMOTE LOOKUPS',
  ];
  function spawnNewsboy() {
    const headline = HEADLINES[Math.floor(Math.random() * HEADLINES.length)];
    const dur = 14 + Math.random() * 4;
    const fromLeft = Math.random() < 0.5;
    const sx = fromLeft ? -160 : innerWidth + 160;
    const ex = fromLeft ? innerWidth + 160 : -160;
    const flip = fromLeft ? 1 : -1;

    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed; bottom: 0; left: ${sx}px;
      width: 140px; height: 120px; z-index: 9;
      pointer-events: none;
      transition: left ${dur}s linear;
      transform: scaleX(${flip});
      transform-origin: bottom center;
    `;

    // Walking SVG: body, legs animated via SMIL, raised arm holding a newspaper with the headline
    el.innerHTML = `
      <svg viewBox="0 0 140 120" width="100%" height="100%" style="overflow:visible;">
        <defs>
          <linearGradient id="nb-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3a3633"/>
            <stop offset="100%" stop-color="#161514"/>
          </linearGradient>
        </defs>
        <!-- back leg -->
        <g>
          <rect x="62" y="92" width="9" height="20" fill="#2a2723">
            <animateTransform attributeName="transform" type="rotate" values="20 66 92; -25 66 92; 20 66 92"
              dur="0.55s" repeatCount="indefinite"/>
          </rect>
        </g>
        <!-- front leg -->
        <g>
          <rect x="74" y="92" width="9" height="20" fill="#2a2723">
            <animateTransform attributeName="transform" type="rotate" values="-25 78 92; 20 78 92; -25 78 92"
              dur="0.55s" repeatCount="indefinite"/>
          </rect>
        </g>
        <!-- body -->
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="0 0; 0 -2; 0 0" dur="0.55s" repeatCount="indefinite"/>
          <!-- torso: vest -->
          <path d="M 58 54 L 88 54 L 92 94 L 54 94 Z" fill="#cc3a2e"/>
          <!-- shirt under vest -->
          <rect x="64" y="54" width="18" height="28" fill="#f4f1ea"/>
          <line x1="73" y1="54" x2="73" y2="82" stroke="#2a2723" stroke-width="1"/>
          <!-- collar buttons -->
          <circle cx="73" cy="60" r="1" fill="#2a2723"/>
          <circle cx="73" cy="65" r="1" fill="#2a2723"/>
          <!-- neck -->
          <rect x="68" y="48" width="14" height="8" fill="#e8c8a8"/>
          <!-- head -->
          <circle cx="75" cy="42" r="12" fill="#e8c8a8"/>
          <!-- ear -->
          <circle cx="86" cy="42" r="2.5" fill="#e8c8a8"/>
          <!-- nose -->
          <path d="M 80 42 L 82 45 L 80 45 Z" fill="#c9a886"/>
          <!-- mouth -->
          <path d="M 76 47 Q 80 49 84 47" stroke="#2a2723" stroke-width="1" fill="none" stroke-linecap="round"/>
          <!-- eye -->
          <circle cx="80" cy="40" r="1.4" fill="#161514"/>
          <!-- eyebrow -->
          <line x1="78" y1="37" x2="83" y2="36" stroke="#161514" stroke-width="1.3" stroke-linecap="round"/>
          <!-- cap -->
          <path d="M 60 36 Q 64 26 76 26 Q 90 26 92 36 L 92 38 L 60 38 Z" fill="url(#nb-cap)"/>
          <ellipse cx="92" cy="38" rx="6" ry="2.2" fill="#161514"/>
          <line x1="68" y1="32" x2="84" y2="32" stroke="#2a2723" stroke-width="0.7" opacity="0.5"/>
          <!-- back arm (down) -->
          <rect x="52" y="58" width="8" height="26" fill="#cc3a2e" rx="2"/>
          <!-- raised arm holding newspaper -->
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-6 86 58; 4 86 58; -6 86 58"
              dur="1.1s" repeatCount="indefinite"/>
            <rect x="86" y="42" width="8" height="20" fill="#cc3a2e" rx="2"
              transform="rotate(-40 90 52)"/>
            <!-- newspaper held overhead -->
            <g transform="translate(98 18) rotate(-12)">
              <rect x="-32" y="-4" width="64" height="34" fill="#f4f1ea" stroke="#161514" stroke-width="1.2"/>
              <rect x="-30" y="-2" width="60" height="6" fill="#cc3a2e"/>
              <text x="0" y="3" text-anchor="middle"
                font-family="IBM Plex Mono, monospace" font-size="3.6"
                font-weight="700" fill="#f4f1ea" letter-spacing="0.5">
                THE TCACI QUARTERLY
              </text>
              <text x="0" y="13" text-anchor="middle"
                font-family="Newsreader, serif" font-size="5.2" font-weight="700" fill="#161514">
                STOP PRESS
              </text>
              <line x1="-26" y1="17" x2="26" y2="17" stroke="#1a1817" stroke-width="0.5"/>
              <line x1="-26" y1="21" x2="26" y2="21" stroke="#1a1817" stroke-width="0.3"/>
              <line x1="-26" y1="24" x2="20" y2="24" stroke="#1a1817" stroke-width="0.3"/>
              <line x1="-26" y1="27" x2="22" y2="27" stroke="#1a1817" stroke-width="0.3"/>
            </g>
          </g>
        </g>
      </svg>
    `;
    document.body.appendChild(el);

    // Speech bubble with headline (positioned counter-flipped so it reads correctly)
    const bubble = document.createElement('div');
    bubble.style.cssText = `
      position: fixed; bottom: 124px; left: ${sx + (fromLeft ? 90 : -240)}px;
      max-width: 280px; padding: 8px 14px;
      background: var(--paper, #f4f1ea);
      border: 1.5px solid var(--ink, #161514);
      box-shadow: 3px 3px 0 var(--rouge, #cc3a2e);
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--ink, #161514);
      z-index: 9; pointer-events: none;
      transition: left ${dur}s linear, opacity 0.6s ease;
      opacity: 0;
    `;
    bubble.innerHTML = `<span style="color:var(--rouge);">★</span> ${headline}`;
    document.body.appendChild(bubble);

    requestAnimationFrame(() => {
      el.style.left = ex + 'px';
      bubble.style.left = (ex + (fromLeft ? 90 : -240)) + 'px';
      bubble.style.opacity = '1';
    });

    setTimeout(() => { bubble.style.opacity = '0'; }, dur * 1000 - 400);
    setTimeout(() => { el.remove(); bubble.remove(); }, dur * 1000 + 700);
  }
  function scheduleNewsboy() {
    const wait = 95000 + Math.random() * 60000;
    setTimeout(() => { spawnNewsboy(); scheduleNewsboy(); }, wait);
  }
  // First appearance after the boot screen plus a small delay
  setTimeout(spawnNewsboy, 22000);
  scheduleNewsboy();

  /* ──────────────────────────────────────────
     ③ INK BLOOM — random subtle ink splatter on page,
        very rare, doesn't disturb reading
     ────────────────────────────────────────── */
  function spawnInkBloom() {
    const x = 60 + Math.random() * (innerWidth - 120);
    const y = window.scrollY + 120 + Math.random() * (innerHeight - 240);
    const wrap = document.createElement('div');
    wrap.style.cssText = `
      position: absolute; left: ${x}px; top: ${y}px;
      width: 0; height: 0; pointer-events: none; z-index: 0;
    `;
    document.body.appendChild(wrap);
    const N = 6 + Math.floor(Math.random() * 5);
    for (let i = 0; i < N; i++) {
      const dot = document.createElement('div');
      const sz = 3 + Math.random() * 14;
      const ang = Math.random() * Math.PI * 2;
      const dist = Math.random() * 36;
      dot.style.cssText = `
        position: absolute;
        left: ${Math.cos(ang) * dist}px; top: ${Math.sin(ang) * dist}px;
        width: ${sz}px; height: ${sz}px;
        border-radius: 50%;
        background: rgba(204, 58, 46, 0.18);
        filter: blur(1px);
        transform: scale(0);
        transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.2, 1.3), opacity 6s ease;
      `;
      wrap.appendChild(dot);
      setTimeout(() => { dot.style.transform = 'scale(1)'; }, 30 + i * 28);
      setTimeout(() => { dot.style.opacity = '0'; }, 1500);
    }
    setTimeout(() => wrap.remove(), 8000);
  }
  function scheduleBloom() {
    const wait = 70000 + Math.random() * 50000;
    setTimeout(() => { spawnInkBloom(); scheduleBloom(); }, wait);
  }
  setTimeout(scheduleBloom, 30000);
})();
