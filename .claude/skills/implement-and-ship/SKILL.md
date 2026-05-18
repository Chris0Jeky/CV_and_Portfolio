---
name: implement-and-ship
description: Take one issue or task from understanding to branch, implementation, verification, and PR.
user-invocable: true
---

# Implement and Ship

## Trigger
- Concrete task or issue to implement
- Feature request with clear scope
- Bug fix with identified cause

## Pipeline (one continuous operation)

### Step 1: Understand
1. Read `AGENTS.md` and `CLAUDE.md` for context.
2. Read the task/issue description carefully.
3. Identify the target file(s) and section(s).
4. Read those files to understand current state.
5. Identify the smallest complete change that fulfills the task.

### Step 2: Branch
- Create a feature branch: `feature/<slug>` or `fix/<slug>`
- Keep branch names short and descriptive
- Example: `feature/add-project-card`, `fix/mobile-nav-overlap`

### Step 3: Implement
Follow project rules throughout:
- Semantic HTML5 (proper elements, heading hierarchy)
- CSS custom properties (no hardcoded values)
- Vanilla JS only (no new dependencies without approval)
- Accessibility maintained (alt text, keyboard nav, contrast)
- Design system respected (dark theme, glass morphism, accent colors)
- Content accuracy preserved (no fabricated facts)

Keep changes focused:
- One page or one feature per implementation
- Small, incremental commits with clear messages
- Don't fix unrelated issues ("while I'm here...")

### Step 4: Verify
Run the narrowest meaningful checks first:
1. Read the changed code — does it match the intent?
2. Check HTML validity (proper nesting, closed tags)
3. Check CSS consistency (custom properties, responsive breakpoints)
4. Check JS for errors (syntax, null checks)
5. Check accessibility basics (alt text, headings, focus)
6. Open in browser if possible — test the golden path
7. Check responsive behavior at mobile/tablet/desktop widths

### Step 5: PR
Create a PR with:
- Clear title under 70 characters
- Summary: what changed and why
- Verification: what was tested
- Notes: any assumptions or follow-up items

```
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
- <what changed and why>

## Verification
- <what was tested and how>

## Notes
- <assumptions, follow-ups, or caveats>
EOF
)"
```

### Step 6: Self-review
Read your own diff one more time:
- [ ] No accidental changes to unrelated files
- [ ] No debug code or console.log left in
- [ ] No hardcoded values that should be CSS custom properties
- [ ] No broken links or missing assets
- [ ] No accessibility regressions
- [ ] Commit messages are clear and descriptive

## Guardrails

- One continuous operation — don't stop partway to ask "should I continue?"
- Small incremental commits — not one giant commit
- If blocked by an external dependency, stop and explain — don't work around silently
- Always push the branch before creating the PR
- If the task is too large for one PR, explicitly scope down and note what's deferred
