# Builder Evangelist Strategy — Sisense Compose SDK

> **One-line thesis:** Win developers and prototype-builders today with a free, working tutorial — and Sisense becomes the default analytics platform they bring with them as they grow into buyers.

---

## The Opportunity

Enterprise analytics is sold top-down through long sales cycles. But the people who actually pick the tooling — developers who fork things at 11pm, and PMs who need a working prototype to justify a budget request — are nowhere in that motion.

They're on Reddit. They're reading Medium tutorials. They're cloning GitHub repos. They are not waiting for a sales call, and they are *exactly* the people who anchor what their company buys next year.

The Sisense Compose SDK plus AI tooling is the fastest path from their current pain to a tool they can ship in a day.

---

## Target Audience

### Primary: SaaS Developers & Indie Hackers
- Solo founders, 1–5 person dev teams, indie SaaS builders
- They build for themselves — internal dashboards, ops tools, customer-facing analytics
- They live on Reddit (`r/SaaS`, `r/indiehackers`, `r/webdev`, `r/startups`), Hacker News, dev Twitter
- They evaluate tools by **forking the repo first** — docs and marketing pages come second
- Budget today: low to zero. Budget tomorrow: whatever they grew into.
- They are the **anchor users**: whatever they ship with at the start, they bring with them as the company scales

### Secondary: PMs & Team Leads at Mid-Size Companies
- Have data in a warehouse but no self-serve layer for the team
- Their real problem isn't "I need a dashboard" — it's "I need a **working prototype** I can put in front of my VP/CTO to justify buying a real BI tool"
- A clonable repo + a one-day build gives them exactly that artifact
- The blog post becomes their internal pitch deck: *"I built this in a day with the Sisense SDK. Here's the ROI. Here's what the enterprise tier unlocks."*
- This is a direct, short path from free trial to license purchase — the prototype IS the business case

### What both share
- They respond to **show, don't tell** — a working repo beats a feature page
- They share useful tools on Slack and LinkedIn when something saves them real time
- They are the people whose recommendations actually move budget inside a company

---

## The Core Message

> **"You can build a production-quality internal analytics tool in a day — and the sharing layer turns every chart you build into distribution for the next user."**

Supporting claims:
- **65% reduction in manual reporting time** — when the dashboard answers the question, nobody pulls the spreadsheet
- **Zero cost to start** — Sisense trial is free; the SDK is open; the cost is one engineer's day
- **AI-native** — natural language queries, AI-generated insights, no SQL for the common questions
- **Built-in sharing** — Slack + LinkedIn out of the box, no integration work

---

## The UVP: Sharing as the PLG Engine

Every competing embedded analytics SDK treats the chart as the endpoint. Render it, the user looks at it, done.

The Sisense Compose SDK ships with the next step: **a sharing layer that pushes any chart, with an AI-generated caption, to Slack or LinkedIn in two clicks.**

Strategically, this is the engine of the entire flywheel:

- Every Slack share is a Sisense-powered chart appearing inside a company's most-used channel. Other employees see it and ask how it was built.
- Every LinkedIn share is a public, branded impression inside the feeds of PMs, founders, and engineering leaders — the exact buying audience.
- Insights travel *with their context* (the AI caption explains the chart), so the receiver doesn't need the dashboard to understand the data.

Distribution is baked into the product. That is the strategic differentiator the evangelism program leans on.

---

## The PLG Flywheel

```
1. DISCOVER
   Developer finds the Reddit post or GitHub repo
   ↓
2. BUILD
   Clones the repo, plugs in their data, has a working dashboard in <1 day
   ↓
3. SHARE (← the viral moment)
   Sharing feature pushes insights to Slack + LinkedIn
   Every shared chart is a branded Sisense impression
   ↓
4. GROW
   Tool gets used internally, team grows, data complexity grows
   ↓
5. UPGRADE
   They already trust Sisense. They come to us for the enterprise tier.
```

---

## Content Channels

Reddit is the lead channel. Medium is the long-form companion. LinkedIn is the dogfooding loop. GitHub is the landing page.

### Reddit (primary)
This audience reads, upvotes, and shares tutorials in these subs. Reddit-native posts thrive when they lead with the story, not the pitch.

| Subreddit | Angle |
|-----------|-------|
| `r/SaaS` | "Built a free internal analytics tool — sharing the code and the process" |
| `r/indiehackers` | "Replaced $300/month in BI tools with a one-day build" |
| `r/webdev` | "Every prompt I used to build an internal analytics dashboard with the Sisense SDK" |
| `r/startups` | "How we got our whole team aligned on metrics for free" |

Reddit note: Posts that feel like ads get downvoted in minutes.

### Medium (companion)
The same content as a polished long-form tutorial. Submit to `Better Programming` and `The Startup`. Medium gives the post SEO longevity and a link Reddit/LinkedIn/Twitter can all point at.

### LinkedIn (dogfooding)
Use the sharing feature itself to post charts from the app. Meta-demonstration: the post is *made by* the feature being marketed. Caption is the AI-generated insight + a one-line link to the Medium post in the comments.

### GitHub (the landing page)
The README *is* the marketing surface. Star count is social proof, issues are word of mouth, forks are conversion. Treat the repo with the same care as a landing page.

---

## The CTA Architecture

The primary CTA across every channel is the same:

> **"Clone the repo and follow the tutorial. You'll have a working tool by Friday."**

That's it. Not "sign up for Sisense." Not "book a demo." The tutorial *is* the funnel — anyone who completes it has already onboarded onto Sisense.

Secondary CTAs (footer of the post + repo README):
- "If you outgrow this, Sisense has the full platform" → natural upgrade path
- "Drop a comment with what you built" → community signal

---

## Why This Audience, Why Now

Three reasons this is the right audience to invest in:

**1. Cheap to acquire today.** They have zero budget for enterprise BI, which is why nobody is selling to them. That's also why a free, working tutorial is a wildly disproportionate piece of value to put in front of them — there's no competing offer.

**2. They grow into the buyers.** A 5-person startup running on the Sisense SDK becomes a 50-person company that needs the enterprise tier. The anchoring effect is real: whatever they shipped with becomes the default. The cost of acquiring them now is one blog post. The cost of acquiring them in three years through outbound sales is 20× that.

**3. PMs are a Trojan horse.** A PM cloning this repo to prototype a dashboard for their team is, in practice, building the internal business case for their company to buy Sisense. They will go to their VP with the prototype, say *"I built this in a day, imagine what we can do on the paid tier"*, and the sales conversation starts inbound. This is a direct path from free content to enterprise revenue.

---

## Where the Sharing Layer Goes Next

What ships in v1 is the foundation — chart → AI caption → Slack/LinkedIn in two clicks. That alone is differentiator enough to anchor the campaign. But the real product story is what this layer becomes once we treat sharing as a first-class surface, not a button. Each direction below multiplies the PLG flywheel by producing more shareable artifacts per user, per week.

### 1. Sharing inside the chatbot
The Sisense AI Chatbot already answers natural-language questions over the data. The next step is closing the loop: when the chat returns an insight ("MRR grew 12% in EdTech last quarter"), it offers a one-click *"Share this to Slack / LinkedIn"* action right inside the conversation. The user never has to find the chart — the chatbot becomes a share-generation surface on its own. This converts every chat interaction into a potential branded impression.

### 2. Meme & image generation from the data
A chart screenshot is fine for an internal Slack thread. It is not the format that wins LinkedIn or Twitter. The next layer plugs an image-generation engine (DALL·E, Imagen, or similar) into the data signal and produces *shareable visuals*: a meme that captures "our churn graph this quarter," a branded card with the headline number and a tasteful illustration, a quote-card with the AI insight typeset over a background.

Strategically: people share memes far more than they share dashboards. If Sisense becomes the SDK that lets you turn a data point into a meme in two clicks, the sharing surface area explodes — and every shared meme still carries a Sisense attribution.

### 3. Automated sharing & scheduled insights
Most insights worth sharing never get shared because the human in the loop forgets. The fix is to flip the model: a scheduled job runs over the Sisense data, an LLM detects meaningful changes (MRR threshold crossed, churn spike in a segment, NPS drop), drafts the share copy, and either auto-posts to a configured channel or queues it for one-click approval.

For a small SaaS team this means a weekly "metrics digest" appearing in their Slack automatically — branded, useful, and impossible to ignore. For Sisense it means every customer's data is generating distribution events on a continuous cadence rather than ad-hoc clicks.

### Why these compound

Each direction makes the *next* user more likely to discover Sisense:
- Chat-driven sharing → more shares per dashboard session
- Memes → higher-engagement formats on public channels
- Automation → shares happen even when nobody opens the dashboard

The sharing layer stops being a feature and becomes the **distribution channel built into the product**. That is the long-term moat — and it justifies investment in this evangelism program now, while the foundation is fresh.

---

## Why This Works for Sisense

The traditional enterprise analytics motion is slow, expensive, and skips an entire generation of builders. This strategy seeds the market from the bottom up:

- **Developers** become internal champions
- **PMs** become inbound enterprise leads via their prototypes
- **Small companies** become large companies still running Sisense

The cost is one engineer's time and a Medium account. The payoff is a community of builders who associate Sisense with "the tool that actually worked when I needed it" — and a steady inbound stream of prototype-driven enterprise conversations.

