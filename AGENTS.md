# AGENTS.md — CV & Portfolio Platform

Universal operating contract for all agents (Claude Code, Codex, or any future runtime) working in this repository.

## Scope

This repo contains a static CV/Portfolio website deployed via GitHub Pages. Every push to `main` is live at https://chris0jeky.github.io/CV_and_Portfolio/.

**You are editing a production website.** There is no staging environment. Verify every change before pushing.

## First 5 minutes

1. Read this file (`AGENTS.md`).
2. Read `CLAUDE.md` for quick reference and skill routing.
3. Skim the page(s) relevant to your task.
4. Select one primary skill from `.claude/skills/` or `.agents/skills/`.
5. Identify the smallest safe, reviewable change.
6. State: what you'll change, what you won't touch, how you'll verify, and any assumptions.

Do not bulk-read the archive directory or old portfolio versions unless the task explicitly requires them.

## Repo map

```
Key files by area:

PORTFOLIO (main interactive site):
  Portfolio/portfolio.html          ← Main SPA, all sections
  Portfolio/portfolio-style.css     ← Design system, all styles
  Portfolio/portfolio-script.js     ← Interactions, animations
  Portfolio/images/headshot.jpg     ← Profile photo (protected)
  Portfolio/projects/*.html         ← Case study detail pages
  Portfolio/projects/project-detail.css ← Shared case study styles

CV (professional resume):
  CV/cv.html                        ← Standard web CV
  CV/cv-tabloid.html                ← Print-optimized tabloid
  CV/cv-academic.html               ← Academic variant
  CV/style.css                      ← CV styling

ENTRY:
  index.html                        ← Redirect to portfolio

ARCHIVE (reference only — do not edit):
  Portfolio/archive/*               ← Previous versions

AGENT INFRASTRUCTURE:
  .claude/settings.json             ← Guardrails and permissions
  .claude/skills/*/SKILL.md         ← Workflow skills
  docs/agentic/*                    ← Shared protocols
  scripts/agent_hooks/*             ← Safety hooks
```

## Coding conventions

### HTML
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Proper heading hierarchy (one `<h1>` per page, sequential nesting).
- All images must have descriptive `alt` text.
- All links must have meaningful text (no "click here").
- Use `loading="lazy"` on images below the fold.
- External links get `target="_blank" rel="noopener noreferrer"`.

### CSS
- Use CSS custom properties (variables) for colors, fonts, spacing. Never hardcode hex values.
- Mobile-first approach: base styles for mobile, `@media` queries for larger screens.
- Follow existing naming conventions in the file you're editing.
- Prefer existing utility patterns over new ones.
- No `!important` unless overriding third-party CDN styles.
- Glass morphism pattern: `backdrop-filter: blur()` + semi-transparent backgrounds.

### JavaScript
- Vanilla ES6+ only. No frameworks, no transpilation, no bundling.
- Use `const` by default, `let` when reassignment is needed, never `var`.
- Use `addEventListener` — no inline event handlers in HTML.
- Defensive coding: check element existence before manipulating (`if (el) { ... }`).
- No `document.write()`. Use DOM methods.
- Keep the global scope clean — use IIFEs or modules where appropriate.

### General
- UTF-8 encoding in all files.
- LF line endings (git handles this).
- 2-space indentation for HTML/CSS/JS (match existing files).
- No trailing whitespace.
- No commented-out code blocks left in production files.

## Design system

The portfolio uses a dark premium aesthetic. Preserve these principles:

- **Background**: Deep dark (#0a0a0f, #0d1117 range)
- **Accent colors**: Electric green, neon blue, purple, pink, gold (via CSS custom properties)
- **Glass morphism**: Semi-transparent backgrounds + backdrop blur
- **Typography**: Inter/Space Grotesk for headings, system stack for body
- **Animations**: Subtle, purposeful. No gratuitous motion. Respect `prefers-reduced-motion`.
- **Spacing**: Consistent rhythm using CSS custom properties

When adding new visual elements, derive colors and spacing from existing custom properties. Never introduce a new color palette.

## CDN dependency rules

Current CDN dependencies (do not remove without replacement):
- Google Fonts (Inter, Space Grotesk, Lato, Montserrat)
- Font Awesome 6.5.1
- tsparticles
- AOS (Animate On Scroll)

Rules:
- Never add a new CDN dependency without explicit user approval.
- When updating a CDN URL, verify the new URL loads correctly before committing.
- Prefer loading non-critical CDN resources with `defer` or `async`.
- Always include SRI (Subresource Integrity) hashes when available.
- Use `preconnect` for CDN domains in `<head>`.

## Git workflow hard rules

- **Never rebase.** Use `git merge main` to update your branch.
- **Never force-push.** Not `--force`, not `--force-with-lease`, not on any branch.
- **Never `git commit --amend` after pushing.** Create a new commit instead.
- **Never `git reset --hard`, `git clean -f`, `git checkout -- .`, or `git restore .`** without explicit user approval.
- Recovery commands are always safe: `git merge --abort`, `git rebase --abort`, `git stash`.

Before any git command that could discard work: explain what you want to do, what data is at risk, whether it's reversible, and wait for explicit approval.

## Command safety

### Blocked patterns (enforced by hooks where available)
- `rm -rf` on any project directory
- Piping file listings into deletion commands (`find | xargs rm`, etc.)
- `npm publish` (no package to publish)
- Writing to `.env` files
- Any command that writes secrets, tokens, or API keys to files

### Safe alternatives
- For cleanup: manually specify files to remove
- For dependency refresh: `rm -rf node_modules && npm install`
- For cache clear: delete specific cache directories by name

## Content accuracy rules

This is a professional portfolio. Content integrity matters:

- **Never fabricate** experience, education, skills, or project descriptions.
- **Never change** job titles, company names, dates, or degree names without explicit user confirmation.
- **Never add** fake testimonials, metrics, or claims.
- Treat all biographical content as user-provided facts — modify only the presentation, not the substance.
- When asked to "improve" CV content, enhance wording and formatting while preserving factual accuracy.

## Accessibility baseline (WCAG 2.1 AA)

All changes must maintain or improve accessibility:

- Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text.
- All interactive elements must be keyboard-accessible.
- All images must have descriptive `alt` text.
- Form inputs (if any) must have associated `<label>` elements.
- Focus indicators must be visible.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` media queries.
- ARIA attributes only when semantic HTML is insufficient.

## Review policy

- When reviewing a PR, read existing PR comments first.
- Post findings as a PR comment with `gh pr comment`.
- Fix all findings across all severities.
- For out-of-scope findings, note them for a follow-up change.
- See the `adversarial-review` skill for the full pipeline.

## Operational issue handling

- **Never silently ignore failures.** If a command fails, a file doesn't exist, or a tool is denied — report it.
- Classify issues as: blocker, non-blocking risk, pre-existing noise, or invalid signal.
- Record recurring failures in `docs/agentic/FAILURE_LEDGER.md`.
- Update `docs/agentic/GUIDE_UPDATE_PROTOCOL.md` if the same mistake happens twice.

## Definition of done

A change is done when:
1. The modified page(s) render correctly in a browser.
2. No broken links or missing assets.
3. HTML is valid and semantic.
4. CSS follows the design system (custom properties, no hardcoded values).
5. JavaScript has no console errors.
6. Accessibility is maintained (keyboard nav, alt text, contrast).
7. The change is committed with a clear, descriptive message.
8. Any assumptions made are stated in the commit or PR description.

## Question protocol

Ask only when uncertainty is a true blocker:
- Content accuracy (dates, titles, facts)
- Irreversible visual change to the live site
- New CDN dependency
- Removing existing content or pages

Otherwise proceed with a stated assumption: `Assumption: <specific>. Reason: <source>. Reversible by: <action>.`

Batch all questions into one compact message. See `docs/agentic/QUESTION_PROTOCOL.md`.
