"use client";

import { Chart } from "@sisense/sdk-ui";
import { measureFactory } from "@sisense/sdk-data";
import { DataSource, DM } from "@/lib/saas-schema";
import ChartCard from "../ChartCard";

export default function ChartsTab() {
  const totalMrr = measureFactory.sum(DM.Mrr, "MRR ($)");
  const avgCac = measureFactory.average(DM.Cac, "Avg CAC ($)");
  const avgLtv = measureFactory.average(DM.Ltv, "Avg LTV ($)");
  const customerCount = measureFactory.sum(DM.IsActive, "Customers");
  const avgNps = measureFactory.average(DM.NpsScore, "Avg NPS");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Charts</h1>
        <p className="text-sm text-slate-400">Segmented breakdowns by plan, industry, and team size</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* MRR by plan tier */}
        <ChartCard
          title="MRR by Plan Tier"
          subtitle="Revenue contribution per tier"
          shareCaption="MRR breakdown by plan tier — Enterprise is small in count but drives disproportionate revenue."
          insights={{
            dataSource: DataSource,
            dimensions: [DM.PlanTier],
            measures: [totalMrr],
          }}
        >
          <div style={{ height: 260 }}>
            <Chart
              dataSet={DataSource}
              chartType="column"
              dataOptions={{
                category: [DM.PlanTier],
                value: [totalMrr],
                breakBy: [],
              }}
            />
          </div>
        </ChartCard>

        {/* Customers by industry */}
        <ChartCard
          title="Customers by Industry"
          subtitle="Active customer distribution"
          shareCaption="Our customer base by industry — SaaS and E-Commerce lead adoption."
          insights={{
            dataSource: DataSource,
            dimensions: [DM.Industry],
            measures: [customerCount],
          }}
        >
          <div style={{ height: 260 }}>
            <Chart
              dataSet={DataSource}
              chartType="pie"
              dataOptions={{
                category: [DM.Industry],
                value: [customerCount],
              }}
            />
          </div>
        </ChartCard>

        {/* MRR by industry */}
        <ChartCard
          title="MRR by Industry"
          subtitle="Revenue per vertical"
          shareCaption="MRR by industry vertical — FinTech customers are smaller in number but have higher ARPU."
          insights={{
            dataSource: DataSource,
            dimensions: [DM.Industry],
            measures: [totalMrr],
          }}
        >
          <div style={{ height: 260 }}>
            <Chart
              dataSet={DataSource}
              chartType="bar"
              dataOptions={{
                category: [DM.Industry],
                value: [totalMrr],
                breakBy: [],
              }}
            />
          </div>
        </ChartCard>

        {/* CAC vs LTV by plan */}
        <ChartCard
          title="CAC vs LTV by Plan Tier"
          subtitle="Unit economics per tier"
          shareCaption="CAC vs LTV by plan tier — the LTV:CAC ratio tells you where to double down on sales investment."
          insights={{
            dataSource: DataSource,
            dimensions: [DM.PlanTier],
            measures: [avgCac, avgLtv],
          }}
        >
          <div style={{ height: 260 }}>
            <Chart
              dataSet={DataSource}
              chartType="column"
              dataOptions={{
                category: [DM.PlanTier],
                value: [avgCac, avgLtv],
                breakBy: [],
              }}
            />
          </div>
        </ChartCard>

        {/* Customers by team size */}
        <ChartCard
          title="Customers by Team Size"
          subtitle="Company size distribution"
          shareCaption="Our customers by team size — small teams dominate but enterprise is growing."
          insights={{
            dataSource: DataSource,
            dimensions: [DM.TeamSizeBucket],
            measures: [customerCount],
          }}
        >
          <div style={{ height: 260 }}>
            <Chart
              dataSet={DataSource}
              chartType="pie"
              dataOptions={{
                category: [DM.TeamSizeBucket],
                value: [customerCount],
              }}
            />
          </div>
        </ChartCard>

        {/* NPS by plan tier */}
        <ChartCard
          title="Avg NPS by Plan Tier"
          subtitle="Satisfaction score per tier"
          shareCaption="NPS by plan tier — Enterprise customers score highest. Invest there."
          insights={{
            dataSource: DataSource,
            dimensions: [DM.PlanTier],
            measures: [avgNps],
          }}
        >
          <div style={{ height: 260 }}>
            <Chart
              dataSet={DataSource}
              chartType="column"
              dataOptions={{
                category: [DM.PlanTier],
                value: [avgNps],
                breakBy: [],
              }}
            />
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
