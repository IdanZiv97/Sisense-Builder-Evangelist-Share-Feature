# Sisense Builder Evangelist — Share Feature

An internal SaaS analytics tool built with the **Sisense Compose SDK + Claude Code** in one day, plus a **chart-to-Slack/LinkedIn sharing layer** designed as the centerpiece of a bottom-up PLG motion.

This repo is a Builder Evangelist assignment submission. It contains three deliverables:

| File | What it is |
|------|------------|
| [`SETUP.md`](SETUP.md) | Technical setup — clone the repo, configure your Sisense trial, run the app locally. Start here if you want to see the tool working. |
| [`BLOG_POST.md`](BLOG_POST.md) | The content asset — a Medium-ready tutorial walking a developer through the build, prompt-by-prompt. This is what gets shared on Reddit, Medium, and LinkedIn. |
| [`STRATEGY.md`](STRATEGY.md) | The thinking behind the build — the *why*: target audience, UVP, the role of the sharing feature as a PLG engine, and where the feature grows from here. |

---

## The 30-second summary

**What it is.** A working SaaS analytics dashboard (KPIs, trends, segmented charts, an AI chatbot) with a built-in sharing layer that pushes any chart — with an AI-generated caption — to Slack or LinkedIn in two clicks.

**Why it matters.** No competing embedded-analytics SDK has native sharing. Every shared chart is a branded Sisense impression. That makes sharing the engine of the PLG flywheel: developers discover the tool → build with it → share insights → other people in their company/network see Sisense-powered charts → next user enters the funnel.

**Who it's for.** SaaS developers and indie hackers as the primary audience (cheap to acquire now, anchor users as they grow into enterprise buyers), plus PMs and team leads who need a working prototype to justify a Sisense license to upper management.

---

## App at a glance

| Tab | What it does |
|-----|-------------|
| **Dashboard** | KPI cards + MRR overview + new/churn charts |
| **Trends** | Time-series: MRR growth, customer count, NPS |
| **Charts** | Breakdowns by plan tier, industry, team size, CAC vs LTV |
| **AI Chat** | Sisense Chatbot — natural-language Q&A over the data |

Every chart card has an **AI Insights** toggle (NLG explanation of what the chart shows) and a **Share** button (Slack + LinkedIn out of the box).

---

## Getting started

```bash
git clone git@github.com:IdanZiv97/Sisense-Builder-Evangelist-Share-Feature.git
cd Sisense-Builder-Evangelist-Share-Feature
npm install
```

Then follow [`SETUP.md`](SETUP.md) for the Sisense + Slack configuration steps.

---

## A note on scope

This was a one-day build to showcase a new sharing feature for the Sisense Compose SDK and the strategy behind it (see [`STRATEGY.md`](STRATEGY.md) and [`BLOG_POST.md`](BLOG_POST.md)). Engineering rigor was deliberately scoped to what the demo and the story require.

**No test suite ships with v1** — every hour spent on testing was an hour not spent on the strategy and content asset, which are the assignment's real deliverables. A production version would ship:

- **Unit tests (TDD-style)** for pure logic in `src/lib/format.ts`, `slack.ts`, `linkedin.ts` — currency-abbreviation boundaries, division-by-zero in deltas, POST body shapes, URL composition, `NaN` handling.
- **Behavior tests (BDD-style)** with React Testing Library: *given a chart, when I click Share + Slack, the API is called exactly once and the image downloads*; KPI loading skeletons; the AI Insights toggle pre-filling the share caption.
- **Integration tests** against `/api/share/slack` with `fetch` mocked via MSW.

External dependencies (`useExecuteQuery`, `fetch`, `navigator.clipboard`, `html-to-image`) would be mocked; pure functions and route handlers would not. Framework: **Vitest + React Testing Library**, colocated with source.

---

*Idan Ziv — Builder Evangelist candidate*
