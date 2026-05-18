/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */
const { useState, useEffect, useRef } = React;

/* =========================================================
   DIRECTION 1 — TERMINAL / ENGINEERING LOG
   Dark, monospace, surgical accents, dense
   ========================================================= */
const t1 = {
  bg: '#07090b',
  panel: '#0e1216',
  panel2: '#141a20',
  border: '#1e262e',
  borderHi: '#2a3540',
  ink: '#d8e0e8',
  inkDim: '#7a8a98',
  inkMute: '#4a5560',
  accent: '#7cf4b8',     // mint signal-green
  accent2: '#ffb454',    // amber
  accent3: '#ff5f6d',    // red
  mono: "'JetBrains Mono', ui-monospace, monospace",
  sans: "'Inter Tight', system-ui, sans-serif",
};

function Direction1() {
  return (
    <div style={{
      width: 1280, padding: '56px 64px',
      background: t1.bg, color: t1.ink, fontFamily: t1.sans,
      backgroundImage: `radial-gradient(circle at 20% 0%, rgba(124,244,184,0.04), transparent 50%),
                        radial-gradient(circle at 80% 100%, rgba(255,180,84,0.03), transparent 50%)`,
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: t1.mono, fontSize: 11, color: t1.inkMute,
        borderBottom: `1px solid ${t1.border}`, paddingBottom: 16, marginBottom: 48,
        letterSpacing: '0.08em',
      }}>
        <span>DIRECTION_01 / TERMINAL.LOG</span>
        <span><span style={{color: t1.accent}}>●</span> SYSTEM_OPERATIONAL · 26.04.10</span>
      </div>

      {/* Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, marginBottom: 64 }}>
        <div>
          <div style={{ fontFamily: t1.mono, fontSize: 12, color: t1.accent, letterSpacing: '0.15em', marginBottom: 24 }}>
            ~/portfolio · main · whoami
          </div>
          <h1 style={{
            fontSize: 92, lineHeight: 0.9, margin: '0 0 24px', fontWeight: 500,
            letterSpacing: '-0.04em', color: t1.ink,
          }}>
            Cristian<br/>
            <span style={{ color: t1.inkDim, fontStyle: 'italic', fontFamily: 'Newsreader, serif', fontWeight: 300 }}>
              "Chris"
            </span> Tcaci
          </h1>
          <div style={{ fontFamily: t1.mono, fontSize: 14, lineHeight: 1.7, color: t1.inkDim, maxWidth: 520 }}>
            <div><span style={{color: t1.accent}}>$</span> role <span style={{color: t1.ink}}>= </span>"Software Engineer · Backend / Platform"</div>
            <div><span style={{color: t1.accent}}>$</span> philosophy <span style={{color: t1.ink}}>= </span>"local-first · trust-first · proposal-not-autopilot"</div>
            <div><span style={{color: t1.accent}}>$</span> uptime <span style={{color: t1.ink}}>= </span>"15mo @ GE Digital · ~3.1k commits this year"</div>
          </div>
        </div>

        {/* Status panel */}
        <div style={{
          background: t1.panel, border: `1px solid ${t1.border}`, padding: 24,
          fontFamily: t1.mono, fontSize: 11, lineHeight: 1.9,
        }}>
          <div style={{ color: t1.inkMute, marginBottom: 12, letterSpacing: '0.12em' }}>// STATUS</div>
          <Row label="pipelines.aws" value="72" tone="ok"/>
          <Row label="ci.cycle.reduction" value="-15%" tone="ok"/>
          <Row label="config.time" value="-50%" tone="ok"/>
          <Row label="papers.published" value="01" tone="info"/>
          <Row label="active.systems" value="04" tone="info"/>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px dashed ${t1.border}`, color: t1.inkMute }}>
            <div>last_commit: 2h ago</div>
            <div>region: GB-MAN</div>
          </div>
        </div>
      </div>

      {/* Palette */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 56 }}>
        {[
          ['bg', t1.bg, 'background'],
          ['panel', t1.panel, 'surface'],
          ['border', t1.border, 'rule'],
          ['ink', t1.ink, 'text'],
          ['signal', t1.accent, 'ok / on'],
          ['amber', t1.accent2, 'warn'],
          ['red', t1.accent3, 'err'],
        ].map(([n, c, role]) => (
          <div key={n}>
            <div style={{ height: 64, background: c, border: `1px solid ${t1.border}` }}/>
            <div style={{ fontFamily: t1.mono, fontSize: 10, color: t1.inkDim, marginTop: 6 }}>{n}</div>
            <div style={{ fontFamily: t1.mono, fontSize: 10, color: t1.inkMute }}>{c}</div>
            <div style={{ fontFamily: t1.mono, fontSize: 9, color: t1.inkMute, marginTop: 2, fontStyle:'italic' }}>{role}</div>
          </div>
        ))}
      </div>

      {/* Type sample */}
      <div style={{ marginBottom: 56, paddingBottom: 32, borderBottom: `1px solid ${t1.border}` }}>
        <div style={{ fontFamily: t1.mono, fontSize: 11, color: t1.inkMute, letterSpacing: '0.12em', marginBottom: 16 }}>// TYPOGRAPHY</div>
        <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 56, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>
          Inter Tight — display
        </div>
        <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 32, fontWeight: 300, color: t1.inkDim, marginBottom: 16 }}>
          Newsreader italic — flourish
        </div>
        <div style={{ fontFamily: t1.mono, fontSize: 13, color: t1.inkDim, lineHeight: 1.7, maxWidth: 700 }}>
          JetBrains Mono — body, code, captions, status. Used for everything technical: timestamps,
          file paths, CLI prompts, commit hashes, the texture of the page.
        </div>
      </div>

      {/* Scorecard concept */}
      <div style={{ fontFamily: t1.mono, fontSize: 11, color: t1.inkMute, letterSpacing: '0.12em', marginBottom: 16 }}>
        // PROJECT.SCORECARD — hover-reveal architecture
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <Scorecard1 idx="01" name="Taskdeck" tag="local-first" stack={['Vue 3', '.NET 8', 'SQLite']}
          tagline="Capture → proposal diff → explicit apply" stars="—" status="ACTIVE"/>
        <Scorecard1 idx="02" name="Metrix" tag="finance / saas" stack={['FastAPI', 'React 18', 'MySQL', 'ECharts']}
          tagline="User-built trading systems on top of backtest + signal infra" stars="—" status="BUILDING"/>
      </div>

      {/* Badges */}
      <div style={{ fontFamily: t1.mono, fontSize: 11, color: t1.inkMute, letterSpacing: '0.12em', marginBottom: 16 }}>
        // BADGES — credentials surfaced inline
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Badge1 icon="◈" label="GE Digital · 15mo intern" tone="ok"/>
        <Badge1 icon="✦" label="Published research · N-IPD" tone="info"/>
        <Badge1 icon="◇" label="University Outreach · delivery" tone="info"/>
        <Badge1 icon="▲" label="DevSecOps · 72 pipelines" tone="ok"/>
        <Badge1 icon="●" label="Backend / Platform" tone="ok"/>
        <Badge1 icon="◐" label="Public Speaking" tone="info"/>
      </div>
    </div>
  );
}

function Row({ label, value, tone }) {
  const dot = tone === 'ok' ? t1.accent : tone === 'warn' ? t1.accent2 : '#6fb3ff';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: t1.inkDim }}><span style={{color: dot}}>●</span> {label}</span>
      <span style={{ color: t1.ink, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function Scorecard1({ idx, name, tag, stack, tagline, stars, status }) {
  return (
    <div style={{
      background: t1.panel, border: `1px solid ${t1.border}`, padding: 20,
      position: 'relative', fontFamily: t1.mono,
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize: 10, color: t1.inkMute, letterSpacing:'0.1em', marginBottom: 12 }}>
        <span>{idx} / {tag}</span>
        <span style={{color: status==='ACTIVE' ? t1.accent : t1.accent2}}>● {status}</span>
      </div>
      <div style={{ fontFamily: t1.sans, fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 12, color: t1.inkDim, lineHeight: 1.6, marginBottom: 16, fontFamily: t1.sans }}>{tagline}</div>
      <div style={{ display:'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {stack.map(s => (
          <span key={s} style={{ fontSize: 10, padding: '3px 8px', background: t1.panel2, color: t1.inkDim, border: `1px solid ${t1.border}` }}>{s}</span>
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize: 10, color: t1.inkMute, paddingTop: 12, borderTop: `1px dashed ${t1.border}` }}>
        <span>→ open case study</span>
        <span>↗ repo</span>
      </div>
    </div>
  );
}

function Badge1({ icon, label, tone }) {
  const c = tone === 'ok' ? t1.accent : '#6fb3ff';
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap: 8, padding: '6px 12px',
      border: `1px solid ${t1.border}`, fontFamily: t1.mono, fontSize: 11, color: t1.inkDim,
      background: t1.panel,
    }}>
      <span style={{ color: c }}>{icon}</span> {label}
    </div>
  );
}

/* =========================================================
   DIRECTION 2 — EDITORIAL / RESEARCH PAPER
   Light, serif-led, academic, structured, refined
   ========================================================= */
const t2 = {
  bg: '#f4f1ea',         // warm off-white
  bg2: '#ebe6db',
  ink: '#161514',
  inkDim: '#5a554d',
  inkMute: '#9a948a',
  rule: '#1a1817',
  accent: '#cc3a2e',      // editorial red
  accent2: '#1a4d3a',     // forest
  serif: "'Newsreader', 'Times New Roman', serif",
  sans: "'IBM Plex Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
};

function Direction2() {
  return (
    <div style={{
      width: 1280, padding: '56px 80px',
      background: t2.bg, color: t2.ink, fontFamily: t2.serif,
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(0,0,0,0.025) 31px, rgba(0,0,0,0.025) 32px)`,
    }}>
      {/* Masthead */}
      <div style={{ display:'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderBottom: `2px solid ${t2.rule}`, paddingBottom: 12, marginBottom: 8,
        fontFamily: t2.sans, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        <span>The Tcaci Quarterly</span>
        <span>Vol. III · Issue 2 · Spring 2026</span>
      </div>
      <div style={{ display:'flex', justifyContent: 'space-between', borderBottom: `1px solid ${t2.rule}`, paddingBottom: 4, marginBottom: 56,
        fontFamily: t2.sans, fontSize: 9, color: t2.inkDim, letterSpacing: '0.1em' }}>
        <span>SOFTWARE · RESEARCH · INFRASTRUCTURE</span>
        <span>NO. 042</span>
      </div>

      {/* Hero */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: t2.sans, fontSize: 11, letterSpacing:'0.15em', color: t2.accent, marginBottom: 16 }}>
          ✦ FEATURED — A PRACTITIONER'S NOTEBOOK
        </div>
        <h1 style={{
          fontSize: 132, lineHeight: 0.85, margin: '0 0 24px',
          fontFamily: t2.serif, fontWeight: 400, letterSpacing: '-0.03em',
        }}>
          Cristian<br/>
          <em style={{ fontWeight: 300, color: t2.accent }}>Tcaci.</em>
        </h1>
        <div style={{ fontFamily: t2.sans, fontSize: 14, color: t2.inkDim, maxWidth: 600, lineHeight: 1.7,
          columnCount: 2, columnGap: 32 }}>
          A backend & platform engineer writing about the boring half of software — the
          half where pipelines fail at 3am, where trust is earned by being auditable, where
          "AI assistance" is a proposal you can reject. Currently building Metrix and Taskdeck;
          previously at GE Digital; occasionally a researcher.
        </div>
      </div>

      {/* Palette */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 48 }}>
        {[
          ['paper', t2.bg],
          ['cream', t2.bg2],
          ['ink', t2.ink],
          ['rule', t2.rule],
          ['rouge', t2.accent],
          ['forest', t2.accent2],
        ].map(([n, c]) => (
          <div key={n}>
            <div style={{ height: 72, background: c, border: c === t2.bg ? `1px solid ${t2.rule}` : 'none' }}/>
            <div style={{ fontFamily: t2.mono, fontSize: 10, color: t2.inkDim, marginTop: 6, textTransform:'uppercase' }}>{n}</div>
            <div style={{ fontFamily: t2.mono, fontSize: 10, color: t2.inkMute }}>{c}</div>
          </div>
        ))}
      </div>

      {/* Type */}
      <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${t2.rule}` }}>
        <div style={{ fontFamily: t2.sans, fontSize: 10, letterSpacing:'0.15em', color: t2.inkDim, marginBottom: 16 }}>TYPOGRAPHY</div>
        <div style={{ fontFamily: t2.serif, fontSize: 64, fontWeight: 400, lineHeight: 1, letterSpacing:'-0.02em', marginBottom: 4 }}>
          Newsreader — display & body
        </div>
        <div style={{ fontFamily: t2.serif, fontStyle: 'italic', fontSize: 36, color: t2.accent, fontWeight: 300, marginBottom: 16 }}>
          italics carry the voice
        </div>
        <div style={{ fontFamily: t2.sans, fontSize: 14, color: t2.ink, lineHeight: 1.6, marginBottom: 4 }}>
          IBM Plex Sans — chrome, labels, navigation
        </div>
        <div style={{ fontFamily: t2.mono, fontSize: 12, color: t2.inkDim }}>
          IBM Plex Mono — citations, code, footnotes¹
        </div>
      </div>

      {/* Scorecards as catalog entries */}
      <div style={{ fontFamily: t2.sans, fontSize: 10, letterSpacing:'0.15em', color: t2.inkDim, marginBottom: 16 }}>
        SELECTED WORKS — CATALOGUE RAISONNÉ
      </div>
      <div style={{ marginBottom: 48 }}>
        <CatalogRow num="042" name="Metrix" year="2026" cat="Finance · SaaS"
          desc="Trading-system platform: users compose strategies on top of backtest + signal infrastructure."
          tone="rouge"/>
        <CatalogRow num="041" name="Taskdeck" year="2026" cat="Devtools"
          desc="Local-first execution workspace. Capture → proposal diff → explicit apply."
          tone="forest"/>
        <CatalogRow num="038" name="Nmap CI/CD Integration" year="2024" cat="Security · GE Digital"
          desc="Automated scanning across ~72 AWS pipelines. −15% deploy friction, −50% config time."/>
        <CatalogRow num="031" name="N-Person Prisoner's Dilemma" year="2023" cat="Research"
          desc="Multi-agent simulation of cooperation emergence. Published findings."/>
      </div>

      {/* Badges = stamps */}
      <div style={{ fontFamily: t2.sans, fontSize: 10, letterSpacing:'0.15em', color: t2.inkDim, marginBottom: 16 }}>
        CREDENTIALS — STAMPED
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        <Stamp label="GE Digital" sub="Intern · 15 mo"/>
        <Stamp label="Published" sub="N-IPD · 2023" tone="rouge"/>
        <Stamp label="Outreach" sub="University"/>
        <Stamp label="DevSecOps" sub="72 pipelines" tone="forest"/>
      </div>
    </div>
  );
}

function CatalogRow({ num, name, year, cat, desc, tone }) {
  const c = tone === 'rouge' ? t2.accent : tone === 'forest' ? t2.accent2 : t2.ink;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '60px 1fr 200px 80px', gap: 24,
      padding: '20px 0', borderBottom: `1px solid ${t2.rule}`, alignItems: 'baseline',
    }}>
      <div style={{ fontFamily: t2.mono, fontSize: 11, color: t2.inkDim }}>№ {num}</div>
      <div>
        <div style={{ fontFamily: t2.serif, fontSize: 28, fontWeight: 400, color: c, letterSpacing: '-0.01em' }}>
          {name}
        </div>
        <div style={{ fontFamily: t2.sans, fontSize: 13, color: t2.inkDim, marginTop: 4, lineHeight: 1.5 }}>
          {desc}
        </div>
      </div>
      <div style={{ fontFamily: t2.sans, fontSize: 11, color: t2.inkDim, letterSpacing: '0.05em' }}>{cat}</div>
      <div style={{ fontFamily: t2.mono, fontSize: 11, color: t2.inkDim, textAlign: 'right' }}>{year} →</div>
    </div>
  );
}

function Stamp({ label, sub, tone }) {
  const c = tone === 'rouge' ? t2.accent : tone === 'forest' ? t2.accent2 : t2.ink;
  return (
    <div style={{
      border: `2px solid ${c}`, padding: '6px 14px', borderRadius: 2,
      transform: `rotate(${(Math.random()*4-2).toFixed(2)}deg)`,
      fontFamily: t2.sans, color: c, textAlign: 'center', minWidth: 110,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>{sub}</div>
    </div>
  );
}

/* =========================================================
   DIRECTION 3 — TRADING TERMINAL / BLUEPRINT
   Dark navy, signal-cyan, technical-drawing grid, very alive
   ========================================================= */
const t3 = {
  bg: '#08111a',
  bg2: '#0d1922',
  panel: '#0f1e2a',
  panel2: '#152a3a',
  grid: '#1a2f42',
  border: '#1f3650',
  ink: '#e8eef4',
  inkDim: '#7d96ad',
  inkMute: '#4d6478',
  cyan: '#5ee2ff',
  green: '#4ade80',
  red: '#ff5470',
  amber: '#ffaa3c',
  display: "'Geist', system-ui, sans-serif",
  mono: "'Geist Mono', ui-monospace, monospace",
};

function Direction3() {
  return (
    <div style={{
      width: 1280, padding: '0',
      background: t3.bg, color: t3.ink, fontFamily: t3.display,
      backgroundImage: `linear-gradient(${t3.grid} 1px, transparent 1px), linear-gradient(90deg, ${t3.grid} 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      backgroundPosition: '-1px -1px',
    }}>
      <div style={{ padding: '40px 56px' }}>
        {/* Top ticker */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: t3.mono, fontSize: 10, color: t3.inkMute, letterSpacing: '0.12em',
          padding: '10px 16px', background: t3.panel, border: `1px solid ${t3.border}`,
          marginBottom: 40,
        }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <span><span style={{color: t3.green}}>●</span> SYS:OK</span>
            <span style={{color: t3.cyan}}>TCACI.IO/v3</span>
            <span>LAT: 12ms</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <span>UPTIME <span style={{color: t3.ink}}>99.97%</span></span>
            <span>COMMITS·24H <span style={{color: t3.green}}>↑ 18</span></span>
            <span>BUILDS <span style={{color: t3.ink}}>PASS</span></span>
          </div>
        </div>

        {/* Hero with sparkline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, marginBottom: 56, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: t3.mono, fontSize: 11, color: t3.cyan, letterSpacing: '0.2em', marginBottom: 16 }}>
              ◢ ENGINEER · RESEARCHER · BUILDER
            </div>
            <h1 style={{
              fontSize: 120, lineHeight: 0.88, margin: '0 0 16px', fontWeight: 800,
              letterSpacing: '-0.045em',
              background: `linear-gradient(135deg, ${t3.ink} 0%, ${t3.cyan} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              CHRIS<br/>TCACI
            </h1>
            <div style={{ fontFamily: t3.mono, fontSize: 13, color: t3.inkDim, lineHeight: 1.6, maxWidth: 480 }}>
              Backend & platform engineer. Local-first dev tools, trust-first automation,
              and the occasional paper on cooperation emergence in n-agent systems.
            </div>
          </div>

          {/* Sparkline panel */}
          <div style={{ background: t3.panel, border: `1px solid ${t3.border}`, padding: 20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontFamily: t3.mono, fontSize: 10, color: t3.inkMute, letterSpacing: '0.1em', marginBottom: 8 }}>
              <span>OUTPUT · 12W</span>
              <span style={{color: t3.green}}>+28.4%</span>
            </div>
            <Sparkline color={t3.cyan}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${t3.border}`, fontFamily: t3.mono, fontSize: 10 }}>
              <Stat label="commits" value="3,144"/>
              <Stat label="pipelines" value="72"/>
              <Stat label="papers" value="01"/>
              <Stat label="systems" value="04"/>
            </div>
          </div>
        </div>

        {/* Palette */}
        <div style={{ display:'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8, marginBottom: 48 }}>
          {[
            ['void', t3.bg],
            ['deep', t3.bg2],
            ['panel', t3.panel],
            ['grid', t3.grid],
            ['ink', t3.ink],
            ['cyan', t3.cyan],
            ['green', t3.green],
            ['red', t3.red],
          ].map(([n, c]) => (
            <div key={n}>
              <div style={{ height: 60, background: c, border: `1px solid ${t3.border}` }}/>
              <div style={{ fontFamily: t3.mono, fontSize: 9, color: t3.inkDim, marginTop: 4, letterSpacing: '0.1em', textTransform:'uppercase' }}>{n}</div>
              <div style={{ fontFamily: t3.mono, fontSize: 9, color: t3.inkMute }}>{c}</div>
            </div>
          ))}
        </div>

        {/* Type */}
        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${t3.border}` }}>
          <div style={{ fontFamily: t3.mono, fontSize: 10, color: t3.inkMute, letterSpacing:'0.15em', marginBottom: 16 }}>◢ TYPE</div>
          <div style={{ fontFamily: t3.display, fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>
            Geist — display, headings
          </div>
          <div style={{ fontFamily: t3.mono, fontSize: 14, color: t3.cyan, lineHeight: 1.6 }}>
            Geist Mono — data, prompts, tickers, metadata.
          </div>
        </div>

        {/* Scorecards = trading-card style with mini chart */}
        <div style={{ fontFamily: t3.mono, fontSize: 10, color: t3.inkMute, letterSpacing:'0.15em', marginBottom: 16 }}>
          ◢ POSITIONS · LIVE
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          <Scorecard3 ticker="MTRX" name="Metrix" cat="Finance Platform"
            stack={['FastAPI','React 18','MySQL','ECharts']}
            metrics={[['commits','3.1k'],['team','5'],['stack','11']]}
            change="+building" tone="cyan"/>
          <Scorecard3 ticker="TSKD" name="Taskdeck" cat="Local-first Devtool"
            stack={['Vue 3','.NET 8','SQLite']}
            metrics={[['mode','offline'],['trust','proposal'],['ship','soon']]}
            change="active" tone="green"/>
        </div>

        {/* Badges = monitoring chips */}
        <div style={{ fontFamily: t3.mono, fontSize: 10, color: t3.inkMute, letterSpacing:'0.15em', marginBottom: 16 }}>
          ◢ ACTIVE INDICATORS
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap: 8 }}>
          <Chip3 label="GE_DIGITAL · 15mo" tone="cyan"/>
          <Chip3 label="DEVSECOPS · 72_PIPELINES" tone="green"/>
          <Chip3 label="RESEARCH · N-IPD" tone="amber"/>
          <Chip3 label="OUTREACH · DELIVERY" tone="cyan"/>
          <Chip3 label="FULLSTACK · BACKEND_HEAVY" tone="green"/>
          <Chip3 label="ARCHITECTURE · TESTING" tone="cyan"/>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ color }) {
  // generative spark
  const pts = [12, 18, 14, 22, 19, 28, 24, 32, 30, 38, 35, 42, 40, 48, 52, 47, 58, 55, 64, 60, 70, 68, 78, 74, 82];
  const max = Math.max(...pts), min = Math.min(...pts);
  const w = 360, h = 80;
  const path = pts.map((p,i) => {
    const x = (i / (pts.length-1)) * w;
    const y = h - ((p - min)/(max - min)) * h;
    return `${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const area = path + ` L${w},${h} L0,${h} Z`;
  return (
    <svg width="100%" height="80" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sg)"/>
      <path d={path} fill="none" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ color: t3.inkMute, letterSpacing:'0.1em' }}>{label.toUpperCase()}</div>
      <div style={{ color: t3.ink, fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function Scorecard3({ ticker, name, cat, stack, metrics, change, tone }) {
  const c = tone === 'cyan' ? t3.cyan : tone === 'green' ? t3.green : t3.amber;
  return (
    <div style={{
      background: t3.panel, border: `1px solid ${t3.border}`, padding: 20,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position:'absolute', top: 0, left: 0, width: 4, height: '100%', background: c,
      }}/>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 8 }}>
        <div style={{ fontFamily: t3.mono, fontSize: 10, color: t3.inkMute, letterSpacing:'0.15em' }}>$ {ticker}</div>
        <div style={{ fontFamily: t3.mono, fontSize: 10, color: c }}>● {change.toUpperCase()}</div>
      </div>
      <div style={{ fontFamily: t3.display, fontSize: 32, fontWeight: 700, letterSpacing:'-0.02em', marginBottom: 2 }}>{name}</div>
      <div style={{ fontFamily: t3.mono, fontSize: 11, color: t3.inkDim, marginBottom: 14 }}>{cat}</div>
      <Sparkline color={c}/>
      <div style={{ display:'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: t3.mono, fontSize: 10 }}>
        {metrics.map(([k,v]) => (
          <div key={k}>
            <div style={{ color: t3.inkMute, textTransform:'uppercase', letterSpacing:'0.1em' }}>{k}</div>
            <div style={{ color: t3.ink, fontWeight: 600 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${t3.border}`, display:'flex', flexWrap:'wrap', gap: 6 }}>
        {stack.map(s => (
          <span key={s} style={{ fontFamily: t3.mono, fontSize: 10, color: t3.inkDim, padding: '2px 7px', border: `1px solid ${t3.border}` }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function Chip3({ label, tone }) {
  const c = tone === 'cyan' ? t3.cyan : tone === 'green' ? t3.green : t3.amber;
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap: 8, padding: '5px 12px',
      background: t3.panel, border: `1px solid ${t3.border}`,
      fontFamily: t3.mono, fontSize: 10, color: t3.inkDim, letterSpacing: '0.1em',
    }}>
      <span style={{ width: 6, height: 6, background: c, boxShadow: `0 0 8px ${c}` }}/> {label}
    </div>
  );
}

/* =========================================================
   WOW FACTOR CONCEPTS — extra exploration card
   ========================================================= */
function WowConcepts() {
  return (
    <div style={{
      width: 1280, padding: 56, background: '#0a0a0a', color: '#e8e8e8',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ fontSize: 11, color: '#666', letterSpacing: '0.15em', marginBottom: 24 }}>
        // WOW-FACTOR IDEAS — pick & mix, regardless of direction chosen
      </div>
      <div style={{ display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {WOW_IDEAS.map((w, i) => (
          <div key={i} style={{
            background: '#111', border: '1px solid #222', padding: 20, position: 'relative',
          }}>
            <div style={{ fontSize: 10, color: '#7cf4b8', marginBottom: 10, letterSpacing:'0.15em' }}>WOW.{String(i+1).padStart(2,'0')}</div>
            <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{w.title}</div>
            <div style={{ fontSize: 11, color: '#999', lineHeight: 1.6 }}>{w.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const WOW_IDEAS = [
  { title: 'Live IPD board', body: 'Section on the prisoner\'s dilemma research that is itself a tiny live simulation. Two agents play, you can change strategies, watch cooperation emerge. The paper proves the point; the page demonstrates it.' },
  { title: 'Proposal-diff hero', body: 'Hero block styled as a Taskdeck proposal: "+ added: Cristian Tcaci" / "~ updated: portfolio v3" / [accept] [reject]. Clicking accept "applies" the page reveal. On-brand for trust-first.' },
  { title: 'Scorecards = trading cards', body: 'Each project has front/back. Front = ticker, sparkline, headline metrics. Back (on hover/flip) = architecture, tradeoffs, lessons. Aligns with Metrix theme.' },
  { title: 'Pipeline visualization', body: 'GE Digital case study renders as an actual CI pipeline — 72 nodes scrolling horizontally, scan stages light up green sequentially as you scroll. The −15%/−50% numbers tick up as the animation completes.' },
  { title: 'Terminal command palette', body: 'Cmd+K opens a real terminal-style palette: `cd projects/metrix`, `cat experience/ge`, `grep skills devsecops`. Power-user navigation that matches the philosophy.' },
  { title: 'Audit log footer', body: 'Footer styled as a system audit log — every section visit, every link click is "logged" inline. Reinforces auditability theme. Pure flavor, but memorable.' },
  { title: 'Live build status', body: 'Floating status pill: "● BUILD: PASSING · last commit 2h ago · 18 today" — pulled from GitHub via a static JSON or just hard-coded. Always-on signal of activity.' },
  { title: 'Strategy backtest demo', body: 'Metrix section has a tiny working backtest: pick MA crossover params with 2 sliders, sparkline updates. Demonstrates the product without the product.' },
  { title: 'Skill scorecards w/ radar', body: 'Skills section as a radar/spider chart with toggleable categories (Backend, DevOps, Security, Research, Delivery). Each axis labeled with concrete tools. More expressive than a tag soup.' },
  { title: 'Outreach dispatch', body: 'A section themed as a "field report" from a school visit — photos as polaroids, dates as filed entries, audience-size stats. Treats public speaking like real work, which it is.' },
  { title: 'Architecture sketch mode', body: 'Each project case study has a hand-drawn-feeling architecture diagram (SVG, blueprint style). Hover any node → annotation pops out. Reinforces the "architecture-first" pitch.' },
  { title: 'Boot sequence', body: 'First-load animation is a fake boot sequence — "loading kernel… mounting projects… initializing identity…" before the page resolves. Skippable. Sets the tone in <2s.' },
];

/* =========================================================
   CANVAS
   ========================================================= */
function App() {
  return (
    <DesignCanvas title="Chris Tcaci — Portfolio · Aesthetic Directions"
      subtitle="Three style tiles + a wow-factor menu. React with what speaks to you and we'll build from there.">
      <DCSection id="directions" title="Three Aesthetic Directions" subtitle="Each shows palette, type, hero, scorecard, and badges in that direction's voice.">
        <DCArtboard id="d1" label="01 · Terminal / Engineering Log" width={1280} height={1180}>
          <Direction1/>
        </DCArtboard>
        <DCArtboard id="d2" label="02 · Editorial / Research Paper" width={1280} height={1380}>
          <Direction2/>
        </DCArtboard>
        <DCArtboard id="d3" label="03 · Trading Terminal / Blueprint" width={1280} height={1340}>
          <Direction3/>
        </DCArtboard>
      </DCSection>
      <DCSection id="wow" title="Wow-Factor Menu" subtitle="A dozen ideas — orthogonal to the direction. Pick the ones that excite you.">
        <DCArtboard id="wow-grid" label="Wow ideas — 12 concepts" width={1280} height={620}>
          <WowConcepts/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
