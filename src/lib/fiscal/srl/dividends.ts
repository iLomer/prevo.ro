/**
 * SRL dividend net calculation.
 * Pure function -- no side effects, no Supabase calls.
 *
 * Dividend distribution flow (2026):
 * 1. SRL declares gross dividend from net accounting profit
 * 2. Dividend tax (16%) is withheld at source by the SRL
 * 3. If annual dividends > 6x minimum wages, associate owes CASS (10%) via D212
 * 4. Net in hand = gross - dividend tax - CASS (if applicable)
 *
 * Dividend tax rate history:
 * - Before 2023: 5%
 * - 2023-2024: 8%
 * - 2025: 10%
 * - From 2026: 16%
 */

import type { DividendBreakdown } from "./types";
import { SRL_CONSTANTS_2026 } from "./constants";
import { calculateCASSDividend } from "./cass-dividends";

/** Round a number to 2 decimal places */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculate the net dividend after all taxes (dividend tax + CASS if applicable).
 *
 * @param grossDividend - The gross dividend amount being distributed now
 * @param annualDividendsTotal - Total annual dividends INCLUDING this one (for CASS threshold check)
 * @returns DividendBreakdown with all tax components and net amount
 */
export function calculateDividendNet(
  grossDividend: number,
  annualDividendsTotal: number
): DividendBreakdown {
  const { DIVIDEND_TAX_RATE } = SRL_CONSTANTS_2026;

  // Dividend tax: 16% withheld at source
  const dividendTax = round2(grossDividend * DIVIDEND_TAX_RATE);

  // CASS on dividends: check threshold against annual total
  const cassResult = calculateCASSDividend(annualDividendsTotal);

  const cassApplies = cassResult.cassApplies;

  // Calculate CASS attributable to this specific dividend
  let cassAmount = 0;
  if (cassApplies && annualDividendsTotal > 0) {
    // Proportional CASS: this dividend's share of total CASS obligation
    const proportion = grossDividend / annualDividendsTotal;
    cassAmount = round2(cassResult.cassAmount * proportion);
  }

  const totalDeductions = round2(dividendTax + cassAmount);
  const netDividend = round2(grossDividend - totalDeductions);
  const effectiveTaxRate = grossDividend > 0
    ? round2((totalDeductions / grossDividend) * 100)
    : 0;

  return {
    grossDividend: round2(grossDividend),
    dividendTax,
    dividendTaxRate: DIVIDEND_TAX_RATE,
    cassApplies,
    cassAmount,
    totalDeductions,
    netDividend,
    effectiveTaxRate,
    annualDividendsTotal: round2(annualDividendsTotal),
  };
}
