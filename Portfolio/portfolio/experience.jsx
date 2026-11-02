/* global React, Sparkline */
const { useState, useEffect, useRef } = React;

window.Experience = function Experience() {
  return (
    <section id="experience" style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeader num="02" kicker="Experience" title="Where the time went."/>

        {/* Metricalgo — current role */}
        <MetricalgoReport/>

        {/* Middlesex University */}
        <div style={{ marginTop: 64 }}>
          <MiddlesexReport/>
        </div>

        {/* GE Digital — full feature with pipeline visualization */}
        <div style={{ marginTop: 64 }}>
          <GEDigitalReport/>
        </div>

        {/* Timeline of other engagements */}
        <div style={{ marginTop: 64 }}>
          <Timeline/>
        </div>
      </div>
    </section>
  );
};

/* ============ METRICALGO ============ */
function MetricalgoReport() {
  return (
    <article>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 220px', gap: 32,
        borderBottom: '1px solid var(--rule)', paddingBottom: 12, marginBottom: 24, alignItems: 'baseline' }}>
        <div className="label">Current · software engineer</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 400,
          letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
          Metricalgo <em style={{color:'var(--rouge)'}}>— options analytics.</em>
        </h3>
        <div className="label" style={{ textAlign: 'right' }}>Jul 2025 — present</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
        <div>
          <p className="dropcap" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 0 }}>
            Software engineer on an options analytics platform in closed beta. I built its{' '}
            <strong>AI research assistant</strong>. The model sees only a summary of the backtests
            the user can see, tied to a content hash, so a changed result returns a conflict.
            Each tool call's arguments are schema-checked and every call is recorded by a policy
            layer; admin tools re-check the user's role in the database at execution time. Credit
            is reserved before any provider call and released even if the client drops the stream.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            I also work on the backtest data path. Profiling showed row loading dominated, so I
            built an indexed in-memory options store, an optional Parquet and DuckDB reader that
            produces identical state, and an atomic warm cache, all over a legacy MySQL store
            kept read-only. A written calculation spec is the authority for P&amp;L and fees,
            checked by an independent Decimal reference calculator, golden cases, QuantLib
            cross-checks and mutation tests.
          </p>
        </div>

        <aside style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 32 }}>
          <div className="label" style={{ marginBottom: 8 }}>Stack &amp; disciplines</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {['React','SSE','MySQL','Parquet','DuckDB','QuantLib'].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px',
                border: '1px solid var(--rule)', color: 'var(--ink-2)',
              }}>{s}</span>
            ))}
          </div>
          <div className="label" style={{ marginBottom: 8 }}>Tags</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-dim)', fontSize: 14 }}>
            AI assistant · tool calling · policy layer · data path · correctness
          </div>
        </aside>
      </div>
    </article>
  );
}

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
        <div className="label">Placement · case study</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 400,
          letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
          GE Digital <em style={{color:'var(--rouge)'}}>— 14 mo.</em>
        </h3>
        <div className="label" style={{ textAlign: 'right' }}>Jun 2023 — Sep 2024 · Software Engineer Intern</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
        <div>
          <p className="dropcap" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 0 }}>
            A fourteen-month software engineering placement in Cambridge. I started on the{' '}
            <strong>Smallworld</strong> product: fixed hard-to-reproduce bugs in a large legacy
            Magik codebase, improved database access to make upgrades smoother, added MUnit
            tests and wrote up known pitfalls for new developers.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            Then I took over a security automation project. I extended <strong>Nmap</strong>{' '}
            port scanning from internal builds to the Jenkins pipelines that deploy to AWS,
            across 72 products and about 140 pipelines, using Bash and Groovy. Each fresh
            deployment's open ports are checked against a per-product allow-list, and an
            unexpected port fails the build. Telling ephemeral-port noise from real exposure
            was most of the work, done with DevOps engineers and security architects.
          </p>
          <div style={{ marginTop: 20 }}>
            <span className="stamp" style={{ color: 'var(--gold)' }}>GE Spotlight Award · Deliver with Focus</span>
          </div>
        </div>

        <aside style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 32 }}>
          <div className="label" style={{ marginBottom: 8 }}>Stack & disciplines</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {['Magik','Smallworld','MUnit','Jenkins','Bash','Groovy','Nmap','AWS'].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px',
                border: '1px solid var(--rule)', color: 'var(--ink-2)',
              }}>{s}</span>
            ))}
          </div>
          <div className="label" style={{ marginBottom: 8 }}>Tags</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-dim)', fontSize: 14 }}>
            legacy codebase · security automation · CI/CD · cloud deployment
          </div>
        </aside>
      </div>

      {/* Pipeline visualization */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span className="label">Fig. 2 — port-check rollout · 72 products</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--forest)' }}>
            ● {scanned}/72 checked
          </span>
        </div>
        <PipelineVisualization scanned={scanned}/>
      </div>

      {/* Lessons in terminal style */}
      <div className="term" style={{ marginTop: 32 }}>
        <span className="term-label">$ cat lessons.md</span>
        <div><span className="dim"># 1.</span> a legacy codebase is the product customers run. understand it before you refactor it.</div>
        <div><span className="dim"># 2.</span> a scan that runs once is a report. a scan that fails the build is a control.</div>
        <div><span className="dim"># 3.</span> most of the work is telling noise from real exposure <span className="warn">⚠</span></div>
        <div><span className="dim"># 4.</span> a per-product allow-list beats one rule for everyone.</div>
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
        <span>JENKINS · 72 PRODUCTS · ~140 PIPELINES · NMAP PORT CHECKS</span>
        <span><span style={{color: 'var(--term-green)'}} className="pulse">●</span> RUNNING</span>
      </div>

      {/* Grid of pipelines */}
      <div data-keep-grid style={{
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
        {['checkout','build','deploy-aws','nmap-scan','allow-list','pass/fail'].map((s, i) => (
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
        <span><span style={{color:'var(--term-amber)'}}>◉</span> fresh deployment scanned</span>
        <span><span style={{color:'var(--term-amber)'}}>⚙</span> per-product allow-list</span>
        <span><span style={{color:'var(--term-amber)'}}>✗</span> unexpected port fails the build</span>
      </div>
    </div>
  );
}

/* ============ Middlesex University ============ */
function MiddlesexReport() {
  return (
    <article style={{
      display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48,
      paddingTop: 24, borderTop: '1px solid var(--rule)',
    }}>
      <div>
        <div className="label">Current · Jun 2025 — present · London</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '6px 0 16px', lineHeight: 1.05 }}>
          Middlesex University <em style={{color:'var(--rouge)'}}>— recruitment &amp; outreach.</em>
        </h3>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
          <strong>UK Recruitment &amp; Outreach Coordinator</strong>, full-time since April 2026.
          I joined in June 2025 as Outreach Contractor and Workshop Lead. I build the team's
          reporting and data pipelines and its custom tools, and I plan and deliver talks,
          workshops and campus events.
        </p>
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span className="stamp">Reporting</span>
          <span className="stamp" style={{ color: 'var(--forest)', transform: 'rotate(1deg)' }}>Data pipelines</span>
          <span className="stamp" style={{ color: 'var(--rouge)', transform: 'rotate(-1deg)' }}>Workshops</span>
        </div>
      </div>

      <div style={{
        border: '1px solid var(--rule)', padding: 24, background: 'var(--paper-2)',
      }}>
        <div className="label" style={{ marginBottom: 12 }}>What I built</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: 'Reporting chain', body: 'Raw exports are found by config, and every data problem gets a finding code that appears in the pack. One set of canonical tables feeds the deck, offline dashboard, staging workbook and quarterly Word draft.' },
            { title: 'Provenance', body: 'Each bundle carries a manifest of input, output and code hashes, and a doctor command names any file changed since the build.' },
            { title: 'SharePoint List + Graph sync', body: 'Replacing the hand-typed activity workbook with a SharePoint List and a Python sync engine over Microsoft Graph. Computed fields are written back under a per-item ETag, so a colleague\'s newer edit is skipped and reported.' },
            { title: 'Safe cutover', body: 'The old workbook format is exported exactly, so the reporting chain and rota dashboard keep running. CI compares a synthetic golden build cell by cell; a mutation script re-inserts real past bugs and expects a red test.' },
          ].map(d => (
            <div key={d.title} style={{ borderTop: '1px dashed var(--rule)', paddingTop: 10 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 17, marginTop: 2 }}>{d.title}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-dim)', marginTop: 4, lineHeight: 1.5 }}>
                {d.body}
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
    { year: 'Nov 2025 —', title: 'Independent R&D · development pipeline', body: 'Evenings and weekends. A pipeline that takes a task from an issue, a review finding or my phone to a merged pull request: a git worktree per task, test results tied to the commit SHA, and a plain-Python merge gate. An exhaustive checker walks all 50,542 reachable states of the merge model. Also Taskdeck v0.3.0, NavSentinel and local-asset-studio; also shipped developer-lens, Alibi, WealthLens, estate-atlas and charter-replay.' },
    { year: 'Jul 2025 —', title: 'Metricalgo · Software Engineer', body: 'Options analytics platform (closed beta). Built the AI research assistant; backtest data path and correctness.' },
    { year: 'Jun 2025 —', title: 'Middlesex University · UK Recruitment & Outreach Coordinator', body: 'Full-time since April 2026; joined as Outreach Contractor and Workshop Lead. Reporting and data pipelines, SharePoint List + Microsoft Graph sync.' },
    { year: 'Mar 2025 —', title: 'DeliveraSoft · Software Engineer (Contract)', body: 'Remote, two-person team. Automation, data cleaning, landing pages and fixes for small-business clients, usually starting from a loose brief.' },
    { year: '2025', title: 'BSc (Hons) Computer Science · First Class · Middlesex', body: 'With Industrial Placement.' },
    { year: '2025', title: 'SGAI-AI 2025 · Springer publication', body: 'Lead author on the N-Person Prisoners\' Dilemma paper; presented it at the conference.' },
    { year: '2023 — 24', title: 'GE Digital · Software Engineer Intern (14 months)', body: 'Jun 2023 – Sep 2024, Cambridge. Smallworld and Magik, then Nmap port checks on the Jenkins pipelines that deploy to AWS, across 72 products and about 140 pipelines. GE Spotlight Award, "Deliver with Focus".' },
  ];
  return (
    <div>
      <div className="label" style={{ marginBottom: 16 }}>Timeline · all roles</div>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '110px 1fr 1.5fr', gap: 24,
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
