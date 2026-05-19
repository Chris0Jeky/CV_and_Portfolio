/* global React, Fn */
const { useState, useEffect, useRef } = React;

window.About = function About() {
  return (
    <section id="about" style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeader num="01" kicker="Letter from the Editor" title="A note from Chris."/>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'start' }}>
          {/* Letter body */}
          <div>
            <p className="dropcap" style={{ fontSize: 19, lineHeight: 1.65, marginTop: 0 }}>
              Hello. I'm Chris. I write software for a living and a bit too much for fun.
              I prefer backends you can reason about, pipelines that fail loudly, and tools
              that do <em>nothing</em> until you tell them to. If a system surprises you,
              it's probably broken. If it's quiet, it's probably working
              <Fn n="2">Or it's deadlocked. Both look identical from the outside, which is roughly the entire job.</Fn>
              .
            </p>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              For the past stretch I've been building three things, each of which
              picks a different fight:
            </p>

            <ul style={{ fontSize: 16.5, lineHeight: 1.7, color: 'var(--ink-2)', paddingLeft: 22 }}>
              <li style={{ marginBottom: 8 }}>
                <strong style={{color:'var(--teal)'}}>WealthLens</strong> — an
                open-source platform that pulls UK wealth and inequality data from ONS,
                HMRC, the Bank of England, DWP and the World Inequality Database, and
                turns it into cited, embeddable chart pages. Ten datasets, ten
                automated pipelines, <strong>874 passing tests</strong>, and a stubborn
                refusal to publish a number without a URL next to it.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong style={{color:'var(--forest)'}}>Taskdeck</strong> — a
                local-first task board where every automation lands as a
                <em> proposal</em> you accept or reject. No silent mutations.
                No surprise cards. Roughly
                <strong> 5,300+ commits</strong>, <strong>620+ PRs</strong> and 30 CI workflows of stubbornness
                about who's actually in charge of your board.
              </li>
              <li>
                <strong style={{color:'var(--rouge)'}}>Metrix</strong> — a much
                larger options-backtesting and signal platform built with a small
                team. About <strong>3,144 commits</strong> of opinions about
                how backtests should actually work, plus a Phase-10 LLM assistant
                that does tool orchestration without pretending it's a person.
              </li>
            </ul>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              Before all that, I spent fifteen months at <strong>GE Digital</strong>
              {' '}integrating automated security scanning into about{' '}
              <strong>seventy-two AWS CI/CD pipelines</strong>. Those numbers
              sound dry on paper
              <Fn n="3">"Cut deploy friction by 15%" reads better on a CV than in person, where it usually translates to "stopped Jenkins from yelling at us at 3am."</Fn>
              {' '}— but they were the kind of work I most enjoy: legacy systems,
              real consequences, and a measurable thing you can point at when it's done.
              They gave me a Spotlight Award. I gave them their evenings back.
            </p>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              I also do research. My paper on the N-person Prisoner's Dilemma —
              <em> published in Springer proceedings at SGAI-AI 2025</em>, lead author,
              presented at conference — is a multi-agent simulation framework with
              <strong> twelve-plus strategies</strong> across five network topologies
              and an evolutionary scenario generator that ranks results by an
              <em> "interestingness score."</em> It asks the same question I keep
              asking software: under what conditions does cooperation emerge, and what
              happens when one agent goes rogue? It's also the question behind
              WealthLens: make the cost of defection visible to everyone.
            </p>

            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>
              On the side: I work with <strong>Middlesex University</strong>'s
              Widening Participation team on outreach delivery and data analysis —
              schools, on-campus sessions, open days, and whichever audience will
              tolerate a 9am talk about computer science. I have a First Class BSc in
              Computer Science from Middlesex (2025), an irrational fondness for
              keyboard-first workflows, and strong opinions about the word "agent."
            </p>

            <div style={{ marginTop: 32, fontFamily: 'var(--hand)', color: 'var(--rouge)', fontSize: 30, lineHeight: 1 }}>
              — Chris
            </div>
            <div className="label" style={{ marginTop: 4 }}>filed from London</div>
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
    "Local-first beats cloud-first whenever latency, privacy, or your own dignity is on the line.",
    "The best CI pipeline is the one that fails before lunch, with a useful error message.",
    "Most \"microservices\" are a distributed monolith with a worse on-call rota.",
    "Tests are documentation that yells at you. Write the documentation.",
    "If your audit log has gaps, you don't have an audit log. You have a diary.",
    "If your data doesn't cite its source, it's not data. It's a guess in a nice font.",
    "\"Agent\" is doing a lot of marketing work for software that is mostly a for-loop.",
  ];
  return (
    <aside>
      {/* Opinions box */}
      <div style={{
        border: '1.5px solid var(--rule)', padding: 24, background: 'var(--paper-2)',
        boxShadow: '4px 4px 0 var(--ink)', marginBottom: 32,
      }}>
        <div className="label" style={{ marginBottom: 4 }}>Sidebar · op-ed</div>
        <h3 style={{
          fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 16px',
          fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05,
        }}>
          Hills I will <em style={{color: 'var(--rouge)'}}>die on</em>.
        </h3>
        <ol style={{ margin: 0, paddingLeft: 20, fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          {opinions.map((o, i) => (
            <li key={i} style={{ marginBottom: 8 }}>{o}</li>
          ))}
        </ol>
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed var(--rule)',
          fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          The editor reserves the right to retract any of these by Q3.
        </div>
      </div>

      {/* Errata */}
      <div style={{ border: '1px solid var(--rule)', padding: 20 }}>
        <div className="label" style={{ marginBottom: 12 }}>Errata · prior issues</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.7, color: 'var(--ink-dim)' }}>
          <div><span style={{color:'var(--rouge)'}}>2021:</span> believed in "clean code" as a moral system. retracted.</div>
          <div><span style={{color:'var(--rouge)'}}>2022:</span> claimed microservices were inevitable. apologised to a monolith.</div>
          <div><span style={{color:'var(--rouge)'}}>2023:</span> shipped without a rollback path. would not recommend.</div>
          <div><span style={{color:'var(--rouge)'}}>2024:</span> said "we'll add tests later." tests were not added later.</div>
          <div><span style={{color:'var(--forest)'}}>2025:</span> finally added the tests. 874 of them.</div>
          <div><span style={{color:'var(--teal)'}}>2026:</span> started an inequality dashboard. accidentally made it a mission.</div>
        </div>
      </div>

      {/* Quick facts */}
      <div className="term" style={{ marginTop: 32 }}>
        <span className="term-label">$ whoami --verbose</span>
        <div><span className="prompt">▸</span> name <span className="dim">=</span> "Cristian Tcaci"</div>
        <div><span className="prompt">▸</span> aka <span className="dim">=</span> "Chris"</div>
        <div><span className="prompt">▸</span> role <span className="dim">=</span> "backend / platform / civic data"</div>
        <div><span className="prompt">▸</span> region <span className="dim">=</span> "GB-LDN"</div>
        <div><span className="prompt">▸</span> stance <span className="dim">=</span> <span className="ok">"local-first"</span></div>
        <div><span className="prompt">▸</span> automation <span className="dim">=</span> <span className="ok">"trust-first"</span></div>
        <div><span className="prompt">▸</span> mission <span className="dim">=</span> <span className="cyan">"civic-data"</span></div>
        <div><span className="prompt">▸</span> editor <span className="dim">=</span> <span className="warn">"jetbrains · vim bindings, obviously"</span></div>
        <div><span className="prompt">▸</span> mood <span className="dim">=</span> <span className="warn">"shipping"</span></div>
        <div><span className="prompt">▸</span> coffee <span className="dim">=</span> <span className="err">"depleted"</span></div>
      </div>
    </aside>
  );
}
