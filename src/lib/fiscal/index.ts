/**
 * Barrel export for fiscal logic library.
 * Single import point for all PFA fiscal calculations, deadlines, and reference data.
 */

// Types
export type {
  TaxBreakdown,
  FiscalDeadline,
  DeadlineFilter,
  NormaDeVenitEntry,
} from "./types";

export { FISCAL_CONSTANTS_2026 } from "./types";

// Tax calculations
export {
  calculateCAS,
  calculateCASS,
  calculateIncomeTax,
  calculateTotalTax,
  getTaxableBase,
} from "./pfa-taxes";

// Deadlines
export {
  getAllPFADeadlines,
  filterDeadlines,
  getUpcomingDeadlines,
} from "./pfa-deadlines";

// Norma de venit
export {
  NORMA_DE_VENIT_VALUES,
  getNormaDeVenit,
  getNormaDeVenitEntry,
  getAllNormaDeVenitEntries,
} from "./norma-venit";

// SRL fiscal logic
export {
  // Types
  type SRLMicroRegime,
  type SRLMicroTaxBreakdown,
  type DividendBreakdown,
  type CASSDividendResult,
  type SRLFiscalConstants,
  // Constants
  SRL_CONSTANTS_2026,
  // Micro tax
  calculateMicroTax,
  calculateQuarterlyMicroTax,
  // Dividends
  calculateDividendNet,
  // CASS dividends
  calculateCASSDividend,
  // SRL deadlines
  type SRLDeadlineWithAmount,
  getAllSRLDeadlines,
  getSRLDeadlinesWithAmounts,
} from "./srl";
