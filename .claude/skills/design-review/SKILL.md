---
name: design-review
description: Review CSS and visual design for consistency, responsive behavior, and design system compliance.
user-invocable: true
---

# Design Review

## Trigger
- After CSS changes
- New visual components or sections added
- Visual inconsistency reported
- Responsive design issues
- Before merging visual changes

## Workflow

1. **Read the design system** — `portfolio-style.css` CSS custom properties section (`:root` block).
2. **Audit the change** against these checkpoints:

### Color compliance
- [ ] All colors reference CSS custom properties (no hardcoded hex/rgb)
- [ ] Accent colors match the palette (electric green, neon blue, purple, pink, gold)
- [ ] Background colors use the dark range (--bg-primary, --bg-secondary, etc.)
- [ ] Text colors maintain contrast ratio ≥ 4.5:1

### Typography
- [ ] Font families use CSS custom properties or the established stack
- [ ] Heading hierarchy is correct (h1 > h2 > h3, sequential)
- [ ] Font sizes are responsive (use rem/em, not px for body text)

### Layout & responsiveness
- [ ] Mobile-first: base styles work on small screens
- [ ] Media queries handle tablet (768px) and desktop (1024px+) breakpoints
- [ ] No horizontal scroll on mobile
- [ ] Touch targets are ≥ 44x44px
- [ ] Flexbox/Grid used appropriately (no float-based layouts)

### Glass morphism consistency
- [ ] Semi-transparent backgrounds use consistent opacity
- [ ] `backdrop-filter: blur()` applied consistently
- [ ] Border radius matches existing components
- [ ] Box shadows follow existing patterns

### Animation
- [ ] Animations are subtle and purposeful
- [ ] `prefers-reduced-motion` is respected
- [ ] No animation causes layout shift
- [ ] Transition durations are consistent (use custom properties)

3. **Report findings** with file, line, and specific recommendation.

## Output

Findings list with severity:
- **CRITICAL**: Breaks layout, unreadable content, accessibility failure
- **HIGH**: Inconsistent with design system, poor mobile experience
- **MEDIUM**: Minor visual inconsistency, suboptimal pattern
- **LOW**: Style preference, minor improvement opportunity
