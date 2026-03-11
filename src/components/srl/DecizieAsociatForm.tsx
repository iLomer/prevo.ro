"use client";

export interface DecizieFormData {
  companyName: string;
  cui: string;
  jNumber: string;
  associateName: string;
  associateCNP: string;
  grossDividend: string;
  distributionDate: string;
  fiscalYear: string;
  decisionNumber: string;
}

interface DecizieAsociatFormProps {
  formData: DecizieFormData;
  onChange: (data: DecizieFormData) => void;
}

export function DecizieAsociatForm({ formData, onChange }: DecizieAsociatFormProps) {
  function updateField(field: keyof DecizieFormData, value: string) {
    onChange({ ...formData, [field]: value });
  }

  return (
    <div className="rounded-xl border border-secondary-200 bg-background p-4">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        Datele societatii si asociatului
      </h3>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="companyName"
            label="Denumirea societatii"
            value={formData.companyName}
            onChange={(v) => updateField("companyName", v)}
            placeholder="ex: EXEMPLU CONSULTING SRL"
          />
          <FormField
            id="cui"
            label="CUI (Cod Unic de Inregistrare)"
            value={formData.cui}
            onChange={(v) => updateField("cui", v)}
            placeholder="ex: RO12345678"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="jNumber"
            label="Nr. inregistrare Reg. Comertului"
            value={formData.jNumber}
            onChange={(v) => updateField("jNumber", v)}
            placeholder="ex: J40/1234/2020"
          />
          <FormField
            id="decisionNumber"
            label="Numarul deciziei"
            value={formData.decisionNumber}
            onChange={(v) => updateField("decisionNumber", v)}
            placeholder="ex: 1"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="associateName"
            label="Nume si prenume asociat"
            value={formData.associateName}
            onChange={(v) => updateField("associateName", v)}
            placeholder="ex: Popescu Ion"
          />
          <FormField
            id="associateCNP"
            label="CNP asociat"
            value={formData.associateCNP}
            onChange={(v) => updateField("associateCNP", v)}
            placeholder="ex: 1234567890123"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            id="grossDividend"
            label="Dividend brut (lei)"
            value={formData.grossDividend}
            onChange={(v) => updateField("grossDividend", v)}
            placeholder="ex: 50000"
            type="number"
          />
          <FormField
            id="distributionDate"
            label="Data distribuirii"
            value={formData.distributionDate}
            onChange={(v) => updateField("distributionDate", v)}
            type="date"
          />
          <FormField
            id="fiscalYear"
            label="Anul fiscal (profitul)"
            value={formData.fiscalYear}
            onChange={(v) => updateField("fiscalYear", v)}
            placeholder="ex: 2025"
            type="number"
          />
        </div>
      </div>
    </div>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      />
    </div>
  );
}
