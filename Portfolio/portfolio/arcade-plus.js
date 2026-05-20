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
      { name: 'Besaid Island · FFX',     id: '8DmsfYt_-hU' },
      { name: 'FFVII · Full OST',        id: '-1ZBWUnYPbA' },
      { name: 'Pokémon R/B · OST',       id: 'HWob6x4Yk7E' },
      { name: 'Persona 5 · OST',         id: 'ZXni9_91ORs' },
      { name: "Baldur's Gate 3 · OST",   id: 'mC4GQTy5sqk' },
      { name: 'Game Music Orchestra',    id: 'y1pKkcw2WxE' },
      { name: 'Game Lofi · 24/7',        id: '4ud1w3_nJO8' },
      { name: 'Chrono Trigger · OST',    id: 'EeOexldS2B8' },
      { name: 'Zelda · OoT OST',         id: 'sIiEi96USlo' },
      { name: 'Skyrim · Full OST',       id: 'aQeIYVM3YBM' },
      { name: 'Kingdom Hearts · OST',    id: '5IJTYaj23Tc' },
      { name: 'NieR Automata · OST',     id: 'p2ETA--T4q4' },
      { name: 'Hollow Knight · OST',     id: '0HbnqjGirFg' },
      { name: 'Undertale · Full OST',    id: 's19c4Ysywyg' },
      { name: 'Stardew Valley · OST',    id: 'UKZF5k5cqOs' },
      { name: 'Ori · Blind Forest',      id: 'MeVFrt7BUyw' },
      { name: 'Divinity OS2 · OST',      id: 'WimydicRuGg' },
      { name: 'Witcher 3 · Full OST',    id: 'rI2vjPUztJc' },
      { name: 'Dark Souls · Full OST',   id: 'MTUI0nv29Rs' },
      { name: 'Hades · Full OST',        id: '3GRKJ87S5cI' },
      { name: 'Celeste · Full OST',      id: 'LcLvLVjVS5o' },
      { name: 'Minecraft · C418 OST',    id: 'Dg0IjOzopYU' },
      { name: 'Zelda · BotW OST',        id: 'o46NJtHcNgU' },
      { name: 'Outer Wilds · OST',       id: 'jnjE1_qQelQ' },
    ];

    let ytPlayer = null;
    let ytTrackIdx = Math.floor(Math.random() * YT_TRACKS.length);
    let ytIsPlaying = false;
    let ytVolume = 30;
    let ytApiLoaded = false;
    let userPaused = false;

    const ytWrap = document.createElement('div');
    ytWrap.id = 'tcaci-yt-wrap';
    ytWrap.innerHTML = '<div id="tcaci-yt-player"></div>';
    document.body.appendChild(ytWrap);

    const player = document.createElement('div');
    player.id = 'tcaci-music';
    player.innerHTML = `
      <button data-mp="play" title="Play / Pause">♫</button>
      <span data-mp="name">${YT_TRACKS[ytTrackIdx].name}</span>
      <button data-mp="prev" title="Previous track">◂◂</button>
      <button data-mp="next" title="Next track">▸▸</button>
      <input data-mp="vol" type="range" min="0" max="100" value="30" title="Volume">
    `;
    document.body.appendChild(player);

    let ytPendingPlay = false;

    function loadYTApi() {
      if (window.YT && window.YT.Player) {
        if (!ytPlayer) initYTPlayer();
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
      ytPlayer = new YT.Player('tcaci-yt-player', {
        height: '1',
        width: '1',
        videoId: YT_TRACKS[ytTrackIdx].id,
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
          onReady: function (ev) {
            ev.target.setVolume(ytVolume);
            ev.target.playVideo();
          },
          onStateChange: function (ev) {
            if (ev.data === YT.PlayerState.ENDED) {
              ytTrackIdx = (ytTrackIdx + 1) % YT_TRACKS.length;
              ytPlayer.loadVideoById(YT_TRACKS[ytTrackIdx].id);
            }
            ytIsPlaying = (ev.data === YT.PlayerState.PLAYING);
            if (ytIsPlaying) { ytPendingPlay = false; removeResumeListeners(); }
            updateMusicUI();
          },
          onError: function () {
            ytTrackIdx = (ytTrackIdx + 1) % YT_TRACKS.length;
            if (ytPlayer) ytPlayer.loadVideoById(YT_TRACKS[ytTrackIdx].id);
            updateMusicUI();
          },
        },
      });
    }

    function updateMusicUI() {
      const playBtn = player.querySelector('[data-mp="play"]');
      const nameEl = player.querySelector('[data-mp="name"]');
      if (playBtn) playBtn.textContent = (ytIsPlaying || ytPendingPlay) ? '◼' : '♫';
      if (nameEl) nameEl.textContent = YT_TRACKS[ytTrackIdx].name;
    }

    loadYTApi();
    ytPendingPlay = true;
    updateMusicUI();

    function removeResumeListeners() {
      ['pointerdown','keydown','click','scroll'].forEach(ev =>
        window.removeEventListener(ev, tryResumeOnInteraction)
      );
    }
    function tryResumeOnInteraction() {
      if (userPaused) { removeResumeListeners(); return; }
      if (ytPlayer && !ytIsPlaying && ytPendingPlay) {
        try { ytPlayer.playVideo(); } catch (_) {}
      }
      if (ytIsPlaying) removeResumeListeners();
    }
    ['pointerdown','keydown','click','scroll'].forEach(ev =>
      window.addEventListener(ev, tryResumeOnInteraction, { passive: true })
    );

    player.querySelector('[data-mp="play"]').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!ytPlayer) {
        userPaused = false;
        loadYTApi();
        ytPendingPlay = true;
        updateMusicUI();
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
      updateMusicUI();
    });

    player.querySelector('[data-mp="prev"]').addEventListener('click', (e) => {
      e.stopPropagation();
      ytTrackIdx = (ytTrackIdx - 1 + YT_TRACKS.length) % YT_TRACKS.length;
      if (ytPlayer) {
        ytPlayer.loadVideoById(YT_TRACKS[ytTrackIdx].id);
        ytPendingPlay = true;
        userPaused = false;
      } else {
        loadYTApi();
      }
      updateMusicUI();
    });

    player.querySelector('[data-mp="next"]').addEventListener('click', (e) => {
      e.stopPropagation();
      ytTrackIdx = (ytTrackIdx + 1) % YT_TRACKS.length;
      if (ytPlayer) {
        ytPlayer.loadVideoById(YT_TRACKS[ytTrackIdx].id);
        ytPendingPlay = true;
        userPaused = false;
      } else {
        loadYTApi();
      }
      updateMusicUI();
    });

    player.querySelector('[data-mp="vol"]').addEventListener('input', (e) => {
      e.stopPropagation();
      ytVolume = parseInt(e.target.value, 10);
      if (ytPlayer && typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(ytVolume);
    });

    window.addEventListener('tcaci:arcade-off', () => {
      if (ytPlayer && ytIsPlaying) ytPlayer.pauseVideo();
    });

    const musicCss = document.createElement('style');
    musicCss.textContent = `
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
      @media print { #tcaci-music { display: none !important; } }
      @media (max-width: 600px) {
        #tcaci-music { bottom: 10px; right: 8px; font-size: 9px; padding: 5px 8px; }
      }
    `;
    document.head.appendChild(musicCss);
  }
})();
