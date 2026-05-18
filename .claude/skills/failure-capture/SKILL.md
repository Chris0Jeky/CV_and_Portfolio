---
name: failure-capture
description: Record tool, command, or workflow failures. Never silently ignore friction.
user-invocable: true
---

# Failure Capture

## Trigger
- Any command or tool fails
- A file doesn't exist where expected
- A tool permission is denied
- A CDN resource fails to load
- A workflow step produces unexpected results
- A workaround is needed to continue

## Workflow

1. **Name the failure surface**: What broke? (tool, command, file, CDN, browser, git)
2. **Classify** the failure:
   - **Blocker**: Cannot continue without resolution
   - **Non-blocking risk**: Work can continue but something is degraded
   - **Pre-existing noise**: Issue existed before this session
   - **Invalid signal**: False alarm, not actually a failure
3. **Decide**: Can work continue? What's the workaround?
4. **Record** if the failure is recurring or non-obvious.

## Output format

```
Failure: [what happened]
Surface: [tool/command/file/CDN/browser/git]
Classification: [blocker/non-blocking/noise/invalid]
Impact: [what this means for the current task]
Workaround: [how to continue, if possible]
Future fix: [what should be done to prevent recurrence]
```

## Recording

- For the current session: include in your final response/handoff.
- For recurring issues: append to `docs/agentic/FAILURE_LEDGER.md`.
- For workflow improvements: propose a candidate for `docs/agentic/GUIDE_UPDATE_PROTOCOL.md`.

## Guardrails

- Never silently ignore a failure and move on.
- Never claim success if a verification step failed.
- If a failure blocks the task, say so clearly — don't work around it silently.
- Distinguish between "tool not available" (non-blocking) and "tool produced wrong result" (potentially blocking).
