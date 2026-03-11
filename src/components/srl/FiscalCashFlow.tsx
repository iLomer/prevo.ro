"use client";

import { useState, useMemo } from "react";
import type { SRLMicroRegime } from "@/lib/fiscal/srl";
import { calculateQuarterlyMicroTax } from "@/lib/fiscal/srl";
import { SRL_CONSTANTS_2026 } from "@/lib/fiscal/srl";

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const QUARTER_LABELS = ["T1", "T2", "T3", "T4"];
const QUARTER_MONTHS = [
  "Ian - Mar",
  "Apr - Iun",
  "Iul - Sep",
  "Oct - Dec",
];

const D100_DEADLINES = [
  "25 aprilie",
  "25 iulie",
  "25 octombrie",
  "25 ianuarie (anul urmator)",
];

const MONTH_LABELS = [
  "Ianuarie", "Februarie", "Martie",
  "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie",
  "Octombrie", "Noiembrie", "Decembrie",
];

interface FiscalCashFlowProps {
  initialRegime: SRLMicroRegime;
}

type InputMode = "monthly" | "average";

export function FiscalCashFlow({ initialRegime }: FiscalCashFlowProps) {
  const [regime, setRegime] = useState<SRLMicroRegime>(initialRegime);
  const [inputMode, setInputMode] = useState<InputMode>("average");
  const [averageRevenue, setAverageRevenue] = useState<string>("");
  const [monthlyRevenues, setMonthlyRevenues] = useState<string[]>(
    Array(12).fill("")
  );

  const quarterlyData = useMemo(() => {
    const monthValues = inputMode === "average"
      ? Array(12).fill(parseFloat(averageRevenue) || 0)
      : monthlyRevenues.map((v) => parseFloat(v) || 0);

    const quarters = [
      monthValues.slice(0, 3),
      monthValues.slice(3, 6),
      monthValues.slice(6, 9),
      monthValues.slice(9, 12),
    ];

    let cumulativeTax = 0;
    let cumulativeRevenue = 0;

    return quarters.map((months, i) => {
      const quarterRevenue = months.reduce((sum, m) => sum + m, 0);
      const taxAmount = calculateQuarterlyMicroTax(quarterRevenue, regime);

      cumulativeRevenue += quarterRevenue;
      cumulativeTax += taxAmount;

      return {
        quarter: QUARTER_LABELS[i],
        months: QUARTER_MONTHS[i],
        deadline: D100_DEADLINES[i],
        revenue: quarterRevenue,
        tax: taxAmount,
        cumulativeRevenue,
        cumulativeTax,
        netAfterTax: quarterRevenue - taxAmount,
      };
    });
  }, [regime, inputMode, averageRevenue, monthlyRevenues]);

  const totalRevenue = quarterlyData[3]?.cumulativeRevenue ?? 0;
  const totalTax = quarterlyData[3]?.cumulativeTax ?? 0;
  const maxRevenue = Math.max(...quarterlyData.map((q) => q.revenue), 1);
  const taxRate = regime === "micro_1" ? "1%" : "3%";

  function updateMonthlyRevenue(index: number, value: string) {
    const updated = [...monthlyRevenues];
    updated[index] = value;
    setMonthlyRevenues(updated);
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Configurare
        </h3>

        {/* Regime selector */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Regim fiscal
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setRegime("micro_1")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                regime === "micro_1"
                  ? "bg-primary-600 text-white"
                  : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
              }`}
            >
              Micro 1%
            </button>
            <button
              onClick={() => setRegime("micro_3")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                regime === "micro_3"
                  ? "bg-primary-600 text-white"
                  : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
              }`}
            >
              Micro 3%
            </button>
          </div>
        </div>

        {/* Input mode toggle */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Mod introducere venituri
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setInputMode("average")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                inputMode === "average"
                  ? "bg-primary-600 text-white"
                  : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
              }`}
            >
              Medie lunara
            </button>
            <button
              onClick={() => setInputMode("monthly")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                inputMode === "monthly"
                  ? "bg-primary-600 text-white"
                  : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
              }`}
            >
              Luna cu luna
            </button>
          </div>
        </div>

        {/* Revenue input */}
        {inputMode === "average" ? (
          <div>
            <label
              htmlFor="avgRevenue"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Venit mediu lunar (lei)
            </label>
            <input
              id="avgRevenue"
              type="number"
              min="0"
              step="500"
              value={averageRevenue}
              onChange={(e) => setAverageRevenue(e.target.value)}
              placeholder="ex: 15000"
              className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {MONTH_LABELS.map((month, i) => (
              <div key={month}>
                <label
                  htmlFor={`month-${i}`}
                  className="mb-1 block text-xs font-medium text-secondary-600"
                >
                  {month}
                </label>
                <input
                  id={`month-${i}`}
                  type="number"
                  min="0"
                  step="500"
                  value={monthlyRevenues[i]}
                  onChange={(e) => updateMonthlyRevenue(i, e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-secondary-300 px-2 py-2 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quarterly bar chart */}
      {totalRevenue > 0 && (
        <>
          <div className="rounded-xl border border-secondary-200 bg-background p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Obligatii trimestriale -- Impozit micro {taxRate}
            </h3>
            <div className="space-y-4">
              {quarterlyData.map((q) => (
                <div key={q.quarter}>
                  <div className="mb-1 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-foreground">
                        {q.quarter}
                      </span>
                      <span className="ml-2 text-xs text-secondary-400">
                        {q.months}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {formatLei(q.revenue)} lei
                    </span>
                  </div>

                  {/* Revenue bar */}
                  <div className="relative mb-1 h-8 w-full overflow-hidden rounded-lg bg-secondary-100">
                    <div
                      className="absolute inset-y-0 left-0 rounded-lg bg-primary-200 transition-all duration-500"
                      style={{
                        width: `${(q.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                    {/* Tax portion overlay */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-lg bg-error-400/70 transition-all duration-500"
                      style={{
                        width: `${(q.tax / maxRevenue) * 100}%`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                      <span className="text-xs font-medium text-foreground">
                        Impozit: {formatLei(q.tax)} lei
                      </span>
                      <span className="text-xs text-secondary-600">
                        Net: {formatLei(q.netAfterTax)} lei
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-secondary-500">
                    <span
                      className="cursor-help"
                      title={`Declaratia D100 si plata impozitului micro pentru ${q.quarter} se depun/platesc pana la ${q.deadline}.`}
                    >
                      D100: {q.deadline}
                    </span>
                    <span
                      className="cursor-help"
                      title={`Total impozit platit de la inceputul anului pana la sfarsitul ${q.quarter}.`}
                    >
                      Total taxe YTD: {formatLei(q.cumulativeTax)} lei
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-4 border-t border-secondary-200 pt-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-primary-200" />
                <span className="text-xs text-secondary-500">Venit trimestrial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-error-400/70" />
                <span className="text-xs text-secondary-500">Impozit micro ({taxRate})</span>
              </div>
            </div>
          </div>

          {/* Summary card */}
          <div className="rounded-xl border border-accent-200 bg-accent-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-accent-800">
              Sumar anual {SRL_CONSTANTS_2026.FISCAL_YEAR}
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <SummaryItem
                label="Venit total anual"
                value={`${formatLei(totalRevenue)} lei`}
              />
              <SummaryItem
                label={`Impozit micro total (${taxRate})`}
                value={`${formatLei(totalTax)} lei`}
              />
              <SummaryItem
                label="Recomandare: pune deoparte lunar"
                value={`${formatLei(Math.round(totalTax / 12))} lei/luna`}
                highlight
              />
            </div>
          </div>
        </>
      )}

      {/* Empty state */}
      {totalRevenue === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-secondary-200 bg-background px-6 py-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-3 h-8 w-8 text-secondary-300"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <p className="text-sm text-secondary-500">
            Introdu veniturile lunare sau media lunara pentru a vedea cash flow-ul fiscal.
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-accent-600">{label}</p>
      <p
        className={`mt-0.5 text-sm font-semibold ${
          highlight ? "text-accent-800" : "text-accent-700"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
