# Spec-Driven Development with Claude Code & cc-sdd
### A Beginner-Friendly Complete Guide

> **See also:** For a tool-agnostic conceptual overview of the spec-driven pattern, see [`spec-driven-vibe-coding.md`](spec-driven-vibe-coding.md).

> **Who this is for:** Developers who are new to Claude Code and want to use it with a structured, Kiro-inspired spec-driven workflow instead of vibe coding.

---

## Table of Contents

1. [What is Spec-Driven Development?](#1-what-is-spec-driven-development)
2. [How Claude Code + cc-sdd Fits Together](#2-how-claude-code--cc-sdd-fits-together)
3. [Installation & Setup](#3-installation--setup)
4. [Project Structure After Install](#4-project-structure-after-install)
5. [The Core Workflow — Step by Step](#5-the-core-workflow--step-by-step)
6. [Steering — Claude's Long-Term Memory](#6-steering--claudes-long-term-memory)
7. [Building a Feature: Full Walkthrough](#7-building-a-feature-full-walkthrough)
8. [The Implementation Phase](#8-the-implementation-phase)
9. [Reviewing & Validating Specs](#9-reviewing--validating-specs)
10. [Customizing Your Workflow](#10-customizing-your-workflow)
11. [Daily Habits & Best Practices](#11-daily-habits--best-practices)
12. [Troubleshooting Common Issues](#12-troubleshooting-common-issues)
13. [Quick Reference Card](#13-quick-reference-card)

---

## 1. What is Spec-Driven Development?

### The Problem with Vibe Coding

When you use an AI coding assistant without structure, you typically end up in a loop like this:

```
You: "Add a login feature"
AI: [writes 200 lines of code]
You: "That's not quite right, make it use JWT"
AI: [rewrites everything]
You: "Actually I need refresh tokens too"
AI: [rewrites again]
You: "The structure doesn't match our existing codebase"
AI: [rewrites again]
```

This is called **vibe coding** — you're steering the AI in real time with no plan. It works for small throwaway scripts but falls apart for anything serious because:

- The AI loses context between sessions and forgets what was decided
- You make important architectural decisions reactively, mid-implementation
- It's hard to review what the AI did or why
- Other team members can't understand what was built or replicate the process

### The Spec-Driven Solution

Spec-Driven Development (SDD) flips this around. **You plan first, then build.** The AI helps you write the plan, you review and approve it, and only then does it write code.

The process has three human approval gates before a single line of code is written:

```
1. REQUIREMENTS  ← What should this feature do? (user stories, acceptance criteria)
       ↓ you review & approve
2. DESIGN        ← How should it be built? (architecture, components, data flow)
       ↓ you review & approve
3. TASKS         ← What exact steps will implement it? (atomic, testable tasks)
       ↓ you review & approve
4. IMPLEMENTATION ← Claude codes autonomously, task by task
```

The result: fewer surprises, better code quality, and a permanent record of every decision made.

---

## 2. How Claude Code + cc-sdd Fits Together

### What is Claude Code?

Claude Code is Anthropic's official AI coding agent that runs in your terminal. Unlike chat-based AI tools, Claude Code can:

- Read and write files in your project
- Run terminal commands
- Spawn multiple subagents to work in parallel
- Maintain project memory via `CLAUDE.md`
- Use slash commands (`/command`) to trigger structured workflows

### What is cc-sdd?

cc-sdd (Claude Code Spec-Driven Development) is a free, open-source plugin that installs a set of **Skills** and **slash commands** into Claude Code that give it Kiro-style spec-driven capabilities. It adds:

- `/kiro-*` slash commands for each phase of the workflow
- Steering document management
- Spec file templates (requirements, design, tasks)
- Autonomous implementation with per-task subagents

### How They Work Together

```
Your Terminal (PowerShell)
        ↓
   Claude Code (claude)
        ↓
   cc-sdd Skills (.claude/skills/)
        ↓
   Spec Files (.kiro/specs/)
   Steering Docs (.kiro/steering/)
   Project Memory (CLAUDE.md)
```

cc-sdd is not a separate app — it's a set of instructions baked into your project that Claude Code reads when you use `/kiro-*` commands.

---

## 3. Installation & Setup

### Prerequisites

Make sure you have these installed and working in PowerShell:

```powershell
node --version    # Should show v18 or higher
npm --version     # Any recent version
claude --version  # Claude Code
```

If any of these aren't working, see the PATH fix in the appendix.

### Step 1: Install Claude Code (if not already done)

```powershell
npm install -g @anthropic-ai/claude-code
```

After install, refresh your PATH:
```powershell
refreshenv    # if you have the refreshenv function set up
# or just close and reopen PowerShell
```

### Step 2: Authenticate Claude Code

```powershell
claude
```

On first launch it will open a browser window. Log in with your Claude.ai account (requires Pro, Max, Team, or Enterprise — free plan does not include Claude Code).

### Step 3: Navigate to Your Project

Always run Claude Code from inside your project directory:

```powershell
cd C:\Users\yourname\projects\my-project
claude
```

> **Important:** Claude Code's context is scoped to the directory you launch it from. Always `cd` into your project first.

### Step 4: Install cc-sdd into Your Project

Exit Claude Code first (`/exit` or Ctrl+C), then run:

```powershell
npx cc-sdd@latest --claude-skills
```

Follow the prompts:
- **Agent selection:** Press Enter for option 1 (Claude Code)
- **Settings templates:** Type `Y` to update
- **CLAUDE.md:** Choose option 2 (Append) if you already have one, option 1 (Overwrite) for a fresh project

This installs:
- `.claude/skills/` — 33 skill files that power the `/kiro-*` commands
- `CLAUDE.md` — your project memory document
- `.kiro/settings/` — templates and rules for spec generation

### Step 5: Re-enter Claude Code

```powershell
claude
```

You're ready to start.

---

## 4. Project Structure After Install

After installing cc-sdd, your project will have this new structure:

```
your-project/
├── .claude/
│   └── skills/
│       ├── kiro-steering.md
│       ├── kiro-discovery.md
│       ├── kiro-spec-init.md
│       ├── kiro-spec-requirements.md
│       ├── kiro-spec-design.md
│       ├── kiro-spec-tasks.md
│       ├── kiro-impl.md
│       └── ... (more skill files)
├── .kiro/
│   ├── steering/
│   │   └── (steering docs will be created here)
│   ├── specs/
│   │   └── (feature specs will be created here)
│   └── settings/
│       ├── templates/
│       │   ├── requirements.md
│       │   ├── design.md
│       │   └── tasks.md
│       └── rules/
├── CLAUDE.md          ← project memory, Claude reads this every session
└── (your existing code)
```

### What Each Part Does

| Path | Purpose |
|------|---------|
| `.claude/skills/` | cc-sdd skill definitions — don't edit these |
| `.kiro/steering/` | Persistent project knowledge (tech stack, patterns, conventions) |
| `.kiro/specs/` | Feature specifications (requirements, design, tasks) |
| `.kiro/settings/templates/` | Templates for generated docs — **edit these to match your style** |
| `CLAUDE.md` | Project constitution — Claude reads this every session |

---

## 5. The Core Workflow — Step by Step

Here is the complete decision flow for every feature you build:

```
START
  │
  ▼
/kiro-steering          (first time or when project changes)
  │
  ▼
/kiro-discovery         (describe what you want to build)
  │
  ├── Simple task? → implement directly, no spec needed
  │
  └── Complex feature? → spec workflow:
        │
        ▼
      /kiro-spec-init <name>
        │
        ▼
      /kiro-spec-requirements <name>
        │
        ▼
      YOU REVIEW requirements.md
        │
        ▼
      /kiro-spec-design <name>
        │
        ▼
      YOU REVIEW design.md
        │
        ▼
      /kiro-spec-tasks <name>
        │
        ▼
      YOU REVIEW tasks.md
        │
        ▼
      /kiro-impl <name>
        │
        ▼
      DONE ✓
```

### When to Use a Spec vs. When to Just Ask

| Use a spec when... | Just ask Claude when... |
|-------------------|------------------------|
| Building a new feature | Fixing a small bug |
| Refactoring a module | Asking a question |
| Adding a new API endpoint | Writing a quick utility function |
| Anything that touches multiple files | One-off tasks under ~30 minutes |
| Work that involves architectural decisions | Minor tweaks |

---

## 6. Steering — Claude's Long-Term Memory

Steering is the most important concept in cc-sdd. Without it, Claude starts every session knowing nothing about your project.

### What Steering Docs Contain

Steering documents live in `.kiro/steering/` and typically cover:

- **Tech stack** — languages, frameworks, libraries, versions
- **Architecture patterns** — how the codebase is structured
- **Coding conventions** — naming, formatting, file organization
- **Security rules** — what the AI is and isn't allowed to do
- **Team processes** — how PRs work, how tests are written, etc.

### Creating Steering Docs

Run this inside Claude Code at the start of a new project:

```
/kiro-steering
```

Claude will analyze your codebase and generate steering docs automatically. It reads your existing files, `package.json`, config files, etc. to understand your project.

For an **existing project**, this is essential — run it before anything else.

### Custom Steering Docs

You can create targeted steering docs for specific topics:

```
/kiro-steering-custom "authentication and authorization patterns"
/kiro-steering-custom "database access conventions"
/kiro-steering-custom "API response format standards"
/kiro-steering-custom "testing patterns and coverage requirements"
```

Each creates a focused `.md` file in `.kiro/steering/`. Claude loads all of them at the start of each session.

### Maintaining Steering Docs

Steering docs go stale. Update them when:

- You adopt a new library or framework
- You establish a new pattern in the codebase
- A team convention changes
- You refactor a major module

```
/kiro-steering-custom "updated error handling patterns after v2 refactor"
```

### The CLAUDE.md File

`CLAUDE.md` is a special file — Claude Code reads it **automatically** at the start of every session, without you asking. Think of it as the project's constitution.

Edit it manually to add things like:

```markdown
## Project Overview
This is a clinical NLP pipeline for multi-label classification of medical notes.

## Critical Rules
- Never modify files in /data/raw/ directly
- All model outputs must be logged to MLflow
- Run pytest before any commit

## Common Commands
- `python train.py --config config/base.yaml` to train
- `pytest tests/ -v` to run tests
```

---

## 7. Building a Feature: Full Walkthrough

Let's walk through building a real feature — a PDF export function — from start to finish.

### Start a New Session

```powershell
cd C:\Users\sorou\projects\my-project
claude
```

First thing every session on an existing project:

```
/kiro-steering
```

This refreshes Claude's understanding of your project before you start work.

### Step 1: Discovery

```
/kiro-discovery I want to add the ability to export reports as PDF
```

Claude will analyze your project and respond with something like:

> "This is a substantial feature touching the report rendering module and adding a new export pipeline. I recommend creating a spec. Run `/kiro-spec-init pdf-export` to begin."

It might also identify:
- Existing code that's relevant
- Potential conflicts or dependencies
- Whether this needs a spec or can be done directly

### Step 2: Initialize the Spec

```
/kiro-spec-init pdf-export
```

This creates the folder `.kiro/specs/pdf-export/` with empty template files.

Use **kebab-case** for spec names: `user-auth`, `pdf-export`, `data-pipeline`, `api-v2`.

### Step 3: Requirements

```
/kiro-spec-requirements pdf-export
```

Claude generates `.kiro/specs/pdf-export/requirements.md`. It will contain:

- **User stories** in EARS notation (e.g., "When the user clicks Export, the system shall generate a PDF")
- **Acceptance criteria** for each story
- **Out of scope** items (what this feature explicitly won't do)
- **Dependencies** (what needs to exist first)

**Your job:** Open the file and review it carefully.

```powershell
# In a separate terminal or your editor:
code .kiro/specs/pdf-export/requirements.md
```

Ask yourself:
- Does this capture what I actually want?
- Are the acceptance criteria testable?
- Is anything missing?
- Is anything included that's out of scope?

Edit the file directly if needed, then tell Claude in the session:

```
The requirements look good, but please add a requirement for password-protected PDFs
```

Or:

```
Approved, move to design
```

### Step 4: Design

```
/kiro-spec-design pdf-export
```

Claude generates `.kiro/specs/pdf-export/design.md`. It will contain:

- **Architecture overview** — how the feature fits into the existing system
- **Component breakdown** — new files/classes/functions needed
- **Data flow diagram** (in text/ASCII)
- **API changes** if any
- **Library choices** with rationale
- **Error handling approach**

**Your job:** Review the design for:
- Does this fit the existing architecture?
- Are the library choices appropriate?
- Are there any security concerns?
- Does this match how we do things elsewhere in the codebase?

You can push back:

```
The design uses a third-party PDF library but we already have wkhtmltopdf configured. Please revise to use the existing setup.
```

### Step 5: Tasks

```
/kiro-spec-tasks pdf-export
```

Claude generates `.kiro/specs/pdf-export/tasks.md`. It will contain a numbered list of atomic tasks like:

```markdown
## Tasks

- [ ] 1. Install and configure pdfkit dependency
- [ ] 2. Create PdfExporter class in /src/exporters/pdf.py
- [ ] 3. Implement render_report() method
- [ ] 4. Add /api/export/pdf endpoint to router
- [ ] 5. Write unit tests for PdfExporter
- [ ] 6. Write integration test for the export endpoint
- [ ] 7. Update API documentation
```

**Your job:** Check that:
- Tasks are in the right order (dependencies first)
- Each task is small enough to be testable
- Nothing important is missing
- No task is doing too many things at once

### Step 6: Implementation

Once you're happy with the tasks:

```
/kiro-impl pdf-export
```

Claude now works autonomously:
- Spawns subagents for each task
- Each task gets an independent reviewer
- Runs tests after each task
- Auto-debugs failures
- Checks tasks off as they complete

You can watch it work, or step away and come back. You'll be asked to approve tool use (file writes, command execution) depending on your permissions settings.

---

## 8. The Implementation Phase

### What /kiro-impl Actually Does

When you run `/kiro-impl`, cc-sdd orchestrates a multi-agent pipeline:

```
Orchestrator Agent
      ↓
For each task in tasks.md:
  ├── Implementer Subagent (writes the code)
  ├── Reviewer Subagent (checks the code)
  └── Debug Subagent (if tests fail)
```

This means the code is reviewed before it's handed to you — not just written blindly.

### Monitoring Progress

As implementation runs, you'll see task-by-task progress. Completed tasks get checked off in `tasks.md`:

```markdown
- [x] 1. Install and configure pdfkit dependency
- [x] 2. Create PdfExporter class in /src/exporters/pdf.py
- [ ] 3. Implement render_report() method   ← currently working on this
```

### Intervening Mid-Implementation

If something goes wrong or you want to redirect:

- Press **Ctrl+C** to pause
- Give Claude new instructions
- Resume with `/kiro-impl pdf-export` — it picks up from where it left off (unchecked tasks)

### Permissions During Implementation

Claude Code will ask for permission before:
- Writing files
- Running commands
- Installing packages

You can configure auto-approval in `~/.claude/settings.json` but start conservative until you trust the workflow.

---

## 9. Reviewing & Validating Specs

### Checking If Code Matches the Spec

After implementation (or at any time), run:

```
/kiro-validate-gap pdf-export
```

This compares your actual code against the spec and reports:
- Tasks that appear complete ✓
- Tasks that seem incomplete or missing ✗
- Code that exists but wasn't in the spec (drift)

This is useful when:
- You made manual edits after `/kiro-impl`
- You want to resume an interrupted implementation
- You're onboarding someone and want to verify state

### Iterating on a Spec

Specs aren't locked. You can go back to any phase:

```
/kiro-spec-requirements pdf-export    ← regenerate requirements
/kiro-spec-design pdf-export          ← update design
/kiro-spec-tasks pdf-export           ← regenerate tasks
```

Claude will read the existing spec files and update rather than start from scratch.

---

## 10. Customizing Your Workflow

### Editing Templates

The templates in `.kiro/settings/templates/` control the format of generated specs. Edit them to match your team's standards.

For example, if your team uses a specific requirements format:

```powershell
code .kiro/settings/templates/requirements.md
```

Add your team's sections, headers, or notation. From now on every `/kiro-spec-requirements` will follow your format.

### Editing Rules

`.kiro/settings/rules/` contains rules that guide Claude's behavior. You can add project-specific rules:

```markdown
## Implementation Rules
- Always write tests before implementation (TDD)
- Never use `any` type in TypeScript
- All functions must have docstrings
- Maximum function length: 50 lines
```

### Customizing CLAUDE.md

`CLAUDE.md` is fully yours to edit. Add anything that Claude should always know:

```markdown
## Environment Setup
- Python 3.11 via pyenv
- Virtual env at .venv/
- Run `source .venv/bin/activate` before any Python commands

## Do Not Touch
- /data/raw/ — source data, read only
- /models/production/ — only CI/CD deploys here

## Key Contacts
- Database schema questions → check /docs/schema.md
- Auth questions → check /docs/auth-flow.md
```

---

## 11. Daily Habits & Best Practices

### Starting Each Session

```powershell
cd your-project
claude
```

Then inside Claude Code:
```
/kiro-steering
```

Always. Even on projects you know well. This costs 30 seconds and prevents Claude from making stale assumptions.

### Naming Specs

Use descriptive kebab-case names that reflect the feature:

| Good | Bad |
|------|-----|
| `user-authentication` | `auth` |
| `pdf-export-reports` | `feature1` |
| `api-rate-limiting` | `new-thing` |
| `patient-data-pipeline` | `fix` |

### One Spec Per Feature

Don't put multiple unrelated features in one spec. Keep them focused. It's fine to have 10 small specs rather than 1 giant one.

### Commit Your Specs

Add `.kiro/` to git, not `.gitignore`. Your specs are documentation — they explain why the code was built the way it was. Future you (and teammates) will thank you.

```powershell
git add .kiro/ CLAUDE.md
git commit -m "Add pdf-export spec"
```

### Don't Skip the Review Gates

The whole point of spec-driven development is that **you approve before Claude codes**. If you just run through all the commands without reading the outputs, you're back to vibe coding with extra steps.

Treat each review like a code review: actually read it, push back on things you disagree with, and only approve when you're satisfied.

---

## 12. Troubleshooting Common Issues

### `/kiro-*` commands not recognized

cc-sdd skills aren't loaded. Make sure you:
1. Ran `npx cc-sdd@latest --claude-skills` in the project directory
2. Launched `claude` from the same project directory

### Claude seems to forget project context between sessions

Run `/kiro-steering` at the start of each session. Also check that `CLAUDE.md` exists and has useful content.

### Implementation stops partway through

Run `/kiro-validate-gap <spec-name>` to see what's done, then `/kiro-impl <spec-name>` again — it resumes from unchecked tasks.

### Spec files look wrong or don't match your style

Edit the templates in `.kiro/settings/templates/` and regenerate the spec phase.

### PATH errors when running npx cc-sdd

```powershell
$env:PATH += ";C:\Users\yourname\AppData\Roaming\npm"
npx cc-sdd@latest --claude-skills
```

Or add to your profile permanently (see the PATH setup guide).

### Claude writes code that doesn't match existing patterns

Your steering docs need updating. Run:
```
/kiro-steering-custom "correct patterns for [the area that went wrong]"
```

---

## 13. Quick Reference Card

### Setup Commands (run in PowerShell, outside Claude)
```powershell
npx cc-sdd@latest --claude-skills   # install/update cc-sdd in current project
claude                               # launch Claude Code
```

### Session Start (run inside Claude Code)
```
/kiro-steering                       # always run this first
```

### Feature Workflow (run inside Claude Code)
```
/kiro-discovery <what you want>      # figure out if you need a spec
/kiro-spec-init <name>               # create the spec folder
/kiro-spec-requirements <name>       # generate requirements.md → YOU REVIEW
/kiro-spec-design <name>             # generate design.md → YOU REVIEW
/kiro-spec-tasks <name>              # generate tasks.md → YOU REVIEW
/kiro-impl <name>                    # autonomous implementation
```

### Utilities
```
/kiro-validate-gap <name>            # check code vs spec drift
/kiro-steering-custom "topic"        # create a targeted steering doc
```

### File Locations
```
CLAUDE.md                            # project constitution (always loaded)
.kiro/steering/                      # persistent project knowledge
.kiro/specs/<name>/requirements.md   # what to build
.kiro/specs/<name>/design.md         # how to build it
.kiro/specs/<name>/tasks.md          # step-by-step implementation plan
.kiro/settings/templates/            # edit these to match your style
```

### The Golden Rule
> **Review every spec phase before moving to the next one.** That's the entire point.

---

*Generated for Claude Code + cc-sdd v3.0.2 | May 2026*
