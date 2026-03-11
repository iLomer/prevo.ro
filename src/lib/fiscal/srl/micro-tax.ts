/**
 * SRL micro tax calculation.
 * Pure function -- no side effects, no Supabase calls.
 *
 * Micro tax is applied on revenue (cifra de afaceri), NOT on profit.
 * - Micro 1%: 1% of quarterly revenue
 * - Micro 3%: 3% of quarterly revenue
 *
 * D100 is due quarterly, by the 25th of the month following the quarter end.
 */

import type { SRLMicroRegime, SRLMicroTaxBreakdown } from "./types";
import { SRL_CONSTANTS_2026 } from "./constants";

/** Round a number to 2 decimal places */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculate SRL micro tax for a given annual revenue.
 *
 * @param revenue - Total annual revenue (cifra de afaceri) in lei
 * @param regime - Micro regime: 'micro_1' (1%) or 'micro_3' (3%)
 * @returns SRLMicroTaxBreakdown with annual and quarterly tax amounts
 */
export function calculateMicroTax(
  revenue: number,
  regime: SRLMicroRegime
): SRLMicroTaxBreakdown {
  const taxRate = regime === "micro_1"
    ? SRL_CONSTANTS_2026.MICRO_TAX_RATE_1
    : SRL_CONSTANTS_2026.MICRO_TAX_RATE_3;

  const annualTax = round2(revenue * taxRate);
  const quarterlyTax = round2(annualTax / 4);
  const monthlySetAside = round2(annualTax / 12);
  const effectiveTaxRate = revenue > 0 ? round2((annualTax / revenue) * 100) : 0;

  return {
    annualRevenue: round2(revenue),
    regime,
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
 * @param regime - Micro regime: 'micro_1' or 'micro_3'
 * @returns The micro tax amount due for that quarter
 */
export function calculateQuarterlyMicroTax(
  quarterRevenue: number,
  regime: SRLMicroRegime
): number {
  const taxRate = regime === "micro_1"
    ? SRL_CONSTANTS_2026.MICRO_TAX_RATE_1
    : SRL_CONSTANTS_2026.MICRO_TAX_RATE_3;

  return round2(quarterRevenue * taxRate);
}
