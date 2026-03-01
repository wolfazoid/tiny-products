# Tiny Products

A series of small, publishable products exploring one question: **How do we give real people more control over the things that matter to them — their food, their business, their community?**

Each product starts with a real problem, tests a hypothesis, and gets published with the thinking visible — not just the build.

## How It Works

1. Pick a problem from the [idea bank](context/idea-bank.md) or capture a new one
2. Scope it using the [scoping template](templates/scope.md) — answer the five questions before touching code
3. Build it in 4-6 hours max with Claude Code
4. Write it up using the [publish template](templates/publish.md)
5. Publish to the site and share on LinkedIn

## Published Products

| # | Title | Domain | Date |
|---|-------|--------|------|
| 1 | [The Build System](builds/001-build-system/) | Meta | [date] |

## Project Structure

```
tiny-products/
├── CLAUDE.md              ← Context for Claude Code sessions
├── context/               ← Persistent context
│   ├── thesis.md          ← The guiding thesis
│   ├── who-i-am.md        ← Background and strengths
│   ├── quality-filter.md  ← Publishing standards
│   └── idea-bank.md       ← Future build ideas
├── templates/             ← Reusable templates
│   ├── scope.md           ← Kickoff scoping questions
│   ├── build-notes.md     ← Scratch pad during development
│   ├── publish.md         ← Write-up structure
│   ├── site-page.md       ← Portfolio page template
│   └── linkedin-post.md   ← Distribution post template
├── builds/                ← Each product gets its own directory
└── site/                  ← GitHub Pages source
```

## Built With
- [Claude Code](https://claude.ai) for development
- GitHub Pages for hosting
- Gumption

## License
MIT — take anything, use anything, make it better.
