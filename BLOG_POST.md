# I Built an Internal Analytics Tool in One Day — and the Feature That Surprised Me Most Wasn't in Any SDK

**Cross-post target:** r/SaaS · r/indiehackers · r/webdev · Dev.to · Medium  
**Format:** Tutorial + story  
**Reading time:** ~7 min

---

I run a small SaaS side project. Like most founders, I had metrics scattered everywhere: MRR in Stripe, churn in a spreadsheet, NPS in a Google Form, CAC scribbled on a sticky note. I knew the numbers existed. I just couldn't *see* them together.

I didn't want to pay Tableau or Metabase just to get started. I wanted something I owned, something I could embed in a dashboard and show teammates. So I decided to build it myself — and to see how far I could get in a single day using AI tools.

Spoiler: further than I expected. And the part that excited me most was a feature I had to build myself because it didn't exist in the SDK.

---

## The Stack

Here's what I used:

- **Next.js 16 + React 19 + TypeScript** — because I wanted a real app, not a prototype
- **[Sisense Compose SDK](https://sisense.dev/guides/compose-sdk/)** — `@sisense/sdk-ui` + `@sisense/sdk-data` — for embedded analytics components
- **Claude Code** (Anthropic) — as my vibe-coding co-pilot
- **html-to-image** — to capture chart screenshots
- **Slack Incoming Webhooks** + **LinkedIn share URL** — for the sharing layer

The total lines of code I wrote by hand: probably 50. Claude wrote the rest. That's the point.

---

## The Data

I didn't have a clean analytics database to connect to. So I generated one.

A quick Node.js script created `saas-metrics.csv` — **2,031 rows** of realistic SaaS data covering 150 simulated customers across 24 months. Each row represents a customer-month, with columns like:

```
customer_id, company_name, industry, team_size_bucket,
plan_tier, signup_date, date,
mrr, cac, ltv, nps_score,
is_active, is_new, is_churned
```

Customers churn probabilistically (5% for Starter, 3% for Growth, 1.5% for Enterprise), MRR has realistic monthly jitter, and industries are weighted toward SaaS and E-Commerce. It's not real data, but it's *plausible* data — which is enough to show the mechanics.

I uploaded the CSV directly to my Sisense trial account as an ElastiCube (took about 20 minutes including waiting for it to build). From that point, every chart in the app was pulling live data through the SDK.

---

## The App

Four tabs. Each one serves a specific job.

**Dashboard** — aggregate KPIs (MRR, active customers, churn rate, NPS) plus two charts showing new signups and churns per month. This is the "sanity check" view you want to open every Monday morning.

**Trends** — time series. MRR growth line, active customer area chart, NPS over time. The Sisense SDK renders these from a single `<Chart />` component:

```tsx
<Chart
  dataSet={DataSource}
  chartType="line"
  dataOptions={{
    category: [DM.Date.Months],
    value: [measureFactory.sum(DM.Mrr, "Total MRR ($)")],
    breakBy: [],
  }}
/>
```

That's it. No D3. No manual axis logic. No data fetching boilerplate. The SDK handles the query, the rendering, the tooltip, the legend.

**Charts** — breakdown analysis. MRR by plan tier, customers by industry (pie), CAC vs LTV comparison by tier, NPS by segment. The kind of charts that answer "where should I focus?" rather than "what happened?"

**AI Chat** — this is the Sisense `Chatbot` component, which lets you ask natural language questions about your data:

```tsx
<Chatbot
  config={{
    dataTopicsList: ["saas-metrics"],
    enableFollowupQuestions: true,
    inputPromptText: "Ask about MRR, churn, CAC, LTV…",
  }}
/>
```

Ask it: *"Which industry has the highest average LTV?"* It queries your data and answers in plain English. This is NLQ (Natural Language Query) + NLG (Natural Language Generation) working together. For a solo founder, this is like having a data analyst on call.

---

## The Feature That Didn't Exist: Sharing

Here's where I went off-script.

The Compose SDK has great charts. It has a great chatbot. But it doesn't have a built-in way to *share* insights — to push a chart screenshot to your team's Slack, or compose a LinkedIn post directly from a data point. That feature doesn't exist.

So I built it. In about 90 lines of code.

### How it works

Every chart card in the app has a small "Share" button in the corner. Click it, and here's what happens:

1. **`html-to-image`** captures the chart div as a PNG (SVG-safe, 2x pixel ratio)
2. A modal opens showing the screenshot + an editable caption
3. You pick: **Slack** or **LinkedIn**

**Slack path:** The caption is sent via a `POST` to a Next.js API route, which proxies it to your Slack Incoming Webhook as a Block Kit message. (Direct browser→Slack calls fail CORS, which is why the server route matters.)

```ts
// src/app/api/share/slack/route.ts
const payload = {
  blocks: [
    { type: "section", text: { type: "mrkdwn",
        text: `*📊 SaaS Analytics Insight*\n${text}` } },
    { type: "context", elements: [
        { type: "mrkdwn",
          text: "Shared from *Internal Analytics* · Powered by Sisense Compose SDK" }
    ]}
  ],
};
await fetch(process.env.SLACK_WEBHOOK_URL, { method: "POST", body: JSON.stringify(payload) });
```

**LinkedIn path:** The PNG downloads automatically, and LinkedIn's share dialog opens in a new tab with the caption pre-filled. No OAuth. No app registration. Works in 10 lines:

```ts
export function openLinkedInShare(caption: string): void {
  const url = new URL("https://www.linkedin.com/sharing/share-offsite/");
  url.searchParams.set("url", REPO_URL);
  url.searchParams.set("summary", caption.slice(0, 700));
  window.open(url.toString(), "_blank");
}
```

The user downloads the chart image, attaches it to the LinkedIn post, and publishes. Two clicks.

---

## What I Actually Learned

**1. The SDK does the hard part.** The query engine, the visualization layer, the NLQ interface — all of that is just components you drop in. If you've ever spent three days fighting D3 or Recharts to get a chart to look right, the contrast is jarring in a good way.

**2. Vibe-coding with AI is real now.** I described what I wanted to Claude, it generated the component, I read the output, caught a type error, told Claude, it fixed it. The loop is fast enough that the bottleneck is your thinking, not your typing.

**3. The real unlock is for lean teams.** Enterprise analytics tools are priced for enterprises. But the Compose SDK has a free trial, and the core embed patterns are dead simple. A founding engineer can ship a working internal analytics dashboard in a day. That used to take a month and a dedicated data team.

**4. The gap I found (sharing) is a real product need.** After I showed this to two other founders, both asked "can I have this?" The value isn't the chart — it's getting the insight *out* to where your team and your audience already are.

---

## Try It Yourself

The full source is on GitHub. Clone it, add your Sisense credentials to `.env.local`, upload the generated CSV, and run `npm run dev`.

**Prerequisites:**
- Sisense trial account (free, 7 days) → [sisense.com](https://sisense.com)
- Slack workspace with an Incoming Webhook URL
- Node.js 20+

**3 commands to run:**
```bash
git clone https://github.com/your-handle/sisense-internal-bi-tool
cd sisense-internal-bi-tool
cp .env.local.example .env.local   # fill in your credentials
node scripts/generate-data.mjs     # generate the CSV
npm install && npm run dev
```

The app will be at `localhost:3000`. Point it at your Sisense data source name in `src/lib/saas-schema.ts` and every chart populates automatically.

---

## What's Next

A few things I deliberately left out to keep this a one-day build:

- **Real Slack file upload** (images in the channel, not just text) — requires a Bot token + `files.upload` API call, about 30 more lines
- **Forecasting** — the Sisense SDK has trend line support; connecting it to actual ML predictions would be the next layer
- **Authentication** — right now it's a local app; adding NextAuth would make it shareable internally
- **More data sources** — the schema file is just TypeScript; swapping in Stripe, HubSpot, or Mixpanel data is a config change

If you're building something similar or have questions about the Sisense SDK setup, drop a comment below. The hard part isn't the code — it's knowing where to start.

---

*Built with Sisense Compose SDK + Claude Code in ~7 hours.*  
*Source: [github.com/your-handle/sisense-internal-bi-tool](https://github.com/your-handle/sisense-internal-bi-tool)*
