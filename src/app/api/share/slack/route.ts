import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "SLACK_WEBHOOK_URL is not configured" },
      { status: 500 }
    );
  }

  const { text } = await req.json();
  if (!text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const payload = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*📊 SaaS Analytics Insight*\n${text}`,
        },
      },
      {
        type: "divider",
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Shared from *Internal Analytics* · Powered by Sisense Compose SDK",
          },
        ],
      },
    ],
  };

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!slackRes.ok) {
    const body = await slackRes.text();
    return NextResponse.json({ error: body }, { status: slackRes.status });
  }

  return NextResponse.json({ ok: true });
}
