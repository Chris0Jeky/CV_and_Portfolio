/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// Shared bits used across sections.

window.Masthead = function Masthead({ issue = "VOL. IV · NO. 043" }) {
  return (
    <div className="container" style={{ paddingTop: 32 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderBottom: '2px solid var(--rule)', paddingBottom: 10, marginBottom: 6,
      }}>
        <div className="label" style={{ fontSize: 12 }}>The Tcaci Quarterly</div>
        <div className="label" style={{ fontSize: 10 }}>{issue} · Spring MMXXVI</div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        borderBottom: '1px solid var(--rule)', paddingBottom: 4,
        fontFamily: 'var(--sans)', fontSize: 9, color: 'var(--ink-dim)',
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        <span>Software · Research · Infrastructure · Civic Data · Occasional Sermons</span>
        <span>London, UK · est. 2023</span>
      </div>
    </div>
  );
};

window.SectionHeader = function SectionHeader({ num, title, kicker, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderTop: '2px solid var(--rule)', borderBottom: '1px solid var(--rule)',
        padding: '10px 0', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span className="label" style={{ color: 'var(--rouge)' }}>§ {num}</span>
          <span className="label">{kicker}</span>
        </div>
        <span className="label">page {String(num).padStart(2,'0')}</span>
      </div>
      <h2 style={{
        fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 88px)',
        margin: '0 0 8px', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 0.95,
        textWrap: 'balance', hyphens: 'manual', wordBreak: 'normal', overflowWrap: 'normal',
      }}>{title}</h2>
      {children && <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-dim)',
        letterSpacing: '0.05em', maxWidth: 700 }}>{children}</div>}
    </div>
  );
};

// Small sparkline used in a few places
window.Sparkline = function Sparkline({ data, color = 'currentColor', height = 60, fill = true }) {
  const w = 320, h = height;
  if (!data || data.length < 2) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const span = max - min || 1;
  const path = data.map((p, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((p - min) / span) * (h - 4) - 2;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
  const area = path + ` L${w},${h} L0,${h} Z`;
  const id = useMemo(() => 'sg-' + Math.random().toString(36).slice(2, 8), []);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${id})`}/>}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
};

// Footnote with hover popover
window.Fn = function Fn({ n, children }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: 'relative' }}>
      <span className="fn" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(o => !o)}>{n}</span>
      {open && (
        <span style={{
          position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-6px)',
          background: 'var(--ink)', color: 'var(--paper)', padding: '8px 12px',
          fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.5, fontStyle: 'normal',
          letterSpacing: 0, width: 280, zIndex: 20, boxShadow: '4px 4px 0 var(--rouge)',
        }}>
          <span style={{ color: 'var(--rouge)', fontWeight: 700 }}>[{n}]</span> {children}
        </span>
      )}
    </span>
  );
};
