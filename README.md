# SaaS Insights — Internal Analytics Tool

An internal SaaS analytics dashboard built with **Sisense Compose SDK + Claude Code** in one day.

Showcases embedded charts, NLQ/NLG AI chat, and a **chart-to-Slack/LinkedIn sharing layer** that isn't in the SDK by default.

## Features

| Tab | What it does |
|-----|-------------|
| Dashboard | KPI cards + MRR overview + new/churn charts |
| Trends | Time-series analysis: MRR growth, customer count, NPS |
| Charts | Breakdowns by plan tier, industry, team size, CAC vs LTV |
| AI Chat | Sisense Chatbot — ask natural language questions about your data |

**Sharing:** Every chart has a Share button. Capture → preview → push to Slack or LinkedIn in two clicks.

## Quick Start

### 1. Prerequisites

- Node.js 20+
- [Sisense trial account](https://sisense.com) (free, 7 days)
- Slack workspace with an [Incoming Webhook URL](https://api.slack.com/messaging/webhooks)

### 2. Clone & install

```bash
git clone https://github.com/your-handle/sisense-internal-bi-tool
cd sisense-internal-bi-tool
npm install
```

### 3. Generate the sample data

```bash
node scripts/generate-data.mjs
# → src/data/saas-metrics.csv (2,031 rows, 150 customers × 24 months)
```

Upload `src/data/saas-metrics.csv` to your Sisense instance as an ElastiCube.

### 4. Configure

Edit `.env.local`:

```bash
NEXT_PUBLIC_SISENSE_URL=https://YOUR-TRIAL.sisense.com
NEXT_PUBLIC_SISENSE_TOKEN=YOUR_API_TOKEN
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

Update the data source name in [`src/lib/saas-schema.ts`](src/lib/saas-schema.ts) — the `DATA_SOURCE_NAME` constant must exactly match what Sisense assigned after the CSV upload.

### 5. Run

```bash
npm run dev
# → http://localhost:3000
```

## How Sharing Works

```
Click Share
    │
    ▼
html-to-image captures chart div as PNG
    │
    ▼
ShareModal: preview + editable caption
    │
    ├── Slack  → POST /api/share/slack → Slack Incoming Webhook (Block Kit message)
    └── LinkedIn → download PNG + open LinkedIn share URL with pre-filled caption
```

The Next.js API route at `/api/share/slack` proxies the Slack call server-side to avoid browser CORS restrictions.

## Blog Post

See [`BLOG_POST.md`](BLOG_POST.md) for the full Medium/Dev.to article about what was built and how.

## Tech

- Next.js 16 + React 19 + TypeScript
- [@sisense/sdk-ui](https://sisense.dev/guides/compose-sdk/) + @sisense/sdk-data v2.27
- Tailwind CSS v4
- html-to-image
- lucide-react
