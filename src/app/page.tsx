"use client";

import { useState } from "react";
import AppShell, { type TabId } from "@/components/AppShell";
import DashboardTab from "@/components/tabs/DashboardTab";
import TrendsTab from "@/components/tabs/TrendsTab";
import ChartsTab from "@/components/tabs/ChartsTab";
import ChatTab from "@/components/tabs/ChatTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "dashboard" && <DashboardTab />}
      {activeTab === "trends" && <TrendsTab />}
      {activeTab === "charts" && <ChartsTab />}
      {activeTab === "chat" && <ChatTab />}
    </AppShell>
  );
}
