---
name: content-update
description: Update CV or portfolio content (experience, projects, skills, education) while preserving factual accuracy.
user-invocable: true
---

# Content Update

## Trigger
- New job, project, skill, or education entry to add
- Existing content needs updating (dates, descriptions, responsibilities)
- Content reorganization or reordering
- Adding a new case study page

## Workflow

1. **Confirm the facts** with the user before editing:
   - Job titles, company names, dates → must be user-provided
   - Skills and technologies → verify they're accurate
   - Project descriptions → enhance wording but don't fabricate outcomes
2. **Identify all pages that need the update**:
   - CV update → `CV/cv.html` + check `cv-tabloid.html` + `cv-academic.html`
   - Portfolio update → `Portfolio/portfolio.html`
   - New project → new file in `Portfolio/projects/` + link from portfolio
3. **Read the target section** in each file.
4. **Match existing patterns**:
   - CV: follow the existing HTML structure for job entries, education, etc.
   - Portfolio: follow the timeline item, project card, or skill badge pattern
   - Case studies: follow `project-detail.css` styling and existing case study structure
5. **Implement the update** keeping content consistent across pages.
6. **Verify** all modified pages render correctly.

## Content consistency rules

- If a job appears in the CV, it should appear in the Portfolio timeline (and vice versa).
- Dates must match across all pages.
- Skills listed in the CV skills section should match Portfolio skills grid.
- Project descriptions can differ in length (brief in portfolio, detailed in case study) but facts must match.

## Adding a new case study

1. Create `Portfolio/projects/<slug>.html` following an existing case study as template.
2. Use `project-detail.css` for styling (already linked in existing case studies).
3. Add a project card in `Portfolio/portfolio.html` linking to the new page.
4. Ensure the case study has: title, overview, tech stack, challenges, outcomes, back-link to portfolio.

## Guardrails

- **Never fabricate content.** If information is missing, ask the user.
- **Never change dates, titles, or company names** without explicit confirmation.
- Keep updates consistent across all CV/portfolio variants.
- Update meta descriptions if the page content significantly changed.
