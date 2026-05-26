# Setup Guide

Everything you need to clone this repo, plug in your Sisense trial, and have the app running locally.

---

## Prerequisites

- **Node.js 20+**
- **Sisense trial account** — sign up at [sisense.com](https://sisense.com) (free, 7 days). You'll need your instance URL and an API token from the user menu.
- **Slack workspace** with an [Incoming Webhook URL](https://api.slack.com/messaging/webhooks) — required if you want to test the Share-to-Slack flow.

---

## 1. Generate the sample data

```bash
node scripts/generate-data.mjs
```

This writes `src/data/saas-metrics.csv` — 2,000+ rows covering 100+ customers across 24 months. The schema includes MRR, churn, NPS, CAC, LTV, plan tier, industry, and team size.

---

## 2. Upload the CSV to Sisense

1. Open your Sisense instance.
2. Create a new ElastiCube from `src/data/saas-metrics.csv`.
3. Wait for the build to complete (~20 min on the trial).
4. Note the **data source name** Sisense assigns to the cube — you'll need it in step 5.

---

## 3. Configure environment variables

Create `.env.local` in the repo root:

```bash
NEXT_PUBLIC_SISENSE_URL=https://YOUR-TRIAL.sisense.com
NEXT_PUBLIC_SISENSE_TOKEN=YOUR_API_TOKEN
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

| Variable | Where to get it |
|----------|-----------------|
| `NEXT_PUBLIC_SISENSE_URL` | Your Sisense trial URL |
| `NEXT_PUBLIC_SISENSE_TOKEN` | Sisense → user menu → API token |
| `SLACK_WEBHOOK_URL` | Slack → Incoming Webhooks → create one for the channel you want to post to |
| `NEXT_PUBLIC_SHARE_URL` *(optional)* | The URL LinkedIn shares attach as the post's link card. Defaults to this GitHub repo. Point at your Medium post / portfolio when published. |

---

## 4. Wire the data source name

Open [`src/lib/saas-schema.ts`](src/lib/saas-schema.ts) and update `DATA_SOURCE_NAME` to match the name Sisense gave the cube in step 3 — exactly, case-sensitive.

---

## 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dashboard loads with your live Sisense data.

---

## How sharing works

```
Click Share
    │
    ▼
html-to-image captures the chart div as PNG
    │
    ▼
ShareModal: preview + editable caption (pre-filled with the NLG insight when available)
    │
    ├── Slack    → POST /api/share/slack → Slack Incoming Webhook (Block Kit message) + PNG downloaded locally
    └── LinkedIn → download PNG + open LinkedIn share-offsite URL with caption copied to clipboard
```

The Next.js API route at `/api/share/slack` proxies the Slack call server-side to avoid browser CORS restrictions on the webhook endpoint.

**A note on the LinkedIn flow.** Sharing to LinkedIn intentionally avoids OAuth so the app works immediately with zero setup. When you click *Share to LinkedIn*, the chart image downloads, the caption is copied to your clipboard, and LinkedIn's share dialog opens — you drag the PNG in and paste. The dialog requires a destination URL (LinkedIn's `share-offsite` endpoint demands `?url=`); we use `NEXT_PUBLIC_SHARE_URL` for that link card. Moving to LinkedIn's official Share API (one-click direct posting) is on the roadmap — see [`STRATEGY.md`](STRATEGY.md) for the broader sharing-layer evolution.

---

## Tech stack

- **Next.js 16 + React 19 + TypeScript**
- **`@sisense/sdk-ui` + `@sisense/sdk-data`** v2.27 — embedded charts, AI chatbot, NLG insights
- **Tailwind CSS v4**
- **html-to-image** — chart screenshot capture
- **lucide-react** — icons

---

## Troubleshooting

**Charts show "no data" or fail to load.**
Double-check `DATA_SOURCE_NAME` in `src/lib/saas-schema.ts` matches the Sisense cube name exactly. Even a trailing space breaks it.

**Sisense requests fail with CORS errors.**
The repo ships a rewrite proxy in `next.config.ts` that fronts the Sisense API at `/sisense/*`. Make sure `NEXT_PUBLIC_SISENSE_URL` is set before running `npm run dev` — the rewrite is read at startup.

**Slack share returns an error.**
Verify `SLACK_WEBHOOK_URL` is correct and the webhook is still active in your Slack admin. Test it with a plain `curl`:
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"test"}' "$SLACK_WEBHOOK_URL"
```

**LinkedIn dialog opens but the caption is empty.**
The caption is copied to your clipboard at the moment LinkedIn opens. Some browsers block clipboard writes from non-user-initiated actions — click Share directly, don't trigger it from devtools.
