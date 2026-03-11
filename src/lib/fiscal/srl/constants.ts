/**
 * SRL fiscal constants for 2026.
 *
 * Sources:
 * - OUG 89/2025: micro 1% flat for all (eliminated 3%), revenue ceiling 100,000 EUR
 * - Dividend tax: 16% from 01.01.2026 (was 10% in 2025, 8% in 2023-2024, 5% before 2023)
 * - CASS on dividends: art. 174 Cod Fiscal, 10% tiered at 6x/12x/24x minimum salary
 * - Minimum gross salary 2026: 4,050 lei/month (Jan-Jun), 4,325 lei/month (Jul-Dec)
 *   Thresholds use the Jan 1 value (4,050 lei)
 */

import type { SRLFiscalConstants } from "./types";

export const SRL_CONSTANTS_2026: SRLFiscalConstants = {
  /** Micro tax rate: 1% for all (OUG 89/2025 eliminated 3%) */
  MICRO_TAX_RATE: 0.01,

  /** Dividend tax: 16% from 2026 */
  DIVIDEND_TAX_RATE: 0.16,

  /** CASS on dividends: 10% */
  CASS_DIVIDEND_RATE: 0.10,

  /** Minimum gross salary per month: 4,050 lei (Jan-Jun 2026) */
  MINIMUM_GROSS_SALARY_MONTHLY: 4050,

  /** CASS threshold: 6 x 4,050 = 24,300 lei (below: no CASS) */
  CASS_DIVIDEND_THRESHOLD_6X: 4050 * 6,

  /** CASS threshold: 12 x 4,050 = 48,600 lei */
  CASS_DIVIDEND_THRESHOLD_12X: 4050 * 12,

  /** CASS cap: 24 x 4,050 = 97,200 lei (max base for CASS on dividends) */
  CASS_DIVIDEND_CAP_24X: 4050 * 24,

  /** Revenue ceiling for micro status: 100,000 EUR (down from 250,000 in 2025) */
  MICRO_REVENUE_CEILING_EUR: 100_000,

  /** Fiscal year */
  FISCAL_YEAR: 2026,
} as const;
