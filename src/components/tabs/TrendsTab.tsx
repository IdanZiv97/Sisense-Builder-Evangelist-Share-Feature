"use client";

import { Chart } from "@sisense/sdk-ui";
import { measureFactory } from "@sisense/sdk-data";
import { DataSource, DM } from "@/lib/saas-schema";
import ChartCard from "../ChartCard";

export default function TrendsTab() {
  const totalMrr = measureFactory.sum(DM.Mrr, "Total MRR ($)");
  const avgNps = measureFactory.average(DM.NpsScore, "Avg NPS");
  const activeCount = measureFactory.sum(DM.IsActive, "Active Customers");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Trends</h1>
        <p className="text-sm text-slate-400">Time-series analysis with trend lines</p>
      </div>

      {/* MRR trend */}
      <ChartCard
        title="MRR Trend"
        subtitle="Revenue growth with linear trend overlay"
        shareCaption="MRR trend analysis — 24 months of SaaS revenue growth. Powered by Sisense."
      >
        <div style={{ height: 300 }}>
          <Chart
            dataSet={DataSource}
            chartType="line"
            dataOptions={{
              category: [DM.Date.Months],
              value: [totalMrr],
              breakBy: [],
            }}
            styleOptions={{
              legend: { enabled: false },
            }}
          />
        </div>
      </ChartCard>

      {/* Active customers over time */}
      <ChartCard
        title="Customer Growth"
        subtitle="Total active customers per month"
        shareCaption="Customer growth over 24 months — tracking the compound effect of low churn."
      >
        <div style={{ height: 280 }}>
          <Chart
            dataSet={DataSource}
            chartType="area"
            dataOptions={{
              category: [DM.Date.Months],
              value: [activeCount],
              breakBy: [],
            }}
            styleOptions={{ legend: { enabled: false } }}
          />
        </div>
      </ChartCard>

      {/* NPS trend */}
      <ChartCard
        title="NPS Score Trend"
        subtitle="Customer satisfaction over time (1–10)"
        shareCaption="Our NPS score trend — customer happiness is the real leading indicator."
      >
        <div style={{ height: 260 }}>
          <Chart
            dataSet={DataSource}
            chartType="line"
            dataOptions={{
              category: [DM.Date.Months],
              value: [avgNps],
              breakBy: [],
            }}
            styleOptions={{ legend: { enabled: false } }}
          />
        </div>
      </ChartCard>
    </div>
  );
}
