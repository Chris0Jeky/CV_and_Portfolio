/* Generated from portfolio/wealthlens.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
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
/* global React, Sparkline */
var _React = React,
  useState = _React.useState,
  useMemo = _React.useMemo,
  useEffect = _React.useEffect;
window.WealthLensFeature = function WealthLensFeature() {
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement(FeatureHeader, {
    num: "043",
    name: "WealthLens",
    cat: "Civic Data \xB7 Open Source \xB7 MIT + CC-BY",
    years: "2025 \u2014 building",
    team: "sole architect \xB7 260+ PRs \xB7 830+ commits \xB7 874 tests",
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
  }, /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--teal)'
    }
  }, "WealthLens UK"), " is the one I can't stop working on. An open-source platform that pulls UK wealth and inequality data from official sources \u2014 ONS, HMRC, the World Inequality Database, the Bank of England, DWP, Resolution Foundation \u2014 and turns it into cited, embeddable, mobile-responsive chart pages that anyone can share. Built because UK household wealth is roughly ", /*#__PURE__*/React.createElement("strong", null, "\xA317 trillion"), " \u2014 about seven times GDP \u2014 and most people have no idea what that distribution looks like."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "Ten datasets. Ten chart articles. Ten automated Python pipelines. Every number cites its source URL and access date. Every transformation is reproducible from a script you can read. Nothing is fabricated, nothing is paraphrased, nothing is paywalled. Mobile-responsive, WCAG AA, dark mode, PWA-ready, no tracking, no opinion-as-data \u2014 just the receipts."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "The architecture is the boring half of civic tech, done right.", ' ', /*#__PURE__*/React.createElement("strong", null, "FastAPI"), " serves paginated JSON and streaming CSV with HTTP caching, freshness tracking, and eight documented endpoints under", ' ', /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14,
      background: 'var(--paper-3)',
      padding: '0 4px'
    }
  }, "/api/data/*"), ".", ' ', /*#__PURE__*/React.createElement("strong", null, "Vue 3 + TypeScript"), " with Pinia state, Tailwind, Vite, and", ' ', /*#__PURE__*/React.createElement("strong", null, "D3.js"), " for charts that don't feel like a vendor template. Data pipelines in Python 3.11 with Pandas, validated and run weekly by GitHub Actions. Deployed to Pages. Backstopped by", ' ', /*#__PURE__*/React.createElement("strong", null, "874 passing tests"), " (156 root \xB7 135 backend \xB7 583 frontend) and a CI matrix of ruff, mypy, bandit, vue-tsc and vitest. ", /*#__PURE__*/React.createElement("em", null, "The boring half of \"open civic data\" is exactly why most attempts at it stop after one chart.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, ['Python 3.11', 'FastAPI', 'Pydantic', 'Pandas', 'Vue 3', 'TypeScript', 'Pinia', 'D3.js', 'Tailwind', 'Vite', 'GitHub Actions', 'SQLite → Postgres'].map(function (s) {
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
      marginTop: 24,
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "https://chris0jeky.github.io/wealthlens-hq/",
    target: "_blank",
    rel: "noopener",
    "data-pb-project": "wealthlens",
    "data-pb-link": "site",
    style: {
      borderColor: 'var(--teal)',
      color: 'var(--teal)'
    }
  }, "\u25B7 Live site"), /*#__PURE__*/React.createElement("a", {
    className: "btn",
    href: "https://github.com/Chris0Jeky/wealthlens-hq",
    target: "_blank",
    rel: "noopener",
    "data-pb-project": "wealthlens",
    "data-pb-link": "repo",
    style: {
      borderColor: 'var(--teal)',
      color: 'var(--teal)'
    }
  }, "\u2197 Repo")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontFamily: 'var(--sans)',
      fontSize: 11,
      color: 'var(--ink-dim)',
      letterSpacing: '0.05em'
    }
  }, "Conversations in progress with ", /*#__PURE__*/React.createElement("em", null, "Tax Justice UK"), ", ", /*#__PURE__*/React.createElement("em", null, "Equality Trust"), ", and ", /*#__PURE__*/React.createElement("em", null, "Patriotic Millionaires UK"), ". Code MIT, charts CC-BY 4.0.")), /*#__PURE__*/React.createElement(ChartArticleMock, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 10
    }
  }, "Fig. 6 \u2014 current catalogue \xB7 10 cited datasets"), /*#__PURE__*/React.createElement(ChartCatalogue, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(WealthCalc, null)), /*#__PURE__*/React.createElement("div", {
    className: "term",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ tail -f architecture.notes"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " every chart cites its source. ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "no exceptions."), " if a number can't link back to ons/hmrc/wid/boe/dwp, it doesn't ship."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " pipelines re-fetch weekly. freshness tracked: ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "fresh \u22647d"), " ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "\xB7"), " ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "stale \u226430d"), " ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "\xB7"), " ", /*#__PURE__*/React.createElement("span", {
    className: "err"
  }, "expired >30d")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " the backend is an api, not a monolith. paginated JSON, streaming CSV, per-column metadata, descriptive stats, health checks."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " values: ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "data first, opinion second"), " \xB7 open source always \xB7 accessible by default \xB7 non-partisan."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " next: embed codes for journalists \xB7 social-share renderer \xB7 then internationalisation.")));
};

/* ============ Wealth percentile calculator ============ */
function WealthCalc() {
  // Approximate UK net household wealth percentile lookup (ONS WAS Round 7 inspired)
  // £ thousands → percentile (rough piecewise — illustrative, not authoritative)
  var ANCHORS = [[0, 5], [20, 15], [50, 25], [100, 35], [200, 50], [350, 60], [550, 70], [850, 80], [1300, 90], [2500, 95], [5000, 98], [10000, 99], [25000, 99.7], [100000, 99.95]];
  function pctFor(k) {
    if (k <= 0) return 1;
    for (var i = 0; i < ANCHORS.length - 1; i++) {
      var _ANCHORS$i = _slicedToArray(ANCHORS[i], 2),
        k0 = _ANCHORS$i[0],
        p0 = _ANCHORS$i[1];
      var _ANCHORS = _slicedToArray(ANCHORS[i + 1], 2),
        k1 = _ANCHORS[0],
        p1 = _ANCHORS[1];
      if (k >= k0 && k <= k1) {
        var t = (k - k0) / (k1 - k0 || 1);
        return p0 + t * (p1 - p0);
      }
    }
    return 99.99;
  }
  var _useState = useState(150),
    _useState2 = _slicedToArray(_useState, 2),
    wealth = _useState2[0],
    setWealth = _useState2[1]; // £k
  var pct = pctFor(wealth);

  // Generate a rough Lorenz-style curve for visual context
  var curve = useMemo(function () {
    var N = 50;
    return Array.from({
      length: N
    }, function (_, i) {
      var p = i / (N - 1);
      // Skewed lognormal-ish wealth curve
      return Math.pow(p, 3.8) * 100;
    });
  }, []);
  var yourX = pct / 100;
  return /*#__PURE__*/React.createElement("div", {
    "data-tilt": true,
    style: {
      border: '1.5px solid var(--rule)',
      background: 'var(--paper-2)',
      boxShadow: '4px 4px 0 var(--teal)'
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
      color: 'var(--teal)'
    }
  }, "\u25CF"), " WEALTHLENS \xB7 personal percentile \xB7 UK"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-mute)'
    }
  }, "FIG. 7 \u2014 illustrative \xB7 ONS WAS shape")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 32,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 4
    }
  }, "Where do you actually sit?"), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 26,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      margin: '0 0 16px',
      lineHeight: 1.1
    }
  }, "UK net household wealth, ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--teal)'
    }
  }, "percentile lookup"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-dim)',
      marginBottom: 6
    }
  }, "Your household net wealth (incl. property, pensions, savings, minus debt)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 32,
      fontWeight: 400,
      color: 'var(--ink)'
    }
  }, "\xA3"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: wealth,
    onChange: function onChange(e) {
      return setWealth(Math.max(0, Math.min(1000000, +e.target.value || 0)));
    },
    style: {
      width: 140,
      border: 'none',
      borderBottom: '2px solid var(--rule)',
      background: 'transparent',
      fontFamily: 'var(--serif)',
      fontSize: 32,
      color: 'var(--rouge)',
      outline: 'none',
      padding: '2px 4px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-dim)'
    }
  }, "k")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 5000,
    step: 5,
    value: wealth,
    onChange: function onChange(e) {
      return setWealth(+e.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--mono)',
      fontSize: 9,
      color: 'var(--ink-mute)',
      letterSpacing: '0.05em',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA30"), /*#__PURE__*/React.createElement("span", null, "\xA3500k"), /*#__PURE__*/React.createElement("span", null, "\xA31M"), /*#__PURE__*/React.createElement("span", null, "\xA32.5M"), /*#__PURE__*/React.createElement("span", null, "\xA35M+")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: '14px 16px',
      background: 'var(--paper)',
      border: '1px solid var(--rule)',
      borderLeft: '4px solid var(--teal)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 4,
      color: 'var(--teal)'
    }
  }, "Your percentile"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'baseline',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 48,
      fontWeight: 400,
      color: 'var(--rouge)',
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, pct.toFixed(1)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 18,
      color: 'var(--ink-dim)'
    }
  }, "th")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      fontStyle: 'italic',
      color: 'var(--ink-2)',
      marginTop: 6,
      lineHeight: 1.5
    }
  }, pct < 50 ? "You sit below the UK median household. ".concat((100 - pct).toFixed(0), "% of households have more.") : pct < 90 ? "You sit above the UK median. ".concat((100 - pct).toFixed(0), "% of households have more wealth than you.") : pct < 99 ? "Top ".concat((100 - pct).toFixed(1), "% of UK households. Statistically: rare.") : "Top ".concat(Math.max(0.01, 100 - pct).toFixed(2), "%. The chart you're sitting on, at this scale, is mostly drawing you.")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 6
    }
  }, "UK wealth distribution \xB7 your position"), /*#__PURE__*/React.createElement(PercentileChart, {
    curve: curve,
    yourX: yourX,
    pct: pct
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: 'var(--mono)',
      fontSize: 9,
      color: 'var(--ink-mute)',
      letterSpacing: '0.05em'
    }
  }, "x = percentile \xB7 y = relative net wealth (illustrative shape, ONS WAS form)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px',
      borderTop: '1px solid var(--rule)',
      background: 'var(--paper-3)',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-mute)',
      letterSpacing: '0.05em'
    }
  }, "// not financial advice. not a tax form. just a rough mirror, the way an open civic dataset should be."));
}
function PercentileChart(_ref) {
  var curve = _ref.curve,
    yourX = _ref.yourX,
    pct = _ref.pct;
  var w = 420,
    h = 200;
  var max = Math.max.apply(Math, _toConsumableArray(curve));
  var path = curve.map(function (v, i) {
    var x = i / (curve.length - 1) * w;
    var y = h - v / max * (h - 8) - 4;
    return "".concat(i === 0 ? 'M' : 'L').concat(x.toFixed(2), ",").concat(y.toFixed(2));
  }).join(' ');
  var area = path + " L".concat(w, ",").concat(h, " L0,").concat(h, " Z");
  var yourPx = yourX * w;
  // Find y at yourX by interpolating
  var idx = yourX * (curve.length - 1);
  var i0 = Math.floor(idx),
    i1 = Math.min(curve.length - 1, i0 + 1);
  var t = idx - i0;
  var yVal = curve[i0] * (1 - t) + curve[i1] * t;
  var yourYPx = h - yVal / max * (h - 8) - 4;
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: h,
    viewBox: "0 0 ".concat(w, " ").concat(h),
    preserveAspectRatio: "none",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "wc-g",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--teal)",
    stopOpacity: "0.25"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--teal)",
    stopOpacity: "0"
  }))), [0.25, 0.5, 0.75].map(function (g) {
    return /*#__PURE__*/React.createElement("line", {
      key: g,
      x1: g * w,
      x2: g * w,
      y1: 0,
      y2: h,
      stroke: "var(--rule)",
      strokeOpacity: "0.15",
      strokeDasharray: "2 3"
    });
  }), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#wc-g)"
  }), /*#__PURE__*/React.createElement("path", {
    d: path,
    fill: "none",
    stroke: "var(--teal)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: yourPx,
    x2: yourPx,
    y1: 0,
    y2: h,
    stroke: "var(--rouge)",
    strokeWidth: "1",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: yourPx,
    cy: yourYPx,
    r: "6",
    fill: "var(--rouge)",
    stroke: "var(--paper)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("text", {
    x: yourPx + 8,
    y: Math.max(14, yourYPx - 8),
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      fill: 'var(--rouge)'
    }
  }, "you \xB7 ", pct.toFixed(1), "%"));
}

/* ============ Chart article mock — broadsheet data layout ============ */
function ChartArticleMock() {
  // Generate two-series area chart: bottom 50% share & top 1% share, 1820–2023
  var N = 60;
  var top1 = Array.from({
    length: N
  }, function (_, i) {
    // S-curve dip mid-20th century then rise
    var t = i / (N - 1);
    return 28 + 8 * Math.sin(t * Math.PI * 1.4 - 1.4) + (t > 0.6 ? (t - 0.6) * 20 : 0) - (t > 0.3 && t < 0.6 ? 6 : 0);
  });
  var bot50 = Array.from({
    length: N
  }, function (_, i) {
    var t = i / (N - 1);
    return 5 + 7 * Math.sin(t * Math.PI * 1.1) * (t < 0.6 ? 1 : 0.4) - (t > 0.6 ? (t - 0.6) * 8 : 0);
  });
  return /*#__PURE__*/React.createElement("div", {
    "data-tilt": true,
    style: {
      border: '1.5px solid var(--rule)',
      boxShadow: '6px 6px 0 var(--teal)',
      background: 'var(--paper)',
      padding: 0,
      fontFamily: 'var(--serif)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 14px',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--paper-3)',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-dim)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal)'
    },
    className: "pulse"
  }, "\u25CF"), " wealthlens.uk/charts/wealth-shares"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-mute)'
    }
  }, "WCAG AA \xB7 PWA")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 18px 0',
      fontFamily: 'var(--sans)',
      fontSize: 10,
      color: 'var(--ink-dim)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, "Home ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-mute)'
    }
  }, "/"), " Charts ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-mute)'
    }
  }, "/"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal)'
    }
  }, "Wealth Shares")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 32,
      fontWeight: 400,
      lineHeight: 1.05,
      margin: '6px 18px 4px',
      letterSpacing: '-0.02em'
    }
  }, "Who owns the wealth?"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 18px 12px',
      fontFamily: 'var(--serif)',
      fontStyle: 'italic',
      fontSize: 14,
      color: 'var(--ink-dim)'
    }
  }, "UK wealth shares by group, 1820\u20132023."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 1,
      margin: '0 18px',
      background: 'var(--rule)'
    }
  }, [['TOP 1%', '21%', 'of total'], ['TOP 10%', '57%', 'of total'], ['BOTTOM 50%', '5%', 'of total']].map(function (_ref2, i) {
    var _ref3 = _slicedToArray(_ref2, 3),
      lbl = _ref3[0],
      val = _ref3[1],
      sub = _ref3[2];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: 'var(--paper-2)',
        padding: '8px 10px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 9,
        color: 'var(--ink-dim)',
        letterSpacing: '0.1em'
      }
    }, lbl), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 26,
        fontWeight: 500,
        color: 'var(--teal)',
        letterSpacing: '-0.02em',
        lineHeight: 1
      }
    }, val), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 9,
        color: 'var(--ink-mute)'
      }
    }, sub));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px 0',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(TwoSeriesChart, {
    series: [{
      data: top1,
      color: 'var(--rouge)',
      label: 'Top 1%'
    }, {
      data: bot50,
      color: 'var(--teal)',
      label: 'Bottom 50%'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--mono)',
      fontSize: 9,
      color: 'var(--ink-mute)',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "1820"), /*#__PURE__*/React.createElement("span", null, "1900"), /*#__PURE__*/React.createElement("span", null, "1950"), /*#__PURE__*/React.createElement("span", null, "2000"), /*#__PURE__*/React.createElement("span", null, "2023")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 8,
      fontFamily: 'var(--sans)',
      fontSize: 11,
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "\u25A0"), " Top 1% share"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal)'
    }
  }, "\u25A0"), " Bottom 50% share"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px 18px 0',
      padding: '8px 10px',
      background: 'var(--paper-3)',
      borderLeft: '3px solid var(--teal)',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-dim)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink-2)',
      letterSpacing: '0.1em'
    }
  }, "SOURCE:"), ' ', "World Inequality Database \xB7 wid.world \xB7 Accessed 2026-05-12"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '8px 18px 14px',
      borderTop: '1px solid var(--rule)',
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--sans)',
      fontSize: 11,
      color: 'var(--ink-2)',
      letterSpacing: '0.08em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25B8 Methodology \xB7 how the numbers are computed"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-mute)'
    }
  }, "collapsed"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 18px',
      borderTop: '1px solid var(--rule)',
      background: 'var(--paper-3)',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--mono)',
      fontSize: 9,
      color: 'var(--ink-mute)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2193 CSV \xB7 \u2197 Embed \xB7 \u2398 Share"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal)'
    }
  }, "\u25CF FRESH \xB7 2d")));
}
function TwoSeriesChart(_ref4) {
  var series = _ref4.series,
    _ref4$height = _ref4.height,
    height = _ref4$height === void 0 ? 130 : _ref4$height;
  var w = 360,
    h = height;
  var all = series.flatMap(function (s) {
    return s.data;
  });
  var max = Math.max.apply(Math, _toConsumableArray(all)) * 1.1;
  var min = 0;
  var span = max - min || 1;
  function pathFor(data) {
    return data.map(function (p, i) {
      var x = i / (data.length - 1) * w;
      var y = h - (p - min) / span * h;
      return "".concat(i === 0 ? 'M' : 'L').concat(x.toFixed(2), ",").concat(y.toFixed(2));
    }).join(' ');
  }
  function areaFor(data) {
    return pathFor(data) + " L".concat(w, ",").concat(h, " L0,").concat(h, " Z");
  }
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: h,
    viewBox: "0 0 ".concat(w, " ").concat(h),
    preserveAspectRatio: "none",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, series.map(function (s, i) {
    return /*#__PURE__*/React.createElement("linearGradient", {
      key: i,
      id: "wl-g-".concat(i),
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: s.color,
      stopOpacity: "0.28"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: s.color,
      stopOpacity: "0"
    }));
  })), [0.25, 0.5, 0.75].map(function (t) {
    return /*#__PURE__*/React.createElement("line", {
      key: t,
      x1: "0",
      x2: w,
      y1: h * t,
      y2: h * t,
      stroke: "var(--rule)",
      strokeOpacity: "0.15",
      strokeDasharray: "2 3"
    });
  }), series.map(function (s, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("path", {
      d: areaFor(s.data),
      fill: "url(#wl-g-".concat(i, ")")
    }), /*#__PURE__*/React.createElement("path", {
      d: pathFor(s.data),
      fill: "none",
      stroke: s.color,
      strokeWidth: "1.5",
      strokeLinejoin: "round"
    }));
  }));
}

/* ============ Chart catalogue ============ */
function ChartCatalogue() {
  var charts = [['01', 'UK Wealth Shares', 'WID.world', '1820–2024'], ['02', 'Wealth by Decile', 'ONS WAS', 'ongoing'], ['03', 'Housing Affordability by Region', 'ONS', '2010–'], ['04', 'Capital Gains Concentration', 'HMRC', 'annual'], ['05', 'Productivity vs. Pay', 'ONS', '1970–'], ['06', 'Regional Income (GDHI)', 'ONS', 'annual'], ['07', 'Tax Composition', 'HMRC', 'rolling'], ['08', 'Bank Rate vs. CPI', 'Bank of England', 'monthly'], ['09', 'Child Poverty by Region', 'DWP / HMRC', 'annual'], ['10', 'Generational Wealth Gap', 'Resolution Foundation', 'cohort']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 0,
      border: '1px solid var(--rule)'
    }
  }, charts.map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: c[0],
      style: {
        display: 'grid',
        gridTemplateColumns: '36px 1fr 140px 80px',
        gap: 12,
        padding: '8px 14px',
        alignItems: 'baseline',
        borderRight: i % 2 === 0 ? '1px solid var(--rule)' : 'none',
        borderBottom: i < 8 ? '1px solid var(--rule)' : 'none',
        background: i % 2 === 0 ? 'var(--paper-2)' : 'var(--paper)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 10,
        color: 'var(--teal)'
      }
    }, "\u2116 ", c[0]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 15,
        color: 'var(--ink)'
      }
    }, c[1]), /*#__PURE__*/React.createElement("span", {
      className: "label",
      style: {
        fontSize: 9
      }
    }, c[2]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 10,
        color: 'var(--ink-mute)',
        textAlign: 'right'
      }
    }, c[3]));
  }));
}
