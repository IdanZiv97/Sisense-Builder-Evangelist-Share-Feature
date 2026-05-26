const REPO_URL =
  process.env.NEXT_PUBLIC_SHARE_URL ??
  "https://github.com/IdanZiv97/Sisense-Builder-Evangelist-Share-Feature";

/**
 * Copy caption to clipboard then open LinkedIn's share dialog.
 * LinkedIn no longer accepts pre-filled text via URL params —
 * copying to clipboard lets the user paste it directly into the post.
 * Returns true if clipboard write succeeded.
 */
export async function openLinkedInShare(caption: string): Promise<boolean> {
  let copied = false;
  try {
    await navigator.clipboard.writeText(caption);
    copied = true;
  } catch {
    // Clipboard API blocked (e.g. non-https) — user copies manually
  }

  const url = new URL("https://www.linkedin.com/sharing/share-offsite/");
  url.searchParams.set("url", REPO_URL);
  window.open(url.toString(), "_blank", "noopener,noreferrer");

  return copied;
}

export function downloadPng(dataUrl: string, filename = "insight.png"): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
