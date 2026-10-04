/* Generated from portfolio/hero.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React, Fn */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;

// Hero = a "proposal diff" the visitor accepts to publish the issue.
// On accept: ink reveal, page becomes live.

window.Hero = function Hero(_ref) {
  var onAccept = _ref.onAccept;
  var _useState = useState('pending'),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1]; // pending | accepted | rejected
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    hovering = _useState4[0],
    setHovering = _useState4[1];
  useEffect(function () {
    if (state === 'accepted') {
      var t = setTimeout(function () {
        return onAccept && onAccept();
      }, 600);
      return function () {
        return clearTimeout(t);
      };
    }
  }, [state]);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 56,
      paddingBottom: 64,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2726 FEATURED \u2014 A PRACTITIONER'S NOTEBOOK"), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "PROPOSED CHANGE \xB7 pending review")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.45fr 1fr',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(80px, 12vw, 168px)',
      margin: '0 0 8px',
      fontWeight: 400,
      letterSpacing: '-0.045em',
      lineHeight: 0.82
    }
  }, "Cristian"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 24,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("em", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(48px, 7vw, 92px)',
      fontWeight: 300,
      color: 'var(--rouge)',
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, "\"Chris\""), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(48px, 7vw, 92px)',
      fontWeight: 400,
      letterSpacing: '-0.025em',
      lineHeight: 1
    }
  }, "Tcaci."), /*#__PURE__*/React.createElement("span", {
    className: "hand",
    style: {
      alignSelf: 'flex-end',
      marginBottom: 12
    }
  }, "\u2190 rhymes w/ \"lychee\"")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 22,
      lineHeight: 1.5,
      maxWidth: 580,
      margin: '0 0 28px',
      color: 'var(--ink-2)'
    }
  }, "Software engineer who writes ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "the boring half"), ' ', /*#__PURE__*/React.createElement(Fn, {
    n: "1"
  }, "The half where pipelines fail at 3am, where rollbacks are a feature, and where someone has to read the audit log on Monday. Yes \u2014 the part nobody puts in the demo video."), ' ', "of software \u2014 backends you can reason about, pipelines that fail loudly, and audit logs that don't have gaps. Currently turning", ' ', /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--teal)'
    }
  }, "\xA317 trillion of UK wealth data"), ' ', "into something the average person can actually read."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-rouge",
    href: "#projects"
  }, "\u25B7 Read the issue"), /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "#contact"
  }, "\u2709 Send a letter"), /*#__PURE__*/React.createElement("span", {
    className: "margin-note",
    style: {
      marginLeft: 12,
      alignSelf: 'flex-end',
      maxWidth: 220,
      transform: 'rotate(-2deg)'
    }
  }, "\u2190 the kind of work that", /*#__PURE__*/React.createElement("br", null), "doesn't make good", /*#__PURE__*/React.createElement("br", null), "demo videos"))), /*#__PURE__*/React.createElement(ProposalCard, {
    state: state,
    setState: setState
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 16,
      borderTop: '1px solid var(--rule)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'var(--sans)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: state === 'accepted' ? 'var(--forest)' : 'var(--gold)'
    }
  }, "\u25CF"), ' ', "STATUS: ", state === 'accepted' ? 'PUBLISHED' : state === 'rejected' ? 'WITHDRAWN' : 'AWAITING REVIEW'), /*#__PURE__*/React.createElement("span", null, "BACKEND \xB7 PLATFORM \xB7 DEVSECOPS \xB7 RESEARCH \xB7 CIVIC TECH"), /*#__PURE__*/React.createElement("span", null, "LAST COMMIT \xB7 2H AGO"))));
};
function ProposalCard(_ref2) {
  var state = _ref2.state,
    setState = _ref2.setState;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper-2)',
      border: '1.5px solid var(--rule)',
      boxShadow: '6px 6px 0 var(--rouge)',
      padding: 0,
      position: 'relative',
      transform: state === 'accepted' ? 'translate(2px, 2px)' : 'translate(0,0)',
      transition: 'transform 0.3s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 16px',
      borderBottom: '1px solid var(--rule)',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u25CF"), " proposal #043", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 12,
      color: 'var(--ink-mute)'
    }
  }, "main \u2190 portfolio/v4")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-mute)'
    }
  }, "+18 \u22123")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12.5,
      lineHeight: 1.7,
      padding: '14px 0',
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement(DiffLine, {
    kind: "meta"
  }, "@@ identity.yml @@"), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "del"
  }, "- title: \"Software Engineer \xB7 Backend / Platform\""), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+ title: \"Backend \xB7 Platform \xB7 Civic Data\""), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+ education: \"BSc CS \xB7 First Class \xB7 Middlesex 2025\""), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+ published: \"Springer \xB7 SGAI-AI 2025 \xB7 lead author\""), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+ stance: \"trust-first, proposal-not-autopilot\""), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+ default: \"local-first, source-cited, audit-friendly\""), /*#__PURE__*/React.createElement(DiffLine, null, " "), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "meta"
  }, "@@ now.yml @@"), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+ building:"), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+   - wealthlens # UK inequality data \xB7 874 tests \xB7 10 pipelines"), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+   - taskdeck   # local-first board \xB7 5,300+ commits \xB7 620+ PRs"), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+   - metrix     # options backtester \xB7 ~3.1k commits"), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+ shipping:    \"weekly, sometimes daily\""), /*#__PURE__*/React.createElement(DiffLine, {
    kind: "add"
  }, "+ mission:     \"make unequal systems legible\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--rule)',
      padding: '14px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'var(--paper-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-dim)'
    }
  }, state === 'pending' && 'Reviewable · safe to apply', state === 'accepted' && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)'
    }
  }, "\u2713 applied \xB7 merged into main"), state === 'rejected' && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2717 withdrawn \xB7 try again?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    style: {
      padding: '6px 12px',
      fontSize: 11
    },
    onClick: function onClick() {
      return setState('rejected');
    },
    disabled: state === 'accepted'
  }, "\u2717 Reject"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rouge",
    style: {
      padding: '6px 12px',
      fontSize: 11,
      background: state === 'accepted' ? 'var(--rouge)' : 'transparent',
      color: state === 'accepted' ? 'var(--paper)' : 'var(--rouge)'
    },
    onClick: function onClick() {
      return setState('accepted');
    },
    disabled: state === 'accepted'
  }, "\u2713 ", state === 'accepted' ? 'Applied' : 'Accept & publish'))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: 12,
      fontFamily: 'var(--sans)',
      fontSize: 10,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)'
    }
  }, "Fig. 1 \u2014 proposal-first interaction \xB7 \xE0 la Taskdeck"));
}
function DiffLine(_ref3) {
  var _ref3$kind = _ref3.kind,
    kind = _ref3$kind === void 0 ? 'ctx' : _ref3$kind,
    children = _ref3.children;
  var colors = {
    add: {
      bg: 'rgba(26, 77, 58, 0.08)',
      mark: '+',
      color: 'var(--forest)'
    },
    del: {
      bg: 'rgba(204, 58, 46, 0.08)',
      mark: '−',
      color: 'var(--rouge)'
    },
    meta: {
      bg: 'transparent',
      mark: ' ',
      color: 'var(--ink-mute)'
    },
    ctx: {
      bg: 'transparent',
      mark: ' ',
      color: 'var(--ink-dim)'
    }
  }[kind];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: colors.bg,
      padding: '0 16px',
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: colors.color,
      width: 10
    }
  }, colors.mark), /*#__PURE__*/React.createElement("span", {
    style: {
      color: kind === 'meta' ? colors.color : undefined
    }
  }, children));
}
