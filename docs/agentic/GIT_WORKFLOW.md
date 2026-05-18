# Git Workflow — CV & Portfolio

Plain-language git rules for agents and contributors.

## Hard rules

| Rule | Why |
|------|-----|
| Never rebase | Rewrites history → requires force-push → can destroy shared work |
| Never force-push | Can overwrite commits others depend on |
| Never `--amend` after push | Changes a published commit → requires force-push |
| Never `reset --hard` without approval | Destroys uncommitted work permanently |
| Never `clean -f` without approval | Deletes untracked files permanently |
| Never `checkout -- .` or `restore .` | Discards all uncommitted changes |

## Safe recovery commands (always OK)

```bash
git merge --abort      # Cancel a merge in progress
git rebase --abort     # Cancel a rebase (if you accidentally started one)
git stash              # Save uncommitted work safely
git stash pop          # Restore saved work
```

## Before any destructive git command

1. **Tell the user** what you want to do (plain language).
2. **Explain** what data is at risk.
3. **State** whether it's reversible and the recovery path.
4. **Wait** for explicit approval.

## Branching

- Feature branches: `feature/<slug>` (e.g., `feature/add-project-card`)
- Fix branches: `fix/<slug>` (e.g., `fix/mobile-nav-overlap`)
- Keep branch names short and descriptive.
- Update your branch with: `git merge main` (never rebase).

## Commits

- Concise imperative subject: `add project card for AI analytics`, `fix mobile menu overlap`
- One logical change per commit.
- Don't mix content updates with structural changes.

## Important: every push deploys

This repo uses GitHub Pages. Pushing to `main` immediately deploys to the live site. There is no staging environment. Verify your changes before pushing.

## When things get tangled

1. **Stop.** Don't attempt destructive recovery.
2. Run `git status` and `git log --oneline -10`.
3. Tell the user: what happened, current state, and options (safest first).
4. Let the user choose. Never silently discard work.
