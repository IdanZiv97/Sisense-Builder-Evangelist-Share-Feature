"use client";

import { useMemo } from "react";
import { Chart, useExecuteQuery } from "@sisense/sdk-ui";
import { measureFactory } from "@sisense/sdk-data";
import { DollarSign, Users, TrendingDown, BarChart2 } from "lucide-react";
import { DataSource, DM } from "@/lib/saas-schema";
import {
  formatCurrency,
  formatInteger,
  formatPercent,
  formatNps,
  formatDelta,
  formatNewCount,
  type DeltaText,
} from "@/lib/format";
import KpiCard from "../KpiCard";
import ChartCard from "../ChartCard";

interface KpiValues {
  mrr: { value: string; delta: DeltaText };
  active: { value: string; delta: DeltaText };
  churn: { value: string; delta: DeltaText };
  nps: { value: string; delta: DeltaText };
}

/** Read a numeric value out of a Sisense Cell (cells expose .data + .text) */
function num(cell: { data: unknown } | undefined): number {
  const v = cell?.data;
  return typeof v === "number" ? v : Number(v);
}

export default function DashboardTab() {
  // Chart measures (reused below)
  const activeMrr = measureFactory.sum(DM.Mrr, "Total MRR ($)");
  const newCustomers = measureFactory.sum(DM.IsNew, "New Customers");
  const churnedCustomers = measureFactory.sum(DM.IsChurned, "Churned");

  // KPI query: one round-trip, grouped by month, all five aggregates.
  // Same DataSource the charts below use — single source of truth.
  const kpiQuery = useExecuteQuery({
    dataSource: DataSource,
    dimensions: [DM.Date.Months],
    measures: [
      measureFactory.sum(DM.Mrr, "MRR"),
      measureFactory.sum(DM.IsActive, "Active"),
      measureFactory.sum(DM.IsChurned, "Churned"),
      measureFactory.sum(DM.IsNew, "New"),
      measureFactory.average(DM.NpsScore, "AvgNPS"),
    ],
  });

  const kpis: KpiValues | null = useMemo(() => {
    if (!kpiQuery.data || kpiQuery.data.rows.length === 0) return null;

    // Rows are [Month, MRR, Active, Churned, New, AvgNPS] in the order
    // we passed dimensions+measures. Sort by the month text just in case
    // Sisense returned them unordered, then grab the last two.
    const rows = [...kpiQuery.data.rows].sort((a, b) => {
      const ta = String(a[0]?.text ?? a[0]?.data ?? "");
      const tb = String(b[0]?.text ?? b[0]?.data ?? "");
      return ta.localeCompare(tb);
    });
    const latest = rows[rows.length - 1];
    const prev = rows[rows.length - 2] ?? latest;

    const currMrr = num(latest[1]);
    const prevMrr = num(prev[1]);

    const currActive = num(latest[2]);
    const currNew = num(latest[4]);

    const currChurned = num(latest[3]);
    const prevChurned = num(prev[3]);
    const prevActive = num(prev[2]);
    const currChurnRate = currActive > 0 ? (currChurned / currActive) * 100 : NaN;
    const prevChurnRate = prevActive > 0 ? (prevChurned / prevActive) * 100 : NaN;

    const currNps = num(latest[5]);
    const prevNps = num(prev[5]);

    return {
      mrr: {
        value: formatCurrency(currMrr),
        delta: formatDelta(currMrr, prevMrr, "pct", "up"),
      },
      active: {
        value: formatInteger(currActive),
        delta: formatNewCount(currNew),
      },
      churn: {
        value: formatPercent(currChurnRate),
        // For churn, "down" is good
        delta: formatDelta(currChurnRate, prevChurnRate, "pts", "down"),
      },
      nps: {
        value: formatNps(currNps),
        delta: formatDelta(currNps, prevNps, "pts", "up"),
      },
    };
  }, [kpiQuery.data]);

  const loading = kpiQuery.isLoading || !kpis;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-400">SaaS metrics overview · Jan 2023 – Dec 2024</p>
      </div>

      {/* KPI cards — driven by useExecuteQuery against the same DataSource as the charts */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          title="Monthly Recurring Revenue"
          value={kpis?.mrr.value ?? "—"}
          change={kpis?.mrr.delta.text}
          changePositive={kpis?.mrr.delta.positive}
          icon={<DollarSign size={16} />}
          loading={loading}
        />
        <KpiCard
          title="Active Customers"
          value={kpis?.active.value ?? "—"}
          change={kpis?.active.delta.text}
          changePositive={kpis?.active.delta.positive}
          icon={<Users size={16} />}
          loading={loading}
        />
        <KpiCard
          title="Churn Rate"
          value={kpis?.churn.value ?? "—"}
          change={kpis?.churn.delta.text}
          changePositive={kpis?.churn.delta.positive}
          icon={<TrendingDown size={16} />}
          loading={loading}
        />
        <KpiCard
          title="Avg. NPS Score"
          value={kpis?.nps.value ?? "—"}
          change={kpis?.nps.delta.text}
          changePositive={kpis?.nps.delta.positive}
          icon={<BarChart2 size={16} />}
          loading={loading}
        />
      </div>

      {/* MRR over time */}
      <ChartCard
        title="MRR Over Time"
        subtitle="Monthly recurring revenue Jan 2023 – Dec 2024"
        shareCaption="Our MRR trend over the past 24 months — built with Sisense Compose SDK + Claude."
        insights={{
          dataSource: DataSource,
          dimensions: [DM.Date.Months],
          measures: [activeMrr],
        }}
      >
        <div style={{ height: 300 }}>
          <Chart
            dataSet={DataSource}
            chartType="line"
            dataOptions={{
              category: [DM.Date.Months],
              value: [activeMrr],
              breakBy: [],
            }}
            styleOptions={{ legend: { enabled: false } }}
          />
        </div>
      </ChartCard>

      {/* New vs Churned */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard
          title="New Customers per Month"
          subtitle="Net new signups over time"
          shareCaption="New customer acquisitions — 24 months of SaaS growth data"
          insights={{
            dataSource: DataSource,
            dimensions: [DM.Date.Months],
            measures: [newCustomers],
          }}
        >
          <div style={{ height: 240 }}>
            <Chart
              dataSet={DataSource}
              chartType="column"
              dataOptions={{
                category: [DM.Date.Months],
                value: [newCustomers],
                breakBy: [],
              }}
              styleOptions={{ legend: { enabled: false } }}
            />
          </div>
        </ChartCard>

        <ChartCard
          title="Churned Customers per Month"
          subtitle="Customer cancellations over time"
          shareCaption="Monthly churn — key metric for any SaaS business"
          insights={{
            dataSource: DataSource,
            dimensions: [DM.Date.Months],
            measures: [churnedCustomers],
          }}
        >
          <div style={{ height: 240 }}>
            <Chart
              dataSet={DataSource}
              chartType="column"
              dataOptions={{
                category: [DM.Date.Months],
                value: [churnedCustomers],
                breakBy: [],
              }}
              styleOptions={{ legend: { enabled: false } }}
            />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
