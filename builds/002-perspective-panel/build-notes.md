# Build Notes — Perspective Panel (Proof of Concept)
**Started:** 2026-02-25
**Build time:** tracking

## Decisions Made

| Decision | What I chose | What I considered | Why |
|----------|-------------|-------------------|-----|
| Which 3 agents | Executive, Engineer, Career Coach | Full roster of 8 | These three cover Scoping + Publish phases — enough to test the system across two phases |
| Agent structure | 6-part template: Role, Lens, When Invoked, How to Respond, Example Questions, Anti-Patterns | Freeform prompts, lighter structure | Consistent structure makes agents comparable and testable. Example Questions + Anti-Patterns do the heaviest lifting for differentiation. |
| Deferred: "Context This Agent Receives" | Not adding it now | Adding a section defining what context each agent needs when invoked | Three agents, manual invocation — context-passing is manageable. Becomes a bottleneck at 8 agents. Revisit when building the full roster. |

## Tradeoffs

- Cut 5 agents (Designer, Marketer, Data, Ops, Legal) to keep scope tight
- No invocation tooling or automation — manual agent use only
- No UI — just AGENT.md files that work within the existing CLAUDE.md system

## Surprises

- Executive and Career Coach have natural overlap on "does this land?" but the altitude difference (strategic vs. career-specific) keeps them distinct. This is a feature, not a bug — confirms the lens approach works.
- Engineer test surfaced a real architectural gap (context-passing at scale) that wouldn't have come up without the structured perspective. Good signal that the system works.
- Engineer agent drifted into process coaching ("don't build it, move on") during testing. That's a mentor voice, not an engineer voice. Real engineers assess the work — "this is solid" or "there's risk here" — they don't tell you when to stop. Fixed the AGENT.md. This is exactly the kind of drift the Anti-Patterns section is meant to prevent.
- Surfaced a potential new agent: PM Mentor — someone who coaches on skill development, focus, and when to explore vs. stay the course. Not in scope for this build.
- Biggest finding: the sub-agents can't distinguish between Wolf's thinking and Claude's articulation. Wolf noticed the Engineer voice was off (his instinct). Claude named the problem and wrote the fix. The Executive then praised "the insight" as if Wolf had fully generated it. This is a structural blind spot — the agents evaluate output, not process. The write-up needs to be honest about which insights were Wolf's pattern recognition vs. collaborative refinement. May need a honesty check in the write-up template or build notes.

## Tools & Dependencies

- Claude Code + CLAUDE.md sub-agent system (already designed)
-

## Process Change: Write-Up Ownership

**Finding:** AI-as-team works for decisions (scoping, feasibility, positioning checks) but breaks down for expression. When Claude writes the final piece, the thinking becomes Claude's thinking with Wolf's name on it. The write-up IS the product in this system — so the write-up must be Wolf's.

**Change made:**
- Updated `templates/publish.md` to be a blank template with guiding prompts per section. Nothing pre-written about the build.
- Added Honesty Check alongside Altitude Check: "Which insights are yours? Which came from AI?"
- When entering Phase 4, the system opens build notes for reference and creates a blank publish.md for Wolf to write in.
- If sub-agents generated a draft during the session, it's saved as `agents-publish.md` in the build directory as reference material — not the final artifact.

**Why this matters:** The sub-agents are reviewers, not authors. Their value is pressure-testing Wolf's thinking, not replacing it.

## Scratch Notes

```
Testing approach: run each agent against this build (002) as the real scenario.
Compare structured agent output vs. what generic Claude would say.
Key question: does the agent prompt produce a consistently different lens?

Answer: Yes for decisions. No for expression. The system works when agents
push back on thinking. It fails when agents produce the thinking.
```

## Time Log

| Session | Duration | What I worked on |
|---------|----------|-----------------|
| 1 | start | Scoping complete, beginning agent file creation |
| | | |
