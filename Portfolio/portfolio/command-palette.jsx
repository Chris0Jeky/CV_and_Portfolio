/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ⌘K / Ctrl+K command palette — fits the keyboard-first ethos.
window.CommandPalette = function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  const COMMANDS = useMemo(() => [
    // Navigation
    { kind: 'nav', label: 'go to · about', hint: '§01', action: () => location.hash = '#about' },
    { kind: 'nav', label: 'go to · experience', hint: '§02', action: () => location.hash = '#experience' },
    { kind: 'nav', label: 'go to · credentials', hint: '§02.5', action: () => location.hash = '#credentials' },
    { kind: 'nav', label: 'go to · projects', hint: '§03', action: () => location.hash = '#projects' },
    { kind: 'nav', label: 'go to · skills', hint: '§04', action: () => location.hash = '#skills' },
    { kind: 'nav', label: 'go to · contact', hint: '§05', action: () => location.hash = '#contact' },
    // Projects
    { kind: 'open', label: 'open · wealthlens repo', hint: 'github', action: () => window.open('https://github.com/Chris0Jeky/wealthlens-hq', '_blank') },
    { kind: 'open', label: 'open · wealthlens live site', hint: 'pages', action: () => window.open('https://chris0jeky.github.io/wealthlens-hq/', '_blank') },
    { kind: 'open', label: 'open · taskdeck repo', hint: 'github', action: () => window.open('https://github.com/Chris0Jeky/Taskdeck', '_blank') },
    { kind: 'open', label: 'open · NPDL repo', hint: 'github', action: () => window.open('https://github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation', '_blank') },
    { kind: 'open', label: 'open · navsentinel repo', hint: 'github', action: () => window.open('https://github.com/Chris0Jeky/NavSentinel', '_blank') },
    { kind: 'open', label: 'open · github profile', hint: 'github', action: () => window.open('https://github.com/Chris0Jeky', '_blank') },
    // Commands
    { kind: 'cmd', label: 'whoami', hint: '$ identity', action: () => { location.hash = '#about'; } },
    { kind: 'cmd', label: 'cat hills.md', hint: 'opinions', action: () => location.hash = '#about' },
    { kind: 'cmd', label: 'tail -f architecture.notes', hint: 'engineering log', action: () => location.hash = '#projects' },
    { kind: 'cmd', label: 'cite metrix', hint: 'project', action: () => location.hash = '#projects' },
    { kind: 'cmd', label: 'cite wealthlens', hint: 'project', action: () => location.hash = '#projects' },
    { kind: 'cmd', label: 'reach-out --form', hint: 'contact', action: () => location.hash = '#contact' },
    // Easter eggs
    { kind: 'egg', label: 'play doom', hint: 'iddqd', action: () => { if (window.__launchDoom) window.__launchDoom(); } },
    { kind: 'egg', label: 'iddqd', hint: 'god mode', action: () => { if (window.__launchDoom) window.__launchDoom(); } },
    { kind: 'egg', label: 'play yokai survivors', hint: '妖怪', action: () => { if (window.__launchSurvivors) window.__launchSurvivors(); } },
    { kind: 'egg', label: 'yokai', hint: 'survive the horde', action: () => { if (window.__launchSurvivors) window.__launchSurvivors(); } },
    { kind: 'egg', label: 'sudo make me a sandwich', hint: 'permission denied', action: () => alert('xkcd #149 — but actually: you have to ask politely.') },
    { kind: 'egg', label: 'press run', hint: '↑↑↓↓←→←→ B A', action: () => alert('Type the Konami code anywhere on the page — ↑↑↓↓←→←→BA. Or just type "konami". There are 30+ secret keyword codes hidden on this page!') },
    { kind: 'egg', label: 'roll d20', hint: 'D&D dice roll', action: () => alert('Type "d20" anywhere on the page for a dice roll, or "nat20" for a guaranteed critical hit!') },
    { kind: 'egg', label: 'baldur\'s gate 3', hint: 'mind flayer', action: () => alert('Type any BG3 companion name: astarion, karlach, shadowheart, laezel, gale, withers, wyll, halsin, jaheira, minsc… or try "bg3", "darkurge", "eldritch", "fireball"!') },
    { kind: 'egg', label: 'secret codes list', hint: '30+ hidden', action: () => alert('Try typing these anywhere on the page:\n\n🎮 Retro: sega, pacman, sonic, mario, hadouken, fatality\n🎲 D&D: d20, nat20, initiative, fireball, eldritch\n⚔️ BG3: bg3, karlach, astarion, shadowheart, laezel, gale, withers, darkurge, minsc, halsin, wyll, jaheira\n🔧 Meta: press, dark, boring, konami\n\n…and more!') },
  ], []);

  // Keyboard listener
  useEffect(() => {
    function onKey(e) {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        setQ(''); setIdx(0);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = useMemo(() => {
    if (!q.trim()) return COMMANDS;
    const lc = q.toLowerCase();
    return COMMANDS.filter(c => c.label.toLowerCase().includes(lc) || c.hint.toLowerCase().includes(lc));
  }, [q, COMMANDS]);

  function runCommand(c) {
    c.action();
    setOpen(false);
  }

  function onInputKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const c = filtered[idx];
      if (c) runCommand(c);
    }
  }

  return (
    <>
      {/* Floating prompt-hint (subtle) */}
      <div style={{
        position: 'fixed', bottom: 16, right: 16, zIndex: 40,
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)',
        background: 'var(--paper-2)', border: '1px solid var(--rule)',
        padding: '6px 10px', letterSpacing: '0.08em', textTransform: 'uppercase',
        cursor: 'pointer', userSelect: 'none',
      }} onClick={() => setOpen(true)}>
        <span style={{ color: 'var(--rouge)' }}>⌘K</span> command palette
      </div>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(10,10,10,0.45)',
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
          paddingTop: '12vh',
          animation: 'cp-in 0.18s ease-out',
        }} onClick={() => setOpen(false)}>
          <style>{`
            @keyframes cp-in { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: translateY(0) }}
          `}</style>
          <div onClick={e => e.stopPropagation()} style={{
            width: 'min(620px, 92vw)',
            background: 'var(--paper)',
            border: '2px solid var(--rule)',
            boxShadow: '8px 8px 0 var(--rouge)',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 16px', borderBottom: '1px solid var(--rule)',
              background: 'var(--paper-3)',
              fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-dim)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              <span><span style={{ color: 'var(--rouge)' }}>●</span> command palette · ⌘K</span>
              <span>esc to close</span>
            </div>

            {/* Input */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--rule)',
              display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--rouge)' }}>$</span>
              <input
                ref={inputRef}
                value={q}
                onChange={e => { setQ(e.target.value); setIdx(0); }}
                onKeyDown={onInputKey}
                placeholder="type a section, command, or repo name…"
                style={{
                  width: '100%', border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--ink)',
                }}
              />
            </div>

            {/* List */}
            <div style={{ maxHeight: '52vh', overflow: 'auto' }}>
              {filtered.length === 0 && (
                <div style={{ padding: 24, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-mute)' }}>
                  no results. <span style={{ color: 'var(--ink-dim)' }}>// the editor regrets the inconvenience.</span>
                </div>
              )}
              {filtered.map((c, i) => {
                const active = i === idx;
                const kindColor = {
                  nav: 'var(--rouge)', open: 'var(--teal)', cmd: 'var(--forest)', egg: 'var(--gold)',
                }[c.kind];
                return (
                  <div key={i}
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => runCommand(c)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 16px', cursor: 'pointer',
                      background: active ? 'var(--paper-2)' : 'transparent',
                      borderLeft: `3px solid ${active ? kindColor : 'transparent'}`,
                      fontFamily: 'var(--mono)', fontSize: 13,
                    }}>
                    <span>
                      <span style={{ color: kindColor, fontSize: 10, letterSpacing: '0.1em',
                        textTransform: 'uppercase', marginRight: 12 }}>
                        {c.kind === 'nav' ? '▸' : c.kind === 'open' ? '↗' : c.kind === 'cmd' ? '$' : '✦'} {c.kind}
                      </span>
                      <span style={{ color: 'var(--ink)' }}>{c.label}</span>
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.05em' }}>{c.hint}</span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{
              padding: '8px 16px', borderTop: '1px solid var(--rule)',
              background: 'var(--paper-3)',
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)',
              letterSpacing: '0.08em',
            }}>
              <span>↑↓ navigate · ↩ select · esc close</span>
              <span>{filtered.length} command{filtered.length === 1 ? '' : 's'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
