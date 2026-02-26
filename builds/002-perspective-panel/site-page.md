---
layout: default
title: "Think To Build – Where Agentic Teams Shine, And Where They Fall Apart"
date: 2026-02-25
tags: meta
---

# Think To Build – Where Agentic Teams Shine, And Where They Fall Apart

*Structured AI perspectives for solo builders — and the line between thinking with AI and letting AI think for you.*

---

## The Problem

As I have gone full force into the "vibe coding" PM world, I've realized this way of working is missing something important. What we gain in productivity as solo-builders, we lose in the conversations that had to happen before you got to build phase. The frustrating but necessary friction in the messy middle, where an engineer throws their hands up in the air when the scope has shifted too far afield. The "so what?" from the executive that forces you to prove you've validated the problem and delivered a real solution.

## The Hypothesis

Building with structured, role-specific agentic teammates would produce meaningfully better product outcomes and clearer thinking than the generic, highly conversationally dependent responses of a general LLM.

## What I Built

Three sub-agent teammates:

**Engineer** - The architectural mind, looking for the simplest, safest way to deliver to spec. Probing scope creep and pressing for safety and high performance.

**Executive** - The "so what?" check. Ensuring that there is clear business or user-value in each build. That the product is strategically aligned to an agreed north star.

**Career Coach** - In the current moment, the product itself is a career building exercise. This agent checks against the users stated career goals, their logged strengths and weaknesses, and acts as a guide to ensure the right activity is being done for the right hiring audience.

Each agent has a defined role, lens through which to see the world, and directives on how to behave within various phases of a product build. This structure simulates a different personality for each agent, and creates a usable template for building out a whole roster of teammates.

**[View source →](https://github.com/wolfazoid/tiny-products)** | Agent template: `.claude/sub-agents/engineer/AGENT.md`

## Decisions & Tradeoffs

**Start With 3.** The full system expects a larger roster, but it felt important to prove out the concept before generating more personalities to deal with. Engineer and Executive gave a good example of two very different perspectives in action, and the Career Coach felt necessary as an initial piece to make sure the ship didn't drift too far off course. This is a portfolio project after all.

**Buy vs. Build.** A large part of this exercise is borrowed from a preview of a (probably) brilliant product by Akash Gupta, "The PM OS". I don't know if it's brilliant, because I didn't buy it. I'm a happy subscriber to his newsletter, but I felt building my own OS would be far more valuable than buying a template to start from. An example of that value was immediately apparent. In the process, I decided to add a Career Coach as a sub-agent. In this way, I can develop with my own OS for functional work as a PM, while still tagging in a Career Coaching perspective when applicable to help build my portfolio in the right direction. Gupta built a product for PMs to use at work. I'm adapting my own product for me to use as I see fit.

**Anti-patterns are the real differentiator.** In my first test run, the Engineer showed up with a bit of an attitude. It made a good suggestion, which I logged, then said "Great you logged it. Don't build it. Move on." This stood out as an 'off-brand' response for an engineer, who in my experience would normally be happy to know work is done, but never direct another teammate on when or how to proceed. The NOT expression for each agent personality is doing much heavier lifting in splitting each agent from generic LLM-type responses than initially anticipated.

## What I Learned

The biggest learning came at the time to publish.

I had moved quickly through the initial layout of this joint product-building and personal-brand-building system, so much so that I let the LLM add a publish and LinkedIn post creation phase where it would produce the write up I'd share out to the world. As I read the first publishing document, I realized the LLM was giving me credit for thinking it had done. What worked fantastically in the strategy and decision-making process had gone awry when it came time to show the thing that matters most in PM work and in this project – **What's the thinking behind this product?**

My voice, and my differentiation as a systems-thinker and communicator, were immediately lost. Rather than demonstrating an interesting product concept, I was demonstrating how much I could automate with a few clever prompts. So this part was torn out, replaced with a simple template that will help me move quickly without putting words in my mouth.

I am confident building out the rest of my agentic team will improve my product development and my efficiency. For things like writing PRDs or progress summaries, I'll definitely take the help. But when it comes to the thinking and expression, I'm leaving the LLMs at the (server) farm.

---

*This is part of an ongoing series exploring how technology can give real people more control over the things that matter to them — their food, their business, their community. [See all projects →](/)*

*Built with Claude Code. [Source on GitHub](https://github.com/wolfazoid/tiny-products).*
