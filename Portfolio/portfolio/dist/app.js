/* Generated from portfolio/app.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React, ReactDOM, Masthead, Hero, About, Experience, ByTheNumbers, Credentials, Projects, Skills, Contact, Colophon, CommandPalette, DoomEasterEgg, YokaiSurvivors */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;
function Nav() {
  function openMobileNav() {
    document.getElementById('mobile-nav').classList.add('is-open');
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      textTransform: 'none',
      textDecoration: 'none'
    }
  }, "C. Tcaci ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)',
      fontStyle: 'italic'
    }
  }, "\u2014 quarterly")), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#about"
  }, "About"), /*#__PURE__*/React.createElement("a", {
    href: "#experience"
  }, "Experience"), /*#__PURE__*/React.createElement("a", {
    href: "#projects"
  }, "Projects"), /*#__PURE__*/React.createElement("a", {
    href: "#skills"
  }, "Skills"), /*#__PURE__*/React.createElement("a", {
    href: "#contact"
  }, "Contact")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)'
    },
    className: "pulse"
  }, "\u25CF"), " open to work"), /*#__PURE__*/React.createElement("button", {
    className: "mobile-menu-btn",
    onClick: openMobileNav,
    "aria-label": "Menu"
  }, "\u2630")));
}

// Konami easter egg — flashes "PRESS RUN" and inverts.
function useKonami(onTrigger) {
  useEffect(function () {
    var seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    var i = 0;
    function onKey(e) {
      var k = e.key;
      if (k === seq[i] || k.toLowerCase() === seq[i]) {
        i++;
        if (i === seq.length) {
          onTrigger();
          i = 0;
        }
      } else {
        i = 0;
      }
    }
    window.addEventListener('keydown', onKey);
    return function () {
      return window.removeEventListener('keydown', onKey);
    };
  }, [onTrigger]);
}
function App() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    printMode = _useState2[0],
    setPrintMode = _useState2[1];
  useKonami(function () {
    setPrintMode(true);
    setTimeout(function () {
      return setPrintMode(false);
    }, 2400);
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "top",
    style: {
      filter: printMode ? 'invert(1) hue-rotate(180deg)' : 'none',
      transition: 'filter 0.4s'
    }
  }, printMode && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 120,
      fontWeight: 400,
      color: 'var(--rouge)',
      letterSpacing: '-0.04em',
      animation: 'shake 0.15s linear infinite'
    }
  }, "\u2605 PRESS RUN \u2605")), /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(CommandPalette, null), /*#__PURE__*/React.createElement(DoomEasterEgg, null), /*#__PURE__*/React.createElement(YokaiSurvivors, null), /*#__PURE__*/React.createElement(Masthead, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Experience, null), /*#__PURE__*/React.createElement(ByTheNumbers, null), /*#__PURE__*/React.createElement(Credentials, null), /*#__PURE__*/React.createElement(Projects, null), /*#__PURE__*/React.createElement(Skills, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Colophon, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
