/* Generated from portfolio/skills.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
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
window.Skills = function Skills() {
  return /*#__PURE__*/React.createElement("section", {
    id: "skills",
    style: {
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    num: "04",
    kicker: "Apparatus",
    title: "Tools, methods, and biases."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(SkillRadar, null), /*#__PURE__*/React.createElement(SkillBreakdown, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(Methods, null))));
};
var RADAR_AXES = [{
  key: 'backend',
  label: 'Backend',
  value: 0.95,
  items: ['Python', 'FastAPI', 'SQLAlchemy', 'C# / .NET', 'Node']
}, {
  key: 'devops',
  label: 'DevOps',
  value: 0.88,
  items: ['AWS', 'Jenkins', 'GitHub Actions', 'Bash', 'Groovy', 'Terraform']
}, {
  key: 'security',
  label: 'Security',
  value: 0.78,
  items: ['Nmap', 'CI scanning', 'Audit trails', 'IAM']
}, {
  key: 'frontend',
  label: 'Frontend',
  value: 0.78,
  items: ['React 18', 'TypeScript', 'Vue 3', 'TanStack', 'Tailwind', 'ECharts']
}, {
  key: 'data',
  label: 'Data / ML',
  value: 0.82,
  items: ['MySQL', 'SQLite', 'Pandas', 'Pipelines', 'PyTorch', 'ECharts']
}, {
  key: 'research',
  label: 'Research',
  value: 0.86,
  items: ['Multi-agent', 'Game theory', 'Simulation', 'Springer / SGAI-AI 2025']
}, {
  key: 'delivery',
  label: 'Delivery',
  value: 0.82,
  items: ['Public speaking', 'Workshops', 'Widening Participation']
}, {
  key: 'arch',
  label: 'Architecture',
  value: 0.92,
  items: ['Local-first', 'Trust-first', 'Cited-data-first', 'Audit-friendly', 'Legacy ↔ new']
}];
function SkillRadar() {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    active = _useState2[0],
    setActive = _useState2[1];
  var size = 380;
  var cx = size / 2,
    cy = size / 2;
  var R = size * 0.4;
  var N = RADAR_AXES.length;
  var point = function point(i, r) {
    var angle = i / N * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  };
  var polygon = RADAR_AXES.map(function (a, i) {
    return point(i, R * a.value).join(',');
  }).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px solid var(--rule)',
      padding: 20,
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 12
    }
  }, "Fig. 5 \u2014 capability radar \xB7 click an axis"), /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    viewBox: "0 0 ".concat(size, " ").concat(size),
    style: {
      display: 'block'
    }
  }, [0.25, 0.5, 0.75, 1].map(function (t, i) {
    return /*#__PURE__*/React.createElement("polygon", {
      key: i,
      points: RADAR_AXES.map(function (_, j) {
        return point(j, R * t).join(',');
      }).join(' '),
      fill: "none",
      stroke: "var(--rule)",
      strokeWidth: "0.5",
      strokeDasharray: i === 3 ? '0' : '2 2'
    });
  }), RADAR_AXES.map(function (a, i) {
    var _point = point(i, R),
      _point2 = _slicedToArray(_point, 2),
      x = _point2[0],
      y = _point2[1];
    var _point3 = point(i, R + 28),
      _point4 = _slicedToArray(_point3, 2),
      tx = _point4[0],
      ty = _point4[1];
    return /*#__PURE__*/React.createElement("g", {
      key: a.key,
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick() {
        return setActive(active === a.key ? null : a.key);
      }
    }, /*#__PURE__*/React.createElement("line", {
      x1: cx,
      y1: cy,
      x2: x,
      y2: y,
      stroke: "var(--rule)",
      strokeWidth: "0.5"
    }), /*#__PURE__*/React.createElement("text", {
      x: tx,
      y: ty,
      textAnchor: "middle",
      dominantBaseline: "middle",
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 11,
        fontWeight: active === a.key ? 700 : 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fill: active === a.key ? 'var(--rouge)' : 'var(--ink-2)'
      }
    }, a.label));
  }), /*#__PURE__*/React.createElement("polygon", {
    points: polygon,
    fill: "var(--rouge)",
    fillOpacity: "0.15",
    stroke: "var(--rouge)",
    strokeWidth: "1.5"
  }), RADAR_AXES.map(function (a, i) {
    var _point5 = point(i, R * a.value),
      _point6 = _slicedToArray(_point5, 2),
      x = _point6[0],
      y = _point6[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: a.key,
      cx: x,
      cy: y,
      r: active === a.key ? 6 : 3.5,
      fill: active === a.key ? 'var(--rouge)' : 'var(--ink)'
    });
  })), active && function () {
    var a = RADAR_AXES.find(function (x) {
      return x.key === active;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        padding: 14,
        background: 'var(--paper)',
        border: '1px solid var(--rule)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "label",
      style: {
        color: 'var(--rouge)'
      }
    }, a.label, " \xB7 ", (a.value * 100).toFixed(0), "%"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6
      }
    }, a.items.map(function (it) {
      return /*#__PURE__*/React.createElement("span", {
        key: it,
        style: {
          fontFamily: 'var(--mono)',
          fontSize: 11,
          padding: '3px 8px',
          border: '1px solid var(--rule)'
        }
      }, it);
    })));
  }());
}
function SkillBreakdown() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 16
    }
  }, "Self-assessed \xB7 honest-ish"), /*#__PURE__*/React.createElement("div", {
    className: "term"
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ skills --by-confidence"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\u25B8"), " python, fastapi, sqlalchemy, pydantic ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// daily driver \xB7 wealthlens + metrix backbone")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\u25B8"), " vue 3, typescript, pinia, echarts, d3 ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// wealthlens + taskdeck + pulseboard")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\u25B8"), " ci/cd \xB7 jenkins, github actions, groovy ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// 72 pipelines at ge + 30 workflows at home")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\u25B8"), " backend architecture ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// dual-db, audit-friendly, legacy-tolerant")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\u25B8"), " data pipelines \xB7 pandas, validation, freshness tracking ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// reproducible, cited, scheduled")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "\u25B8"), " c# \xB7 .net 8, ef core, signalr ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// taskdeck, reposcope, devfoundry")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "\u25B8"), " react 18 \xB7 tanstack query + table ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// the front side of metrix")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "\u25B8"), " websockets, signalr, redis ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// 4 projects, 3 languages, 0 polling")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "\u25B8"), " ai/llm integration \xB7 mcp, multi-provider ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// tools, not co-workers")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "\u25B8"), " testing \xB7 pytest, vitest, playwright, stryker, hypothesis ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// 874 reasons to sleep at night")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "\u25B8"), " security \xB7 nmap, threat-modelling, bloom filters ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// 112 fixtures at last count")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "\u25B8"), " pytorch \xB7 lstm, random forest ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// project-by-project, not architecture-level")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "\u25B8"), " public speaking ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// improving \xB7 more reps needed \xB7 fewer 9am slots")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "\u25B8"), " css ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "// declared incompetent by myself. retracted upon learning about grid.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "err"
  }, "\u25B8"), " regex ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "// can write, can read, refuses to admit which is harder."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      padding: 24,
      borderLeft: '4px solid var(--rouge)',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pull-quote",
    style: {
      marginBottom: 8
    }
  }, "\"I'd rather be the person who reads the audit log than the person who writes the press release.\""), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2014 self, Tuesday, allegedly")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: '16px 20px',
      borderLeft: '4px solid var(--teal)',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: 20,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      marginBottom: 6
    }
  }, "\"UK household wealth is \xA317 trillion. Most people have no idea what that distribution looks like.\""), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      color: 'var(--teal)'
    }
  }, "\u2014 self, building WealthLens at 2am")));
}
function Methods() {
  var methods = [{
    t: 'Architecture-first',
    d: 'Sketch the boundaries before the syntax. The diagram lives longer than the framework. The framework will be deprecated by April.'
  }, {
    t: 'Trust-first automation',
    d: 'Every change is a proposal. Auto-applied actions need an explicit policy and a kill switch. If you can\'t name who pressed the button, you don\'t have a button.'
  }, {
    t: 'Local-first by default',
    d: 'Choose offline-capable storage and sync as a feature, not the platform. The cloud is somebody else\'s computer, with somebody else\'s priorities.'
  }, {
    t: 'Reliability as defaults',
    d: 'Tests, logs, alerts, and rollback paths are not "phase two." They are the deliverable. Phase two is when you find out which of them you skipped.'
  }, {
    t: 'Legacy ↔ new dual-track',
    d: 'Treat existing systems as the org\'s real API. Wrap, observe, replace incrementally. "Rewrite" is the word product managers use when nobody has dared to look at the database.'
  }, {
    t: 'Smallest auditable unit',
    d: 'Prefer reviewable diffs over large rewrites. The PR is the documentation. The commit message is the apology.'
  }, {
    t: 'Data-first, source-always',
    d: 'Every dataset cites its source with URL and access date. Every transformation is reproducible from a script. If it\'s not cited, it\'s not data — it\'s a guess in a nice font.'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 16
    }
  }, "Methods \xB7 the way I work"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 0
    }
  }, methods.map(function (m, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: 24,
        borderTop: '1px solid var(--rule)',
        borderRight: i % 3 === 2 ? 'none' : '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 10,
        color: 'var(--rouge)',
        letterSpacing: '0.15em',
        marginBottom: 8
      }
    }, "METHOD ", String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 22,
        letterSpacing: '-0.01em',
        marginBottom: 8
      }
    }, m.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 13,
        color: 'var(--ink-dim)',
        lineHeight: 1.55
      }
    }, m.d));
  })));
}
