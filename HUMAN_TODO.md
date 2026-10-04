# Human actions

Items only the owner can do. Agents may check an item off when its completion is directly verified;
decisions and approvals stay open until the owner supplies them.

## Open

<!-- Rendered from the agent-hq decision inbox (decisions.py render --repo cv-and-portfolio). -->
- [ ] **cv-portfolio-refresh-2026-10: How should the public portfolio be refreshed? Pick a content option; the mobile fix rides with A and B.**
  - (a) Option A: catalogue rows plus the mobile fix: Merge PR 15 and PR 16; close PR 17. Four new catalogue rows with links, Pulseboard corrected, phones fixed.
    + smallest visual change; + keeps the page's current shape; - the agent-operations work reads as four more rows among many
  - (b) Option B: the Workshop spread plus the mobile fix (recommended): Merge PR 15, PR 16, then PR 17 retargeted to main. The four tools get a featured spread after Taskdeck; Alibi gets a catalogue row; phones fixed.
    + presents the recent work as one coherent story; + real links to live desks and repositories; - adds a sixth featured article to an already long page; - opening paragraph is drafted in your voice
  - (c) Mobile fix only: Merge PR 15; close PR 16 and PR 17. Content stays as it is today, including the outdated Pulseboard text.
    + fixes the phone layout with no content change; - recent public work stays off the portfolio
  - (d) Hold everything: Merge nothing; PRs 15 to 17 stay open for a later pass.
    + no change to the public face; - the phone layout stays broken
  - Why: The phone fix is a clear bug fix, and the spread tells the recent work as one story with links that work. Edit B's first paragraph in the notes if the voice is off.
  - Why an agent may not decide: The portfolio is the owner's public face and every merge to main is live immediately; the mission brief requires the owner to pick the visual refresh before it merges.
  - Source: `decisions/cv-portfolio-refresh-2026-10.json`

## Done

- q-1: Declare the repository tier. The owner ratified T2 (daily driver) on 2026-09-27;
  `.agent-harness/tier.json` records it.
