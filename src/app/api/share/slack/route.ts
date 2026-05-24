import { NextRequest, NextResponse } from "next/server";

/** Upload a base64 PNG to imgbb and return its public URL. */
async function uploadToImgbb(base64: string): Promise<string | null> {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) return null;

  // Strip the data:image/png;base64, prefix if present
  const imageData = base64.replace(/^data:image\/\w+;base64,/, "");

  const form = new URLSearchParams();
  form.append("key", apiKey);
  form.append("image", imageData);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: form,
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json?.data?.url ?? null;
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "SLACK_WEBHOOK_URL is not configured" },
      { status: 500 }
    );
  }

  const { text, imageBase64 } = await req.json();
  if (!text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  // Try to get a public image URL — falls back gracefully if imgbb key isn't set
  const imageUrl = imageBase64 ? await uploadToImgbb(imageBase64) : null;

  const blocks: object[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*📊 SaaS Analytics Insight*\n${text}`,
      },
    },
  ];

  // Add chart screenshot if we got a public URL
  if (imageUrl) {
    blocks.push({
      type: "image",
      image_url: imageUrl,
      alt_text: "Chart screenshot",
    });
  }

  blocks.push({ type: "divider" });
  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: "Shared from *Internal Analytics* · Powered by Sisense Compose SDK",
      },
    ],
  });

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks }),
  });

  if (!slackRes.ok) {
    const body = await slackRes.text();
    return NextResponse.json({ error: body }, { status: slackRes.status });
  }

  return NextResponse.json({ ok: true, hasImage: !!imageUrl });
}
