/* global React */
const { useState, useEffect, useRef } = React;

window.DoomEasterEgg = function DoomEasterEgg() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState('idle');
  const gameRef = useRef(null);
  const wasPaused = useRef(false);

  useEffect(() => {
    window.__launchDoom = () => setOpen(true);
    return () => { delete window.__launchDoom; };
  }, []);

  useEffect(() => {
    const code = 'iddqd';
    let buf = '';
    let timer;
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      clearTimeout(timer);
      buf += e.key.toLowerCase();
      if (buf.length > code.length) buf = buf.slice(-code.length);
      if (buf === code) { buf = ''; setOpen(true); }
      timer = setTimeout(() => { buf = ''; }, 2000);
    }
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const g = window.__tcaciGame;
    if (!g) return;
    if (open) {
      wasPaused.current = g.paused;
      g.paused = true;
    } else {
      g.paused = wasPaused.current;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let dead = false;
    setPhase('loading');

    (async () => {
      try {
        if (!document.querySelector('link[data-doom]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://v8.js-dos.com/latest/js-dos.css';
          link.dataset.doom = '';
          document.head.appendChild(link);
        }
        if (!window.Dos) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://v8.js-dos.com/latest/js-dos.js';
            s.onload = resolve;
            s.onerror = () => reject(new Error('script'));
            document.head.appendChild(s);
          });
        }
        if (dead) return;
        await new Promise(r => requestAnimationFrame(r));
        if (dead || !gameRef.current) return;
        window.Dos(gameRef.current, {
          url: 'https://cdn.dos.zone/custom/dos/doom.jsdos',
        });
        setPhase('ready');
      } catch (_) {
        if (!dead) setPhase('error');
      }
    })();

    return () => { dead = true; };
  }, [open]);

  if (!open) return null;

  return (
    <div onClick={() => setOpen(false)} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(22, 21, 20, 0.82)',
      backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <style>{`
        @keyframes doom-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .doom-panel { animation: doom-in 0.2s ease-out; }
        .doom-x:hover { background: var(--rouge, #cc3a2e); color: var(--paper, #f4f1ea); }
        .doom-panel .emulator-button { pointer-events: auto; }
      `}</style>
      <div className="doom-panel" onClick={e => e.stopPropagation()} style={{
        background: 'var(--paper, #f4f1ea)',
        border: '2px solid var(--rule, #1a1817)',
        boxShadow: '8px 8px 0 var(--rouge, #cc3a2e)',
        width: 'min(860px, 95vw)',
        maxHeight: '95vh',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Masthead */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 14px', borderBottom: '1px solid var(--rule, #1a1817)',
          background: 'var(--paper-3, #e2dccd)',
          fontFamily: 'var(--mono, monospace)', fontSize: 10,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--ink-dim, #5a554d)',
        }}>
          <span>
            <span style={{ color: 'var(--rouge, #cc3a2e)' }}>●</span> entertainment supplement
          </span>
          <button className="doom-x" onClick={() => setOpen(false)} style={{
            background: 'none', border: '1px solid var(--rule, #1a1817)',
            fontFamily: 'var(--mono, monospace)', fontSize: 11,
            padding: '2px 10px', cursor: 'pointer',
            color: 'var(--ink, #161514)', letterSpacing: '0.08em',
          }}>
            ✕ close
          </button>
        </div>

        {/* Headline */}
        <div style={{
          padding: '14px 20px 10px', textAlign: 'center',
          borderBottom: '3px double var(--rule, #1a1817)',
        }}>
          <div style={{
            fontFamily: 'var(--serif, "Times New Roman", serif)',
            fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 400,
            letterSpacing: '-0.02em', color: 'var(--ink, #161514)', lineHeight: 1.15,
          }}>
            Yes, This Portfolio Runs{' '}
            <span style={{ color: 'var(--rouge, #cc3a2e)' }}>Doom</span>
          </div>
          <div style={{
            fontFamily: 'var(--serif, serif)', fontStyle: 'italic',
            fontSize: 12, color: 'var(--ink-dim, #5a554d)', marginTop: 3,
          }}>
            If it has a screen and a prayer, someone will port Doom to it.
          </div>
        </div>

        {/* Game area */}
        <div style={{ position: 'relative', flexGrow: 1, minHeight: 'min(480px, 56vw)' }}>
          <div ref={gameRef} style={{
            width: '100%', height: '100%',
            position: 'absolute', inset: 0,
            background: '#0e1418',
          }} />
          {phase === 'loading' && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono, monospace)',
              color: '#7cf4b8', fontSize: 12, letterSpacing: '0.1em',
              background: '#0e1418', pointerEvents: 'none',
            }}>
              <div style={{ marginBottom: 8, animation: 'blink 1s steps(1) infinite' }}>
                ▸ loading doom engine…
              </div>
              <div style={{ color: '#46555f', fontSize: 10 }}>
                DOOM™ shareware · id Software 1993
              </div>
            </div>
          )}
          {phase === 'error' && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono, monospace)', fontSize: 12,
              color: 'var(--ink-dim, #5a554d)', background: '#0e1418',
            }}>
              <div style={{ color: 'var(--rouge, #cc3a2e)', marginBottom: 8 }}>
                ● transmission interrupted
              </div>
              The DOOM engine could not be loaded.
              <div style={{ marginTop: 6, fontSize: 10, color: '#46555f' }}>
                The CDN may be temporarily unavailable — try again later.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '6px 14px', borderTop: '1px solid var(--rule, #1a1817)',
          background: 'var(--paper-3, #e2dccd)',
          fontFamily: 'var(--mono, monospace)', fontSize: 10,
          color: 'var(--ink-mute, #8a847a)', letterSpacing: '0.05em',
          flexWrap: 'wrap', gap: 6,
        }}>
          <span>wasd · mouse aim · click shoot · esc menu</span>
          <span style={{
            fontFamily: 'var(--hand, cursive)', fontSize: 15,
            color: 'var(--rouge, #cc3a2e)', transform: 'rotate(-1deg)',
            display: 'inline-block',
          }}>
            "it's not a portfolio until it runs doom"
          </span>
        </div>
      </div>
    </div>
  );
};
