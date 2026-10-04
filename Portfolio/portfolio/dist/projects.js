/* Generated from portfolio/projects.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, Sparkline, WealthLensFeature, NavSentinelFeature */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;
window.Projects = function Projects() {
  return /*#__PURE__*/React.createElement("section", {
    id: "projects",
    style: {
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    num: "03",
    kicker: "Catalogue raisonn\xE9",
    title: "Projects, in order of trouble caused."
  }), /*#__PURE__*/React.createElement(WealthLensFeature, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(MetrixFeature, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(TaskdeckFeature, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(WorkshopFeature, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(NavSentinelFeature, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(IPDFeature, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 16
    }
  }, "The rest of the catalogue"), CATALOG.map(function (p, i) {
    return /*#__PURE__*/React.createElement(CatalogRow, _extends({
      key: i
    }, p));
  }))));
};
var TASKDECK_GPS = [{
  id: 'GP-01',
  title: 'Layer boundaries',
  body: 'Domain / application / infrastructure / API stay coherent. No forbidden dependency direction.'
}, {
  id: 'GP-02',
  title: 'Claims-first identity',
  body: 'Never trust caller-supplied identity. Derive it from authenticated claims.'
}, {
  id: 'GP-03',
  title: 'Stable error contracts',
  body: 'Predictable JSON errors. `errorCode`, non-empty `message`, consistent status semantics.'
}, {
  id: 'GP-04',
  title: 'Test & CI evidence',
  body: 'Behaviour changes ship with deterministic tests and verification commands.'
}, {
  id: 'GP-05',
  title: 'Canonical docs sync',
  body: 'Active docs stay aligned with shipped reality when behaviour or workflow changes.'
}, {
  id: 'GP-06',
  title: 'Review-first automation',
  body: 'Automation-originated board writes are proposal-first. No silent autonomy by default.'
}, {
  id: 'GP-07',
  title: 'Lightweight governance',
  body: 'Maintainable, low-brittleness checks over regex / policy sprawl.'
}, {
  id: 'GP-08',
  title: 'Legibility before breadth',
  body: 'No surface area ahead of a clear golden path. No orphan pages without a next step.'
}, {
  id: 'GP-09',
  title: 'Traceable agent expansion',
  body: 'No agent / autonomy breadth unless runs, policies, and artifacts stay inspectable.'
}, {
  id: 'GP-10',
  title: 'Explicit egress & telemetry',
  body: 'Every external destination disclosed. Local telemetry rejects user content by default.'
}];
var CATALOG = [{
  num: '045',
  name: 'Alibi',
  cat: 'game · offline-first PWA · live',
  stack: 'JavaScript · PWA · Cloudflare',
  desc: 'An illustrated puzzle cabinet: hundreds of logic puzzles across thirteen families, mystery casebooks and a small house to wander, with device-local saves. No account, no subscription, no lives and no always-on connection.',
  links: [{
    label: 'play',
    href: 'https://alibi-after-hours-preview.commit-atlas.workers.dev/'
  }, {
    label: 'repo',
    href: 'https://github.com/Chris0Jeky/Alibi'
  }]
}, {
  num: '038',
  name: 'RepoScope',
  cat: 'devtool · offline · 100% local',
  stack: 'C# / .NET 8 · LibGit2Sharp · Vue 3',
  desc: 'Git repository analyzer that runs on your machine and stays there. CLI + Vue dashboard + static HTML reports. File-level hotspots, code churn over time, contributor patterns. The kind of insight you used to need a SaaS dashboard and a credit card for.'
}, {
  num: '036',
  name: 'DevFoundry',
  cat: 'toolbox · cli + ui · offline',
  stack: 'C# · .NET 8 · Vue 3',
  desc: 'An offline Swiss-army knife: JSON formatter, JSON⇄YAML, Base64, URL encoder, UUID, MD5/SHA, JWT decoder, timestamp converter, case converter, text diff, colour converter — 11 tools sharing one core, none of them sending your data to a random website that has "free" in the title.'
}, {
  num: '035',
  name: 'Historical Stats Tools',
  cat: 'finance · analytics',
  stack: 'Python · MySQL',
  desc: 'Companion to Metrix — a suite of statistical tools that crunches historical options data and feeds Metrix\'s backtests with inputs that have already been argued about, validated, and cited.'
}, {
  num: '034',
  name: 'AgentForge',
  cat: 'devtool · agent orchestration',
  stack: 'Python 3.11 · git worktrees · MCP · GitHub CLI',
  desc: 'A local-first "agent farm" for running multiple coding agents without them stepping on each other. Each task gets its own git worktree, the orchestrator handles spawning, harness checks, PR comment commands, MCP toolkit sync, and policy-as-code. Trust-first automation for the case where the automation itself is plural.'
}, {
  num: '030',
  name: 'SwarmingLilMen',
  cat: 'systems · simulation · performance',
  stack: 'C# · .NET 8 · Raylib · SIMD',
  desc: 'A 2D swarm simulation targeting 50k–100k interactive agents at 60 FPS via Structure-of-Arrays data layout and an allocation-free hot path. Deterministic, seeded, reproducible. Ships with four browser demos: Boids, Vicsek phase transitions, ant-colony optimisation, and particle-swarm optimisation. The bridge between NPDL theory and watching it happen at 60 frames per second.'
}, {
  num: '029',
  name: 'EduHub',
  cat: 'edtech · fullstack · realtime',
  stack: 'Vue · Node · MongoDB · JWT',
  desc: 'Full-stack educational platform with a Vue 2 frontend and a JWT-secured Node/Express API. Lives, ships, has users.'
}, {
  num: '028',
  name: 'AI Data Analytics Suite',
  cat: 'ml · dual model',
  stack: 'Python · LSTM · Random Forest',
  desc: 'Dual-model: student performance prediction (Random Forest, 98% R²) and fake-news detection (LSTM, 99.9% accuracy). The percentages are real. My faith in the second number, in production, is calibrated accordingly.'
}, {
  num: '027',
  name: 'Java ML Classifiers (from scratch)',
  cat: 'ml · educational',
  stack: 'Java · no libraries',
  desc: '15+ machine-learning classifiers — k-NN, SVM, MLP, the lot — implemented from scratch in pure Java for digit recognition. The kind of project you do once so you never wonder how it works again.'
}, {
  num: '026',
  name: 'Celestial Siege',
  cat: 'game · realtime · multiplayer',
  stack: 'C++17 · HTML5 Canvas · WebSocket',
  desc: 'Real-time multiplayer tower defence with a C++ WebSocket game server, HTML5 Canvas frontend, and a JSON-based client-server protocol. The least forgiving WebSocket use-case there is: low latency, high frequency, no excuses.'
}, {
  num: '022',
  name: 'Thread-safe C++ Music Library',
  cat: 'systems · c++17',
  stack: 'C++17 · std::thread',
  desc: 'High-performance, thread-safe music library with fuzzy and regex search, full metadata support, and the kind of locking discipline that means the readme is shorter than the locks themselves.'
}];

/* ============ WORKSHOP FEATURE ============ */
var WORKSHOP_TOOLS = [{
  name: 'agent-harness',
  role: 'the rules',
  line: 'A tier ladder that scales review with blast radius, guarded worktree tooling, and an experimental replay lab for checking policy changes.',
  links: [{
    label: 'repo',
    href: 'https://github.com/Chris0Jeky/agent-harness'
  }]
}, {
  name: 'estate-atlas',
  role: 'the map',
  line: 'Components, contracts and flows in one JSON file, each claim proven against git, real traffic laid over the flows, drawn as an offline HTML atlas.',
  links: [{
    label: 'repo',
    href: 'https://github.com/Chris0Jeky/estate-atlas'
  }]
}, {
  name: 'Pulseboard',
  role: 'the pulse',
  line: 'Product signals, synthetic probes and release context in one desk, producing an evidence-backed next check instead of a score. Runs on Cloudflare Workers and D1.',
  links: [{
    label: 'desk',
    href: 'https://pulseboard-observatory.commit-atlas.workers.dev'
  }, {
    label: 'repo',
    href: 'https://github.com/Chris0Jeky/Pulseboard'
  }]
}, {
  name: 'CommitAtlas',
  role: 'the public view',
  line: 'GitHub analytics and a portfolio Studio where every reading names its source, window and freshness, and stale data is marked stale.',
  links: [{
    label: 'studio',
    href: 'https://commit-atlas.commit-atlas.workers.dev/studio'
  }, {
    label: 'repo',
    href: 'https://github.com/Chris0Jeky/CommitAtlas'
  }]
}];
function WorkshopFeature() {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      borderTop: '1px solid var(--rule)',
      paddingTop: 32
    }
  }, /*#__PURE__*/React.createElement(FeatureHeader, {
    num: "048",
    name: "The Workshop",
    cat: "Open source \xB7 Agent operations \xB7 Evidence",
    years: "2026 \u2014 active",
    team: "four public repositories",
    tone: "teal"
  }), /*#__PURE__*/React.createElement("div", {
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
  }, "I run coding agents across a few dozen repositories, so one question comes up every day: when an agent (or I) changes something, how do we know it was right?", ' ', /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--teal)'
    }
  }, "The workshop"), " is the public half of my answer: four tools, each covering one part of it. ", /*#__PURE__*/React.createElement("strong", null, "agent-harness"), " sets the rules, so a sandbox runs free and a production repository earns extra checks.", ' ', /*#__PURE__*/React.createElement("strong", null, "estate-atlas"), " keeps the architecture map honest by proving it against git. ", /*#__PURE__*/React.createElement("strong", null, "Pulseboard"), " watches what actually ships, and", ' ', /*#__PURE__*/React.createElement("strong", null, "CommitAtlas"), " shows the public side."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "Each one produces evidence and says plainly what it does not know, which turns out to be the hard part. They are small (standard-library Python or a few edge services) and built alongside the agents they keep in line.")), /*#__PURE__*/React.createElement("div", {
    className: "term"
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ cat workshop.rules"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " checks scale with ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "blast radius"), "; a sandbox runs free."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " a map nobody can prove against git is a ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "rumour"), "."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " stale data is labelled ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "stale"), ", never painted healthy."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " evidence first; the ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "verdict"), " stays with a person."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 24,
      marginTop: 32
    }
  }, WORKSHOP_TOOLS.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t.name,
      style: {
        border: '1px solid var(--rule)',
        padding: '16px 18px',
        background: 'var(--paper-2)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 24,
        fontWeight: 400,
        letterSpacing: '-0.01em',
        margin: 0
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      className: "label",
      style: {
        color: 'var(--teal)'
      }
    }, t.role)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 13.5,
        color: 'var(--ink-dim)',
        lineHeight: 1.55,
        marginTop: 8
      }
    }, t.line), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 11,
        marginTop: 10,
        display: 'flex',
        gap: 14,
        flexWrap: 'wrap'
      }
    }, t.links.map(function (l) {
      return /*#__PURE__*/React.createElement("a", {
        key: l.href,
        href: l.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "".concat(t.name, ": ").concat(l.label, " (opens in a new tab)"),
        style: {
          color: 'var(--teal)'
        }
      }, "\u2192 ", l.label);
    })));
  })));
}

/* ============ METRIX FEATURE ============ */
function MetrixFeature() {
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement(FeatureHeader, {
    num: "042",
    name: "Metrix",
    cat: "Finance \xB7 SaaS Platform",
    years: "2025 \u2014 building",
    team: "~5 contributors \xB7 ~3,144 commits",
    tone: "rouge"
  }), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "Metrix"), " is the ambitious one. A full-stack SaaS where users define options-trading strategies, run backtests against historical data, get live signals, and subscribe to other people's published \"systems\" \u2014 each a first-class object combining a strategy, a backtest, and an audit trail you can\xA0subscribe\xA0to. Roughly the most opinionated backtester I've ever helped build."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "The architecture is dual-database by design: a legacy, read-only", ' ', /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14,
      background: 'var(--paper-3)',
      padding: '0 4px'
    }
  }, "staticprofit"), ' ', "holds the historical options universe and is treated as immutable scripture; a fresh, read/write", ' ', /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14,
      background: 'var(--paper-3)',
      padding: '0 4px'
    }
  }, "options_backtest_platform"), ' ', "owns everything we ship. Backend is FastAPI / SQLAlchemy 2.0 / Pydantic. Frontend is React 18 / TypeScript / TanStack Query + Table / Apache ECharts / Tailwind. The server is allowed to be wrong, briefly \u2014 the client\xA0is\xA0not."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "Phase 10 added a full AI assistant chat: ", /*#__PURE__*/React.createElement("strong", null, "LLM tool orchestration"), ", prompt management, conversation persistence, and live WebSocket status updates while the assistant is actually doing work. Multi-provider, config-gated, and \u2014 importantly \u2014 a tool, not a co-worker."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, ['Python 3.11', 'FastAPI', 'SQLAlchemy 2.0', 'Pydantic', 'MySQL ×2', 'React 18', 'TypeScript', 'TanStack Query', 'TanStack Table', 'ECharts', 'Tailwind', 'Vite', 'WebSocket', 'LLM tools'].map(function (s) {
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
  }))), /*#__PURE__*/React.createElement(BacktestDemo, null)), /*#__PURE__*/React.createElement("div", {
    className: "term",
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ tail -f architecture.notes"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " dual-db keeps legacy data ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "immutable"), " and platform state ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "portable"), "."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " tanstack-query is the system of record on the client; the server is allowed to be wrong, briefly."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " systems are first-class objects: a strategy + a backtest + an audit trail you can subscribe to."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " phase 10: full ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "AI assistant chat"), " \u2014 LLM-powered, tool orchestration, prompt mgmt, conversation persistence, WebSocket status during tool runs."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " next: collaborative strategy editing without merging headaches. (TBD: hopeful.)")));
}
function BacktestDemo() {
  var _useState = useState(10),
    _useState2 = _slicedToArray(_useState, 2),
    fast = _useState2[0],
    setFast = _useState2[1];
  var _useState3 = useState(40),
    _useState4 = _slicedToArray(_useState3, 2),
    slow = _useState4[0],
    setSlow = _useState4[1];
  var _useState5 = useState(50),
    _useState6 = _slicedToArray(_useState5, 2),
    vol = _useState6[0],
    setVol = _useState6[1];

  // generative strategy result based on inputs
  var data = useMemo(function () {
    var N = 120;
    var seed = (fast * 31 + slow * 7 + vol * 13) % 1000;
    var rand = function rand(i) {
      var x = Math.sin(seed + i * 1.7) * 10000;
      return x - Math.floor(x);
    };
    var series = [100];
    for (var i = 1; i < N; i++) {
      var trend = (fast - slow) / 80;
      var noise = (rand(i) - 0.5) * (vol / 25);
      series.push(Math.max(50, series[i - 1] * (1 + trend * 0.005 + noise * 0.012)));
    }
    return series;
  }, [fast, slow, vol]);
  var start = data[0],
    end = data[data.length - 1];
  var pct = (end - start) / start * 100;
  var max = Math.max.apply(Math, _toConsumableArray(data));
  var min = Math.min.apply(Math, _toConsumableArray(data));
  var dd = (min - max) / max * 100;
  return /*#__PURE__*/React.createElement("div", {
    "data-tilt": true,
    style: {
      border: '1.5px solid var(--rule)',
      boxShadow: '4px 4px 0 var(--rouge)',
      background: 'var(--paper-2)',
      padding: 0
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
      color: pct > 0 ? 'var(--forest)' : 'var(--rouge)'
    },
    className: "pulse"
  }, "\u25CF"), " LIVE BACKTEST \xB7 MA-CROSS"), /*#__PURE__*/React.createElement("span", null, "SAMPLE \xB7 NOT FINANCIAL ADVICE")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      fontSize: 9
    }
  }, "RETURN"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 32,
      fontWeight: 400,
      color: pct > 0 ? 'var(--forest)' : 'var(--rouge)',
      lineHeight: 1,
      letterSpacing: '-0.02em'
    }
  }, pct > 0 ? '+' : '', pct.toFixed(1), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      fontSize: 9
    }
  }, "MAX DD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14,
      color: 'var(--ink-2)'
    }
  }, dd.toFixed(1), "%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80,
      color: pct > 0 ? 'var(--forest)' : 'var(--rouge)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Sparkline, {
    data: data,
    color: "currentColor",
    height: 80
  })), /*#__PURE__*/React.createElement(ParamRow, {
    label: "Fast MA",
    value: fast,
    min: 2,
    max: 30,
    unit: "d",
    onChange: setFast
  }), /*#__PURE__*/React.createElement(ParamRow, {
    label: "Slow MA",
    value: slow,
    min: 20,
    max: 120,
    unit: "d",
    onChange: setSlow
  }), /*#__PURE__*/React.createElement(ParamRow, {
    label: "Volatility",
    value: vol,
    min: 10,
    max: 100,
    unit: "\xB7",
    onChange: setVol
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--rule)',
      padding: '10px 16px',
      background: 'var(--paper-3)',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-mute)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "Fig. 3 \u2014 toy demo of the real thing. Drag the sliders."));
}
function ParamRow(_ref) {
  var label = _ref.label,
    value = _ref.value,
    min = _ref.min,
    max = _ref.max,
    _onChange = _ref.onChange,
    unit = _ref.unit;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-dim)',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink)'
    }
  }, value, unit)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    value: value,
    onChange: function onChange(e) {
      return _onChange(+e.target.value);
    }
  }));
}

/* ============ TASKDECK FEATURE ============ */
function TaskdeckFeature() {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      borderTop: '1px solid var(--rule)',
      paddingTop: 32
    }
  }, /*#__PURE__*/React.createElement(FeatureHeader, {
    num: "041",
    name: "Taskdeck",
    cat: "Local-first Devtool \xB7 Clean Architecture",
    years: "2025 \u2014 active",
    team: "solo \xB7 5,300+ commits \xB7 620+ PRs \xB7 9,799 tests \xB7 21 ADRs",
    tone: "forest"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
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
      color: 'var(--forest)'
    }
  }, "Taskdeck"), " exists because most \"AI productivity tools\" mutate your data first and apologise later. Taskdeck does the opposite. The loop is", ' ', /*#__PURE__*/React.createElement("strong", null, "Capture \u2192 Triage \u2192 Review \u2192 Apply"), ":", ' ', "you paste anything (an email, a voice-note transcript, a checklist dump), it generates a structured ", /*#__PURE__*/React.createElement("em", null, "proposal diff"), " of what would change on your board, and ", /*#__PURE__*/React.createElement("strong", null, "nothing actually changes"), " until you click \"apply.\" No silent mutations, no surprise cards, no\xA0autopilot."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, "Backend is .NET 8 ASP.NET Core + EF Core + SQLite, structured as a strict four-layer Clean Architecture (Domain \u2192 Application \u2192 Infrastructure \u2192 Api) with ", /*#__PURE__*/React.createElement("strong", null, "architecture tests mechanically enforcing layer purity"), "\u2014 forbidden imports caught in CI before merge. Frontend is Vue 3 + TypeScript + Pinia + Vite + Tailwind. Realtime via SignalR with claims-derived authorisation. ", /*#__PURE__*/React.createElement("strong", null, "9,799 tests"), " total: 6,532 backend (incl. FsCheck property tests + fuzz tests), 3,267 frontend unit + integration, plus 24 Playwright E2E and k6 load profiles. CI ships CycloneDX SBOMs and SLSA provenance."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, "LLM is multi-provider behind ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14,
      background: 'var(--paper-3)',
      padding: '0 4px'
    }
  }, "ILlmProvider"), ": Mock (deterministic, default), OpenAI GPT-4o-mini, Gemini 2.5 Flash \u2014 config-gated, never on by accident. The chat-to-proposal pipeline asks the model for structured JSON, parses to planner calls, and falls back to a static regex-based intent classifier when parsing fails. The LLM is a tool, not a coworker."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, "Three workspace modes (", /*#__PURE__*/React.createElement("em", null, "guided"), " / ", /*#__PURE__*/React.createElement("em", null, "workbench"), " / ", /*#__PURE__*/React.createElement("em", null, "agent"), "), partitioned rate limiting, full OWASP baseline (CSP, X-Frame-Options, HSTS), OpenTelemetry instrumentation, and an MCP server for tool extensibility. The kind of plumbing you usually have to apologise for shipping without."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: 14,
      background: 'var(--paper-2)',
      border: '1px solid var(--rule)',
      borderLeft: '4px solid var(--forest)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 6,
      color: 'var(--forest)'
    }
  }, "What Taskdeck is NOT"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2715"), " not a cloud SaaS (yet)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2715"), " not a team platform (single user, on purpose)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u2715"), " not an autonomous AI agent"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, ['.NET 8', 'EF Core', 'SQLite', 'Vue 3', 'TypeScript', 'Pinia', 'Tailwind', 'SignalR', 'MCP', 'OpenTelemetry', 'CycloneDX SBOM', 'xUnit', 'FsCheck', 'k6', 'Playwright'].map(function (s) {
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
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "https://github.com/Chris0Jeky/Taskdeck",
    target: "_blank",
    rel: "noopener",
    "data-pb-project": "taskdeck",
    "data-pb-link": "repo",
    style: {
      borderColor: 'var(--forest)',
      color: 'var(--forest)'
    }
  }, "\u2197 Repo"), /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "#contact"
  }, "\u25B7 Beta interest"))), /*#__PURE__*/React.createElement(TaskdeckMock, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 10
    }
  }, "Fig. 5 \u2014 Taskdeck's repo invariants \xB7 ", /*#__PURE__*/React.createElement("em", null, "10 Golden Principles")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px solid var(--rule)',
      background: 'var(--paper-2)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px 32px'
    }
  }, TASKDECK_GPS.map(function (gp) {
    return /*#__PURE__*/React.createElement("div", {
      key: gp.id,
      style: {
        display: 'grid',
        gridTemplateColumns: '64px 1fr',
        gap: 10,
        alignItems: 'baseline',
        padding: '6px 0',
        borderBottom: '1px dashed var(--rule)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: 'var(--forest)',
        fontWeight: 700,
        letterSpacing: '0.08em'
      }
    }, gp.id), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 14,
        fontWeight: 500,
        color: 'var(--ink)',
        letterSpacing: '-0.005em'
      }
    }, gp.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 11.5,
        color: 'var(--ink-dim)',
        lineHeight: 1.4,
        marginTop: 2
      }
    }, gp.body)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: '1px solid var(--rule)',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-mute)'
    }
  }, "// mechanically enforced by check-golden-principles.mjs. yes, the principles themselves have a CI check."))));
}
function TaskdeckMock() {
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    tick = _useState8[0],
    setTick = _useState8[1];
  var LOG_LINES = [{
    t: '14:02:11',
    lvl: 'ok',
    msg: 'proposal #4811 applied · 3 cards moved'
  }, {
    t: '14:02:09',
    lvl: 'dim',
    msg: 'audit.append → boards/jeky/audit.jsonl'
  }, {
    t: '14:01:58',
    lvl: 'warn',
    msg: 'reviewer touched 2 fields · re-validating'
  }, {
    t: '14:01:42',
    lvl: 'cyan',
    msg: 'llm: mock → parsed 1 instruction in 4ms'
  }, {
    t: '14:01:30',
    lvl: 'ok',
    msg: 'capture 0x7f · classified → triage'
  }, {
    t: '14:01:18',
    lvl: 'dim',
    msg: 'signalR · 1 client subscribed'
  }, {
    t: '14:00:55',
    lvl: 'rouge',
    msg: 'rejected · stale baseline · no apply'
  }, {
    t: '14:00:41',
    lvl: 'ok',
    msg: 'GP-06 check passed · proposal-first ✓'
  }, {
    t: '14:00:22',
    lvl: 'cyan',
    msg: 'CI · 9,799 tests · 0 failed · 38.2s'
  }];
  useEffect(function () {
    var id = setInterval(function () {
      return setTick(function (t) {
        return (t + 1) % LOG_LINES.length;
      });
    }, 1700);
    return function () {
      return clearInterval(id);
    };
  }, []);
  var visible = [];
  for (var i = 0; i < 5; i++) {
    visible.push(LOG_LINES[(tick + i) % LOG_LINES.length]);
  }
  var lvlColor = {
    ok: 'var(--term-green)',
    warn: 'var(--term-amber)',
    cyan: 'var(--term-cyan)',
    rouge: 'var(--term-red)',
    dim: 'var(--term-dim)'
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-tilt": true,
    style: {
      background: 'var(--term-bg)',
      color: 'var(--term-fg)',
      border: '1px solid #000',
      boxShadow: '6px 6px 0 var(--forest)',
      fontFamily: 'var(--mono)',
      fontSize: 12,
      alignSelf: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 12px',
      borderBottom: '1px solid #1a2329',
      color: 'var(--term-dim)',
      fontSize: 10,
      letterSpacing: '0.1em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "TASKDECK \xB7 LOCAL \xB7 v0.4"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-green)'
    }
  }, "\u25CF"), " SYNCED \xB7 OFFLINE")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 1,
      background: '#1a2329'
    }
  }, [{
    title: 'CAPTURE',
    items: ['~ refactor scan stage', '~ write up case study', '~ retire jenkins-prod-2']
  }, {
    title: 'PROPOSED',
    items: ['+ add audit trail', '+ rename pipeline-77', '− deprecate legacy-aws-key'],
    badge: '3'
  }, {
    title: 'APPLIED',
    items: ['✓ rotate scan secrets', '✓ split deploy stage', '✓ ship taskdeck v0.4']
  }].map(function (col) {
    return /*#__PURE__*/React.createElement("div", {
      key: col.title,
      style: {
        background: 'var(--term-bg)',
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--term-amber)',
        letterSpacing: '0.12em',
        fontSize: 10
      }
    }, col.title), col.badge && /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'var(--term-amber)',
        color: '#000',
        fontSize: 9,
        padding: '0 5px'
      }
    }, col.badge)), col.items.map(function (it, i) {
      var sign = it[0];
      var color = sign === '+' ? 'var(--term-green)' : sign === '−' ? 'var(--term-red)' : sign === '✓' ? 'var(--term-dim)' : 'var(--term-fg)';
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          borderLeft: "2px solid ".concat(color),
          paddingLeft: 8,
          marginBottom: 8,
          color: color,
          fontSize: 11.5,
          lineHeight: 1.4
        }
      }, it);
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #1a2329',
      padding: '10px 14px',
      background: 'rgba(0,0,0,0.18)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)',
      letterSpacing: '0.14em',
      fontSize: 9
    }
  }, "$ tail -f ~/taskdeck.audit"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-dim)',
      fontSize: 9,
      letterSpacing: '0.1em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-green)'
    },
    className: "pulse"
  }, "\u25CF"), " LIVE")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4
    }
  }, visible.map(function (l, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: "".concat(tick, "-").concat(i),
      style: {
        display: 'grid',
        gridTemplateColumns: '70px 1fr',
        gap: 10,
        fontSize: 11,
        lineHeight: 1.45,
        opacity: 1 - i * 0.18,
        transition: 'opacity 0.6s'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--term-mute)'
      }
    }, l.t), /*#__PURE__*/React.createElement("span", {
      style: {
        color: lvlColor[l.lvl]
      }
    }, l.msg, i === 0 ? /*#__PURE__*/React.createElement("span", {
      className: "blink",
      style: {
        color: 'var(--term-fg)'
      }
    }, "\u258D") : null));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #1a2329',
      padding: '10px 14px',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--term-dim)',
      fontSize: 9,
      letterSpacing: '0.14em',
      marginBottom: 4
    }
  }, "CI \xB7 LAST 24 BUILDS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2,
      height: 22
    }
  }, Array.from({
    length: 24
  }, function (_, i) {
    var seed = Math.sin(i * 1.7) * 10000;
    var h = 6 + Math.abs(seed - Math.floor(seed)) * 16;
    var failed = i === 7 || i === 18;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: 4,
        height: h,
        background: failed ? 'var(--term-red)' : 'var(--term-green)',
        opacity: 0.55 + i / 24 * 0.45
      }
    });
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--term-green)',
      fontFamily: 'var(--mono)',
      fontSize: 16
    }
  }, "91.6%"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--term-mute)',
      fontSize: 9,
      letterSpacing: '0.1em'
    }
  }, "GREEN BUILDS"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 12px',
      borderTop: '1px solid #1a2329',
      fontSize: 10,
      color: 'var(--term-mute)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u2318 K"), " capture \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u2318 \u21A9"), " apply \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-amber)'
    }
  }, "\u2318 Z"), " reject"), /*#__PURE__*/React.createElement("span", null, "local \xB7 ~/taskdeck.db")));
}

/* ============ N-IPD FEATURE — live simulation ============ */
function IPDFeature() {
  var _useState9 = useState(8),
    _useState0 = _slicedToArray(_useState9, 2),
    n = _useState0[0],
    setN = _useState0[1]; // number of agents
  var _useState1 = useState(0.3),
    _useState10 = _slicedToArray(_useState1, 2),
    defectorRatio = _useState10[0],
    setDefectorRatio = _useState10[1];
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    round = _useState12[0],
    setRound = _useState12[1];
  var _useState13 = useState(true),
    _useState14 = _slicedToArray(_useState13, 2),
    running = _useState14[0],
    setRunning = _useState14[1];
  var _useState15 = useState(function () {
      return initAgents(8, 0.3);
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    grid = _useState16[0],
    setGrid = _useState16[1];
  var _useState17 = useState([0.7]),
    _useState18 = _slicedToArray(_useState17, 2),
    coopHistory = _useState18[0],
    setCoopHistory = _useState18[1];
  function initAgents(nn, dRatio) {
    return Array.from({
      length: nn * nn
    }, function () {
      return Math.random() > dRatio ? 'C' : 'D';
    });
  }

  // Reset when params change
  useEffect(function () {
    setGrid(initAgents(n, defectorRatio));
    setRound(0);
    setCoopHistory([1 - defectorRatio]);
  }, [n, defectorRatio]);

  // Tick simulation
  useEffect(function () {
    if (!running) return;
    var t = setInterval(function () {
      setGrid(function (g) {
        return stepAgents(g, n);
      });
      setRound(function (r) {
        return r + 1;
      });
    }, 800);
    return function () {
      return clearInterval(t);
    };
  }, [running, n]);

  // Track cooperation rate
  useEffect(function () {
    var coop = grid.filter(function (c) {
      return c === 'C';
    }).length / grid.length;
    setCoopHistory(function (h) {
      return [].concat(_toConsumableArray(h.slice(-39)), [coop]);
    });
  }, [round]);
  function stepAgents(g, nn) {
    // Tit-for-Tat-ish: each cell looks at neighbors. If majority defect, defect. Else cooperate.
    return g.map(function (cell, i) {
      var r = Math.floor(i / nn),
        c = i % nn;
      var neighbors = [];
      for (var dr = -1; dr <= 1; dr++) {
        for (var dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          var rr = (r + dr + nn) % nn;
          var cc = (c + dc + nn) % nn;
          neighbors.push(g[rr * nn + cc]);
        }
      }
      var dCount = neighbors.filter(function (x) {
        return x === 'D';
      }).length;
      // Slight noise + payoff bias toward dominant strategy
      if (dCount >= 5) return Math.random() < 0.85 ? 'D' : 'C';
      if (dCount <= 2) return Math.random() < 0.9 ? 'C' : 'D';
      return cell;
    });
  }
  var cellSize = 18;
  var coopRate = grid.filter(function (c) {
    return c === 'C';
  }).length / grid.length;
  return /*#__PURE__*/React.createElement("article", {
    style: {
      borderTop: '1px solid var(--rule)',
      paddingTop: 32
    }
  }, /*#__PURE__*/React.createElement(FeatureHeader, {
    num: "031",
    name: "N-Person Prisoner's Dilemma",
    cat: "Research \xB7 Springer \xB7 SGAI-AI 2025",
    years: "2023\u20132025 \xB7 published",
    team: "lead author \xB7 presented",
    tone: "gold"
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
      color: 'var(--gold)'
    }
  }, "NPDL"), " \u2014 the N-Person Prisoner's Dilemma Learning framework \u2014 is a research codebase and accompanying paper exploring ", /*#__PURE__*/React.createElement("em", null, "cooperation emergence"), " in repeated multi-agent games. ", /*#__PURE__*/React.createElement("strong", null, "Published in Springer proceedings at SGAI-AI 2025"), ", lead author, presented at conference."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, "Twelve-plus strategies, from classical reactive policies (Tit-for-Tat, Pavlov, Generous TFT) to reinforcement learners (Q-Learning, Hysteretic-Q, WOLF-PHC, LRA-Q, UCB1-Q). Five network topologies (fully-connected, small-world, scale-free, random, regular). Two interaction modes (neighbourhood and pairwise). An evolutionary scenario generator that ranks results by an ", /*#__PURE__*/React.createElement("em", null, "\"interestingness score\""), " \u2014 a composite metric that explicitly rewards dynamics over flat equilibria, because watching everyone cooperate forever is not science, it's a screensaver."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--ink-2)'
    }
  }, "The fun part is watching cooperation collapse and re-emerge in islands. It's the same instinct behind WealthLens: ", /*#__PURE__*/React.createElement("em", null, "trust spreads locally, defection spreads in clusters, and a good system makes the cost of defection visible to everyone.")), /*#__PURE__*/React.createElement("pre", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      lineHeight: 1.6,
      color: 'var(--ink-2)',
      background: 'var(--paper-3)',
      padding: 16,
      borderLeft: '3px solid var(--rouge)',
      margin: '20px 0',
      overflow: 'auto'
    }
  }, "@inproceedings{tcaci_nipd_2025,\n  title     = \"Navigating the N-Person Prisoners' Dilemma\",\n  author    = \"Tcaci, C.\",\n  booktitle = \"SGAI-AI 2025\",\n  publisher = \"Springer\",\n  year      = 2025,\n  note      = \"lead author \xB7 presented at conference\"\n}"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stamp",
    style: {
      color: 'var(--gold)'
    }
  }, "Springer 2025"), ['Python', 'PyTorch', 'NumPy', 'NetworkX', 'Plotly Dash', 'Game Theory', 'MARL'].map(function (s) {
    return /*#__PURE__*/React.createElement("span", {
      key: s,
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 11,
        padding: '3px 8px',
        border: '1px solid var(--rule)'
      }
    }, s);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "https://github.com/Chris0Jeky/N-person-prisoners-dilemma-simulation",
    target: "_blank",
    rel: "noopener",
    "data-pb-project": "npdl",
    "data-pb-link": "repo",
    style: {
      borderColor: 'var(--gold)',
      color: 'var(--gold)'
    }
  }, "\u2197 NPDL repo"))), /*#__PURE__*/React.createElement("div", {
    "data-tilt": true,
    style: {
      background: 'var(--term-bg)',
      color: 'var(--term-fg)',
      border: '1px solid #000',
      boxShadow: '6px 6px 0 var(--gold)',
      padding: 18,
      fontFamily: 'var(--mono)',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 12,
      color: 'var(--term-dim)',
      letterSpacing: '0.12em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "IPD.LIVE \xB7 GRID ", n, "\xD7", n), /*#__PURE__*/React.createElement("span", null, "round ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-fg)'
    }
  }, round.toString().padStart(3, '0')))), /*#__PURE__*/React.createElement("div", {
    "data-keep-grid": true,
    style: {
      display: 'grid',
      gridTemplateColumns: "repeat(".concat(n, ", 1fr)"),
      gap: 2,
      marginBottom: 12,
      aspectRatio: '1 / 1'
    }
  }, grid.map(function (cell, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: cell === 'C' ? 'var(--term-green)' : 'var(--term-red)',
        opacity: cell === 'C' ? 0.85 : 0.85,
        transition: 'background 0.5s'
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-green)'
    }
  }, "\u25CF cooperate ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-fg)'
    }
  }, (coopRate * 100).toFixed(0), "%")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-red)'
    }
  }, "\u25CF defect ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--term-fg)'
    }
  }, ((1 - coopRate) * 100).toFixed(0), "%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30,
      color: 'var(--term-cyan)',
      marginBottom: 12
    }
  }, coopHistory.length > 1 && /*#__PURE__*/React.createElement(Sparkline, {
    data: coopHistory,
    color: "currentColor",
    height: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px dashed var(--term-mute)',
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6,
      color: 'var(--term-dim)'
    }
  }, "Population"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "4",
    max: "14",
    value: n,
    onChange: function onChange(e) {
      return setN(+e.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '10px 0 6px',
      color: 'var(--term-dim)'
    }
  }, "Initial defectors ", (defectorRatio * 100).toFixed(0), "%"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "100",
    value: defectorRatio * 100,
    onChange: function onChange(e) {
      return setDefectorRatio(+e.target.value / 100);
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    style: {
      marginTop: 12,
      background: 'transparent',
      borderColor: 'var(--term-amber)',
      color: 'var(--term-amber)',
      fontSize: 10,
      padding: '6px 12px'
    },
    onClick: function onClick() {
      return setRunning(function (r) {
        return !r;
      });
    }
  }, running ? '⏸ pause' : '▷ run'), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    style: {
      marginTop: 12,
      marginLeft: 8,
      background: 'transparent',
      borderColor: 'var(--term-dim)',
      color: 'var(--term-dim)',
      fontSize: 10,
      padding: '6px 12px'
    },
    onClick: function onClick() {
      setGrid(initAgents(n, defectorRatio));
      setRound(0);
    }
  }, "\u21BA reset")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      padding: '10px 16px',
      background: 'var(--paper-3)',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-dim)',
      borderLeft: '3px solid var(--rouge)'
    }
  }, "Fig. 4 \u2014 toy version of the simulation. The paper covers actual strategies, payoffs, and emergence conditions. This is the GIF of it."));
}

/* ============ Shared bits ============ */
function FeatureHeader(_ref2) {
  var num = _ref2.num,
    name = _ref2.name,
    cat = _ref2.cat,
    years = _ref2.years,
    team = _ref2.team,
    tone = _ref2.tone;
  var color = tone === 'rouge' ? 'var(--rouge)' : tone === 'forest' ? 'var(--forest)' : tone === 'gold' ? 'var(--gold)' : tone === 'teal' ? 'var(--teal)' : 'var(--ink)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 1fr auto',
      gap: 24,
      alignItems: 'baseline',
      borderBottom: '2px solid var(--rule)',
      paddingBottom: 12,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      color: color
    }
  }, "\u2116 ", num), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 52,
      fontWeight: 400,
      letterSpacing: '-0.025em',
      margin: 0,
      lineHeight: 1,
      color: color
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginTop: 6
    }
  }, cat)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, years), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginTop: 4
    }
  }, team)));
}
function CatalogRow(_ref3) {
  var num = _ref3.num,
    name = _ref3.name,
    cat = _ref3.cat,
    stack = _ref3.stack,
    desc = _ref3.desc,
    links = _ref3.links;
  var _useState19 = useState(false),
    _useState20 = _slicedToArray(_useState19, 2),
    hover = _useState20[0],
    setHover = _useState20[1];
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: '60px 1fr 1.4fr 180px',
      gap: 24,
      padding: '18px 0',
      borderTop: '1px solid var(--rule)',
      alignItems: 'baseline',
      background: hover ? 'var(--paper-2)' : 'transparent',
      transition: 'background 0.15s',
      cursor: 'default',
      paddingLeft: hover ? 12 : 0,
      paddingRight: hover ? 12 : 0,
      margin: hover ? '0 -12px' : '0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-mute)'
    }
  }, "\u2116 ", num), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 26,
      letterSpacing: '-0.01em',
      color: hover ? 'var(--rouge)' : 'var(--ink)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginTop: 4
    }
  }, cat)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--sans)',
      fontSize: 13.5,
      color: 'var(--ink-dim)',
      lineHeight: 1.55
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-dim)'
    }
  }, stack), links ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      marginTop: 4,
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    }
  }, links.map(function (l) {
    return /*#__PURE__*/React.createElement("a", {
      key: l.href,
      href: l.href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "".concat(name, ": ").concat(l.label, " (opens in a new tab)"),
      style: {
        color: hover ? 'var(--teal)' : 'var(--ink-dim)'
      }
    }, "\u2192 ", l.label);
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: hover ? 'var(--rouge)' : 'var(--ink-mute)',
      marginTop: 4
    }
  }, hover ? '→ open' : 'idle')));
}
