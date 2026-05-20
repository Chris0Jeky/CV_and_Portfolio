/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ⌘K / Ctrl+K command palette — fits the keyboard-first ethos.
window.CommandPalette = function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  function fireCode(name) {
    const evt = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(evt);
    const buf = name.split('');
    buf.forEach((ch, i) => {
      setTimeout(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: ch })), i * 20);
    });
  }

  const COMMANDS = useMemo(() => [
    // ── Navigation ──
    { kind: 'nav', label: 'go to · about',       hint: '§01',   action: () => location.hash = '#about' },
    { kind: 'nav', label: 'go to · experience',  hint: '§02',   action: () => location.hash = '#experience' },
    { kind: 'nav', label: 'go to · credentials', hint: '§02.5', action: () => location.hash = '#credentials' },
    { kind: 'nav', label: 'go to · projects',    hint: '§03',   action: () => location.hash = '#projects' },
    { kind: 'nav', label: 'go to · skills',      hint: '§04',   action: () => location.hash = '#skills' },
    { kind: 'nav', label: 'go to · contact',     hint: '§05',   action: () => location.hash = '#contact' },

    // ── Projects ──
    { kind: 'open', label: 'open · wealthlens repo',      hint: 'github', action: () => window.open('https://github.com/Chris0Jeky/wealthlens-hq', '_blank') },
    { kind: 'open', label: 'open · wealthlens live site',  hint: 'pages',  action: () => window.open('https://chris0jeky.github.io/wealthlens-hq/', '_blank') },
    { kind: 'open', label: 'open · taskdeck repo',         hint: 'github', action: () => window.open('https://github.com/Chris0Jeky/Taskdeck', '_blank') },
    { kind: 'open', label: 'open · NPDL repo',             hint: 'github', action: () => window.open('https://github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation', '_blank') },
    { kind: 'open', label: 'open · navsentinel repo',      hint: 'github', action: () => window.open('https://github.com/Chris0Jeky/NavSentinel', '_blank') },
    { kind: 'open', label: 'open · github profile',        hint: 'github', action: () => window.open('https://github.com/Chris0Jeky', '_blank') },

    // ── Shell Commands ──
    { kind: 'cmd', label: 'whoami',                      hint: '$ identity',      action: () => location.hash = '#about' },
    { kind: 'cmd', label: 'cat hills.md',                hint: 'opinions',        action: () => location.hash = '#about' },
    { kind: 'cmd', label: 'tail -f architecture.notes',  hint: 'engineering log', action: () => location.hash = '#projects' },
    { kind: 'cmd', label: 'cite metrix',                 hint: 'project',         action: () => location.hash = '#projects' },
    { kind: 'cmd', label: 'cite wealthlens',             hint: 'project',         action: () => location.hash = '#projects' },
    { kind: 'cmd', label: 'reach-out --form',            hint: 'contact',         action: () => location.hash = '#contact' },

    // ── Mini-games ──
    { kind: 'egg', label: 'play doom',              hint: 'iddqd',             action: () => { if (window.__launchDoom) window.__launchDoom(); } },
    { kind: 'egg', label: 'play yokai survivors',   hint: '妖怪',              action: () => { if (window.__launchSurvivors) window.__launchSurvivors(); } },

    // ── Retro Arcade — type these anywhere ──
    { kind: 'egg', label: 'type: konami',     hint: '↑↑↓↓←→←→BA',    action: () => fireCode('konami') },
    { kind: 'egg', label: 'type: sega',       hint: 'console boot',   action: () => fireCode('sega') },
    { kind: 'egg', label: 'type: pacman',     hint: 'waka waka',      action: () => fireCode('pacman') },
    { kind: 'egg', label: 'type: sonic',      hint: 'gotta go fast',  action: () => fireCode('sonic') },
    { kind: 'egg', label: 'type: mario',      hint: '+1UP',           action: () => fireCode('mario') },
    { kind: 'egg', label: 'type: hadouken',   hint: 'street fighter', action: () => fireCode('hadouken') },
    { kind: 'egg', label: 'type: shoryuken',  hint: 'dragon punch',  action: () => fireCode('shoryuken') },
    { kind: 'egg', label: 'type: fatality',   hint: 'mortal kombat',  action: () => fireCode('fatality') },
    { kind: 'egg', label: 'type: capcom',     hint: 'FIGHT!',        action: () => fireCode('capcom') },
    { kind: 'egg', label: 'type: tatsu',      hint: 'tatsumaki',     action: () => fireCode('tatsu') },

    // ── D&D / Dice ──
    { kind: 'egg', label: 'type: d20',         hint: 'roll a d20',        action: () => fireCode('d20') },
    { kind: 'egg', label: 'type: nat20',       hint: 'critical hit!',     action: () => fireCode('nat20') },
    { kind: 'egg', label: 'type: initiative',  hint: 'roll initiative',   action: () => fireCode('initiative') },
    { kind: 'egg', label: 'type: criticalrole',hint: 'how do you want…',  action: () => fireCode('criticalrole') },
    { kind: 'egg', label: 'type: dnd',         hint: 'alias for d20',     action: () => fireCode('dnd') },

    // ── Baldur's Gate 3 — companion codes ──
    { kind: 'egg', label: 'type: bg3',          hint: 'mind flayer',       action: () => fireCode('bg3') },
    { kind: 'egg', label: 'type: karlach',      hint: 'fire AOE',         action: () => fireCode('karlach') },
    { kind: 'egg', label: 'type: astarion',     hint: 'vampire fangs',    action: () => fireCode('astarion') },
    { kind: 'egg', label: 'type: shadowheart',  hint: 'shar damage zone', action: () => fireCode('shadowheart') },
    { kind: 'egg', label: 'type: laezel',       hint: 'silver sword',     action: () => fireCode('laezel') },
    { kind: 'egg', label: 'type: gale',         hint: 'magic missiles',   action: () => fireCode('gale') },
    { kind: 'egg', label: 'type: withers',      hint: '3 skeleton allies', action: () => fireCode('withers') },
    { kind: 'egg', label: 'type: wyll',         hint: 'blade of frontiers',action: () => fireCode('wyll') },
    { kind: 'egg', label: 'type: halsin',       hint: 'wild shape bear',  action: () => fireCode('halsin') },
    { kind: 'egg', label: 'type: jaheira',      hint: 'harper veteran',   action: () => fireCode('jaheira') },
    { kind: 'egg', label: 'type: minsc',        hint: 'go for the eyes!', action: () => fireCode('minsc') },
    { kind: 'egg', label: 'type: tav',          hint: 'hero of BG',       action: () => fireCode('tav') },
    { kind: 'egg', label: 'type: darkurge',     hint: 'bhaal blood AOE',  action: () => fireCode('darkurge') },
    { kind: 'egg', label: 'type: mindflayer',   hint: 'psychic blast',    action: () => fireCode('mindflayer') },

    // ── D&D Spells ──
    { kind: 'egg', label: 'type: fireball',       hint: '8d6 fire dmg AOE',   action: () => fireCode('fireball') },
    { kind: 'egg', label: 'type: eldritch',       hint: 'eldritch blast ×3',  action: () => fireCode('eldritch') },
    { kind: 'egg', label: 'type: eldritchblast',  hint: 'alias for eldritch', action: () => fireCode('eldritchblast') },

    // ── Pokémon — summon allies ──
    { kind: 'egg', label: 'type: pikachu',     hint: 'I choose you!',   action: () => fireCode('pikachu') },
    { kind: 'egg', label: 'type: charizard',   hint: 'fire/flying',     action: () => fireCode('charizard') },
    { kind: 'egg', label: 'type: bulbasaur',   hint: 'grass/poison',    action: () => fireCode('bulbasaur') },
    { kind: 'egg', label: 'type: squirtle',    hint: 'water',           action: () => fireCode('squirtle') },
    { kind: 'egg', label: 'type: gengar',      hint: 'ghost/poison',    action: () => fireCode('gengar') },
    { kind: 'egg', label: 'type: mewtwo',      hint: 'psychic legend',  action: () => fireCode('mewtwo') },
    { kind: 'egg', label: 'type: eevee',       hint: 'evolution fan',   action: () => fireCode('eevee') },
    { kind: 'egg', label: 'type: snorlax',     hint: 'tank HP',         action: () => fireCode('snorlax') },
    { kind: 'egg', label: 'type: jigglypuff',  hint: 'fairy/normal',    action: () => fireCode('jigglypuff') },
    { kind: 'egg', label: 'type: gyarados',    hint: 'water/flying',    action: () => fireCode('gyarados') },
    { kind: 'egg', label: 'type: dragonite',   hint: 'dragon/flying',   action: () => fireCode('dragonite') },
    { kind: 'egg', label: 'type: lucario',     hint: 'fighting/steel',  action: () => fireCode('lucario') },
    { kind: 'egg', label: 'type: pokemon',     hint: 'random summon',   action: () => fireCode('pokemon') },

    // ── Meta / Utility ──
    { kind: 'egg', label: 'type: dark',      hint: 'toggle dark mode',  action: () => fireCode('dark') },
    { kind: 'egg', label: 'type: press',     hint: 'screen shake',      action: () => fireCode('press') },
    { kind: 'egg', label: 'type: boring',    hint: 'reload the press',  action: () => fireCode('boring') },
    { kind: 'egg', label: 'type: audit',     hint: 'highlight audit',   action: () => fireCode('audit') },
    { kind: 'egg', label: 'type: lychee',    hint: 'rhymes with…',      action: () => fireCode('lychee') },
    { kind: 'egg', label: 'sudo make me a sandwich', hint: 'xkcd #149', action: () => alert('xkcd #149 — but actually: you have to ask politely.') },
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
      {/* Floating prompt-hint (subtle, above music player) */}
      <div style={{
        position: 'fixed', bottom: 50, right: 14, zIndex: 40,
        fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(244,241,234,0.6)',
        background: 'var(--ink, #161514)',
        padding: '5px 10px', letterSpacing: '0.1em', textTransform: 'uppercase',
        cursor: 'pointer', userSelect: 'none', borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'color 0.15s',
      }} onClick={() => setOpen(true)}
         onMouseEnter={e => e.currentTarget.style.color = 'rgba(244,241,234,0.95)'}
         onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,234,0.6)'}>
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
              {(() => {
                let lastKind = null;
                const GROUP_LABELS = {
                  nav: '— Navigation —', open: '— Projects —', cmd: '— Shell —', egg: '— Easter Eggs —',
                };
                return filtered.map((c, i) => {
                  const active = i === idx;
                  const kindColor = {
                    nav: 'var(--rouge)', open: 'var(--teal)', cmd: 'var(--forest)', egg: 'var(--gold)',
                  }[c.kind];
                  const showHeader = !q.trim() && c.kind !== lastKind;
                  lastKind = c.kind;
                  return React.createElement(React.Fragment, { key: i },
                    showHeader && React.createElement('div', {
                      style: {
                        padding: '6px 16px 4px', fontFamily: 'var(--mono)', fontSize: 9,
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: 'var(--ink-mute)', borderTop: i > 0 ? '1px solid var(--rule)' : 'none',
                        marginTop: i > 0 ? 2 : 0,
                      }
                    }, GROUP_LABELS[c.kind] || ''),
                    React.createElement('div', {
                      onMouseEnter: () => setIdx(i),
                      onClick: () => runCommand(c),
                      style: {
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 16px', cursor: 'pointer',
                        background: active ? 'var(--paper-2)' : 'transparent',
                        borderLeft: `3px solid ${active ? kindColor : 'transparent'}`,
                        fontFamily: 'var(--mono)', fontSize: 12,
                      },
                    },
                      React.createElement('span', null,
                        React.createElement('span', {
                          style: { color: kindColor, fontSize: 9, letterSpacing: '0.1em',
                            textTransform: 'uppercase', marginRight: 10 }
                        }, c.kind === 'nav' ? '▸' : c.kind === 'open' ? '↗' : c.kind === 'cmd' ? '$' : '✦'),
                        React.createElement('span', { style: { color: 'var(--ink)' } }, c.label),
                      ),
                      React.createElement('span', {
                        style: { fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.05em' }
                      }, c.hint),
                    ),
                  );
                });
              })()}
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
