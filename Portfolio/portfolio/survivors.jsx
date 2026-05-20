/* global React */
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useCallback = React.useCallback;

window.YokaiSurvivors = function YokaiSurvivors() {
  var ref = useState(false), open = ref[0], setOpen = ref[1];
  var canvasRef = useRef(null);
  var gameRef = useRef(null);
  var wasPaused = useRef(false);

  useEffect(function() {
    window.__launchSurvivors = function() { setOpen(true); };
    return function() { delete window.__launchSurvivors; };
  }, []);

  useEffect(function() {
    var code = 'yokai';
    var buf = '';
    var timer;
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      clearTimeout(timer);
      buf += e.key.toLowerCase();
      if (buf.length > code.length) buf = buf.slice(-code.length);
      if (buf === code) { buf = ''; setOpen(true); }
      timer = setTimeout(function() { buf = ''; }, 2000);
    }
    window.addEventListener('keydown', onKey);
    return function() { window.removeEventListener('keydown', onKey); clearTimeout(timer); };
  }, []);

  useEffect(function() {
    if (!open) return;
    function onEsc(e) {
      if (e.key === 'Escape') { e.preventDefault(); handleClose(); }
    }
    window.addEventListener('keydown', onEsc);
    return function() { window.removeEventListener('keydown', onEsc); };
  }, [open, handleClose]);

  useEffect(function() {
    var g = window.__tcaciGame;
    if (!g) return;
    if (open) {
      wasPaused.current = g.paused;
      g.paused = true;
    } else {
      g.paused = wasPaused.current;
    }
  }, [open]);

  useEffect(function() {
    if (!open) {
      if (gameRef.current) { gameRef.current.destroy(); gameRef.current = null; }
      return;
    }
    var t = setTimeout(function() {
      if (canvasRef.current && !gameRef.current) {
        gameRef.current = new window.SurvivorsGame(canvasRef.current);
        gameRef.current.start();
      }
    }, 50);
    return function() { clearTimeout(t); };
  }, [open]);

  useEffect(function() {
    return function() {
      if (gameRef.current) { gameRef.current.destroy(); gameRef.current = null; }
    };
  }, []);

  var handleClose = useCallback(function() {
    if (gameRef.current) { gameRef.current.destroy(); gameRef.current = null; }
    setOpen(false);
  }, []);

  if (!open) return null;

  return React.createElement('div', {
    onClick: handleClose,
    style: {
      position:'fixed', inset:0, zIndex:200,
      background:'rgba(22,21,20,0.82)',
      backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }
  },
    React.createElement('style', null, [
      '@keyframes surv-in{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}',
      '.surv-panel{animation:surv-in .2s ease-out}',
      '.surv-x:hover{background:var(--rouge,#cc3a2e);color:var(--paper,#f4f1ea)}',
      '.surv-canvas{image-rendering:pixelated;image-rendering:crisp-edges;width:100%;aspect-ratio:480/270;display:block;background:#0a0618}',
      '.surv-crt{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,0.12) 0px,rgba(0,0,0,0.12) 1px,transparent 1px,transparent 3px)}',
      '.surv-vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,0.35) 100%)}',
    ].join('\n')),
    React.createElement('div', {
      className:'surv-panel',
      onClick: function(e){ e.stopPropagation(); },
      style: {
        background:'var(--paper,#f4f1ea)',
        border:'2px solid var(--rule,#1a1817)',
        boxShadow:'8px 8px 0 var(--rouge,#cc3a2e)',
        width:'min(920px,95vw)',
        maxHeight:'95vh',
        display:'flex', flexDirection:'column',
        overflow:'hidden',
      }
    },
      React.createElement('div', {
        style: {
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'7px 14px', borderBottom:'1px solid var(--rule,#1a1817)',
          background:'var(--paper-3,#e2dccd)',
          fontFamily:'var(--mono,monospace)', fontSize:10,
          letterSpacing:'0.14em', textTransform:'uppercase',
          color:'var(--ink-dim,#5a554d)',
        }
      },
        React.createElement('span', null,
          React.createElement('span', {style:{color:'var(--rouge,#cc3a2e)'}}, '●'),
          ' entertainment supplement · 妖怪'
        ),
        React.createElement('button', {
          className:'surv-x',
          onClick: handleClose,
          style: {
            background:'none', border:'1px solid var(--rule,#1a1817)',
            fontFamily:'var(--mono,monospace)', fontSize:11,
            padding:'2px 10px', cursor:'pointer',
            color:'var(--ink,#161514)', letterSpacing:'0.08em',
          }
        }, '✕ close')
      ),
      React.createElement('div', {
        style: {
          padding:'10px 20px 8px', textAlign:'center',
          borderBottom:'3px double var(--rule,#1a1817)',
        }
      },
        React.createElement('div', {
          style: {
            fontFamily:'var(--serif,"Times New Roman",serif)',
            fontSize:'clamp(18px,3.5vw,28px)', fontWeight:400,
            letterSpacing:'-0.02em', color:'var(--ink,#161514)', lineHeight:1.15,
          }
        },
          '妖怪サバイバーズ · ',
          React.createElement('span', {style:{color:'var(--rouge,#cc3a2e)'}}, 'Yokai Survivors')
        ),
        React.createElement('div', {
          style: {
            fontFamily:'var(--serif,serif)', fontStyle:'italic',
            fontSize:11, color:'var(--ink-dim,#5a554d)', marginTop:2,
          }
        }, 'A retro vampire-survivors demake, because every portfolio needs one.')
      ),
      React.createElement('div', {
        style: { position:'relative', flexGrow:1, minHeight:'min(400px,52vw)' }
      },
        React.createElement('canvas', {
          ref: canvasRef,
          className:'surv-canvas',
          style: { width:'100%', height:'100%' }
        }),
        React.createElement('div', { className:'surv-crt' }),
        React.createElement('div', { className:'surv-vig' })
      ),
      React.createElement('div', {
        style: {
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'6px 14px', borderTop:'1px solid var(--rule,#1a1817)',
          background:'var(--paper-3,#e2dccd)',
          fontFamily:'var(--mono,monospace)', fontSize:10,
          color:'var(--ink-mute,#8a847a)', letterSpacing:'0.05em',
          flexWrap:'wrap', gap:6,
        }
      },
        React.createElement('span', null, 'wasd / arrows · auto-attack · 1/2/3 or click to upgrade'),
        React.createElement('span', {
          style: {
            fontFamily:'var(--hand,cursive)', fontSize:14,
            color:'var(--rouge,#cc3a2e)', transform:'rotate(-1deg)',
            display:'inline-block',
          }
        }, '"survive the yokai horde"')
      )
    )
  );
};
