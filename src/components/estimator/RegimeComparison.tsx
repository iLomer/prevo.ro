"use client";

import type { ComparisonBreakdown } from "@/lib/fiscal";

interface RegimeComparisonProps {
  comparison: ComparisonBreakdown;
}

const REGIME_LABELS: Record<string, string> = {
  norma_venit: "Norma de venit",
  sistem_real: "Sistem real",
  micro_1: "Micro 1%",
};

function formatLei(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface CompareRow {
  label: string;
  currentValue: number;
  comparisonValue: number;
}

export function RegimeComparison({ comparison }: RegimeComparisonProps) {
  const { current, comparison: comp, savings, recommendation } = comparison;

  const currentLabel = REGIME_LABELS[current.regime] ?? current.regime;
  const compLabel = REGIME_LABELS[comp.regime] ?? comp.regime;

  const comparisonIsCheaper = savings > 0;
  const recommendedLabel = comparisonIsCheaper ? compLabel : currentLabel;

  const rows: CompareRow[] = [
    { label: "Baza impozabila", currentValue: current.taxableBase, comparisonValue: comp.taxableBase },
    { label: "CAS (25%)", currentValue: current.cas, comparisonValue: comp.cas },
    { label: "CASS (10%)", currentValue: current.cass, comparisonValue: comp.cass },
    { label: "Impozit (10%)", currentValue: current.incomeTax, comparisonValue: comp.incomeTax },
    { label: "Total taxe", currentValue: current.totalTax, comparisonValue: comp.totalTax },
    { label: "Venit net", currentValue: current.netIncome, comparisonValue: comp.netIncome },
  ];

  return (
    <div className="space-y-4">
      {/* Side-by-side table */}
      <div className="rounded-xl border border-secondary-200 bg-background overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-3 border-b border-secondary-100">
          <div className="px-4 py-3" />
          <div className={`px-4 py-3 text-center border-l border-secondary-100 ${!comparisonIsCheaper ? "bg-accent-50" : ""}`}>
            <p className="text-xs font-medium text-secondary-400">Regimul tau</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{currentLabel}</p>
          </div>
          <div className={`px-4 py-3 text-center border-l border-secondary-100 ${comparisonIsCheaper ? "bg-accent-50" : ""}`}>
            <p className="text-xs font-medium text-secondary-400">Comparatie</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{compLabel}</p>
          </div>
        </div>

        {/* Data rows */}
        {rows.map((row) => {
          const delta = row.currentValue - row.comparisonValue;
          const isTotal = row.label === "Total taxe";
          const isNet = row.label === "Venit net";

          return (
            <div
              key={row.label}
              className={`grid grid-cols-3 border-b border-secondary-100 last:border-b-0 ${isTotal ? "bg-secondary-50 font-semibold" : ""}`}
            >
              <div className="px-4 py-2.5">
                <p className={`text-sm ${isTotal || isNet ? "font-semibold text-foreground" : "text-secondary-600"}`}>
                  {row.label}
                </p>
              </div>
              <div className={`px-4 py-2.5 text-right border-l border-secondary-100 ${!comparisonIsCheaper && isTotal ? "bg-accent-50" : ""}`}>
                <span className="text-sm tabular-nums text-foreground">
                  {formatLei(row.currentValue)} lei
                </span>
              </div>
              <div className={`px-4 py-2.5 text-right border-l border-secondary-100 ${comparisonIsCheaper && isTotal ? "bg-accent-50" : ""}`}>
                <span className="text-sm tabular-nums text-foreground">
                  {formatLei(row.comparisonValue)} lei
                </span>
                {isTotal && Math.abs(delta) >= 100 && (
                  <p className={`mt-0.5 text-xs font-medium ${delta > 0 ? "text-accent-600" : "text-error-600"}`}>
                    {delta > 0 ? `-${formatLei(delta)}` : `+${formatLei(Math.abs(delta))}`} lei
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation card */}
      <div className={`rounded-xl border p-4 ${
        Math.abs(savings) < 100
          ? "border-secondary-200 bg-secondary-50"
          : comparisonIsCheaper
            ? "border-accent-200 bg-accent-50"
            : "border-primary-200 bg-primary-50"
      }`}>
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 rounded-full p-1.5 ${
            Math.abs(savings) < 100
              ? "bg-secondary-200 text-secondary-600"
              : comparisonIsCheaper
                ? "bg-accent-200 text-accent-700"
                : "bg-primary-200 text-primary-700"
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {Math.abs(savings) < 100
                ? "Diferenta nesemnificativa"
                : `Recomandat: ${recommendedLabel}`}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-secondary-600">
              {recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
