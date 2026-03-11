interface StepTVAProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export function StepTVA({ value, onChange }: StepTVAProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-secondary-900 mb-2">
        Esti platitor de TVA?
      </h2>
      <p className="text-secondary-500 mb-6 text-sm">
        Daca ai depasit plafonul de 300.000 lei sau te-ai inregistrat voluntar
        in scopuri de TVA, selecteaza &quot;Platitor TVA&quot;.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-xl border p-5 text-left transition-all ${
            value === false
              ? "border-primary-400 bg-primary-50 shadow-sm"
              : "border-secondary-200 bg-white hover:border-secondary-300 hover:shadow-sm"
          }`}
        >
          <span
            className={`text-lg font-bold ${
              value === false ? "text-primary-700" : "text-secondary-900"
            }`}
          >
            Neplatitor TVA
          </span>
          <p className="mt-2 text-sm text-secondary-500">
            Nu esti inregistrat in scopuri de TVA. Majoritatea PFA-urilor si
            SRL-urilor mici sunt in aceasta categorie.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-xl border p-5 text-left transition-all ${
            value === true
              ? "border-primary-400 bg-primary-50 shadow-sm"
              : "border-secondary-200 bg-white hover:border-secondary-300 hover:shadow-sm"
          }`}
        >
          <span
            className={`text-lg font-bold ${
              value === true ? "text-primary-700" : "text-secondary-900"
            }`}
          >
            Platitor TVA
          </span>
          <p className="mt-2 text-sm text-secondary-500">
            Esti inregistrat in scopuri de TVA si depui deconturi de TVA
            periodic.
          </p>
        </button>
      </div>
    </div>
  );
}
