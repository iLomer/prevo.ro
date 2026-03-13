"use client";

import type { TimelineEntry } from "@/lib/fiscal";

interface AnnualTimelineProps {
  entries: TimelineEntry[];
}

function formatLei(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const MONTH_SHORT = [
  "Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
  "Iul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function AnnualTimeline({ entries }: AnnualTimelineProps) {
  const currentMonth = new Date().getMonth();
  const maxPayment = Math.max(...entries.map((e) => e.paymentAmount), 1);
  const totalTaxes = entries[entries.length - 1]?.cumulativeAmount ?? 0;

  // Find the month with the highest payment
  const peakMonth = entries.reduce((max, e) =>
    e.paymentAmount > max.paymentAmount ? e : max
  , entries[0]);

  return (
    <div className="space-y-4">
      {/* Timeline bars */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4 sm:p-6">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
          {entries.map((entry) => {
            const barHeight = entry.paymentAmount > 0
              ? Math.max(8, (entry.paymentAmount / maxPayment) * 100)
              : 0;
            const isCurrent = entry.month === currentMonth;
            const isPeak = entry === peakMonth && entry.paymentAmount > 0;
            const hasDeadlines = entry.deadlines.length > 0;

            return (
              <div
                key={entry.month}
                className={`flex min-w-[48px] flex-1 snap-center flex-col items-center gap-1 rounded-lg px-1 py-2 ${
                  isCurrent ? "bg-primary-50 ring-1 ring-primary-200" : ""
                }`}
              >
                {/* Bar area */}
                <div className="flex h-28 w-full flex-col items-center justify-end">
                  {entry.paymentAmount > 0 && (
                    <>
                      <p className="mb-1 text-[10px] font-medium tabular-nums text-secondary-500">
                        {formatLei(entry.paymentAmount)}
                      </p>
                      <div
                        className={`w-full max-w-[28px] rounded-t transition-all ${
                          isPeak
                            ? "bg-warning-400"
                            : isCurrent
                              ? "bg-primary-400"
                              : "bg-accent-400"
                        }`}
                        style={{ height: `${barHeight}%` }}
                      />
                    </>
                  )}
                  {entry.paymentAmount === 0 && hasDeadlines && (
                    <div className="mb-1 flex gap-0.5">
                      {entry.deadlines.slice(0, 3).map((_, i) => (
                        <div key={i} className="h-1.5 w-1.5 rounded-full bg-secondary-300" />
                      ))}
                    </div>
                  )}
                </div>

                {/* Month label */}
                <p className={`text-xs font-medium ${
                  isCurrent ? "text-primary-700" : "text-secondary-500"
                }`}>
                  {MONTH_SHORT[entry.month]}
                </p>

                {/* Deadline count */}
                {hasDeadlines && (
                  <p className="text-[10px] text-secondary-400">
                    {entry.deadlines.length} {entry.deadlines.length === 1 ? "termen" : "termene"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary row */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-secondary-200 bg-background p-4">
          <p className="text-xs font-medium text-secondary-500">Total taxe 2026</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
            {formatLei(totalTaxes)} lei
          </p>
        </div>

        {peakMonth && peakMonth.paymentAmount > 0 && (
          <div className="rounded-xl border border-warning-200 bg-warning-50 p-4">
            <p className="text-xs font-medium text-warning-600">Luna cu cea mai mare plata</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-warning-700">
              {peakMonth.monthName} — {formatLei(peakMonth.paymentAmount)} lei
            </p>
            <p className="mt-1 text-xs text-warning-500">
              Pune deoparte {formatLei(Math.ceil(peakMonth.paymentAmount / peakMonth.month || 1))} lei/luna pana atunci
            </p>
          </div>
        )}
      </div>

      {/* Cumulative progress */}
      {totalTaxes > 0 && (
        <div className="rounded-xl border border-secondary-200 bg-background p-4">
          <p className="mb-3 text-xs font-medium text-secondary-500">Cumulat pe anul 2026</p>
          <div className="flex items-end gap-px">
            {entries.map((entry) => {
              const pct = totalTaxes > 0 ? (entry.cumulativeAmount / totalTaxes) * 100 : 0;
              const isCurrent = entry.month === currentMonth;
              return (
                <div key={entry.month} className="flex flex-1 flex-col items-center gap-1">
                  <div className="relative h-16 w-full">
                    <div
                      className={`absolute bottom-0 w-full rounded-t-sm transition-all ${
                        isCurrent ? "bg-primary-300" : "bg-secondary-200"
                      }`}
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-secondary-400">{MONTH_SHORT[entry.month]}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-right text-xs text-secondary-400">
            {formatLei(totalTaxes)} lei total
          </p>
        </div>
      )}
    </div>
  );
}
