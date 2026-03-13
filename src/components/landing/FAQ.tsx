"use client";

import { useState } from "react";
import { FISCAL_CONSTANTS_2026 } from "@/lib/fiscal/types";

const { FISCAL_YEAR, CAS_RATE, CASS_RATE, INCOME_TAX_RATE, CASS_THRESHOLD_6X, CAS_THRESHOLD_12X } =
  FISCAL_CONSTANTS_2026;

const faqs = [
  {
    question: "Ce taxe platesc ca PFA?",
    answer: `Ca PFA platesti trei contributii: CAS (pensie) ${CAS_RATE * 100}%, CASS (sanatate) ${CASS_RATE * 100}% si impozit pe venit ${INCOME_TAX_RATE * 100}%. CAS se datoreaza doar daca venitul net depaseste ${CAS_THRESHOLD_12X.toLocaleString("ro-RO")} lei/an, iar CASS are un minim de ${CASS_RATE * 100}% din ${CASS_THRESHOLD_6X.toLocaleString("ro-RO")} lei chiar daca castigi mai putin. Prevo iti calculeaza totul automat in estimator.`,
  },
  {
    question: "Cand se depune Declaratia Unica (D212)?",
    answer: `Declaratia Unica se depune pana pe 25 mai in fiecare an. Daca depui si platesti pana pe 15 aprilie, beneficiezi de o reducere de 3% la impozitul pe venit. Prevo iti arata exact cand si ce ai de platit in calendarul fiscal.`,
  },
  {
    question: "Care e diferenta intre norma de venit si sistem real?",
    answer: `La norma de venit, taxele se calculeaza pe un venit fix stabilit de ANAF pentru codul tau CAEN, indiferent cat castigi de fapt. La sistem real, platesti taxe pe venitul real minus cheltuielile deductibile. Norma e mai simpla, sistemul real poate fi mai avantajos daca ai cheltuieli mari. Prevo iti compara ambele variante ca sa vezi care e mai buna pentru tine.`,
  },
  {
    question: "Am nevoie de contabil pentru PFA?",
    answer: `Nu e obligatoriu. Ca PFA pe norma de venit, poti face totul singur: o singura declaratie pe an (D212) si plata taxelor. Pe sistem real ai nevoie de registrul de incasari si plati, dar tot poti gestiona singur daca intelegi ce ai de facut. Prevo te ghideaza pas cu pas prin fiecare obligatie fiscala.`,
  },
  {
    question: "Cat platesc CAS si CASS ca PFA?",
    answer: `CAS (${CAS_RATE * 100}%) se plateste doar daca venitul net depaseste ${CAS_THRESHOLD_12X.toLocaleString("ro-RO")} lei/an. CASS (${CASS_RATE * 100}%) se plateste intotdeauna, cu un minim de ${Math.round(CASS_THRESHOLD_6X * CASS_RATE).toLocaleString("ro-RO")} lei/an. Sumele exacte depind de venitul tau. Introdu cifrele in estimatorul Prevo si vezi cat ai de platit.`,
  },
  {
    question: "Ce se intampla daca depasesc plafonul de TVA?",
    answer: `Daca cifra de afaceri depaseste ${FISCAL_CONSTANTS_2026.TVA_THRESHOLD.toLocaleString("ro-RO")} lei, ai obligatia sa te inregistrezi in scopuri de TVA in 10 zile. Prevo iti monitorizeaza veniturile si te alerteaza cand te apropii de prag.`,
  },
  {
    question: "PFA sau SRL - ce e mai avantajos?",
    answer: `Depinde de cat castigi si ce faci cu banii. PFA are taxe mai simple si banii sunt ai tai direct. SRL-ul are impozit pe profit de 1% (micro), dar dividendele sunt taxate suplimentar. La venituri mici, PFA e mai simplu. La venituri mari, SRL-ul poate fi mai eficient fiscal. Prevo iti arata calculele pentru ambele variante.`,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-secondary-400">
            Intrebari frecvente
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl lg:text-5xl">
            Tot ce trebuie sa stii despre taxele tale
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-secondary-500">
            Raspunsuri clare la cele mai comune intrebari fiscale pentru PFA si SRL.
            Fara jargon, fara complicatii.
          </p>
        </div>

        <div className="mt-16 divide-y divide-secondary-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span className="pr-4 text-base font-semibold text-secondary-900 sm:text-lg">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 text-secondary-400 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-[15px] leading-relaxed text-secondary-500">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-secondary-400">
          Cifrele reflecta legislatia fiscala {FISCAL_YEAR}. Prevo se actualizeaza automat la fiecare modificare legislativa.
        </p>
      </div>
    </section>
  );
}
