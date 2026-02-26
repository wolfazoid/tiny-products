# Scope — The Build System
**Date:** February 2026

## Capture
I noticed that **product people who want to build in public** struggle with **starting each new project from scratch** because **there's no repeatable process for going from a vague idea to a clearly scoped build, so they either over-plan and never start or start building and realize halfway through they're solving the wrong problem.**

## Five Scoping Questions

### 1. Who specifically has this problem?
A product manager who wants to demonstrate product thinking through side projects, has access to AI coding tools, but keeps stalling because each new project requires re-inventing the kickoff process.

### 2. What do they do today?
Open a blank IDE and start coding. Or spend three days thinking about what to build without writing anything down. Or build something and realize at the end they can't explain why it matters.

### 3. What's the smallest thing I could build that would be meaningfully better?
A structured set of files — a CLAUDE.md, context library, and templates — that Claude Code reads at the start of every session, so each new build begins with the right context, constraints, and questions already loaded.

### 4. What decision am I making with this build?
I'm betting that the biggest friction in building in public isn't the building — it's the scoping. If you force yourself to answer five specific questions before touching code, the build almost takes care of itself.

### 5. How will I know if it works?
If the second tiny product starts faster and more focused than it would have without this system. If I can hand this to another PM and they can use it to kick off their own build without explanation.

## Build Constraints
- **Max build time:** 4 hours (it's a system, not an app)
- **Stack:** Markdown files, CLAUDE.md, minimal HTML for site
- **Must include:** CLAUDE.md, context library, all templates, working site skeleton
- **Explicitly NOT building:** A CLI tool, a web app, anything beyond files and structure
