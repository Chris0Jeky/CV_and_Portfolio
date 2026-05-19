/* global React */
const { useState, useEffect } = React;

window.Contact = function Contact() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard?.writeText('Jeky.tck@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section id="contact" style={{ padding: '64px 0 32px' }}>
      <div className="container">
        <SectionHeader num="05" kicker="Correspondence" title="Send a letter."/>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56 }}>
          <div>
            <p style={{ fontSize: 19, lineHeight: 1.6, marginTop: 0 }}>
              The fastest way to reach me is email. I read everything; I reply to most.
              Hiring managers, collaborators, journalists curious about WealthLens, and
              fellow lurkers in the audit log — all welcome.
            </p>

            <div style={{ marginTop: 32 }}>
              <a className="btn btn-rouge" onClick={copyEmail} style={{ cursor: 'pointer' }}>
                ✉ {copied ? 'Copied to clipboard' : 'Jeky.tck@gmail.com'}
              </a>
            </div>

            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ContactRow label="GitHub" value="github.com/Chris0Jeky" href="https://github.com/Chris0Jeky"/>
              <ContactRow label="LinkedIn" value="linkedin.com/in/cristian-tcaci" href="#"/>
              <ContactRow label="Repo · WealthLens" value="github.com/Chris0Jeky/wealthlens-hq" href="https://github.com/Chris0Jeky/wealthlens-hq"/>
              <ContactRow label="Repo · Taskdeck" value="github.com/Chris0Jeky/Taskdeck" href="https://github.com/Chris0Jeky/Taskdeck"/>
              <ContactRow label="Repo · NPDL" value="github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation" href="https://github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation"/>
              <ContactRow label="Repo · NavSentinel" value="github.com/Chris0Jeky/NavSentinel" href="https://github.com/Chris0Jeky/NavSentinel"/>
            </div>

            <div className="hand" style={{
              marginTop: 40, fontSize: 28, lineHeight: 1.2, maxWidth: 360,
            }}>
              p.s. — if you've read this far, mention "audit log" in your subject line.<br/>it'll make my week.
            </div>
          </div>

          <aside>
            {/* Looking for box */}
            <div style={{
              border: '1.5px solid var(--rule)', padding: 22, background: 'var(--paper-2)',
              boxShadow: '4px 4px 0 var(--teal)', marginBottom: 24,
            }}>
              <div className="label" style={{ marginBottom: 4 }}>Cards on the table</div>
              <h3 style={{
                fontFamily: 'var(--serif)', fontSize: 26, margin: '0 0 12px',
                fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05,
              }}>
                What I'm actually <em style={{color:'var(--teal)'}}>looking for</em>.
              </h3>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Backend / platform roles</strong> where reliability, security,
                  and architecture are the deliverable, not the afterthought. Bonus points
                  for legacy systems with adults in the room.
                </p>
                <p style={{ margin: '0 0 10px' }}>
                  <strong>Civic-tech collaborators</strong> on inequality, housing, public
                  finance, or anything else where citation hygiene is non-negotiable.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Speakers' lists</strong> for talks on local-first software,
                  trust-first automation, or the (recurring) idea that AI assistance
                  should be a proposal, not a commit.
                </p>
              </div>
            </div>

            <div className="term">
              <span className="term-label">$ ./reach-out --form</span>
              <div><span className="prompt">▸</span> if you are <span className="cyan">recruiting</span>: role + stack + remote-or-not. skip the cover letter.</div>
              <div><span className="prompt">▸</span> if you are <span className="cyan">collaborating</span>: link the repo, name the bottleneck.</div>
              <div><span className="prompt">▸</span> if you are a <span className="cyan">journalist or researcher</span>: the data is open, the charts are embeddable, tell me what's missing.</div>
              <div><span className="prompt">▸</span> if you care about <span className="cyan">inequality data</span>: collaborators, not followers.</div>
              <div><span className="prompt">▸</span> if you are a <span className="cyan">student</span>: yes you can ask. yes i'll reply.</div>
              <div><span className="prompt">▸</span> if you are an <span className="warn">autopilot</span>: please disclose. human reviewers go first.</div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--term-mute)' }}>
                <span className="dim">// expected reply: 24-48h on weekdays. faster if you mention an audit log.</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

function ContactRow({ label, value, href }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={{
      display: 'grid', gridTemplateColumns: '120px 1fr 30px', gap: 16,
      padding: '12px 0', borderTop: '1px solid var(--rule)',
      alignItems: 'baseline', textDecoration: 'none',
    }}>
      <span className="label">{label}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-2)' }}>{value}</span>
      <span style={{ fontFamily: 'var(--mono)', textAlign: 'right', color: 'var(--rouge)' }}>↗</span>
    </a>
  );
}

window.Colophon = function Colophon() {
  const [logs, setLogs] = useState([]);
  const logsRef = useRef([]);

  function push(t, m) {
    const stamp = new Date().toTimeString().slice(0,8);
    logsRef.current = [...logsRef.current.slice(-13), { t, m, stamp }];
    setLogs(logsRef.current);
  }

  useEffect(() => {
    // Initial boot sequence
    push('boot', 'tcaci.io v5 mounted · paper: ok · ink: ok');
    push('ok',   'fonts loaded (newsreader, ibm plex, caveat)');
    push('ok',   'no third-party trackers detected');
    push('ok',   'wealthlens data pipeline: 10/10 datasets fresh');
    push('info', 'visitor: anonymous · respect: assumed');

    // Track section visibility
    const seen = new Set();
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !seen.has(e.target.id)) {
          seen.add(e.target.id);
          push('nav', `scrolled into · §${e.target.id}`);
        }
      });
    }, { threshold: 0.45 });
    sections.forEach(s => obs.observe(s));

    // Track hash navigation (from command palette / nav links)
    function onHash() {
      if (location.hash) push('nav', `jumped to · ${location.hash}`);
    }
    window.addEventListener('hashchange', onHash);

    // Track footnote hovers
    function onFootnoteClick(e) {
      const fn = e.target.closest('.fn');
      if (fn) push('hover', `footnote · [${fn.textContent}] · expanded`);
    }
    document.addEventListener('click', onFootnoteClick);

    // Track command palette open
    function onKey(e) {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        push('cmd', '⌘K · command palette opened');
      }
    }
    window.addEventListener('keydown', onKey);

    // Track external link clicks
    function onLinkClick(e) {
      const a = e.target.closest('a[href^="http"]');
      if (a && a.target === '_blank') {
        const url = new URL(a.href);
        push('link', `outbound · ${url.hostname}${url.pathname.slice(0, 28)}`);
      }
    }
    document.addEventListener('click', onLinkClick);

    return () => {
      obs.disconnect();
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onFootnoteClick);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onLinkClick);
    };
  }, []);

  return (
    <footer style={{ padding: '48px 0 32px', borderTop: '2px solid var(--rule)', marginTop: 40 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginBottom: 32 }}>
          <div>
            <div className="label" style={{ marginBottom: 12 }}>Colophon</div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-dim)', marginTop: 0 }}>
              Set in <em>Newsreader</em> for body and display, <em>IBM Plex Sans</em> for chrome
              and labels, <em>IBM Plex Mono</em> for code and engineering inserts, and <em>Caveat</em>
              for the marginalia. Printed in cream, struck through with editorial red. Designed,
              written, and quietly second-guessed by the editor.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-dim)' }}>
              No tracking. No autoplay. No popups. The audit log on the right is local-only —
              it lives in your tab and dies with it. If something is annoying, that's on me.
            </p>
          </div>

          <div className="term">
            <span className="term-label">$ tail -f /var/log/visit.log</span>
            {logs.map((l, i) => {
              const c = l.t === 'ok' ? 'ok' : l.t === 'info' ? 'cyan' : l.t === 'nav' ? 'cyan' : l.t === 'link' ? 'warn' : l.t === 'cmd' ? 'ok' : l.t === 'hover' ? 'dim' : 'warn';
              return (
                <div key={i}><span className="dim">[{l.stamp}]</span> <span className={c}>{l.t.padEnd(5)}</span> {l.m}</div>
              );
            })}
            <div style={{ marginTop: 8, color: 'var(--term-mute)' }}>
              <span className="blink">▌</span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', paddingTop: 12,
          borderTop: '1px solid var(--rule)',
          fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--ink-mute)',
        }}>
          <span>© MMXXVI · The Tcaci Quarterly · all proposals reviewable</span>
          <span>signed off by ▢▢ at {new Date().toISOString().slice(0,10)}</span>
          <span>fin.</span>
        </div>
      </div>
    </footer>
  );
};
