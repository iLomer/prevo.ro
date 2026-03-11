import { SRLDashboardCards } from "@/components/srl/SRLDashboardCards";

export default function SRLDashboardPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Panou SRL</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Instrumentele tale fiscale pentru SRL micro-intreprindere
        </p>
      </div>

      {/* Educational intro */}
      <div className="mb-6 rounded-xl border border-primary-200 bg-primary-50 p-4">
        <h2 className="text-sm font-semibold text-primary-800">
          Ce gasesti aici
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-primary-700">
          Toate instrumentele de care ai nevoie ca asociat unic la un SRL micro-intreprindere:
          simulator de dividende cu calcul net, estimator CASS, generator de decizie asociat unic,
          vizualizare cash flow fiscal si calendar D100 trimestrial.
        </p>
      </div>

      <SRLDashboardCards />
    </div>
  );
}
