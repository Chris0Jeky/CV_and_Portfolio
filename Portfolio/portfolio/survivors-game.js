(function () {
  'use strict';

  var W = 480, H = 270;
  var WORLD = 3000;
  var MAX_ENEMIES = 180;
  var MAX_PROJ = 120;
  var MAX_PARTICLES = 350;
  var MAX_PICKUPS = 120;

  var PAL = {
    bg: '#0a0618', grid: '#150d2e', gridLine: '#1a1040',
    player: '#00ffcc', playerDk: '#009977', playerBand: '#ff3366',
    hp: '#ff3366', hpBg: '#330018', xp: '#4488ff', xpBg: '#0a1133',
    slime: '#ff66aa', oni: '#ff4444', kappa: '#44dd77',
    tengu: '#aa77ff', spider: '#ffaa33', eye: '#ff44ff', boss: '#ffddaa',
    gem1: '#4488ff', gem2: '#44ddff', gem3: '#ff44aa',
    heart: '#ff3366', chest: '#ffcc00',
    uiBg: 'rgba(10,6,24,0.88)', uiBorder: '#ff6622', uiText: '#ffffff',
    uiDim: '#8866aa', uiGold: '#ffcc00',
    shuriken: '#ccccff', katana: '#aaddff', fire: '#ff6600',
    thunder: '#ffff44', fox: '#66ffaa', sake: '#ff4466',
  };

  var KILL_TEXTS = ['何?!','すごい!','やった!','最高!','痛い!','無理!','完璧!','鬼!','KO!','ナイス!','天罰!','成敗!'];

  var WEAPON_DEFS = [
    { id:'shuriken', name:'手裏剣', en:'Shuriken', desc:['4-way throw','8-way throw','+50% damage','Pierce +1','12-way, pierce +1'],
      color:PAL.shuriken, cd:1.2, dmg:10 },
    { id:'zangetsu', name:'斬月', en:'Moon Slash', desc:['Short slash','+30% range','+50% damage','Double slash','Huge + knockback'],
      color:PAL.katana, cd:1.5, dmg:15 },
    { id:'katon', name:'火遁', en:'Fire Release', desc:['1 fireball','Pierce +2','+50% damage','2 fireballs','3 + explosion'],
      color:PAL.fire, cd:2.0, dmg:20 },
    { id:'raiko', name:'雷鼓', en:'Thunder Drum', desc:['1 strike','2 strikes','+50% damage','3 + chain','5 + stun'],
      color:PAL.thunder, cd:2.5, dmg:30 },
    { id:'kitsune', name:'狐火', en:'Fox Fire', desc:['1 orb','2 orbs','+50% damage','3 orbs + speed','4 orbs + size'],
      color:PAL.fox, cd:0, dmg:8 },
    { id:'sake', name:'酒爆弾', en:'Sake Bomb', desc:['Small blast','+40% radius','+50% damage','Faster cooldown','Huge blast'],
      color:PAL.sake, cd:4.0, dmg:25 },
  ];

  var PASSIVE_DEFS = [
    { id:'tabi', name:'足袋', en:'Speed', desc:'Move +10%', color:'#44ddff', max:5 },
    { id:'yoroi', name:'鎧', en:'Armor', desc:'Damage -1', color:'#aaaacc', max:5 },
    { id:'shinzo', name:'心臓', en:'Heart', desc:'Max HP +20', color:'#ff6688', max:5 },
    { id:'jishaku', name:'磁石', en:'Magnet', desc:'Range +40%', color:'#ff4444', max:5 },
    { id:'keiken', name:'経験', en:'XP Boost', desc:'XP +15%', color:'#44aaff', max:5 },
    { id:'reikyaku', name:'冷却', en:'Cooldown', desc:'CD -8%', color:'#88ccff', max:5 },
  ];

  var ENEMY_DEFS = [
    { id:'slime', name:'スライム', hp:15, spd:30, dmg:5, xp:1, size:8, color:PAL.slime },
    { id:'kappa', name:'河童', hp:25, spd:45, dmg:8, xp:2, size:9, color:PAL.kappa },
    { id:'tengu', name:'天狗', hp:20, spd:80, dmg:10, xp:3, size:9, color:PAL.tengu },
    { id:'oni', name:'鬼', hp:60, spd:25, dmg:15, xp:5, size:14, color:PAL.oni },
    { id:'spider', name:'蜘蛛', hp:35, spd:40, dmg:8, xp:3, size:10, color:PAL.spider },
    { id:'eye', name:'一つ目', hp:30, spd:50, dmg:12, xp:4, size:10, color:PAL.eye },
    { id:'boss', name:'骸骨大将', hp:500, spd:20, dmg:25, xp:50, size:24, color:PAL.boss },
  ];

  function dist(x1,y1,x2,y2){ var dx=x2-x1,dy=y2-y1; return Math.sqrt(dx*dx+dy*dy); }
  function ang(x1,y1,x2,y2){ return Math.atan2(y2-y1,x2-x1); }
  function lerp(a,b,t){ return a+(b-a)*t; }
  function clamp(v,lo,hi){ return v<lo?lo:v>hi?hi:v; }
  function rand(a,b){ return Math.random()*(b-a)+a; }
  function randInt(a,b){ return Math.floor(rand(a,b+1)); }
  function choice(a){ return a[Math.floor(Math.random()*a.length)]; }

  function ChipSound() {
    this.ctx = null; this.on = true;
  }
  ChipSound.prototype.init = function() {
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { this.on = false; }
  };
  ChipSound.prototype._tone = function(freq, type, dur, vol, slide) {
    if (!this.on || !this.ctx) return;
    var c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = type;
    o.frequency.setValueAtTime(freq, c.currentTime);
    if (slide) o.frequency.linearRampToValueAtTime(freq + slide, c.currentTime + dur);
    g.gain.setValueAtTime(vol || 0.07, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.start(c.currentTime); o.stop(c.currentTime + dur);
  };
  ChipSound.prototype.hit = function(){ this._tone(220,'square',0.06,0.06,-120); };
  ChipSound.prototype.kill = function(){ this._tone(440,'square',0.1,0.06,300); };
  ChipSound.prototype.pickup = function(){ this._tone(880,'sine',0.08,0.05,200); };
  ChipSound.prototype.hurt = function(){ this._tone(120,'sawtooth',0.18,0.07,-60); };
  ChipSound.prototype.lvl = function(){
    var self=this;
    [523,659,784,1047].forEach(function(f,i){
      setTimeout(function(){ self._tone(f,'square',0.12,0.06); }, i*80);
    });
  };
  ChipSound.prototype.boom = function(){ this._tone(60,'sawtooth',0.3,0.08,40); };
  ChipSound.prototype.select = function(){ this._tone(660,'square',0.05,0.05); };
  ChipSound.prototype.start = function(){ this._tone(523,'triangle',0.15,0.06); };

  function SurvivorsGame(canvas) {
    this.cvs = canvas;
    this.c = canvas.getContext('2d');
    canvas.width = W; canvas.height = H;
    this.c.imageSmoothingEnabled = false;
    this.sfx = new ChipSound();
    this.state = 'BOOT';
    this.bootT = 0;
    this.titleT = 0;
    this.gameT = 0;
    this._clock = 0;
    this.resetState();
    this._raf = null;
    this._last = 0;
    this._onKey = null;
    this._onKeyUp = null;
    this._onClick = null;
    this.keys = {};
  }

  SurvivorsGame.prototype.resetState = function() {
    this.p = {
      x: WORLD/2, y: WORLD/2,
      hp: 100, maxHp: 100,
      xp: 0, xpNext: 5, lv: 1,
      spd: 140, spdMul: 1,
      armor: 0, magMul: 1, xpMul: 1, cdMul: 1,
      inv: 0, flash: 0, facing: 1, bob: 0,
      weapons: [{ id:'shuriken', lv:1, cd:0 }],
      passives: {},
      foxAngles: [],
      foxHitCd: new Map(),
    };
    this.enemies = [];
    this.projs = [];
    this.pickups = [];
    this.parts = [];
    this.dmgNums = [];
    this.slashes = [];
    this.bolts = [];
    this.cam = { x: WORLD/2, y: WORLD/2 };
    this.shake = { x:0, y:0, amt:0 };
    this.flash = 0;
    this.kills = 0;
    this.combo = 0;
    this.comboT = 0;
    this.maxCombo = 0;
    this.spawnT = 0;
    this.spawnAcc = 0;
    this.bossCount = 0;
    this.gameT = 0;
    this.lvlChoices = [];
    this.paused = false;
  };

  SurvivorsGame.prototype.bindInput = function() {
    var self = this;
    this.keys = {};
    this._onKey = function(e) {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','Enter',' '].indexOf(e.key) >= 0) e.preventDefault();
      self.keys[e.key] = true;
      self.keys[e.code] = true;
      self._handleKey(e.key);
    };
    this._onKeyUp = function(e) {
      self.keys[e.key] = false;
      self.keys[e.code] = false;
    };
    this._onClick = function(e) {
      self._handleClick(e);
    };
    window.addEventListener('keydown', this._onKey);
    window.addEventListener('keyup', this._onKeyUp);
    this.cvs.addEventListener('click', this._onClick);
  };

  SurvivorsGame.prototype.unbindInput = function() {
    if (this._onKey) window.removeEventListener('keydown', this._onKey);
    if (this._onKeyUp) window.removeEventListener('keyup', this._onKeyUp);
    if (this._onClick) this.cvs.removeEventListener('click', this._onClick);
  };

  SurvivorsGame.prototype._handleKey = function(k) {
    if (this.state === 'TITLE' && (k === ' ' || k === 'Enter')) this._startGame();
    else if (this.state === 'GAME_OVER' && (k === ' ' || k === 'Enter')) this._restart();
    else if (this.state === 'LEVEL_UP') {
      var n = parseInt(k);
      if (n >= 1 && n <= this.lvlChoices.length) this._selectUpgrade(n - 1);
    }
  };

  SurvivorsGame.prototype._handleClick = function(e) {
    if (this.state === 'TITLE') { this._startGame(); return; }
    if (this.state === 'GAME_OVER') { this._restart(); return; }
    if (this.state === 'LEVEL_UP') {
      var rect = this.cvs.getBoundingClientRect();
      var sx = W / rect.width, sy = H / rect.height;
      var mx = (e.clientX - rect.left) * sx;
      var my = (e.clientY - rect.top) * sy;
      var count = this.lvlChoices.length;
      var cardW = 100, cardH = 120;
      var gap = 16;
      var totalW = count * cardW + (count - 1) * gap;
      var startX = (W - totalW) / 2;
      var startY = (H - cardH) / 2 - 5;
      for (var i = 0; i < count; i++) {
        var cx = startX + i * (cardW + gap);
        if (mx >= cx && mx <= cx + cardW && my >= startY && my <= startY + cardH) {
          this._selectUpgrade(i);
          return;
        }
      }
    }
  };

  SurvivorsGame.prototype.start = function() {
    this.sfx.init();
    this.state = 'BOOT';
    this.bootT = 0;
    this.bindInput();
    this._last = performance.now();
    var self = this;
    function loop() {
      var now = performance.now();
      var dt = Math.min((now - self._last) / 1000, 0.05);
      self._last = now;
      if (!self.paused) { self._update(dt); self._render(); }
      self._raf = requestAnimationFrame(loop);
    }
    loop();
  };

  SurvivorsGame.prototype.destroy = function() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this.unbindInput();
  };

  SurvivorsGame.prototype._startGame = function() {
    this.sfx.start();
    this.resetState();
    this.state = 'PLAYING';
  };

  SurvivorsGame.prototype._restart = function() {
    this._startGame();
  };

  SurvivorsGame.prototype._update = function(dt) {
    this._clock += dt;
    if (this.state === 'BOOT') {
      this.bootT += dt;
      if (this.bootT > 2.2) { this.state = 'TITLE'; this.titleT = 0; }
    } else if (this.state === 'TITLE') {
      this.titleT += dt;
    } else if (this.state === 'PLAYING') {
      this._updatePlaying(dt);
    } else if (this.state === 'GAME_OVER') {
      this._updateParts(dt);
      this._updateDmgNums(dt);
      this._updateEffects(dt);
    }
  };

  SurvivorsGame.prototype._updatePlaying = function(dt) {
    this.gameT += dt;
    this._updatePlayer(dt);
    this._updateEnemies(dt);
    this._updateWeapons(dt);
    this._updateProjs(dt);
    this._updatePickups(dt);
    this._updateParts(dt);
    this._updateDmgNums(dt);
    this._updateSlashes(dt);
    this._updateBolts(dt);
    this._updateFox(dt);
    this._updateEffects(dt);
    this._spawnEnemies(dt);
  };

  SurvivorsGame.prototype._updatePlayer = function(dt) {
    var p = this.p;
    var dx = 0, dy = 0;
    var k = this.keys;
    if (k['w'] || k['W'] || k['ArrowUp']) dy = -1;
    if (k['s'] || k['S'] || k['ArrowDown']) dy = 1;
    if (k['a'] || k['A'] || k['ArrowLeft']) dx = -1;
    if (k['d'] || k['D'] || k['ArrowRight']) dx = 1;
    if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }
    var spd = p.spd * p.spdMul;
    p.x += dx * spd * dt;
    p.y += dy * spd * dt;
    p.x = clamp(p.x, 20, WORLD - 20);
    p.y = clamp(p.y, 20, WORLD - 20);
    if (dx !== 0) p.facing = dx > 0 ? 1 : -1;
    if (dx !== 0 || dy !== 0) p.bob += dt * 10;
    if (p.inv > 0) p.inv -= dt;
    p.flash = p.inv > 0 ? p.flash + dt * 20 : 0;

    this.cam.x = lerp(this.cam.x, p.x, 6 * dt);
    this.cam.y = lerp(this.cam.y, p.y, 6 * dt);
    this.cam.x = clamp(this.cam.x, W / 2, WORLD - W / 2);
    this.cam.y = clamp(this.cam.y, H / 2, WORLD - H / 2);
  };

  SurvivorsGame.prototype._updateEnemies = function(dt) {
    var p = this.p;
    for (var i = this.enemies.length - 1; i >= 0; i--) {
      var e = this.enemies[i];
      var a = ang(e.x, e.y, p.x, p.y);
      var s = e.spd;
      if (e.type === 'tengu') {
        e.dashT = (e.dashT || 0) + dt;
        if (e.dashT > 2.5 && e.dashT < 2.8) s *= 3;
        if (e.dashT > 3) e.dashT = 0;
      }
      e.x += Math.cos(a) * s * dt;
      e.y += Math.sin(a) * s * dt;
      e.anim = (e.anim || 0) + dt;
      if (e.hitFlash > 0) e.hitFlash -= dt;

      if (p.inv <= 0) {
        var d = dist(e.x, e.y, p.x, p.y);
        if (d < e.size + 6) {
          this._damagePlayer(e.dmg);
        }
      }
    }
  };

  SurvivorsGame.prototype._updateWeapons = function(dt) {
    var p = this.p;
    for (var i = 0; i < p.weapons.length; i++) {
      var w = p.weapons[i];
      if (w.id === 'kitsune') continue;
      w.cd -= dt;
      if (w.cd <= 0) {
        this._fireWeapon(w);
        var def = this._wdef(w.id);
        var cd = def.cd * p.cdMul;
        if (w.id === 'sake' && w.lv >= 4) cd *= 0.65;
        w.cd = cd;
      }
    }
  };

  SurvivorsGame.prototype._wdef = function(id) {
    for (var i = 0; i < WEAPON_DEFS.length; i++) if (WEAPON_DEFS[i].id === id) return WEAPON_DEFS[i];
    return WEAPON_DEFS[0];
  };

  SurvivorsGame.prototype._fireWeapon = function(w) {
    var p = this.p;
    if (w.id === 'shuriken') this._fireShuriken(w);
    else if (w.id === 'zangetsu') this._fireZangetsu(w);
    else if (w.id === 'katon') this._fireKaton(w);
    else if (w.id === 'raiko') this._fireRaiko(w);
    else if (w.id === 'sake') this._fireSake(w);
  };

  SurvivorsGame.prototype._fireShuriken = function(w) {
    var lv = w.lv;
    var dirs = lv >= 5 ? 12 : lv >= 2 ? 8 : 4;
    var dmg = 10 * (lv >= 3 ? 1.5 : 1);
    var pierce = lv >= 5 ? 2 : lv >= 4 ? 1 : 0;
    var p = this.p;
    for (var i = 0; i < dirs; i++) {
      var a = (Math.PI * 2 / dirs) * i;
      if (this.projs.length < MAX_PROJ) {
        this.projs.push({
          x:p.x, y:p.y, vx:Math.cos(a)*200, vy:Math.sin(a)*200,
          dmg:dmg, pierce:pierce, pierced:0, life:1.5, type:'shuriken',
          rot:0, size:4, color:PAL.shuriken
        });
      }
    }
    this.sfx.hit();
  };

  SurvivorsGame.prototype._fireZangetsu = function(w) {
    var lv = w.lv;
    var range = 50 * (lv >= 2 ? 1.3 : 1) * (lv >= 5 ? 1.8 : 1);
    var dmg = 15 * (lv >= 3 ? 1.5 : 1);
    var hits = lv >= 4 ? 2 : 1;
    var kb = lv >= 5 ? 120 : 30;
    var p = this.p;
    for (var h = 0; h < hits; h++) {
      this.slashes.push({ x:p.x, y:p.y, r:range, life:0.25, maxLife:0.25,
        dmg:dmg, kb:kb, hit: new Set(), delay: h * 0.15 });
    }
    this.sfx.hit();
  };

  SurvivorsGame.prototype._fireKaton = function(w) {
    var lv = w.lv;
    var count = lv >= 5 ? 3 : lv >= 4 ? 2 : 1;
    var dmg = 20 * (lv >= 3 ? 1.5 : 1);
    var pierce = lv >= 2 ? 4 : 2;
    var p = this.p;
    var ne = this._nearestEnemy();
    var baseA = ne ? ang(p.x, p.y, ne.x, ne.y) : p.facing > 0 ? 0 : Math.PI;
    for (var i = 0; i < count; i++) {
      var spread = count > 1 ? (i - (count-1)/2) * 0.25 : 0;
      var a = baseA + spread;
      if (this.projs.length < MAX_PROJ) {
        this.projs.push({
          x:p.x, y:p.y, vx:Math.cos(a)*180, vy:Math.sin(a)*180,
          dmg:dmg, pierce:pierce, pierced:0, life:2.0, type:'fire',
          size:5, color:PAL.fire, explode: lv >= 5, trail:0
        });
      }
    }
    this.sfx.hit();
  };

  SurvivorsGame.prototype._fireRaiko = function(w) {
    var lv = w.lv;
    var targets = lv >= 5 ? 5 : lv >= 4 ? 3 : lv >= 2 ? 2 : 1;
    var dmg = 30 * (lv >= 3 ? 1.5 : 1);
    var stun = lv >= 5 ? 0.5 : 0;
    var used = [];
    for (var t = 0; t < targets && t < this.enemies.length; t++) {
      var best = null, bestD = Infinity;
      for (var i = 0; i < this.enemies.length; i++) {
        if (used.indexOf(i) >= 0) continue;
        var e = this.enemies[i];
        var scr = this._w2s(e.x, e.y);
        if (scr.x < -20 || scr.x > W+20 || scr.y < -20 || scr.y > H+20) continue;
        var d = dist(e.x, e.y, this.p.x, this.p.y);
        if (d < bestD) { bestD = d; best = i; }
      }
      if (best !== null) {
        used.push(best);
        var e = this.enemies[best];
        this._damageEnemy(e, dmg, ang(e.x, e.y, this.p.x, this.p.y));
        if (stun > 0) e.spd *= 0.3;
        this.bolts.push({ x:e.x, y:e.y, life:0.3, maxLife:0.3 });
        this._addShake(2);
      }
    }
    if (used.length > 0) this.sfx.hit();
  };

  SurvivorsGame.prototype._fireSake = function(w) {
    var lv = w.lv;
    var radius = 70 * (lv >= 2 ? 1.4 : 1) * (lv >= 5 ? 1.6 : 1);
    var dmg = 25 * (lv >= 3 ? 1.5 : 1);
    var p = this.p;
    for (var i = this.enemies.length - 1; i >= 0; i--) {
      var e = this.enemies[i];
      if (dist(e.x, e.y, p.x, p.y) < radius) {
        this._damageEnemy(e, dmg, ang(e.x, e.y, p.x, p.y));
      }
    }
    for (var a = 0; a < 20; a++) {
      var angle = (Math.PI*2/20)*a;
      this._addPart(p.x+Math.cos(angle)*10, p.y+Math.sin(angle)*10,
        Math.cos(angle)*radius*3, Math.sin(angle)*radius*3,
        0.4, PAL.sake, 3, 'circle');
    }
    this._addShake(4);
    this.sfx.boom();
  };

  SurvivorsGame.prototype._updateFox = function(dt) {
    var p = this.p;
    var w = null;
    for (var i = 0; i < p.weapons.length; i++) {
      if (p.weapons[i].id === 'kitsune') { w = p.weapons[i]; break; }
    }
    if (!w) return;
    var lv = w.lv;
    var count = lv >= 5 ? 4 : lv >= 4 ? 3 : lv >= 2 ? 2 : 1;
    var orbR = 35 * (lv >= 5 ? 1.3 : 1);
    var dmg = 8 * (lv >= 3 ? 1.5 : 1);
    var speed = lv >= 4 ? 3.5 : 2.5;
    var orbSize = lv >= 5 ? 6 : 4;
    while (p.foxAngles.length < count) p.foxAngles.push(p.foxAngles.length * (Math.PI*2/count));

    for (var i = 0; i < count; i++) {
      p.foxAngles[i] += speed * dt;
      var ox = p.x + Math.cos(p.foxAngles[i]) * orbR;
      var oy = p.y + Math.sin(p.foxAngles[i]) * orbR;

      for (var j = this.enemies.length - 1; j >= 0; j--) {
        var e = this.enemies[j];
        if (dist(ox, oy, e.x, e.y) < orbSize + e.size) {
          var key = e._id + '_' + i;
          var last = p.foxHitCd.get(key) || 0;
          if (this.gameT - last > 0.4) {
            p.foxHitCd.set(key, this.gameT);
            this._damageEnemy(e, dmg, ang(e.x, e.y, p.x, p.y));
          }
        }
      }
      if (Math.random() < 0.3) {
        this._addPart(ox, oy, rand(-10,10), rand(-10,10), 0.3, PAL.fox, 2, 'circle');
      }
    }
  };

  SurvivorsGame.prototype._updateProjs = function(dt) {
    for (var i = this.projs.length - 1; i >= 0; i--) {
      var pr = this.projs[i];
      pr.x += pr.vx * dt;
      pr.y += pr.vy * dt;
      pr.life -= dt;
      pr.rot = (pr.rot || 0) + dt * 12;
      if (pr.type === 'fire') {
        pr.trail = (pr.trail || 0) + dt;
        if (pr.trail > 0.03) {
          pr.trail = 0;
          this._addPart(pr.x, pr.y, rand(-20,20), rand(-20,20), 0.2, PAL.fire, 2, 'circle');
        }
      }
      if (pr.life <= 0 || pr.x < -50 || pr.x > WORLD+50 || pr.y < -50 || pr.y > WORLD+50) {
        this.projs.splice(i, 1); continue;
      }
      for (var j = this.enemies.length - 1; j >= 0; j--) {
        var e = this.enemies[j];
        if (dist(pr.x, pr.y, e.x, e.y) < pr.size + e.size) {
          this._damageEnemy(e, pr.dmg, ang(e.x, e.y, pr.x, pr.y));
          pr.pierced = (pr.pierced || 0) + 1;
          if (pr.pierced > pr.pierce) {
            if (pr.explode) this._explosion(pr.x, pr.y, 40, pr.dmg * 0.5);
            this.projs.splice(i, 1);
            break;
          }
        }
      }
    }
  };

  SurvivorsGame.prototype._updateSlashes = function(dt) {
    for (var i = this.slashes.length - 1; i >= 0; i--) {
      var s = this.slashes[i];
      if (s.delay > 0) { s.delay -= dt; continue; }
      s.life -= dt;
      if (s.life <= 0) { this.slashes.splice(i, 1); continue; }
      s.x = this.p.x; s.y = this.p.y;
      for (var j = this.enemies.length - 1; j >= 0; j--) {
        var e = this.enemies[j];
        if (s.hit.has(e._id)) continue;
        if (dist(s.x, s.y, e.x, e.y) < s.r + e.size) {
          s.hit.add(e._id);
          this._damageEnemy(e, s.dmg, ang(s.x, s.y, e.x, e.y));
          var ka = ang(s.x, s.y, e.x, e.y);
          e.x += Math.cos(ka) * s.kb * 0.1;
          e.y += Math.sin(ka) * s.kb * 0.1;
        }
      }
    }
  };

  SurvivorsGame.prototype._updateBolts = function(dt) {
    for (var i = this.bolts.length - 1; i >= 0; i--) {
      this.bolts[i].life -= dt;
      if (this.bolts[i].life <= 0) this.bolts.splice(i, 1);
    }
  };

  SurvivorsGame.prototype._explosion = function(x, y, r, dmg) {
    for (var i = this.enemies.length - 1; i >= 0; i--) {
      var e = this.enemies[i];
      if (dist(x, y, e.x, e.y) < r + e.size) {
        this._damageEnemy(e, dmg, ang(x, y, e.x, e.y));
      }
    }
    for (var a = 0; a < 12; a++) {
      var angle = (Math.PI*2/12)*a;
      this._addPart(x, y, Math.cos(angle)*150, Math.sin(angle)*150, 0.3, '#ff8800', 3, 'circle');
    }
    this._addShake(3);
  };

  SurvivorsGame.prototype._updatePickups = function(dt) {
    var p = this.p;
    var magR = 50 * p.magMul;
    for (var i = this.pickups.length - 1; i >= 0; i--) {
      var pk = this.pickups[i];
      pk.bob = (pk.bob || 0) + dt * 4;
      var d = dist(pk.x, pk.y, p.x, p.y);
      if (d < magR) {
        var a = ang(pk.x, pk.y, p.x, p.y);
        var pull = 400;
        pk.x += Math.cos(a) * pull * dt;
        pk.y += Math.sin(a) * pull * dt;
      }
      if (d < 12) {
        if (pk.type === 'xp') {
          p.xp += Math.ceil(pk.val * p.xpMul);
          this._checkLevelUp();
          this.sfx.pickup();
        } else if (pk.type === 'heart') {
          p.hp = Math.min(p.hp + 20, p.maxHp);
          this.sfx.pickup();
        }
        this.pickups.splice(i, 1);
      }
    }
  };

  SurvivorsGame.prototype._updateParts = function(dt) {
    for (var i = this.parts.length - 1; i >= 0; i--) {
      var pt = this.parts[i];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vx *= 0.96;
      pt.vy *= 0.96;
      if (pt.grav) pt.vy += pt.grav * dt;
      pt.life -= dt;
      pt.rot = (pt.rot || 0) + (pt.rotSpd || 0) * dt;
      if (pt.life <= 0) this.parts.splice(i, 1);
    }
  };

  SurvivorsGame.prototype._updateDmgNums = function(dt) {
    for (var i = this.dmgNums.length - 1; i >= 0; i--) {
      var d = this.dmgNums[i];
      d.y -= 30 * dt;
      d.life -= dt;
      if (d.life <= 0) this.dmgNums.splice(i, 1);
    }
  };

  SurvivorsGame.prototype._updateEffects = function(dt) {
    if (this.shake.amt > 0) {
      this.shake.x = rand(-1,1) * this.shake.amt;
      this.shake.y = rand(-1,1) * this.shake.amt;
      this.shake.amt *= 0.85;
      if (this.shake.amt < 0.2) this.shake.amt = 0;
    } else {
      this.shake.x = 0; this.shake.y = 0;
    }
    if (this.flash > 0) this.flash -= dt * 4;
    if (this.comboT > 0) {
      this.comboT -= dt;
      if (this.comboT <= 0) this.combo = 0;
    }
  };

  SurvivorsGame.prototype._nearestEnemy = function() {
    var p = this.p, best = null, bestD = Infinity;
    for (var i = 0; i < this.enemies.length; i++) {
      var d = dist(this.enemies[i].x, this.enemies[i].y, p.x, p.y);
      if (d < bestD) { bestD = d; best = this.enemies[i]; }
    }
    return best;
  };

  var _eid = 0;
  SurvivorsGame.prototype._spawnEnemies = function(dt) {
    this.spawnAcc += dt;
    var t = this.gameT;
    var interval = Math.max(0.15, 1.5 - t * 0.008);
    var hpScale = 1 + t * 0.012;
    if (this.spawnAcc < interval) return;
    this.spawnAcc = 0;
    if (this.enemies.length >= MAX_ENEMIES) return;

    var types = ['slime'];
    if (t > 25) types.push('kappa');
    if (t > 50) types.push('tengu');
    if (t > 80) types.push('oni');
    if (t > 110) types.push('spider');
    if (t > 140) types.push('eye');

    var batch = 1 + Math.floor(t / 30);
    batch = Math.min(batch, 6);
    for (var b = 0; b < batch; b++) {
      if (this.enemies.length >= MAX_ENEMIES) break;
      var tid = choice(types);
      var def = null;
      for (var d = 0; d < ENEMY_DEFS.length; d++) if (ENEMY_DEFS[d].id === tid) { def = ENEMY_DEFS[d]; break; }
      var a = rand(0, Math.PI * 2);
      var r = Math.max(W, H) * 0.6 + rand(20, 80);
      var ex = this.p.x + Math.cos(a) * r;
      var ey = this.p.y + Math.sin(a) * r;
      ex = clamp(ex, 10, WORLD - 10);
      ey = clamp(ey, 10, WORLD - 10);
      this.enemies.push({
        _id: ++_eid,
        type: tid, x: ex, y: ey,
        hp: Math.ceil(def.hp * hpScale), maxHp: Math.ceil(def.hp * hpScale),
        spd: def.spd, dmg: def.dmg, xp: def.xp,
        size: def.size, color: def.color, name: def.name,
        anim: 0, hitFlash: 0, dashT: 0,
      });
    }

    var bossWave = Math.floor((t - 60) / 120);
    if (t > 60 && bossWave >= 0 && this.bossCount <= bossWave) {
      this.bossCount = bossWave + 1;
      var def = ENEMY_DEFS[6];
      var a = rand(0, Math.PI * 2);
      var r = Math.max(W, H) * 0.7;
      this.enemies.push({
        _id: ++_eid,
        type: 'boss', x: this.p.x + Math.cos(a)*r, y: this.p.y + Math.sin(a)*r,
        hp: Math.ceil(def.hp * hpScale * (1 + this.bossCount * 0.5)),
        maxHp: Math.ceil(def.hp * hpScale * (1 + this.bossCount * 0.5)),
        spd: def.spd, dmg: def.dmg, xp: def.xp * this.bossCount,
        size: def.size, color: def.color, name: def.name,
        anim: 0, hitFlash: 0, dashT: 0,
      });
      this.sfx.boom();
      this._addShake(6);
    }
  };

  SurvivorsGame.prototype._damageEnemy = function(e, dmg, fromAngle) {
    e.hp -= dmg;
    e.hitFlash = 0.1;
    this._addShake(1);
    this.dmgNums.push({ x:e.x+rand(-5,5), y:e.y-e.size, val:Math.floor(dmg), life:0.6, color:'#ffcc00' });
    this._addPart(e.x, e.y, rand(-40,40), rand(-40,40), 0.2, e.color, 2, 'circle');

    if (e.hp <= 0) {
      this._killEnemy(e, fromAngle);
    }
  };

  SurvivorsGame.prototype._killEnemy = function(e, fromAngle) {
    this.kills++;
    this.combo++;
    this.comboT = 2;
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    this.sfx.kill();

    var idx = this.enemies.indexOf(e);
    if (idx >= 0) this.enemies.splice(idx, 1);

    var eff = choice(['pop','shrink','confetti','launch','shatter','flatten','food','spin','ghost']);
    this._deathEffect(e, eff, fromAngle);

    if (Math.random() < 0.15) {
      this.dmgNums.push({ x:e.x, y:e.y-15, val:choice(KILL_TEXTS), life:0.9, color:'#ffcc00', big:true });
    }

    var xpVal = e.xp;
    var dropCount = e.type === 'boss' ? 12 : xpVal >= 4 ? 3 : xpVal >= 2 ? 2 : 1;
    for (var d = 0; d < dropCount; d++) {
      if (this.pickups.length < MAX_PICKUPS) {
        this.pickups.push({
          x: e.x + rand(-10, 10), y: e.y + rand(-10, 10),
          type: 'xp', val: Math.ceil(xpVal / dropCount),
          color: xpVal >= 4 ? PAL.gem3 : xpVal >= 2 ? PAL.gem2 : PAL.gem1,
          bob: rand(0, 6),
        });
      }
    }
    if (Math.random() < 0.03 && this.pickups.length < MAX_PICKUPS) {
      this.pickups.push({ x:e.x, y:e.y, type:'heart', val:0, color:PAL.heart, bob:0 });
    }
  };

  SurvivorsGame.prototype._deathEffect = function(e, type, fromAngle) {
    var x = e.x, y = e.y, col = e.color;
    var i, a, spd;
    if (type === 'pop') {
      for (i = 0; i < 10; i++) {
        a = rand(0, Math.PI*2); spd = rand(60, 150);
        this._addPart(x, y, Math.cos(a)*spd, Math.sin(a)*spd, 0.4, col, rand(2,5), 'circle');
      }
    } else if (type === 'shrink') {
      for (i = 0; i < 6; i++) {
        this._addPart(x + rand(-4,4), y + rand(-4,4), rand(-20,20), rand(-30,-10), 0.5, col, rand(1,3), 'circle');
      }
    } else if (type === 'confetti') {
      for (i = 0; i < 14; i++) {
        a = rand(0, Math.PI*2); spd = rand(80, 200);
        var c2 = choice([col, '#ffcc00', '#44ddff', '#ff66aa', '#66ff66']);
        this._addPart(x, y, Math.cos(a)*spd, Math.sin(a)*spd, 0.5, c2, rand(2,4), 'square');
      }
    } else if (type === 'launch') {
      var la = fromAngle + Math.PI;
      this._addPart(x, y, Math.cos(la)*300, Math.sin(la)*300 - 100, 0.6, col, e.size, 'circle', 200);
    } else if (type === 'shatter') {
      for (i = 0; i < 8; i++) {
        a = rand(0, Math.PI*2); spd = rand(60, 140);
        this._addPart(x, y, Math.cos(a)*spd, Math.sin(a)*spd, 0.4, '#aaddff', rand(2,4), 'tri');
      }
    } else if (type === 'flatten') {
      this._addPart(x, y, e.size > 0 ? 30 : -30, 0, 0.5, col, e.size * 0.7, 'flat');
    } else if (type === 'food') {
      this._addPart(x, y, 0, -15, 0.8, '#ffffff', 6, 'food');
    } else if (type === 'spin') {
      a = rand(0, Math.PI*2); spd = 120;
      this._addPart(x, y, Math.cos(a)*spd, Math.sin(a)*spd, 0.6, col, e.size*0.8, 'spin');
    } else if (type === 'ghost') {
      this._addPart(x, y, 0, -40, 1.0, col, e.size, 'ghost');
    }
  };

  SurvivorsGame.prototype._addPart = function(x, y, vx, vy, life, color, size, shape, grav) {
    if (this.parts.length >= MAX_PARTICLES) return;
    this.parts.push({
      x:x, y:y, vx:vx, vy:vy, life:life, maxLife:life,
      color:color, size:size, shape:shape,
      grav: grav || 0, rot:0, rotSpd: rand(-8, 8)
    });
  };

  SurvivorsGame.prototype._damagePlayer = function(dmg) {
    var p = this.p;
    if (p.inv > 0) return;
    var actual = Math.max(1, dmg - p.armor);
    p.hp -= actual;
    p.inv = 1.0;
    this._addShake(4);
    this.flash = 0.5;
    this.sfx.hurt();
    this.dmgNums.push({ x:p.x, y:p.y-10, val:actual, life:0.7, color:'#ff3366', big:true });
    if (p.hp <= 0) {
      p.hp = 0;
      this.state = 'GAME_OVER';
    }
  };

  SurvivorsGame.prototype._checkLevelUp = function() {
    var p = this.p;
    while (p.xp >= p.xpNext) {
      p.xp -= p.xpNext;
      p.lv++;
      p.xpNext = Math.floor(p.xpNext * 1.28 + 5);
      this.sfx.lvl();
      this.flash = 0.6;
      this._addShake(2);
      this._generateChoices();
      this.state = 'LEVEL_UP';
    }
  };

  SurvivorsGame.prototype._generateChoices = function() {
    var p = this.p;
    var pool = [];

    for (var i = 0; i < WEAPON_DEFS.length; i++) {
      var wd = WEAPON_DEFS[i];
      var owned = null;
      for (var j = 0; j < p.weapons.length; j++) {
        if (p.weapons[j].id === wd.id) { owned = p.weapons[j]; break; }
      }
      if (owned) {
        if (owned.lv < 5) {
          pool.push({ kind:'weapon', id:wd.id, name:wd.name, en:wd.en,
            desc: wd.desc[owned.lv], color:wd.color,
            label:'Lv' + owned.lv + '→' + (owned.lv+1), isNew:false });
        }
      } else {
        pool.push({ kind:'weapon', id:wd.id, name:wd.name, en:wd.en,
          desc: wd.desc[0], color:wd.color, label:'NEW!', isNew:true });
      }
    }

    for (var i = 0; i < PASSIVE_DEFS.length; i++) {
      var pd = PASSIVE_DEFS[i];
      var curLv = p.passives[pd.id] || 0;
      if (curLv < pd.max) {
        pool.push({ kind:'passive', id:pd.id, name:pd.name, en:pd.en,
          desc: pd.desc, color:pd.color,
          label: curLv === 0 ? 'NEW!' : 'Lv' + curLv + '→' + (curLv+1), isNew: curLv === 0 });
      }
    }

    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    this.lvlChoices = pool.slice(0, Math.min(3, pool.length));
  };

  SurvivorsGame.prototype._selectUpgrade = function(idx) {
    if (idx < 0 || idx >= this.lvlChoices.length) return;
    var ch = this.lvlChoices[idx];
    var p = this.p;
    this.sfx.select();

    if (ch.kind === 'weapon') {
      var owned = null;
      for (var i = 0; i < p.weapons.length; i++) {
        if (p.weapons[i].id === ch.id) { owned = p.weapons[i]; break; }
      }
      if (owned) {
        owned.lv++;
      } else {
        p.weapons.push({ id:ch.id, lv:1, cd:0 });
        if (ch.id === 'kitsune') { p.foxAngles = [0]; p.foxHitCd = new Map(); }
      }
    } else {
      p.passives[ch.id] = (p.passives[ch.id] || 0) + 1;
      this._applyPassives();
    }

    this.lvlChoices = [];
    this.state = 'PLAYING';
  };

  SurvivorsGame.prototype._applyPassives = function() {
    var p = this.p;
    p.spdMul = 1 + (p.passives.tabi || 0) * 0.1;
    p.armor = p.passives.yoroi || 0;
    var oldMax = p.maxHp;
    p.maxHp = 100 + (p.passives.shinzo || 0) * 20;
    if (p.maxHp > oldMax) p.hp += p.maxHp - oldMax;
    p.magMul = 1 + (p.passives.jishaku || 0) * 0.4;
    p.xpMul = 1 + (p.passives.keiken || 0) * 0.15;
    p.cdMul = 1 - (p.passives.reikyaku || 0) * 0.08;
  };

  SurvivorsGame.prototype._addShake = function(amt) {
    this.shake.amt = Math.max(this.shake.amt, amt);
  };

  SurvivorsGame.prototype._w2s = function(wx, wy) {
    return { x: wx - this.cam.x + W/2 + this.shake.x, y: wy - this.cam.y + H/2 + this.shake.y };
  };

  // ════════════════════════════════════════
  //  RENDERING
  // ════════════════════════════════════════

  SurvivorsGame.prototype._render = function() {
    var c = this.c;
    c.save();
    if (this.state === 'BOOT') this._renderBoot();
    else if (this.state === 'TITLE') this._renderTitle();
    else if (this.state === 'PLAYING') this._renderGame();
    else if (this.state === 'LEVEL_UP') { this._renderGame(); this._renderLevelUp(); }
    else if (this.state === 'GAME_OVER') { this._renderGame(); this._renderGameOver(); }
    c.restore();
  };

  SurvivorsGame.prototype._renderBoot = function() {
    var c = this.c, t = this.bootT;
    c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
    var alpha = t < 0.5 ? 0 : t < 1.8 ? Math.min(1, (t-0.5)/0.4) : Math.max(0, 1-(t-1.8)/0.4);
    if (alpha <= 0) return;
    c.globalAlpha = alpha;
    c.fillStyle = '#888';
    c.font = '9px monospace';
    c.textAlign = 'center';
    c.fillText('◆', W/2, H/2 - 25);
    c.fillStyle = '#ccc';
    c.font = 'bold 14px monospace';
    c.fillText('PortfolioStation', W/2, H/2 - 6);
    c.fillStyle = '#666';
    c.font = '8px monospace';
    c.fillText('© TCACI GAME STUDIOS', W/2, H/2 + 16);
    c.globalAlpha = 1;
  };

  SurvivorsGame.prototype._renderTitle = function() {
    var c = this.c, t = this.titleT;
    c.fillStyle = PAL.bg; c.fillRect(0, 0, W, H);

    for (var i = 0; i < 30; i++) {
      var sx = ((i * 73 + t * 10) % W);
      var sy = ((i * 47 + t * 5) % H);
      c.fillStyle = 'rgba(100,80,160,0.15)';
      c.fillRect(sx, sy, 1, 1);
    }

    c.textAlign = 'center';
    c.fillStyle = PAL.uiGold;
    c.font = 'bold 28px serif';
    c.fillText('妖怪サバイバーズ', W/2, H/2 - 40);
    c.fillStyle = '#ccbbee';
    c.font = 'bold 12px monospace';
    c.fillText('YOKAI SURVIVORS', W/2, H/2 - 18);

    c.fillStyle = '#665588';
    c.font = '8px monospace';
    c.fillText('— a vampire survivors demake —', W/2, H/2 - 4);

    if (Math.floor(t * 2.5) % 2 === 0) {
      c.fillStyle = PAL.uiText;
      c.font = 'bold 11px monospace';
      c.fillText('▶  PRESS START  ◀', W/2, H/2 + 28);
    }

    c.fillStyle = PAL.uiDim;
    c.font = '7px monospace';
    c.fillText('WASD / Arrows = Move  ·  Auto-attack  ·  1/2/3 or Click = Choose', W/2, H/2 + 52);

    c.fillStyle = '#443366';
    c.font = '7px monospace';
    c.fillText('© 2026 TCACI GAME STUDIOS   ·   PORTFOLIO ENTERTAINMENT DIVISION', W/2, H - 14);

    c.strokeStyle = PAL.uiBorder;
    c.lineWidth = 2;
    c.strokeRect(W/2 - 170, H/2 - 60, 340, 100);
    c.strokeStyle = '#442200';
    c.lineWidth = 1;
    c.strokeRect(W/2 - 168, H/2 - 58, 336, 96);
  };

  SurvivorsGame.prototype._renderGame = function() {
    var c = this.c;
    c.fillStyle = PAL.bg; c.fillRect(0, 0, W, H);
    this._renderGround();
    this._renderPickups();
    this._renderProjs();
    this._renderEnemies();
    this._renderSlashes();
    this._renderBolts();
    this._renderPlayer();
    this._renderFoxOrbs();
    this._renderParts();
    this._renderDmgNums();
    this._renderHUD();
    if (this.flash > 0) {
      c.fillStyle = 'rgba(255,255,255,' + Math.min(0.3, this.flash) + ')';
      c.fillRect(0, 0, W, H);
    }
  };

  SurvivorsGame.prototype._renderGround = function() {
    var c = this.c;
    var gs = 40;
    var sx = Math.floor((this.cam.x - W/2) / gs) * gs;
    var sy = Math.floor((this.cam.y - H/2) / gs) * gs;
    c.strokeStyle = PAL.gridLine;
    c.lineWidth = 0.5;
    c.beginPath();
    for (var x = sx; x < this.cam.x + W/2 + gs; x += gs) {
      var s = this._w2s(x, 0);
      c.moveTo(s.x, 0); c.lineTo(s.x, H);
    }
    for (var y = sy; y < this.cam.y + H/2 + gs; y += gs) {
      var s = this._w2s(0, y);
      c.moveTo(0, s.y); c.lineTo(W, s.y);
    }
    c.stroke();

    var bx1 = this._w2s(0, 0), bx2 = this._w2s(WORLD, WORLD);
    c.strokeStyle = '#ff330044';
    c.lineWidth = 1;
    c.strokeRect(bx1.x, bx1.y, bx2.x - bx1.x, bx2.y - bx1.y);
  };

  SurvivorsGame.prototype._renderPlayer = function() {
    var c = this.c, p = this.p;
    if (p.inv > 0 && Math.floor(p.flash * 10) % 2 === 0) return;
    var s = this._w2s(p.x, p.y);
    var x = Math.floor(s.x), y = Math.floor(s.y);
    var f = p.facing;
    var bob = Math.floor(Math.sin(p.bob) * 1.5);

    c.fillStyle = 'rgba(0,0,0,0.25)';
    c.fillRect(x - 4, y + 7, 8, 2);

    c.fillStyle = PAL.playerDk;
    c.fillRect(x - 3, y + 3 + bob, 3, 4);
    c.fillRect(x, y + 3 + bob, 3, 4);

    c.fillStyle = PAL.player;
    c.fillRect(x - 4, y - 3 + bob, 8, 7);

    c.fillRect(x - 3, y - 7 + bob, 6, 5);

    c.fillStyle = PAL.playerBand;
    c.fillRect(x - 4, y - 6 + bob, 8, 2);
    if (f > 0) {
      c.fillRect(x - 5, y - 6 + bob, 1, 1);
      c.fillRect(x - 6, y - 5 + bob, 1, 1);
    } else {
      c.fillRect(x + 4, y - 6 + bob, 1, 1);
      c.fillRect(x + 5, y - 5 + bob, 1, 1);
    }

    c.fillStyle = '#fff';
    if (f > 0) {
      c.fillRect(x, y - 5 + bob, 1, 1);
      c.fillRect(x + 2, y - 5 + bob, 1, 1);
    } else {
      c.fillRect(x - 1, y - 5 + bob, 1, 1);
      c.fillRect(x - 3, y - 5 + bob, 1, 1);
    }
  };

  SurvivorsGame.prototype._renderEnemies = function() {
    var c = this.c;
    for (var i = 0; i < this.enemies.length; i++) {
      var e = this.enemies[i];
      var s = this._w2s(e.x, e.y);
      if (s.x < -30 || s.x > W+30 || s.y < -30 || s.y > H+30) continue;
      var x = Math.floor(s.x), y = Math.floor(s.y);
      var col = e.hitFlash > 0 ? '#ffffff' : e.color;

      if (e.type === 'slime') {
        var squish = 1 + Math.sin(e.anim * 4) * 0.15;
        c.fillStyle = col;
        c.beginPath();
        c.ellipse(x, y, 8 * squish, 6 / squish, 0, Math.PI, 0);
        c.fill();
        c.fillStyle = col;
        c.beginPath();
        c.ellipse(x, y, 8 * squish, 5 / squish, 0, 0, Math.PI);
        c.fill();
        if (e.hitFlash <= 0) {
          c.fillStyle = '#fff';
          c.fillRect(x - 3, y - 2, 2, 2);
          c.fillRect(x + 1, y - 2, 2, 2);
        }
      } else if (e.type === 'oni') {
        c.fillStyle = col;
        c.fillRect(x - 7, y - 5, 14, 12);
        c.beginPath();
        c.moveTo(x - 5, y - 5); c.lineTo(x - 3, y - 12); c.lineTo(x - 1, y - 5);
        c.fill();
        c.beginPath();
        c.moveTo(x + 1, y - 5); c.lineTo(x + 3, y - 12); c.lineTo(x + 5, y - 5);
        c.fill();
        if (e.hitFlash <= 0) {
          c.fillStyle = '#ffcc00';
          c.fillRect(x - 4, y - 2, 2, 2);
          c.fillRect(x + 2, y - 2, 2, 2);
          c.fillStyle = '#000';
          c.fillRect(x - 3, y + 2, 6, 1);
        }
      } else if (e.type === 'kappa') {
        c.fillStyle = col;
        c.beginPath(); c.arc(x, y, 8, 0, Math.PI*2); c.fill();
        c.fillStyle = e.hitFlash > 0 ? '#fff' : '#226644';
        c.fillRect(x - 6, y - 10, 12, 4);
        if (e.hitFlash <= 0) {
          c.fillStyle = '#fff';
          c.fillRect(x - 3, y - 2, 2, 2);
          c.fillRect(x + 1, y - 2, 2, 2);
          c.fillStyle = '#ffcc00';
          c.beginPath();
          c.moveTo(x - 1, y + 2); c.lineTo(x + 1, y + 2); c.lineTo(x, y + 5);
          c.fill();
        }
      } else if (e.type === 'tengu') {
        c.fillStyle = col;
        c.beginPath();
        c.moveTo(x, y - 10); c.lineTo(x - 9, y + 7); c.lineTo(x + 9, y + 7);
        c.fill();
        if (e.hitFlash <= 0) {
          c.fillStyle = '#fff';
          c.fillRect(x - 3, y - 2, 2, 2);
          c.fillRect(x + 1, y - 2, 2, 2);
          c.fillStyle = '#ffddbb';
          c.fillRect(x - 1, y, 2, 6);
        }
      } else if (e.type === 'spider') {
        c.fillStyle = col;
        c.beginPath(); c.arc(x, y, 6, 0, Math.PI*2); c.fill();
        c.strokeStyle = col; c.lineWidth = 1;
        for (var l = 0; l < 8; l++) {
          var la = (Math.PI*2/8)*l + Math.sin(e.anim*5+l)*0.2;
          c.beginPath();
          c.moveTo(x + Math.cos(la)*5, y + Math.sin(la)*5);
          c.lineTo(x + Math.cos(la)*12, y + Math.sin(la)*12);
          c.stroke();
        }
        if (e.hitFlash <= 0) {
          c.fillStyle = '#ff0000';
          c.fillRect(x - 2, y - 2, 1, 1);
          c.fillRect(x + 1, y - 2, 1, 1);
        }
      } else if (e.type === 'eye') {
        c.fillStyle = col;
        c.beginPath(); c.ellipse(x, y, 10, 8, 0, 0, Math.PI*2); c.fill();
        if (e.hitFlash <= 0) {
          c.fillStyle = '#fff';
          c.beginPath(); c.arc(x, y, 5, 0, Math.PI*2); c.fill();
          c.fillStyle = '#000';
          var ea = ang(e.x, e.y, this.p.x, this.p.y);
          c.beginPath(); c.arc(x + Math.cos(ea)*2, y + Math.sin(ea)*2, 2, 0, Math.PI*2); c.fill();
        }
      } else if (e.type === 'boss') {
        c.fillStyle = col;
        c.beginPath(); c.arc(x, y - 12, 10, 0, Math.PI*2); c.fill();
        c.fillRect(x - 3, y - 2, 6, 16);
        c.fillRect(x - 12, y, 6, 3);
        c.fillRect(x + 6, y, 6, 3);
        c.fillRect(x - 5, y + 12, 4, 6);
        c.fillRect(x + 1, y + 12, 4, 6);
        if (e.hitFlash <= 0) {
          c.fillStyle = '#000';
          c.fillRect(x - 5, y - 15, 3, 3);
          c.fillRect(x + 2, y - 15, 3, 3);
          c.fillRect(x - 3, y - 10, 6, 2);
        }
      }
    }
  };

  SurvivorsGame.prototype._renderProjs = function() {
    var c = this.c;
    for (var i = 0; i < this.projs.length; i++) {
      var pr = this.projs[i];
      var s = this._w2s(pr.x, pr.y);
      if (s.x < -10 || s.x > W+10 || s.y < -10 || s.y > H+10) continue;
      var x = s.x, y = s.y;

      if (pr.type === 'shuriken') {
        c.save();
        c.translate(x, y);
        c.rotate(pr.rot);
        c.fillStyle = pr.color;
        c.fillRect(-3, -1, 6, 2);
        c.fillRect(-1, -3, 2, 6);
        c.restore();
      } else if (pr.type === 'fire') {
        c.fillStyle = '#ffaa00';
        c.beginPath(); c.arc(x, y, 4, 0, Math.PI*2); c.fill();
        c.fillStyle = '#ff4400';
        c.beginPath(); c.arc(x, y, 2.5, 0, Math.PI*2); c.fill();
        c.fillStyle = '#ffff88';
        c.beginPath(); c.arc(x, y, 1, 0, Math.PI*2); c.fill();
      }
    }
  };

  SurvivorsGame.prototype._renderSlashes = function() {
    var c = this.c;
    for (var i = 0; i < this.slashes.length; i++) {
      var sl = this.slashes[i];
      if (sl.delay > 0) continue;
      var s = this._w2s(sl.x, sl.y);
      var progress = 1 - sl.life / sl.maxLife;
      var startA = progress * Math.PI * 2 - Math.PI * 0.8;
      var endA = startA + Math.PI * 1.2;
      c.strokeStyle = PAL.katana;
      c.lineWidth = 3;
      c.globalAlpha = sl.life / sl.maxLife;
      c.beginPath();
      c.arc(s.x, s.y, sl.r, startA, endA);
      c.stroke();
      c.globalAlpha = 1;
    }
  };

  SurvivorsGame.prototype._renderBolts = function() {
    var c = this.c;
    for (var i = 0; i < this.bolts.length; i++) {
      var b = this.bolts[i];
      var s = this._w2s(b.x, b.y);
      var alpha = b.life / b.maxLife;
      c.strokeStyle = PAL.thunder;
      c.lineWidth = 2;
      c.globalAlpha = alpha;
      c.beginPath();
      var topY = -10;
      var segments = 5;
      var cx = s.x, cy = topY;
      c.moveTo(cx, cy);
      for (var seg = 0; seg < segments; seg++) {
        cy += (s.y - topY) / segments;
        cx = s.x + rand(-8, 8);
        c.lineTo(cx, cy);
      }
      c.lineTo(s.x, s.y);
      c.stroke();
      c.fillStyle = '#ffffff';
      c.beginPath(); c.arc(s.x, s.y, 4 * alpha, 0, Math.PI*2); c.fill();
      c.globalAlpha = 1;
    }
  };

  SurvivorsGame.prototype._renderFoxOrbs = function() {
    var c = this.c, p = this.p;
    var w = null;
    for (var i = 0; i < p.weapons.length; i++) {
      if (p.weapons[i].id === 'kitsune') { w = p.weapons[i]; break; }
    }
    if (!w) return;
    var orbR = 35 * (w.lv >= 5 ? 1.3 : 1);
    var orbSize = w.lv >= 5 ? 5 : 3;
    for (var i = 0; i < p.foxAngles.length; i++) {
      var ox = p.x + Math.cos(p.foxAngles[i]) * orbR;
      var oy = p.y + Math.sin(p.foxAngles[i]) * orbR;
      var s = this._w2s(ox, oy);
      c.fillStyle = PAL.fox;
      c.beginPath(); c.arc(s.x, s.y, orbSize, 0, Math.PI*2); c.fill();
      c.fillStyle = '#aaffdd';
      c.beginPath(); c.arc(s.x, s.y, orbSize * 0.5, 0, Math.PI*2); c.fill();
    }
  };

  SurvivorsGame.prototype._renderPickups = function() {
    var c = this.c;
    for (var i = 0; i < this.pickups.length; i++) {
      var pk = this.pickups[i];
      var s = this._w2s(pk.x, pk.y);
      if (s.x < -10 || s.x > W+10 || s.y < -10 || s.y > H+10) continue;
      var y = s.y + Math.sin(pk.bob) * 2;

      if (pk.type === 'xp') {
        c.fillStyle = pk.color;
        c.save();
        c.translate(s.x, y);
        c.rotate(Math.PI/4);
        c.fillRect(-3, -3, 6, 6);
        c.restore();
      } else if (pk.type === 'heart') {
        c.fillStyle = PAL.heart;
        c.fillRect(s.x - 3, y - 1, 2, 2);
        c.fillRect(s.x + 1, y - 1, 2, 2);
        c.fillRect(s.x - 4, y - 3, 3, 2);
        c.fillRect(s.x + 1, y - 3, 3, 2);
        c.fillRect(s.x - 2, y + 1, 4, 2);
        c.fillRect(s.x - 1, y + 3, 2, 1);
      }
    }
  };

  SurvivorsGame.prototype._renderParts = function() {
    var c = this.c;
    for (var i = 0; i < this.parts.length; i++) {
      var pt = this.parts[i];
      var s = this._w2s(pt.x, pt.y);
      if (s.x < -20 || s.x > W+20 || s.y < -20 || s.y > H+20) continue;
      var alpha = Math.min(1, pt.life / pt.maxLife * 2);
      c.globalAlpha = alpha;
      c.fillStyle = pt.color;

      if (pt.shape === 'circle') {
        c.beginPath(); c.arc(s.x, s.y, pt.size, 0, Math.PI*2); c.fill();
      } else if (pt.shape === 'square') {
        c.save(); c.translate(s.x, s.y); c.rotate(pt.rot);
        c.fillRect(-pt.size/2, -pt.size/2, pt.size, pt.size);
        c.restore();
      } else if (pt.shape === 'tri') {
        c.save(); c.translate(s.x, s.y); c.rotate(pt.rot);
        c.beginPath();
        c.moveTo(0, -pt.size); c.lineTo(-pt.size, pt.size); c.lineTo(pt.size, pt.size);
        c.fill(); c.restore();
      } else if (pt.shape === 'food') {
        c.fillStyle = '#fff';
        c.beginPath();
        c.moveTo(s.x, s.y - 5); c.lineTo(s.x - 5, s.y + 3); c.lineTo(s.x + 5, s.y + 3);
        c.fill();
        c.fillStyle = '#111';
        c.fillRect(s.x - 3, s.y, 6, 2);
      } else if (pt.shape === 'flat') {
        c.fillRect(s.x - pt.size, s.y - 1, pt.size * 2, 2);
      } else if (pt.shape === 'spin') {
        c.save(); c.translate(s.x, s.y); c.rotate(pt.rot);
        var sz = pt.size * (pt.life / pt.maxLife);
        c.beginPath(); c.arc(0, 0, sz, 0, Math.PI*2); c.fill();
        c.restore();
      } else if (pt.shape === 'ghost') {
        c.globalAlpha = alpha * 0.5;
        c.beginPath(); c.arc(s.x, s.y, pt.size, 0, Math.PI*2); c.fill();
      }
      c.globalAlpha = 1;
    }
  };

  SurvivorsGame.prototype._renderDmgNums = function() {
    var c = this.c;
    for (var i = 0; i < this.dmgNums.length; i++) {
      var d = this.dmgNums[i];
      var s = this._w2s(d.x, d.y);
      var alpha = Math.min(1, d.life * 2);
      c.globalAlpha = alpha;
      c.fillStyle = d.color;
      c.font = (d.big ? 'bold 9px' : '7px') + ' monospace';
      c.textAlign = 'center';
      c.fillText(typeof d.val === 'number' ? d.val.toString() : d.val, s.x, s.y);
      c.globalAlpha = 1;
    }
  };

  SurvivorsGame.prototype._renderHUD = function() {
    var c = this.c, p = this.p;

    c.fillStyle = PAL.hpBg;
    c.fillRect(6, 6, 60, 5);
    c.fillStyle = PAL.hp;
    c.fillRect(6, 6, 60 * (p.hp / p.maxHp), 5);
    c.strokeStyle = '#333'; c.lineWidth = 0.5;
    c.strokeRect(6, 6, 60, 5);
    c.fillStyle = PAL.uiText;
    c.font = '6px monospace'; c.textAlign = 'left';
    c.fillText('HP ' + p.hp + '/' + p.maxHp, 6, 18);

    c.fillStyle = PAL.uiText;
    c.font = 'bold 7px monospace'; c.textAlign = 'left';
    c.fillText('Lv.' + p.lv, 6, 27);

    c.fillStyle = PAL.xpBg;
    c.fillRect(0, H - 4, W, 4);
    c.fillStyle = PAL.xp;
    c.fillRect(0, H - 4, W * (p.xp / p.xpNext), 4);

    c.fillStyle = PAL.uiDim;
    c.font = '7px monospace'; c.textAlign = 'right';
    var mins = Math.floor(this.gameT / 60);
    var secs = Math.floor(this.gameT % 60);
    c.fillText((mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs, W - 6, 12);

    c.fillStyle = PAL.uiDim;
    c.font = '6px monospace'; c.textAlign = 'right';
    c.fillText('KILLS ' + this.kills, W - 6, 22);

    if (this.combo >= 5) {
      var comboAlpha = Math.min(1, this.comboT);
      c.globalAlpha = comboAlpha;
      c.fillStyle = this.combo >= 20 ? '#ff4444' : this.combo >= 10 ? '#ffaa00' : PAL.uiGold;
      c.font = 'bold 10px monospace'; c.textAlign = 'center';
      var comboText = this.combo >= 20 ? 'HYPER COMBO! ' + this.combo : this.combo >= 10 ? 'SUGOI! x' + this.combo : 'COMBO x' + this.combo;
      c.fillText(comboText, W/2, 42);
      c.globalAlpha = 1;
    }

    var wy = 35;
    c.font = '6px monospace'; c.textAlign = 'left';
    for (var i = 0; i < p.weapons.length; i++) {
      var w = p.weapons[i];
      var wd = this._wdef(w.id);
      c.fillStyle = wd.color;
      c.fillRect(6, wy, 4, 4);
      c.fillStyle = PAL.uiDim;
      c.fillText(wd.name + ' Lv' + w.lv, 13, wy + 4);
      wy += 9;
    }

    for (var i = 0; i < this.enemies.length; i++) {
      var e = this.enemies[i];
      if (e.type === 'boss') {
        c.fillStyle = PAL.hpBg;
        c.fillRect(W/2 - 80, 22, 160, 6);
        c.fillStyle = PAL.hp;
        c.fillRect(W/2 - 80, 22, 160 * Math.max(0, e.hp / e.maxHp), 6);
        c.fillStyle = PAL.uiText;
        c.font = '7px monospace'; c.textAlign = 'center';
        c.fillText(e.name, W/2, 20);
        break;
      }
    }
  };

  SurvivorsGame.prototype._renderLevelUp = function() {
    var c = this.c;
    c.fillStyle = 'rgba(5,2,15,0.75)';
    c.fillRect(0, 0, W, H);

    c.fillStyle = PAL.uiGold;
    c.font = 'bold 16px monospace'; c.textAlign = 'center';
    c.fillText('★ LEVEL UP! ★', W/2, 32);
    c.fillStyle = PAL.uiDim;
    c.font = '7px monospace';
    c.fillText('Choose an upgrade — Click or press 1/2/3', W/2, 44);

    var count = this.lvlChoices.length;
    var cardW = 110, cardH = 110;
    var gap = 14;
    var totalW = count * cardW + (count - 1) * gap;
    var startX = (W - totalW) / 2;
    var startY = 54;

    for (var i = 0; i < count; i++) {
      var ch = this.lvlChoices[i];
      var cx = startX + i * (cardW + gap);

      c.fillStyle = 'rgba(15,8,35,0.95)';
      c.fillRect(cx, startY, cardW, cardH);
      c.strokeStyle = ch.color;
      c.lineWidth = 2;
      c.strokeRect(cx, startY, cardW, cardH);
      c.strokeStyle = '#222';
      c.lineWidth = 1;
      c.strokeRect(cx + 2, startY + 2, cardW - 4, cardH - 4);

      c.fillStyle = ch.color;
      c.font = 'bold 12px serif'; c.textAlign = 'center';
      c.fillText(ch.name, cx + cardW/2, startY + 20);

      c.fillStyle = '#ccbbdd';
      c.font = '8px monospace';
      c.fillText(ch.en, cx + cardW/2, startY + 33);

      c.fillStyle = ch.isNew ? '#44ff88' : PAL.uiGold;
      c.font = 'bold 8px monospace';
      c.fillText(ch.label, cx + cardW/2, startY + 48);

      c.fillStyle = '#9988aa';
      c.font = '7px monospace';
      var desc = ch.desc;
      if (desc.length > 18) {
        c.fillText(desc.substring(0, 18), cx + cardW/2, startY + 64);
        c.fillText(desc.substring(18), cx + cardW/2, startY + 74);
      } else {
        c.fillText(desc, cx + cardW/2, startY + 68);
      }

      c.fillStyle = PAL.uiDim;
      c.font = '8px monospace';
      c.fillText('[' + (i + 1) + ']', cx + cardW/2, startY + cardH - 8);
    }
  };

  SurvivorsGame.prototype._renderGameOver = function() {
    var c = this.c;
    c.fillStyle = 'rgba(20,0,5,0.8)';
    c.fillRect(0, 0, W, H);

    c.textAlign = 'center';
    c.fillStyle = PAL.hp;
    c.font = 'bold 22px serif';
    c.fillText('ゲームオーバー', W/2, H/2 - 45);
    c.fillStyle = '#cc2244';
    c.font = 'bold 11px monospace';
    c.fillText('GAME OVER', W/2, H/2 - 28);

    c.fillStyle = PAL.uiDim;
    c.font = '8px monospace';
    var mins = Math.floor(this.gameT / 60);
    var secs = Math.floor(this.gameT % 60);
    c.fillText('TIME: ' + (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs, W/2, H/2 - 8);
    c.fillText('KILLS: ' + this.kills, W/2, H/2 + 6);
    c.fillText('LEVEL: ' + this.p.lv, W/2, H/2 + 20);
    c.fillText('MAX COMBO: ' + this.maxCombo, W/2, H/2 + 34);

    if (Math.floor(this._clock * 2.5) % 2 === 0) {
      c.fillStyle = PAL.uiText;
      c.font = 'bold 10px monospace';
      c.fillText('▶ PRESS START TO RETRY ◀', W/2, H/2 + 56);
    }

    c.fillStyle = '#443344';
    c.font = '7px monospace';
    c.fillText('Esc / Click outside to exit', W/2, H - 10);
  };

  window.SurvivorsGame = SurvivorsGame;
})();
