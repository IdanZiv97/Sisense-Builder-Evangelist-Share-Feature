"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { shareToSlack } from "@/lib/slack";
import { openLinkedInShare, downloadPng } from "@/lib/linkedin";


interface Props {
  imageDataUrl: string;
  defaultCaption: string;
  onClose: () => void;
}

export default function ShareModal({ imageDataUrl, defaultCaption, onClose }: Props) {
  const [caption, setCaption] = useState(defaultCaption);
  const [slackState, setSlackState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [slackError, setSlackError] = useState("");
  const [linkedInShared, setLinkedInShared] = useState(false);

  async function handleSlack() {
    setSlackState("loading");
    setSlackError("");
    try {
      // Download the chart image locally (same as LinkedIn)
      downloadPng(imageDataUrl, "sisense-insight.png");
      await shareToSlack(caption);
      setSlackState("done");
    } catch (e) {
      setSlackState("error");
      setSlackError(e instanceof Error ? e.message : "Unknown error");
    }
  }

  async function handleLinkedIn() {
    downloadPng(imageDataUrl, "sisense-insight.png");
    await openLinkedInShare(caption);
    setLinkedInShared(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Share Insight</h3>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100">
            <X size={16} />
          </button>
        </div>

        {/* Chart preview */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageDataUrl}
          alt="Chart preview"
          className="mb-4 w-full rounded-lg border border-slate-100"
        />

        {/* Caption editor */}
        <label className="mb-1 block text-xs font-medium text-slate-600">Caption</label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
          className="mb-4 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none"
        />

        {/* Actions */}
        <div className="flex gap-3">
          {/* Slack */}
          <button
            onClick={handleSlack}
            disabled={slackState === "loading" || slackState === "done"}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              slackState === "done"
                ? "bg-emerald-50 text-emerald-700"
                : slackState === "error"
                ? "bg-red-50 text-red-700"
                : "bg-[#4A154B] text-white hover:bg-[#3a1039] disabled:opacity-60"
            }`}
          >
            {slackState === "loading" ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <span className="text-base">💬</span>
            )}
            {slackState === "done"
              ? "Sent!"
              : slackState === "error"
              ? "Retry"
              : "Share to Slack"}
          </button>

          {/* LinkedIn */}
          <button
            onClick={handleLinkedIn}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#005f8f]"
          >
            <span className="text-base">🔗</span>
            Share to LinkedIn
          </button>
        </div>

        {slackState === "error" && (
          <p className="mt-2 text-xs text-red-500">{slackError}</p>
        )}

        {slackState === "done" && (
          <p className="mt-2 text-xs text-slate-400">
            Message sent to your Slack channel · image downloaded.
          </p>
        )}

        {/* LinkedIn hint */}
        {linkedInShared ? (
          <p className="mt-3 text-[11px] text-emerald-600 font-medium">
            ✓ Caption copied to clipboard · image downloaded — paste the text and attach the image in LinkedIn.
          </p>
        ) : (
          <p className="mt-3 text-[11px] text-slate-400">
            LinkedIn: caption will be copied to clipboard, image downloads automatically.
          </p>
        )}
      </div>
    </div>
  );
}
