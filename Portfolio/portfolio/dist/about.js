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
    kicker: "Letter from the Editor",
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
  }, "Hello. I'm Chris. I write software for a living and a bit too much for fun. I prefer backends you can reason about, pipelines that fail loudly, and tools that do ", /*#__PURE__*/React.createElement("em", null, "nothing"), " until you tell them to. If a system surprises you, it's probably broken. If it's quiet, it's probably working", /*#__PURE__*/React.createElement(Fn, {
    n: "2"
  }, "Or it's deadlocked. Both look identical from the outside, which is roughly the entire job."), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "For the past stretch I've been building three things, each of which picks a different fight:"), /*#__PURE__*/React.createElement("ul", {
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
      color: 'var(--teal)'
    }
  }, "WealthLens"), " \u2014 an open-source platform that pulls UK wealth and inequality data from ONS, HMRC, the Bank of England, DWP and the World Inequality Database, and turns it into cited, embeddable chart pages. Ten datasets, ten automated pipelines, ", /*#__PURE__*/React.createElement("strong", null, "874 passing tests"), ", and a stubborn refusal to publish a number without a URL next to it."), /*#__PURE__*/React.createElement("li", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--forest)'
    }
  }, "Taskdeck"), " \u2014 a local-first task board where every automation lands as a", /*#__PURE__*/React.createElement("em", null, " proposal"), " you accept or reject. No silent mutations. No surprise cards. Roughly", /*#__PURE__*/React.createElement("strong", null, " 5,300+ commits"), ", ", /*#__PURE__*/React.createElement("strong", null, "620+ PRs"), " and 30 CI workflows of stubbornness about who's actually in charge of your board."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--rouge)'
    }
  }, "Metrix"), " \u2014 a much larger options-backtesting and signal platform built with a small team. About ", /*#__PURE__*/React.createElement("strong", null, "3,144 commits"), " of opinions about how backtests should actually work, plus a Phase-10 LLM assistant that does tool orchestration without pretending it's a person.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "Before all that, I spent fifteen months at ", /*#__PURE__*/React.createElement("strong", null, "GE Digital"), ' ', "integrating automated security scanning into about", ' ', /*#__PURE__*/React.createElement("strong", null, "seventy-two AWS CI/CD pipelines"), ". Those numbers sound dry on paper", /*#__PURE__*/React.createElement(Fn, {
    n: "3"
  }, "\"Cut deploy friction by 15%\" reads better on a CV than in person, where it usually translates to \"stopped Jenkins from yelling at us at 3am.\""), ' ', "\u2014 but they were the kind of work I most enjoy: legacy systems, real consequences, and a measurable thing you can point at when it's done. They gave me a Spotlight Award. I gave them their evenings back."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "I also do research. My paper on the N-person Prisoner's Dilemma \u2014", /*#__PURE__*/React.createElement("em", null, " published in Springer proceedings at SGAI-AI 2025"), ", lead author, presented at conference \u2014 is a multi-agent simulation framework with", /*#__PURE__*/React.createElement("strong", null, " twelve-plus strategies"), " across five network topologies and an evolutionary scenario generator that ranks results by an", /*#__PURE__*/React.createElement("em", null, " \"interestingness score.\""), " It asks the same question I keep asking software: under what conditions does cooperation emerge, and what happens when one agent goes rogue? It's also the question behind WealthLens: make the cost of defection visible to everyone."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--ink-2)'
    }
  }, "On the side: I work with ", /*#__PURE__*/React.createElement("strong", null, "Middlesex University"), "'s Widening Participation team on outreach delivery and data analysis \u2014 schools, on-campus sessions, open days, and whichever audience will tolerate a 9am talk about computer science. I have a First Class BSc in Computer Science from Middlesex (2025), an irrational fondness for keyboard-first workflows, and strong opinions about the word \"agent.\""), /*#__PURE__*/React.createElement("div", {
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
  }, "filed from London")), /*#__PURE__*/React.createElement(Sidebar, null))));
};
function Sidebar() {
  var opinions = ["AI assistance should be a proposal, not a commit.", "If you can't roll it back, you didn't ship it — you launched it.", "Local-first beats cloud-first whenever latency, privacy, or your own dignity is on the line.", "The best CI pipeline is the one that fails before lunch, with a useful error message.", "Most \"microservices\" are a distributed monolith with a worse on-call rota.", "Tests are documentation that yells at you. Write the documentation.", "If your audit log has gaps, you don't have an audit log. You have a diary.", "If your data doesn't cite its source, it's not data. It's a guess in a nice font.", "\"Agent\" is doing a lot of marketing work for software that is mostly a for-loop."];
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
  }, "Sidebar \xB7 op-ed"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 28,
      margin: '0 0 16px',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      lineHeight: 1.05
    }
  }, "Hills I will ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--rouge)'
    }
  }, "die on"), "."), /*#__PURE__*/React.createElement("ol", {
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
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 12,
      borderTop: '1px dashed var(--rule)',
      fontFamily: 'var(--sans)',
      fontSize: 10,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-mute)'
    }
  }, "The editor reserves the right to retract any of these by Q3.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--rule)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 12
    }
  }, "Errata \xB7 prior issues"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      lineHeight: 1.7,
      color: 'var(--ink-dim)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "2021:"), " believed in \"clean code\" as a moral system. retracted."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "2022:"), " claimed microservices were inevitable. apologised to a monolith."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "2023:"), " shipped without a rollback path. would not recommend."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rouge)'
    }
  }, "2024:"), " said \"we'll add tests later.\" tests were not added later."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)'
    }
  }, "2025:"), " finally added the tests. 874 of them."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal)'
    }
  }, "2026:"), " started an inequality dashboard. accidentally made it a mission."))), /*#__PURE__*/React.createElement("div", {
    className: "term",
    style: {
      marginTop: 32
    }
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
  }, "="), " \"backend / platform / civic data\""), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " region ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " \"GB-LDN\""), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " stance ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\"local-first\"")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " automation ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, "\"trust-first\"")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " mission ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "cyan"
  }, "\"civic-data\"")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " editor ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "\"jetbrains \xB7 vim bindings, obviously\"")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " mood ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "\"shipping\"")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "\u25B8"), " coffee ", /*#__PURE__*/React.createElement("span", {
    className: "dim"
  }, "="), " ", /*#__PURE__*/React.createElement("span", {
    className: "err"
  }, "\"depleted\""))));
}
