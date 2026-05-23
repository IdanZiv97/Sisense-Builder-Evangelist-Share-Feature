const REPO_URL = "https://github.com/your-handle/sisense-internal-bi-tool";
const MAX_SUMMARY_LENGTH = 700;

export function openLinkedInShare(caption: string): void {
  const summary =
    caption.length > MAX_SUMMARY_LENGTH
      ? caption.slice(0, MAX_SUMMARY_LENGTH - 3) + "..."
      : caption;

  const url = new URL("https://www.linkedin.com/sharing/share-offsite/");
  url.searchParams.set("url", REPO_URL);
  url.searchParams.set("title", "SaaS Analytics Insight · Built with Sisense");
  url.searchParams.set("summary", summary);
  window.open(url.toString(), "_blank", "noopener,noreferrer");
}

export function downloadPng(dataUrl: string, filename = "insight.png"): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
