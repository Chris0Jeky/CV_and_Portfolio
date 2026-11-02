/* global React, Fn */
const { useState, useEffect, useRef } = React;

// Hero = a "proposal diff" the visitor accepts to publish the issue.
// On accept: ink reveal, page becomes live.

window.Hero = function Hero({ onAccept }) {
  const [state, setState] = useState('pending'); // pending | accepted | rejected
  const [hovering, setHovering] = useState(null);

  useEffect(() => {
    if (state === 'accepted') {
      const t = setTimeout(() => onAccept && onAccept(), 600);
      return () => clearTimeout(t);
    }
  }, [state]);

  return (
    <section style={{ paddingTop: 56, paddingBottom: 64, position: 'relative' }}>
      <div className="container">
        {/* Top kicker */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div className="label" style={{ color: 'var(--rouge)' }}>
            ✦ SOFTWARE ENGINEER · LONDON
          </div>
          <div className="label">PROPOSED CHANGE · pending review</div>
        </div>

        {/* Hero grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Left: name + lede */}
          <div style={{ position: 'relative' }}>
            <h1 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(80px, 12vw, 168px)',
              margin: '0 0 8px', fontWeight: 400, letterSpacing: '-0.045em', lineHeight: 0.82,
            }}>
              Cristian
            </h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 28 }}>
              <em style={{
                fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 92px)',
                fontWeight: 300, color: 'var(--rouge)', letterSpacing: '-0.02em', lineHeight: 1,
              }}>
                "Chris"
              </em>
              <span style={{
                fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 92px)',
                fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1,
              }}>
                Tcaci.
              </span>
              <span className="hand" style={{ alignSelf: 'flex-end', marginBottom: 12 }}>
                ← rhymes w/ "lychee"
              </span>
            </div>

            <p style={{
              fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.5, maxWidth: 580,
              margin: '0 0 28px', color: 'var(--ink-2)',
            }}>
              Software engineer working on <em style={{ color: 'var(--rouge)' }}>data
              pipelines, platforms and developer tooling</em>. At{' '}
              <strong>Metricalgo</strong>, an options analytics platform, I built the{' '}
              <em style={{ color: 'var(--teal)' }}>AI research assistant</em> for the closed
              beta. At <strong>Middlesex University</strong> I built the outreach team's
              reporting and data pipelines.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <a className="btn btn-rouge" href="#experience">▷ Experience</a>
              <a className="btn" href="#projects">▷ Selected work</a>
              <a className="btn" href="#contact">✉ Get in touch</a>
            </div>
          </div>

          {/* Right: proposal diff card */}
          <ProposalCard state={state} setState={setState} />
        </div>

        {/* Ticker / acceptance line */}
        <div style={{
          marginTop: 56, paddingTop: 16,
          borderTop: '1px solid var(--rule)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--ink-dim)',
        }}>
          <span>
            <span style={{ color: state === 'accepted' ? 'var(--forest)' : 'var(--gold)' }}>●</span>
            {' '}STATUS: {state === 'accepted' ? 'PUBLISHED' : state === 'rejected' ? 'WITHDRAWN' : 'AWAITING REVIEW'}
          </span>
          <span>DATA PIPELINES · PLATFORMS · DEVELOPER TOOLING · AI ASSISTANTS</span>
          <span>LONDON, UK</span>
        </div>
      </div>
    </section>
  );
};

function ProposalCard({ state, setState }) {
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1.5px solid var(--rule)',
      boxShadow: '6px 6px 0 var(--rouge)',
      padding: 0, position: 'relative',
      transform: state === 'accepted' ? 'translate(2px, 2px)' : 'translate(0,0)',
      transition: 'transform 0.3s',
    }}>
      {/* Header bar like a code review */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 16px', borderBottom: '1px solid var(--rule)',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)',
      }}>
        <span>
          <span style={{ color: 'var(--rouge)' }}>●</span> proposal #043
          <span style={{ marginLeft: 12, color: 'var(--ink-mute)' }}>main ← portfolio/v4</span>
        </span>
        <span style={{ color: 'var(--ink-mute)' }}>+14 −1</span>
      </div>

      {/* Diff body */}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.7,
        padding: '14px 0', color: 'var(--ink-2)' }}>
        <DiffLine kind="meta">@@ identity.yml @@</DiffLine>
        <DiffLine kind="del">- title: "Backend · Platform · Civic Data"</DiffLine>
        <DiffLine kind="add">+ title: "Software Engineer"</DiffLine>
        <DiffLine kind="add">+ education: "BSc CS · First Class · Middlesex 2025"</DiffLine>
        <DiffLine kind="add">+ published: "Springer · SGAI-AI 2025 · lead author"</DiffLine>
        <DiffLine kind="add">+ focus: "data pipelines · platforms · tooling"</DiffLine>
        <DiffLine> </DiffLine>
        <DiffLine kind="meta">@@ now.yml @@</DiffLine>
        <DiffLine kind="add">+ work:</DiffLine>
        <DiffLine kind="add">+   - metricalgo   # AI research assistant</DiffLine>
        <DiffLine kind="add">+   - middlesex    # reporting pipelines</DiffLine>
        <DiffLine kind="add">+   - deliverasoft # contract work</DiffLine>
        <DiffLine kind="add">+ building:</DiffLine>
        <DiffLine kind="add">+   - taskdeck     # work platform · v0.3.0</DiffLine>
        <DiffLine kind="add">+   - navsentinel  # browser security</DiffLine>
        <DiffLine kind="add">+   - local-asset-studio</DiffLine>
      </div>

      {/* Action footer */}
      <div style={{
        borderTop: '1px solid var(--rule)', padding: '14px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--paper-3)',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
          {state === 'pending' && 'Reviewable · safe to apply'}
          {state === 'accepted' && <span style={{color: 'var(--forest)'}}>✓ applied · merged into main</span>}
          {state === 'rejected' && <span style={{color: 'var(--rouge)'}}>✗ withdrawn · try again?</span>}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" style={{ padding: '6px 12px', fontSize: 11 }}
            onClick={() => setState('rejected')} disabled={state === 'accepted'}>
            ✗ Reject
          </button>
          <button className="btn btn-rouge" style={{
            padding: '6px 12px', fontSize: 11,
            background: state === 'accepted' ? 'var(--rouge)' : 'transparent',
            color: state === 'accepted' ? 'var(--paper)' : 'var(--rouge)',
          }} onClick={() => setState('accepted')} disabled={state === 'accepted'}>
            ✓ {state === 'accepted' ? 'Applied' : 'Accept & publish'}
          </button>
        </div>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 12,
        fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
        Fig. 1 — proposal-first interaction · à la Taskdeck
      </div>
    </div>
  );
}

function DiffLine({ kind = 'ctx', children }) {
  const colors = {
    add: { bg: 'rgba(26, 77, 58, 0.08)', mark: '+', color: 'var(--forest)' },
    del: { bg: 'rgba(204, 58, 46, 0.08)', mark: '−', color: 'var(--rouge)' },
    meta: { bg: 'transparent', mark: ' ', color: 'var(--ink-mute)' },
    ctx: { bg: 'transparent', mark: ' ', color: 'var(--ink-dim)' },
  }[kind];
  return (
    <div style={{ background: colors.bg, padding: '0 16px', display: 'flex', gap: 12 }}>
      <span style={{ color: colors.color, width: 10 }}>{colors.mark}</span>
      <span style={{ color: kind === 'meta' ? colors.color : undefined }}>{children}</span>
    </div>
  );
}
