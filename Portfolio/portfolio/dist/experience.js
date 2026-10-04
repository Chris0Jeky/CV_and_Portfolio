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
    kicker: "Field reports",
    title: "Where the time went."
  }), /*#__PURE__*/React.createElement(GEDigitalReport, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(UniversityOutreach, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(Timeline, null))));
};

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
  }, "Feature \xB7 case study"), /*#__PURE__*/React.createElement("h3", {
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
  }, "\u2014 15 mo.")), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      textAlign: 'right'
    }
  }, "2023 \u2014 2024 \xB7 DevSecOps Intern")), /*#__PURE__*/React.createElement("div", {
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
  }, "Spent fifteen months embedded in a security-engineering team responsible for the deployment hygiene of a large legacy estate. The headline: I integrated automated ", /*#__PURE__*/React.createElement("strong", null, "Nmap"), " scanning into seventy-two AWS CI/CD pipelines, written across Jenkins, Bash, and just enough Groovy to keep things interesting."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "The result was a unified, audit-friendly scan stage that ran on every deploy: shorter feedback loops, fewer hand-rolled config files, and a measurable drop in the number of changes that bypassed review. Also, fewer 3am emails. Mostly."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stamp",
    style: {
      color: 'var(--forest)'
    }
  }, "\u221215% deploy friction"), /*#__PURE__*/React.createElement("span", {
    className: "stamp",
    style: {
      color: 'var(--rouge)',
      marginLeft: 12,
      transform: 'rotate(2deg)'
    }
  }, "\u221250% config time"))), /*#__PURE__*/React.createElement("aside", {
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
  }, ['AWS', 'Jenkins', 'Bash', 'Groovy', 'Python', 'Nmap', 'Terraform', 'IAM'].map(function (s) {
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
  }, "DevSecOps \xB7 cloud deployment \xB7 legacy backend \xB7 auditability \xB7 CI/CD \xB7 governance"))), /*#__PURE__*/React.createElement("div", {
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
  }, "Fig. 2 \u2014 pipeline scan rollout \xB7 72 deployments"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--forest)'
    }
  }, "\u25CF ", scanned, "/72 instrumented")), /*#__PURE__*/React.createElement(PipelineVisualization, {
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
  }, "# 1."), " the legacy estate is the org's actual API. respect it before you refactor it."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 2."), " a scan that runs once is theatre. a scan that runs on every deploy is policy."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 3."), " Groovy will hurt you. plan accordingly."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 4."), " if it's not in the audit log, it didn't happen ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "\u26A0")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 5."), " dashboards are nice; alerts that page the right person at the right time are the job."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "# 6."), " the security team is not your enemy. the calendar is.")));
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
  }, /*#__PURE__*/React.createElement("span", null, "JENKINS \xB7 72 PIPELINES \xB7 CONTINUOUS SCAN INTEGRATION"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
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
  }, ['checkout', 'build', 'unit-test', 'nmap-scan', 'deploy', 'audit-log'].map(function (s, i) {
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
  }, "\u23F1"), " avg cycle ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-fg)'
    }
  }, "\u221215%")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u2699"), " config time ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-fg)'
    }
  }, "\u221250%")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u2713"), " findings routed to ticketing"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u25C9"), " 0 audit gaps")));
}

/* ============ University Outreach ============ */
function UniversityOutreach() {
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
  }, "Ongoing \xB7 field work"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 38,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      margin: '6px 0 16px',
      lineHeight: 1.05
    }
  }, "Widening Participation ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2014 delivery & data.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, "I work with ", /*#__PURE__*/React.createElement("strong", null, "Middlesex University"), "'s Widening Participation team on two things at once: the ", /*#__PURE__*/React.createElement("em", null, "data"), " side (cleaning and analysing the team's records to see what actually moves the needle), and the ", /*#__PURE__*/React.createElement("em", null, "delivery"), " side (showing up at schools, on campus, and to whichever audience will tolerate a 9am session about computer science). The headline pitch \u2014 \"a degree is one path, not the only one\" \u2014 is, somehow, still controversial in some rooms."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stamp"
  }, "Public Speaking"), /*#__PURE__*/React.createElement("span", {
    className: "stamp",
    style: {
      color: 'var(--forest)',
      transform: 'rotate(1deg)'
    }
  }, "Data Analysis"), /*#__PURE__*/React.createElement("span", {
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
  }, "Dispatches \xB7 selected"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, [{
    date: '26.03',
    loc: 'Year 12 visit',
    n: '~ 80 students',
    topic: 'Why software bites back'
  }, {
    date: '26.02',
    loc: 'On-campus session',
    n: '~ 35 attendees',
    topic: 'CI/CD without tears'
  }, {
    date: '26.01',
    loc: 'Sixth-form workshop',
    n: '~ 60 students',
    topic: 'Hello, terminal'
  }, {
    date: '25.11',
    loc: 'Open day talk',
    n: '~ 120 prospects',
    topic: 'A day in the life'
  }].map(function (d) {
    return /*#__PURE__*/React.createElement("div", {
      key: d.date,
      style: {
        borderTop: '1px dashed var(--rule)',
        paddingTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: 'var(--ink-mute)'
      }
    }, d.date, "/26"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 17,
        marginTop: 2
      }
    }, "\"", d.topic, "\""), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 11,
        color: 'var(--ink-dim)',
        marginTop: 2
      }
    }, d.loc, " \xB7 ", d.n));
  }))));
}

/* ============ Timeline ============ */
function Timeline() {
  var items = [{
    year: '2026',
    title: 'WealthLens · sole architect',
    body: 'Open-source UK wealth/inequality data platform. Ten datasets, ten cited chart pages, weekly refresh.'
  }, {
    year: '2026',
    title: 'Metrix · co-development',
    body: 'Options-backtesting + signal platform with a small team. ~3.1k commits in.'
  }, {
    year: '2026',
    title: 'Taskdeck · principal author',
    body: 'Local-first execution workspace · proposal-first automation.'
  }, {
    year: '2025',
    title: 'BSc CS · First Class · Middlesex',
    body: 'Graduated. Started staying for the Widening Participation work.'
  }, {
    year: '2025',
    title: 'SGAI-AI 2025 · Springer publication',
    body: 'Lead author on the N-person Prisoner\'s Dilemma paper.'
  }, {
    year: '2025',
    title: 'Widening Participation · ongoing',
    body: 'Data + delivery. Schools, campus, workshops.'
  }, {
    year: '2024',
    title: 'GE Digital · DevSecOps intern (15 mo)',
    body: '~72 AWS CI/CD pipelines. Cloud deployment + legacy backend. Spotlight Award.'
  }, {
    year: '2023',
    title: 'N-Person IPD · research begins',
    body: 'Multi-agent simulation of cooperation emergence in repeated games.'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 16
    }
  }, "Timeline \xB7 the rest"), items.map(function (it, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: '90px 1fr 1.5fr',
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
