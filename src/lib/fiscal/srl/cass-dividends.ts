/**
 * CASS on dividends calculation for SRL associates.
 * Pure function -- no side effects, no Supabase calls.
 *
 * Rules (2026):
 * - If annual dividends <= 6x minimum gross salary (24,300 lei): no CASS
 * - If annual dividends > 6x minimum gross salary: CASS = 10% of base
 * - CASS base is capped at 60x minimum gross salary (243,000 lei)
 * - CASS is declared via D212, paid annually
 */

import type { CASSDividendResult } from "./types";
import { SRL_CONSTANTS_2026 } from "./constants";

/** Round a number to 2 decimal places */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculate CASS obligation on dividends for an SRL associate.
 *
 * @param annualDividendsTotal - Total annual dividends (gross) distributed to the associate
 * @returns CASSDividendResult with CASS amount, threshold info, and Romanian warning
 */
export function calculateCASSDividend(
  annualDividendsTotal: number
): CASSDividendResult {
  const {
    CASS_DIVIDEND_RATE,
    CASS_DIVIDEND_THRESHOLD_6X,
    CASS_DIVIDEND_CAP_60X,
  } = SRL_CONSTANTS_2026;

  const cassApplies = annualDividendsTotal > CASS_DIVIDEND_THRESHOLD_6X;
  const remainingBeforeThreshold = cassApplies
    ? 0
    : round2(CASS_DIVIDEND_THRESHOLD_6X - annualDividendsTotal);

  const thresholdPercentage = CASS_DIVIDEND_THRESHOLD_6X > 0
    ? round2((annualDividendsTotal / CASS_DIVIDEND_THRESHOLD_6X) * 100)
    : 0;

  let cassBase = 0;
  let cassAmount = 0;

  if (cassApplies) {
    // CASS base is the dividend amount, capped at 60x minimum wages
    cassBase = Math.min(annualDividendsTotal, CASS_DIVIDEND_CAP_60X);
    cassAmount = round2(cassBase * CASS_DIVIDEND_RATE);
  }

  let warningMessage: string | null = null;

  if (cassApplies) {
    if (annualDividendsTotal > CASS_DIVIDEND_CAP_60X) {
      warningMessage =
        `Ati depasit pragul de 6 salarii minime (${formatLei(CASS_DIVIDEND_THRESHOLD_6X)}). ` +
        `CASS de 10% se aplica asupra bazei de calcul, plafonata la ${formatLei(CASS_DIVIDEND_CAP_60X)} ` +
        `(60 salarii minime brute). CASS datorat: ${formatLei(cassAmount)}.`;
    } else {
      warningMessage =
        `Ati depasit pragul de 6 salarii minime (${formatLei(CASS_DIVIDEND_THRESHOLD_6X)}). ` +
        `CASS de 10% se aplica asupra bazei de ${formatLei(cassBase)}. ` +
        `CASS datorat: ${formatLei(cassAmount)}.`;
    }
  } else if (thresholdPercentage >= 80) {
    warningMessage =
      `Atentie: sunteti la ${thresholdPercentage.toFixed(0)}% din pragul de 6 salarii minime ` +
      `(${formatLei(CASS_DIVIDEND_THRESHOLD_6X)}). Mai aveti ${formatLei(remainingBeforeThreshold)} ` +
      `pana la declansarea CASS de 10%.`;
  }

  return {
    annualDividends: round2(annualDividendsTotal),
    cassApplies,
    cassAmount,
    cassRate: CASS_DIVIDEND_RATE,
    cassBase,
    threshold: CASS_DIVIDEND_THRESHOLD_6X,
    remainingBeforeThreshold,
    thresholdPercentage,
    cassCap: CASS_DIVIDEND_CAP_60X,
    warningMessage,
  };
}

/** Format a number as lei for Romanian display */
function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " lei";
}
