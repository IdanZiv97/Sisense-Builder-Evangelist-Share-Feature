export async function shareToSlack(text: string): Promise<void> {
  const res = await fetch("/api/share/slack", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "Unknown error");
    throw new Error(`Slack share failed: ${msg}`);
  }
}
