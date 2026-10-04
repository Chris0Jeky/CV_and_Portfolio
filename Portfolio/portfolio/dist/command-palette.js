/* Generated from portfolio/command-palette.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;

// ⌘K / Ctrl+K command palette — fits the keyboard-first ethos.
window.CommandPalette = function CommandPalette() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    q = _useState4[0],
    setQ = _useState4[1];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    idx = _useState6[0],
    setIdx = _useState6[1];
  var inputRef = useRef(null);
  function fireCode(name) {
    name.split('').forEach(function (ch, i) {
      setTimeout(function () {
        document.body.dispatchEvent(new KeyboardEvent('keydown', {
          key: ch,
          bubbles: true
        }));
      }, i * 20);
    });
  }
  var COMMANDS = useMemo(function () {
    return [
    // ── Navigation ──
    {
      kind: 'nav',
      label: 'go to · about',
      hint: '§01',
      action: function action() {
        return location.hash = '#about';
      }
    }, {
      kind: 'nav',
      label: 'go to · experience',
      hint: '§02',
      action: function action() {
        return location.hash = '#experience';
      }
    }, {
      kind: 'nav',
      label: 'go to · credentials',
      hint: '§02.5',
      action: function action() {
        return location.hash = '#credentials';
      }
    }, {
      kind: 'nav',
      label: 'go to · projects',
      hint: '§03',
      action: function action() {
        return location.hash = '#projects';
      }
    }, {
      kind: 'nav',
      label: 'go to · skills',
      hint: '§04',
      action: function action() {
        return location.hash = '#skills';
      }
    }, {
      kind: 'nav',
      label: 'go to · contact',
      hint: '§05',
      action: function action() {
        return location.hash = '#contact';
      }
    },
    // ── Projects ──
    {
      kind: 'open',
      label: 'open · wealthlens repo',
      hint: 'github',
      action: function action() {
        var _window$PortfolioPuls;
        (_window$PortfolioPuls = window.PortfolioPulse) === null || _window$PortfolioPuls === void 0 || _window$PortfolioPuls.project('wealthlens', 'repo');
        window.open('https://github.com/Chris0Jeky/wealthlens-hq', '_blank');
      }
    }, {
      kind: 'open',
      label: 'open · wealthlens live site',
      hint: 'pages',
      action: function action() {
        var _window$PortfolioPuls2;
        (_window$PortfolioPuls2 = window.PortfolioPulse) === null || _window$PortfolioPuls2 === void 0 || _window$PortfolioPuls2.project('wealthlens', 'site');
        window.open('https://chris0jeky.github.io/wealthlens-hq/', '_blank');
      }
    }, {
      kind: 'open',
      label: 'open · taskdeck repo',
      hint: 'github',
      action: function action() {
        var _window$PortfolioPuls3;
        (_window$PortfolioPuls3 = window.PortfolioPulse) === null || _window$PortfolioPuls3 === void 0 || _window$PortfolioPuls3.project('taskdeck', 'repo');
        window.open('https://github.com/Chris0Jeky/Taskdeck', '_blank');
      }
    }, {
      kind: 'open',
      label: 'open · NPDL repo',
      hint: 'github',
      action: function action() {
        var _window$PortfolioPuls4;
        (_window$PortfolioPuls4 = window.PortfolioPulse) === null || _window$PortfolioPuls4 === void 0 || _window$PortfolioPuls4.project('npdl', 'repo');
        window.open('https://github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation', '_blank');
      }
    }, {
      kind: 'open',
      label: 'open · navsentinel repo',
      hint: 'github',
      action: function action() {
        var _window$PortfolioPuls5;
        (_window$PortfolioPuls5 = window.PortfolioPulse) === null || _window$PortfolioPuls5 === void 0 || _window$PortfolioPuls5.project('navsentinel', 'repo');
        window.open('https://github.com/Chris0Jeky/NavSentinel', '_blank');
      }
    }, {
      kind: 'open',
      label: 'open · github profile',
      hint: 'github',
      action: function action() {
        var _window$PortfolioPuls6;
        (_window$PortfolioPuls6 = window.PortfolioPulse) === null || _window$PortfolioPuls6 === void 0 || _window$PortfolioPuls6.contact('github');
        window.open('https://github.com/Chris0Jeky', '_blank');
      }
    },
    // ── Shell Commands ──
    {
      kind: 'cmd',
      label: 'whoami',
      hint: '$ identity',
      action: function action() {
        return location.hash = '#about';
      }
    }, {
      kind: 'cmd',
      label: 'cat hills.md',
      hint: 'opinions',
      action: function action() {
        return location.hash = '#about';
      }
    }, {
      kind: 'cmd',
      label: 'tail -f architecture.notes',
      hint: 'engineering log',
      action: function action() {
        return location.hash = '#projects';
      }
    }, {
      kind: 'cmd',
      label: 'cite metrix',
      hint: 'project',
      action: function action() {
        return location.hash = '#projects';
      }
    }, {
      kind: 'cmd',
      label: 'cite wealthlens',
      hint: 'project',
      action: function action() {
        return location.hash = '#projects';
      }
    }, {
      kind: 'cmd',
      label: 'reach-out --form',
      hint: 'contact',
      action: function action() {
        return location.hash = '#contact';
      }
    },
    // ── Mini-games ──
    {
      kind: 'egg',
      label: 'play doom',
      hint: 'iddqd',
      action: function action() {
        if (window.__launchDoom) window.__launchDoom();
      }
    }, {
      kind: 'egg',
      label: 'play yokai survivors',
      hint: '妖怪',
      action: function action() {
        if (window.__launchSurvivors) window.__launchSurvivors();
      }
    },
    // ── Retro Arcade — type these anywhere ──
    {
      kind: 'egg',
      label: 'type: konami',
      hint: '↑↑↓↓←→←→BA',
      action: function action() {
        return fireCode('konami');
      }
    }, {
      kind: 'egg',
      label: 'type: sega',
      hint: 'console boot',
      action: function action() {
        return fireCode('sega');
      }
    }, {
      kind: 'egg',
      label: 'type: pacman',
      hint: 'waka waka',
      action: function action() {
        return fireCode('pacman');
      }
    }, {
      kind: 'egg',
      label: 'type: sonic',
      hint: 'gotta go fast',
      action: function action() {
        return fireCode('sonic');
      }
    }, {
      kind: 'egg',
      label: 'type: mario',
      hint: '+1UP',
      action: function action() {
        return fireCode('mario');
      }
    }, {
      kind: 'egg',
      label: 'type: hadouken',
      hint: 'street fighter',
      action: function action() {
        return fireCode('hadouken');
      }
    }, {
      kind: 'egg',
      label: 'type: shoryuken',
      hint: 'dragon punch',
      action: function action() {
        return fireCode('shoryuken');
      }
    }, {
      kind: 'egg',
      label: 'type: fatality',
      hint: 'mortal kombat',
      action: function action() {
        return fireCode('fatality');
      }
    }, {
      kind: 'egg',
      label: 'type: capcom',
      hint: 'FIGHT!',
      action: function action() {
        return fireCode('capcom');
      }
    }, {
      kind: 'egg',
      label: 'type: tatsu',
      hint: 'tatsumaki',
      action: function action() {
        return fireCode('tatsu');
      }
    },
    // ── D&D / Dice ──
    {
      kind: 'egg',
      label: 'type: d20',
      hint: 'roll a d20',
      action: function action() {
        return fireCode('d20');
      }
    }, {
      kind: 'egg',
      label: 'type: nat20',
      hint: 'critical hit!',
      action: function action() {
        return fireCode('nat20');
      }
    }, {
      kind: 'egg',
      label: 'type: initiative',
      hint: 'roll initiative',
      action: function action() {
        return fireCode('initiative');
      }
    }, {
      kind: 'egg',
      label: 'type: criticalrole',
      hint: 'how do you want…',
      action: function action() {
        return fireCode('criticalrole');
      }
    }, {
      kind: 'egg',
      label: 'type: dnd',
      hint: 'alias for d20',
      action: function action() {
        return fireCode('dnd');
      }
    },
    // ── Baldur's Gate 3 — companion codes ──
    {
      kind: 'egg',
      label: 'type: bg3',
      hint: 'mind flayer',
      action: function action() {
        return fireCode('bg3');
      }
    }, {
      kind: 'egg',
      label: 'type: karlach',
      hint: 'fire AOE',
      action: function action() {
        return fireCode('karlach');
      }
    }, {
      kind: 'egg',
      label: 'type: astarion',
      hint: 'vampire fangs',
      action: function action() {
        return fireCode('astarion');
      }
    }, {
      kind: 'egg',
      label: 'type: shadowheart',
      hint: 'shar damage zone',
      action: function action() {
        return fireCode('shadowheart');
      }
    }, {
      kind: 'egg',
      label: 'type: laezel',
      hint: 'silver sword',
      action: function action() {
        return fireCode('laezel');
      }
    }, {
      kind: 'egg',
      label: 'type: gale',
      hint: 'magic missiles',
      action: function action() {
        return fireCode('gale');
      }
    }, {
      kind: 'egg',
      label: 'type: withers',
      hint: '3 skeleton allies',
      action: function action() {
        return fireCode('withers');
      }
    }, {
      kind: 'egg',
      label: 'type: wyll',
      hint: 'blade of frontiers',
      action: function action() {
        return fireCode('wyll');
      }
    }, {
      kind: 'egg',
      label: 'type: halsin',
      hint: 'wild shape bear',
      action: function action() {
        return fireCode('halsin');
      }
    }, {
      kind: 'egg',
      label: 'type: jaheira',
      hint: 'harper veteran',
      action: function action() {
        return fireCode('jaheira');
      }
    }, {
      kind: 'egg',
      label: 'type: minsc',
      hint: 'go for the eyes!',
      action: function action() {
        return fireCode('minsc');
      }
    }, {
      kind: 'egg',
      label: 'type: tav',
      hint: 'hero of BG',
      action: function action() {
        return fireCode('tav');
      }
    }, {
      kind: 'egg',
      label: 'type: darkurge',
      hint: 'bhaal blood AOE',
      action: function action() {
        return fireCode('darkurge');
      }
    }, {
      kind: 'egg',
      label: 'type: mindflayer',
      hint: 'psychic blast',
      action: function action() {
        return fireCode('mindflayer');
      }
    },
    // ── D&D Spells ──
    {
      kind: 'egg',
      label: 'type: fireball',
      hint: '8d6 fire dmg AOE',
      action: function action() {
        return fireCode('fireball');
      }
    }, {
      kind: 'egg',
      label: 'type: eldritch',
      hint: 'eldritch blast ×3',
      action: function action() {
        return fireCode('eldritch');
      }
    }, {
      kind: 'egg',
      label: 'type: eldritchblast',
      hint: 'alias for eldritch',
      action: function action() {
        return fireCode('eldritchblast');
      }
    },
    // ── Pokémon — summon allies ──
    {
      kind: 'egg',
      label: 'type: pikachu',
      hint: 'I choose you!',
      action: function action() {
        return fireCode('pikachu');
      }
    }, {
      kind: 'egg',
      label: 'type: charizard',
      hint: 'fire/flying',
      action: function action() {
        return fireCode('charizard');
      }
    }, {
      kind: 'egg',
      label: 'type: bulbasaur',
      hint: 'grass/poison',
      action: function action() {
        return fireCode('bulbasaur');
      }
    }, {
      kind: 'egg',
      label: 'type: squirtle',
      hint: 'water',
      action: function action() {
        return fireCode('squirtle');
      }
    }, {
      kind: 'egg',
      label: 'type: gengar',
      hint: 'ghost/poison',
      action: function action() {
        return fireCode('gengar');
      }
    }, {
      kind: 'egg',
      label: 'type: mewtwo',
      hint: 'psychic legend',
      action: function action() {
        return fireCode('mewtwo');
      }
    }, {
      kind: 'egg',
      label: 'type: eevee',
      hint: 'evolution fan',
      action: function action() {
        return fireCode('eevee');
      }
    }, {
      kind: 'egg',
      label: 'type: snorlax',
      hint: 'tank HP',
      action: function action() {
        return fireCode('snorlax');
      }
    }, {
      kind: 'egg',
      label: 'type: jigglypuff',
      hint: 'fairy/normal',
      action: function action() {
        return fireCode('jigglypuff');
      }
    }, {
      kind: 'egg',
      label: 'type: gyarados',
      hint: 'water/flying',
      action: function action() {
        return fireCode('gyarados');
      }
    }, {
      kind: 'egg',
      label: 'type: dragonite',
      hint: 'dragon/flying',
      action: function action() {
        return fireCode('dragonite');
      }
    }, {
      kind: 'egg',
      label: 'type: lucario',
      hint: 'fighting/steel',
      action: function action() {
        return fireCode('lucario');
      }
    }, {
      kind: 'egg',
      label: 'type: pokemon',
      hint: 'random summon',
      action: function action() {
        return fireCode('pokemon');
      }
    },
    // ── Meta / Utility ──
    {
      kind: 'egg',
      label: 'type: dark',
      hint: 'toggle dark mode',
      action: function action() {
        return fireCode('dark');
      }
    }, {
      kind: 'egg',
      label: 'type: press',
      hint: 'screen shake',
      action: function action() {
        return fireCode('press');
      }
    }, {
      kind: 'egg',
      label: 'type: boring',
      hint: 'reload the press',
      action: function action() {
        return fireCode('boring');
      }
    }, {
      kind: 'egg',
      label: 'type: audit',
      hint: 'highlight audit',
      action: function action() {
        return fireCode('audit');
      }
    }, {
      kind: 'egg',
      label: 'type: lychee',
      hint: 'rhymes with…',
      action: function action() {
        return fireCode('lychee');
      }
    }, {
      kind: 'egg',
      label: 'sudo make me a sandwich',
      hint: 'xkcd #149',
      action: function action() {
        return alert('xkcd #149 — but actually: you have to ask politely.');
      }
    }];
  }, []);

  // Keyboard listener
  useEffect(function () {
    function onKey(e) {
      var k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault();
        setOpen(function (o) {
          return !o;
        });
        setQ('');
        setIdx(0);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return function () {
      return window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Focus input when opened
  useEffect(function () {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);
  var filtered = useMemo(function () {
    if (!q.trim()) return COMMANDS;
    var lc = q.toLowerCase();
    return COMMANDS.filter(function (c) {
      return c.label.toLowerCase().includes(lc) || c.hint.toLowerCase().includes(lc);
    });
  }, [q, COMMANDS]);
  function runCommand(c) {
    c.action();
    setOpen(false);
  }
  function onInputKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx(function (i) {
        return Math.min(i + 1, filtered.length - 1);
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx(function (i) {
        return Math.max(i - 1, 0);
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      var c = filtered[idx];
      if (c) runCommand(c);
    }
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 50,
      right: 14,
      zIndex: 40,
      fontFamily: 'var(--mono)',
      fontSize: 9,
      color: 'rgba(244,241,234,0.6)',
      background: 'var(--ink, #161514)',
      padding: '5px 10px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      userSelect: 'none',
      borderRadius: 3,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      transition: 'color 0.15s'
    },
    onClick: function onClick() {
      return setOpen(true);
    },
    onMouseEnter: function onMouseEnter(e) {
      return e.currentTarget.style.color = 'rgba(244,241,234,0.95)';
    },
    onMouseLeave: function onMouseLeave(e) {
      return e.currentTarget.style.color = 'rgba(244,241,234,0.6)';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2318K"), " command palette"), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(10,10,10,0.45)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '12vh',
      animation: 'cp-in 0.18s ease-out'
    },
    onClick: function onClick() {
      return setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("style", null, "\n            @keyframes cp-in { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: translateY(0) }}\n          "), /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      width: 'min(620px, 92vw)',
      background: 'var(--paper)',
      border: '2px solid var(--rule)',
      boxShadow: '8px 8px 0 var(--rouge)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 16px',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--paper-3)',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-dim)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u25CF"), " command palette \xB7 \u2318K"), /*#__PURE__*/React.createElement("span", null, "esc to close")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      borderBottom: '1px solid var(--rule)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14,
      color: 'var(--rouge)'
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    value: q,
    onChange: function onChange(e) {
      setQ(e.target.value);
      setIdx(0);
    },
    onKeyDown: onInputKey,
    placeholder: "type a section, command, or repo name\u2026",
    style: {
      width: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--mono)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: '52vh',
      overflow: 'auto'
    }
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-mute)'
    }
  }, "no results. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-dim)'
    }
  }, "// the editor regrets the inconvenience.")), function () {
    var lastKind = null;
    var GROUP_LABELS = {
      nav: '— Navigation —',
      open: '— Projects —',
      cmd: '— Shell —',
      egg: '— Easter Eggs —'
    };
    return filtered.map(function (c, i) {
      var active = i === idx;
      var kindColor = {
        nav: 'var(--rouge)',
        open: 'var(--teal)',
        cmd: 'var(--forest)',
        egg: 'var(--gold)'
      }[c.kind];
      var showHeader = !q.trim() && c.kind !== lastKind;
      lastKind = c.kind;
      return React.createElement(React.Fragment, {
        key: i
      }, showHeader && React.createElement('div', {
        style: {
          padding: '6px 16px 4px',
          fontFamily: 'var(--mono)',
          fontSize: 9,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
          borderTop: i > 0 ? '1px solid var(--rule)' : 'none',
          marginTop: i > 0 ? 2 : 0
        }
      }, GROUP_LABELS[c.kind] || ''), React.createElement('div', {
        onMouseEnter: function onMouseEnter() {
          return setIdx(i);
        },
        onClick: function onClick() {
          return runCommand(c);
        },
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          cursor: 'pointer',
          background: active ? 'var(--paper-2)' : 'transparent',
          borderLeft: "3px solid ".concat(active ? kindColor : 'transparent'),
          fontFamily: 'var(--mono)',
          fontSize: 12
        }
      }, React.createElement('span', null, React.createElement('span', {
        style: {
          color: kindColor,
          fontSize: 9,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginRight: 10
        }
      }, c.kind === 'nav' ? '▸' : c.kind === 'open' ? '↗' : c.kind === 'cmd' ? '$' : '✦'), React.createElement('span', {
        style: {
          color: 'var(--ink)'
        }
      }, c.label)), React.createElement('span', {
        style: {
          fontSize: 9,
          color: 'var(--ink-mute)',
          letterSpacing: '0.05em'
        }
      }, c.hint)));
    });
  }()), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px',
      borderTop: '1px solid var(--rule)',
      background: 'var(--paper-3)',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-mute)',
      letterSpacing: '0.08em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2191\u2193 navigate \xB7 \u21A9 select \xB7 esc close"), /*#__PURE__*/React.createElement("span", null, filtered.length, " command", filtered.length === 1 ? '' : 's')))));
};
