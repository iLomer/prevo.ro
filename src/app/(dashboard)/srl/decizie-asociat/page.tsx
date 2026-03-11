"use client";

import { useState } from "react";
import { DecizieAsociatForm } from "@/components/srl/DecizieAsociatForm";
import { DecizieAsociatPreview } from "@/components/srl/DecizieAsociatPreview";
import type { DecizieFormData } from "@/components/srl/DecizieAsociatForm";

const INITIAL_FORM_DATA: DecizieFormData = {
  companyName: "",
  cui: "",
  jNumber: "",
  associateName: "",
  associateCNP: "",
  grossDividend: "",
  distributionDate: "",
  fiscalYear: "2025",
  decisionNumber: "1",
};

export default function DecizieAsociatPage() {
  const [formData, setFormData] = useState<DecizieFormData>(INITIAL_FORM_DATA);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Decizia Asociatului Unic
        </h1>
        <p className="mt-1 text-sm text-secondary-500">
          Genereaza automat decizia pentru distribuirea dividendelor. Completeaza
          datele si exporta documentul.
        </p>
      </div>

      {/* Educational callout */}
      <div className="mb-6 rounded-xl border border-primary-200 bg-primary-50 p-4">
        <p className="text-sm leading-relaxed text-primary-700">
          Decizia Asociatului Unic este documentul legal obligatoriu inainte de
          distribuirea dividendelor. Aceasta confirma aprobarea distribuirii din
          profitul net contabil al societatii.
        </p>
      </div>

      <div className="space-y-6">
        <DecizieAsociatForm formData={formData} onChange={setFormData} />
        <DecizieAsociatPreview formData={formData} />
      </div>
    </div>
  );
}
