"use client";

interface Props {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon?: React.ReactNode;
  /** When true, render the card chrome but hide value/change behind a skeleton */
  loading?: boolean;
}

export default function KpiCard({
  title,
  value,
  change,
  changePositive,
  icon,
  loading,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{title}</p>
        {icon && <span className="text-slate-300">{icon}</span>}
      </div>
      {loading ? (
        <>
          <div className="mt-2 h-7 w-24 animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-3 w-32 animate-pulse rounded bg-slate-100" />
        </>
      ) : (
        <>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          {change && (
            <p
              className={`mt-1 text-xs font-medium ${
                changePositive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {change}
            </p>
          )}
        </>
      )}
    </div>
  );
}
