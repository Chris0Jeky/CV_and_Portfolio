# Guide Update Protocol — CV & Portfolio

How to improve the operating system (CLAUDE.md, AGENTS.md, skills) without making instructions noisy or unstable.

## When to update (at least one condition met)

1. Same mistake happened 2+ times.
2. A review caught something agents should know about.
3. A workaround was needed that future agents would rediscover.
4. A source-of-truth path changed (file moved, renamed, deleted).
5. A safety or permission boundary changed.

## Where to write

| Content type | Destination |
|---|---|
| Universal rule (applies to all work) | `AGENTS.md` |
| Claude Code quick reference | `CLAUDE.md` |
| Repeatable workflow | `.claude/skills/<name>/SKILL.md` |
| Shared protocol (git, questions, failures) | `docs/agentic/*.md` |
| Recurring failure | `docs/agentic/FAILURE_LEDGER.md` |

## Anti-bloat rules

- `CLAUDE.md` should stay under 200 lines of actual rules (docs index doesn't count).
- `AGENTS.md` should stay under 300 lines.
- No duplicate long checklists across files — put the checklist in one place and reference it.
- Replace obsolete guidance instead of appending new guidance alongside it.
- One precise rule is better than three vague warnings.

## Candidate patch format

When proposing a guide update:

```
Observed: [what happened]
Root cause: [why the agent failed or made the wrong choice]
Repeat risk: [low | medium | high]
Proposed destination: [which file to update]
Proposed wording: [1-2 bullet points, specific and actionable]
Verification: [how we know the update is correct]
```
