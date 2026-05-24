"use client";

import { useState } from "react";
import { Share2, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import ShareModal from "./ShareModal";

interface Props {
  targetRef: React.RefObject<HTMLDivElement | null>;
  defaultCaption: string;
  /** When provided, its textContent is used as the caption if non-empty (NLG insight text). */
  insightsPanelRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ShareButton({ targetRef, defaultCaption, insightsPanelRef }: Props) {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [resolvedCaption, setResolvedCaption] = useState(defaultCaption);

  async function handleClick() {
    if (!targetRef.current) return;
    setCapturing(true);
    try {
      // Grab NLG insight text at share time if the panel is mounted and has content
      const insightText = insightsPanelRef?.current?.textContent?.trim();
      setResolvedCaption(insightText || defaultCaption);

      const dataUrl = await toPng(targetRef.current, {
        pixelRatio: 2,
        skipFonts: false,
        backgroundColor: "#ffffff",
      });
      setImageDataUrl(dataUrl);
    } finally {
      setCapturing(false);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={capturing}
        title="Share this chart"
        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50"
      >
        {capturing ? <Loader2 size={13} className="animate-spin" /> : <Share2 size={13} />}
        Share
      </button>

      {imageDataUrl && (
        <ShareModal
          imageDataUrl={imageDataUrl}
          defaultCaption={resolvedCaption}
          onClose={() => setImageDataUrl(null)}
        />
      )}
    </>
  );
}
