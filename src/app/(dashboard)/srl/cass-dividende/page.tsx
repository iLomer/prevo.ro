import { CASSDividendEstimator } from "@/components/srl/CASSDividendEstimator";

export default function CASSDividendePage() {
  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">CASS Dividende</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Verifica daca dividendele tale anuale depasesc pragul CASS si calculeaza obligatia.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <CASSDividendEstimator />
      </div>
    </div>
  );
}
