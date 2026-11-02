/* global React, Fn */
const { useState, useEffect, useRef } = React;

window.About = function About() {
  return (
    <section id="about" style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeader num="01" kicker="About" title="A note from Chris."/>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* Letter body */}
          <div>
            <p className="dropcap" style={{ fontSize: 19, lineHeight: 1.65, marginTop: 0 }}>
              Hello. I'm Chris, a software engineer in London. I prefer backends you can
              reason about, pipelines that fail loudly, and tools that do <em>nothing</em>{' '}
              until you tell them to. If a system surprises you, it's probably broken.
            </p>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              Right now my work splits three ways:
            </p>

            <ul style={{ fontSize: 16.5, lineHeight: 1.7, color: 'var(--ink-2)', paddingLeft: 22 }}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{color:'var(--rouge)'}}>Metricalgo</strong> — software
                engineer on an options analytics platform in closed beta. I built the{' '}
                <strong>AI research assistant</strong>: the model sees only a summary of
                backtests the user can see, every tool call is schema-checked and recorded,
                and credit is reserved before any provider call. I also work on the backtest
                engine's data path and its correctness checks.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{color:'var(--forest)'}}>Middlesex University</strong> — UK
                Recruitment &amp; Outreach Coordinator, full-time since April 2026. I built the
                reporting chain behind the team's regular reporting pack, and I'm replacing a
                hand-typed workbook with a SharePoint List and a Python sync engine over
                Microsoft Graph. I also plan and deliver talks, workshops and campus events.
              </li>
              <li>
                <strong style={{color:'var(--teal)'}}>Independent R&amp;D</strong> — evenings
                and weekends: a development pipeline that takes a task from an issue to a
                merged pull request behind a plain-Python merge gate, plus{' '}
                <strong>Taskdeck</strong>, <strong>NavSentinel</strong> and
                local-asset-studio. I also take contract work through{' '}
                <strong>DeliveraSoft</strong> for small-business clients.
              </li>
            </ul>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              Before that, I spent fourteen months at <strong>GE Digital</strong> as a
              software engineer intern. On the Smallworld product I fixed hard-to-reproduce
              bugs in a large legacy Magik codebase, and received a GE Spotlight Award,
              "Deliver with Focus", for my part in the team's December 2023 release. I then
              took over a security automation project: Nmap port checks on the Jenkins
              pipelines that deploy to AWS, across <strong>72 products</strong> and about 140
              pipelines.
            </p>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              I also do research. My paper on the N-Person Prisoners' Dilemma,{' '}
              <em>"Navigating the N-Person Prisoners' Dilemma: From the Tragic Valley to the
              Collaborative Hill"</em>, was published by Springer in the SGAI-AI 2025
              proceedings. I'm the lead author and presented it at the conference. It asks a
              question I keep asking of software: under what conditions does cooperation
              emerge, and what happens when one agent defects?
            </p>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              I have a First Class BSc (Hons) in Computer Science with Industrial Placement
              from Middlesex University (2025). I speak English and Italian fluently, and
              Romanian is my native language.
            </p>

            <div style={{ marginTop: 32, fontFamily: 'var(--hand)', color: 'var(--rouge)', fontSize: 30, lineHeight: 1 }}>
              — Chris
            </div>
            <div className="label" style={{ marginTop: 4 }}>London</div>
          </div>

          {/* Sidebar: opinions */}
          <Sidebar/>
        </div>
      </div>
    </section>
  );
};

function Sidebar() {
  const opinions = [
    "AI assistance should be a proposal, not a commit.",
    "If you can't roll it back, you didn't ship it — you launched it.",
    "Local-first beats cloud-first whenever latency or privacy is on the line.",
    "The best CI pipeline fails early, with a useful error message.",
    "Tests are documentation that fails when it goes stale.",
    "If your audit log has gaps, you don't have an audit log.",
    "If a number doesn't cite its source, it's a guess in a nice font.",
  ];
  return (
    <aside>
      {/* Opinions box */}
      <div style={{
        border: '1.5px solid var(--rule)', padding: 24, background: 'var(--paper-2)',
        boxShadow: '4px 4px 0 var(--ink)', marginBottom: 32,
      }}>
        <div className="label" style={{ marginBottom: 4 }}>Sidebar · principles</div>
        <h3 style={{
          fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 16px',
          fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05,
        }}>
          How I <em style={{color: 'var(--rouge)'}}>work</em>.
        </h3>
        <ol style={{ margin: 0, paddingLeft: 20, fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          {opinions.map((o, i) => (
            <li key={i} style={{ marginBottom: 8 }}>{o}</li>
          ))}
        </ol>
      </div>

      {/* Quick facts */}
      <div className="term">
        <span className="term-label">$ whoami --verbose</span>
        <div><span className="prompt">▸</span> name <span className="dim">=</span> "Cristian Tcaci"</div>
        <div><span className="prompt">▸</span> aka <span className="dim">=</span> "Chris"</div>
        <div><span className="prompt">▸</span> role <span className="dim">=</span> "software engineer"</div>
        <div><span className="prompt">▸</span> focus <span className="dim">=</span> "data pipelines · platforms · developer tooling"</div>
        <div><span className="prompt">▸</span> region <span className="dim">=</span> "GB-LDN"</div>
        <div><span className="prompt">▸</span> languages <span className="dim">=</span> <span className="ok">"en, it (fluent) · ro (native)"</span></div>
        <div><span className="prompt">▸</span> automation <span className="dim">=</span> <span className="ok">"proposal-first"</span></div>
        <div><span className="prompt">▸</span> stance <span className="dim">=</span> <span className="cyan">"local-first"</span></div>
      </div>
    </aside>
  );
}
