---
name: adversarial-review
description: Full PR review pipeline — review, post comment, fix ALL severities, push. Never stop mid-pipeline.
user-invocable: true
---

# Adversarial Review

## Trigger
- PR ready for review
- User says "review" (this always means adversarial review)
- Before merging any PR
- After significant changes

## Pipeline (all steps = one atomic operation)

### Step 1: Identify target
- PR number provided → use that
- No number → detect current branch, find associated PR
- No PR → review uncommitted changes in working tree

### Step 2: Read existing feedback
- Read all PR comments and review threads
- Unresolved feedback must be addressed during fix phase
- Note any feedback patterns from previous reviews

### Step 3: Review the diff
Read every changed file. Check for:

**CRITICAL** (merge-blocking):
- Broken HTML structure (unclosed tags, invalid nesting)
- Missing page content (accidentally deleted sections)
- Broken navigation links
- JavaScript errors that prevent page load
- Security issues (inline scripts from untrusted sources, exposed data)

**HIGH** (should fix before merge):
- Accessibility regressions (missing alt text, broken keyboard nav, contrast failures)
- Broken responsive layout at key breakpoints
- Hardcoded colors/sizes instead of CSS custom properties
- Missing `prefers-reduced-motion` support on new animations
- Broken cross-page consistency (CV dates don't match portfolio)

**MEDIUM** (fix in this PR if reasonable):
- Suboptimal semantic HTML (div where section/article fits)
- Missing lazy loading on below-fold images
- Non-descriptive link text
- Missing or outdated meta tags
- Inconsistent spacing or styling patterns

**LOW** (note for follow-up):
- Minor code style inconsistencies
- Optimization opportunities
- Documentation gaps

### Step 4: Post findings
Post a PR comment using `gh pr comment` with all findings organized by severity.

### Step 5: Fix ALL findings
- Fix every CRITICAL, HIGH, MEDIUM, and LOW finding
- Only skip a fix if fixing it would cause a worse problem (explain why)
- Create focused fix commits

### Step 6: Push and verify
- Push fix commits
- Re-read the diff to confirm fixes are correct
- Verify no new issues introduced by fixes

## Rules

- **NEVER** pause between steps to ask "should I continue?"
- **NEVER** skip MEDIUM or LOW findings — fix them all
- **ALWAYS** read existing PR comments before starting review
- All 6 steps are one continuous operation
- Use `gh pr comment` (not `gh pr review`) to post findings

## Output

Summary mapping: finding → fix commit. State what was fixed and what (if anything) was deferred with rationale.
