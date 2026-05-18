/* eslint-disable */
// Arcade Plus — power-ups, achievements, project waves, sound, bonus rounds.
// Layers on top of effects.js's initArcadeChaos via window.__tcaciGame.api.

(function () {
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCED) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  function whenReady(cb) {
    if (window.__tcaciGame && window.__tcaciGame.api) return cb();
    window.addEventListener('tcaci:ready', cb, { once: true });
    let tries = 0;
    const id = setInterval(() => {
      tries++;
      if (window.__tcaciGame && window.__tcaciGame.api) {
        clearInterval(id); cb();
      } else if (tries > 100) clearInterval(id);
    }, 100);
  }

  whenReady(start);

  function start() {
    const game = window.__tcaciGame;
    const api  = game.api;

    /* ──────────────────────────────────────────
       SOUND — minimal WebAudio chiptune
       ────────────────────────────────────────── */
    let actx = null;
    function ensureCtx() {
      if (!actx) {
        try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { actx = null; }
      }
      if (actx && actx.state === 'suspended') actx.resume();
      return actx;
    }
    ['pointerdown','keydown','click'].forEach(ev =>
      window.addEventListener(ev, ensureCtx, { once: true, passive: true })
    );
    function beep(freq, dur = 0.08, type = 'square', vol = 0.05) {
      const ctx = ensureCtx(); if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.type = type; osc.frequency.value = freq;
      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(g).connect(ctx.destination);
      osc.start(now); osc.stop(now + dur);
    }
    function arp(freqs, step = 0.05, dur = 0.07, type = 'square', vol = 0.05) {
      freqs.forEach((f, i) => setTimeout(() => beep(f, dur, type, vol), i * step * 1000));
    }
    const SFX = {
      coin:        () => arp([880, 1320], 0.05, 0.08, 'square', 0.05),
      kill:        () => beep(220 + Math.random() * 60, 0.07, 'sawtooth', 0.05),
      hit:         () => arp([180, 120, 80], 0.06, 0.12, 'sawtooth', 0.07),
      shield:      () => arp([523, 659, 784, 1046], 0.04, 0.07, 'sine', 0.05),
      slow:        () => arp([900, 700, 500, 350], 0.05, 0.1, 'triangle', 0.05),
      mult:        () => arp([523, 659, 784], 0.04, 0.08, 'square', 0.05),
      life:        () => arp([523, 659, 784, 1046, 1318], 0.04, 0.08, 'square', 0.06),
      star:        () => arp([1046, 1318, 1568, 2093], 0.04, 0.09, 'sine', 0.06),
      achievement: () => arp([523, 659, 784, 1046, 1318, 1568], 0.05, 0.09, 'square', 0.05),
      bonus:       () => arp([392, 523, 659, 784, 1046], 0.05, 0.1, 'square', 0.05),
    };

    /* ──────────────────────────────────────────
       TOAST
       ────────────────────────────────────────── */
    function toast(text, tone = 'rouge', icon = '★') {
      const palette = {
        rouge:  '#cc3a2e', forest: '#1a4d3a', gold:  '#b08a2e',
        teal:   '#2a6b78', violet: '#8b3df0', blue:  '#3a9ee0',
      };
      const c = palette[tone] || tone;
      const t = document.createElement('div');
      t.style.cssText = `
        position: fixed; bottom: 60px; right: 16px;
        background: var(--ink, #161514); color: var(--paper, #f4f1ea);
        font-family: 'IBM Plex Mono', monospace; font-size: 11px;
        letter-spacing: 0.18em; text-transform: uppercase;
        padding: 9px 14px; box-shadow: 4px 4px 0 ${c};
        z-index: 9995;
        animation: tcaci-hint 2.6s ease-out forwards;
        display: flex; gap: 8px; align-items: center;
      `;
      t.innerHTML = `<span style="color:${c}">${icon}</span> ${text}`;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 2700);
    }

    /* ──────────────────────────────────────────
       ACHIEVEMENTS
       ────────────────────────────────────────── */
    const ACHIEVE = {
      'first-ink':    { label: 'FIRST INK',         sub: 'first kill recorded' },
      'combo-5':      { label: 'COMBO ARTIST',      sub: '×5 in a row' },
      'pocket-money': { label: "PRINTER'S DEVIL",   sub: '10 coins pocketed' },
      'full-edition': { label: 'FULL EDITION',      sub: 'every section visited' },
      'editors-note': { label: "EDITOR'S NOTE",     sub: 'shield absorbed a hit' },
      'deadline':     { label: 'DEADLINE MET',      sub: 'boss vanquished' },
      'published':    { label: 'PUBLISHED',         sub: 'score crossed 1,000' },
      'bestseller':   { label: 'BESTSELLER',        sub: 'score crossed 5,000' },
      'speedrun':     { label: 'STOP PRESS',        sub: '5 kills in 5 seconds' },
      'pacifist':     { label: 'PACIFIST',          sub: '20 coins · zero hits' },
      'collector':    { label: 'COLLECTOR',         sub: 'caught a falling star' },
    };
    function award(key) {
      if (game.achievements.has(key)) return;
      game.achievements.add(key);
      const a = ACHIEVE[key]; if (!a) return;
      SFX.achievement();
      const ov = document.createElement('div');
      ov.style.cssText = `
        position: fixed; left: 50%; top: 88px; transform: translateX(-50%);
        z-index: 9994; pointer-events: none;
        background: #0e1418; color: #ffd84a;
        border: 2px solid #cc3a2e;
        box-shadow: 0 0 0 2px #0e1418, 6px 6px 0 #cc3a2e, 0 0 36px rgba(204,58,46,0.45);
        padding: 12px 22px;
        font-family: 'IBM Plex Mono', monospace;
        display: flex; gap: 14px; align-items: center;
        animation: ach-pop 3.4s ease-out forwards;
      `;
      ov.innerHTML = `
        <span style="font-size:30px; line-height:1;">★</span>
        <div>
          <div style="font-size:9px; letter-spacing:0.3em; color:#7cf4b8;">ACHIEVEMENT UNLOCKED</div>
          <div style="font-size:18px; font-weight:700; letter-spacing:0.06em; color:#ffd84a; margin-top:2px;">${a.label}</div>
          <div style="font-size:10px; letter-spacing:0.1em; color:#d8e0e8; opacity:0.8; margin-top:2px;">${a.sub}</div>
        </div>
      `;
      document.body.appendChild(ov);
      setTimeout(() => ov.remove(), 3400);
    }

    /* ──────────────────────────────────────────
       POWER-UPS / PICKUPS — cursor collects on contact
       ────────────────────────────────────────── */
    const PICKUPS = [];
    const TYPES = {
      coin: {
        size: 26, color: '#ffd84a', life: 14000,
        svg: `<svg viewBox="0 0 26 26" width="100%" height="100%">
          <circle cx="13" cy="13" r="11" fill="#ffd84a" stroke="#b08a2e" stroke-width="1.5"/>
          <text x="13" y="18" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" font-weight="700" fill="#6b4f10">¢</text>
        </svg>`,
        apply: () => {
          api.addCoin(1); SFX.coin();
          if (game.coins >= 10) award('pocket-money');
          if (game.coins >= 20 && game.catches === 0) award('pacifist');
        },
      },
      shield: {
        size: 30, color: '#3a9ee0', life: 12000,
        svg: `<svg viewBox="0 0 30 30" width="100%" height="100%">
          <path d="M 15 3 L 26 8 V 16 Q 26 23 15 27 Q 4 23 4 16 V 8 Z" fill="#3a9ee0" stroke="#1a5a8e" stroke-width="1.6"/>
          <path d="M 11 14 L 14 17 L 20 11" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`,
        apply: () => { api.shield(6000); SFX.shield(); toast('shield · 6s', 'blue', '⛨'); },
      },
      slow: {
        size: 30, color: '#7adfff', life: 12000,
        svg: `<svg viewBox="0 0 30 30" width="100%" height="100%">
          <g stroke="#1a5a8e" stroke-width="1.8" fill="none">
            <line x1="15" y1="4" x2="15" y2="26"/><line x1="4" y1="15" x2="26" y2="15"/>
            <line x1="7" y1="7" x2="23" y2="23"/><line x1="23" y1="7" x2="7" y2="23"/>
          </g>
          <circle cx="15" cy="15" r="3" fill="#7adfff"/>
        </svg>`,
        apply: () => { api.slow(6000); SFX.slow(); toast('bullet time · 6s', 'teal', '❄'); },
      },
      mult: {
        size: 30, color: '#ffd84a', life: 12000,
        svg: `<svg viewBox="0 0 30 30" width="100%" height="100%">
          <circle cx="15" cy="15" r="13" fill="#ffd84a" stroke="#b08a2e" stroke-width="1.5"/>
          <text x="15" y="20" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" font-weight="700" fill="#6b1a14">×2</text>
        </svg>`,
        apply: () => { api.multi(8000); SFX.mult(); toast('×2 score · 8s', 'gold', '×2'); },
      },
      life: {
        size: 30, color: '#cc3a2e', life: 14000,
        svg: `<svg viewBox="0 0 30 30" width="100%" height="100%">
          <path d="M 15 26 Q 4 18 4 11 Q 4 5 9 5 Q 13 5 15 9 Q 17 5 21 5 Q 26 5 26 11 Q 26 18 15 26 Z"
            fill="#cc3a2e" stroke="#6b1a14" stroke-width="1.6"/>
        </svg>`,
        apply: () => { api.gainLife(1); SFX.life(); toast('extra life', 'rouge', '♥'); },
      },
      star: {
        size: 38, color: '#ffd84a', life: 9000,
        svg: `<svg viewBox="0 0 38 38" width="100%" height="100%">
          <polygon points="19,2 24,14 36,14 26,22 30,34 19,27 8,34 12,22 2,14 14,14"
            fill="#ffd84a" stroke="#cc3a2e" stroke-width="1.8"/>
        </svg>`,
        apply: () => {
          SFX.star(); toast('★ star · clear screen', 'gold', '★'); award('collector');
          const list = (api.ghosts || []).slice();
          for (const g of list) {
            if (g.alive) api.killGhost(g, g.x + g.size / 2, g.y + g.size / 2);
          }
          const fl = document.createElement('div');
          fl.style.cssText = 'position:fixed;inset:0;background:rgba(255,216,74,0.42);z-index:9990;pointer-events:none;animation:hit-flash 0.5s ease-out forwards;';
          document.body.appendChild(fl);
          setTimeout(() => fl.remove(), 520);
        },
      },
    };

    function spawnPickup(type = 'coin', opts = {}) {
      const def = TYPES[type]; if (!def) return;
      const fromTop = opts.fromTop !== false;
      const x = opts.x != null ? opts.x : Math.random() * (innerWidth - 100) + 50;
      const y = opts.y != null ? opts.y : (fromTop ? -30 : innerHeight * 0.3 + Math.random() * 200);
      const el = document.createElement('div');
      el.dataset.pickup = type;
      el.style.cssText = `
        position: fixed; left: ${x - def.size / 2}px; top: ${y - def.size / 2}px;
        width: ${def.size}px; height: ${def.size}px;
        z-index: 65; pointer-events: none;
        filter: drop-shadow(0 0 8px ${def.color}aa) drop-shadow(0 2px 4px rgba(0,0,0,0.25));
        will-change: transform;
      `;
      el.innerHTML = def.svg;
      document.body.appendChild(el);

      PICKUPS.push({
        el, type, def, x, y,
        vx: opts.vx != null ? opts.vx : (Math.random() * 2 - 1) * 0.6,
        vy: opts.vy != null ? opts.vy : (fromTop ? 0.6 + Math.random() * 0.7 : (Math.random() * 2 - 1) * 0.4),
        wobble: Math.random() * Math.PI * 2,
        rotate: 0,
        rotateV: (Math.random() * 0.05 - 0.025),
        alive: true,
        born: performance.now(),
        life: def.life,
      });
    }

    function pickupTick() {
      const cur = api.cursor();
      const now = performance.now();
      for (let i = PICKUPS.length - 1; i >= 0; i--) {
        const p = PICKUPS[i];
        if (!p.alive) continue;
        if (p.type === 'coin') {
          p.vy = Math.min(p.vy + 0.02, 2.4);
        } else {
          p.wobble += 0.06;
          p.vy += Math.sin(p.wobble) * 0.025;
          p.vx += Math.cos(p.wobble * 0.7) * 0.012;
          p.vx *= 0.985; p.vy *= 0.985;
        }
        p.x += p.vx; p.y += p.vy;
        p.rotate += p.rotateV;

        // magnetic attraction within 90px
        const dx = cur.x - p.x;
        const dy = cur.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 90 && d > 1) {
          const pull = (90 - d) / 90 * 0.5;
          p.x += dx / d * pull;
          p.y += dy / d * pull;
        }
        // collect
        if (d < 22) {
          p.alive = false;
          const burst = document.createElement('div');
          burst.style.cssText = `
            position:fixed; left:${p.x - 24}px; top:${p.y - 24}px;
            width:48px; height:48px; pointer-events:none; z-index:9988;
            background: radial-gradient(circle, ${p.def.color}cc 0%, transparent 70%);
            animation: pickup-burst 0.5s ease-out forwards;
          `;
          document.body.appendChild(burst);
          setTimeout(() => burst.remove(), 520);
          p.def.apply();
          p.el.remove();
          PICKUPS.splice(i, 1);
          continue;
        }
        // expire
        if (p.y > innerHeight + 60 || (now - p.born) > p.life) {
          p.alive = false;
          p.el.style.transition = 'opacity 0.3s';
          p.el.style.opacity = '0';
          setTimeout(() => p.el.remove(), 320);
          PICKUPS.splice(i, 1);
          continue;
        }
        p.el.style.left = (p.x - p.def.size / 2) + 'px';
        p.el.style.top  = (p.y - p.def.size / 2) + 'px';
        p.el.style.transform = `rotate(${p.rotate}rad)`;
      }
      requestAnimationFrame(pickupTick);
    }
    requestAnimationFrame(pickupTick);

    /* ──────────────────────────────────────────
       ENEMY VARIANTS
       ────────────────────────────────────────── */
    function spawnInkBlob(opts = {}) {
      return api.spawnGhost({
        ...opts, kind: 'ink', color: '#161514',
        size: 44, speedMul: 0.65, hp: 2, points: 80,
        svg: `<svg viewBox="0 0 44 44" width="100%" height="100%">
          <defs><filter id="bb"><feGaussianBlur stdDeviation="0.6"/></filter></defs>
          <path d="M 22 4 Q 36 6 38 18 Q 42 30 30 36 Q 22 42 14 36 Q 4 30 6 18 Q 8 6 22 4 Z"
            fill="#161514" filter="url(#bb)"/>
          <ellipse cx="14" cy="14" rx="4" ry="3" fill="#cc3a2e" opacity="0.65"/>
          <circle class="eye eye-l" cx="17" cy="22" r="2.6" fill="#f4f1ea"/>
          <circle class="eye eye-r" cx="28" cy="22" r="2.6" fill="#f4f1ea"/>
        </svg>`,
      });
    }
    function spawnTypewriter(opts = {}) {
      const c = opts.color || '#1a4d3a';
      const glyph = ['A','Z','!','#','&','?','§','¶'][Math.floor(Math.random() * 8)];
      return api.spawnGhost({
        ...opts, kind: 'typewriter', color: c,
        size: 40, speedMul: 1.55, hp: 1, points: 70,
        svg: `<svg viewBox="0 0 40 40" width="100%" height="100%">
          <rect x="5" y="5" width="30" height="30" rx="4" fill="${c}" stroke="#0d2818" stroke-width="2"/>
          <rect x="9" y="9" width="22" height="22" rx="2" fill="#0d2818"/>
          <text x="20" y="27" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="16" font-weight="700" fill="${c}">${glyph}</text>
          <circle class="eye eye-l" cx="13" cy="13" r="1.5" fill="#cc3a2e"/>
          <circle class="eye eye-r" cx="27" cy="13" r="1.5" fill="#cc3a2e"/>
        </svg>`,
      });
    }
    function spawnPaperclip(opts = {}) {
      const c = opts.color || '#2a6b78';
      return api.spawnGhost({
        ...opts, kind: 'paperclip', color: c,
        size: 44, speedMul: 1.05, hp: 1, points: 60,
        svg: `<svg viewBox="0 0 44 44" width="100%" height="100%">
          <path d="M 12 8 V 32 Q 12 38 18 38 Q 24 38 24 32 V 14 Q 24 10 28 10 Q 32 10 32 14 V 30"
            fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
          <circle class="eye eye-l" cx="16" cy="20" r="2" fill="#cc3a2e"/>
          <circle class="eye eye-r" cx="22" cy="22" r="2" fill="#cc3a2e"/>
        </svg>`,
      });
    }
    function spawnGoldStar(opts = {}) {
      return api.spawnGhost({
        ...opts, kind: 'gold-star', color: '#ffd84a',
        size: 42, speedMul: 0.85, hp: 1, points: 150,
        svg: `<svg viewBox="0 0 42 42" width="100%" height="100%">
          <polygon points="21,3 26,15 38,15 28,23 32,36 21,28 10,36 14,23 4,15 16,15"
            fill="#ffd84a" stroke="#b08a2e" stroke-width="2"/>
          <circle class="eye eye-l" cx="16" cy="20" r="1.8" fill="#161514"/>
          <circle class="eye eye-r" cx="26" cy="20" r="1.8" fill="#161514"/>
        </svg>`,
      });
    }

    /* ──────────────────────────────────────────
       SECTION ENTER → wave + coin shower
       ────────────────────────────────────────── */
    const WAVES = {
      about:       () => { for (let i=0;i<2;i++) setTimeout(spawnInkBlob,   1400 + i*700); },
      experience:  () => { for (let i=0;i<3;i++) setTimeout(spawnTypewriter,1400 + i*500); },
      credentials: () => { for (let i=0;i<2;i++) setTimeout(spawnGoldStar,  1400 + i*800); },
      projects:    () => { for (let i=0;i<3;i++) setTimeout(spawnPaperclip, 1400 + i*600); },
      skills:      () => { for (let i=0;i<2;i++) setTimeout(() => api.spawnGhost(), 1400 + i*700); },
    };
    window.addEventListener('tcaci:section', (e) => {
      const { id } = e.detail;
      SFX.bonus();
      // coin shower
      const N = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < N; i++) {
        setTimeout(() => spawnPickup('coin'), i * 140);
      }
      // chance of a power-up
      setTimeout(() => {
        const r = Math.random();
        if (r < 0.22) spawnPickup('shield');
        else if (r < 0.44) spawnPickup('slow');
        else if (r < 0.66) spawnPickup('mult');
        else if (r < 0.74) spawnPickup('star');
        else if (r < 0.78) spawnPickup('life');
      }, 1200);
      // themed enemy wave
      const wave = WAVES[id]; if (wave) wave();
      // full-edition achievement
      if (game.seenSections.size >= 6) award('full-edition');
    });

    /* ──────────────────────────────────────────
       PROJECT CLICK → wave
       ────────────────────────────────────────── */
    const PROJECT = {
      wealthlens: { color: '#2a6b78', label: 'WEALTHLENS' },
      taskdeck:   { color: '#1a4d3a', label: 'TASKDECK'   },
      metrix:     { color: '#cc3a2e', label: 'METRIX'     },
      navsentinel:{ color: '#b08a2e', label: 'NAVSENTINEL'},
      npdl:       { color: '#8b3df0', label: 'NPDL'       },
    };
    let lastProjWave = 0;
    document.addEventListener('click', (e) => {
      const el = e.target.closest('.tx-proj'); if (!el) return;
      const now = Date.now();
      if (now - lastProjWave < 2500) return;
      lastProjWave = now;
      const theme = PROJECT[el.dataset.proj]; if (!theme) return;

      const banner = document.createElement('div');
      banner.style.cssText = `
        position: fixed; left: 50%; top: 36%; transform: translate(-50%, -50%);
        z-index: 9986; pointer-events: none;
        font-family: 'IBM Plex Mono', monospace;
        background: var(--ink, #161514); color: ${theme.color};
        padding: 14px 28px;
        border: 2px solid ${theme.color};
        box-shadow: 6px 6px 0 ${theme.color};
        animation: project-wave 1.6s cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
        text-align: center;
      `;
      banner.innerHTML = `
        <div style="font-size: 9px; letter-spacing: 0.32em; color: #ffd84a;">★ INCOMING WAVE ★</div>
        <div style="font-size: 26px; letter-spacing: 0.08em; font-weight: 700; margin-top: 4px;">${theme.label}</div>
      `;
      document.body.appendChild(banner);
      setTimeout(() => banner.remove(), 1700);
      SFX.bonus();
      // 3 themed enemies + 1 coin
      for (let i = 0; i < 3; i++) {
        setTimeout(() => api.spawnGhost({ color: theme.color }), 500 + i * 220);
      }
      setTimeout(() => spawnPickup('coin'), 900);
    });

    /* ──────────────────────────────────────────
       BONUS STAGE — every ~75-100s
       ────────────────────────────────────────── */
    function bonusStage() {
      if (game.gameOver || game.paused) return;
      SFX.bonus();
      const banner = document.createElement('div');
      banner.style.cssText = `
        position: fixed; left: 50%; top: 32%; transform: translateX(-50%);
        z-index: 9986; pointer-events: none;
        font-family: 'IBM Plex Mono', monospace;
        text-align: center;
        animation: bonus-banner 2.4s ease-out forwards;
      `;
      banner.innerHTML = `
        <div style="font-family: Impact, 'Arial Black', sans-serif; font-size: clamp(60px, 10vw, 130px);
          color: #ffd84a; -webkit-text-stroke: 2px #cc3a2e;
          text-shadow: 0 6px 0 #6b1a14, 0 14px 28px rgba(0,0,0,0.3);
          letter-spacing: 0.04em; line-height: 0.9;">
          ★ BONUS ★
        </div>
        <div style="font-family: 'Newsreader', serif; font-style: italic;
          font-size: clamp(18px, 2.4vw, 24px); color: var(--ink, #161514); margin-top: 6px;">
          collect every coin · no penalties
        </div>
      `;
      document.body.appendChild(banner);
      setTimeout(() => banner.remove(), 2500);
      // coin rain
      for (let i = 0; i < 18; i++) {
        setTimeout(() => spawnPickup('coin'), 1500 + i * 110);
      }
      setTimeout(() => {
        const r = Math.random();
        if (r < 0.45) spawnPickup('star');
        else if (r < 0.78) spawnPickup('mult');
        else spawnPickup('life');
      }, 2400);
    }
    function scheduleBonus() {
      const wait = 75000 + Math.random() * 25000;
      setTimeout(() => { bonusStage(); scheduleBonus(); }, wait);
    }
    setTimeout(scheduleBonus, 50000);

    /* ──────────────────────────────────────────
       EVENT HOOKS — kill / hit / shield-block
       ────────────────────────────────────────── */
    let killTimes = [];
    window.addEventListener('tcaci:kill', (e) => {
      SFX.kill();
      const now = Date.now();
      killTimes.push(now);
      killTimes = killTimes.filter(t => now - t < 5000);
      if (killTimes.length >= 5) award('speedrun');

      const g = e.detail && e.detail.ghost;

      if (game.kills === 1)  award('first-ink');
      if (game.combo >= 5)   award('combo-5');
      if (g && g.isBoss)     award('deadline');
      if (game.score >= 1000) award('published');
      if (game.score >= 5000) award('bestseller');

      // chance of a drop at the kill site
      const dropChance = 0.18 + Math.min(0.18, game.stage * 0.025);
      if (g && Math.random() < dropChance) {
        const pool = ['coin','coin','coin','coin','shield','slow','mult'];
        if (Math.random() < 0.07) pool.push('life');
        if (Math.random() < 0.05) pool.push('star');
        const t = pool[Math.floor(Math.random() * pool.length)];
        spawnPickup(t, {
          x: g.x + g.size/2, y: g.y + g.size/2,
          vy: -0.9, vx: (Math.random() * 2 - 1) * 1.2, fromTop: false,
        });
      }
      if (g && g.isBoss) {
        for (let i = 0; i < 6; i++) {
          setTimeout(() => spawnPickup('coin', {
            x: g.x + g.size/2 + (Math.random() * 60 - 30),
            y: g.y + g.size/2, fromTop: false,
            vy: -1.5, vx: (Math.random() * 2 - 1) * 2,
          }), i * 70);
        }
        setTimeout(() => spawnPickup('star', {
          x: g.x + g.size/2, y: g.y + g.size/2, fromTop: false, vy: -1, vx: 0,
        }), 250);
      }
    });
    window.addEventListener('tcaci:hit', () => { SFX.hit(); });
    window.addEventListener('tcaci:shield-block', () => { SFX.shield(); award('editors-note'); });

    /* ──────────────────────────────────────────
       FIRST-TIME HINT + welcome coins
       ────────────────────────────────────────── */
    if (!sessionStorage.getItem('tcaci_plus_hint')) {
      sessionStorage.setItem('tcaci_plus_hint', '1');
      setTimeout(() => toast('catch coins · click ghosts', 'gold', '¢'), 4200);
      setTimeout(() => {
        for (let i = 0; i < 4; i++) {
          setTimeout(() => spawnPickup('coin', { x: 120 + Math.random() * 320, y: 60 }), i * 200);
        }
      }, 5500);
    }

    /* ──────────────────────────────────────────
       CSS
       ────────────────────────────────────────── */
    const css = document.createElement('style');
    css.textContent = `
      @keyframes ach-pop {
        0%  { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.7); }
        12% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.05); }
        20% { transform: translateX(-50%) translateY(0) scale(1); }
        88% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100%{ opacity: 0; transform: translateX(-50%) translateY(-12px); }
      }
      @keyframes pickup-burst {
        0%   { opacity: 1; transform: scale(0.3); }
        100% { opacity: 0; transform: scale(2.2); }
      }
      @keyframes project-wave {
        0%  { opacity: 0; transform: translate(-50%, -50%) scale(0.7) rotate(-2deg); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.05) rotate(1deg); }
        40% { transform: translate(-50%, -50%) scale(1) rotate(-1deg); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100%{ opacity: 0; transform: translate(-50%, -50%) scale(1.02); }
      }
      @keyframes bonus-banner {
        0%  { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.7); }
        14% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.08); }
        25% { transform: translateX(-50%) translateY(0) scale(1); }
        86% { opacity: 1; }
        100%{ opacity: 0; transform: translateX(-50%) translateY(-8px); }
      }
      @media print { [data-pickup] { display: none !important; } }
    `;
    document.head.appendChild(css);
  }
})();
