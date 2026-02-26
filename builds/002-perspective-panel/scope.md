# Scope — Perspective Panel (Proof of Concept)
**Date:** 2026-02-25

## Capture
I noticed that **solo product builders between jobs** struggle with **getting structured feedback on scope, feasibility, and positioning before they ship** because **they don't have a team and there's no lightweight way to get multiple perspectives without one.**

## Five Scoping Questions

### 1. Who specifically has this problem?
> Wolf — a senior PM building a portfolio of tiny products solo while job hunting. He designed a multi-perspective review system in CLAUDE.md but the agents don't exist yet, so the system is a blueprint with no engine.

### 2. What do they do today?
> Ask a generic question to Claude Code and get a response highly dependent on the conversation context before it. No structured lens, no consistent voice, no separation of concerns — the perspective is an accident of context, not a deliberate choice.

### 3. What's the smallest thing I could build that would be meaningfully better than what they do today?
> An executive, career coach, and engineer sub-agent to test proof of concept.

### 4. What decision am I making with this build?
> I'm betting that structured, role-specific prompts produce meaningfully different feedback than asking a general-purpose LLM the same question.

### 5. How will I know if it works?
> If I showed this to my engineering friend, would they agree with the points the engineering perspective made?

## Build Constraints
- **Max build time:** 4-6 hours
- **Stack:** AGENT.md files + CLAUDE.md integration (no app code)
- **Must include:** Executive, Engineer, Career Coach agent files. At least one real test of each against a concrete scenario.
- **Explicitly NOT building:** The other 5 agents. No invocation tooling. No UI. No automation around agent switching.

## Sub-Agent Input (Scoping Phase)

**[Executive]:** Worth building — it's both a tool Wolf needs now and a portfolio piece demonstrating systems thinking. Risk: looks like "I made Claude talk to itself." Write-up must land on why structured perspectives matter, not how you prompt-engineered agents.

**[Engineer]:** Three AGENT.md files is feasible in 4-6 hours. The real work is testing, not writing. Define what makes a good agent prompt, run each against a real scenario, compare to generic Claude output, and iterate. No tooling — just the prompts.

**[Ops Manager]:** Build the three agents, run them for real, and pay attention to where the friction is. If invocation requires remembering phase rules and manually switching context, it won't get used. The friction is the real learning.
