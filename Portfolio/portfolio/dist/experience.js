/* Generated from portfolio/experience.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React, Sparkline */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;
window.Experience = function Experience() {
  return /*#__PURE__*/React.createElement("section", {
    id: "experience",
    style: {
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    num: "02",
    kicker: "Experience",
    title: "Where the time went."
  }), /*#__PURE__*/React.createElement(MetricalgoReport, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(MiddlesexReport, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(GEDigitalReport, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(Timeline, null))));
};

/* ============ METRICALGO ============ */
function MetricalgoReport() {
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr 220px',
      gap: 32,
      borderBottom: '1px solid var(--rule)',
      paddingBottom: 12,
      marginBottom: 24,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Current \xB7 software engineer"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 44,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      margin: 0,
      lineHeight: 1
    }
  }, "Metricalgo ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2014 options analytics.")), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      textAlign: 'right'
    }
  }, "Jul 2025 \u2014 present")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "dropcap",
    style: {
      fontSize: 18,
      lineHeight: 1.65,
      marginTop: 0
    }
  }, "Software engineer on an options analytics platform in closed beta. I built its", ' ', /*#__PURE__*/React.createElement("strong", null, "AI research assistant"), ". The model sees only a summary of the backtests the user can see, tied to a content hash, so a changed result returns a conflict. Each tool call's arguments are schema-checked and every call is recorded by a policy layer; admin tools re-check the user's role in the database at execution time. Credit is reserved before any provider call and released even if the client drops the stream."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "I also work on the backtest data path. Profiling showed row loading dominated, so I built an indexed in-memory options store, an optional Parquet and DuckDB reader that produces identical state, and an atomic warm cache, all over a legacy MySQL store kept read-only. A written calculation spec is the authority for P&L and fees, checked by an independent Decimal reference calculator, golden cases, QuantLib cross-checks and mutation tests.")), /*#__PURE__*/React.createElement("aside", {
    style: {
      borderLeft: '1px solid var(--rule)',
      paddingLeft: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 8
    }
  }, "Stack & disciplines"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 20
    }
  }, ['React', 'SSE', 'MySQL', 'Parquet', 'DuckDB', 'QuantLib'].map(function (s) {
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
    className: "label",
    style: {
      marginBottom: 8
    }
  }, "Tags"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontStyle: 'italic',
      color: 'var(--ink-dim)',
      fontSize: 14
    }
  }, "AI assistant \xB7 tool calling \xB7 policy layer \xB7 data path \xB7 correctness"))));
}

/* ============ GE DIGITAL FEATURE — Pipeline Viz ============ */
function GEDigitalReport() {
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    scanned = _useState2[0],
    setScanned = _useState2[1]; // animated count
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    running = _useState4[0],
    setRunning = _useState4[1];
  var ref = useRef(null);
  useEffect(function () {
    if (!ref.current) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) {
          setRunning(true);
        }
      });
    }, {
      threshold: 0.3
    });
    obs.observe(ref.current);
    return function () {
      return obs.disconnect();
    };
  }, [running]);
  useEffect(function () {
    if (!running) return;
    var n = 0;
    var t = setInterval(function () {
      n += 1;
      setScanned(function (s) {
        return Math.min(72, s + Math.ceil((72 - s) / 8) || 1);
      });
      if (n > 30) clearInterval(t);
    }, 60);
    return function () {
      return clearInterval(t);
    };
  }, [running]);
  return /*#__PURE__*/React.createElement("article", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr 220px',
      gap: 32,
      borderBottom: '1px solid var(--rule)',
      paddingBottom: 12,
      marginBottom: 24,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Placement \xB7 case study"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 44,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      margin: 0,
      lineHeight: 1
    }
  }, "GE Digital ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2014 14 mo.")), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      textAlign: 'right'
    }
  }, "Jun 2023 \u2014 Sep 2024 \xB7 Software Engineer Intern")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "dropcap",
    style: {
      fontSize: 18,
      lineHeight: 1.65,
      marginTop: 0
    }
  }, "A fourteen-month software engineering placement in Cambridge. I started on the", ' ', /*#__PURE__*/React.createElement("strong", null, "Smallworld"), " product: fixed hard-to-reproduce bugs in a large legacy Magik codebase, improved database access to make upgrades smoother, added MUnit tests and wrote up known pitfalls for new developers."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "Then I took over a security automation project. I extended ", /*#__PURE__*/React.createElement("strong", null, "Nmap"), ' ', "port scanning from internal builds to the Jenkins pipelines that deploy to AWS, across 72 products and about 140 pipelines, using Bash and Groovy. Each fresh deployment's open ports are checked against a per-product allow-list, and an unexpected port fails the build. Telling ephemeral-port noise from real exposure was most of the work, done with DevOps engineers and security architects."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stamp",
    style: {
      color: 'var(--gold)'
    }
  }, "GE Spotlight Award \xB7 Deliver with Focus"))), /*#__PURE__*/React.createElement("aside", {
    style: {
      borderLeft: '1px solid var(--rule)',
      paddingLeft: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 8
    }
  }, "Stack & disciplines"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 20
    }
  }, ['Magik', 'Smallworld', 'MUnit', 'Jenkins', 'Bash', 'Groovy', 'Nmap', 'AWS'].map(function (s) {
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
    className: "label",
    style: {
      marginBottom: 8
    }
  }, "Tags"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontStyle: 'italic',
      color: 'var(--ink-dim)',
      fontSize: 14
    }
  }, "legacy codebase \xB7 security automation \xB7 CI/CD \xB7 cloud deployment"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Fig. 2 \u2014 port-check rollout \xB7 72 products"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--forest)'
    }
  }, "\u25CF ", scanned, "/72 checked")), /*#__PURE__*/React.createElement(PipelineVisualization, {
    scanned: scanned
  })), /*#__PURE__*/React.createElement("div", {
    className: "term",
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ cat lessons.md"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 1."), " a legacy codebase is the product customers run. understand it before you refactor it."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 2."), " a scan that runs once is a report. a scan that fails the build is a control."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 3."), " most of the work is telling noise from real exposure ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "\u26A0")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 4."), " a per-product allow-list beats one rule for everyone.")));
}
function PipelineVisualization(_ref) {
  var scanned = _ref.scanned;
  var total = 72;
  var cols = 12;
  var rows = Math.ceil(total / cols);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--term-bg)',
      padding: 24,
      position: 'relative',
      border: '1px solid #000',
      boxShadow: '4px 4px 0 var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--term-dim)',
      marginBottom: 14,
      display: 'flex',
      justifyContent: 'space-between',
      letterSpacing: '0.1em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "JENKINS \xB7 72 PRODUCTS \xB7 ~140 PIPELINES \xB7 NMAP PORT CHECKS"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-green)'
    },
    className: "pulse"
  }, "\u25CF"), " RUNNING")), /*#__PURE__*/React.createElement("div", {
    "data-keep-grid": true,
    style: {
      display: 'grid',
      gridTemplateColumns: "repeat(".concat(cols, ", 1fr)"),
      gap: 6,
      marginBottom: 16
    }
  }, Array.from({
    length: total
  }).map(function (_, i) {
    var done = i < scanned;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        height: 28,
        background: done ? 'var(--term-green)' : '#1a2329',
        border: "1px solid ".concat(done ? 'var(--term-green)' : '#243038'),
        opacity: done ? 0.85 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--mono)',
        fontSize: 9,
        color: done ? '#0a1410' : 'var(--term-mute)',
        boxShadow: done ? '0 0 6px rgba(124,244,184,0.4)' : 'none',
        transition: 'all 0.3s'
      }
    }, String(i + 1).padStart(2, '0'));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: 4,
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--term-fg)'
    }
  }, ['checkout', 'build', 'deploy-aws', 'nmap-scan', 'allow-list', 'pass/fail'].map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        padding: '8px 10px',
        background: i === 3 ? 'rgba(124,244,184,0.12)' : '#1a2329',
        border: "1px solid ".concat(i === 3 ? 'var(--term-green)' : '#243038'),
        color: i === 3 ? 'var(--term-green)' : 'var(--term-dim)',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: 'var(--term-mute)',
        letterSpacing: '0.1em'
      }
    }, "STAGE_", String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 2
      }
    }, s), i === 3 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: -6,
        right: -6,
        background: 'var(--term-amber)',
        color: '#000',
        fontSize: 8,
        padding: '1px 4px',
        letterSpacing: '0.1em'
      }
    }, "NEW"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px dashed var(--term-mute)',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--term-fg)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u25C9"), " fresh deployment scanned"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u2699"), " per-product allow-list"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u2717"), " unexpected port fails the build")));
}

/* ============ Middlesex University ============ */
function MiddlesexReport() {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 48,
      paddingTop: 24,
      borderTop: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Current \xB7 Jun 2025 \u2014 present \xB7 London"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 38,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      margin: '6px 0 16px',
      lineHeight: 1.05
    }
  }, "Middlesex University ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2014 recruitment & outreach.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "UK Recruitment & Outreach Coordinator"), ", full-time since April 2026. I joined in June 2025 as Outreach Contractor and Workshop Lead. I build the team's reporting and data pipelines and its custom tools, and I plan and deliver talks, workshops and campus events."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stamp"
  }, "Reporting"), /*#__PURE__*/React.createElement("span", {
    className: "stamp",
    style: {
      color: 'var(--forest)',
      transform: 'rotate(1deg)'
    }
  }, "Data pipelines"), /*#__PURE__*/React.createElement("span", {
    className: "stamp",
    style: {
      color: 'var(--rouge)',
      transform: 'rotate(-1deg)'
    }
  }, "Workshops"))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--rule)',
      padding: 24,
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 12
    }
  }, "What I built"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, [{
    title: 'Reporting chain',
    body: 'Raw exports are found by config, and every data problem gets a finding code that appears in the pack. One set of canonical tables feeds the deck, offline dashboard, staging workbook and quarterly Word draft.'
  }, {
    title: 'Provenance',
    body: 'Each bundle carries a manifest of input, output and code hashes, and a doctor command names any file changed since the build.'
  }, {
    title: 'SharePoint List + Graph sync',
    body: 'Replacing the hand-typed activity workbook with a SharePoint List and a Python sync engine over Microsoft Graph. Computed fields are written back under a per-item ETag, so a colleague\'s newer edit is skipped and reported.'
  }, {
    title: 'Safe cutover',
    body: 'The old workbook format is exported exactly, so the reporting chain and rota dashboard keep running. CI compares a synthetic golden build cell by cell; a mutation script re-inserts real past bugs and expects a red test.'
  }].map(function (d) {
    return /*#__PURE__*/React.createElement("div", {
      key: d.title,
      style: {
        borderTop: '1px dashed var(--rule)',
        paddingTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 17,
        marginTop: 2
      }
    }, d.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 12,
        color: 'var(--ink-dim)',
        marginTop: 4,
        lineHeight: 1.5
      }
    }, d.body));
  }))));
}

/* ============ Timeline ============ */
function Timeline() {
  var items = [{
    year: 'Nov 2025 —',
    title: 'Independent R&D · development pipeline',
    body: 'Evenings and weekends. A pipeline that takes a task from an issue, a review finding or my phone to a merged pull request: a git worktree per task, test results tied to the commit SHA, and a plain-Python merge gate. An exhaustive checker walks all 50,542 reachable states of the merge model. Also Taskdeck v0.3.0, NavSentinel and local-asset-studio; also shipped developer-lens, Alibi, WealthLens, estate-atlas and charter-replay.'
  }, {
    year: 'Jul 2025 —',
    title: 'Metricalgo · Software Engineer',
    body: 'Options analytics platform (closed beta). Built the AI research assistant; backtest data path and correctness.'
  }, {
    year: 'Jun 2025 —',
    title: 'Middlesex University · UK Recruitment & Outreach Coordinator',
    body: 'Full-time since April 2026; joined as Outreach Contractor and Workshop Lead. Reporting and data pipelines, SharePoint List + Microsoft Graph sync.'
  }, {
    year: 'Mar 2025 —',
    title: 'DeliveraSoft · Software Engineer (Contract)',
    body: 'Remote, two-person team. Automation, data cleaning, landing pages and fixes for small-business clients, usually starting from a loose brief.'
  }, {
    year: '2025',
    title: 'BSc (Hons) Computer Science · First Class · Middlesex',
    body: 'With Industrial Placement.'
  }, {
    year: '2025',
    title: 'SGAI-AI 2025 · Springer publication',
    body: 'Lead author on the N-Person Prisoners\' Dilemma paper; presented it at the conference.'
  }, {
    year: '2023 — 24',
    title: 'GE Digital · Software Engineer Intern (14 months)',
    body: 'Jun 2023 – Sep 2024, Cambridge. Smallworld and Magik, then Nmap port checks on the Jenkins pipelines that deploy to AWS, across 72 products and about 140 pipelines. GE Spotlight Award, "Deliver with Focus".'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 16
    }
  }, "Timeline \xB7 all roles"), items.map(function (it, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: '110px 1fr 1.5fr',
        gap: 24,
        padding: '14px 0',
        borderTop: '1px solid var(--rule)',
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 13,
        color: 'var(--rouge)'
      }
    }, it.year), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 22,
        letterSpacing: '-0.01em'
      }
    }, it.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 13,
        color: 'var(--ink-dim)',
        lineHeight: 1.5
      }
    }, it.body));
  }));
}
