/* global React, Sparkline */
const { useState, useEffect, useRef } = React;

window.Experience = function Experience() {
  return (
    <section id="experience" style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeader num="02" kicker="Field reports" title="Where the time went."/>

        {/* GE Digital — full feature with pipeline visualization */}
        <GEDigitalReport/>

        {/* University Outreach */}
        <div style={{ marginTop: 64 }}>
          <UniversityOutreach/>
        </div>

        {/* Timeline of other engagements */}
        <div style={{ marginTop: 64 }}>
          <Timeline/>
        </div>
      </div>
    </section>
  );
};

/* ============ GE DIGITAL FEATURE — Pipeline Viz ============ */
function GEDigitalReport() {
  const [scanned, setScanned] = useState(0); // animated count
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !running) {
          setRunning(true);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [running]);

  useEffect(() => {
    if (!running) return;
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setScanned(s => Math.min(72, s + Math.ceil((72 - s) / 8) || 1));
      if (n > 30) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, [running]);

  return (
    <article ref={ref}>
      {/* Two-column header */}
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 220px', gap: 32,
        borderBottom: '1px solid var(--rule)', paddingBottom: 12, marginBottom: 24, alignItems: 'baseline' }}>
        <div className="label">Feature · case study</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 400,
          letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
          GE Digital <em style={{color:'var(--rouge)'}}>— 15 mo.</em>
        </h3>
        <div className="label" style={{ textAlign: 'right' }}>2023 — 2024 · DevSecOps Intern</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
        <div>
          <p className="dropcap" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 0 }}>
            Spent fifteen months embedded in a security-engineering team responsible for
            the deployment hygiene of a large legacy estate. The headline: I integrated
            automated <strong>Nmap</strong> scanning into seventy-two AWS CI/CD pipelines,
            written across Jenkins, Bash, and just enough Groovy to keep things interesting.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            The result was a unified, audit-friendly scan stage that ran on every deploy:
            shorter feedback loops, fewer hand-rolled config files, and a measurable drop
            in the number of changes that bypassed review. Also, fewer 3am emails. Mostly.
          </p>
          <div style={{ marginTop: 20 }}>
            <span className="stamp" style={{ color: 'var(--forest)' }}>−15% deploy friction</span>
            <span className="stamp" style={{ color: 'var(--rouge)', marginLeft: 12, transform: 'rotate(2deg)' }}>−50% config time</span>
          </div>
        </div>

        <aside style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 32 }}>
          <div className="label" style={{ marginBottom: 8 }}>Stack & disciplines</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {['AWS','Jenkins','Bash','Groovy','Python','Nmap','Terraform','IAM'].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px',
                border: '1px solid var(--rule)', color: 'var(--ink-2)',
              }}>{s}</span>
            ))}
          </div>
          <div className="label" style={{ marginBottom: 8 }}>Tags</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-dim)', fontSize: 14 }}>
            DevSecOps · cloud deployment · legacy backend · auditability · CI/CD · governance
          </div>
        </aside>
      </div>

      {/* Pipeline visualization */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span className="label">Fig. 2 — pipeline scan rollout · 72 deployments</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--forest)' }}>
            ● {scanned}/72 instrumented
          </span>
        </div>
        <PipelineVisualization scanned={scanned}/>
      </div>

      {/* Lessons in terminal style */}
      <div className="term" style={{ marginTop: 32 }}>
        <span className="term-label">$ cat lessons.md</span>
        <div><span className="dim"># 1.</span> the legacy estate is the org's actual API. respect it before you refactor it.</div>
        <div><span className="dim"># 2.</span> a scan that runs once is theatre. a scan that runs on every deploy is policy.</div>
        <div><span className="dim"># 3.</span> Groovy will hurt you. plan accordingly.</div>
        <div><span className="dim"># 4.</span> if it's not in the audit log, it didn't happen <span className="warn">⚠</span></div>
        <div><span className="dim"># 5.</span> dashboards are nice; alerts that page the right person at the right time are the job.</div>
        <div><span className="dim"># 6.</span> the security team is not your enemy. the calendar is.</div>
      </div>
    </article>
  );
}

function PipelineVisualization({ scanned }) {
  const total = 72;
  const cols = 12;
  const rows = Math.ceil(total / cols);
  return (
    <div style={{
      background: 'var(--term-bg)', padding: 24, position: 'relative',
      border: '1px solid #000', boxShadow: '4px 4px 0 var(--rule)',
    }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--term-dim)',
        marginBottom: 14, display: 'flex', justifyContent: 'space-between', letterSpacing: '0.1em' }}>
        <span>JENKINS · 72 PIPELINES · CONTINUOUS SCAN INTEGRATION</span>
        <span><span style={{color: 'var(--term-green)'}} className="pulse">●</span> RUNNING</span>
      </div>

      {/* Grid of pipelines */}
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 6, marginBottom: 16,
      }}>
        {Array.from({ length: total }).map((_, i) => {
          const done = i < scanned;
          return (
            <div key={i} style={{
              height: 28, background: done ? 'var(--term-green)' : '#1a2329',
              border: `1px solid ${done ? 'var(--term-green)' : '#243038'}`,
              opacity: done ? 0.85 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: 9, color: done ? '#0a1410' : 'var(--term-mute)',
              boxShadow: done ? '0 0 6px rgba(124,244,184,0.4)' : 'none',
              transition: 'all 0.3s',
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
          );
        })}
      </div>

      {/* Sample pipeline stages */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4,
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--term-fg)',
      }}>
        {['checkout','build','unit-test','nmap-scan','deploy','audit-log'].map((s, i) => (
          <div key={s} style={{
            padding: '8px 10px',
            background: i === 3 ? 'rgba(124,244,184,0.12)' : '#1a2329',
            border: `1px solid ${i === 3 ? 'var(--term-green)' : '#243038'}`,
            color: i === 3 ? 'var(--term-green)' : 'var(--term-dim)',
            position: 'relative',
          }}>
            <div style={{ fontSize: 8, color: 'var(--term-mute)', letterSpacing: '0.1em' }}>
              STAGE_{String(i+1).padStart(2,'0')}
            </div>
            <div style={{ marginTop: 2 }}>{s}</div>
            {i === 3 && (
              <div style={{ position: 'absolute', top: -6, right: -6,
                background: 'var(--term-amber)', color: '#000', fontSize: 8,
                padding: '1px 4px', letterSpacing: '0.1em' }}>NEW</div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--term-mute)',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--term-fg)',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span><span style={{color:'var(--term-amber)'}}>⏱</span> avg cycle <span style={{color: 'var(--term-fg)'}}>−15%</span></span>
        <span><span style={{color:'var(--term-amber)'}}>⚙</span> config time <span style={{color: 'var(--term-fg)'}}>−50%</span></span>
        <span><span style={{color:'var(--term-amber)'}}>✓</span> findings routed to ticketing</span>
        <span><span style={{color:'var(--term-amber)'}}>◉</span> 0 audit gaps</span>
      </div>
    </div>
  );
}

/* ============ University Outreach ============ */
function UniversityOutreach() {
  return (
    <article style={{
      display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48,
      paddingTop: 24, borderTop: '1px solid var(--rule)',
    }}>
      <div>
        <div className="label">Ongoing · field work</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '6px 0 16px', lineHeight: 1.05 }}>
          Widening Participation <em style={{color:'var(--rouge)'}}>— delivery & data.</em>
        </h3>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
          I work with <strong>Middlesex University</strong>'s Widening Participation team on
          two things at once: the <em>data</em> side (cleaning and analysing the team's
          records to see what actually moves the needle), and the <em>delivery</em> side
          (showing up at schools, on campus, and to whichever audience will tolerate a 9am
          session about computer science). The headline pitch — "a degree is one path,
          not the only one" — is, somehow, still controversial in some rooms.
        </p>
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span className="stamp">Public Speaking</span>
          <span className="stamp" style={{ color: 'var(--forest)', transform: 'rotate(1deg)' }}>Data Analysis</span>
          <span className="stamp" style={{ color: 'var(--rouge)', transform: 'rotate(-1deg)' }}>Workshops</span>
        </div>
      </div>

      <div style={{
        border: '1px solid var(--rule)', padding: 24, background: 'var(--paper-2)',
      }}>
        <div className="label" style={{ marginBottom: 12 }}>Dispatches · selected</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { date: '26.03', loc: 'Year 12 visit', n: '~ 80 students', topic: 'Why software bites back' },
            { date: '26.02', loc: 'On-campus session', n: '~ 35 attendees', topic: 'CI/CD without tears' },
            { date: '26.01', loc: 'Sixth-form workshop', n: '~ 60 students', topic: 'Hello, terminal' },
            { date: '25.11', loc: 'Open day talk', n: '~ 120 prospects', topic: 'A day in the life' },
          ].map(d => (
            <div key={d.date} style={{ borderTop: '1px dashed var(--rule)', paddingTop: 10 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>{d.date}/26</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 17, marginTop: 2 }}>"{d.topic}"</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-dim)', marginTop: 2 }}>
                {d.loc} · {d.n}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ============ Timeline ============ */
function Timeline() {
  const items = [
    { year: '2026', title: 'WealthLens · sole architect', body: 'Open-source UK wealth/inequality data platform. Ten datasets, ten cited chart pages, weekly refresh.' },
    { year: '2026', title: 'Metrix · co-development', body: 'Options-backtesting + signal platform with a small team. ~3.1k commits in.' },
    { year: '2026', title: 'Taskdeck · principal author', body: 'Local-first execution workspace · proposal-first automation.' },
    { year: '2025', title: 'BSc CS · First Class · Middlesex', body: 'Graduated. Started staying for the Widening Participation work.' },
    { year: '2025', title: 'SGAI-AI 2025 · Springer publication', body: 'Lead author on the N-person Prisoner\'s Dilemma paper.' },
    { year: '2025', title: 'Widening Participation · ongoing', body: 'Data + delivery. Schools, campus, workshops.' },
    { year: '2024', title: 'GE Digital · DevSecOps intern (15 mo)', body: '~72 AWS CI/CD pipelines. Cloud deployment + legacy backend. Spotlight Award.' },
    { year: '2023', title: 'N-Person IPD · research begins', body: 'Multi-agent simulation of cooperation emergence in repeated games.' },
  ];
  return (
    <div>
      <div className="label" style={{ marginBottom: 16 }}>Timeline · the rest</div>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '90px 1fr 1.5fr', gap: 24,
          padding: '14px 0', borderTop: '1px solid var(--rule)', alignItems: 'baseline',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--rouge)' }}>{it.year}</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.01em' }}>{it.title}</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>
            {it.body}
          </div>
        </div>
      ))}
    </div>
  );
}
