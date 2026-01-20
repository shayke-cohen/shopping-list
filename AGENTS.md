# AGENTS.md - AI Agent Instructions

> **Last Updated:** 2024-01-16
> **For:** AI agents and Cursor AI working on this project

This document provides everything an AI agent needs to understand and work on this project effectively.

---

## Quick Reference Commands

```bash
# Build
yarn build                 # Build the project
yarn dev                   # Start development server

# Test
yarn test                  # Run all tests
yarn test --watch          # Watch mode
yarn test --coverage       # With coverage report

# Lint
yarn lint                  # Check for errors
yarn lint:fix              # Auto-fix issues
yarn typecheck             # TypeScript check

# Git workflow
./scripts/start-issue.sh <number>    # Start work on issue
./scripts/finish-issue.sh <number>   # Create PR for issue

# CI validation
./scripts/check-ci.sh                # Check CI status once
./scripts/check-ci.sh --retry 3      # Check with retry loop (self-healing)
./scripts/finish-issue.sh <n> --check-ci  # Create PR and verify CI

# GitHub CLI
gh issue list                        # List open issues
gh issue view <number>               # View issue details
gh pr create                         # Create pull request
```

---

## Project Overview

[PROJECT_NAME] is [brief description of what the project does].

### Key Characteristics
- **Language:** TypeScript/JavaScript (or your language)
- **Framework:** [Your framework]
- **Architecture:** [Monolith/Microservices/etc.]

---

## Tech Stack

See [STACK.md](./STACK.md) for full details on approved tools and versions.

| Category | Tool | Version |
|----------|------|---------|
| Runtime | Node.js | 20.x LTS |
| Package Manager | yarn | 4.x |
| Language | TypeScript | 5.3+ |

---

## Project Structure

```
├── .cursor/
│   ├── rules/              # Cursor AI rules
│   └── mcp.json.example    # MCP server config template
├── .github/
│   ├── workflows/          # CI/CD pipelines
│   └── ISSUE_TEMPLATE/     # Issue templates
├── docs/
│   ├── design/             # Feature specifications
│   └── PLANNING.md         # Planning process
├── knowledge/
│   ├── KNOWN_ISSUES.md     # Documented pitfalls
│   ├── LESSONS_LEARNED.md  # Solutions worth preserving
│   └── DECISIONS.md        # Architecture decisions
├── scripts/
│   ├── setup.sh            # Project setup
│   ├── start-issue.sh      # Start work on issue
│   └── finish-issue.sh     # Create PR for issue
├── src/                    # Application source code
├── tests/
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
├── tasks/
│   └── WORKFLOW.md        # Branch & task workflow
├── AGENTS.md              # This file (you are here)
├── ARCHITECTURE.md        # System design
├── BACKLOG.md             # Feature backlog
├── README.md              # Human-readable overview
├── STACK.md               # Tech stack & versions
└── TESTING.md             # Testing guide
```

---

## Critical Rules

### ALWAYS Do These Things

1. **Read before writing**
   - Check `knowledge/KNOWN_ISSUES.md` before starting
   - Read relevant existing code before modifying
   - Understand the full context of an issue

2. **Run tests before committing**
   ```bash
   yarn lint && yarn typecheck && yarn test
   ```

3. **Write tests for new code**
   - Unit tests for new functions
   - Integration tests for new endpoints
   - Regression tests for bug fixes

4. **Post progress updates**
   - Update GitHub issues at key milestones
   - Use the templates in the Workflow section below

5. **Follow existing patterns**
   - Match the style of surrounding code
   - Use established abstractions
   - Don't reinvent what exists

### NEVER Do These Things

1. ❌ **Don't commit directly to main** - Always use feature branches
2. ❌ **Don't skip tests** - Even for "small" changes
3. ❌ **Don't hardcode secrets** - Use environment variables
4. ❌ **Don't ignore linter errors** - Fix them or document exceptions
5. ❌ **Don't make breaking changes without discussion** - Get approval first
6. ❌ **Don't guess on important decisions** - Ask when uncertain

---

## GitHub CLI Reference

### Issues

```bash
gh issue list                          # List open issues
gh issue list --label "priority:high"  # Filter by label
gh issue view 23                       # View issue details
gh issue create --title "..." --label "feature"
gh issue comment 23 --body "message"   # Add comment
gh issue edit 23 --add-label "status:in-progress"
gh issue close 23                      # Close issue
```

### Pull Requests

```bash
gh pr list                             # List open PRs
gh pr create --title "..." --body "Closes #23"
gh pr view 45                          # View PR details
gh pr checkout 45                      # Checkout PR branch
gh pr merge --squash --delete-branch   # Merge PR
gh pr comment 45 --body "message"      # Add comment
```

### Labels

```bash
gh label list                          # List all labels
gh label create "name" --color "hex"   # Create label
```

---

## GitHub Issues Workflow

### Labels

**Type:** `feature`, `enhancement`, `bug`, `hotfix`, `documentation`
**Priority:** `priority:critical`, `priority:high`, `priority:medium`, `priority:low`
**Status:** `status:planning`, `status:in-progress`, `status:review`, `status:blocked`
**Agent:** `agent:assigned`, `agent:needs-human`, `agent:autonomous`

### Starting Work on an Issue

```bash
# Option A: Using worktree script (recommended)
./scripts/start-issue.sh 23

# Option B: Manual branch creation
git checkout main
git pull origin main
git checkout -b feature/issue-23-description

# Post starting comment
gh issue edit 23 --add-label "status:in-progress" --add-label "agent:assigned"
gh issue comment 23 --body "🚀 **Starting Work**
Branch: \`feature/issue-23-description\`
Will post plan for approval before implementation."
```

### Posting Progress Updates

Post updates at these milestones:

1. **Starting** - When you begin work
2. **Plan Ready** - Before implementation (wait for approval)
3. **Progress** - After completing significant components
4. **Blocked** - Immediately when blocked
5. **Complete** - When implementation is done
6. **PR Created** - After creating the pull request

#### Progress Update Template

```bash
gh issue comment 23 --body "## 🔄 Progress Update

### Completed
- ✅ [What's done]

### In Progress
- 🔄 [Current work]

### Remaining
- ⏳ [What's left]

No blockers. Continuing implementation."
```

#### Blocked Template

```bash
gh issue edit 23 --add-label "status:blocked"
gh issue comment 23 --body "## 🚫 Blocked

### Blocker
[Clear description of what's blocking progress]

### What I Need
- [ ] [Specific help needed]

**Waiting for help to continue.**"
```

---

## Ad-Hoc Task Workflow

When you receive a task via conversation (not from an existing GitHub issue), you must create an issue before starting significant work. This ensures audit trails and catches misunderstandings early.

### Task Classification

Classify every ad-hoc task into one of four tiers:

| Tier | Criteria | Issue Required | Wait for Approval |
|------|----------|----------------|-------------------|
| **Trivial** | Single-line, typos, formatting, comments | No | No |
| **Small** | Single file, clear scope, low risk | Yes | No |
| **Medium** | Multi-file, some ambiguity, moderate risk | Yes | Yes |
| **Large** | Architectural, security, breaking, unclear scope | Yes | Yes + detailed plan |

### Classification Decision Tree

Ask yourself these questions:

1. **Is this a single-line or trivial change?** → Trivial (no issue needed)
2. **Am I 100% confident I understand the request?** → If no, bump up one tier
3. **Could this break something in production?** → If yes, at least Medium
4. **Does this touch multiple files or systems?** → If yes, at least Medium
5. **Is this architectural or security-related?** → Large

### Workflow by Tier

#### Trivial Tasks

```bash
# Just do it with a descriptive commit
git commit -m "fix: correct typo in README.md"
```

#### Small Tasks

```bash
# Create issue and proceed immediately
./scripts/create-task-issue.sh \
  --title "Fix button alignment in header" \
  --request "fix the header button" \
  --understanding "Correct CSS alignment for header navigation buttons" \
  --tier small \
  --files "src/components/Header.tsx"

# Then start work
./scripts/start-issue.sh <issue-number>
```

#### Medium/Large Tasks

```bash
# Create issue and WAIT for approval
./scripts/create-task-issue.sh \
  --title "Refactor UserService authentication" \
  --request "clean up the auth code" \
  --understanding "Refactor UserService to separate auth logic from user management" \
  --tier medium \
  --files "src/services/UserService.ts,src/services/AuthService.ts,tests/" \
  --risk medium \
  --plan "1. Extract auth methods to AuthService\n2. Update UserService imports\n3. Add integration tests"
```

Then post the confirmation message to the user and **wait for approval**.

### Confirmation Message Template

For medium/large tasks, after creating the issue, tell the user:

```markdown
## Issue Created

I've created **issue #XX** based on your request.

**My understanding:** [Your interpretation]

**Scope:** [Files/areas affected]

**Risk assessment:** [low/medium/high]

**[View Issue](link)**

Please review and reply with:
- `approved` - I'll proceed with implementation
- `modify` - I'll wait for your corrections
- (or edit the issue directly)
```

### Labels for Agent-Created Issues

| Label | Meaning |
|-------|---------|
| `agent:created` | Issue was created by an AI agent |
| `agent:needs-approval` | Agent is waiting for human approval |
| `tier:small` | Small task, agent proceeding |
| `tier:medium` | Medium task, needs approval |
| `tier:large` | Large task, needs approval + detailed plan |

### Edge Cases

1. **User changes mind:** Update the existing issue, don't create a new one
2. **Multiple related requests:** Bundle into a single issue or create linked issues
3. **No response from human:** After 24 hours, add `agent:needs-human` label
4. **Misunderstanding discovered:** Stop work, update issue, request clarification

---

## Parallel Development (Worktrees)

For working on multiple issues simultaneously:

```bash
# Create worktree for issue
./scripts/start-issue.sh 23

# This creates:
# .worktrees/issue-23/
# ├── .cursor-task.md  # Task instructions
# └── ... (full repo)

# When done
./scripts/finish-issue.sh 23

# List active worktrees
./scripts/list-worktrees.sh
```

---

## Testing Requirements

### Before ANY Commit

```bash
yarn lint          # Must pass
yarn typecheck     # Must pass
yarn test          # Must pass
```

### When Adding Features

1. Write unit tests for new functions
2. Write integration tests for new endpoints
3. Aim for >80% coverage on new code

### When Fixing Bugs

1. **FIRST**: Write a failing test that reproduces the bug
2. **THEN**: Fix the bug
3. **VERIFY**: Test now passes
4. Include both fix and test in commit

---

## Test-Discovered Bug Workflow

When you discover a bug while running tests (not a bug reported by a user), follow this workflow to track and fix it through GitHub issues.

### Bug Classification

Classify discovered bugs by severity:

| Severity | Criteria | Action |
|----------|----------|--------|
| **Critical** | Blocking main functionality, security issue | Create issue immediately, escalate with `agent:needs-human` |
| **High** | Test suite failures affecting multiple tests | Create issue, prioritize fix |
| **Medium** | Single test failure, edge case | Create issue, fix in current session |
| **Low** | Flaky test, minor assertion | Note in issue, fix if time permits |

### Workflow Stages

```
Discovery → Issue Creation → Investigation → Fix in Progress → Fix Complete → Close
```

1. **Discovery** - Detect bug during `yarn test`, capture full error output
2. **Issue Creation** - Create GitHub issue with structured bug report
3. **Investigation** - Post analysis findings to issue
4. **Fix in Progress** - Update issue with approach and progress
5. **Fix Complete** - Update with fix summary, link to commit/PR
6. **Close** - Close issue when PR is merged

### Stage 1: Bug Discovery & Issue Creation

When tests fail, create an issue immediately:

```bash
gh issue create \
  --title "Bug: [brief description of failure]" \
  --label "bug,agent:created,agent:discovered" \
  --body "## 🐛 Bug Discovered During Testing

**Test Command:** \`yarn test [file/pattern]\`
**Failing Test:** \`[describe block] > [test name]\`

### Error Output
\`\`\`
[paste full error message and stack trace]
\`\`\`

### Analysis
- **Expected:** [what the test expected]
- **Actual:** [what actually happened]
- **Suspected Cause:** [initial hypothesis]

### Files Involved
- \`[source file]\`
- \`[test file]\`

### Environment
- Branch: \`$(git branch --show-current)\`
- Last Commit: \`$(git log -1 --oneline)\`

---
**Status:** 🔍 Investigating"
```

### Stage 2: Investigation Update

After analyzing the bug, post your findings:

```bash
gh issue comment <issue-number> --body "## 🔍 Investigation Update

### Root Cause
[Clear explanation of what's causing the bug]

### Proposed Fix
[Approach to fix the issue]

### Files to Modify
- \`[file 1]\` - [what change]
- \`[file 2]\` - [what change]

### Risk Assessment
- **Risk:** [low/medium/high]
- **Affected Areas:** [what else might be impacted]

---
**Status:** 🔧 Implementing fix"
```

### Stage 3: Fix Complete

After implementing the fix:

```bash
gh issue comment <issue-number> --body "## ✅ Fix Complete

### Changes Made
- [Change 1]
- [Change 2]

### Verification
- [x] Original failing test now passes
- [x] All related tests pass (\`yarn test [pattern]\`)
- [x] No new test failures
- [x] Linter passes (\`yarn lint\`)
- [x] Type check passes (\`yarn typecheck\`)

### Commits
- \`[hash]\` - [commit message]

### Regression Test Added
- \`[test file]\` - [test description]

---
**Status:** ✅ Fixed, ready for review"
```

### Stage 4: Close Issue

When the PR is merged or fix is verified:

```bash
gh issue close <issue-number> --comment "Fix verified and merged. Closing issue."
```

### Quick Reference: Bug Issue Commands

```bash
# Create bug issue
gh issue create --title "Bug: ..." --label "bug,agent:created,agent:discovered"

# Add investigation update
gh issue comment <num> --body "## 🔍 Investigation Update..."

# Add fix complete update  
gh issue comment <num> --body "## ✅ Fix Complete..."

# Mark as blocked (if stuck)
gh issue edit <num> --add-label "status:blocked,agent:needs-human"

# Close when done
gh issue close <num> --comment "Fixed in PR #XX"
```

### Labels for Test-Discovered Bugs

| Label | When to Use |
|-------|-------------|
| `bug` | Always - marks as bug type |
| `agent:created` | Always - agent created this issue |
| `agent:discovered` | Always - bug found during testing |
| `priority:critical` | Security or blocking issues |
| `priority:high` | Multiple test failures |
| `status:in-progress` | Currently being fixed |
| `status:blocked` | Stuck, needs help |
| `agent:needs-human` | Requires human decision |

### Decision Tree: Should I Create an Issue?

```
Test Failed?
├── Is this a known flaky test? → Check KNOWN_ISSUES.md first
├── Is this related to my current work?
│   ├── Yes, I broke it → Fix immediately, no separate issue needed
│   └── No, pre-existing bug → Create issue, decide whether to fix now
├── Is this blocking my current task?
│   ├── Yes → Create issue, fix it, then continue
│   └── No → Create issue, continue current task, fix later
└── Is this a test environment issue?
    ├── Yes → Check setup, don't create issue for env problems
    └── No → Create issue
```

### Example: Complete Bug Workflow

```bash
# 1. Run tests, discover failure
yarn test
# FAIL src/services/user.service.test.ts
# ● UserService › createUser › should validate email format

# 2. Create issue
gh issue create \
  --title "Bug: UserService.createUser not validating email format" \
  --label "bug,agent:created,agent:discovered,priority:medium" \
  --body "## 🐛 Bug Discovered During Testing
  
**Test Command:** \`yarn test src/services/user.service.test.ts\`
**Failing Test:** \`UserService > createUser > should validate email format\`

### Error Output
\`\`\`
Expected: ValidationError to be thrown
Received: User created with invalid email 'not-an-email'
\`\`\`

### Analysis
- **Expected:** Invalid emails should throw ValidationError
- **Actual:** Invalid emails are accepted
- **Suspected Cause:** Missing email validation in createUser()

### Files Involved
- \`src/services/user.service.ts\`
- \`src/services/user.service.test.ts\`

---
**Status:** 🔍 Investigating"
# Created issue #42

# 3. Investigate and update
gh issue comment 42 --body "## 🔍 Investigation Update

### Root Cause
The \`createUser\` function doesn't validate the email field before creating the user.

### Proposed Fix
Add email validation using the existing \`isValidEmail\` utility.

### Files to Modify
- \`src/services/user.service.ts\` - Add validation call

---
**Status:** 🔧 Implementing fix"

# 4. Fix the bug, run tests
# ... make changes ...
yarn test  # All pass

# 5. Post fix complete
gh issue comment 42 --body "## ✅ Fix Complete

### Changes Made
- Added email validation in \`createUser()\`
- Returns ValidationError for invalid emails

### Verification
- [x] Original failing test now passes
- [x] All UserService tests pass
- [x] No new test failures

### Commits
- \`a1b2c3d\` - fix(user): add email validation in createUser

---
**Status:** ✅ Fixed"

# 6. Close after PR merge
gh issue close 42 --comment "Fixed in PR #43"
```

---

## Code Style

### File Headers

```typescript
/**
 * @file Description of what this file contains
 * @module ModuleName
 */
```

### Naming Conventions

- **Files:** `kebab-case.ts` for utilities, `PascalCase.tsx` for components
- **Variables/Functions:** `camelCase`
- **Classes/Types:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`

### Commit Messages

```
<type>(<scope>): <subject> (#<issue>)

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**
```
feat(auth): add OAuth2 login (#23)
fix(api): handle null response (#45)
docs(readme): update installation steps
```

---

## Screenshot Guidelines

Screenshots are essential for visual communication, especially for UI work and bug reports.

### When Screenshots Are Required

| Scenario | Required | What to Capture |
|----------|----------|-----------------|
| Bug report (UI-related) | ✅ Yes | The bug in context, error states |
| Bug report (non-visual) | ⚠️ Helpful | Console errors, network tab |
| Feature request | ⚠️ Optional | Mockups, wireframes, reference UI |
| PR with UI changes | ✅ Yes | Before/After comparison |
| Progress update (UI work) | ✅ Yes | Current implementation state |
| Progress update (backend) | ❌ No | N/A |
| Test failure (visual) | ✅ Yes | Failure state + error output |

### What to Capture

**For Bug Reports:**
- Full context of the bug (not just the broken element)
- Browser/device info visible if relevant
- Console errors (DevTools → Console tab)
- Network failures (DevTools → Network tab)
- Any error messages or toasts

**For Progress Updates:**
- Current state of the UI being implemented
- Comparison to mockup/spec if available
- Multiple states if relevant (loading, empty, error, success)
- Mobile/responsive views if applicable

**For Pull Requests:**
- **Before:** Original state (screenshot from `main` branch)
- **After:** New state with your changes
- Side-by-side if possible
- Multiple screenshots if multiple UI areas affected

### Progress Update with Screenshots Template

```bash
gh issue comment 23 --body "## 🔄 Progress Update

### Completed
- ✅ Implemented header component
- ✅ Added responsive styles

### Screenshots

**Desktop View:**
![Desktop implementation](paste-image-url-here)

**Mobile View:**
![Mobile implementation](paste-image-url-here)

**Compared to Mockup:**
| Mockup | Implementation |
|--------|----------------|
| ![Mockup](url) | ![Current](url) |

### In Progress
- 🔄 Working on footer

### Questions
- Does the spacing look correct on mobile?"
```

### Best Practices

1. **Crop to context** - Show enough to understand, not entire desktop
2. **Annotate if needed** - Use arrows/circles to highlight relevant areas
3. **Consistent sizing** - Use similar dimensions for before/after comparisons
4. **Include error text** - Copy-paste error messages alongside screenshots
5. **Redact sensitive data** - Blur PII, tokens, API keys, internal URLs
6. **Use descriptive alt text** - `![Login form with validation error](url)`
7. **Multiple viewports** - Include mobile screenshots for responsive changes

### How to Add Screenshots in GitHub

**Option 1: Drag and Drop**
- Simply drag an image file into the GitHub comment box
- GitHub automatically uploads and generates the markdown

**Option 2: Paste from Clipboard**
- Take a screenshot (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)
- Paste directly into the GitHub comment box (Cmd+V / Ctrl+V)

**Option 3: Link to External Image**
```markdown
![Description](https://example.com/image.png)
```

### For AI Agents

When working on UI tasks, agents should:

1. **Use browser tools** to take screenshots at key milestones
2. **Include screenshots** in progress updates for any visual work
3. **Compare against specs** - reference the original design/mockup
4. **Document visual decisions** - explain any deviations from spec
5. **Request feedback** - ask if the implementation looks correct

```bash
# Example: Progress update with screenshot request
gh issue comment 23 --body "## 🔄 Progress Update

### Implementation Screenshot
![Current state](uploaded-screenshot-url)

### Questions
- Does the button placement match the design?
- Should the hover state be more prominent?

Waiting for visual feedback before continuing."
```

---

## Adding Knowledge

When you solve a non-trivial problem, document it:

### For Known Issues

Add to `knowledge/KNOWN_ISSUES.md`:

```markdown
## [ISSUE-ID] Brief Title
**Date:** YYYY-MM-DD
**Severity:** High/Medium/Low
**Symptoms:** What went wrong
**Root Cause:** Why it happened
**Solution:** How to fix it
**Prevention:** How to avoid it
```

### For Lessons Learned

Add to `knowledge/LESSONS_LEARNED.md`:

```markdown
## [LESSON-ID] Title
**Context:** When this applies
**Problem:** What was challenging
**Solution:** The approach that worked
**Why It Works:** Explanation
**Tags:** searchable, keywords
```

---

## Troubleshooting

### Debugging Approach

When something isn't working, follow this sequence:

1. **Read the error message carefully** - Often contains the solution
2. **Check `knowledge/KNOWN_ISSUES.md`** - May already be documented with solution
3. **Check `knowledge/LESSONS_LEARNED.md`** - Similar problems may have been solved
4. **Reproduce minimally** - Isolate the failing case
5. **Check recent changes** - `git diff` or `git log`
6. **Search the codebase** - Similar patterns may exist
7. **Check MCP/Cursor logs** - For tool or connection issues
8. **Search the web** - For errors, best practices, or to learn more
9. **Add logging** - Trace the execution path
10. **Escalate if stuck** - Use `agent:needs-human` after 15-20 min

### Check the Knowledge Base First

Before deep debugging, always check:

```bash
# Search known issues
grep -i "error message" knowledge/KNOWN_ISSUES.md

# Search lessons learned
grep -i "topic" knowledge/LESSONS_LEARNED.md

# Search architecture decisions
grep -i "feature" knowledge/DECISIONS.md
```

### Checking MCP/Cursor Logs

For MCP server or tool issues:

1. **Cursor Settings** → Features → MCP → Check server status
2. **View logs**: Look for connection errors or tool failures
3. **Common MCP issues**:
   - Server showing "Disconnected" → Restart Cursor
   - Tools not appearing → Switch to Agent mode
   - Permission errors → Approve tool usage when prompted
   - Environment variables → Check `.env` and `GITHUB_TOKEN`

### Web Search

Use web search liberally - not just for errors, but to learn and verify:

**When to Search:**
- Unfamiliar error messages
- Learning about a library/API you haven't used before
- Best practices for a pattern or approach
- Checking if a solution is current (not deprecated)
- Understanding edge cases or limitations
- Finding examples of similar implementations

**What to Search:**
- Error messages (without project-specific paths)
- "How to [task] in [technology]"
- "[Library name] best practices 2024"
- "[Technology] vs [alternative] comparison"
- "[Feature] documentation [framework]"

**Where to Look:**
- Official documentation (most authoritative)
- GitHub repos and issues (real-world usage)
- Stack Overflow (community solutions)
- Dev blogs and tutorials (practical examples)
- Release notes/changelogs (for version-specific info)

**After Finding a Solution:**
- Verify it applies to your version
- Test before assuming it works
- Document in `knowledge/LESSONS_LEARNED.md` if non-trivial

### Common Issues

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| Import not found | Missing dependency | `yarn add <package>` |
| Type errors | Outdated types | `yarn typecheck`, fix types |
| Test timeout | Async not awaited | Add `await`, increase timeout |
| Lint failing | Style violation | `yarn lint:fix` |
| Build failing | Syntax error | Check error line, fix syntax |
| Module not found | Wrong path | Check relative imports |
| Permission denied | Script not executable | `chmod +x script.sh` |
| MCP not connecting | Server issue | Restart Cursor, check env vars |
| CI failed | Various | Run `./scripts/check-ci.sh`, read `.ci-failure.log` |

### Build & Test Failures

```bash
# See full error output
yarn test --verbose

# Run single failing test
yarn test path/to/test.ts

# Check TypeScript errors
yarn typecheck

# See lint issues
yarn lint
```

### CI Validation & Self-Healing

After pushing code, you can validate CI status and automatically fix failures:

```bash
# Check CI status with retry loop (recommended)
./scripts/check-ci.sh --retry 3

# Or include in finish workflow
./scripts/finish-issue.sh 23 --check-ci
```

**How the self-healing loop works:**

1. Script watches the CI run on your branch
2. If CI fails, it writes details to `.ci-failure.log`
3. Read the failure log to understand what broke
4. Fix the issue, commit, and push
5. Script automatically detects the new run and watches it
6. Repeat until CI passes or max retries reached

**Reading failure logs:**

```bash
# View the failure summary
cat .ci-failure.log

# The log contains:
# - Run ID and URL
# - Which step failed (lint, test, build)
# - Actual error output from the failed step
```

**Common CI failures and fixes:**

| Failure | Likely Fix |
|---------|------------|
| Lint errors | Run `yarn lint:fix`, commit changes |
| Type errors | Fix types shown in log, run `yarn typecheck` locally |
| Test failures | Read test output, fix failing assertions |
| Build errors | Check syntax errors, missing imports |

### When to Escalate

Use `agent:needs-human` when:

- Stuck for more than 15-20 minutes
- Error message is unclear even after web search
- Requires external access (credentials, APIs, services)
- Architecture decision needed
- Security implications unclear
- Multiple valid approaches, need guidance
- Issue might affect other parts of the system

---

## Getting Help

1. **Check documentation first** - README.md, ARCHITECTURE.md, this file
2. **Search knowledge/** - May already be documented
3. **Ask via GitHub issue comment** - For project-specific questions
4. **Use `agent:needs-human` label** - For decisions requiring human input

> **How this works:** When you add this label and post a question, you're creating a bookmark for the human. The agent session will end. When a human responds and re-opens the worktree in Cursor, the new session reads the issue thread and continues.

---

## Quick Checklist

Before submitting a PR:

- [ ] All tests pass (`yarn test`)
- [ ] Linter passes (`yarn lint`)
- [ ] Type check passes (`yarn typecheck`)
- [ ] New code has tests
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
- [ ] PR references the issue number
- [ ] Knowledge entries added (if applicable)
- [ ] CI passes (`./scripts/check-ci.sh` or `--check-ci` flag)
- [ ] Screenshots included (if UI changes)

---

## Template Updates (AI-Native Engineer)

This project uses AI-Native Engineer templates. Periodically check for and apply updates.

### Sync Templates

Ask the AI agent:
> "Sync the latest AI-Native Engineer templates"

The agent will:
1. Call `templates({ mode: "sync" })` to get all templates with `llmInstructions`
2. Read each existing file
3. Apply updates based on `llmInstructions`:
   - `create-if-missing`: Only create new files
   - `overwrite`: Replace file entirely
   - `merge`: Keep project-specific sections, update template sections
4. Report what was created/updated/skipped

### List Available Templates

> "What AI-Native Engineer templates are available?"

The agent calls `templates({ mode: "list" })` to show all templates with descriptions.

### Recommended Workflow

Before starting major work:
1. Ask: "Are there any template updates available?"
2. Review what changed
3. Apply updates if appropriate
4. Continue with your task

### What Gets Preserved on Merge

For `AGENTS.md`, these sections are **preserved** (your project-specific content):
- Quick Reference Commands
- Project Overview
- Tech Stack
- Project Structure

Everything else is **updated** from the template (workflows, rules, best practices).
