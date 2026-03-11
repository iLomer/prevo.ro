"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { calculateDividendNet, calculateCASSDividend } from "@/lib/fiscal/srl";
import type { DividendBreakdown, CASSDividendResult } from "@/lib/fiscal/srl";

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function DividendSimulator() {
  const [grossDividend, setGrossDividend] = useState<string>("");
  const [annualTotal, setAnnualTotal] = useState<string>("");
  const [breakdown, setBreakdown] = useState<DividendBreakdown | null>(null);
  const [cassResult, setCassResult] = useState<CASSDividendResult | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recalculate = useCallback((grossStr: string, totalStr: string) => {
    const gross = parseFloat(grossStr) || 0;
    const total = parseFloat(totalStr) || gross;

    if (gross <= 0) {
      setBreakdown(null);
      setCassResult(null);
      return;
    }

    const effectiveTotal = Math.max(total, gross);
    const result = calculateDividendNet(gross, effectiveTotal);
    const cass = calculateCASSDividend(effectiveTotal);

    setBreakdown(result);
    setCassResult(cass);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      recalculate(grossDividend, annualTotal);
    }, 300);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [grossDividend, annualTotal, recalculate]);

  return (
    <div className="space-y-6">
      {/* Educational callout */}
      <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
        <p className="text-sm leading-relaxed text-primary-700">
          Dividendele se pot distribui doar din profitul net contabil.
          Impozitul pe dividende (5%) se retine la sursa de catre SRL.
        </p>
      </div>

      {/* Input form */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Datele dividendului
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="grossDividend"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Dividend brut de distribuit (lei)
            </label>
            <input
              id="grossDividend"
              type="number"
              min="0"
              step="100"
              value={grossDividend}
              onChange={(e) => setGrossDividend(e.target.value)}
              placeholder="ex: 50000"
              className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <p className="mt-1 text-xs text-secondary-400">
              Suma bruta pe care doriti sa o distribuiti ca dividend
            </p>
          </div>

          <div>
            <label
              htmlFor="annualTotal"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Total dividende distribuite in acest an (lei)
            </label>
            <input
              id="annualTotal"
              type="number"
              min="0"
              step="100"
              value={annualTotal}
              onChange={(e) => setAnnualTotal(e.target.value)}
              placeholder="ex: 100000"
              className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <p className="mt-1 text-xs text-secondary-400">
              Inclusiv dividendul de mai sus. Folosit pentru calculul CASS.
              Daca e primul dividend din an, lasati gol.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      {breakdown && (
        <div className="space-y-4">
          {/* Breakdown card */}
          <div className="rounded-xl border border-secondary-200 bg-background p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Defalcarea dividendului
            </h3>
            <div className="space-y-3">
              <ResultRow
                label="Dividend brut"
                value={`${formatLei(breakdown.grossDividend)} lei`}
                variant="neutral"
              />
              <ResultRow
                label={`Impozit dividende (${(breakdown.dividendTaxRate * 100).toFixed(0)}%)`}
                value={`-${formatLei(breakdown.dividendTax)} lei`}
                variant="deduction"
              />
              {breakdown.cassApplies && (
                <ResultRow
                  label="CASS dividende (10%)"
                  value={`-${formatLei(breakdown.cassAmount)} lei`}
                  variant="deduction"
                />
              )}
              <div className="border-t border-secondary-200 pt-3">
                <ResultRow
                  label="Total retineri"
                  value={`-${formatLei(breakdown.totalDeductions)} lei`}
                  variant="deduction"
                />
              </div>
              <div className="border-t border-secondary-200 pt-3">
                <ResultRow
                  label="Net in mana"
                  value={`${formatLei(breakdown.netDividend)} lei`}
                  variant="highlight"
                />
              </div>
              <ResultRow
                label="Rata efectiva de impozitare"
                value={`${breakdown.effectiveTaxRate.toFixed(1)}%`}
                variant="neutral"
              />
            </div>
          </div>

          {/* CASS warning */}
          {cassResult && cassResult.warningMessage && (
            <div
              className={`rounded-xl border p-4 ${
                cassResult.cassApplies
                  ? "border-error-300 bg-error-50"
                  : "border-warning-300 bg-warning-50"
              }`}
            >
              <p
                className={`text-sm leading-relaxed ${
                  cassResult.cassApplies ? "text-error-700" : "text-warning-700"
                }`}
              >
                {cassResult.warningMessage}
              </p>
            </div>
          )}

          {/* Payment timeline */}
          <div className="rounded-xl border border-secondary-200 bg-background p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Calendar de plata
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <span className="text-xs font-bold text-primary-700">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Impozit dividende (5%) -- retinut la sursa
                  </p>
                  <p className="text-xs text-secondary-500">
                    Se declara prin D100 si se plateste pana pe 25 ale lunii urmatoare
                    trimestrului in care s-a distribuit dividendul.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <span className="text-xs font-bold text-primary-700">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    CASS dividende (10%) -- daca se aplica
                  </p>
                  <p className="text-xs text-secondary-500">
                    Se declara de catre asociat prin Declaratia Unica (D212),
                    pana pe 25 mai a anului urmator. Se plateste anual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!breakdown && (
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
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <p className="text-sm text-secondary-500">
            Introdu suma bruta a dividendului pentru a vedea calculul net.
          </p>
        </div>
      )}
    </div>
  );
}

function ResultRow({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: "neutral" | "deduction" | "highlight";
}) {
  const valueClasses = {
    neutral: "text-foreground",
    deduction: "text-error-600",
    highlight: "text-accent-700 font-bold text-base",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-secondary-600">{label}</span>
      <span className={`text-sm font-medium ${valueClasses[variant]}`}>
        {value}
      </span>
    </div>
  );
}
