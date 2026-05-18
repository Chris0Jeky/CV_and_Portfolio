---
name: safe-slice
description: Implement one small, reviewable change without drifting across pages or sections.
user-invocable: true
---

# Safe Slice

## Trigger
- Any implementation task
- When tempted to "also fix" adjacent issues
- Changes that touch HTML structure, CSS, or JS behavior

## Workflow

1. **Scope the slice**: One page, one section, or one feature. Not "improve the whole portfolio."
2. **Read the target file** — understand existing structure and patterns.
3. **Identify the change boundary**: Which lines/sections change? What stays untouched?
4. **Implement** within the boundary:
   - Follow existing HTML structure patterns
   - Use existing CSS custom properties (never hardcode colors/sizes)
   - Match existing JS patterns (event listeners, DOM queries)
5. **Verify narrowly**: Check only the changed page/section.
6. **State what changed and what didn't**.

## Verification

- Open the changed page in browser (or validate HTML structure by reading it)
- Check responsive: does it work at mobile widths? (check CSS media queries)
- Check accessibility: alt text, heading order, keyboard focus
- No console errors in JS

## Guardrails

- One page per slice. Don't fix portfolio.html while editing cv.html.
- Don't refactor CSS custom properties while adding content.
- Don't update CDN versions while fixing layout.
- If you spot something else broken, note it for a follow-up — don't fix it now.
- Keep diffs small. A 20-line diff is better than a 200-line diff.
