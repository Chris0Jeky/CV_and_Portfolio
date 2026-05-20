/* global React, ReactDOM, Masthead, Hero, About, Experience, ByTheNumbers, Credentials, Projects, Skills, Contact, Colophon, CommandPalette, DoomEasterEgg */
const { useState, useEffect, useRef } = React;

function Nav() {
  function openMobileNav() {
    document.getElementById('mobile-nav').classList.add('is-open');
  }
  return (
    <div className="navbar">
      <div className="nav-inner">
        <a href="#top" style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500,
          letterSpacing: '-0.01em', textTransform: 'none', textDecoration: 'none' }}>
          C. Tcaci <span style={{ color: 'var(--rouge)', fontStyle: 'italic' }}>— quarterly</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <span style={{ color: 'var(--ink-dim)' }}>
          <span style={{ color: 'var(--forest)' }} className="pulse">●</span> open to work
        </span>
        <button className="mobile-menu-btn" onClick={openMobileNav} aria-label="Menu">☰</button>
      </div>
    </div>
  );
}

// Konami easter egg — flashes "PRESS RUN" and inverts.
function useKonami(onTrigger) {
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let i = 0;
    function onKey(e) {
      const k = e.key;
      if (k === seq[i] || k.toLowerCase() === seq[i]) {
        i++;
        if (i === seq.length) { onTrigger(); i = 0; }
      } else { i = 0; }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onTrigger]);
}

function App() {
  const [printMode, setPrintMode] = useState(false);
  useKonami(() => {
    setPrintMode(true);
    setTimeout(() => setPrintMode(false), 2400);
  });

  return (
    <div id="top" style={{
      filter: printMode ? 'invert(1) hue-rotate(180deg)' : 'none',
      transition: 'filter 0.4s',
    }}>
      {printMode && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.05)',
        }}>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: 120, fontWeight: 400,
            color: 'var(--rouge)', letterSpacing: '-0.04em',
            animation: 'shake 0.15s linear infinite',
          }}>
            ★ PRESS RUN ★
          </div>
        </div>
      )}
      <Nav/>
      <CommandPalette/>
      <DoomEasterEgg/>
      <Masthead/>
      <Hero/>
      <About/>
      <Experience/>
      <ByTheNumbers/>
      <Credentials/>
      <Projects/>
      <Skills/>
      <Contact/>
      <Colophon/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
