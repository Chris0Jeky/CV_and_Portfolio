# Question Protocol — CV & Portfolio

When to ask the user vs. proceed with assumptions.

## Decision table

| Uncertainty type | Ask? | Rationale |
|---|---|---|
| Content accuracy (dates, titles, companies) | YES | Factual errors on a live CV are harmful |
| Removing existing content or pages | YES | Destructive, deploys immediately, no staging |
| Irreversible visual redesign | YES | Subjective, hard to revert once live |
| New CDN dependency | YES | External risk, maintenance burden |
| Adding analytics or tracking | YES | Privacy implication |
| CSS approach choice (flexbox vs grid) | NO | Match existing patterns |
| Which file to edit | NO | Follow repo map in AGENTS.md |
| HTML structure choice | NO | Use semantic HTML best practices |
| Broad task ("improve portfolio") | NO | Pick highest-impact slice, state what you chose |
| Missing local tool | NO | Note it and continue |
| Code formatting preference | NO | Match existing file conventions |

## Assumption format

```
Assumption: [specific assumption]
Reason: [where you got this from — existing code, convention, AGENTS.md]
Reversible by: [how to undo if wrong]
```

## Question format

Batch all blockers into one message:

```
Before I proceed, I need to confirm:

1. [Question with context and options]
2. [Question]

I'm assuming:
- [Assumption with rationale]

I'll proceed with these assumptions unless you say otherwise.
```

## Rules

- Maximum one question batch per task.
- Never drip-feed questions across multiple messages.
- Never ask "should I proceed?" — state your plan and do it.
- If the mistake is easily reversible, assume. If it's hard to reverse, ask.
