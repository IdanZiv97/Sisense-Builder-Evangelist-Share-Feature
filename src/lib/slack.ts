export async function shareToSlack(text: string, imageBase64?: string): Promise<void> {
  const res = await fetch("/api/share/slack", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, imageBase64 }),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "Unknown error");
    throw new Error(`Slack share failed: ${msg}`);
  }
}
