/* eslint-disable */
// Arcade Plus — power-ups, achievements, project waves, sound, bonus rounds.
// Layers on top of effects.js's initArcadeChaos via window.__tcaciGame.api.

(function () {
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCED) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  function whenReady(cb) {
    let called = false;
    function once() { if (called) return; called = true; cb(); }
    if (window.__tcaciGame && window.__tcaciGame.api) return once();
    window.addEventListener('tcaci:ready', once, { once: true });
    let tries = 0;
    const id = setInterval(() => {
      tries++;
      if (window.__tcaciGame && window.__tcaciGame.api) {
        clearInterval(id); once();
      } else if (tries > 100) clearInterval(id);
    }, 100);
  }

  whenReady(start);

  function start() {
    const game = window.__tcaciGame;
    const api  = game.api;

    game.magnetUntil = 0;
    game.piercingUntil = 0;
    game.usedPowerUps = new Set();

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
      magnet:      () => arp([330, 440, 660, 880], 0.04, 0.1, 'sine', 0.05),
      freeze:      () => arp([1568, 1318, 1046, 784], 0.06, 0.12, 'triangle', 0.06),
      nuke:        () => { beep(80, 0.3, 'sawtooth', 0.08); setTimeout(() => arp([120, 180, 260], 0.04, 0.08, 'square', 0.06), 150); },
      piercing:    () => arp([1200, 1600, 2000, 1800], 0.03, 0.06, 'sawtooth', 0.05),
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
      'magnetised':   { label: 'MAGNETISED',        sub: 'activated a magnet' },
      'frostbite':    { label: 'FROSTBITE',         sub: 'froze the press room' },
      'demolition':   { label: 'DEMOLITION',        sub: 'dropped a nuke' },
      'arsenal':      { label: 'FULL ARSENAL',      sub: 'used 5 different power-ups' },
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
      magnet: {
        size: 32, color: '#e04080', life: 12000,
        svg: `<svg viewBox="0 0 32 32" width="100%" height="100%">
          <path d="M 8 6 L 8 20 Q 8 28 16 28 Q 24 28 24 20 L 24 6" fill="none" stroke="#e04080" stroke-width="4" stroke-linecap="round"/>
          <rect x="5" y="4" width="6" height="6" rx="1" fill="#cc3a2e"/>
          <rect x="21" y="4" width="6" height="6" rx="1" fill="#3a9ee0"/>
        </svg>`,
        apply: () => {
          SFX.magnet(); toast('magnet · 8s', 'rouge', '🧲'); award('magnetised');
          game.magnetUntil = Date.now() + 8000;
        },
      },
      freeze: {
        size: 32, color: '#a0e8ff', life: 10000,
        svg: `<svg viewBox="0 0 32 32" width="100%" height="100%">
          <line x1="16" y1="2" x2="16" y2="30" stroke="#a0e8ff" stroke-width="2.5"/>
          <line x1="2" y1="16" x2="30" y2="16" stroke="#a0e8ff" stroke-width="2.5"/>
          <line x1="6" y1="6" x2="26" y2="26" stroke="#a0e8ff" stroke-width="1.8"/>
          <line x1="26" y1="6" x2="6" y2="26" stroke="#a0e8ff" stroke-width="1.8"/>
          <circle cx="16" cy="16" r="5" fill="#a0e8ff" opacity="0.5"/>
          <circle cx="16" cy="16" r="2" fill="#fff"/>
        </svg>`,
        apply: () => {
          SFX.freeze(); toast('freeze · 5s', 'teal', '❄'); award('frostbite');
          const list = (api.ghosts || []).slice();
          const saved = list.filter(g => g.alive).map(g => ({ g, spd: g.speed }));
          saved.forEach(({ g }) => {
            g.speed = 0;
            if (g.el) g.el.style.filter = (g.el.style.filter || '') + ' brightness(1.6) saturate(0.3)';
          });
          setTimeout(() => {
            saved.forEach(({ g, spd }) => {
              g.speed = spd;
              if (g.el) g.el.style.filter = g.el.style.filter.replace(/ ?brightness\(1\.6\) saturate\(0\.3\)/, '');
            });
          }, 5000);
        },
      },
      nuke: {
        size: 34, color: '#ff6040', life: 10000,
        svg: `<svg viewBox="0 0 34 34" width="100%" height="100%">
          <circle cx="17" cy="20" r="12" fill="#ff6040" stroke="#6b1a14" stroke-width="1.8"/>
          <rect x="15" y="2" width="4" height="10" rx="2" fill="#6b1a14"/>
          <path d="M 19 4 Q 24 2 22 7" stroke="#ffd84a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <text x="17" y="24" text-anchor="middle" font-family="Impact, sans-serif" font-size="10" fill="#fff">!</text>
        </svg>`,
        apply: () => {
          SFX.nuke(); toast('nuke · 1 dmg all', 'rouge', '💣'); award('demolition');
          const list = (api.ghosts || []).slice();
          for (const g of list) {
            if (!g.alive) continue;
            g.hp--;
            if (g.hp <= 0) {
              api.killGhost(g, g.x + g.size / 2, g.y + g.size / 2);
            } else {
              if (g.el) { g.el.style.transform = 'scale(1.2)'; setTimeout(() => { if (g.alive && g.el) g.el.style.transform = ''; }, 200); }
            }
          }
          const fl = document.createElement('div');
          fl.style.cssText = 'position:fixed;inset:0;background:rgba(255,96,64,0.35);z-index:9990;pointer-events:none;animation:hit-flash 0.5s ease-out forwards;';
          document.body.appendChild(fl);
          setTimeout(() => fl.remove(), 520);
        },
      },
      piercing: {
        size: 30, color: '#b060ff', life: 10000,
        svg: `<svg viewBox="0 0 30 30" width="100%" height="100%">
          <circle cx="15" cy="15" r="12" fill="none" stroke="#b060ff" stroke-width="2" stroke-dasharray="4 3"/>
          <polygon points="15,4 18,12 15,10 12,12" fill="#b060ff"/>
          <polygon points="15,26 18,18 15,20 12,18" fill="#b060ff"/>
          <polygon points="4,15 12,12 10,15 12,18" fill="#b060ff"/>
          <polygon points="26,15 18,18 20,15 18,12" fill="#b060ff"/>
        </svg>`,
        apply: () => {
          SFX.piercing(); toast('piercing · 6s', 'violet', '⚡');
          game.piercingUntil = Date.now() + 6000;
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

        // magnetic attraction — boosted when magnet powerup active
        const magnetOn = Date.now() < game.magnetUntil;
        const magnetR = magnetOn ? 500 : 90;
        const magnetStr = magnetOn ? 2.5 : 0.5;
        const dx = cur.x - p.x;
        const dy = cur.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < magnetR && d > 1) {
          const pull = (magnetR - d) / magnetR * magnetStr;
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
          if (p.type !== 'coin') {
            game.usedPowerUps.add(p.type);
            if (game.usedPowerUps.size >= 5) award('arsenal');
          }
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

    function spawnRedactor(opts = {}) {
      return api.spawnGhost({
        ...opts, kind: 'redactor', color: '#161514',
        size: 38, speedMul: 1.8, hp: 1, points: 90,
        svg: `<svg viewBox="0 0 38 38" width="100%" height="100%">
          <rect x="4" y="8" width="30" height="22" rx="2" fill="#161514" stroke="#cc3a2e" stroke-width="1.5"/>
          <rect x="8" y="12" width="22" height="3" rx="1" fill="#cc3a2e" opacity="0.8"/>
          <rect x="8" y="18" width="16" height="3" rx="1" fill="#cc3a2e" opacity="0.6"/>
          <rect x="8" y="24" width="20" height="3" rx="1" fill="#cc3a2e" opacity="0.4"/>
          <circle class="eye eye-l" cx="12" cy="7" r="1.5" fill="#ff4d4d"/>
          <circle class="eye eye-r" cx="26" cy="7" r="1.5" fill="#ff4d4d"/>
        </svg>`,
      });
    }
    function spawnCoffeeMug(opts = {}) {
      return api.spawnGhost({
        ...opts, kind: 'coffee', color: '#8a5a3a',
        size: 42, speedMul: 0.75, hp: 3, points: 100,
        svg: `<svg viewBox="0 0 42 42" width="100%" height="100%">
          <rect x="8" y="12" width="22" height="22" rx="3" fill="#8a5a3a" stroke="#5a3a2a" stroke-width="1.5"/>
          <path d="M 30 18 Q 38 18 38 24 Q 38 30 30 30" fill="none" stroke="#8a5a3a" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="19" cy="12" rx="11" ry="3" fill="#5a3a2a"/>
          <path d="M 14 6 Q 16 2 18 6" fill="none" stroke="#d8d0c0" stroke-width="1" opacity="0.5"/>
          <path d="M 19 4 Q 21 0 23 4" fill="none" stroke="#d8d0c0" stroke-width="1" opacity="0.5"/>
          <circle class="eye eye-l" cx="15" cy="22" r="2" fill="#f4f1ea"/>
          <circle class="eye eye-r" cx="25" cy="22" r="2" fill="#f4f1ea"/>
        </svg>`,
      });
    }
    function spawnEraserDust(opts = {}) {
      return api.spawnGhost({
        ...opts, kind: 'eraser', color: '#e8a0b0',
        size: 36, speedMul: 2.0, hp: 1, points: 75,
        svg: `<svg viewBox="0 0 36 36" width="100%" height="100%">
          <rect x="4" y="10" width="28" height="16" rx="8" fill="#e8a0b0" stroke="#c06080" stroke-width="1.5"/>
          <rect x="22" y="10" width="10" height="16" rx="4" fill="#c06080"/>
          <circle class="eye eye-l" cx="12" cy="18" r="2" fill="#fff"/>
          <circle class="eye eye-r" cx="18" cy="18" r="2" fill="#fff"/>
          <circle cx="12.5" cy="18.5" r="1" fill="#4a1a2a"/>
          <circle cx="18.5" cy="18.5" r="1" fill="#4a1a2a"/>
        </svg>`,
      });
    }
    function spawnRuler(opts = {}) {
      return api.spawnGhost({
        ...opts, kind: 'ruler', color: '#b08a2e',
        size: 48, speedMul: 0.9, hp: 2, points: 85,
        svg: `<svg viewBox="0 0 48 20" width="100%" height="100%">
          <rect x="2" y="2" width="44" height="16" rx="2" fill="#ffd84a" stroke="#b08a2e" stroke-width="1.5"/>
          ${[0,1,2,3,4,5,6,7].map(i => `<line x1="${6+i*5.5}" y1="2" x2="${6+i*5.5}" y2="${i%2===0?10:7}" stroke="#8a6a1e" stroke-width="0.8"/>`).join('')}
          <circle class="eye eye-l" cx="16" cy="10" r="1.8" fill="#4a2a0a"/>
          <circle class="eye eye-r" cx="32" cy="10" r="1.8" fill="#4a2a0a"/>
        </svg>`,
      });
    }

    function spawnBoss(bossType) {
      if (game.gameOver || game.paused || game.arcadeOff) return;
      const bosses = {
        editor: {
          color: '#cc3a2e', size: 90, hp: 6, points: 800,
          svg: `<svg viewBox="0 0 90 90" width="100%" height="100%">
            <path d="M 8 50 V 80 L 16 72 L 24 80 L 32 72 L 40 80 L 48 72 L 56 80 L 64 72 L 72 80 L 80 72 L 85 80 V 50 A 38 38 0 0 0 8 50 Z" fill="#cc3a2e"/>
            <circle cx="30" cy="42" r="10" fill="#fff"/><circle cx="62" cy="42" r="10" fill="#fff"/>
            <circle class="eye eye-l" cx="32" cy="44" r="5" fill="#0a1738"/>
            <circle class="eye eye-r" cx="64" cy="44" r="5" fill="#0a1738"/>
            <path d="M 18 28 L 28 20 L 38 28" stroke="#fff" stroke-width="3" fill="none"/>
            <path d="M 54 28 L 64 20 L 74 28" stroke="#fff" stroke-width="3" fill="none"/>
            <text x="46" y="70" text-anchor="middle" font-family="Impact" font-size="14" fill="#ffd84a">EDITOR</text>
          </svg>`,
        },
        deadline: {
          color: '#8b3df0', size: 100, hp: 8, points: 1200,
          svg: `<svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="42" fill="#1a0a30" stroke="#8b3df0" stroke-width="3"/>
            <circle cx="50" cy="50" r="36" fill="none" stroke="#b060ff" stroke-width="1" stroke-dasharray="6 4"/>
            <line x1="50" y1="50" x2="50" y2="20" stroke="#ffd84a" stroke-width="3" stroke-linecap="round"/>
            <line x1="50" y1="50" x2="72" y2="50" stroke="#cc3a2e" stroke-width="2" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="3" fill="#ffd84a"/>
            ${[0,1,2,3,4,5,6,7,8,9,10,11].map(i => { const a=i*30*Math.PI/180; return `<line x1="${50+Math.sin(a)*34}" y1="${50-Math.cos(a)*34}" x2="${50+Math.sin(a)*38}" y2="${50-Math.cos(a)*38}" stroke="#b060ff" stroke-width="${i%3===0?2:1}"/>`; }).join('')}
            <circle class="eye eye-l" cx="40" cy="45" r="4" fill="#cc3a2e"/>
            <circle class="eye eye-r" cx="60" cy="45" r="4" fill="#cc3a2e"/>
            <text x="50" y="78" text-anchor="middle" font-family="IBM Plex Mono" font-size="7" fill="#b060ff" letter-spacing="0.2em">DEADLINE</text>
          </svg>`,
        },
        printer: {
          color: '#2a6b78', size: 110, hp: 10, points: 1500,
          svg: `<svg viewBox="0 0 110 100" width="100%" height="100%">
            <rect x="10" y="30" width="90" height="50" rx="6" fill="#2a6b78" stroke="#1a4d3a" stroke-width="2"/>
            <rect x="20" y="10" width="70" height="25" rx="3" fill="#3a8a9a"/>
            <rect x="30" y="75" width="50" height="18" rx="2" fill="#f4f1ea" stroke="#b08a2e" stroke-width="1"/>
            <rect x="35" y="79" width="40" height="2" rx="1" fill="#161514" opacity="0.3"/>
            <rect x="35" y="84" width="30" height="2" rx="1" fill="#161514" opacity="0.3"/>
            <circle class="eye eye-l" cx="38" cy="50" r="8" fill="#0e1418"/>
            <circle class="eye eye-r" cx="72" cy="50" r="8" fill="#0e1418"/>
            <circle cx="40" cy="50" r="3" fill="#ff4d4d"/>
            <circle cx="74" cy="50" r="3" fill="#ff4d4d"/>
            <rect x="48" y="42" width="14" height="4" rx="2" fill="#cc3a2e"/>
            <text x="55" y="68" text-anchor="middle" font-family="Impact" font-size="10" fill="#ffd84a">PRINTER</text>
          </svg>`,
        },
      };
      const b = bosses[bossType] || bosses.editor;
      api.spawnGhost({ boss: true, color: b.color, size: b.size, hp: b.hp, points: b.points, svg: b.svg });
      toast(`★ BOSS · ${bossType.toUpperCase()} approaches! ★`, 'rouge', '💀');
    }

    let secretBossChance = 0;
    function maybeSecretBoss() {
      if (game.gameOver || game.paused || game.arcadeOff) return;
      secretBossChance += 0.02;
      if (game.score >= 3000 && Math.random() < secretBossChance) {
        secretBossChance = 0;
        spawnBoss(Math.random() < 0.5 ? 'deadline' : 'printer');
      }
    }
    window.addEventListener('tcaci:kill', () => maybeSecretBoss());

    /* ──────────────────────────────────────────
       SECTION ENTER → wave + coin shower
       ────────────────────────────────────────── */
    const WAVES = {
      about:       () => { for (let i=0;i<2;i++) setTimeout(spawnInkBlob,   1400 + i*700); setTimeout(spawnCoffeeMug, 2400); },
      experience:  () => { for (let i=0;i<3;i++) setTimeout(spawnTypewriter,1400 + i*500); setTimeout(spawnRedactor, 2800); },
      credentials: () => { for (let i=0;i<2;i++) setTimeout(spawnGoldStar,  1400 + i*800); setTimeout(spawnRuler, 2600); },
      projects:    () => { for (let i=0;i<3;i++) setTimeout(spawnPaperclip, 1400 + i*600); setTimeout(spawnEraserDust, 2400); },
      skills:      () => { for (let i=0;i<2;i++) setTimeout(() => api.spawnGhost(), 1400 + i*700); setTimeout(spawnRedactor, 2200); },
      contact:     () => { setTimeout(() => spawnBoss('editor'), 2000); },
    };
    window.addEventListener('tcaci:section', (e) => {
      if (game.arcadeOff) return;
      const { id } = e.detail;
      SFX.bonus();
      // coin shower
      const N = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < N; i++) {
        setTimeout(() => spawnPickup('coin'), i * 140);
      }
      // guaranteed power-up per section + chance of a second
      setTimeout(() => {
        const pool = ['shield','slow','mult','magnet','freeze','piercing'];
        spawnPickup(pool[Math.floor(Math.random() * pool.length)]);
      }, 1200);
      setTimeout(() => {
        const r = Math.random();
        if (r < 0.18) spawnPickup('star');
        else if (r < 0.30) spawnPickup('nuke');
        else if (r < 0.40) spawnPickup('life');
        else if (r < 0.55) spawnPickup('magnet');
      }, 2200);
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
      if (game.arcadeOff) return;
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
      // 3 themed enemies + coins + a powerup
      for (let i = 0; i < 3; i++) {
        setTimeout(() => api.spawnGhost({ color: theme.color }), 500 + i * 220);
      }
      for (let i = 0; i < 3; i++) {
        setTimeout(() => spawnPickup('coin'), 800 + i * 150);
      }
      const wavePool = ['shield','slow','mult','magnet','freeze','piercing'];
      setTimeout(() => spawnPickup(wavePool[Math.floor(Math.random() * wavePool.length)]), 1400);
    });

    /* ──────────────────────────────────────────
       BONUS STAGE — every ~75-100s
       ────────────────────────────────────────── */
    function bonusStage() {
      if (game.gameOver || game.paused || game.arcadeOff) return;
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
      // coin rain + powerup shower
      for (let i = 0; i < 22; i++) {
        setTimeout(() => spawnPickup('coin'), 1500 + i * 100);
      }
      const bonusPool = ['star','mult','life','magnet','freeze','nuke','shield','piercing'];
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          spawnPickup(bonusPool[Math.floor(Math.random() * bonusPool.length)]);
        }, 2200 + i * 600);
      }
    }
    function scheduleBonus() {
      const wait = 60000 + Math.random() * 20000;
      setTimeout(() => { bonusStage(); scheduleBonus(); }, wait);
    }
    setTimeout(scheduleBonus, 40000);

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

      // piercing splash: when active, kills damage nearby ghosts
      if (g && Date.now() < game.piercingUntil) {
        const splashR = 120;
        const gx = g.x + g.size / 2, gy = g.y + g.size / 2;
        for (const other of (api.ghosts || [])) {
          if (!other.alive || other === g) continue;
          const od = Math.hypot((other.x + other.size / 2) - gx, (other.y + other.size / 2) - gy);
          if (od < splashR) {
            other.hp--;
            if (other.hp <= 0) {
              api.killGhost(other, other.x + other.size / 2, other.y + other.size / 2);
            } else if (other.el) {
              other.el.style.transform = 'scale(1.15)';
              setTimeout(() => { if (other.alive && other.el) other.el.style.transform = ''; }, 150);
            }
          }
        }
      }

      // chance of a drop at the kill site — expanded pool
      const dropChance = 0.25 + Math.min(0.20, game.stage * 0.03);
      if (g && Math.random() < dropChance) {
        const pool = ['coin','coin','coin','shield','slow','mult','magnet','freeze'];
        if (Math.random() < 0.10) pool.push('life');
        if (Math.random() < 0.07) pool.push('star');
        if (Math.random() < 0.08) pool.push('nuke');
        if (Math.random() < 0.08) pool.push('piercing');
        const t = pool[Math.floor(Math.random() * pool.length)];
        spawnPickup(t, {
          x: g.x + g.size/2, y: g.y + g.size/2,
          vy: -0.9, vx: (Math.random() * 2 - 1) * 1.2, fromTop: false,
        });
      }
      if (g && g.isBoss) {
        for (let i = 0; i < 8; i++) {
          setTimeout(() => spawnPickup('coin', {
            x: g.x + g.size/2 + (Math.random() * 60 - 30),
            y: g.y + g.size/2, fromTop: false,
            vy: -1.5, vx: (Math.random() * 2 - 1) * 2,
          }), i * 70);
        }
        const bossDrops = ['star', 'nuke', 'freeze', 'magnet'];
        const bossDrop = bossDrops[Math.floor(Math.random() * bossDrops.length)];
        setTimeout(() => spawnPickup(bossDrop, {
          x: g.x + g.size/2, y: g.y + g.size/2, fromTop: false, vy: -1, vx: 0,
        }), 250);
        setTimeout(() => spawnPickup('life', {
          x: g.x + g.size/2 + 30, y: g.y + g.size/2, fromTop: false, vy: -1.2, vx: 0.5,
        }), 350);
      }
    });
    window.addEventListener('tcaci:hit', () => { SFX.hit(); });
    window.addEventListener('tcaci:shield-block', () => { SFX.shield(); award('editors-note'); });

    /* ──────────────────────────────────────────
       FIRST-TIME HINT + welcome coins
       ────────────────────────────────────────── */
    if (!sessionStorage.getItem('tcaci_plus_hint')) {
      sessionStorage.setItem('tcaci_plus_hint', '1');
      if (!game.arcadeOff) {
        setTimeout(() => toast('catch coins · grab power-ups · click ghosts', 'gold', '¢'), 4200);
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => spawnPickup('coin', { x: 100 + Math.random() * 360, y: 60 }), i * 180);
          }
          setTimeout(() => spawnPickup('shield', { x: 280, y: 50 }), 1200);
        }, 5500);
      }
    }

    /* ──────────────────────────────────────────
       AMBIENT DROPS — periodic powerup rain between sections
       ────────────────────────────────────────── */
    function ambientDrop() {
      if (game.gameOver || game.paused || game.arcadeOff) return;
      const pool = ['coin','coin','coin','shield','slow','mult','magnet','freeze','piercing'];
      spawnPickup(pool[Math.floor(Math.random() * pool.length)]);
    }
    function scheduleAmbient() {
      const wait = 12000 + Math.random() * 10000;
      setTimeout(() => { ambientDrop(); scheduleAmbient(); }, wait);
    }
    setTimeout(scheduleAmbient, 15000);

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

    /* ──────────────────────────────────────────
       YOUTUBE MUSIC PLAYER — iconic game soundtracks
       ────────────────────────────────────────── */
    const YT_TRACKS = [
      { name: 'Besaid Island · FFX', id: '8DmsfYt_-hU',
        game: 'Final Fantasy X', year: 2001, composer: 'Nobuo Uematsu',
        fact: 'Besaid Island\'s theme was composed to evoke the feeling of arriving somewhere warm and safe after a long journey. The track uses a blend of guitar, flute, and ocean ambience — Uematsu said he wanted players to "feel the sand between their toes." FFX was the first Final Fantasy with voice acting and a fully orchestrated score.',
        theme: { bg: 'linear-gradient(135deg, #0a2342, #1a5276, #21618c)', accent: '#5dade2', particles: ['🌊','🌴','✨','🐚'], effect: 'wave' }},
      { name: 'FFVII · Full OST', id: '-1ZBWUnYPbA',
        game: 'Final Fantasy VII', year: 1997, composer: 'Nobuo Uematsu',
        fact: 'FFVII\'s soundtrack contains 85 tracks — Uematsu composed the entire score in just one year. "One-Winged Angel" was the first Final Fantasy piece to feature full choir vocals and is considered one of gaming\'s most iconic boss themes. The opening Mako Reactor theme was designed to make players feel like industrial trespassers.',
        theme: { bg: 'linear-gradient(135deg, #0b3d0b, #145a14, #1a7a1a)', accent: '#39ff14', particles: ['⚡','🌿','💚','🗡️'], effect: 'mako' }},
      { name: 'Pokémon R/B · OST', id: 'HWob6x4Yk7E',
        game: 'Pokémon Red & Blue', year: 1996, composer: 'Junichi Masuda',
        fact: 'Junichi Masuda composed the entire Pokémon Red/Blue soundtrack on a Game Boy sound chip with only 4 audio channels. The Lavender Town theme became an internet legend for its unsettling, high-pitched tones that allegedly disturbed young players. Despite hardware limits, Masuda created 40+ distinct tracks.',
        theme: { bg: 'linear-gradient(135deg, #7b241c, #c0392b, #e74c3c)', accent: '#ff6b6b', particles: ['⚡','🔴','⭐','🎮'], effect: 'pixel' }},
      { name: 'Persona 5 · OST', id: 'ZXni9_91ORs',
        game: 'Persona 5', year: 2016, composer: 'Shoji Meguro',
        fact: '"Last Surprise" — Persona 5\'s battle theme — has over 200 million streams across platforms, making it one of the most-listened JRPG tracks ever. Meguro blended acid jazz, funk, and rock to create a sound unlike any other RPG. The vocalist Lyn Inaizumi was a then-unknown singer who auditioned on a whim.',
        theme: { bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', accent: '#e94560', particles: ['🎭','♠️','🃏','🔴'], effect: 'cards' }},
      { name: "Baldur's Gate 3 · OST", id: 'mC4GQTy5sqk',
        game: "Baldur's Gate 3", year: 2023, composer: 'Borislav Slavov',
        fact: 'Borislav Slavov recorded the BG3 soundtrack with the Budapest Film Orchestra. The companion song "I Want to Live" (Shadowheart\'s theme) moved so many players that it charted on music platforms. The camp music dynamically layers instruments based on which companions are present — a technical feat of adaptive scoring.',
        theme: { bg: 'linear-gradient(135deg, #2d1b4e, #4a1a6b, #6c2b8e)', accent: '#c39bd3', particles: ['🎲','✨','⚔️','🐉'], effect: 'magic' }},
      { name: 'Game Music Orchestra', id: 'y1pKkcw2WxE',
        game: 'Orchestral Medley', year: 2024, composer: 'Various Artists',
        fact: 'Video game orchestral concerts began with "Orchestral Game Music Concerts" in Tokyo (1991) and have since filled venues like the Royal Albert Hall and Sydney Opera House. The London Philharmonic\'s "Greatest Video Game Music" album debuted at #23 on the Billboard charts — a first for a game music album.',
        theme: { bg: 'linear-gradient(135deg, #4a3728, #6d4c30, #8b6914)', accent: '#f4d03f', particles: ['🎵','🎻','🎹','🎶'], effect: 'notes' }},
      { name: 'Game Lofi · 24/7', id: '4ud1w3_nJO8',
        game: 'Lofi Gaming Mix', year: 2024, composer: 'Various Artists',
        fact: 'The "lofi hip hop beats to study/relax to" phenomenon started on YouTube in 2017 and has since become a cultural institution. Game lofi remixes nostalgic melodies through vinyl crackle and jazz chords, creating the perfect blend of focus and nostalgia. These streams often run 24/7 with millions of concurrent listeners.',
        theme: { bg: 'linear-gradient(135deg, #3e2723, #5d4037, #795548)', accent: '#ffab91', particles: ['☕','🌧️','📻','🎧'], effect: 'rain' }},
      { name: 'Chrono Trigger · OST', id: 'EeOexldS2B8',
        game: 'Chrono Trigger', year: 1995, composer: 'Yasunori Mitsuda',
        fact: 'Yasunori Mitsuda was so determined to compose Chrono Trigger that he threatened to quit Square if he didn\'t get the job. He worked so intensely that he developed stomach ulcers, and Nobuo Uematsu finished the final 10 tracks. "Corridors of Time" is frequently cited as the greatest SNES composition ever made.',
        theme: { bg: 'linear-gradient(135deg, #1a237e, #283593, #3949ab)', accent: '#7c4dff', particles: ['⏰','🌀','⚡','🌟'], effect: 'time' }},
      { name: 'Zelda · OoT OST', id: 'sIiEi96USlo',
        game: 'Legend of Zelda: Ocarina of Time', year: 1998, composer: 'Koji Kondo',
        fact: 'Koji Kondo designed the ocarina songs to be playable on just 5 buttons — the same as a real pentatonic scale. "Zelda\'s Lullaby" uses only 3 notes in its core melody yet is instantly recognizable worldwide. The Lost Woods theme (Saria\'s Song) became one of the earliest viral game music memes on the internet.',
        theme: { bg: 'linear-gradient(135deg, #1b5e20, #2e7d32, #388e3c)', accent: '#69f0ae', particles: ['🧚','🌿','🗡️','🛡️'], effect: 'fairy' }},
      { name: 'Skyrim · Full OST', id: 'aQeIYVM3YBM',
        game: 'The Elder Scrolls V: Skyrim', year: 2011, composer: 'Jeremy Soule',
        fact: 'Jeremy Soule recorded "Dragonborn" (Dovahkiin) with a 30-person choir singing in the fictional dragon language. The choir had to learn to pronounce words like "Dovahkiin" and "Fus Ro Dah" correctly. The ambient exploration music was designed to blend seamlessly with wind and nature sounds, making players forget they were hearing a score.',
        theme: { bg: 'linear-gradient(135deg, #1a3a4a, #2c5f6e, #3d8393)', accent: '#b3e5fc', particles: ['❄️','⚔️','🐲','🏔️'], effect: 'snow' }},
      { name: 'Kingdom Hearts · OST', id: '5IJTYaj23Tc',
        game: 'Kingdom Hearts', year: 2002, composer: 'Yoko Shimomura',
        fact: 'Yoko Shimomura composed "Dearly Beloved" — the series\' menu theme — in a single sitting, and it has appeared in every Kingdom Hearts game since. Utada Hikaru\'s "Simple and Clean" was originally written in Japanese as "Hikari" and was re-recorded in English specifically for Western audiences. The game was born from a chance elevator meeting between Square and Disney executives.',
        theme: { bg: 'linear-gradient(135deg, #1a237e, #1565c0, #0277bd)', accent: '#ffd54f', particles: ['⭐','🗝️','💫','👑'], effect: 'sparkle' }},
      { name: 'NieR Automata · OST', id: 'p2ETA--T4q4',
        game: 'NieR: Automata', year: 2017, composer: 'Keiichi Okabe',
        fact: 'NieR Automata\'s soundtrack features vocals in a fictional "Chaos Language" — a blend of English, French, Japanese, and invented syllables designed to sound emotional without conveying literal meaning. The hacking minigame has an 8-bit version of every track. "Weight of the World" exists in 4 language versions, each unlocked in different endings.',
        theme: { bg: 'linear-gradient(135deg, #37474f, #455a64, #546e7a)', accent: '#cfd8dc', particles: ['⚙️','🌸','🤖','⚪'], effect: 'petals' }},
      { name: 'Hollow Knight · OST', id: '0HbnqjGirFg',
        game: 'Hollow Knight', year: 2017, composer: 'Christopher Larkin',
        fact: 'Christopher Larkin scored the entire game from his bedroom in Adelaide, Australia, using a mix of live instruments and digital samples. The City of Tears theme uses a constant rain percussion overlay that syncs with the in-game weather. Hollow Knight was made by a team of just 3 people, and Larkin\'s haunting score elevated it to classic status.',
        theme: { bg: 'linear-gradient(135deg, #0d1b2a, #1b2838, #253447)', accent: '#4fc3f7', particles: ['🦋','💎','🌙','🕯️'], effect: 'rain' }},
      { name: 'Undertale · Full OST', id: 's19c4Ysywyg',
        game: 'Undertale', year: 2015, composer: 'Toby Fox',
        fact: '"Megalovania" — originally composed for a Homestuck hack — has become one of the most remixed songs in internet history with over 50,000 fan versions. Toby Fox composed all 101 tracks himself. The soundtrack uses leitmotifs extensively: "Your Best Friend" contains melodic DNA that reappears across 15+ other tracks, rewarding attentive listeners.',
        theme: { bg: 'linear-gradient(135deg, #1a1a1a, #2d2d2d, #404040)', accent: '#ffeb3b', particles: ['❤️','💀','⭐','🦴'], effect: 'pixel' }},
      { name: 'Stardew Valley · OST', id: 'UKZF5k5cqOs',
        game: 'Stardew Valley', year: 2016, composer: 'ConcernedApe (Eric Barone)',
        fact: 'Eric "ConcernedApe" Barone not only programmed, designed, and drew all art for Stardew Valley — he also composed every single track. The seasonal music changes dynamically as in-game days progress. "Spring (It\'s a Big World Outside)" is specifically designed to evoke the feeling of starting something new with gentle optimism. The game has sold over 30 million copies.',
        theme: { bg: 'linear-gradient(135deg, #33691e, #558b2f, #689f38)', accent: '#c5e1a5', particles: ['⭐','🌾','🌻','🦋'], effect: 'sparkle' }},
      { name: 'Ori · Blind Forest', id: 'MeVFrt7BUyw',
        game: 'Ori and the Blind Forest', year: 2015, composer: 'Gareth Coker',
        fact: 'Gareth Coker recorded the soundtrack with the Nashville Music Scoring Orchestra. The opening track "Ori, Lost in the Storm" has made countless players cry within the first 10 minutes of gameplay — it\'s consistently ranked among the most emotional game openings ever. Coker personally attended over 200 recording sessions to perfect every nuance.',
        theme: { bg: 'linear-gradient(135deg, #1a237e, #0d47a1, #01579b)', accent: '#80d8ff', particles: ['✨','🌳','💫','🦋'], effect: 'glow' }},
      { name: 'Divinity OS2 · OST', id: 'WimydicRuGg',
        game: 'Divinity: Original Sin 2', year: 2017, composer: 'Borislav Slavov',
        fact: 'Borislav Slavov\'s work on Divinity OS2 earned him a BAFTA nomination and is considered a turning point for CRPG soundtracks. Each origin character has a unique musical theme that subtly plays during their story moments. The tavern song "Sing for Me" became a fan favorite, spawning countless covers and becoming a community anthem.',
        theme: { bg: 'linear-gradient(135deg, #4a148c, #6a1b9a, #7b1fa2)', accent: '#ea80fc', particles: ['🔥','💧','⚡','🌍'], effect: 'magic' }},
      { name: 'Witcher 3 · Full OST', id: 'rI2vjPUztJc',
        game: 'The Witcher 3: Wild Hunt', year: 2015, composer: 'Marcin Przybyłowicz',
        fact: 'The Witcher 3 soundtrack blends Slavic folk instruments — hurdy-gurdy, lute, and Slavic percussion — with a full orchestra. "The Wolven Storm" (Priscilla\'s Song) was performed in-game by voice actress Emma Hiddleston and became a viral sensation. The combat music dynamically layers based on enemy difficulty — a gwent match has entirely different music than a griffin fight.',
        theme: { bg: 'linear-gradient(135deg, #2c3e50, #34495e, #415b76)', accent: '#95a5a6', particles: ['⚔️','🐺','🌧️','🍺'], effect: 'rain' }},
      { name: 'Dark Souls · Full OST', id: 'MTUI0nv29Rs',
        game: 'Dark Souls', year: 2011, composer: 'Motoi Sakuraba',
        fact: 'Dark Souls deliberately uses silence for most exploration — there is no overworld music. This makes boss themes hit exponentially harder when they erupt. "Gwyn, Lord of Cinder" breaks every boss music convention: instead of bombastic orchestra, it\'s a simple, melancholic piano piece for the final boss, reflecting a fallen god rather than a triumphant villain.',
        theme: { bg: 'linear-gradient(135deg, #1a1a1a, #2d2d2d, #3e3e3e)', accent: '#ff6f00', particles: ['🔥','💀','⚔️','🌑'], effect: 'ember' }},
      { name: 'Hades · Full OST', id: '3GRKJ87S5cI',
        game: 'Hades', year: 2020, composer: 'Darren Korb',
        fact: 'Darren Korb invented the genre term "Mediterranean prog-rock death metal" to describe Hades\' sound. He voiced Zagreus AND composed every track, performing most instruments himself. "In the Blood" — the credits song — features vocals by Ashley Barrett and was nominated for a Grammy, a first for a video game original song at that time.',
        theme: { bg: 'linear-gradient(135deg, #4a0e0e, #7f1d1d, #991b1b)', accent: '#ef5350', particles: ['⚡','🏛️','🔥','💀'], effect: 'ember' }},
      { name: 'Celeste · Full OST', id: 'LcLvLVjVS5o',
        game: 'Celeste', year: 2018, composer: 'Lena Raine',
        fact: 'Lena Raine composed Celeste\'s soundtrack as a deeply personal exploration of anxiety and depression — themes central to the game\'s story. "Resurrections" (Chapter 6) builds from ambient dread into triumphant synths, mirroring Madeline\'s journey of self-acceptance. The B-side remixes were composed to match the brutally difficult alternate levels, creating an auditory "difficulty spike."',
        theme: { bg: 'linear-gradient(135deg, #1a237e, #283593, #4527a0)', accent: '#f48fb1', particles: ['🏔️','❄️','💜','⭐'], effect: 'snow' }},
      { name: 'Minecraft · C418 OST', id: 'Dg0IjOzopYU',
        game: 'Minecraft', year: 2011, composer: 'C418 (Daniel Rosenfeld)',
        fact: 'C418 composed "Sweden" — gaming\'s most nostalgic ambient track — in his bedroom as a 20-year-old. The music plays randomly and infrequently in-game, which makes each occurrence feel special and personal. Minecraft\'s soundtrack was designed to be the "silence between sounds" — Rosenfeld intentionally left long gaps between tracks so the game\'s natural audio could breathe.',
        theme: { bg: 'linear-gradient(135deg, #2e7d32, #388e3c, #43a047)', accent: '#a5d6a7', particles: ['🟩','⛏️','🌳','💎'], effect: 'pixel' }},
      { name: 'Zelda · BotW OST', id: 'o46NJtHcNgU',
        game: 'Legend of Zelda: Breath of the Wild', year: 2017, composer: 'Manaka Kataoka',
        fact: 'BotW broke Zelda tradition by using minimal, sparse piano instead of sweeping orchestral themes. Manaka Kataoka designed the soundtrack so players would hear more birdsong and wind than music — each piano note was placed to feel like a "raindrop in silence." The horse-riding music dynamically speeds up and slows down to match your galloping speed.',
        theme: { bg: 'linear-gradient(135deg, #1b5e20, #2e7d32, #4caf50)', accent: '#b9f6ca', particles: ['🌸','🍃','🎹','🌿'], effect: 'petals' }},
      { name: 'Outer Wilds · OST', id: 'jnjE1_qQelQ',
        game: 'Outer Wilds', year: 2019, composer: 'Andrew Prahlow',
        fact: 'Outer Wilds\' soundtrack features a banjo in space — an intentionally "wrong" instrument choice that perfectly captures the game\'s cozy-yet-cosmic tone. Each planet has a unique traveler playing a different instrument, and when you find them, their music layers into the mix. The 22-minute loop structure mirrors the game\'s time-loop mechanic — the music literally resets with the universe.',
        theme: { bg: 'linear-gradient(135deg, #0d1b2a, #1b2838, #1a237e)', accent: '#b388ff', particles: ['🔭','🪐','🌌','🏕️'], effect: 'cosmic' }},
    ];

    let ytPlayer = null;
    let ytReady = false;
    let ytTrackIdx = Math.floor(Math.random() * YT_TRACKS.length);
    let ytIsPlaying = false;
    let ytVolume = 30;
    let ytApiLoaded = false;
    let userPaused = false;
    let ytPendingPlay = false;

    const ytWrap = document.createElement('div');
    ytWrap.id = 'tcaci-yt-wrap';
    ytWrap.innerHTML = '<div id="tcaci-yt-player"></div>';
    document.body.appendChild(ytWrap);

    function loadYTApi() {
      if (window.YT && window.YT.Player) {
        if (!ytReady) initYTPlayer();
        return;
      }
      if (ytApiLoaded) return;
      ytApiLoaded = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      const prevCb = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (prevCb) prevCb();
        initYTPlayer();
      };
    }

    function initYTPlayer() {
      new YT.Player('tcaci-yt-player', {
        height: '1',
        width: '1',
        videoId: YT_TRACKS[ytTrackIdx].id,
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
          onReady: function (ev) {
            ytPlayer = ev.target;
            ytReady = true;
            ytPlayer.setVolume(ytVolume);
            ytPlayer.playVideo();
          },
          onStateChange: function (ev) {
            if (ev.data === YT.PlayerState.ENDED) {
              changeTrack(1);
            }
            ytIsPlaying = (ev.data === YT.PlayerState.PLAYING);
            if (ytIsPlaying) { ytPendingPlay = false; removeResumeListeners(); }
            updateAllUI();
          },
          onError: function () {
            changeTrack(1);
          },
        },
      });
    }

    function changeTrack(dir) {
      ytTrackIdx = (ytTrackIdx + dir + YT_TRACKS.length) % YT_TRACKS.length;
      if (ytReady && ytPlayer) {
        ytPlayer.loadVideoById(YT_TRACKS[ytTrackIdx].id);
        ytPendingPlay = true;
        userPaused = false;
      } else {
        loadYTApi();
      }
      updateAllUI();
    }

    function togglePlay() {
      if (!ytReady || !ytPlayer) {
        userPaused = false;
        loadYTApi();
        ytPendingPlay = true;
        updateAllUI();
        return;
      }
      const state = ytPlayer.getPlayerState();
      if (state === 1 || state === 3) {
        ytPlayer.pauseVideo();
        ytPendingPlay = false;
        userPaused = true;
      } else {
        ytPlayer.playVideo();
        ytPendingPlay = true;
        userPaused = false;
      }
      updateAllUI();
    }

    function setVolume(val) {
      ytVolume = val;
      if (ytReady && ytPlayer) ytPlayer.setVolume(ytVolume);
    }

    function updateAllUI() {
      updateMiniPlayer();
      updateCassette();
      updateThemeEffects();
    }

    loadYTApi();
    ytPendingPlay = true;

    function removeResumeListeners() {
      ['pointerdown','keydown','click','scroll'].forEach(ev =>
        window.removeEventListener(ev, tryResumeOnInteraction)
      );
    }
    function tryResumeOnInteraction() {
      if (userPaused) { removeResumeListeners(); return; }
      if (ytReady && ytPlayer && !ytIsPlaying && ytPendingPlay) {
        try { ytPlayer.playVideo(); } catch (_) {}
      }
      if (ytIsPlaying) removeResumeListeners();
    }
    ['pointerdown','keydown','click','scroll'].forEach(ev =>
      window.addEventListener(ev, tryResumeOnInteraction, { passive: true })
    );

    window.addEventListener('tcaci:arcade-off', () => {
      if (ytReady && ytPlayer && ytIsPlaying) ytPlayer.pauseVideo();
    });

    /* ──────────────────────────────────────────
       MINI PLAYER — compact bottom-right controller
       ────────────────────────────────────────── */
    const miniPlayer = document.createElement('div');
    miniPlayer.id = 'tcaci-music';
    miniPlayer.innerHTML = `
      <button data-mp="play" title="Play / Pause">♫</button>
      <span data-mp="name">${YT_TRACKS[ytTrackIdx].name}</span>
      <button data-mp="prev" title="Previous track">◂◂</button>
      <button data-mp="next" title="Next track">▸▸</button>
      <input data-mp="vol" type="range" min="0" max="100" value="30" title="Volume">
    `;
    document.body.appendChild(miniPlayer);

    function updateMiniPlayer() {
      const playBtn = miniPlayer.querySelector('[data-mp="play"]');
      const nameEl = miniPlayer.querySelector('[data-mp="name"]');
      if (playBtn) playBtn.textContent = (ytIsPlaying || ytPendingPlay) ? '◼' : '♫';
      if (nameEl) nameEl.textContent = YT_TRACKS[ytTrackIdx].name;
    }
    updateMiniPlayer();

    miniPlayer.querySelector('[data-mp="play"]').addEventListener('click', (e) => {
      e.stopPropagation(); togglePlay();
    });
    miniPlayer.querySelector('[data-mp="prev"]').addEventListener('click', (e) => {
      e.stopPropagation(); changeTrack(-1);
    });
    miniPlayer.querySelector('[data-mp="next"]').addEventListener('click', (e) => {
      e.stopPropagation(); changeTrack(1);
    });
    miniPlayer.querySelector('[data-mp="vol"]').addEventListener('input', (e) => {
      e.stopPropagation();
      setVolume(parseInt(e.target.value, 10));
      const casVol = document.querySelector('#tcaci-cassette input[type="range"]');
      if (casVol) casVol.value = e.target.value;
    });

    /* ──────────────────────────────────────────
       CASSETTE PLAYER — large retro music section
       ────────────────────────────────────────── */
    const cassette = document.createElement('section');
    cassette.id = 'tcaci-cassette';
    const track = YT_TRACKS[ytTrackIdx];
    cassette.innerHTML = `
      <div class="cas-inner">
        <div class="cas-header">
          <span class="cas-label">NOW SPINNING</span>
          <span class="cas-label">VOL. ${ytTrackIdx + 1} / ${YT_TRACKS.length}</span>
        </div>
        <div class="cas-body">
          <div class="cas-decor cas-decor-l"></div>
          <div class="cas-main">
            <div class="cas-tape">
              <div class="cas-tape-label">
                <div class="cas-tape-title">GAME SOUNDTRACKS</div>
                <div class="cas-tape-sub">MIXTAPE · SIDE A · ${YT_TRACKS.length} TRACKS</div>
              </div>
              <div class="cas-tape-window">
                <div class="cas-reel cas-reel-l"><div class="cas-reel-inner"></div></div>
                <div class="cas-tape-strip"></div>
                <div class="cas-reel cas-reel-r"><div class="cas-reel-inner"></div></div>
              </div>
              <div class="cas-tape-bottom">
                <div class="cas-tape-holes"></div>
              </div>
            </div>
            <div class="cas-info">
              <div class="cas-now-playing">NOW PLAYING</div>
              <div class="cas-track-name">${track.name}</div>
              <div class="cas-track-meta">${track.game} · ${track.year} · ${track.composer}</div>
              <div class="cas-track-fact">${track.fact}</div>
            </div>
            <div class="cas-controls">
              <button class="cas-btn" data-cas="prev" title="Previous">⏮</button>
              <button class="cas-btn cas-btn-play" data-cas="play" title="Play / Pause">▶</button>
              <button class="cas-btn" data-cas="next" title="Next">⏭</button>
              <div class="cas-vol-wrap">
                <span class="cas-vol-icon">🔊</span>
                <input type="range" min="0" max="100" value="${ytVolume}" class="cas-vol">
              </div>
            </div>
          </div>
          <div class="cas-decor cas-decor-r"></div>
        </div>
        <div class="cas-particles"></div>
      </div>
    `;

    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.parentNode.insertBefore(cassette, aboutEl);
    } else {
      const root = document.getElementById('root');
      if (root) root.appendChild(cassette);
    }

    function updateCassette() {
      const t = YT_TRACKS[ytTrackIdx];
      const nameEl = cassette.querySelector('.cas-track-name');
      const metaEl = cassette.querySelector('.cas-track-meta');
      const factEl = cassette.querySelector('.cas-track-fact');
      const volLabel = cassette.querySelector('.cas-inner > .cas-header > .cas-label:last-child');
      const playBtn = cassette.querySelector('[data-cas="play"]');
      if (nameEl) nameEl.textContent = t.name;
      if (metaEl) metaEl.textContent = `${t.game} · ${t.year} · ${t.composer}`;
      if (factEl) factEl.textContent = t.fact;
      if (volLabel) volLabel.textContent = `VOL. ${ytTrackIdx + 1} / ${YT_TRACKS.length}`;
      if (playBtn) playBtn.textContent = (ytIsPlaying || ytPendingPlay) ? '⏸' : '▶';

      const body = cassette.querySelector('.cas-body');
      if (body) body.style.background = t.theme.bg;

      cassette.classList.toggle('is-playing', ytIsPlaying || ytPendingPlay);
    }
    updateCassette();

    cassette.querySelector('[data-cas="play"]').addEventListener('click', (e) => {
      e.stopPropagation(); togglePlay();
    });
    cassette.querySelector('[data-cas="prev"]').addEventListener('click', (e) => {
      e.stopPropagation(); changeTrack(-1);
    });
    cassette.querySelector('[data-cas="next"]').addEventListener('click', (e) => {
      e.stopPropagation(); changeTrack(1);
    });
    cassette.querySelector('.cas-vol').addEventListener('input', (e) => {
      e.stopPropagation();
      setVolume(parseInt(e.target.value, 10));
      const miniVol = miniPlayer.querySelector('[data-mp="vol"]');
      if (miniVol) miniVol.value = e.target.value;
    });

    /* ──────────────────────────────────────────
       THEMED EFFECTS — ambient particles per track
       ────────────────────────────────────────── */
    let activeParticles = [];
    let particleRAF = null;
    const particleBox = cassette.querySelector('.cas-particles');

    function updateThemeEffects() {
      const t = YT_TRACKS[ytTrackIdx];
      activeParticles.forEach(el => el.remove());
      activeParticles = [];

      const decorL = cassette.querySelector('.cas-decor-l');
      const decorR = cassette.querySelector('.cas-decor-r');
      if (decorL) decorL.innerHTML = t.theme.particles.slice(0, 2).map(p =>
        `<span class="cas-float-icon">${p}</span>`).join('');
      if (decorR) decorR.innerHTML = t.theme.particles.slice(2, 4).map(p =>
        `<span class="cas-float-icon">${p}</span>`).join('');

      if (particleBox) {
        particleBox.innerHTML = '';
        if (ytIsPlaying || ytPendingPlay) spawnAmbientParticles(t);
      }
    }
    updateThemeEffects();

    function spawnAmbientParticles(t) {
      if (!particleBox) return;
      const count = 12;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'cas-particle';
        p.textContent = t.theme.particles[i % t.theme.particles.length];
        p.style.left = (Math.random() * 100) + '%';
        p.style.animationDelay = (Math.random() * 6) + 's';
        p.style.animationDuration = (4 + Math.random() * 6) + 's';
        p.style.fontSize = (12 + Math.random() * 16) + 'px';
        p.style.opacity = 0.15 + Math.random() * 0.35;
        particleBox.appendChild(p);
        activeParticles.push(p);
      }
    }

    /* ──────────────────────────────────────────
       ALL STYLES
       ────────────────────────────────────────── */
    const musicCss = document.createElement('style');
    musicCss.textContent = `
      /* --- Mini player (bottom-right) --- */
      #tcaci-music {
        position: fixed; bottom: 14px; right: 14px; z-index: 9988;
        font-family: 'IBM Plex Mono', monospace; font-size: 10px;
        letter-spacing: 0.08em;
        background: var(--ink, #161514);
        color: var(--paper, #f4f1ea);
        border: none;
        box-shadow: 0 2px 12px rgba(0,0,0,0.25);
        padding: 7px 12px;
        display: flex; gap: 8px; align-items: center;
        border-radius: 3px;
      }
      #tcaci-yt-wrap {
        position: fixed; left: -200px; top: -200px;
        width: 1px; height: 1px;
        pointer-events: none; opacity: 0.01;
      }
      #tcaci-music button {
        background: none; border: none;
        font-family: inherit; font-size: 12px; cursor: pointer;
        padding: 2px 6px; color: var(--paper, #f4f1ea);
        opacity: 0.7; transition: opacity 0.15s;
        line-height: 1; pointer-events: auto; position: relative;
      }
      #tcaci-music button:hover { opacity: 1; }
      #tcaci-music [data-mp="name"] {
        color: var(--rouge, #cc3a2e); font-weight: 600;
        font-size: 9px; letter-spacing: 0.12em;
        max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      #tcaci-music input[type="range"] {
        width: 40px; height: 3px; -webkit-appearance: none; appearance: none;
        background: rgba(255,255,255,0.2); border-radius: 2px; outline: none;
        cursor: pointer; pointer-events: auto; position: relative;
      }
      #tcaci-music input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; width: 12px; height: 12px;
        background: var(--rouge, #cc3a2e); border-radius: 50%; cursor: pointer;
        margin-top: -4.5px;
      }
      #tcaci-music input[type="range"]::-moz-range-thumb {
        width: 12px; height: 12px; border: none;
        background: var(--rouge, #cc3a2e); border-radius: 50%; cursor: pointer;
      }
      #tcaci-music input[type="range"]::-moz-range-track {
        height: 3px; background: rgba(255,255,255,0.2); border-radius: 2px; border: none;
      }

      /* --- Cassette player section --- */
      #tcaci-cassette {
        position: relative; padding: 48px 0 56px; overflow: hidden;
        border-top: 2px solid var(--rule, #1a1817);
        border-bottom: 2px solid var(--rule, #1a1817);
        background: var(--paper-2, #ebe6db);
      }
      .cas-inner {
        max-width: 900px; margin: 0 auto; padding: 0 32px; position: relative;
      }
      .cas-header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 20px;
      }
      .cas-label {
        font-family: var(--sans, 'IBM Plex Sans', sans-serif);
        font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--ink-dim, #5a554d);
      }
      .cas-body {
        display: flex; align-items: stretch; gap: 0;
        border-radius: 12px; overflow: hidden;
        background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
        box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
        transition: background 0.8s ease;
      }
      .cas-decor {
        width: 60px; min-height: 100%; display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 20px;
        padding: 20px 8px; position: relative; overflow: hidden;
      }
      .cas-float-icon {
        font-size: 24px; opacity: 0.6;
        animation: cas-float 4s ease-in-out infinite alternate;
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
      }
      .cas-float-icon:nth-child(2) { animation-delay: -2s; }
      .cas-main {
        flex: 1; padding: 28px 32px; display: flex; flex-direction: column; gap: 20px;
      }

      /* Cassette tape visual */
      .cas-tape {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px; padding: 16px 20px 12px;
        position: relative;
      }
      .cas-tape::before {
        content: ''; position: absolute; top: 8px; left: 50%;
        transform: translateX(-50%);
        width: 60%; height: 2px;
        background: rgba(255,255,255,0.08);
        border-radius: 1px;
      }
      .cas-tape-label {
        text-align: center; margin-bottom: 14px;
      }
      .cas-tape-title {
        font-family: var(--sans, 'IBM Plex Sans', sans-serif);
        font-size: 11px; font-weight: 700;
        letter-spacing: 0.3em; text-transform: uppercase;
        color: rgba(255,255,255,0.9);
      }
      .cas-tape-sub {
        font-family: var(--mono, 'IBM Plex Mono', monospace);
        font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase;
        color: rgba(255,255,255,0.4); margin-top: 4px;
      }
      .cas-tape-window {
        display: flex; align-items: center; justify-content: center; gap: 0;
        background: rgba(0,0,0,0.4); border-radius: 6px;
        padding: 12px 16px; position: relative;
        border: 1px solid rgba(255,255,255,0.06);
      }
      .cas-reel {
        width: 52px; height: 52px; border-radius: 50%;
        background: rgba(255,255,255,0.08);
        border: 2px solid rgba(255,255,255,0.15);
        display: flex; align-items: center; justify-content: center;
        position: relative; flex-shrink: 0;
      }
      .cas-reel-inner {
        width: 20px; height: 20px; border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.2);
        background: rgba(0,0,0,0.4);
        position: relative;
      }
      .cas-reel-inner::before {
        content: ''; position: absolute; inset: 4px;
        border-radius: 50%; background: rgba(255,255,255,0.1);
      }
      .cas-reel-inner::after {
        content: '+'; position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; color: rgba(255,255,255,0.3);
        font-family: var(--mono, monospace);
      }
      #tcaci-cassette.is-playing .cas-reel {
        animation: cas-spin 3s linear infinite;
      }
      .cas-tape-strip {
        flex: 1; height: 4px; margin: 0 8px;
        background: repeating-linear-gradient(
          90deg,
          rgba(139,69,19,0.6) 0px, rgba(139,69,19,0.6) 2px,
          rgba(139,69,19,0.3) 2px, rgba(139,69,19,0.3) 4px
        );
        border-radius: 2px;
        position: relative;
      }
      .cas-tape-strip::after {
        content: ''; position: absolute; inset: -1px 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent);
      }
      .cas-tape-bottom {
        margin-top: 10px; display: flex; justify-content: center;
      }
      .cas-tape-holes {
        display: flex; gap: 6px;
      }
      .cas-tape-holes::before, .cas-tape-holes::after {
        content: ''; width: 8px; height: 8px; border-radius: 50%;
        background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.06);
      }

      /* Track info */
      .cas-info { text-align: center; }
      .cas-now-playing {
        font-family: var(--sans, 'IBM Plex Sans', sans-serif);
        font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase;
        color: rgba(255,255,255,0.4); margin-bottom: 6px;
      }
      .cas-track-name {
        font-family: var(--serif, 'Newsreader', serif);
        font-size: 22px; font-weight: 500; color: #fff;
        letter-spacing: -0.02em; margin-bottom: 4px;
      }
      .cas-track-meta {
        font-family: var(--mono, 'IBM Plex Mono', monospace);
        font-size: 10px; letter-spacing: 0.1em;
        color: rgba(255,255,255,0.5); margin-bottom: 12px;
      }
      .cas-track-fact {
        font-family: var(--serif, 'Newsreader', serif);
        font-size: 14px; line-height: 1.6;
        color: rgba(255,255,255,0.75);
        max-width: 520px; margin: 0 auto;
        font-style: italic;
      }

      /* Controls */
      .cas-controls {
        display: flex; align-items: center; justify-content: center; gap: 16px;
      }
      .cas-btn {
        background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
        color: #fff; font-size: 16px; width: 40px; height: 40px;
        border-radius: 50%; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s;
        pointer-events: auto; position: relative;
      }
      .cas-btn:hover {
        background: rgba(255,255,255,0.15);
        border-color: rgba(255,255,255,0.3);
        transform: scale(1.05);
      }
      .cas-btn-play {
        width: 52px; height: 52px; font-size: 20px;
        background: rgba(255,255,255,0.12);
        border: 2px solid rgba(255,255,255,0.25);
      }
      .cas-btn-play:hover {
        background: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.4);
      }
      .cas-vol-wrap {
        display: flex; align-items: center; gap: 6px;
        margin-left: 8px;
      }
      .cas-vol-icon { font-size: 14px; opacity: 0.6; }
      .cas-vol {
        width: 70px; height: 4px;
        -webkit-appearance: none; appearance: none;
        background: rgba(255,255,255,0.15); border-radius: 2px;
        outline: none; cursor: pointer;
        pointer-events: auto; position: relative;
      }
      .cas-vol::-webkit-slider-thumb {
        -webkit-appearance: none; width: 14px; height: 14px;
        background: #fff; border-radius: 50%; cursor: pointer;
        margin-top: -5px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      }
      .cas-vol::-moz-range-thumb {
        width: 14px; height: 14px; border: none;
        background: #fff; border-radius: 50%; cursor: pointer;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      }
      .cas-vol::-moz-range-track {
        height: 4px; background: rgba(255,255,255,0.15);
        border-radius: 2px; border: none;
      }

      /* Particles */
      .cas-particles {
        position: absolute; inset: 0; pointer-events: none;
        overflow: hidden; z-index: 0;
      }
      .cas-particle {
        position: absolute; bottom: -30px;
        animation: cas-rise linear infinite;
        pointer-events: none;
      }

      /* Animations */
      @keyframes cas-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes cas-float {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-8px) rotate(10deg); }
      }
      @keyframes cas-rise {
        0% { bottom: -30px; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { bottom: 100%; opacity: 0; transform: translateX(20px) rotate(180deg); }
      }

      /* Print & responsive */
      @media print {
        #tcaci-music, #tcaci-cassette { display: none !important; }
      }
      @media (max-width: 900px) {
        .cas-inner { padding: 0 20px; }
        .cas-decor { width: 40px; }
        .cas-float-icon { font-size: 18px; }
        .cas-main { padding: 20px 16px; }
        .cas-track-name { font-size: 18px; }
        .cas-track-fact { font-size: 13px; }
        .cas-reel { width: 40px; height: 40px; }
        .cas-reel-inner { width: 16px; height: 16px; }
      }
      @media (max-width: 600px) {
        #tcaci-music { bottom: 10px; right: 8px; font-size: 9px; padding: 5px 8px; }
        #tcaci-cassette { padding: 32px 0 40px; }
        .cas-decor { display: none; }
        .cas-body { border-radius: 8px; }
        .cas-main { padding: 16px 12px; }
        .cas-track-name { font-size: 16px; }
        .cas-track-fact { font-size: 12px; }
        .cas-tape-window { padding: 8px 12px; }
        .cas-reel { width: 36px; height: 36px; }
        .cas-reel-inner { width: 14px; height: 14px; }
        .cas-controls { gap: 10px; }
        .cas-btn { width: 36px; height: 36px; font-size: 14px; }
        .cas-btn-play { width: 44px; height: 44px; font-size: 18px; }
        .cas-vol { width: 50px; }
      }
    `;
    document.head.appendChild(musicCss);
  }
})();
