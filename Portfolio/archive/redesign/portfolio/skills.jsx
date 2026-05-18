/* global React */
const { useState, useEffect, useRef } = React;

window.Skills = function Skills() {
  return (
    <section id="skills" style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeader num="04" kicker="Apparatus" title="Tools, methods, and biases."/>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <SkillRadar/>
          <SkillBreakdown/>
        </div>

        <div style={{ marginTop: 56 }}>
          <Methods/>
        </div>
      </div>
    </section>
  );
};

const RADAR_AXES = [
  { key: 'backend', label: 'Backend', value: 0.95, items: ['Python', 'FastAPI', 'SQLAlchemy', 'C# / .NET', 'Node'] },
  { key: 'devops',  label: 'DevOps', value: 0.88, items: ['AWS', 'Jenkins', 'GitHub Actions', 'Bash', 'Groovy', 'Terraform'] },
  { key: 'security', label: 'Security', value: 0.78, items: ['Nmap', 'CI scanning', 'Audit trails', 'IAM'] },
  { key: 'frontend', label: 'Frontend', value: 0.78, items: ['React 18', 'TypeScript', 'Vue 3', 'TanStack', 'Tailwind', 'ECharts'] },
  { key: 'data', label: 'Data / ML', value: 0.82, items: ['MySQL', 'SQLite', 'Pandas', 'Pipelines', 'PyTorch', 'ECharts'] },
  { key: 'research', label: 'Research', value: 0.86, items: ['Multi-agent', 'Game theory', 'Simulation', 'Springer / SGAI-AI 2025'] },
  { key: 'delivery', label: 'Delivery', value: 0.82, items: ['Public speaking', 'Workshops', 'Widening Participation'] },
  { key: 'arch', label: 'Architecture', value: 0.92, items: ['Local-first', 'Trust-first', 'Cited-data-first', 'Audit-friendly', 'Legacy ↔ new'] },
];

function SkillRadar() {
  const [active, setActive] = useState(null);
  const size = 380;
  const cx = size / 2, cy = size / 2;
  const R = size * 0.4;
  const N = RADAR_AXES.length;

  const point = (i, r) => {
    const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  };

  const polygon = RADAR_AXES.map((a, i) => point(i, R * a.value).join(',')).join(' ');

  return (
    <div style={{ border: '1.5px solid var(--rule)', padding: 20, background: 'var(--paper-2)' }}>
      <div className="label" style={{ marginBottom: 12 }}>Fig. 5 — capability radar · click an axis</div>
      <svg width="100%" viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        {/* concentric polygons */}
        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <polygon key={i}
            points={RADAR_AXES.map((_, j) => point(j, R * t).join(',')).join(' ')}
            fill="none" stroke="var(--rule)" strokeWidth="0.5" strokeDasharray={i === 3 ? '0' : '2 2'}
          />
        ))}
        {/* axes */}
        {RADAR_AXES.map((a, i) => {
          const [x, y] = point(i, R);
          const [tx, ty] = point(i, R + 28);
          return (
            <g key={a.key} style={{ cursor: 'pointer' }} onClick={() => setActive(active === a.key ? null : a.key)}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--rule)" strokeWidth="0.5"/>
              <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                style={{
                  fontFamily: 'var(--sans)', fontSize: 11, fontWeight: active === a.key ? 700 : 500,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  fill: active === a.key ? 'var(--rouge)' : 'var(--ink-2)',
                }}>{a.label}</text>
            </g>
          );
        })}
        {/* data */}
        <polygon points={polygon} fill="var(--rouge)" fillOpacity="0.15" stroke="var(--rouge)" strokeWidth="1.5"/>
        {/* dots */}
        {RADAR_AXES.map((a, i) => {
          const [x, y] = point(i, R * a.value);
          return (
            <circle key={a.key} cx={x} cy={y} r={active === a.key ? 6 : 3.5}
              fill={active === a.key ? 'var(--rouge)' : 'var(--ink)'}/>
          );
        })}
      </svg>

      {active && (() => {
        const a = RADAR_AXES.find(x => x.key === active);
        return (
          <div style={{
            marginTop: 12, padding: 14, background: 'var(--paper)',
            border: '1px solid var(--rule)',
          }}>
            <div className="label" style={{ color: 'var(--rouge)' }}>{a.label} · {(a.value * 100).toFixed(0)}%</div>
            <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {a.items.map(it => (
                <span key={it} style={{
                  fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px',
                  border: '1px solid var(--rule)',
                }}>{it}</span>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function SkillBreakdown() {
  return (
    <div>
      <div className="label" style={{ marginBottom: 16 }}>Self-assessed · honest-ish</div>

      <div className="term">
        <span className="term-label">$ skills --by-confidence</span>
        <div><span className="ok">▸</span> python, fastapi, sqlalchemy, pydantic <span className="dim">// daily driver · wealthlens + metrix backbone</span></div>
        <div><span className="ok">▸</span> vue 3, typescript, pinia, echarts, d3 <span className="dim">// wealthlens + taskdeck + pulseboard</span></div>
        <div><span className="ok">▸</span> ci/cd · jenkins, github actions, groovy <span className="dim">// 72 pipelines at ge + 30 workflows at home</span></div>
        <div><span className="ok">▸</span> backend architecture <span className="dim">// dual-db, audit-friendly, legacy-tolerant</span></div>
        <div><span className="ok">▸</span> data pipelines · pandas, validation, freshness tracking <span className="dim">// reproducible, cited, scheduled</span></div>
        <div><span className="cyan">▸</span> c# · .net 8, ef core, signalr <span className="dim">// taskdeck, reposcope, devfoundry</span></div>
        <div><span className="cyan">▸</span> react 18 · tanstack query + table <span className="dim">// the front side of metrix</span></div>
        <div><span className="cyan">▸</span> websockets, signalr, redis <span className="dim">// 4 projects, 3 languages, 0 polling</span></div>
        <div><span className="cyan">▸</span> ai/llm integration · mcp, multi-provider <span className="dim">// tools, not co-workers</span></div>
        <div><span className="cyan">▸</span> testing · pytest, vitest, playwright, stryker, hypothesis <span className="dim">// 874 reasons to sleep at night</span></div>
        <div><span className="cyan">▸</span> security · nmap, threat-modelling, bloom filters <span className="dim">// 112 fixtures at last count</span></div>
        <div><span className="warn">▸</span> pytorch · lstm, random forest <span className="dim">// project-by-project, not architecture-level</span></div>
        <div><span className="warn">▸</span> public speaking <span className="dim">// improving · more reps needed · fewer 9am slots</span></div>
        <div><span className="dim">▸</span> css <span className="warn">// declared incompetent by myself. retracted upon learning about grid.</span></div>
        <div><span className="err">▸</span> regex <span className="dim">// can write, can read, refuses to admit which is harder.</span></div>
      </div>

      {/* Pull quote */}
      <div style={{
        marginTop: 24, padding: 24, borderLeft: '4px solid var(--rouge)',
        background: 'var(--paper-2)',
      }}>
        <div className="pull-quote" style={{ marginBottom: 8 }}>
          "I'd rather be the person who reads the audit log than the person who writes the press release."
        </div>
        <div className="label" style={{ color: 'var(--rouge)' }}>— self, Tuesday, allegedly</div>
      </div>

      {/* Second quote — civic-data flavour */}
      <div style={{
        marginTop: 16, padding: '16px 20px', borderLeft: '4px solid var(--teal)',
        background: 'var(--paper-2)',
      }}>
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 20, lineHeight: 1.4, letterSpacing: '-0.01em', marginBottom: 6,
        }}>
          "UK household wealth is £17 trillion. Most people have no idea what that distribution looks like."
        </div>
        <div className="label" style={{ color: 'var(--teal)' }}>— self, building WealthLens at 2am</div>
      </div>
    </div>
  );
}

function Methods() {
  const methods = [
    { t: 'Architecture-first', d: 'Sketch the boundaries before the syntax. The diagram lives longer than the framework. The framework will be deprecated by April.' },
    { t: 'Trust-first automation', d: 'Every change is a proposal. Auto-applied actions need an explicit policy and a kill switch. If you can\'t name who pressed the button, you don\'t have a button.' },
    { t: 'Local-first by default', d: 'Choose offline-capable storage and sync as a feature, not the platform. The cloud is somebody else\'s computer, with somebody else\'s priorities.' },
    { t: 'Reliability as defaults', d: 'Tests, logs, alerts, and rollback paths are not "phase two." They are the deliverable. Phase two is when you find out which of them you skipped.' },
    { t: 'Legacy ↔ new dual-track', d: 'Treat existing systems as the org\'s real API. Wrap, observe, replace incrementally. "Rewrite" is the word product managers use when nobody has dared to look at the database.' },
    { t: 'Smallest auditable unit', d: 'Prefer reviewable diffs over large rewrites. The PR is the documentation. The commit message is the apology.' },
    { t: 'Data-first, source-always', d: 'Every dataset cites its source with URL and access date. Every transformation is reproducible from a script. If it\'s not cited, it\'s not data — it\'s a guess in a nice font.' },
  ];
  return (
    <div>
      <div className="label" style={{ marginBottom: 16 }}>Methods · the way I work</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {methods.map((m, i) => (
          <div key={i} style={{
            padding: 24, borderTop: '1px solid var(--rule)',
            borderRight: i % 3 === 2 ? 'none' : '1px solid var(--rule)',
            borderBottom: '1px solid var(--rule)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--rouge)', letterSpacing: '0.15em', marginBottom: 8 }}>
              METHOD {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.01em', marginBottom: 8 }}>
              {m.t}
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.55 }}>
              {m.d}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
