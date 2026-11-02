/* Generated from portfolio/about.jsx by scripts/build-jsx.mjs (@babel/standalone 7.29.0); edit the .jsx and rebuild. */
"use strict";

/* global React, Fn */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;
window.About = function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    num: "01",
    kicker: "About",
    title: "A note from Chris."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "dropcap",
    style: {
      fontSize: 19,
      lineHeight: 1.65,
      marginTop: 0
    }
  }, "Hello. I'm Chris, a software engineer in London. I prefer backends you can reason about, pipelines that fail loudly, and tools that do ", /*#__PURE__*/React.createElement("em", null, "nothing"), ' ', "until you tell them to. If a system surprises you, it's probably broken."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "Right now my work splits three ways:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      fontSize: 16.5,
      lineHeight: 1.7,
      color: 'var(--ink-2)',
      paddingLeft: 22
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--rouge)'
    }
  }, "Metricalgo"), " \u2014 software engineer on an options analytics platform in closed beta. I built the", ' ', /*#__PURE__*/React.createElement("strong", null, "AI research assistant"), ": the model sees only a summary of backtests the user can see, every tool call is schema-checked and recorded, and credit is reserved before any provider call. I also work on the backtest engine's data path and its correctness checks."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--forest)'
    }
  }, "Middlesex University"), " \u2014 UK Recruitment & Outreach Coordinator, full-time since April 2026. I built the reporting chain behind the team's regular reporting pack, and I'm replacing a hand-typed workbook with a SharePoint List and a Python sync engine over Microsoft Graph. I also plan and deliver talks, workshops and campus events."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--teal)'
    }
  }, "Independent R&D"), " \u2014 evenings and weekends: a development pipeline that takes a task from an issue to a merged pull request behind a plain-Python merge gate, plus", ' ', /*#__PURE__*/React.createElement("strong", null, "Taskdeck"), ", ", /*#__PURE__*/React.createElement("strong", null, "NavSentinel"), " and local-asset-studio. I also take contract work through", ' ', /*#__PURE__*/React.createElement("strong", null, "DeliveraSoft"), " for small-business clients.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "Before that, I spent fourteen months at ", /*#__PURE__*/React.createElement("strong", null, "GE Digital"), " as a software engineer intern. On the Smallworld product I fixed hard-to-reproduce bugs in a large legacy Magik codebase, and received a GE Spotlight Award, \"Deliver with Focus\", for my part in the team's December 2023 release. I then took over a security automation project: Nmap port checks on the Jenkins pipelines that deploy to AWS, across ", /*#__PURE__*/React.createElement("strong", null, "72 products"), " and about 140 pipelines."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "I also do research. My paper on the N-Person Prisoners' Dilemma,", ' ', /*#__PURE__*/React.createElement("em", null, "\"Navigating the N-Person Prisoners' Dilemma: From the Tragic Valley to the Collaborative Hill\""), ", was published by Springer in the SGAI-AI 2025 proceedings. I'm the lead author and presented it at the conference. It asks a question I keep asking of software: under what conditions does cooperation emerge, and what happens when one agent defects?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "I have a First Class BSc (Hons) in Computer Science with Industrial Placement from Middlesex University (2025). I speak English and Italian fluently, and Romanian is my native language."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontFamily: 'var(--hand)',
      color: 'var(--rouge)',
      fontSize: 30,
      lineHeight: 1
    }
  }, "\u2014 Chris"), /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginTop: 4
    }
  }, "London")), /*#__PURE__*/React.createElement(Sidebar, null))));
};
function Sidebar() {
  var opinions = ["AI assistance should be a proposal, not a commit.", "If you can't roll it back, you didn't ship it — you launched it.", "Local-first beats cloud-first whenever latency or privacy is on the line.", "The best CI pipeline fails early, with a useful error message.", "Tests are documentation that fails when it goes stale.", "If your audit log has gaps, you don't have an audit log.", "If a number doesn't cite its source, it's a guess in a nice font."];
  return /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1.5px solid var(--rule)',
      padding: 24,
      background: 'var(--paper-2)',
      boxShadow: '4px 4px 0 var(--ink)',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 4
    }
  }, "Sidebar \xB7 principles"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 28,
      margin: '0 0 16px',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      lineHeight: 1.05
    }
  }, "How I ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "work"), "."), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20,
      fontFamily: 'var(--serif)',
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--ink-2)'
    }
  }, opinions.map(function (o, i) {
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        marginBottom: 8
      }
    }, o);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "term"
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-label"
  }, "$ whoami --verbose"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " name ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " \"Cristian Tcaci\""), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " aka ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " \"Chris\""), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " role ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " \"software engineer\""), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " focus ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " \"data pipelines \xB7 platforms \xB7 developer tooling\""), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " region ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " \"GB-LDN\""), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " languages ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\"en, it (fluent) \xB7 ro (native)\"")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " automation ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\"proposal-first\"")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " stance ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "\"local-first\""))));
}
