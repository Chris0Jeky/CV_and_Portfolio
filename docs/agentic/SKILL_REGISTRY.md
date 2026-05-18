# Skill Registry — CV & Portfolio

Central index of all available skills and their triggers.

## Claude Code Skills (.claude/skills/)

| Skill | Trigger | Description |
|-------|---------|-------------|
| `repo-onramp` | Session start, vague scope | Orient to the project before editing |
| `safe-slice` | Any implementation task | One small, reviewable change |
| `design-review` | CSS changes, visual work | Design system compliance, responsive check |
| `a11y-audit` | New content, visual changes | WCAG 2.1 AA accessibility audit |
| `seo-perf` | Meta tags, performance | SEO and Core Web Vitals optimization |
| `content-update` | CV/portfolio text changes | Content management with factual accuracy |
| `visual-qa` | After visual changes | Cross-browser, responsive, print verification |
| `verify-and-sync` | Before commit/push | Final verification and honest status report |
| `question-batch` | Ambiguous task | Decide ask vs. assume, batch questions |
| `failure-capture` | Tool/command failure | Record and classify failures |
| `adversarial-review` | PR review | Full review → comment → fix ALL → push pipeline |
| `implement-and-ship` | Concrete task/issue | Full lifecycle: understand → branch → implement → verify → PR |

## Skill selection guide

```
Starting a session?           → repo-onramp
Making a change?              → safe-slice
Changing CSS/visuals?         → safe-slice + design-review
Adding content?               → content-update
Reviewing a PR?               → adversarial-review
Something broke?              → failure-capture
Not sure what to do?          → question-batch
Done with work?               → verify-and-sync
Full feature/fix lifecycle?   → implement-and-ship
Accessibility concern?        → a11y-audit
SEO or performance?           → seo-perf
Testing visual output?        → visual-qa
```

## Maintenance

- When a skill becomes noisy (>100 lines), split long references into separate docs and link from the skill.
- When adding a new skill, add it to this registry.
- When removing a skill, remove it from this registry and from `CLAUDE.md` skill routing table.
