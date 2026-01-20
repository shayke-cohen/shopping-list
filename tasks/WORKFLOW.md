# Task Workflow

> This document describes how to manage tasks and parallel work in this repository.

---

## Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<issue-id>-short-description` | `feature/23-user-auth` |
| Bug Fix | `bugfix/<issue-id>-short-description` | `bugfix/45-login-error` |
| Hotfix | `hotfix/<issue-id>-short-description` | `hotfix/99-critical-bug` |
| Task | `task/<issue-id>-short-description` | `task/67-update-deps` |
| Agent | `agent/<agent-name>-<issue-id>` | `agent/cursor-23` |

---

## Task Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Create    │────▶│    Work     │────▶│   Review    │
│   Issue     │     │  (Branch)   │     │    (PR)     │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Update    │◀────│   Merge     │◀────│   Approve   │
│  Knowledge  │     │  to Main    │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step

1. **Create GitHub Issue** with task template
2. **Create branch** from `main` following naming convention
3. **Work in isolation** (agent or human)
4. **Keep branch updated**: `git pull origin main` regularly
5. **Open PR** when ready, reference issue number
6. **Pass CI checks** + code review
7. **Merge** (squash preferred for clean history)
8. **Update knowledge/** if lessons learned
9. **Delete branch** after merge

---

## Quick Reference Commands

```bash
# Create branch for issue
git checkout -b feature/issue-23-description

# Update branch from main
git fetch origin main
git rebase origin/main

# Push branch
git push -u origin feature/issue-23-description

# Create PR
gh pr create --title "Feature: ..." --body "Closes #23"

# Merge PR (after approval)
gh pr merge --squash --delete-branch
```
