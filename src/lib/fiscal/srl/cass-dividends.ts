/**
 * CASS on dividends calculation for SRL associates.
 * Pure function -- no side effects, no Supabase calls.
 *
 * Rules (2026):
 * - If annual dividends < 6x minimum salary (24,300 lei): no CASS
 * - 6x to 12x (24,300 - 48,600 lei): CASS = 10% of 6x = 2,430 lei
 * - 12x to 24x (48,600 - 97,200 lei): CASS = 10% of 12x = 4,860 lei
 * - Above 24x (97,200 lei): CASS = 10% of 24x = 9,720 lei (cap)
 *
 * CASS is declared by the associate (persoana fizica) via D212, paid annually (May 25).
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
    CASS_DIVIDEND_THRESHOLD_12X,
    CASS_DIVIDEND_CAP_24X,
  } = SRL_CONSTANTS_2026;

  const cassApplies = annualDividendsTotal >= CASS_DIVIDEND_THRESHOLD_6X;
  const remainingBeforeThreshold = cassApplies
    ? 0
    : round2(CASS_DIVIDEND_THRESHOLD_6X - annualDividendsTotal);

  const thresholdPercentage = CASS_DIVIDEND_THRESHOLD_6X > 0
    ? round2((annualDividendsTotal / CASS_DIVIDEND_THRESHOLD_6X) * 100)
    : 0;

  let cassBase = 0;
  let cassAmount = 0;

  if (cassApplies) {
    // Tiered CASS base: 6x, 12x, or 24x
    if (annualDividendsTotal >= CASS_DIVIDEND_CAP_24X) {
      cassBase = CASS_DIVIDEND_CAP_24X;
    } else if (annualDividendsTotal >= CASS_DIVIDEND_THRESHOLD_12X) {
      cassBase = CASS_DIVIDEND_THRESHOLD_12X;
    } else {
      cassBase = CASS_DIVIDEND_THRESHOLD_6X;
    }
    cassAmount = round2(cassBase * CASS_DIVIDEND_RATE);
  }

  let warningMessage: string | null = null;

  if (cassApplies) {
    if (annualDividendsTotal >= CASS_DIVIDEND_CAP_24X) {
      warningMessage =
        `Ati depasit plafonul de 24 salarii minime (${formatLei(CASS_DIVIDEND_CAP_24X)}). ` +
        `CASS de 10% se calculeaza pe baza de ${formatLei(cassBase)}. ` +
        `CASS maxim datorat: ${formatLei(cassAmount)}.`;
    } else if (annualDividendsTotal >= CASS_DIVIDEND_THRESHOLD_12X) {
      warningMessage =
        `Dividendele depasesc 12 salarii minime (${formatLei(CASS_DIVIDEND_THRESHOLD_12X)}). ` +
        `CASS de 10% se calculeaza pe baza de ${formatLei(cassBase)}. ` +
        `CASS datorat: ${formatLei(cassAmount)}.`;
    } else {
      warningMessage =
        `Dividendele depasesc 6 salarii minime (${formatLei(CASS_DIVIDEND_THRESHOLD_6X)}). ` +
        `CASS de 10% se calculeaza pe baza de ${formatLei(cassBase)}. ` +
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
    threshold6x: CASS_DIVIDEND_THRESHOLD_6X,
    remainingBeforeThreshold,
    thresholdPercentage,
    cassCap: CASS_DIVIDEND_CAP_24X,
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
