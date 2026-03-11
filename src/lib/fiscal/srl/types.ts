/**
 * SRL-specific fiscal types for Fiskio.
 * Used by all E7 SRL features: dividend simulator, CASS estimator, cash flow, D100 calendar.
 */

import type { FiscalRegime } from "@/types";

/** Micro tax regime types (subset of FiscalRegime) */
export type SRLMicroRegime = Extract<FiscalRegime, "micro_1" | "micro_3">;

/** Breakdown of SRL micro tax calculation */
export interface SRLMicroTaxBreakdown {
  /** Total annual revenue (cifra de afaceri) */
  annualRevenue: number;
  /** Micro tax regime used */
  regime: SRLMicroRegime;
  /** Tax rate applied (0.01 or 0.03) */
  taxRate: number;
  /** Annual micro tax amount */
  annualTax: number;
  /** Quarterly micro tax amounts (Q1-Q4) */
  quarterlyTax: number;
  /** Monthly set-aside recommendation */
  monthlySetAside: number;
  /** Effective tax rate as percentage */
  effectiveTaxRate: number;
}

/** Breakdown of dividend net calculation after all taxes */
export interface DividendBreakdown {
  /** Gross dividend amount declared */
  grossDividend: number;
  /** Dividend tax amount (5%) */
  dividendTax: number;
  /** Dividend tax rate applied */
  dividendTaxRate: number;
  /** Whether CASS applies to this dividend */
  cassApplies: boolean;
  /** CASS amount on dividends (10% if applicable) */
  cassAmount: number;
  /** Total deductions (dividend tax + CASS) */
  totalDeductions: number;
  /** Net amount in hand after all taxes */
  netDividend: number;
  /** Effective tax rate as percentage (total deductions / gross * 100) */
  effectiveTaxRate: number;
  /** Running total of dividends this year (including this one) */
  annualDividendsTotal: number;
}

/** Result of CASS dividend threshold calculation */
export interface CASSDividendResult {
  /** Total annual dividends used for calculation */
  annualDividends: number;
  /** Whether CASS obligation applies */
  cassApplies: boolean;
  /** CASS amount to pay (0 if below threshold) */
  cassAmount: number;
  /** The CASS rate applied (10%) */
  cassRate: number;
  /** The base used for CASS calculation (capped at 60x minimum wages) */
  cassBase: number;
  /** The 6x minimum wage threshold */
  threshold: number;
  /** Amount remaining before crossing the threshold (0 if already over) */
  remainingBeforeThreshold: number;
  /** Percentage of threshold used (0-100+) */
  thresholdPercentage: number;
  /** The 60x minimum wage cap for CASS base */
  cassCap: number;
  /** Warning message in Romanian (null if no warning) */
  warningMessage: string | null;
}

/** SRL fiscal constants for a given year */
export interface SRLFiscalConstants {
  /** Micro tax rate for 1% regime */
  MICRO_TAX_RATE_1: number;
  /** Micro tax rate for 3% regime */
  MICRO_TAX_RATE_3: number;
  /** Dividend tax rate */
  DIVIDEND_TAX_RATE: number;
  /** CASS rate on dividends */
  CASS_DIVIDEND_RATE: number;
  /** Minimum gross salary per month (lei) */
  MINIMUM_GROSS_SALARY_MONTHLY: number;
  /** CASS threshold: 6x minimum gross salary (annual) */
  CASS_DIVIDEND_THRESHOLD_6X: number;
  /** CASS cap: 60x minimum gross salary (annual) */
  CASS_DIVIDEND_CAP_60X: number;
  /** Fiscal year */
  FISCAL_YEAR: number;
}
