import { DividendSimulator } from "@/components/srl/DividendSimulator";
import { isProUser } from "@/lib/stripe/subscription";
import { ProGate } from "@/components/ProGate";

export default async function SimulatorDividendePage() {
  if (!(await isProUser())) {
    return <ProGate feature="Simulator dividende" />;
  }
  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Simulator Dividende</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Calculeaza cat primesti net dupa impozitul pe dividende si CASS.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <DividendSimulator />
      </div>
    </div>
  );
}
