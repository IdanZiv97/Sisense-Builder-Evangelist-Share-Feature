"use client";

import { Chatbot } from "@sisense/sdk-ui/ai";

export default function ChatTab() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-slate-900">AI Chat</h1>
        <p className="text-sm text-slate-400">
          Ask natural language questions about your SaaS data
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Chatbot
          width="100%"
          height="100%"
          config={{
            dataTopicsList: ["SaaS_Sample"],
            enableFollowupQuestions: true,
            numOfRecommendations: 4,
            inputPromptText: "Ask about MRR, churn, CAC, LTV, or customer trends…",
            welcomeText: "Hi! I can answer questions about your SaaS metrics.",
            suggestionsWelcomeText: "Try one of these questions:",
          }}
        />
      </div>
    </div>
  );
}
