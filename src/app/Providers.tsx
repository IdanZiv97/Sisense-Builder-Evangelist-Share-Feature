"use client";

import { SisenseContextProvider } from "@sisense/sdk-ui";
import { AiContextProvider } from "@sisense/sdk-ui/ai";

const SISENSE_TOKEN = process.env.NEXT_PUBLIC_SISENSE_TOKEN!;

// Route SDK calls through Next.js /_sisense proxy to avoid CORS.
// next.config.ts maps /_sisense/* → NEXT_PUBLIC_SISENSE_URL/*
const PROXY_URL =
  typeof window !== "undefined"
    ? `${window.location.origin}/_sisense`
    : "/_sisense";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SisenseContextProvider url={PROXY_URL} token={SISENSE_TOKEN}>
      <AiContextProvider>{children}</AiContextProvider>
    </SisenseContextProvider>
  );
}
