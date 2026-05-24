"use client";

import { Chart } from "@sisense/sdk-ui";
import { measureFactory } from "@sisense/sdk-data";
import { DollarSign, Users, TrendingDown, BarChart2 } from "lucide-react";
import { DataSource, DM } from "@/lib/saas-schema";
import KpiCard from "../KpiCard";
import ChartCard from "../ChartCard";

export default function DashboardTab() {
  const activeMrr = measureFactory.sum(DM.Mrr, "Total MRR ($)");
  const newCustomers = measureFactory.sum(DM.IsNew, "New Customers");
  const churnedCustomers = measureFactory.sum(DM.IsChurned, "Churned");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-400">SaaS metrics overview · Jan 2023 – Dec 2024</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          title="Monthly Recurring Revenue"
          value="$45.2k"
          change="↑ 8.3% vs last month"
          changePositive
          icon={<DollarSign size={16} />}
        />
        <KpiCard
          title="Active Customers"
          value="101"
          change="↑ 5 new this month"
          changePositive
          icon={<Users size={16} />}
        />
        <KpiCard
          title="Churn Rate"
          value="3.8%"
          change="↓ 0.4% vs last month"
          changePositive
          icon={<TrendingDown size={16} />}
        />
        <KpiCard
          title="Avg. NPS Score"
          value="7.1 / 10"
          change="↑ 0.2 pts"
          changePositive
          icon={<BarChart2 size={16} />}
        />
      </div>

      {/* MRR over time */}
      <ChartCard
        title="MRR Over Time"
        subtitle="Monthly recurring revenue Jan 2023 – Dec 2024"
        shareCaption="Our MRR trend over the past 24 months — built with Sisense Compose SDK + Claude. The sharing feature didn't exist in the SDK. I built it in 90 lines. 🚀"
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
