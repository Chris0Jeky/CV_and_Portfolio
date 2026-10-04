/* Generated from portfolio/contact.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect;
window.Contact = function Contact() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    copied = _useState2[0],
    setCopied = _useState2[1];
  function copyEmail() {
    var _navigator$clipboard;
    (_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 || _navigator$clipboard.writeText('Jeky.tck@gmail.com');
    setCopied(true);
    setTimeout(function () {
      return setCopied(false);
    }, 1600);
  }
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: '64px 0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    num: "05",
    kicker: "Correspondence",
    title: "Send a letter."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      marginTop: 0
    }
  }, "The fastest way to reach me is email. I read everything; I reply to most. Hiring managers, collaborators, journalists curious about WealthLens, and fellow lurkers in the audit log \u2014 all welcome."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-rouge",
    onClick: copyEmail,
    "data-pb-contact": "email",
    style: {
      cursor: 'pointer'
    }
  }, "\u2709 ", copied ? 'Copied to clipboard' : 'Jeky.tck@gmail.com')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(ContactRow, {
    label: "GitHub",
    value: "github.com/Chris0Jeky",
    href: "https://github.com/Chris0Jeky",
    pb: {
      contact: 'github'
    }
  }), /*#__PURE__*/React.createElement(ContactRow, {
    label: "LinkedIn",
    value: "linkedin.com/in/cristian-tcaci",
    href: "#",
    pb: {
      contact: 'linkedin'
    }
  }), /*#__PURE__*/React.createElement(ContactRow, {
    label: "Repo \xB7 WealthLens",
    value: "github.com/Chris0Jeky/wealthlens-hq",
    href: "https://github.com/Chris0Jeky/wealthlens-hq",
    pb: {
      project: 'wealthlens'
    }
  }), /*#__PURE__*/React.createElement(ContactRow, {
    label: "Repo \xB7 Taskdeck",
    value: "github.com/Chris0Jeky/Taskdeck",
    href: "https://github.com/Chris0Jeky/Taskdeck",
    pb: {
      project: 'taskdeck'
    }
  }), /*#__PURE__*/React.createElement(ContactRow, {
    label: "Repo \xB7 NPDL",
    value: "github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation",
    href: "https://github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation",
    pb: {
      project: 'npdl'
    }
  }), /*#__PURE__*/React.createElement(ContactRow, {
    label: "Repo \xB7 NavSentinel",
    value: "github.com/Chris0Jeky/NavSentinel",
    href: "https://github.com/Chris0Jeky/NavSentinel",
    pb: {
      project: 'navsentinel'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "hand",
    style: {
      marginTop: 40,
      fontSize: 28,
      lineHeight: 1.2,
      maxWidth: 360
    }
  }, "p.s. \u2014 if you've read this far, mention \"audit log\" in your subject line.", /*#__PURE__*/React.createElement("br", null), "it'll make my week.")), /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px solid var(--rule)',
      padding: 22,
      background: 'var(--paper-2)',
      boxShadow: '4px 4px 0 var(--teal)',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 4
    }
  }, "Cards on the table"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 26,
      margin: '0 0 12px',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      lineHeight: 1.05
    }
  }, "What I'm actually ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--teal)'
    }
  }, "looking for"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 15.5,
      lineHeight: 1.6,
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 10px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Backend / platform roles"), " where reliability, security, and architecture are the deliverable, not the afterthought. Bonus points for legacy systems with adults in the room."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 10px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Civic-tech collaborators"), " on inequality, housing, public finance, or anything else where citation hygiene is non-negotiable."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Speakers' lists"), " for talks on local-first software, trust-first automation, or the (recurring) idea that AI assistance should be a proposal, not a commit."))), /*#__PURE__*/React.createElement("div", {
    className: "term"
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ ./reach-out --form"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " if you are ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "recruiting"), ": role + stack + remote-or-not. skip the cover letter."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " if you are ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "collaborating"), ": link the repo, name the bottleneck."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " if you are a ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "journalist or researcher"), ": the data is open, the charts are embeddable, tell me what's missing."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " if you care about ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "inequality data"), ": collaborators, not followers."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " if you are a ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "student"), ": yes you can ask. yes i'll reply."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " if you are an ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "autopilot"), ": please disclose. human reviewers go first."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px dashed var(--term-mute)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// expected reply: 24-48h on weekdays. faster if you mention an audit log.")))))));
};
function ContactRow(_ref) {
  var label = _ref.label,
    value = _ref.value,
    href = _ref.href,
    _ref$pb = _ref.pb,
    pb = _ref$pb === void 0 ? {} : _ref$pb;
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener",
    "data-pb-contact": pb.contact,
    "data-pb-project": pb.project,
    "data-pb-link": pb.project ? 'repo' : undefined,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr 30px',
      gap: 16,
      padding: '12px 0',
      borderTop: '1px solid var(--rule)',
      alignItems: 'baseline',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-2)'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      textAlign: 'right',
      color: 'var(--rouge)'
    }
  }, "\u2197"));
}
window.Colophon = function Colophon() {
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    logs = _useState4[0],
    setLogs = _useState4[1];
  var logsRef = useRef([]);
  function push(t, m) {
    var stamp = new Date().toTimeString().slice(0, 8);
    logsRef.current = [].concat(_toConsumableArray(logsRef.current.slice(-13)), [{
      t: t,
      m: m,
      stamp: stamp
    }]);
    setLogs(logsRef.current);
  }
  useEffect(function () {
    // Initial boot sequence
    push('boot', 'tcaci.io v5 mounted · paper: ok · ink: ok');
    push('ok', 'fonts loaded (newsreader, ibm plex, caveat)');
    push('ok', 'no ad trackers · first-party beta usage stats: see the Beta pill');
    push('ok', 'wealthlens data pipeline: 10/10 datasets fresh');
    push('info', 'visitor: anonymous · respect: assumed');

    // Track section visibility
    var seen = new Set();
    var sections = document.querySelectorAll('section[id]');
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !seen.has(e.target.id)) {
          seen.add(e.target.id);
          push('nav', "scrolled into \xB7 \xA7".concat(e.target.id));
        }
      });
    }, {
      threshold: 0.45
    });
    sections.forEach(function (s) {
      return obs.observe(s);
    });

    // Track hash navigation (from command palette / nav links)
    function onHash() {
      if (location.hash) push('nav', "jumped to \xB7 ".concat(location.hash));
    }
    window.addEventListener('hashchange', onHash);

    // Track footnote hovers
    function onFootnoteClick(e) {
      var fn = e.target.closest('.fn');
      if (fn) push('hover', "footnote \xB7 [".concat(fn.textContent, "] \xB7 expanded"));
    }
    document.addEventListener('click', onFootnoteClick);

    // Track command palette open
    function onKey(e) {
      var k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        push('cmd', '⌘K · command palette opened');
      }
    }
    window.addEventListener('keydown', onKey);

    // Track external link clicks
    function onLinkClick(e) {
      var a = e.target.closest('a[href^="http"]');
      if (a && a.target === '_blank') {
        var url = new URL(a.href);
        push('link', "outbound \xB7 ".concat(url.hostname).concat(url.pathname.slice(0, 28)));
      }
    }
    document.addEventListener('click', onLinkClick);
    return function () {
      obs.disconnect();
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onFootnoteClick);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onLinkClick);
    };
  }, []);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: '48px 0 32px',
      borderTop: '2px solid var(--rule)',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 12
    }
  }, "Colophon"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.65,
      color: 'var(--ink-dim)',
      marginTop: 0
    }
  }, "Set in ", /*#__PURE__*/React.createElement("em", null, "Newsreader"), " for body and display, ", /*#__PURE__*/React.createElement("em", null, "IBM Plex Sans"), " for chrome and labels, ", /*#__PURE__*/React.createElement("em", null, "IBM Plex Mono"), " for code and engineering inserts, and ", /*#__PURE__*/React.createElement("em", null, "Caveat"), "for the marginalia. Printed in cream, struck through with editorial red. Designed, written, and quietly second-guessed by the editor."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.65,
      color: 'var(--ink-dim)'
    }
  }, "No ads, no autoplay. This site is in beta and measures its own use, first-party, to improve it; nothing goes to an ad or analytics vendor. The Beta bar at the top (later the Beta button, bottom left) chooses what is sent. Usage counts: daily totals of page views, nothing else. Diagnostics: load timings, script error summaries, visible time and scroll depth. Journeys: a random id that lives in this tab only, with the order of pages and of the project and contact links opened. No names, emails or IPs. Outside the EEA all three start on; in the EEA only counts do, until you press OK. Global Privacy Control or Do Not Track turns everything off. Detailed events are kept 90 days, daily counts currently 14 days. The audit log on the right is local-only \u2014 it lives in your tab and dies with it. If something is annoying, that's on me.")), /*#__PURE__*/React.createElement("div", {
    className: "term"
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ tail -f /var/log/visit.log"), logs.map(function (l, i) {
    var c = l.t === 'ok' ? 'ok' : l.t === 'info' ? 'cyan' : l.t === 'nav' ? 'cyan' : l.t === 'link' ? 'warn' : l.t === 'cmd' ? 'ok' : l.t === 'hover' ? 'dim' : 'warn';
    return /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "dim"
    }, "[", l.stamp, "]"), " ", /*#__PURE__*/React.createElement("span", {
      className: c
    }, l.t.padEnd(5)), " ", l.m);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      color: 'var(--term-mute)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "blink"
  }, "\u258C")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTop: '1px solid var(--rule)',
      fontFamily: 'var(--sans)',
      fontSize: 10,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 MMXXVI \xB7 The Tcaci Quarterly \xB7 all proposals reviewable"), /*#__PURE__*/React.createElement("span", null, "signed off by \u25A2\u25A2 at ", new Date().toISOString().slice(0, 10)), /*#__PURE__*/React.createElement("span", null, "fin."))));
};
