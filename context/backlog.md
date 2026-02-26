# System Backlog

Bugs and improvements to the build system itself. Scan this at the start of each session. If a fix takes more than 15 minutes, it's either scope for the next build or it's not important enough to do.

## Bugs

-

## Improvements

- [ ] Add "Tone of Voice" section to sub-agent AGENT.md template for more realistic team dynamics
- [ ] Add "Context This Agent Receives" section to AGENT.md template (needed before scaling to full roster)
- [ ] Consider PM Mentor agent for process coaching (surfaced in Build 002 when Engineer drifted into that role)
- [ ] Set up Astro + Tailwind when site friction becomes real (at 3-4 posts)
- [ ] Update CLAUDE.md references from `site/` to `docs/` to match GitHub Pages structure
- [ ] **Engaged time tracking.** Current time log captures phase transitions but not actual engaged time vs. idle gaps. Ideal: infer engaged time from message density (sum gaps under ~5 min, treat longer gaps as away). Fallback: estimate from conversation flow at clock-out.

## Done

- [x] **Time tracking doesn't work.** Fixed — timestamps now log automatically on phase transitions. `clock in`/`clock out` available for breaks.
