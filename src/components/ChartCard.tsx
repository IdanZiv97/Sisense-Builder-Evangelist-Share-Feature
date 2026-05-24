"use client";

import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { GetNlgInsights } from "@sisense/sdk-ui/ai";
import type { Attribute, Measure } from "@sisense/sdk-data";
import type { DataSourceInfo } from "@sisense/sdk-data";
import ShareButton from "./sharing/ShareButton";

interface InsightsConfig {
  dataSource: string | DataSourceInfo;
  dimensions?: Attribute[];
  measures?: Measure[];
}

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  shareCaption?: string;
  /** When provided, shows an AI Insights toggle below the chart */
  insights?: InsightsConfig;
}

export default function ChartCard({ title, subtitle, children, shareCaption, insights }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showInsights, setShowInsights] = useState(false);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1">
          {insights && (
            <button
              onClick={() => setShowInsights((v) => !v)}
              title="AI Insights"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                showInsights
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-400 hover:bg-slate-50 hover:text-indigo-500"
              }`}
            >
              <Sparkles size={13} />
              Insights
            </button>
          )}
          <ShareButton
            targetRef={contentRef}
            defaultCaption={shareCaption ?? `${title} — powered by Sisense`}
          />
        </div>
      </div>

      {/* Chart */}
      <div ref={contentRef}>{children}</div>

      {/* NLG Insights panel — only rendered when toggled on */}
      {insights && showInsights && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <GetNlgInsights
            dataSource={insights.dataSource}
            dimensions={insights.dimensions}
            measures={insights.measures}
          />
        </div>
      )}
    </div>
  );
}
