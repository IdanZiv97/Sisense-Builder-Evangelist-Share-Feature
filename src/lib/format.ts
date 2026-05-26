/**
 * Small formatters for KPI tiles.
 *
 * Pure functions, no React, no Sisense — keeps DashboardTab readable.
 */

/** $1.2M / $45.2k / $812 */
export function formatCurrency(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${Math.round(n)}`;
}

/** 1,234 — used for customer counts */
export function formatInteger(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString();
}

/** 3.8% (default 1 decimal) */
export function formatPercent(n: number, digits = 1): string {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(digits)}%`;
}

/** 7.1 / 10 */
export function formatNps(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(1)} / 10`;
}

export type DeltaKind = "pct" | "pts" | "abs";

export interface DeltaText {
  text: string;
  /** True when the change is in a *good* direction for this metric */
  positive: boolean;
}

/**
 * Format a month-over-month delta.
 *
 * @param curr current month value
 * @param prev previous month value
 * @param kind formatting style:
 *   - "pct"  → "↑ 8.3% vs last month"        (percentage change)
 *   - "pts"  → "↓ 0.4 pts"                    (percentage-point change)
 *   - "abs"  → "↑ 5 new this month"           (absolute change, integer)
 * @param goodDirection which direction is "good"; defaults to "up"
 */
export function formatDelta(
  curr: number,
  prev: number,
  kind: DeltaKind,
  goodDirection: "up" | "down" = "up",
): DeltaText {
  if (!Number.isFinite(curr) || !Number.isFinite(prev)) {
    return { text: "", positive: true };
  }

  const diff = curr - prev;
  const arrow = diff >= 0 ? "↑" : "↓";
  const positive = goodDirection === "up" ? diff >= 0 : diff <= 0;

  let body: string;
  switch (kind) {
    case "pct": {
      if (prev === 0) return { text: "", positive: true };
      const pct = (diff / prev) * 100;
      body = `${Math.abs(pct).toFixed(1)}% vs last month`;
      break;
    }
    case "pts":
      body = `${Math.abs(diff).toFixed(1)} pts`;
      break;
    case "abs":
      body = `${Math.abs(Math.round(diff))} this month`;
      break;
  }

  return { text: `${arrow} ${body}`, positive };
}

/** "5 new this month" — used when there's no comparison, just a count */
export function formatNewCount(n: number): DeltaText {
  if (!Number.isFinite(n)) return { text: "", positive: true };
  return { text: `↑ ${Math.round(n)} new this month`, positive: true };
}
