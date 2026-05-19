/* global React */
const { useState, useEffect, useRef } = React;

// Parse a stat string like "£17T" / "4,500+" / "874" into a count-up animator.
function CountUp({ target, active, duration = 1400, delay = 0 }) {
  const m = /^(.*?)([\d][\d,]*)(.*)$/.exec(target);
  if (!m) return <>{target}</>;
  const [, prefix, digits, suffix] = m;
  const end = parseInt(digits.replace(/,/g, ''), 10);
  const hasComma = digits.includes(',');
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now() + delay;
    let raf;
    function tick(t) {
      const elapsed = t - startTime;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min(1, elapsed / duration);
      // ease-out cubic
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end, duration, delay]);

  const display = active ? (hasComma ? val.toLocaleString('en-GB') : String(val)) : '0';
  return <>{prefix}{display}{suffix}</>;
}

// A "by the numbers" interstitial — a single tight row of headline stats.
window.ByTheNumbers = function ByTheNumbers() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisible(true); });
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { v: '£17T', l: 'of UK wealth · visualised' },
    { v: '9,799', l: 'tests on Taskdeck', accent: 'forest' },
    { v: '874', l: 'tests on WealthLens', accent: 'teal' },
    { v: '5,500+', l: 'taskdeck commits', accent: 'forest' },
    { v: '1,070+', l: 'taskdeck PRs', accent: 'forest' },
    { v: '3,144', l: 'metrix commits', accent: 'rouge' },
    { v: '72', l: 'aws pipelines · ge' },
    { v: '112', l: 'security fixtures · navsentinel', accent: 'rouge' },
    { v: '1', l: 'paper · springer · SGAI-AI 25', accent: 'gold' },
  ];

  return (
    <section ref={ref} style={{ padding: '24px 0' }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          borderTop: '2px solid var(--rule)', borderBottom: '1px solid var(--rule)',
          padding: '10px 0', marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span className="label" style={{ color: 'var(--rouge)' }}>§ Interlude</span>
            <span className="label">A pause, in numbers.</span>
          </div>
          <span className="label">the receipts</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 0,
          border: '1.5px solid var(--rule)', background: 'var(--paper-2)' }}>
          {stats.map((s, i) => {
            const color = s.accent === 'teal' ? 'var(--teal)' :
                          s.accent === 'forest' ? 'var(--forest)' :
                          s.accent === 'rouge' ? 'var(--rouge)' :
                          s.accent === 'gold' ? 'var(--gold)' : 'var(--ink)';
            return (
              <div key={i} style={{
                padding: '20px 14px',
                borderRight: i < stats.length - 1 ? '1px solid var(--rule)' : 'none',
                textAlign: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.5s ease ${i * 0.06}s`,
              }}>
                <div style={{
                  fontFamily: 'var(--serif)', fontSize: 34, fontWeight: 400,
                  letterSpacing: '-0.025em', lineHeight: 1, color, marginBottom: 6,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  <CountUp target={s.v} active={visible} delay={i * 80}/>
                </div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 9.5,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--ink-dim)', lineHeight: 1.3 }}>{s.l}</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 8, textAlign: 'right' }}>
          <span className="label" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>
            Fig. 7 — figures verifiable on github · last reconciled spring 2026
          </span>
        </div>
      </div>
    </section>
  );
};
