/* global React */
const { useState } = React;

window.Credentials = function Credentials() {
  return (
    <section id="credentials" style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeader num="02.5" kicker="Filed for the record" title="Education & publications."/>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
          border: '1.5px solid var(--rule)', background: 'var(--paper-2)' }}>

          {/* Education */}
          <div style={{ padding: 32, borderRight: '1px solid var(--rule)' }}>
            <div className="label" style={{ marginBottom: 14 }}>Diploma · filed</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--rouge)', letterSpacing: '0.15em', marginBottom: 4 }}>EDUCATION</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 8px',
              fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              BSc Computer Science
            </h3>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--rouge)', marginBottom: 8 }}>
              First Class Honours
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>
              Middlesex University · 2022 — 2025
            </div>
            <div style={{ marginTop: 18 }}>
              <span className="stamp" style={{ color: 'var(--forest)' }}>1st Class</span>
            </div>
          </div>

          {/* Publication */}
          <div style={{ padding: 32, borderRight: '1px solid var(--rule)', position: 'relative' }}>
            <div className="label" style={{ marginBottom: 14 }}>In press · indexed</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--rouge)', letterSpacing: '0.15em', marginBottom: 4 }}>PUBLICATION</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, margin: '0 0 8px',
              fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              "Navigating the N-Person Prisoners' Dilemma"
            </h3>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-dim)', lineHeight: 1.55, marginBottom: 8 }}>
              <strong>Springer</strong> · SGAI-AI 2025 · Lead author · presented at conference
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5, fontStyle: 'italic' }}>
              Multi-agent simulation of cooperation emergence in repeated games.
            </div>
            <div style={{ marginTop: 18 }}>
              <span className="stamp" style={{ color: 'var(--gold)' }}>Published</span>
            </div>
          </div>

          {/* Award */}
          <div style={{ padding: 32 }}>
            <div className="label" style={{ marginBottom: 14 }}>Citation · industry</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--rouge)', letterSpacing: '0.15em', marginBottom: 4 }}>AWARD</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 8px',
              fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              GE Spotlight Award
            </h3>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--rouge)', marginBottom: 8 }}>
              DevSecOps Initiative
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>
              General Electric Digital · 2024
            </div>
            <div style={{ marginTop: 18 }}>
              <span className="stamp">2024 · GE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
