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
| National scalability research | Investigate data landscape before building | Jump straight to Illinois expansion | Need to validate whether the "local sourcing signal" even exists at national scale before investing build time |

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
- **The national data landscape is split in two.** Store *locations* are solved — USDA SNAP data has ~250k retailers with lat/lng, typed (supermarket vs convenience vs farmers market, 17 types). But *local sourcing signal* doesn't exist in any single national dataset. It's patchwork: co-op directories (~242 stores), USDA food directories (~14k markets/hubs/farms), state buy-local programs (50 fragmented web directories), and LocalHarvest (40k+ listings but TOS-locked). The gap is mainstream grocery — nobody tracks whether your Kroger's produce manager buys regional.
- OSM has essentially zero sourcing data. The `organic=yes` tag has ~30k uses *worldwide*. No "stocks local" tag exists.

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

### Sub-Agent Review — End of Build Phase (2026-02-27)

**[Engineer]:**
- Stack choice validated. Plain HTML/JS/Leaflet, no build step — correct for the constraint.
- **The most important architectural decision:** `db.json` is the whole product. The app is just a viewer. This means scaling to national data is a data pipeline problem, not an app rewrite. You can swap Chicago Portal for SNAP data without touching the UI code.
- At national scale (~250k stores), `renderMarkers` creating all markers up front would choke the browser. Would need marker clustering (Leaflet.markercluster) or viewport-based loading. Not a fix for now.
- The geocoder hardcodes ", Chicago, IL" — one line that locks the app to Chicago. Correct for this build.

**[Designer]:**
- The filter buttons with counts tell the story immediately — 10 / 44 / 318 reveals the gap before Jason does anything. Good information hierarchy.
- **"Unknown" as a label is honest but passive.** Jason doesn't know what to do with it. "Ask Your Store" would connect the label to the advocacy action — right now the label and the email link in the popup are disconnected. The label doesn't set up the action.
- **The email advocacy is buried.** Only appears after clicking a pin/card, only for unknown stores. That's a lot of steps for the feature that makes this a tool and not just a map. If there were more build time, a banner on the unknown filter ("318 stores near you haven't been asked about local produce yet") would make the action more prominent.
- Two-panel layout (list + map) works. Distance sort after search is the right default.
- **No mobile layout.** Sidebar is 380px fixed. Jason is most likely to use this on his phone while grocery shopping. Real gap.
- **Store phone numbers missing.** For advocacy, a phone number is often more effective than email — especially for stores that don't have public email addresses. Adding phone data to `db.json` would make the "Ask Your Store" action more actionable.

### Session 2 — National Scalability Research (2026-02-26)

**Question explored:** Could this become a national tool? What data exists, where, and how would we gather it?

**Key findings — three layers:**

1. **Store locations (Solved):** USDA SNAP Retailer Data — ~250k retailers, free, no auth, bulk CSV/GeoJSON. 17 store type codes distinguish supermarket from convenience from farmers market. This replaces the Chicago Portal dependency entirely and works nationwide. ArcGIS API available (1k records/request, paginated) or bulk download.

2. **Local sourcing signal (Hard — patchwork only):**
   - NCG co-op directory: ~242 storefronts, 39 states. Scrapable. Co-op status = strong local proxy.
   - USDA Local Food Directories: ~14k listings (farmers markets, CSAs, food hubs). REST API, free, needs key from USDA. Food hubs (~479) are the most interesting — they're the supply chain that feeds retail.
   - LocalHarvest.org: 40k+ listings, best single source for "stores that sell local." But no API, TOS prohibits scraping. Would need a partnership.
   - State buy-local programs: every state has one, all different, none have APIs. Illinois has 1,700+ listings. 50 separate fragmented systems.
   - B Corp directory: <12 grocery retailers nationally. Too thin.
   - Google Places / Yelp: TOS prohibit database-building. No local sourcing signal in structured data anyway.

3. **The gap:** Nobody has a national dataset of "which grocery stores stock local produce." That dataset doesn't exist. The product value lives in creating it — merging SNAP locations + co-op directories + USDA food directories + state programs into one normalized dataset.

**Possible product split:**
- **Product A (data scraper/pipeline):** Merge SNAP + NCG + USDA directories + state programs into one normalized dataset. This is the hard, interesting problem.
- **Product B (consumer map):** The current Chicago prototype's UI, consuming the merged dataset. This is the easier piece.

**OSM assessment for national scale:**
- Coverage is 40-70% for major chains in urban areas (improved by 2024 All the Places import), much worse for independents and rural.
- Zero sourcing data in OSM tags.
- For national queries, Geofabrik bulk downloads (state-level PBF files) are the right approach, not Overpass API.
- OSM is useful as a supplementary layer, not a primary source. SNAP data is strictly better for store locations.

**Open threads:**
- Should pull Illinois SNAP data to validate it as a Chicago Portal replacement.
- USDA Local Food Directories API key — worth requesting to explore food hub data.
- LocalHarvest partnership — worth a cold email if this product gets serious.
- The data scraper itself could be a tiny product (idea bank candidate).

## What I'd Do Next
If this had another build cycle or became a real product:

1. **Rename "Unknown" to "Ask Your Store"** — connects the label to the action. Right now the label is passive and the advocacy email is buried behind two clicks. "Ask Your Store" sets up the behavior the tool wants to create.
2. **Add store phone numbers to db.json** — many stores (especially independents) don't have public email addresses. A phone number makes "ask your store" actually actionable. Chicago Portal and SNAP data may include phone fields worth pulling in.
3. **Surface the advocacy action more prominently** — when filtered to "Ask Your Store" stores, show a banner or call-to-action: "318 stores near you haven't been asked about local produce yet." The gap is the story; make it impossible to miss.
4. **Mobile layout** — Jason is most likely to use this on his phone while grocery shopping. The 380px fixed sidebar doesn't work on mobile. Would need a collapsible panel or tab-based layout.
5. **Marker clustering for scale** — current approach renders all markers up front. Fine at 372 stores, breaks at 250k. Leaflet.markercluster or viewport-based loading needed for national expansion.
6. **Data pipeline as a separate product** — merge USDA SNAP + NCG co-ops + USDA food directories + state buy-local programs into one normalized dataset. The real product isn't the map — it's the dataset that doesn't exist yet.

## Time Log
Timestamps are logged automatically on phase transitions. Use `clock in` / `clock out` for breaks.

| Event | Timestamp | Elapsed | Note |
|-------|-----------|---------|------|
| scope | 2026-02-26T09:00:00Z | — | Phase 2 start |
| build | 2026-02-26T09:45:00Z | 0:45 | Phase 3 start — scoping + sub-agent buildout |
| clock out | 2026-02-26 | ~1:05 | Pausing build — data gate, scaffold, UI iterations done |
| clock in | 2026-02-26T16:30:00Z | — | Resuming — exploring Illinois-wide expansion |
| clock out | 2026-02-26T17:15:00Z | ~0:45 | National data landscape research complete |
| clock in | 2026-02-27T09:00:00Z | — | Session 3 |
| wrap up | 2026-02-27T09:05:00Z | ~0:05 | Phase 4 start — write-up |
| clock out | 2026-02-27T10:15:00Z | ~1:10 | Write-up, panel reviews, screenshots, LinkedIn post done |
| | | **Total: ~3:50** | Estimated engaged time (excludes idle gaps) |
