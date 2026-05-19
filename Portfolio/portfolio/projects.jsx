/* global React, Sparkline, WealthLensFeature, NavSentinelFeature */
const { useState, useEffect, useRef, useMemo } = React;

window.Projects = function Projects() {
  return (
    <section id="projects" style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeader num="03" kicker="Catalogue raisonné" title="Projects, in order of trouble caused." />

        {/* Featured: WealthLens — the lead story */}
        <WealthLensFeature />

        {/* Featured: Metrix with backtest demo */}
        <div style={{ marginTop: 64 }}>
          <MetrixFeature />
        </div>

        {/* Featured: Taskdeck */}
        <div style={{ marginTop: 64 }}>
          <TaskdeckFeature />
        </div>

        {/* Featured: NavSentinel with CDS demo */}
        <div style={{ marginTop: 64 }}>
          <NavSentinelFeature />
        </div>

        {/* Featured: NPDL with live sim */}
        <div style={{ marginTop: 64 }}>
          <IPDFeature />
        </div>

        {/* Catalogue rows for the rest */}
        <div style={{ marginTop: 64 }}>
          <div className="label" style={{ marginBottom: 16 }}>The rest of the catalogue</div>
          {CATALOG.map((p, i) =>
          <CatalogRow key={i} {...p} />
          )}
        </div>
      </div>
    </section>);

};

const TASKDECK_GPS = [
{ id: 'GP-01', title: 'Layer boundaries', body: 'Domain / application / infrastructure / API stay coherent. No forbidden dependency direction.' },
{ id: 'GP-02', title: 'Claims-first identity', body: 'Never trust caller-supplied identity. Derive it from authenticated claims.' },
{ id: 'GP-03', title: 'Stable error contracts', body: 'Predictable JSON errors. `errorCode`, non-empty `message`, consistent status semantics.' },
{ id: 'GP-04', title: 'Test & CI evidence', body: 'Behaviour changes ship with deterministic tests and verification commands.' },
{ id: 'GP-05', title: 'Canonical docs sync', body: 'Active docs stay aligned with shipped reality when behaviour or workflow changes.' },
{ id: 'GP-06', title: 'Review-first automation', body: 'Automation-originated board writes are proposal-first. No silent autonomy by default.' },
{ id: 'GP-07', title: 'Lightweight governance', body: 'Maintainable, low-brittleness checks over regex / policy sprawl.' },
{ id: 'GP-08', title: 'Legibility before breadth', body: 'No surface area ahead of a clear golden path. No orphan pages without a next step.' },
{ id: 'GP-09', title: 'Traceable agent expansion', body: 'No agent / autonomy breadth unless runs, policies, and artifacts stay inspectable.' },
{ id: 'GP-10', title: 'Explicit egress & telemetry', body: 'Every external destination disclosed. Local telemetry rejects user content by default.' }];


const CATALOG = [
{ num: '038', name: 'RepoScope', cat: 'devtool · offline · 100% local', stack: 'C# / .NET 8 · LibGit2Sharp · Vue 3',
  desc: 'Git repository analyzer that runs on your machine and stays there. CLI + Vue dashboard + static HTML reports. File-level hotspots, code churn over time, contributor patterns. The kind of insight you used to need a SaaS dashboard and a credit card for.' },
{ num: '036', name: 'DevFoundry', cat: 'toolbox · cli + ui · offline', stack: 'C# · .NET 8 · Vue 3',
  desc: 'An offline Swiss-army knife: JSON formatter, JSON⇄YAML, Base64, URL encoder, UUID, MD5/SHA, JWT decoder, timestamp converter, case converter, text diff, colour converter — 11 tools sharing one core, none of them sending your data to a random website that has "free" in the title.' },
{ num: '035', name: 'Historical Stats Tools', cat: 'finance · analytics', stack: 'Python · MySQL',
  desc: 'Companion to Metrix — a suite of statistical tools that crunches historical options data and feeds Metrix\'s backtests with inputs that have already been argued about, validated, and cited.' },
{ num: '034', name: 'AgentForge', cat: 'devtool · agent orchestration', stack: 'Python 3.11 · git worktrees · MCP · GitHub CLI',
  desc: 'A local-first "agent farm" for running multiple coding agents without them stepping on each other. Each task gets its own git worktree, the orchestrator handles spawning, harness checks, PR comment commands, MCP toolkit sync, and policy-as-code. Trust-first automation for the case where the automation itself is plural.' },
{ num: '033', name: 'Pulseboard', cat: 'realtime · pluggable · PWA', stack: 'Python · FastAPI · Vue 3 · ECharts',
  desc: 'Real-time, pluggable dashboard platform. WebSocket streaming with auto-reconnect, three built-in feeds (system metrics via psutil, HTTP-JSON poller, crypto via CoinGecko), drag-and-drop panels with grid snapping. 85% backend coverage, 56 frontend tests, dockerised, PWA-ready. The dashboard I wanted instead of the third Grafana spin-up.' },
{ num: '030', name: 'SwarmingLilMen', cat: 'systems · simulation · performance', stack: 'C# · .NET 8 · Raylib · SIMD',
  desc: 'A 2D swarm simulation targeting 50k–100k interactive agents at 60 FPS via Structure-of-Arrays data layout and an allocation-free hot path. Deterministic, seeded, reproducible. Ships with four browser demos: Boids, Vicsek phase transitions, ant-colony optimisation, and particle-swarm optimisation. The bridge between NPDL theory and watching it happen at 60 frames per second.' },
{ num: '029', name: 'EduHub', cat: 'edtech · fullstack · realtime', stack: 'Vue · Node · MongoDB · JWT',
  desc: 'Full-stack educational platform with a Vue 2 frontend and a JWT-secured Node/Express API. Lives, ships, has users.' },
{ num: '028', name: 'AI Data Analytics Suite', cat: 'ml · dual model', stack: 'Python · LSTM · Random Forest',
  desc: 'Dual-model: student performance prediction (Random Forest, 98% R²) and fake-news detection (LSTM, 99.9% accuracy). The percentages are real. My faith in the second number, in production, is calibrated accordingly.' },
{ num: '027', name: 'Java ML Classifiers (from scratch)', cat: 'ml · educational', stack: 'Java · no libraries',
  desc: '15+ machine-learning classifiers — k-NN, SVM, MLP, the lot — implemented from scratch in pure Java for digit recognition. The kind of project you do once so you never wonder how it works again.' },
{ num: '026', name: 'Celestial Siege', cat: 'game · realtime · multiplayer', stack: 'C++17 · HTML5 Canvas · WebSocket',
  desc: 'Real-time multiplayer tower defence with a C++ WebSocket game server, HTML5 Canvas frontend, and a JSON-based client-server protocol. The least forgiving WebSocket use-case there is: low latency, high frequency, no excuses.' },
{ num: '022', name: 'Thread-safe C++ Music Library', cat: 'systems · c++17', stack: 'C++17 · std::thread',
  desc: 'High-performance, thread-safe music library with fuzzy and regex search, full metadata support, and the kind of locking discipline that means the readme is shorter than the locks themselves.' }];


/* ============ METRIX FEATURE ============ */
function MetrixFeature() {
  return (
    <article>
      <FeatureHeader num="042" name="Metrix" cat="Finance · SaaS Platform"
      years="2025 — building" team="~5 contributors · ~3,144 commits"
      tone="rouge" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
        <div>
          <p className="dropcap" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 0 }}>
            <em style={{ color: 'var(--rouge)' }}>Metrix</em> is the ambitious one. A
            full-stack SaaS where users define options-trading strategies, run backtests
            against historical data, get live signals, and subscribe to other people's
            published "systems" — each a first-class object combining a strategy, a
            backtest, and an audit trail you can subscribe to. Roughly the most opinionated
            backtester I've ever helped build.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            The architecture is dual-database by design: a legacy, read-only{' '}
            <code style={{ fontFamily: 'var(--mono)', fontSize: 14, background: 'var(--paper-3)', padding: '0 4px' }}>staticprofit</code>{' '}
            holds the historical options universe and is treated as immutable scripture;
            a fresh, read/write{' '}
            <code style={{ fontFamily: 'var(--mono)', fontSize: 14, background: 'var(--paper-3)', padding: '0 4px' }}>options_backtest_platform</code>{' '}
            owns everything we ship. Backend is FastAPI / SQLAlchemy 2.0 / Pydantic.
            Frontend is React 18 / TypeScript / TanStack Query + Table / Apache ECharts /
            Tailwind. The server is allowed to be wrong, briefly — the client is not.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            Phase 10 added a full AI assistant chat: <strong>LLM tool orchestration</strong>,
            prompt management, conversation persistence, and live WebSocket status updates
            while the assistant is actually doing work. Multi-provider, config-gated, and
            — importantly — a tool, not a co-worker.
          </p>
          <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Python 3.11', 'FastAPI', 'SQLAlchemy 2.0', 'Pydantic', 'MySQL ×2', 'React 18', 'TypeScript', 'TanStack Query', 'TanStack Table', 'ECharts', 'Tailwind', 'Vite', 'WebSocket', 'LLM tools'].map((s) =>
            <span key={s} style={{
              fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px',
              border: '1px solid var(--rule)', color: 'var(--ink-2)'
            }}>{s}</span>
            )}
          </div>
        </div>

        <BacktestDemo />
      </div>

      {/* Field note */}
      <div className="term" style={{ marginTop: 32 }}>
        <span className="term-label">$ tail -f architecture.notes</span>
        <div><span className="prompt">▸</span> dual-db keeps legacy data <span className="ok">immutable</span> and platform state <span className="ok">portable</span>.</div>
        <div><span className="prompt">▸</span> tanstack-query is the system of record on the client; the server is allowed to be wrong, briefly.</div>
        <div><span className="prompt">▸</span> systems are first-class objects: a strategy + a backtest + an audit trail you can subscribe to.</div>
        <div><span className="prompt">▸</span> phase 10: full <span className="cyan">AI assistant chat</span> — LLM-powered, tool orchestration, prompt mgmt, conversation persistence, WebSocket status during tool runs.</div>
        <div><span className="prompt">▸</span> next: collaborative strategy editing without merging headaches. (TBD: hopeful.)</div>
      </div>
    </article>);

}

function BacktestDemo() {
  const [fast, setFast] = useState(10);
  const [slow, setSlow] = useState(40);
  const [vol, setVol] = useState(50);

  // generative strategy result based on inputs
  const data = useMemo(() => {
    const N = 120;
    const seed = (fast * 31 + slow * 7 + vol * 13) % 1000;
    const rand = (i) => {
      const x = Math.sin(seed + i * 1.7) * 10000;
      return x - Math.floor(x);
    };
    const series = [100];
    for (let i = 1; i < N; i++) {
      const trend = (fast - slow) / 80;
      const noise = (rand(i) - 0.5) * (vol / 25);
      series.push(Math.max(50, series[i - 1] * (1 + trend * 0.005 + noise * 0.012)));
    }
    return series;
  }, [fast, slow, vol]);

  const start = data[0],end = data[data.length - 1];
  const pct = (end - start) / start * 100;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const dd = (min - max) / max * 100;

  return (
    <div data-tilt style={{
      border: '1.5px solid var(--rule)', boxShadow: '4px 4px 0 var(--rouge)',
      background: 'var(--paper-2)', padding: 0
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 16px', borderBottom: '1px solid var(--rule)',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)'
      }}>
        <span><span style={{ color: pct > 0 ? 'var(--forest)' : 'var(--rouge)' }} className="pulse">●</span> LIVE BACKTEST · MA-CROSS</span>
        <span>SAMPLE · NOT FINANCIAL ADVICE</span>
      </div>

      <div style={{ padding: 18 }}>
        {/* result */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div className="label" style={{ fontSize: 9 }}>RETURN</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 400,
              color: pct > 0 ? 'var(--forest)' : 'var(--rouge)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {pct > 0 ? '+' : ''}{pct.toFixed(1)}%
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="label" style={{ fontSize: 9 }}>MAX DD</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--ink-2)' }}>{dd.toFixed(1)}%</div>
          </div>
        </div>

        <div style={{ height: 80, color: pct > 0 ? 'var(--forest)' : 'var(--rouge)', marginBottom: 16 }}>
          <Sparkline data={data} color="currentColor" height={80} />
        </div>

        {/* sliders */}
        <ParamRow label="Fast MA" value={fast} min={2} max={30} unit="d"
        onChange={setFast} />
        <ParamRow label="Slow MA" value={slow} min={20} max={120} unit="d"
        onChange={setSlow} />
        <ParamRow label="Volatility" value={vol} min={10} max={100} unit="·"
        onChange={setVol} />
      </div>

      <div style={{
        borderTop: '1px solid var(--rule)', padding: '10px 16px',
        background: 'var(--paper-3)',
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)',
        letterSpacing: '0.1em', textTransform: 'uppercase'
      }}>
        Fig. 3 — toy demo of the real thing. Drag the sliders.
      </div>
    </div>);

}

function ParamRow({ label, value, min, max, onChange, unit }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)', marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: 'var(--ink)' }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} />
    </div>);

}

/* ============ TASKDECK FEATURE ============ */
function TaskdeckFeature() {
  return (
    <article style={{ borderTop: '1px solid var(--rule)', paddingTop: 32 }}>
      <FeatureHeader num="041" name="Taskdeck" cat="Local-first Devtool · Clean Architecture"
      years="2025 — active" team="solo · 5,300+ commits · 620+ PRs · 9,799 tests · 21 ADRs" tone="forest" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48 }}>
        <div>
          <p className="dropcap" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 0 }}>
            <em style={{ color: 'var(--forest)' }}>Taskdeck</em> exists because most
            "AI productivity tools" mutate your data first and apologise later. Taskdeck
            does the opposite. The loop is{' '}
            <strong>Capture → Triage → Review → Apply</strong>:{' '}
            you paste anything (an email, a voice-note transcript, a checklist dump),
            it generates a structured <em>proposal diff</em> of what would change on
            your board, and <strong>nothing actually changes</strong> until you click
            "apply." No silent mutations, no surprise cards, no autopilot.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            Backend is .NET 8 ASP.NET Core + EF Core + SQLite, structured as a strict
            four-layer Clean Architecture (Domain → Application → Infrastructure → Api)
            with <strong>architecture tests mechanically enforcing layer purity</strong>
            — forbidden imports caught in CI before merge. Frontend is Vue 3 + TypeScript
            + Pinia + Vite + Tailwind. Realtime via SignalR with claims-derived
            authorisation. <strong>9,799 tests</strong> total: 6,532 backend (incl. FsCheck
            property tests + fuzz tests), 3,267 frontend unit + integration, plus 24 Playwright E2E
            and k6 load profiles. CI ships CycloneDX SBOMs and SLSA provenance.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            LLM is multi-provider behind <code style={{ fontFamily: 'var(--mono)', fontSize: 14, background: 'var(--paper-3)', padding: '0 4px' }}>ILlmProvider</code>:
            Mock (deterministic, default), OpenAI GPT-4o-mini, Gemini 2.5 Flash — config-gated,
            never on by accident. The chat-to-proposal pipeline asks the model for structured
            JSON, parses to planner calls, and falls back to a static regex-based intent
            classifier when parsing fails. The LLM is a tool, not a coworker.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            Three workspace modes (<em>guided</em> / <em>workbench</em> / <em>agent</em>),
            partitioned rate limiting, full OWASP baseline (CSP, X-Frame-Options, HSTS),
            OpenTelemetry instrumentation, and an MCP server for tool extensibility. The
            kind of plumbing you usually have to apologise for shipping without.
          </p>

          <div style={{ marginTop: 16, padding: 14,
            background: 'var(--paper-2)', border: '1px solid var(--rule)',
            borderLeft: '4px solid var(--forest)' }}>
            <div className="label" style={{ marginBottom: 6, color: 'var(--forest)' }}>What Taskdeck is NOT</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              <div><span style={{ color: 'var(--rouge)' }}>✕</span> not a cloud SaaS (yet)</div>
              <div><span style={{ color: 'var(--rouge)' }}>✕</span> not a team platform (single user, on purpose)</div>
              <div><span style={{ color: 'var(--rouge)' }}>✕</span> not an autonomous AI agent</div>
            </div>
          </div>

          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['.NET 8', 'EF Core', 'SQLite', 'Vue 3', 'TypeScript', 'Pinia', 'Tailwind', 'SignalR', 'MCP', 'OpenTelemetry', 'CycloneDX SBOM', 'xUnit', 'FsCheck', 'k6', 'Playwright'].map((s) =>
            <span key={s} style={{
              fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px',
              border: '1px solid var(--rule)', color: 'var(--ink-2)'
            }}>{s}</span>
            )}
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="btn" href="https://github.com/Chris0Jeky/Taskdeck" target="_blank" rel="noopener"
            style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>↗ Repo</a>
            <a className="btn" href="#contact">▷ Beta interest</a>
          </div>
        </div>

        {/* Visual: a simulated Taskdeck UI */}
        <TaskdeckMock />
      </div>

      {/* Golden Principles — repo invariants */}
      <div style={{ marginTop: 32 }}>
        <div className="label" style={{ marginBottom: 10 }}>
          Fig. 5 — Taskdeck's repo invariants · <em>10 Golden Principles</em>
        </div>
        <div style={{
          border: '1.5px solid var(--rule)', background: 'var(--paper-2)',
          padding: 20
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 32px' }}>
            {TASKDECK_GPS.map((gp) =>
            <div key={gp.id} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 10, alignItems: 'baseline', padding: '6px 0', borderBottom: '1px dashed var(--rule)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--forest)', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {gp.id}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.005em' }}>
                    {gp.title}
                  </div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 11.5, color: 'var(--ink-dim)', lineHeight: 1.4, marginTop: 2 }}>
                    {gp.body}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--rule)',
            fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)' }}>
            // mechanically enforced by check-golden-principles.mjs. yes, the principles themselves have a CI check.
          </div>
        </div>
      </div>
    </article>);

}

function TaskdeckMock() {
  const [tick, setTick] = useState(0);
  const LOG_LINES = [
    { t: '14:02:11', lvl: 'ok',    msg: 'proposal #4811 applied · 3 cards moved' },
    { t: '14:02:09', lvl: 'dim',   msg: 'audit.append → boards/jeky/audit.jsonl' },
    { t: '14:01:58', lvl: 'warn',  msg: 'reviewer touched 2 fields · re-validating' },
    { t: '14:01:42', lvl: 'cyan',  msg: 'llm: mock → parsed 1 instruction in 4ms' },
    { t: '14:01:30', lvl: 'ok',    msg: 'capture 0x7f · classified → triage' },
    { t: '14:01:18', lvl: 'dim',   msg: 'signalR · 1 client subscribed' },
    { t: '14:00:55', lvl: 'rouge', msg: 'rejected · stale baseline · no apply' },
    { t: '14:00:41', lvl: 'ok',    msg: 'GP-06 check passed · proposal-first ✓' },
    { t: '14:00:22', lvl: 'cyan',  msg: 'CI · 9,799 tests · 0 failed · 38.2s' },
  ];
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % LOG_LINES.length), 1700);
    return () => clearInterval(id);
  }, []);
  const visible = [];
  for (let i = 0; i < 5; i++) {
    visible.push(LOG_LINES[(tick + i) % LOG_LINES.length]);
  }
  const lvlColor = {
    ok: 'var(--term-green)', warn: 'var(--term-amber)',
    cyan: 'var(--term-cyan)', rouge: 'var(--term-red)',
    dim: 'var(--term-dim)'
  };

  return (
    <div data-tilt style={{
      background: 'var(--term-bg)', color: 'var(--term-fg)',
      border: '1px solid #000', boxShadow: '6px 6px 0 var(--forest)',
      fontFamily: 'var(--mono)', fontSize: 12,
      alignSelf: 'start'
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '8px 12px', borderBottom: '1px solid #1a2329',
        color: 'var(--term-dim)', fontSize: 10, letterSpacing: '0.1em'
      }}>
        <span>TASKDECK · LOCAL · v0.4</span>
        <span><span style={{ color: 'var(--term-green)' }}>●</span> SYNCED · OFFLINE</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: '#1a2329' }}>
        {[
        { title: 'CAPTURE', items: ['~ refactor scan stage', '~ write up case study', '~ retire jenkins-prod-2'] },
        { title: 'PROPOSED', items: ['+ add audit trail', '+ rename pipeline-77', '− deprecate legacy-aws-key'], badge: '3' },
        { title: 'APPLIED', items: ['✓ rotate scan secrets', '✓ split deploy stage', '✓ ship taskdeck v0.4'] }].
        map((col) =>
        <div key={col.title} style={{ background: 'var(--term-bg)', padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ color: 'var(--term-amber)', letterSpacing: '0.12em', fontSize: 10 }}>{col.title}</span>
              {col.badge && <span style={{
              background: 'var(--term-amber)', color: '#000',
              fontSize: 9, padding: '0 5px'
            }}>{col.badge}</span>}
            </div>
            {col.items.map((it, i) => {
            const sign = it[0];
            const color = sign === '+' ? 'var(--term-green)' : sign === '−' ? 'var(--term-red)' : sign === '✓' ? 'var(--term-dim)' : 'var(--term-fg)';
            return (
              <div key={i} style={{
                borderLeft: `2px solid ${color}`, paddingLeft: 8,
                marginBottom: 8, color: color, fontSize: 11.5, lineHeight: 1.4
              }}>{it}</div>);

          })}
          </div>
        )}
      </div>

      {/* Live audit tail — fills the right column nicely */}
      <div style={{
        borderTop: '1px solid #1a2329', padding: '10px 14px',
        background: 'rgba(0,0,0,0.18)'
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 8
        }}>
          <span style={{ color: 'var(--term-amber)', letterSpacing: '0.14em', fontSize: 9 }}>
            $ tail -f ~/taskdeck.audit
          </span>
          <span style={{ color: 'var(--term-dim)', fontSize: 9, letterSpacing: '0.1em' }}>
            <span style={{ color: 'var(--term-green)' }} className="pulse">●</span> LIVE
          </span>
        </div>
        <div style={{ display: 'grid', gap: 4 }}>
          {visible.map((l, i) => (
            <div key={`${tick}-${i}`} style={{
              display: 'grid', gridTemplateColumns: '70px 1fr',
              gap: 10, fontSize: 11, lineHeight: 1.45,
              opacity: 1 - i * 0.18,
              transition: 'opacity 0.6s'
            }}>
              <span style={{ color: 'var(--term-mute)' }}>{l.t}</span>
              <span style={{ color: lvlColor[l.lvl] }}>
                {l.msg}{i === 0 ? <span className="blink" style={{ color: 'var(--term-fg)' }}>▍</span> : null}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sparkline — CI test runs over the last 24 builds */}
      <div style={{
        borderTop: '1px solid #1a2329', padding: '10px 14px',
        display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12
      }}>
        <div>
          <div style={{ color: 'var(--term-dim)', fontSize: 9, letterSpacing: '0.14em', marginBottom: 4 }}>
            CI · LAST 24 BUILDS
          </div>
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: 2, height: 22
          }}>
            {Array.from({ length: 24 }, (_, i) => {
              const seed = Math.sin(i * 1.7) * 10000;
              const h = 6 + (Math.abs(seed - Math.floor(seed))) * 16;
              const failed = (i === 7 || i === 18);
              return (
                <div key={i} style={{
                  width: 4, height: h, background: failed ? 'var(--term-red)' : 'var(--term-green)',
                  opacity: 0.55 + (i / 24) * 0.45
                }} />
              );
            })}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'var(--term-green)', fontFamily: 'var(--mono)', fontSize: 16 }}>
            91.6%
          </div>
          <div style={{ color: 'var(--term-mute)', fontSize: 9, letterSpacing: '0.1em' }}>
            GREEN BUILDS
          </div>
        </div>
      </div>

      <div style={{
        padding: '8px 12px', borderTop: '1px solid #1a2329',
        fontSize: 10, color: 'var(--term-mute)', display: 'flex', justifyContent: 'space-between'
      }}>
        <span><span style={{ color: 'var(--term-amber)' }}>⌘ K</span> capture · <span style={{ color: 'var(--term-amber)' }}>⌘ ↩</span> apply · <span style={{ color: 'var(--term-amber)' }}>⌘ Z</span> reject</span>
        <span>local · ~/taskdeck.db</span>
      </div>
    </div>);

}

/* ============ N-IPD FEATURE — live simulation ============ */
function IPDFeature() {
  const [n, setN] = useState(8); // number of agents
  const [defectorRatio, setDefectorRatio] = useState(0.3);
  const [round, setRound] = useState(0);
  const [running, setRunning] = useState(true);
  const [grid, setGrid] = useState(() => initAgents(8, 0.3));
  const [coopHistory, setCoopHistory] = useState([0.7]);

  function initAgents(nn, dRatio) {
    return Array.from({ length: nn * nn }, () => Math.random() > dRatio ? 'C' : 'D');
  }

  // Reset when params change
  useEffect(() => {
    setGrid(initAgents(n, defectorRatio));
    setRound(0);
    setCoopHistory([1 - defectorRatio]);
  }, [n, defectorRatio]);

  // Tick simulation
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setGrid((g) => stepAgents(g, n));
      setRound((r) => r + 1);
    }, 800);
    return () => clearInterval(t);
  }, [running, n]);

  // Track cooperation rate
  useEffect(() => {
    const coop = grid.filter((c) => c === 'C').length / grid.length;
    setCoopHistory((h) => [...h.slice(-39), coop]);
  }, [round]);

  function stepAgents(g, nn) {
    // Tit-for-Tat-ish: each cell looks at neighbors. If majority defect, defect. Else cooperate.
    return g.map((cell, i) => {
      const r = Math.floor(i / nn),c = i % nn;
      const neighbors = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const rr = (r + dr + nn) % nn;
          const cc = (c + dc + nn) % nn;
          neighbors.push(g[rr * nn + cc]);
        }
      }
      const dCount = neighbors.filter((x) => x === 'D').length;
      // Slight noise + payoff bias toward dominant strategy
      if (dCount >= 5) return Math.random() < 0.85 ? 'D' : 'C';
      if (dCount <= 2) return Math.random() < 0.9 ? 'C' : 'D';
      return cell;
    });
  }

  const cellSize = 18;
  const coopRate = grid.filter((c) => c === 'C').length / grid.length;

  return (
    <article style={{ borderTop: '1px solid var(--rule)', paddingTop: 32 }}>
      <FeatureHeader num="031" name="N-Person Prisoner's Dilemma" cat="Research · Springer · SGAI-AI 2025"
      years="2023–2025 · published" team="lead author · presented" tone="gold" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <p className="dropcap" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 0 }}>
            <em style={{ color: 'var(--gold)' }}>NPDL</em> — the N-Person Prisoner's
            Dilemma Learning framework — is a research codebase and accompanying
            paper exploring <em>cooperation emergence</em> in repeated multi-agent
            games. <strong>Published in Springer proceedings at SGAI-AI 2025</strong>,
            lead author, presented at conference.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            Twelve-plus strategies, from classical reactive policies (Tit-for-Tat,
            Pavlov, Generous TFT) to reinforcement learners (Q-Learning, Hysteretic-Q,
            WOLF-PHC, LRA-Q, UCB1-Q). Five network topologies (fully-connected,
            small-world, scale-free, random, regular). Two interaction modes
            (neighbourhood and pairwise). An evolutionary scenario generator that
            ranks results by an <em>"interestingness score"</em> — a composite metric
            that explicitly rewards dynamics over flat equilibria, because watching
            everyone cooperate forever is not science, it's a screensaver.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            The fun part is watching cooperation collapse and re-emerge in islands.
            It's the same instinct behind WealthLens: <em>trust spreads locally,
            defection spreads in clusters, and a good system makes the cost of
            defection visible to everyone.</em>
          </p>

          <pre style={{
            fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.6, color: 'var(--ink-2)',
            background: 'var(--paper-3)', padding: 16, borderLeft: '3px solid var(--rouge)',
            margin: '20px 0', overflow: 'auto'
          }}>{`@inproceedings{tcaci_nipd_2025,
  title     = "Navigating the N-Person Prisoners' Dilemma",
  author    = "Tcaci, C.",
  booktitle = "SGAI-AI 2025",
  publisher = "Springer",
  year      = 2025,
  note      = "lead author · presented at conference"
}`}</pre>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span className="stamp" style={{ color: 'var(--gold)' }}>Springer 2025</span>
            {['Python', 'PyTorch', 'NumPy', 'NetworkX', 'Plotly Dash', 'Game Theory', 'MARL'].map((s) =>
            <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 8px', border: '1px solid var(--rule)' }}>{s}</span>
            )}
          </div>
          <div style={{ marginTop: 16 }}>
            <a className="btn" href="https://github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation" target="_blank" rel="noopener"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>↗ NPDL repo</a>
          </div>
        </div>

        {/* Live IPD board */}
        <div data-tilt style={{
          background: 'var(--term-bg)', color: 'var(--term-fg)',
          border: '1px solid #000', boxShadow: '6px 6px 0 var(--gold)',
          padding: 18, fontFamily: 'var(--mono)', fontSize: 11
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: 'var(--term-dim)', letterSpacing: '0.12em' }}>
            <span>IPD.LIVE · GRID {n}×{n}</span>
            <span>round <span style={{ color: 'var(--term-fg)' }}>{round.toString().padStart(3, '0')}</span></span>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`,
            gap: 2, marginBottom: 12,
            aspectRatio: '1 / 1'
          }}>
            {grid.map((cell, i) =>
            <div key={i} style={{
              background: cell === 'C' ? 'var(--term-green)' : 'var(--term-red)',
              opacity: cell === 'C' ? 0.85 : 0.85,
              transition: 'background 0.5s'
            }} />
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ color: 'var(--term-green)' }}>● cooperate <span style={{ color: 'var(--term-fg)' }}>{(coopRate * 100).toFixed(0)}%</span></span>
            <span style={{ color: 'var(--term-red)' }}>● defect <span style={{ color: 'var(--term-fg)' }}>{((1 - coopRate) * 100).toFixed(0)}%</span></span>
          </div>

          <div style={{ height: 30, color: 'var(--term-cyan)', marginBottom: 12 }}>
            {coopHistory.length > 1 && <Sparkline data={coopHistory} color="currentColor" height={30} />}
          </div>

          <div style={{ borderTop: '1px dashed var(--term-mute)', paddingTop: 10 }}>
            <div style={{ marginBottom: 6, color: 'var(--term-dim)' }}>Population</div>
            <input type="range" min="4" max="14" value={n} onChange={(e) => setN(+e.target.value)} />
            <div style={{ margin: '10px 0 6px', color: 'var(--term-dim)' }}>Initial defectors {(defectorRatio * 100).toFixed(0)}%</div>
            <input type="range" min="0" max="100" value={defectorRatio * 100} onChange={(e) => setDefectorRatio(+e.target.value / 100)} />
            <button className="btn" style={{
              marginTop: 12, background: 'transparent',
              borderColor: 'var(--term-amber)', color: 'var(--term-amber)',
              fontSize: 10, padding: '6px 12px'
            }} onClick={() => setRunning((r) => !r)}>
              {running ? '⏸ pause' : '▷ run'}
            </button>
            <button className="btn" style={{
              marginTop: 12, marginLeft: 8, background: 'transparent',
              borderColor: 'var(--term-dim)', color: 'var(--term-dim)',
              fontSize: 10, padding: '6px 12px'
            }} onClick={() => {setGrid(initAgents(n, defectorRatio));setRound(0);}}>
              ↺ reset
            </button>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 24, padding: '10px 16px', background: 'var(--paper-3)',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)',
        borderLeft: '3px solid var(--rouge)'
      }}>
        Fig. 4 — toy version of the simulation. The paper covers actual strategies, payoffs, and emergence conditions. This is the GIF of it.
      </div>
    </article>);

}

/* ============ Shared bits ============ */
function FeatureHeader({ num, name, cat, years, team, tone }) {
  const color = tone === 'rouge' ? 'var(--rouge)' : tone === 'forest' ? 'var(--forest)' : tone === 'gold' ? 'var(--gold)' : tone === 'teal' ? 'var(--teal)' : 'var(--ink)';
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 24, alignItems: 'baseline',
      borderBottom: '2px solid var(--rule)', paddingBottom: 12, marginBottom: 24
    }}>
      <div className="label" style={{ color }}>№ {num}</div>
      <div>
        <h3 style={{
          fontFamily: 'var(--serif)', fontSize: 52, fontWeight: 400,
          letterSpacing: '-0.025em', margin: 0, lineHeight: 1, color
        }}>
          {name}
        </h3>
        <div className="label" style={{ marginTop: 6 }}>{cat}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className="label">{years}</div>
        <div className="label" style={{ marginTop: 4 }}>{team}</div>
      </div>
    </div>);

}

function CatalogRow({ num, name, cat, stack, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      display: 'grid', gridTemplateColumns: '60px 1fr 1.4fr 180px', gap: 24,
      padding: '18px 0', borderTop: '1px solid var(--rule)', alignItems: 'baseline',
      background: hover ? 'var(--paper-2)' : 'transparent',
      transition: 'background 0.15s', cursor: 'default',
      paddingLeft: hover ? 12 : 0, paddingRight: hover ? 12 : 0,
      margin: hover ? '0 -12px' : '0'
    }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)' }}>№ {num}</div>
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 26, letterSpacing: '-0.01em', color: hover ? 'var(--rouge)' : 'var(--ink)' }}>
          {name}
        </div>
        <div className="label" style={{ marginTop: 4 }}>{cat}</div>
      </div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 13.5, color: 'var(--ink-dim)', lineHeight: 1.55 }}>
        {desc}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-dim)' }}>{stack}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: hover ? 'var(--rouge)' : 'var(--ink-mute)', marginTop: 4 }}>
          {hover ? '→ open' : 'idle'}
        </div>
      </div>
    </div>);

}