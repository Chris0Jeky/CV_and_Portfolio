---
name: question-batch
description: Decide whether to ask the user or proceed with stated assumptions. Minimize back-and-forth.
user-invocable: true
---

# Question Batch

## Trigger
- Ambiguous task with multiple valid interpretations
- Content accuracy uncertain (dates, facts, titles)
- Task scope unclear
- Multiple approaches possible with different tradeoffs

## Decision table

| Uncertainty type | Ask? | Why |
|---|---|---|
| Content accuracy (dates, titles, companies, facts) | YES | Factual errors on a live CV are harmful |
| Irreversible visual change (removing sections, redesign) | YES | Every push deploys |
| New CDN dependency | YES | Adds external risk |
| Removing existing pages or content | YES | Destructive, no staging |
| Which of several valid CSS approaches | NO | Proceed with the one matching existing patterns |
| Missing local tool (linter, dev server) | NO | Note it and continue |
| Broad task scope ("improve the portfolio") | NO | Pick the highest-impact slice, state what you chose |
| Ambiguous formatting preference | NO | Match existing patterns |
| File organization choice | NO | Follow existing structure |

## Workflow

1. **Classify each uncertainty** using the table above.
2. **For "NO" items**: State your assumption inline — `Assumption: <specific>. Reason: <source>.`
3. **For "YES" items**: Batch into a single compact message.
4. **Never drip-feed** questions one at a time across multiple messages.

## Question format

```
Before I proceed, I need to confirm:

1. [Specific question with context and options]
2. [Specific question]

I'm assuming:
- [Assumption 1 with rationale]
- [Assumption 2 with rationale]

I'll proceed with these assumptions unless you say otherwise.
```

## Guardrails

- Maximum one question batch per task. If you need to ask again, you scoped wrong.
- Never ask about tool/process choices — just use the best one available.
- Never ask "should I proceed?" — state your plan and do it.
- When in doubt between asking and assuming: if the mistake is easily reversible, assume. If it's hard to reverse (content accuracy, deletion), ask.
