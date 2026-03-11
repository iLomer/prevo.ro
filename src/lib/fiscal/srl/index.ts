/**
 * Barrel export for SRL fiscal logic.
 * Single import point for all SRL micro tax, dividend, and CASS calculations.
 */

// Types
export type {
  SRLMicroRegime,
  SRLMicroTaxBreakdown,
  DividendBreakdown,
  CASSDividendResult,
  SRLFiscalConstants,
} from "./types";

// Constants
export { SRL_CONSTANTS_2026 } from "./constants";

// Micro tax calculations
export { calculateMicroTax, calculateQuarterlyMicroTax } from "./micro-tax";

// Dividend calculations
export { calculateDividendNet } from "./dividends";

// CASS on dividends
export { calculateCASSDividend } from "./cass-dividends";

// SRL deadlines
export type { SRLDeadlineWithAmount } from "./srl-deadlines";
export { getAllSRLDeadlines, getSRLDeadlinesWithAmounts } from "./srl-deadlines";
