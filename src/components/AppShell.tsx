"use client";

import { BarChart2, TrendingUp, PieChart, MessageSquare } from "lucide-react";

export type TabId = "dashboard" | "trends" | "charts" | "chat";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <BarChart2 size={16} /> },
  { id: "trends", label: "Trends", icon: <TrendingUp size={16} /> },
  { id: "charts", label: "Charts", icon: <PieChart size={16} /> },
  { id: "chat", label: "AI Chat", icon: <MessageSquare size={16} /> },
];

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
}

export default function AppShell({ activeTab, onTabChange, children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-xs font-bold text-white">S</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">SaaS Insights</p>
            <p className="text-[10px] text-slate-400">Powered by Sisense</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 p-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span
                className={
                  activeTab === tab.id ? "text-indigo-600" : "text-slate-400"
                }
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-slate-100 px-5 py-3">
          <p className="text-[10px] text-slate-400">
            Built with Sisense Compose SDK
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
