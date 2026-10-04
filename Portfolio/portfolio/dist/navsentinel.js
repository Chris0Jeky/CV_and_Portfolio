/* Generated from portfolio/navsentinel.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React, FeatureHeader */
var _React = React,
  useState = _React.useState,
  useMemo = _React.useMemo;
window.NavSentinelFeature = function NavSentinelFeature() {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      borderTop: '1px solid var(--rule)',
      paddingTop: 32
    }
  }, /*#__PURE__*/React.createElement(FeatureHeader, {
    num: "037",
    name: "NavSentinel",
    cat: "Browser Security \xB7 MV3 \xB7 Local-only",
    years: "2025 \u2014 shipping",
    team: "solo \xB7 112 Gym fixtures \xB7 48 test suites",
    tone: "rouge"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "dropcap",
    style: {
      fontSize: 18,
      lineHeight: 1.65,
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "NavSentinel"), " is a navigation-intent firewall as a browser extension. It scores every click before it gets to turn into a navigation \u2014 catching deceptive overlays, retargeted clicks, popunders, DoubleClickjacking, and ClickFix fake-CAPTCHA attacks \u2014 and it never sends anything about your browsing anywhere. The known-bad domain list is a ", /*#__PURE__*/React.createElement("strong", null, "build-time bloom filter"), ", baked into the extension. Zero network calls. Zero remote telemetry. Zero \"helpful\" cloud reputation lookups."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, "The brain is a two-stage scoring model: a", ' ', /*#__PURE__*/React.createElement("strong", null, "Click Deception Score (CDS)"), " computed at click time, then a", ' ', /*#__PURE__*/React.createElement("strong", null, "Navigation Risk Score (NRS)"), " at navigation time, both with explicit reason codes you can inspect. Thresholds are tunable per mode (smart blocks at 70, strict at 50), and same-organisation domain groups (Unity, Google, Microsoft, &c.) get an explicit, auditable exemption \u2014 because ", /*#__PURE__*/React.createElement("em", null, "unity.com"), " and ", /*#__PURE__*/React.createElement("em", null, "unity3d.com"), " are the same company, and pretending otherwise is just noise."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, "Backed by ", /*#__PURE__*/React.createElement("strong", null, "112 deterministic Gym fixtures"), " across overlay, retargeting, popunder, OAuth, DoubleClickjacking, ClickFix, redirect-chain, phishing-kit, DOM-mutation, CSP, SRI, and 25 real-world adversarial scenarios. 38 Vitest unit specs, 10 Playwright E2E suites. Built in TypeScript on the MV3 platform."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, ['TypeScript', 'Chrome MV3', 'Vitest', 'Playwright', 'Bloom filter', 'Reason codes', 'Local-only'].map(function (s) {
    return /*#__PURE__*/React.createElement("span", {
      key: s,
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 11,
        padding: '3px 8px',
        border: '1px solid var(--rule)',
        color: 'var(--ink-2)'
      }
    }, s);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "https://github.com/Chris0Jeky/NavSentinel",
    target: "_blank",
    rel: "noopener",
    "data-pb-project": "navsentinel",
    "data-pb-link": "repo",
    style: {
      borderColor: 'var(--rouge)',
      color: 'var(--rouge)'
    }
  }, "\u2197 Repo"))), /*#__PURE__*/React.createElement(CDSDemo, null)), /*#__PURE__*/React.createElement("div", {
    className: "term",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ navsentinel --explain blocked-click"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " every decision is ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "explainable"), ". CDS, NRS, and reason codes surface in the debug overlay + blocked-event log."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " diminishing returns: NRS > 100 gets 50% weight on the excess. ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// no runaway scores.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " bloom filter is compiled at build time from public threat feeds. ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "no remote lookups, ever.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " clipboard contents are ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "never stored"), ". only metadata (length, command-likeness) crosses the bridge."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " trusted-domain list is for credential submits only. it is ", /*#__PURE__*/React.createElement("em", null, "not"), " a generic \"good site\" allowlist."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " same-org exemption (unity \xB7 google \xB7 microsoft \xB7 &c.) is explicit and auditable. attackers can't \\\"unity-phishing.com\\\" their way in.")));
};

/* ============ Live CDS Demo ============ */
function CDSDemo() {
  var SCENARIOS = [{
    id: 'safe',
    label: 'A normal "Read more" link',
    sublabel: 'inline anchor · accessible name · same-origin',
    tone: 'forest',
    features: [['Keyboard activation possible', -10, 'cds_keyboard_intent'], ['Accessible name present', 0, 'cds_baseline']],
    nrsExtra: [],
    clicks: 1
  }, {
    id: 'mild',
    label: 'A "Subscribe" button on a paywall',
    sublabel: 'overlay covers ~40% of viewport · new tab',
    tone: 'gold',
    features: [['Interactive overlay covers >35% viewport', 30, 'cds_large_overlay'], ['Underlying element is more intentful', 35, 'cds_intent_mismatch'], ['Legit modal backdrop detected', -20, 'cds_legit_modal']],
    nrsExtra: [['New tab / window', 20, 'nrs_new_tab_window']],
    clicks: 1
  }, {
    id: 'hijack',
    label: 'Two clicks · the page opens a child window mid-gesture',
    sublabel: 'DoubleClickjacking pattern · cross-site redirect',
    tone: 'rouge',
    features: [['Pointerdown target ≠ click target (retargeting)', 20, 'cds_retargeting'], ['z-index ≥ 9999 absolute overlay', 15, 'cds_extreme_z'], ['Cursor: pointer but no visible affordance', 10, 'cds_invisible_affordance']],
    nrsExtra: [['DoubleClickjacking pattern active', 40, 'nrs_double_click_hijack'], ['Cross-site destination', 20, 'nrs_cross_site'], ['Multiple navigation attempts in one gesture', 25, 'nrs_multiple_attempts']],
    clicks: 2
  }];
  var _useState = useState(SCENARIOS[0]),
    _useState2 = _slicedToArray(_useState, 2),
    scenario = _useState2[0],
    setScenario = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    verdict = _useState4[0],
    setVerdict = _useState4[1];
  var result = useMemo(function () {
    var cds = scenario.features.reduce(function (s, f) {
      return s + f[1];
    }, 0);
    var nrs = cds + scenario.nrsExtra.reduce(function (s, f) {
      return s + f[1];
    }, 0);
    // Smart mode: prompt 40–69, block ≥ 70
    var decision = 'allow';
    if (nrs >= 70) decision = 'block';else if (nrs >= 40) decision = 'prompt';
    return {
      cds: cds,
      nrs: nrs,
      decision: decision
    };
  }, [scenario]);
  function runScenario(s) {
    setScenario(s);
    setVerdict(null);
    // tiny delay for theatre
    setTimeout(function () {
      return setVerdict('shown');
    }, 220);
  }
  var decisionColor = result.decision === 'block' ? 'var(--rouge)' : result.decision === 'prompt' ? 'var(--gold)' : 'var(--forest)';
  var decisionLabel = result.decision === 'block' ? 'BLOCK' : result.decision === 'prompt' ? 'PROMPT' : 'ALLOW';
  return /*#__PURE__*/React.createElement("div", {
    "data-tilt": true,
    style: {
      border: '1.5px solid var(--rule)',
      background: 'var(--paper-2)',
      boxShadow: '6px 6px 0 var(--rouge)',
      overflow: 'hidden'
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
  }, "\u25CF"), " NAVSENTINEL \xB7 CDS+NRS LIVE SIMULATION"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-mute)'
    }
  }, "FIG. 8 \u2014 click a scenario")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 8
    }
  }, "Choose a click scenario"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      marginBottom: 16
    }
  }, SCENARIOS.map(function (s) {
    var active = s.id === scenario.id;
    var c = s.tone === 'forest' ? 'var(--forest)' : s.tone === 'gold' ? 'var(--gold)' : 'var(--rouge)';
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: function onClick() {
        return runScenario(s);
      },
      style: {
        textAlign: 'left',
        padding: '8px 12px',
        background: active ? 'var(--paper)' : 'transparent',
        border: "1px solid ".concat(active ? c : 'var(--rule)'),
        borderLeft: "3px solid ".concat(c),
        fontFamily: 'var(--sans)',
        fontSize: 13,
        color: 'var(--ink)',
        cursor: 'pointer',
        lineHeight: 1.3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 10,
        color: 'var(--ink-dim)',
        marginTop: 2,
        letterSpacing: '0.03em'
      }
    }, s.sublabel));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--rule)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "CDS / NRS breakdown"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-mute)',
      letterSpacing: '0.1em'
    }
  }, scenario.clicks, " click", scenario.clicks > 1 ? 's' : '')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, scenario.features.map(function (_ref, i) {
    var _ref2 = _slicedToArray(_ref, 3),
      label = _ref2[0],
      w = _ref2[1],
      code = _ref2[2];
    return /*#__PURE__*/React.createElement(Row, {
      key: i,
      label: label,
      weight: w,
      code: code,
      delay: i * 70
    });
  }), scenario.nrsExtra.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      paddingTop: 6,
      borderTop: '1px dashed var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: 'var(--ink-mute)',
      letterSpacing: '0.1em',
      marginBottom: 4
    }
  }, "+ NRS FACTORS"), scenario.nrsExtra.map(function (_ref3, i) {
    var _ref4 = _slicedToArray(_ref3, 3),
      label = _ref4[0],
      w = _ref4[1],
      code = _ref4[2];
    return /*#__PURE__*/React.createElement(Row, {
      key: i,
      label: label,
      weight: w,
      code: code,
      delay: (scenario.features.length + i) * 70
    });
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 10,
      borderTop: '1px solid var(--rule)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr auto',
      gap: 10,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 9,
      color: 'var(--ink-mute)',
      letterSpacing: '0.1em'
    }
  }, "CDS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 22,
      color: 'var(--ink)',
      lineHeight: 1
    }
  }, result.cds)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 9,
      color: 'var(--ink-mute)',
      letterSpacing: '0.1em'
    }
  }, "NRS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 22,
      color: decisionColor,
      lineHeight: 1
    }
  }, result.nrs)), /*#__PURE__*/React.createElement("div", {
    className: "stamp",
    style: {
      color: decisionColor,
      transform: 'rotate(-2deg)',
      whiteSpace: 'nowrap'
    }
  }, "\u2192 ", decisionLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-mute)',
      lineHeight: 1.6
    }
  }, "// smart mode: allow < 40 \xB7 prompt 40\u201369 \xB7 block \u2265 70"))));
}
function Row(_ref5) {
  var label = _ref5.label,
    weight = _ref5.weight,
    code = _ref5.code,
    _ref5$delay = _ref5.delay,
    delay = _ref5$delay === void 0 ? 0 : _ref5$delay;
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    show = _useState6[0],
    setShow = _useState6[1];
  React.useEffect(function () {
    var t = setTimeout(function () {
      return setShow(true);
    }, delay);
    return function () {
      return clearTimeout(t);
    };
  }, [delay]);
  var sign = weight > 0 ? '+' : weight < 0 ? '−' : ' ';
  var color = weight > 0 ? 'var(--rouge)' : weight < 0 ? 'var(--forest)' : 'var(--ink-dim)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 40px 130px',
      gap: 8,
      padding: '2px 0',
      opacity: show ? 1 : 0,
      transform: show ? 'translateX(0)' : 'translateX(-6px)',
      transition: 'all 0.25s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-2)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: color,
      fontWeight: 700,
      textAlign: 'right'
    }
  }, sign, Math.abs(weight)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-mute)',
      fontSize: 10,
      textAlign: 'right'
    }
  }, code));
}
