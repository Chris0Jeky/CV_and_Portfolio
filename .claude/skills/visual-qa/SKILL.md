---
name: visual-qa
description: Visual QA — verify rendering, responsive behavior, cross-browser patterns, and print layout.
user-invocable: true
---

# Visual QA

## Trigger
- After any visual change (HTML structure, CSS, new content)
- Responsive design issues reported
- Print layout needs verification
- Before pushing changes to production (every push is live)

## Workflow

### Browser rendering check

1. **Open the changed page** in a browser (local server or file://).
2. **Check at multiple viewpoints**:
   - Mobile: 375px (iPhone SE)
   - Tablet: 768px (iPad)
   - Desktop: 1440px
   - Wide: 1920px
3. **Verify each section** renders correctly:
   - No overlapping elements
   - No text overflow or truncation
   - Images sized appropriately
   - Animations trigger correctly (scroll-based, hover)
   - Navigation works (desktop and mobile hamburger)

### Responsive checklist

- [ ] Mobile menu opens/closes correctly
- [ ] Navigation links work on all sizes
- [ ] Hero section scales without breaking
- [ ] Timeline items stack vertically on mobile
- [ ] Project cards reflow to single column on mobile
- [ ] Skills grid adapts to available width
- [ ] Contact section is usable on mobile
- [ ] Footer doesn't overlap content
- [ ] Particle effects don't obscure content on small screens

### Print layout (CV pages)

- [ ] `cv-tabloid.html` renders correctly at tabloid size (11"×17")
- [ ] Two-column layout maintains alignment in print
- [ ] Colors are appropriate for print (or print stylesheet exists)
- [ ] Page breaks don't split entries mid-section
- [ ] Links show URL in print (via CSS `content: attr(href)`)

### Cross-browser patterns

Even without testing every browser, verify these patterns:
- [ ] CSS custom properties have fallback values where critical
- [ ] `backdrop-filter` has `-webkit-backdrop-filter` prefix
- [ ] `scroll-behavior: smooth` degrades gracefully
- [ ] No CSS features unsupported in last 2 versions of major browsers

### Link verification

- [ ] All internal links point to existing files (relative paths)
- [ ] All external links use `https://` and `target="_blank"`
- [ ] Social media links (LinkedIn, GitHub) are correct
- [ ] CV download link works
- [ ] Project case study links work

## Output

- List of visual issues found with page, section, and viewport size
- Screenshots if browser tools are available
- Recommended fixes with specific CSS/HTML changes

## When tools are limited

If browser access is unavailable, verify by:
1. Reading HTML structure for semantic correctness
2. Reading CSS for responsive breakpoints and media queries
3. Checking link `href` attributes for validity
4. Verifying image `src` paths exist on disk
5. State explicitly: "Visual rendering not verified in browser — structural check only."
