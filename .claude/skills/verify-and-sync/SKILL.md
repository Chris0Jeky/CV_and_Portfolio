---
name: verify-and-sync
description: Final verification before commit or handoff. Confirm the change works, state what was and wasn't verified.
user-invocable: true
---

# Verify and Sync

## Trigger
- Before committing changes
- Before pushing to main (remember: every push is a deploy)
- Before ending a work session
- When asked to confirm work is done

## Workflow

1. **Re-read the original request** — does the change match what was asked?
2. **Verify the changed files**:
   - Read the modified sections to confirm correct content
   - Check HTML validity (proper nesting, closed tags, semantic elements)
   - Check CSS consistency (custom properties used, no hardcoded values)
   - Check JS for errors (syntax, missing null checks, proper event handling)
3. **Check for collateral damage**:
   - Did any adjacent content shift or break?
   - Are all links still valid?
   - Are all images still referenced correctly?
4. **Run available checks**:
   - `git diff` to review what changed
   - HTML validation if available
   - Browser check if available
5. **State the verification result**:

```
Verified:
- [what you checked and how]
- [commands run and results]

Not verified:
- [what you couldn't check and why]
- [e.g., "Visual rendering in browser — no dev server available"]

Assumptions:
- [any assumptions made during implementation]
```

## Guardrails

- Do not claim "looks good" without actually reading the changed code.
- Do not claim "tested in browser" if you didn't open it.
- If verification is incomplete, say so explicitly — never overstate confidence.
- Remember: pushing to main deploys to production. Be honest about verification gaps.
