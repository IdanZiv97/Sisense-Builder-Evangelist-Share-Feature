"use client";

import { useRef } from "react";
import ShareButton from "./sharing/ShareButton";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  shareCaption?: string;
}

export default function ChartCard({ title, subtitle, children, shareCaption }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
        <ShareButton
          targetRef={contentRef}
          defaultCaption={shareCaption ?? `${title} — powered by Sisense`}
        />
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
