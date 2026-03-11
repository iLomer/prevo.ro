import type { EntityType } from "@/types";

interface StepEntityTypeProps {
  value: EntityType | null;
  onChange: (value: EntityType) => void;
}

const ENTITY_OPTIONS: {
  value: EntityType;
  label: string;
  description: string;
}[] = [
  {
    value: "pfa",
    label: "PFA",
    description:
      "Persoana Fizica Autorizata. Ideal pentru freelanceri, consultanti si prestatori de servicii independenti.",
  },
  {
    value: "srl",
    label: "SRL",
    description:
      "Societate cu Raspundere Limitata. Pentru microintreprinderi cu asociat unic, fara angajati.",
  },
];

export function StepEntityType({ value, onChange }: StepEntityTypeProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-secondary-900 mb-2">
        Ce tip de entitate ai?
      </h2>
      <p className="text-secondary-500 mb-6 text-sm">
        Selecteaza tipul de entitate pentru care vrei sa folosesti Prevo.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {ENTITY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl border p-5 text-left transition-all ${
              value === option.value
                ? "border-primary-400 bg-primary-50 shadow-sm"
                : "border-secondary-200 bg-white hover:border-secondary-300 hover:shadow-sm"
            }`}
          >
            <span
              className={`text-lg font-bold ${
                value === option.value
                  ? "text-primary-700"
                  : "text-secondary-900"
              }`}
            >
              {option.label}
            </span>
            <p className="mt-2 text-sm text-secondary-500">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
