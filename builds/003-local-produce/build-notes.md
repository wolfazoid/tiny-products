# Build Notes — Local Produce Finder
**Started:** 2026-02-26
**Build time:** [tracked automatically]

## Decisions Made
Log every interesting decision as you make it. These become the raw material for the write-up.

| Decision | What I chose | What I considered | Why |
|----------|-------------|-------------------|-----|
| Stack | Plain HTML/JS + Leaflet | React, Vite + TS | No build step, fastest path to a working map in 4-6 hours |
| Geography | Hardcoded Chicago | Zip-agnostic tool | Keeps data research focused, more honest at this scale |
| Advocacy UX | Pre-filled email, one click from map | Separate contact form | Ops reality: if it feels like a separate task, Jason won't do it |
| Show all vs. local only | Show ALL stores, label local ones | Only show local stores | Reveals the gap — 3/20 stores is the story, not just the 3 |
| Map tiles | CartoDB Positron (light/minimal) | Default OSM tiles | Too much visual noise on default tiles, pins hard to see |
| Overpass fault tolerance | Graceful fallback if Overpass fails | Hard dependency on both APIs | Overpass timed out during build; Chicago Portal is primary source |

## Tradeoffs
What did you cut? What did you simplify? What did you explicitly NOT build?

- No user accounts, reviews, or real-time inventory
- No farm listings, CSA, or farmers market data — this is about grocery stores only
- No store verification — labeling is based on available data, not confirmed
- Multi-city support deferred — each new metro needs its own data portal research + local curation

## Surprises
What didn't work the way you expected? What was harder or easier than anticipated?

- Overpass API timed out on first attempt — query was too heavy (nodes + ways). Slimmed to nodes only.
- Chicago dataset is full of small local vendors — the email advocacy feature may not be as useful for these (no public contact emails, and they may already stock local). Data quality question to revisit.

## Tools & Dependencies
What did you use? What was helpful, what got in the way?

- Leaflet + CartoDB Positron tiles — clean, fast, no API key
- Chicago Data Portal (Socrata API) — 253 stores, no auth, CORS-enabled, instant
- Overpass API — supplementary, flaky under heavy queries
- Nominatim — geocoding for address/zip search

## Scratch Notes
Raw thoughts during the build. Don't filter these — just capture them.

```
Future iteration ideas:
- Multi-city expansion: drop Chicago Portal dependency, use OSM as universal source, local curation per city
- Each new city is ~3 products: dataset identification/scraping, manual map addition, curation
- Email advocacy rethink: many small grocers may not have public emails; need to validate if this is useful for the target stores (chains vs. independents)
- Distributor data: is there public data on whether a vendor orders from KeHe vs. Sysco vs. others? Would reveal supply chain alignment. Research needed.
- Data quality pass: which stores in the dataset are still open? Which small vendors are already local-focused?
```

## Time Log
Timestamps are logged automatically on phase transitions. Use `clock in` / `clock out` for breaks.

| Event | Timestamp | Elapsed | Note |
|-------|-----------|---------|------|
| scope | 2026-02-26T09:00:00Z | — | Phase 2 start |
| build | 2026-02-26T09:45:00Z | 0:45 | Phase 3 start — scoping + sub-agent buildout |
| clock out | 2026-02-26 | ~1:05 | Pausing build — data gate, scaffold, UI iterations done |
| | | **Total: ~1:50** | Estimated engaged time (excludes idle gaps) |
