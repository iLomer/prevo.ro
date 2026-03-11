"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { calculateTotalTax } from "@/lib/fiscal/pfa-taxes";
import type { TaxBreakdown } from "@/lib/fiscal/types";

interface SistemRealEstimatorCardProps {
  caenCode: string;
}

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function SistemRealEstimatorCard({ caenCode }: SistemRealEstimatorCardProps) {
  const [income, setIncome] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [breakdown, setBreakdown] = useState<TaxBreakdown | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recalculate = useCallback(
    (incomeStr: string, expensesStr: string) => {
      const incomeNum = parseFloat(incomeStr) || 0;
      const expensesNum = parseFloat(expensesStr) || 0;

      if (incomeNum <= 0) {
        setBreakdown(null);
        return;
      }

      const result = calculateTotalTax(incomeNum, "sistem_real", expensesNum, caenCode);
      setBreakdown(result);
    },
    [caenCode]
  );

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      recalculate(income, expenses);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [income, expenses, recalculate]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="sr-income" className="block text-xs font-medium text-secondary-500 mb-1">
            Venit anual estimat (lei)
          </label>
          <input
            id="sr-income"
            type="number"
            inputMode="numeric"
            placeholder="ex: 120.000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm text-foreground placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="sr-expenses" className="block text-xs font-medium text-secondary-500 mb-1">
            Cheltuieli deductibile (lei)
          </label>
          <input
            id="sr-expenses"
            type="number"
            inputMode="numeric"
            placeholder="ex: 30.000"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm text-foreground placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      {breakdown ? (
        <div className="mt-4">
          <p className="text-3xl font-bold tabular-nums text-foreground">
            {formatLei(breakdown.totalTax)} lei
          </p>
          <p className="mt-1 text-sm text-secondary-400">
            din venitul estimat de {formatLei(breakdown.grossIncome)} lei
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
              <p className="text-xs text-secondary-500">CAS 25%</p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                {formatLei(breakdown.cas)} lei
              </p>
            </div>
            <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
              <p className="text-xs text-secondary-500">CASS 10%</p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                {formatLei(breakdown.cass)} lei
              </p>
            </div>
            <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
              <p className="text-xs text-secondary-500">Impozit 10%</p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                {formatLei(breakdown.incomeTax)} lei
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg border border-accent-200 bg-accent-50 px-4 py-3">
            <span className="text-sm text-accent-700">Pune lunar deoparte</span>
            <span className="text-sm font-bold tabular-nums text-accent-800">
              {formatLei(breakdown.monthlySetAside)} lei/luna
            </span>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-secondary-400">
          Introdu venitul anual estimat pentru a vedea calculul taxelor.
        </p>
      )}
    </div>
  );
}
