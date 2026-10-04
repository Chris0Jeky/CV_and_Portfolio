/* Generated from portfolio/numbers.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
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

// Parse a stat string like "£17T" / "4,500+" / "874" into a count-up animator.
function CountUp(_ref) {
  var target = _ref.target,
    active = _ref.active,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 1400 : _ref$duration,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 0 : _ref$delay;
  var m = /^(.*?)([\d][\d,]*)(.*)$/.exec(target);
  if (!m) return /*#__PURE__*/React.createElement(React.Fragment, null, target);
  var _m = _slicedToArray(m, 4),
    prefix = _m[1],
    digits = _m[2],
    suffix = _m[3];
  var end = parseInt(digits.replace(/,/g, ''), 10);
  var hasComma = digits.includes(',');
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    val = _useState2[0],
    setVal = _useState2[1];
  var startedRef = useRef(false);
  useEffect(function () {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    var startTime = performance.now() + delay;
    var raf;
    function tick(t) {
      var elapsed = t - startTime;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      var p = Math.min(1, elapsed / duration);
      // ease-out cubic
      var e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return function () {
      return cancelAnimationFrame(raf);
    };
  }, [active, end, duration, delay]);
  var display = active ? hasComma ? val.toLocaleString('en-GB') : String(val) : '0';
  return /*#__PURE__*/React.createElement(React.Fragment, null, prefix, display, suffix);
}

// A "by the numbers" interstitial — a single tight row of headline stats.
window.ByTheNumbers = function ByTheNumbers() {
  var ref = useRef(null);
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    visible = _useState4[0],
    setVisible = _useState4[1];
  useEffect(function () {
    if (!ref.current) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setVisible(true);
      });
    }, {
      threshold: 0.3
    });
    obs.observe(ref.current);
    return function () {
      return obs.disconnect();
    };
  }, []);
  var stats = [{
    v: '£17T',
    l: 'of UK wealth · visualised'
  }, {
    v: '9,799',
    l: 'tests on Taskdeck',
    accent: 'forest'
  }, {
    v: '874',
    l: 'tests on WealthLens',
    accent: 'teal'
  }, {
    v: '5,300+',
    l: 'taskdeck commits',
    accent: 'forest'
  }, {
    v: '620+',
    l: 'taskdeck PRs',
    accent: 'forest'
  }, {
    v: '3,144',
    l: 'metrix commits',
    accent: 'rouge'
  }, {
    v: '72',
    l: 'aws pipelines · ge'
  }, {
    v: '112',
    l: 'gym fixtures · navsentinel',
    accent: 'rouge'
  }, {
    v: '1',
    l: 'paper · springer · SGAI-AI 25',
    accent: 'gold'
  }];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: {
      padding: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderTop: '2px solid var(--rule)',
      borderBottom: '1px solid var(--rule)',
      padding: '10px 0',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label",
    style: {
      color: 'var(--rouge)'
    }
  }, "\xA7 Interlude"), /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "A pause, in numbers.")), /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "the receipts")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(9, 1fr)',
      gap: 0,
      border: '1.5px solid var(--rule)',
      background: 'var(--paper-2)'
    }
  }, stats.map(function (s, i) {
    var color = s.accent === 'teal' ? 'var(--teal)' : s.accent === 'forest' ? 'var(--forest)' : s.accent === 'rouge' ? 'var(--rouge)' : s.accent === 'gold' ? 'var(--gold)' : 'var(--ink)';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: '20px 14px',
        borderRight: i < stats.length - 1 ? '1px solid var(--rule)' : 'none',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: "all 0.5s ease ".concat(i * 0.06, "s")
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--serif)',
        fontSize: 34,
        fontWeight: 400,
        letterSpacing: '-0.025em',
        lineHeight: 1,
        color: color,
        marginBottom: 6,
        fontVariantNumeric: 'tabular-nums'
      }
    }, /*#__PURE__*/React.createElement(CountUp, {
      target: s.v,
      active: visible,
      delay: i * 80
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--sans)',
        fontSize: 9.5,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--ink-dim)',
        lineHeight: 1.3
      }
    }, s.l));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "label",
    style: {
      fontSize: 10,
      color: 'var(--ink-mute)'
    }
  }, "Fig. 7 \u2014 figures verifiable on github \xB7 last reconciled spring 2026"))));
};
