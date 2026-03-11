/**
 * SRL micro tax calculation.
 * Pure function -- no side effects, no Supabase calls.
 *
 * From 2026 (OUG 89/2025): all micro-enterprises pay 1% flat on revenue.
 * The old 3% rate was eliminated. Employee requirement removed.
 * Revenue ceiling: 100,000 EUR/year.
 *
 * D100 is due quarterly, by the 25th of the month following the quarter end.
 */

import type { SRLMicroTaxBreakdown } from "./types";
import { SRL_CONSTANTS_2026 } from "./constants";

/** Round a number to 2 decimal places */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculate SRL micro tax for a given annual revenue.
 *
 * @param revenue - Total annual revenue (cifra de afaceri) in lei
 * @returns SRLMicroTaxBreakdown with annual and quarterly tax amounts
 */
export function calculateMicroTax(
  revenue: number,
): SRLMicroTaxBreakdown {
  const taxRate = SRL_CONSTANTS_2026.MICRO_TAX_RATE;

  const annualTax = round2(revenue * taxRate);
  const quarterlyTax = round2(annualTax / 4);
  const monthlySetAside = round2(annualTax / 12);
  const effectiveTaxRate = revenue > 0 ? round2((annualTax / revenue) * 100) : 0;

  return {
    annualRevenue: round2(revenue),
    taxRate,
    annualTax,
    quarterlyTax,
    monthlySetAside,
    effectiveTaxRate,
  };
}

/**
 * Calculate micro tax for a specific quarter based on that quarter's revenue.
 *
 * @param quarterRevenue - Revenue for the specific quarter in lei
 * @returns The micro tax amount due for that quarter
 */
export function calculateQuarterlyMicroTax(
  quarterRevenue: number,
): number {
  return round2(quarterRevenue * SRL_CONSTANTS_2026.MICRO_TAX_RATE);
}
