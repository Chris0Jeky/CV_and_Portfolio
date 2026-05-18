/* global React, Stage, Sprite, TextSprite, useTime, useSprite, useTimeline, Easing, interpolate, animate */
/* eslint-disable */
// "Press Run" — a 30-second motion piece in the Tcaci Quarterly aesthetic.

const { useState, useEffect, useMemo, useRef } = React;

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  paper:  '#f4f1ea',
  paper2: '#ebe6db',
  ink:    '#161514',
  ink2:   '#2a2723',
  dim:    '#5a554d',
  rouge:  '#cc3a2e',
  forest: '#1a4d3a',
  gold:   '#b08a2e',
  teal:   '#2a6b78',
};

// ── Helpers ────────────────────────────────────────────────────────────────
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const POOL  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#@&%$+=*?!§¶';

// Scramble-in headline: each char briefly cycles random glyphs, then resolves.
function Scramble({ text, start, charDelay = 0.045, settle = 0.5, style }) {
  const t = useTime();
  const local = t - start;
  return (
    <span style={style}>
      {text.split('').map((ch, i) => {
        if (ch === ' ') return <span key={i}>&nbsp;</span>;
        const cStart = i * charDelay;
        const cEnd = cStart + settle;
        if (local < cStart) return <span key={i} style={{ opacity: 0 }}>{ch}</span>;
        if (local > cEnd) return <span key={i}>{ch}</span>;
        const phase = (local - cStart) / settle;
        const glyph = POOL[Math.floor((local * 37 + i * 13) % POOL.length)];
        return <span key={i} style={{ color: C.rouge }}>{glyph}</span>;
      })}
    </span>
  );
}

// Stamp impression: glyph slams down (squash) and settles, optional ink offset
function Stamp({ children, start, dur = 0.6, color = C.rouge, style, antic = 1.3 }) {
  const t = useTime();
  const local = t - start;
  if (local < 0) return null;
  const k = clamp(local / dur, 0, 1);
  const scale  = local < dur * 0.5
    ? interpolate([0, 0.4, 0.5], [antic, antic * 0.85, 0.94], Easing.easeOutQuart)(k)
    : interpolate([0.5, 0.65, 0.85, 1], [0.94, 1.04, 0.99, 1], Easing.easeOutBack)(k);
  const rot = (local < dur ? Math.sin(local * 30) * (1 - k) * 4 : 0);
  const ink = 1 - Math.abs(Math.sin(local * 22)) * 0.06 * Math.max(0, 1 - k);
  const baseStyle = style || {};
  return (
    <div style={{
      position: 'absolute',
      ...baseStyle,
      transform: `${baseStyle.transform || ''} scale(${scale}) rotate(${rot}deg)`,
      filter: `contrast(${ink + 0.3}) drop-shadow(0 ${(1-k)*6}px ${(1-k)*8}px rgba(0,0,0,0.18))`,
    }}>
      {children}
    </div>
  );
}

// Paper grain overlay  
const PaperGrain = () => (
  <div className="paper-grain" style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}/>
);

// Animated rouge ink splatter that blooms outward
function InkSplatter({ x, y, start, scale = 1, color = C.rouge }) {
  const t = useTime();
  const local = t - start;
  if (local < 0 || local > 4.5) return null;
  const dots = useMemo(() => {
    const seed = (x * 13 + y * 31) | 0;
    let s = seed;
    const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return Array.from({ length: 18 }, () => {
      const ang = r() * Math.PI * 2;
      const dist = (10 + r() * 90) * scale;
      const size = (3 + r() * 16) * scale;
      const delay = r() * 0.35;
      return { dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist, size, delay };
    });
  }, [x, y, scale]);
  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}>
      {dots.map((d, i) => {
        const t0 = local - d.delay;
        if (t0 < 0) return null;
        const k = clamp(t0 / 0.4, 0, 1);
        const opacity = t0 > 1.5 ? Math.max(0, 1 - (t0 - 1.5) / 3) : 1;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: d.dx * k, top: d.dy * k,
            width: d.size, height: d.size,
            background: color, opacity: opacity * 0.7,
            borderRadius: '50%',
            filter: 'blur(0.5px)',
            transform: `scale(${Easing.easeOutCubic(k)})`,
          }}/>
        );
      })}
    </div>
  );
}

// Animated registration mark in a corner (rotating slowly)
function RegMark({ x, y, color = C.ink }) {
  const t = useTime();
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: 40, height: 40,
      transform: `rotate(${t * 8}deg)`, color,
    }}>
      <svg viewBox="-20 -20 40 40" width="40" height="40">
        <circle r="14" fill="none" stroke="currentColor" strokeWidth="1"/>
        <line x1="-18" y1="0" x2="-6" y2="0" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="6" y1="0" x2="18" y2="0" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="0" y1="-18" x2="0" y2="-6" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="0" y1="6" x2="0" y2="18" stroke="currentColor" strokeWidth="1.2"/>
        <circle r="1.5" fill="currentColor"/>
      </svg>
    </div>
  );
}

// Rouge ribbon (a horizontal accent) drawn left to right
function RougeRibbon({ y, start, dur = 0.7, color = C.rouge, height = 4, full = 1920 }) {
  const t = useTime();
  const local = t - start;
  const k = clamp(local / dur, 0, 1);
  const w = Easing.easeOutCubic(k) * full;
  return (
    <div style={{
      position: 'absolute', left: 0, top: y, width: w, height,
      background: color,
    }}/>
  );
}

// Animated number counter
function CountUp({ from = 0, to, start, dur = 1.2, prefix = '', suffix = '', ...style }) {
  const t = useTime();
  const local = t - start;
  if (local < 0) return <span style={style}>{prefix}0{suffix}</span>;
  const k = clamp(local / dur, 0, 1);
  const v = from + (to - from) * Easing.easeOutCubic(k);
  const fmt = Math.round(v).toLocaleString();
  return <span style={style}>{prefix}{fmt}{suffix}</span>;
}

// Vignette / fade overlay used between scenes
function FadeOut({ at, dur = 0.4 }) {
  const t = useTime();
  const local = t - at;
  if (local < 0) return null;
  const k = clamp(local / dur, 0, 1);
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: C.paper, opacity: Easing.easeInOutQuad(k),
      zIndex: 40, pointerEvents: 'none',
    }}/>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 1 — Cold open (0–4s)
   The masthead types in. Date stamps. Paper drifts up.
   ────────────────────────────────────────────────────── */
function Scene1() {
  const t = useTime();
  return (
    <Sprite start={0} end={4.2}>
      {({ localTime, progress, duration }) => {
        const exitT = Math.max(0, localTime - (duration - 0.45));
        const exitK = clamp(exitT / 0.45, 0, 1);
        const ty = -exitK * 80;
        const op = 1 - exitK;
        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: C.paper, transform: `translateY(${ty}px)`, opacity: op,
          }}>
            {/* paper rule */}
            <div style={{ position: 'absolute', top: 70, left: 80, right: 80,
              height: 3, borderTop: `1px solid ${C.ink}`, borderBottom: `1px solid ${C.ink}`,
              padding: '6px 0',
            }}/>
            {/* kicker stamps in */}
            <Stamp start={0.2} dur={0.55}
              style={{ left: '50%', top: 110, transform: 'translateX(-50%)',
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 20, letterSpacing: '0.32em', color: C.rouge, fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>
              ★ THE TCACI QUARTERLY · VOL. IV · N° 044 ★
            </Stamp>

            {/* huge title scrambles in */}
            <div style={{
              position: 'absolute', left: '50%', top: '32%',
              transform: 'translateX(-50%)',
              fontFamily: 'Newsreader, serif',
              fontSize: 280, fontWeight: 400, letterSpacing: '-0.045em',
              color: C.ink, lineHeight: 0.9, whiteSpace: 'nowrap',
            }}>
              <Scramble text="PRESS RUN" start={0.5} charDelay={0.07} settle={0.55}/>
            </div>

            {/* italic subtitle slides in */}
            <Sprite start={1.6} end={4.0}>
              {({ progress }) => {
                const k = Easing.easeOutCubic(clamp(progress * 3, 0, 1));
                return (
                  <div style={{
                    position: 'absolute', left: '50%', top: '60%',
                    transform: `translateX(-50%) translateY(${(1-k)*20}px)`,
                    opacity: k,
                    fontFamily: 'Newsreader, serif', fontStyle: 'italic',
                    fontSize: 52, color: C.rouge, letterSpacing: '0.005em',
                    whiteSpace: 'nowrap',
                  }}>
                    — a practitioner's notebook —
                  </div>
                );
              }}
            </Sprite>

            {/* date stamp lower right, slamming down */}
            <Stamp start={2.2} dur={0.6}
              style={{ left: 1480, top: 880,
                border: `3px solid ${C.ink}`, padding: '10px 22px',
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 22,
                letterSpacing: '0.18em', color: C.ink, fontWeight: 700,
                transform: 'rotate(-3deg)',
              }}>
              19 MAY 2026 · LONDON
            </Stamp>

            {/* registration marks */}
            <RegMark x={50} y={50} color={C.rouge}/>
            <RegMark x={1830} y={50} color={C.rouge}/>
            <RegMark x={50} y={990} color={C.ink}/>
            <RegMark x={1830} y={990} color={C.ink}/>

            {/* rouge ribbons top/bottom */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 8, background: C.rouge }}/>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: C.rouge }}/>
          </div>
        );
      }}
    </Sprite>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 2 — The byline (4.2–10s)
   "CHRIS TCACI" assembles letter by letter with stamps.
   Rouge underline draws across. Sub-headlines stack in.
   ────────────────────────────────────────────────────── */
function Scene2() {
  const NAME = "CHRIS TCACI";
  return (
    <Sprite start={4.2} end={10.4}>
      {({ localTime, duration }) => {
        const exitT = Math.max(0, localTime - (duration - 0.5));
        const exitK = clamp(exitT / 0.5, 0, 1);
        const ty = -exitK * 60;
        const op = 1 - exitK;
        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: C.paper, transform: `translateY(${ty}px)`, opacity: op,
          }}>
            {/* kicker */}
            <div style={{
              position: 'absolute', left: 80, top: 90,
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 18,
              letterSpacing: '0.32em', color: C.dim, textTransform: 'uppercase',
            }}>
              {(() => {
                const t = useTime();
                const local = t - 4.4;
                const k = clamp(local / 0.4, 0, 1);
                return <span style={{ opacity: k }}>§ 01 / 06 · MASTHEAD</span>;
              })()}
            </div>
            <div style={{
              position: 'absolute', right: 80, top: 90,
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 18,
              letterSpacing: '0.18em', color: C.dim,
            }}>
              {(() => {
                const t = useTime();
                const local = t - 4.4;
                const k = clamp(local / 0.4, 0, 1);
                return <span style={{ opacity: k }}>★ STOP PRESS</span>;
              })()}
            </div>
            <RougeRibbon y={130} start={4.5} dur={0.6}/>

            {/* Name letters stamped one by one */}
            <div style={{
              position: 'absolute', left: '50%', top: '24%',
              transform: 'translateX(-50%)',
              display: 'flex', gap: 4,
            }}>
              {NAME.split('').map((ch, i) => (
                <Stamp key={i} start={4.6 + i * 0.11} dur={0.5} antic={1.25}
                  style={{
                    position: 'relative',
                    fontFamily: 'Newsreader, serif',
                    fontSize: 260, fontWeight: 500,
                    letterSpacing: '-0.04em', color: C.ink,
                    lineHeight: 0.85,
                  }}>
                  {ch === ' ' ? '\u00A0' : ch}
                </Stamp>
              ))}
            </div>

            {/* Splatter behind name */}
            <InkSplatter x={960} y={420} start={6.0} scale={1.4} color={C.rouge}/>
            <InkSplatter x={300} y={520} start={5.8} scale={0.6} color={C.ink}/>
            <InkSplatter x={1600} y={490} start={6.2} scale={0.7} color={C.ink}/>

            {/* Two columns of sub-headlines slide in */}
            <Sprite start={6.6} end={10.4}>
              {({ progress }) => {
                const k = Easing.easeOutCubic(clamp(progress * 2.4, 0, 1));
                return (
                  <>
                    <div style={{
                      position: 'absolute', left: 200, top: 720,
                      transform: `translateY(${(1-k)*30}px)`, opacity: k,
                      width: 660,
                    }}>
                      <div style={{ fontFamily: 'IBM Plex Sans, sans-serif',
                        fontSize: 14, letterSpacing: '0.26em', color: C.rouge,
                        textTransform: 'uppercase', marginBottom: 14, fontWeight: 700 }}>
                        ★ ENGINEER · FOUNDER · QUIET WORKER
                      </div>
                      <div style={{ fontFamily: 'Newsreader, serif', fontSize: 56,
                        fontStyle: 'italic', color: C.ink2, lineHeight: 1.05,
                        letterSpacing: '-0.01em',
                      }}>
                        Builds local-first software with audit logs, citations and tests that hold.
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute', right: 200, top: 740,
                      transform: `translateY(${(1-k)*30}px)`, opacity: k,
                      width: 580, textAlign: 'right',
                    }}>
                      <div style={{ fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: 14, letterSpacing: '0.18em', color: C.forest,
                        marginBottom: 14, fontWeight: 600,
                      }}>
                        ▸ portfolio · vol. iv · n° 044
                      </div>
                      <div style={{ fontFamily: 'Newsreader, serif', fontSize: 26,
                        color: C.ink, lineHeight: 1.35,
                      }}>
                        Five products, ten years of receipts.<br/>
                        Cite your sources. Trust the audit.
                      </div>
                    </div>
                  </>
                );
              }}
            </Sprite>

            <RegMark x={1830} y={990} color={C.ink}/>
          </div>
        );
      }}
    </Sprite>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 3 — Catalogue (10.4–16s)
   Sections stamp in down the page, each in its own color.
   ────────────────────────────────────────────────────── */
function Scene3() {
  const SECTIONS = [
    { label: '01', name: 'ABOUT THE EDITOR',    tone: C.rouge,  desc: 'Years of building. A handful of receipts.' },
    { label: '02', name: 'FIELD REPORTS',       tone: C.forest, desc: '£17 trillion · 9,799 tests · 5,500 commits.' },
    { label: '03', name: 'CREDENTIALS',         tone: C.gold,   desc: 'Springer · SGAI-AI · M.Sc. AI · B.Sc. CS.' },
    { label: '04', name: 'PROJECTS',            tone: C.teal,   desc: 'WealthLens · Taskdeck · Metrix · NavSentinel.' },
    { label: '05', name: 'APPARATUS',           tone: C.rouge,  desc: 'React · TypeScript · Python · Postgres · React Native.' },
    { label: '06', name: 'CORRESPONDENCE',      tone: C.ink,    desc: 'chris@tcaci.io · open to work.' },
  ];
  return (
    <Sprite start={10.4} end={16.4}>
      {({ localTime, duration }) => {
        const exitT = Math.max(0, localTime - (duration - 0.55));
        const exitK = clamp(exitT / 0.55, 0, 1);
        const ty = -exitK * 80;
        const op = 1 - exitK;
        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: C.paper, transform: `translateY(${ty}px)`, opacity: op,
          }}>
            <div style={{
              position: 'absolute', left: '50%', top: 80,
              transform: 'translateX(-50%)',
              fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 18,
              letterSpacing: '0.32em', color: C.dim, fontWeight: 600,
            }}>
              ★ THE INDEX ★
            </div>
            <div style={{
              position: 'absolute', left: '50%', top: 120,
              transform: 'translateX(-50%)',
              fontFamily: 'Newsreader, serif', fontSize: 88,
              fontWeight: 400, color: C.ink, letterSpacing: '-0.03em',
            }}>
              In this edition
            </div>
            <RougeRibbon y={232} start={10.5} dur={0.5}/>

            {SECTIONS.map((s, i) => {
              const start = 10.7 + i * 0.32;
              return (
                <Sprite key={i} start={start} end={16.4}>
                  {({ localTime: lt }) => {
                    const k = Easing.easeOutBack(clamp(lt / 0.45, 0, 1));
                    return (
                      <div style={{
                        position: 'absolute',
                        left: 200, top: 290 + i * 105,
                        right: 200,
                        display: 'flex', alignItems: 'baseline', gap: 32,
                        transform: `translateX(${(1-k)*-40}px)`, opacity: clamp(k, 0, 1),
                        borderBottom: `1px solid ${C.ink}`, paddingBottom: 14,
                      }}>
                        <span style={{
                          fontFamily: 'IBM Plex Mono, monospace',
                          fontSize: 28, color: s.tone, fontWeight: 700,
                          letterSpacing: '0.08em', minWidth: 80,
                        }}>
                          § {s.label}
                        </span>
                        <span style={{
                          fontFamily: 'Newsreader, serif',
                          fontSize: 56, fontWeight: 500, color: C.ink,
                          letterSpacing: '-0.02em', minWidth: 620,
                        }}>
                          {s.name}
                        </span>
                        <span style={{
                          fontFamily: 'Newsreader, serif', fontStyle: 'italic',
                          fontSize: 28, color: C.ink2, flex: 1,
                          textAlign: 'right',
                        }}>
                          {s.desc}
                        </span>
                      </div>
                    );
                  }}
                </Sprite>
              );
            })}
          </div>
        );
      }}
    </Sprite>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 4 — Pull quote (16.4–21.4s)
   Big italic editorial quote on dark paper.
   ────────────────────────────────────────────────────── */
function Scene4() {
  return (
    <Sprite start={16.4} end={21.6}>
      {({ localTime, duration }) => {
        const k = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
        const exitT = Math.max(0, localTime - (duration - 0.5));
        const exitK = clamp(exitT / 0.5, 0, 1);
        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: C.ink, color: C.paper,
            opacity: k * (1 - exitK),
          }}>
            {/* big rouge quote mark */}
            <div style={{
              position: 'absolute', left: 130, top: 80,
              fontFamily: 'Newsreader, serif',
              fontSize: 800, color: C.rouge, opacity: 0.85,
              lineHeight: 0.7, fontStyle: 'italic',
            }}>
              "
            </div>
            <div style={{
              position: 'absolute', left: 220, top: 320, right: 220,
              fontFamily: 'Newsreader, serif', fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 120, lineHeight: 1.15, color: C.paper,
              letterSpacing: '-0.015em',
            }}>
              <Sprite start={17.0} end={21.6}>
                {({ progress }) => {
                  const p = Easing.easeOutCubic(clamp(progress * 1.8, 0, 1));
                  return (
                    <div style={{ transform: `translateY(${(1-p)*30}px)`, opacity: p }}>
                      The boring half of software is the half that pays the bills.
                    </div>
                  );
                }}
              </Sprite>
            </div>
            <Sprite start={18.6} end={21.6}>
              {({ progress }) => {
                const p = Easing.easeOutCubic(clamp(progress * 2, 0, 1));
                return (
                  <div style={{
                    position: 'absolute', right: 220, bottom: 180,
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: 22,
                    letterSpacing: '0.24em', color: C.rouge, fontWeight: 700,
                    transform: `translateY(${(1-p)*20}px)`, opacity: p,
                    textTransform: 'uppercase',
                  }}>
                    — the editor, in margin
                  </div>
                );
              }}
            </Sprite>
            {/* rouge corner rule */}
            <div style={{ position: 'absolute', left: 0, top: 0,
              width: 16, height: '100%', background: C.rouge }}/>
          </div>
        );
      }}
    </Sprite>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 5 — By the numbers (21.6–26.0s)
   Counters count up; receipts pop in.
   ────────────────────────────────────────────────────── */
function Scene5() {
  const STATS = [
    { label: 'TESTS WRITTEN',     to: 9799,   prefix: '',    suffix: '',   tone: C.forest },
    { label: 'COMMITS SHIPPED',   to: 5500,   prefix: '',    suffix: '+',  tone: C.rouge  },
    { label: 'WEALTH MAPPED',     to: 17,     prefix: '£',   suffix: 'T',  tone: C.gold   },
    { label: 'GHOSTS CAUGHT',     to: 432,    prefix: '',    suffix: '',   tone: C.teal   },
  ];
  return (
    <Sprite start={21.6} end={26.2}>
      {({ localTime, duration }) => {
        const enter = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
        const exitT = Math.max(0, localTime - (duration - 0.5));
        const exitK = clamp(exitT / 0.5, 0, 1);
        return (
          <div style={{
            position: 'absolute', inset: 0, background: C.paper,
            opacity: enter * (1 - exitK),
          }}>
            <div style={{
              position: 'absolute', left: '50%', top: 90,
              transform: 'translateX(-50%)',
              fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 18,
              letterSpacing: '0.32em', color: C.rouge, fontWeight: 700,
            }}>
              ★ BY THE NUMBERS ★
            </div>
            <div style={{
              position: 'absolute', left: '50%', top: 130,
              transform: 'translateX(-50%)',
              fontFamily: 'Newsreader, serif', fontSize: 88,
              fontWeight: 400, color: C.ink, letterSpacing: '-0.03em',
            }}>
              Receipts, audited.
            </div>
            <RougeRibbon y={242} start={21.7} dur={0.5}/>

            <div style={{
              position: 'absolute', left: 100, right: 100, top: 340,
              display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 28,
            }}>
              {STATS.map((s, i) => (
                <Sprite key={i} start={21.9 + i * 0.18} end={26.2}>
                  {({ localTime: lt }) => {
                    const k = Easing.easeOutBack(clamp(lt / 0.5, 0, 1));
                    return (
                      <div style={{
                        transform: `translateY(${(1-clamp(k,0,1))*40}px) scale(${0.9 + 0.1*clamp(k,0,1)})`,
                        opacity: clamp(k, 0, 1),
                        border: `2px solid ${C.ink}`, padding: '32px 24px',
                        background: C.paper, position: 'relative',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          fontFamily: 'IBM Plex Sans, sans-serif',
                          fontSize: 13, letterSpacing: '0.24em',
                          color: C.dim, fontWeight: 700, marginBottom: 16,
                        }}>
                          {s.label}
                        </div>
                        <div style={{
                          fontFamily: 'Newsreader, serif', fontSize: 130,
                          fontWeight: 400, color: s.tone, lineHeight: 0.95,
                          letterSpacing: '-0.04em', whiteSpace: 'nowrap',
                        }}>
                          <CountUp from={0} to={s.to}
                            prefix={s.prefix} suffix={s.suffix}
                            start={21.9 + i * 0.18} dur={1.6}/>
                        </div>
                        <div style={{
                          position: 'absolute', top: -8, right: -8,
                          background: s.tone, color: C.paper,
                          fontFamily: 'IBM Plex Mono, monospace',
                          fontSize: 11, letterSpacing: '0.15em', padding: '3px 8px',
                          fontWeight: 700,
                        }}>
                          §
                        </div>
                      </div>
                    );
                  }}
                </Sprite>
              ))}
            </div>

            <div style={{
              position: 'absolute', left: '50%', bottom: 100,
              transform: 'translateX(-50%)',
              fontFamily: 'Newsreader, serif', fontStyle: 'italic',
              fontSize: 32, color: C.dim, whiteSpace: 'nowrap',
            }}>
              every number is a github URL away
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

/* ──────────────────────────────────────────────────────
   SCENE 6 — Press Run finale (26.0–30s)
   Big "PRESS RUN" hammer-down + ink splatter + URL.
   ────────────────────────────────────────────────────── */
function Scene6() {
  return (
    <Sprite start={26.0} end={30.0}>
      {({ localTime, duration }) => {
        const enter = Easing.easeOutCubic(clamp(localTime / 0.3, 0, 1));
        return (
          <div style={{
            position: 'absolute', inset: 0, background: C.paper,
            opacity: enter,
          }}>
            {/* Top + bottom rouge rules slam in */}
            <Sprite start={26.0} end={30.0}>
              {({ localTime: lt }) => {
                const k = Easing.easeOutCubic(clamp(lt / 0.4, 0, 1));
                return (
                  <>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 0,
                      height: 24, background: C.rouge, transform: `scaleX(${k})`,
                      transformOrigin: 'left' }}/>
                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
                      height: 24, background: C.rouge, transform: `scaleX(${k})`,
                      transformOrigin: 'right' }}/>
                  </>
                );
              }}
            </Sprite>

            {/* The big stamp */}
            <Stamp start={26.5} dur={0.8} antic={1.2}
              style={{
                left: '50%', top: '38%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'Newsreader, serif',
                fontSize: 240, fontWeight: 500,
                letterSpacing: '-0.045em', color: C.ink,
                lineHeight: 0.9, whiteSpace: 'nowrap',
              }}>
              ★ PRESS RUN ★
            </Stamp>

            <InkSplatter x={960} y={500} start={27.0} scale={1.8} color={C.rouge}/>
            <InkSplatter x={400} y={420} start={27.2} scale={0.9} color={C.ink}/>
            <InkSplatter x={1500} y={460} start={27.3} scale={1.0} color={C.ink}/>

            {/* Subtitle slides in */}
            <Sprite start={27.4} end={30.0}>
              {({ progress }) => {
                const k = Easing.easeOutCubic(clamp(progress * 1.5, 0, 1));
                return (
                  <div style={{
                    position: 'absolute', left: '50%', top: '62%',
                    transform: `translateX(-50%) translateY(${(1-k)*20}px)`,
                    opacity: k,
                    fontFamily: 'Newsreader, serif', fontStyle: 'italic',
                    fontSize: 60, color: C.rouge,
                  }}>
                    — and so it goes to press —
                  </div>
                );
              }}
            </Sprite>

            {/* Final colophon row */}
            <Sprite start={28.0} end={30.0}>
              {({ progress }) => {
                const k = Easing.easeOutCubic(clamp(progress * 2, 0, 1));
                return (
                  <div style={{
                    position: 'absolute', left: 0, right: 0, bottom: 80,
                    display: 'flex', justifyContent: 'space-between', padding: '0 120px',
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: 24,
                    letterSpacing: '0.18em', color: C.ink, fontWeight: 600,
                    opacity: k, transform: `translateY(${(1-k)*20}px)`,
                  }}>
                    <span>chris@tcaci.io</span>
                    <span style={{ color: C.rouge }}>★ THE TCACI QUARTERLY ★</span>
                    <span>github.com/tcaci</span>
                  </div>
                );
              }}
            </Sprite>

            <RegMark x={50} y={50} color={C.rouge}/>
            <RegMark x={1830} y={990} color={C.rouge}/>
          </div>
        );
      }}
    </Sprite>
  );
}

/* ──────────────────────────────────────────────────────
   Master composition
   ────────────────────────────────────────────────────── */
function PressRun() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: C.paper,
      overflow: 'hidden',
    }}>
      <Scene1/>
      <Scene2/>
      <Scene3/>
      <Scene4/>
      <Scene5/>
      <Scene6/>

      {/* Paper grain overlay always on (skip during dark quote scene) */}
      <Sprite start={0} end={16.4} keepMounted={false}>
        <PaperGrain/>
      </Sprite>
      <Sprite start={21.6} end={30.0} keepMounted={false}>
        <PaperGrain/>
      </Sprite>

      {/* Timestamp tag in top-left for comment context */}
      <Timestamp/>
    </div>
  );
}

// Updates data-screen-label every second to mark current timestamp
function Timestamp() {
  const t = useTime();
  React.useEffect(() => {
    const root = document.getElementById('video-root');
    if (root) {
      const sec = Math.floor(t);
      root.setAttribute('data-screen-label', `t=${sec}s`);
    }
  }, [Math.floor(t)]);
  return null;
}

function App() {
  return (
    <div id="video-root" data-screen-label="t=0s">
      <Stage width={1920} height={1080} duration={30}
        background={C.paper}
        persistKey="tcaci-press-run">
        <PressRun/>
      </Stage>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
