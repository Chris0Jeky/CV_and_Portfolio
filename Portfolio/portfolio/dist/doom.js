/* Generated from portfolio/doom.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
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
  useRef = _React.useRef;
window.DoomEasterEgg = function DoomEasterEgg() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var wasPaused = useRef(false);
  useEffect(function () {
    window.__launchDoom = function () {
      return setOpen(true);
    };
    return function () {
      delete window.__launchDoom;
    };
  }, []);
  useEffect(function () {
    var code = 'iddqd';
    var buf = '';
    var timer;
    function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      clearTimeout(timer);
      buf += e.key.toLowerCase();
      if (buf.length > code.length) buf = buf.slice(-code.length);
      if (buf === code) {
        buf = '';
        setOpen(true);
      }
      timer = setTimeout(function () {
        buf = '';
      }, 2000);
    }
    window.addEventListener('keydown', onKey);
    return function () {
      window.removeEventListener('keydown', onKey);
      clearTimeout(timer);
    };
  }, []);
  useEffect(function () {
    var g = window.__tcaciGame;
    if (!g) return;
    if (open) {
      wasPaused.current = g.paused;
      g.paused = true;
    } else {
      g.paused = wasPaused.current;
    }
  }, [open]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setOpen(false);
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(22, 21, 20, 0.82)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("style", null, "\n        @keyframes doom-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }\n        .doom-panel { animation: doom-in 0.2s ease-out; }\n        .doom-x:hover { background: var(--rouge, #cc3a2e); color: var(--paper, #f4f1ea); }\n      "), /*#__PURE__*/React.createElement("div", {
    className: "doom-panel",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: 'var(--paper, #f4f1ea)',
      border: '2px solid var(--rule, #1a1817)',
      boxShadow: '8px 8px 0 var(--rouge, #cc3a2e)',
      width: 'min(860px, 95vw)',
      maxHeight: '95vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '7px 14px',
      borderBottom: '1px solid var(--rule, #1a1817)',
      background: 'var(--paper-3, #e2dccd)',
      fontFamily: 'var(--mono, monospace)',
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-dim, #5a554d)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge, #cc3a2e)'
    }
  }, "\u25CF"), " entertainment supplement"), /*#__PURE__*/React.createElement("button", {
    className: "doom-x",
    onClick: function onClick() {
      return setOpen(false);
    },
    style: {
      background: 'none',
      border: '1px solid var(--rule, #1a1817)',
      fontFamily: 'var(--mono, monospace)',
      fontSize: 11,
      padding: '2px 10px',
      cursor: 'pointer',
      color: 'var(--ink, #161514)',
      letterSpacing: '0.08em'
    }
  }, "\u2715 close")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 10px',
      textAlign: 'center',
      borderBottom: '3px double var(--rule, #1a1817)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif, "Times New Roman", serif)',
      fontSize: 'clamp(22px, 4vw, 34px)',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      color: 'var(--ink, #161514)',
      lineHeight: 1.15
    }
  }, "Yes, This Portfolio Runs", ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge, #cc3a2e)'
    }
  }, "Doom")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif, serif)',
      fontStyle: 'italic',
      fontSize: 12,
      color: 'var(--ink-dim, #5a554d)',
      marginTop: 3
    }
  }, "If it has a screen and a prayer, someone will port Doom to it.")), /*#__PURE__*/React.createElement("iframe", {
    src: "https://raz0red.github.io/webprboom/",
    style: {
      width: '100%',
      border: 'none',
      flexGrow: 1,
      minHeight: 'min(480px, 56vw)',
      background: '#000'
    },
    allow: "autoplay; fullscreen; pointer-lock; gamepad",
    allowFullScreen: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 14px',
      borderTop: '1px solid var(--rule, #1a1817)',
      background: 'var(--paper-3, #e2dccd)',
      fontFamily: 'var(--mono, monospace)',
      fontSize: 10,
      color: 'var(--ink-mute, #8a847a)',
      letterSpacing: '0.05em',
      flexWrap: 'wrap',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "wasd \xB7 mouse aim \xB7 click shoot \xB7 esc menu"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--hand, cursive)',
      fontSize: 15,
      color: 'var(--rouge, #cc3a2e)',
      transform: 'rotate(-1deg)',
      display: 'inline-block'
    }
  }, "\"it's not a portfolio until it runs doom\""))));
};
