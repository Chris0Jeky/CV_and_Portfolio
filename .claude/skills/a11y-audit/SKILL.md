---
name: a11y-audit
description: Audit accessibility against WCAG 2.1 AA. Check semantic HTML, keyboard nav, color contrast, screen reader support.
user-invocable: true
---

# Accessibility Audit

## Trigger
- New content or interactive elements added
- Visual design changes (colors, fonts, sizes)
- Navigation or layout changes
- Before major releases or PR merges
- User reports accessibility issues

## Workflow

1. **Read the target HTML file(s)**.
2. **Run the checklist** below against the changed sections.
3. **Report findings** with specific file, line, issue, and fix.

## Checklist

### Semantic structure
- [ ] One `<h1>` per page, headings in sequential order (no skipped levels)
- [ ] Content sections use `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- [ ] Lists use `<ul>`/`<ol>`/`<li>` (not styled divs)
- [ ] No `<div>` or `<span>` where a semantic element fits

### Images & media
- [ ] All `<img>` have descriptive `alt` text (not "image" or "photo")
- [ ] Decorative images use `alt=""` and `role="presentation"`
- [ ] No text embedded in images without alt text equivalent

### Links & navigation
- [ ] All links have descriptive text (no "click here", "read more" without context)
- [ ] External links have `target="_blank" rel="noopener noreferrer"`
- [ ] Skip-to-content link exists (or navigation is minimal)
- [ ] Nav items are keyboard-reachable via Tab
- [ ] Current page/section is indicated (aria-current or visual+aria)

### Keyboard access
- [ ] All interactive elements reachable via Tab key
- [ ] Focus order follows visual reading order
- [ ] Focus indicators are visible (outline, ring, etc.)
- [ ] Mobile menu can be opened/closed via keyboard
- [ ] No keyboard traps (can Tab out of any element)
- [ ] Custom interactive elements have appropriate `role`, `tabindex`

### Color & contrast
- [ ] Text contrast ≥ 4.5:1 against background (normal text)
- [ ] Large text contrast ≥ 3:1 (18px+ or 14px+ bold)
- [ ] Information not conveyed by color alone
- [ ] Focus indicators have sufficient contrast
- [ ] Neon accent colors on dark background meet contrast requirements

### Motion & animation
- [ ] `prefers-reduced-motion` media query is respected
- [ ] No auto-playing animations that can't be paused
- [ ] Particle effects (tsparticles) degrade gracefully when reduced motion preferred
- [ ] AOS animations have reduced-motion fallback

### ARIA
- [ ] ARIA used only when semantic HTML is insufficient
- [ ] `aria-label` on icon-only buttons/links
- [ ] `aria-hidden="true"` on decorative Font Awesome icons
- [ ] No conflicting ARIA roles and semantic elements

## Output

Findings with severity:
- **CRITICAL**: Content inaccessible, keyboard trap, zero contrast
- **HIGH**: Missing alt text, broken focus order, no reduced-motion support
- **MEDIUM**: Suboptimal semantics, missing ARIA labels on icons
- **LOW**: Enhancement opportunity, minor improvement

## Verification

After fixes:
1. Tab through the entire page — every interactive element should be reachable
2. Check heading outline — `document.querySelectorAll('h1,h2,h3,h4,h5,h6')`
3. Check images — `document.querySelectorAll('img:not([alt])')` should return empty
4. Verify reduced motion — test with `prefers-reduced-motion: reduce` in devtools
