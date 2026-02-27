# Write-Up — [Product Name]

This is your space to write. Your voice, your thinking, your words.

Reference your build notes for raw material — decisions, tradeoffs, surprises. Reference agents-publish.md if one exists for the sub-agents' perspective. But the writing is yours.

Write it the way you'd explain it to a smart friend at a bar. Your natural voice is your best voice.

After drafting, run it through `context/quality-filter.md` before publishing.

---

## Title

Nobody Knows Where the Local Food Is

>

## The Problem (2-4 sentences)

Jason cooks 3 nights a week and wants to buy local, sustainably grown food — but "Fresh Farms" does not a local store make. His nearest supermarket's sourcing is opaque, the organic label is dubious, and his farmer's market is only open when he's working. He's searched online for local-friendly grocers, but there's no reliable way to tell who actually stocks local produce, who's just marketing well, and who to contact to ask for better options.

>

## The Hypothesis (1-2 sentences)

Local consumers can shift grocery stocking decisions when they have visibility into who stocks local and a direct line to the stores that don't. The bet: if you show someone that only 10 out of 372 stores near them stock local produce, they'll want to do something about the other 362.

>

## The Build

I built a map of grocery stores in Chicago from available data and labeled each one by whether it stocks local produce. The interface lets you search by address or zip, filter by sourcing status, and click any store to see details and take action.

The categorization was the most interesting part. I merged three data sources (Chicago Data Portal, OpenStreetMap, and hand-curated directories) and cross-referenced against LocalHarvest, the NCG co-op directory, and Chicago Environmentalists to determine sourcing status. We found:

- **10 stores confirmed local.**
- 44 inferred as likely local (chains like Whole Foods and Mariano's that are known to stock some local).
- **318 unknown,** including all 46 Jewel-Osco locations and most independent grocers.

That means for every store where Jason can confidently find local produce, there are 36 with a big question mark. And most of the local options are, unsurprisingly, centralized to the high income areas on the North side or suburban West side.

For the "unknown" stores, the tool includes a pre-filled advocacy email — one click to ask a grocer about stocking local and regenerative agriculture products.

![Full Chicago map — 10 local, 44 likely local, 318 unknown](screenshots/Screenshot%202026-02-27%20at%203.04.06%20PM.png)

![Zip code search filtered to confirmed local stores](screenshots/Screenshot%202026-02-27%20at%204.58.42%20PM.png)

![Unknown store popup with advocacy email link](screenshots/Screenshot%202026-02-27%20at%204.59.14%20PM.png)

>

## Decisions & Tradeoffs (2-4 items)

- **Advocacy As A Feature.** I've done plenty of google maps searches, and know of a handful of tools that show where local farms and co-ops are available. And when I found nothing nearby, that was the end of the story. I wanted to build something that can actually drive action. The easier it is to contact a grocer and ask for better local options, the more likely people are to do so. The more people contact their grocer, the more likely the grocer is to source local and sustainable food to satisfy local demand. Grocery margins are razor-thin, so there's a strong incentive to meet customer demand. More consistent customers = more consistent revenue. There are many other social triggers and methods to build in into this of course. The templated email is just a start.

- **Limited Geography.** Data was only Chicago area to keep exploration light and make validation easy. I'm from Chicago, so I can quickly spot check a list for proper categorization. And keeping it to a strong urban area gave us a better chance of finding some high quality data to start. Finding a dedicated "data portal" was a nice surprise, and far from guaranteed across most of the country. It's TBD how much this matters, as this tool is very much built for an urban/suburban-environment where it _feels_ like there are tons of grocery options, and it's simultaneously impossible to tell where or how they choose to stock their food.

  >

## What I Learned

Access to local, sustainably produced food is multi-faceted and multi-dimensional.

The biggest gap from a digital standpoint is the data. No national dataset exists that tells you which grocery stores stock locally sourced produce. The data that tells you where stores are is straightforward. Scaling out the national level, quick research shows USDA SNAP retailer data covers ~250,000 stores nationwide with location, name, and type. But the data that tells you which ones stock local, and what quality that local food is patchwork at best. It lives in blogs, community advocacy lists, word of mouth. This is a traceability issue that's well documented in activist circles, but has yet to cross into any sort of mainstream focus.

On this level, we need a better dataset. Data engineering kickstarts it, pulling together available open data from SNAP, NCG directories, and social signals. What's yet to build: how do humans fill in the gaps? I'm imagining a Wikipedia-style tagging system that lets the people keep the system honest. Lots to be done there.

Another, stickier facet is the social piece. People need to know that better alternatives exist. People need to see that others are asking for those better alternatives to be more widely available. And grocers need to see that demand is large enough to matter. The advocacy layer needs trust in the data and visible momentum. These mechanisms are a small start to a larger push for change.

And of course, this ignores the deeper infrastructure challenges of regenerative agriculture as a whole. The amount of regeneratively grown food available couldn't feed an urban population. The shelf life is shorter, the distribution networks aren't built for it, and the economics for farmers are fragile. That said, digital tools like we're discussing here can help create demand signals and support the farmers doing the work today, which in turn drives more to farmers to follow.

>

## Try It / See It

**Live demo:** [Local Produce Finder — Chicago](https://wolfazoid.github.io/tiny-products/local-produce/)

**Source code:** [github.com/wolfazoid/tiny-products/builds/003-local-produce](https://github.com/wolfazoid/tiny-products/tree/main/builds/003-local-produce)

Search by address or zip code to see grocery stores near you. Filter by sourcing status. Click any store to see details — and for stores with unknown sourcing, send a pre-filled email asking about local produce.

The entire app is static HTML/JS with no build step. Fork it, swap the data, point it at your city.

>

---

### Altitude Check

Read the draft. Is this Director altitude or PM altitude?

- ❌ "I built X with Y technology"
- ✅ "I noticed [problem] for [person] because [root cause], so I explored [approach]"

### Honesty Check

Which insights in this piece are yours? Which came from AI collaboration? If you can't tell the difference, that's worth examining before you publish.
