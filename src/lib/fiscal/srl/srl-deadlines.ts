/**
 * SRL fiscal deadlines for 2026.
 * Quarterly D100 deadlines and micro tax payment deadlines.
 *
 * Pure functions -- no side effects, no Supabase calls.
 *
 * D100 is due by the 25th of the month following the quarter end:
 * - Q1 (Jan-Mar): due April 25
 * - Q2 (Apr-Jun): due July 25
 * - Q3 (Jul-Sep): due October 25
 * - Q4 (Oct-Dec): due January 25 of the next year
 */

import type { FiscalDeadline } from "../types";
import type { SRLMicroRegime } from "./types";
import { SRL_CONSTANTS_2026 } from "./constants";
import { calculateQuarterlyMicroTax } from "./micro-tax";

const YEAR = SRL_CONSTANTS_2026.FISCAL_YEAR;

/** Extended deadline type that includes calculated tax amount */
export interface SRLDeadlineWithAmount extends FiscalDeadline {
  /** Calculated micro tax amount for this quarter (null if no revenue data) */
  taxAmount: number | null;
  /** Revenue for this quarter (null if no revenue data) */
  quarterRevenue: number | null;
  /** Quarter number (1-4) */
  quarter: number;
}

const QUARTER_LABELS = ["T1 (ianuarie - martie)", "T2 (aprilie - iunie)", "T3 (iulie - septembrie)", "T4 (octombrie - decembrie)"];

/**
 * Get all SRL fiscal deadlines for the current year.
 * Returns D100 declaration deadlines and micro tax payment deadlines.
 */
export function getAllSRLDeadlines(): FiscalDeadline[] {
  return [
    // D100 declarations -- quarterly
    {
      id: "srl-d100-q1",
      name: "Depunere D100 - Trimestrul 1",
      description:
        `Declaratia 100 privind impozitul pe veniturile microintreprinderilor pentru ${QUARTER_LABELS[0]}. ` +
        "Se depune electronic prin SPV (Spatiul Privat Virtual) de pe site-ul ANAF, sectiunea Declaratii electronice. " +
        "Include impozitul micro calculat la cifra de afaceri din trimestrul 1.",
      date: new Date(YEAR, 3, 25), // April 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1", "micro_3"],
      applicableTVAStatuses: ["neplatitor"],
      category: "declaratie",
    },
    {
      id: "srl-d100-q2",
      name: "Depunere D100 - Trimestrul 2",
      description:
        `Declaratia 100 privind impozitul pe veniturile microintreprinderilor pentru ${QUARTER_LABELS[1]}. ` +
        "Se depune electronic prin SPV (Spatiul Privat Virtual) de pe site-ul ANAF, sectiunea Declaratii electronice. " +
        "Include impozitul micro calculat la cifra de afaceri din trimestrul 2.",
      date: new Date(YEAR, 6, 25), // July 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1", "micro_3"],
      applicableTVAStatuses: ["neplatitor"],
      category: "declaratie",
    },
    {
      id: "srl-d100-q3",
      name: "Depunere D100 - Trimestrul 3",
      description:
        `Declaratia 100 privind impozitul pe veniturile microintreprinderilor pentru ${QUARTER_LABELS[2]}. ` +
        "Se depune electronic prin SPV (Spatiul Privat Virtual) de pe site-ul ANAF, sectiunea Declaratii electronice. " +
        "Include impozitul micro calculat la cifra de afaceri din trimestrul 3.",
      date: new Date(YEAR, 9, 25), // October 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1", "micro_3"],
      applicableTVAStatuses: ["neplatitor"],
      category: "declaratie",
    },
    {
      id: "srl-d100-q4",
      name: "Depunere D100 - Trimestrul 4",
      description:
        `Declaratia 100 privind impozitul pe veniturile microintreprinderilor pentru ${QUARTER_LABELS[3]}. ` +
        "Se depune electronic prin SPV (Spatiul Privat Virtual) de pe site-ul ANAF, sectiunea Declaratii electronice. " +
        "Include impozitul micro calculat la cifra de afaceri din trimestrul 4.",
      date: new Date(YEAR + 1, 0, 25), // January 25 next year
      recurrence: "quarterly",
      applicableRegimes: ["micro_1", "micro_3"],
      applicableTVAStatuses: ["neplatitor"],
      category: "declaratie",
    },

    // Micro tax payment deadlines -- same dates as D100
    {
      id: "srl-micro-tax-q1",
      name: "Plata impozit micro - Trimestrul 1",
      description:
        `Termenul limita pentru plata impozitului pe veniturile microintreprinderilor aferent ${QUARTER_LABELS[0]}. ` +
        "Plata se face in contul bugetar deschis la trezoreria de care apartine SRL-ul.",
      date: new Date(YEAR, 3, 25), // April 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1", "micro_3"],
      applicableTVAStatuses: ["neplatitor"],
      category: "plata",
    },
    {
      id: "srl-micro-tax-q2",
      name: "Plata impozit micro - Trimestrul 2",
      description:
        `Termenul limita pentru plata impozitului pe veniturile microintreprinderilor aferent ${QUARTER_LABELS[1]}. ` +
        "Plata se face in contul bugetar deschis la trezoreria de care apartine SRL-ul.",
      date: new Date(YEAR, 6, 25), // July 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1", "micro_3"],
      applicableTVAStatuses: ["neplatitor"],
      category: "plata",
    },
    {
      id: "srl-micro-tax-q3",
      name: "Plata impozit micro - Trimestrul 3",
      description:
        `Termenul limita pentru plata impozitului pe veniturile microintreprinderilor aferent ${QUARTER_LABELS[2]}. ` +
        "Plata se face in contul bugetar deschis la trezoreria de care apartine SRL-ul.",
      date: new Date(YEAR, 9, 25), // October 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1", "micro_3"],
      applicableTVAStatuses: ["neplatitor"],
      category: "plata",
    },
    {
      id: "srl-micro-tax-q4",
      name: "Plata impozit micro - Trimestrul 4",
      description:
        `Termenul limita pentru plata impozitului pe veniturile microintreprinderilor aferent ${QUARTER_LABELS[3]}. ` +
        "Plata se face in contul bugetar deschis la trezoreria de care apartine SRL-ul.",
      date: new Date(YEAR + 1, 0, 25), // January 25 next year
      recurrence: "quarterly",
      applicableRegimes: ["micro_1", "micro_3"],
      applicableTVAStatuses: ["neplatitor"],
      category: "plata",
    },
  ];
}

/**
 * Get SRL D100 deadlines enriched with calculated tax amounts per quarter.
 *
 * @param quarterlyRevenues - Array of 4 numbers representing revenue for Q1-Q4.
 *   If fewer than 4 elements, remaining quarters default to 0.
 * @param regime - Micro regime: 'micro_1' or 'micro_3'
 * @returns Array of SRLDeadlineWithAmount (D100 declaration deadlines only, with tax amounts)
 */
export function getSRLDeadlinesWithAmounts(
  quarterlyRevenues: number[],
  regime: SRLMicroRegime
): SRLDeadlineWithAmount[] {
  const allDeadlines = getAllSRLDeadlines();

  // Filter to D100 declaration deadlines only (not payment deadlines)
  const d100Deadlines = allDeadlines.filter((d) => d.id.startsWith("srl-d100-"));

  return d100Deadlines.map((deadline, index) => {
    const quarter = index + 1;
    const revenue = quarterlyRevenues[index] ?? 0;
    const taxAmount = revenue > 0 ? calculateQuarterlyMicroTax(revenue, regime) : null;

    return {
      ...deadline,
      taxAmount,
      quarterRevenue: revenue > 0 ? revenue : null,
      quarter,
    };
  });
}
