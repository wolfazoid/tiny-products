# Scope — Local Produce Finder
**Date:** 2026-02-26

## Capture
I noticed that **health-conscious foodies in big cities** struggle with **finding grocery stores that stock local produce** because **sourcing data isn't freely available to shoppers — stores have it but don't surface it.**

## Five Scoping Questions

### 1. Who specifically has this problem?
> Jason, a health-conscious foodie in Chicago. Cooks 3 nights a week, goes to farmers markets when he can but works weekends so the timing rarely works. ~$500/mo grocery budget. Wants local over organic — skeptical of the organic label, cares about regenerative farming, soil health, pesticide-free practices, and supporting local food infrastructure. Knows local food is fresher and more nutrient-dense. Defaults to Whole Foods or upscale grocers when the farmers market doesn't work out, and compromises at Jewel-Osco when rushed.

### 2. What do they do today?
> Goes to Whole Foods or upscale grocers and shops the organic section, hoping some of it is local. In a rush, defaults to Jewel-Osco and buys whatever's available. Has searched online and found a few stores that promise to stock mostly local, but they're far away with odd hours. Mostly compromises because caring takes too much effort within a normal week.

### 3. What's the smallest thing I could build that would be meaningfully better than what they do today?
> A map of all grocery stores in a Chicago zip code, labeled by whether they stock local produce — revealing the gap and giving consumers a direct line to stores that don't.

### 4. What decision am I making with this build?
> I'm betting that local consumers can shift grocery stocking decisions when they have visibility into who stocks local and a direct line to the stores that don't.

### 5. How will I know if it works?
> If I showed this to Jason, he'd see the map, realize only 3 out of 20 stores near him stock local, and immediately want to send that email to the other 17.

## Build Constraints
- **Max build time:** 4-6 hours
- **Stack:** Plain HTML/JS + Leaflet (OpenStreetMap tiles)
- **Phase 1 — Data gate (1 hour max):** Research data sources for Chicago grocery stores and local sourcing info. If this fails, stop and pivot or write about the data gap.
- **Phase 2 — Build:** Map, labeling, search, and stretch goals with remaining time.
- **Must include:**
  - Map with store pins (all grocers in area)
  - Local/not-local labeling on pins
  - Address/zip code search with sidebar store list
- **Stretch:** Templated email to non-local stores ("contact your grocer")
- **Explicitly NOT building:** User accounts, reviews, real-time inventory, store verification, farm listings, CSA/farmers market data
