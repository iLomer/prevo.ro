/**
 * SRL fiscal constants for 2026.
 * Separate from PFA constants -- SRL uses different minimum salary base (4,050 lei/month for 2026).
 *
 * Sources:
 * - Micro tax: OUG 115/2023, art. 51 Cod Fiscal
 * - Dividend tax: art. 97 Cod Fiscal (5% from 2023)
 * - CASS on dividends: art. 174 Cod Fiscal, 10% if > 6x minimum gross salary
 * - Minimum gross salary 2026: 4,050 lei/month (HG)
 */

import type { SRLFiscalConstants } from "./types";

export const SRL_CONSTANTS_2026: SRLFiscalConstants = {
  /** Micro 1% rate */
  MICRO_TAX_RATE_1: 0.01,

  /** Micro 3% rate */
  MICRO_TAX_RATE_3: 0.03,

  /** Dividend tax: 5% */
  DIVIDEND_TAX_RATE: 0.05,

  /** CASS on dividends: 10% */
  CASS_DIVIDEND_RATE: 0.10,

  /** Minimum gross salary per month: 4,050 lei */
  MINIMUM_GROSS_SALARY_MONTHLY: 4050,

  /** CASS threshold: 6 x 4,050 = 24,300 lei */
  CASS_DIVIDEND_THRESHOLD_6X: 4050 * 6,

  /** CASS cap base: 60 x 4,050 = 243,000 lei */
  CASS_DIVIDEND_CAP_60X: 4050 * 60,

  /** Fiscal year */
  FISCAL_YEAR: 2026,
} as const;
