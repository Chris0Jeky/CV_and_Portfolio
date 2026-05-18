---
name: repo-onramp
description: Orient to the CV/Portfolio project before editing. Use at session start or when scope is vague.
user-invocable: true
---

# Repo Onramp

## Trigger
- Session start
- Vague or broad request
- Unfamiliar with which page or file to edit
- Switching between CV and Portfolio areas

## Workflow

1. **Read** `AGENTS.md` (operating rules, repo map, conventions).
2. **Read** `CLAUDE.md` (quick reference, skill routing, common tasks).
3. **Identify the target area**:
   - Portfolio content/styling → `Portfolio/portfolio.html` + `portfolio-style.css`
   - CV content → `CV/cv.html` (and variants)
   - Project case studies → `Portfolio/projects/`
   - JavaScript behavior → `Portfolio/portfolio-script.js`
   - Design system → `portfolio-style.css` CSS custom properties
4. **Skim the target file(s)** — note section structure, existing patterns, heading hierarchy.
5. **State your plan**: what you'll change, what you won't touch, how you'll verify.

## Output

A short working summary:
- Target file(s) and section(s)
- Existing patterns to follow
- Verification method (browser, HTML validation, etc.)
- Assumptions stated

## Guardrails

- Do not read `Portfolio/archive/*` unless explicitly needed.
- Do not bulk-read all HTML files — focus on the relevant page.
- If the task spans multiple pages, start with one and verify before moving to others.
