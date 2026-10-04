/* Generated from portfolio/utils.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* global React */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;

// Shared bits used across sections.

window.Masthead = function Masthead(_ref) {
  var _ref$issue = _ref.issue,
    issue = _ref$issue === void 0 ? "VOL. IV · NO. 043" : _ref$issue;
  return /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: '2px solid var(--rule)',
      paddingBottom: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      fontSize: 12
    }
  }, "The Tcaci Quarterly"), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      fontSize: 10
    }
  }, issue, " \xB7 Spring MMXXVI")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--rule)',
      paddingBottom: 4,
      fontFamily: 'var(--sans)',
      fontSize: 9,
      color: 'var(--ink-dim)',
      letterSpacing: '0.18em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Software \xB7 Research \xB7 Infrastructure \xB7 Civic Data \xB7 Occasional Sermons"), /*#__PURE__*/React.createElement("span", null, "London, UK \xB7 est. 2023")));
};
window.SectionHeader = function SectionHeader(_ref2) {
  var num = _ref2.num,
    title = _ref2.title,
    kicker = _ref2.kicker,
    children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderTop: '2px solid var(--rule)',
      borderBottom: '1px solid var(--rule)',
      padding: '10px 0',
      marginBottom: 32
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
  }, "\xA7 ", num), /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, kicker)), /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "page ", String(num).padStart(2, '0'))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(48px, 7vw, 88px)',
      margin: '0 0 8px',
      fontWeight: 400,
      letterSpacing: '-0.025em',
      lineHeight: 0.95,
      textWrap: 'balance',
      hyphens: 'manual',
      wordBreak: 'normal',
      overflowWrap: 'normal'
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--sans)',
      fontSize: 13,
      color: 'var(--ink-dim)',
      letterSpacing: '0.05em',
      maxWidth: 700
    }
  }, children));
};

// Small sparkline used in a few places
window.Sparkline = function Sparkline(_ref3) {
  var data = _ref3.data,
    _ref3$color = _ref3.color,
    color = _ref3$color === void 0 ? 'currentColor' : _ref3$color,
    _ref3$height = _ref3.height,
    height = _ref3$height === void 0 ? 60 : _ref3$height,
    _ref3$fill = _ref3.fill,
    fill = _ref3$fill === void 0 ? true : _ref3$fill;
  var w = 320,
    h = height;
  if (!data || data.length < 2) return null;
  var max = Math.max.apply(Math, _toConsumableArray(data)),
    min = Math.min.apply(Math, _toConsumableArray(data));
  var span = max - min || 1;
  var path = data.map(function (p, i) {
    var x = i / (data.length - 1) * w;
    var y = h - (p - min) / span * (h - 4) - 2;
    return "".concat(i === 0 ? 'M' : 'L').concat(x.toFixed(2), ",").concat(y.toFixed(2));
  }).join(' ');
  var area = path + " L".concat(w, ",").concat(h, " L0,").concat(h, " Z");
  var id = useMemo(function () {
    return 'sg-' + Math.random().toString(36).slice(2, 8);
  }, []);
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: h,
    viewBox: "0 0 ".concat(w, " ").concat(h),
    preserveAspectRatio: "none",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.25"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#".concat(id, ")")
  }), /*#__PURE__*/React.createElement("path", {
    d: path,
    fill: "none",
    stroke: color,
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }));
};

// Footnote with hover popover
window.Fn = function Fn(_ref4) {
  var n = _ref4.n,
    children = _ref4.children;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "fn",
    onMouseEnter: function onMouseEnter() {
      return setOpen(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setOpen(false);
    },
    onClick: function onClick() {
      return setOpen(function (o) {
        return !o;
      });
    }
  }, n), open && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-6px)',
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '8px 12px',
      fontFamily: 'var(--sans)',
      fontSize: 12,
      lineHeight: 1.5,
      fontStyle: 'normal',
      letterSpacing: 0,
      width: 280,
      zIndex: 20,
      boxShadow: '4px 4px 0 var(--rouge)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)',
      fontWeight: 700
    }
  }, "[", n, "]"), " ", children));
};
