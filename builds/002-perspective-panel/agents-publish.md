# Write-Up — Perspective Panel

---

## Title

Building a Team When You Don't Have One: Structured Perspectives for Solo Builders

## The Problem

The hardest part of building alone isn't the building — it's the thinking. When you're on a team, cognitive diversity happens by default. The engineer pushes back on scope. The exec asks "who cares?" The career-minded colleague asks if this is the right thing to be spending time on. When you're solo — job hunting, freelancing, bootstrapping — you lose all of that. You're left asking a general-purpose AI for feedback and getting whatever the conversation context happens to produce. The perspective you get is an accident, not a choice.

## The Hypothesis

Structured, role-specific prompts produce meaningfully different feedback than asking a general-purpose LLM the same question. If you define what each perspective pays attention to — and what it explicitly ignores — you can simulate the cognitive diversity of a team without having one.

## The Build

Three sub-agent files designed to work within a Claude Code project as structured perspectives:

- **Executive** — Evaluates strategic value and audience. Asks "so what?" and pushes toward Director-altitude thinking.
- **Engineer** — Evaluates feasibility, simplicity, and technical tradeoffs. Asks "is there a simpler way?" and flags risk.
- **Career Coach** — Evaluates career positioning against target companies and holds the builder accountable on job search actions.

Each agent follows a 6-part structure: Role, Lens, When Invoked, How to Respond, Example Questions, and Anti-Patterns. The structure is designed to be reusable — write the next agent by filling in the same template.

The agents were tested against this build itself as the real scenario. Each one was given a concrete moment from the build process and asked to respond through its lens.

## Decisions & Tradeoffs

**Three agents, not eight.** The full system design calls for eight perspectives. Building all of them would have been a documentation exercise, not a test. Three agents covering two phases (Scoping and Publish) gave enough surface area to prove the concept — or expose that it doesn't work.

**Anti-Patterns are the real differentiator.** The 6-part template has two load-bearing sections: Example Questions (what the agent *does*) and Anti-Patterns (what it *doesn't*). Without Anti-Patterns, every agent drifts toward generic advice. This showed up immediately in testing — the Engineer started coaching on process ("don't build it, move on") instead of assessing the technical work. The Anti-Patterns section is what catches and corrects that drift.

**No invocation tooling.** At three agents with manual invocation, the system works fine. The Engineer test flagged that context-passing becomes a bottleneck at eight agents — you'd want a "Context This Agent Receives" section defining what each agent automatically gets. That's a real architectural gap, but it's a future-build problem. Logging it and moving on was the right call.

**Overlap is a feature.** Executive and Career Coach both react to "does this land?" — but from different altitudes. Executive asks whether anyone cares. Career Coach asks whether the right hiring managers care. The overlap is intentional. If they gave identical feedback, the lens approach would be broken. They didn't.

## What I Learned

The bet paid off. Structured perspectives do produce different output than generic prompting — but only when the prompt is specific enough about what the agent should *not* do. Role and Lens set context, but Anti-Patterns prevent drift. That's the insight: defining a perspective isn't about what it sees. It's about what it ignores.

The unexpected discovery was a role that doesn't exist yet. The Engineer drifted into process coaching — "you identified the gap, don't build it, move on." That's not what engineers do. That's a mentor. A PM Mentor agent — someone who coaches on when to explore vs. stay focused, when to cut, when to push — would fill a real gap in the system. It surfaced because the structured approach made the drift visible. In a generic conversation, I would have accepted that advice without noticing it came from the wrong voice.

This connects to the broader thesis: giving people more control starts with giving them more clarity. A solo builder with structured perspectives doesn't just get better feedback — they get better at recognizing which kind of feedback they need.

## Try It / See It

The agent files and the full build system are open source:
- [GitHub Repository](https://github.com/wolfazoid/tiny-products)
- Agent files: `.claude/sub-agents/engineer/AGENT.md`, `.claude/sub-agents/executive/AGENT.md`, `.claude/sub-agents/career-coach/AGENT.md`
- To adapt: fork the repo, modify the AGENT.md files for your own context, and reference them from your CLAUDE.md.

---

### Altitude Check
- ❌ "I built three Claude agent prompts"
- ✅ "The hardest part of building alone isn't the building — it's the thinking. Teams provide cognitive diversity by default. Solo builders have to design for it intentionally. I explored what that looks like."
