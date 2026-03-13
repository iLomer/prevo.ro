import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CalendarViewToggle } from "@/components/calendar";
import { filterDeadlines, filterDeadlinesGeneric, buildAnnualTimeline, calculateTotalTax } from "@/lib/fiscal";
import { getAllSRLDeadlines } from "@/lib/fiscal/srl/srl-deadlines";
import { getNormaDeVenitEntry } from "@/lib/fiscal/norma-venit";
import type { FiscalRegime, TVAStatus, EntityType } from "@/types";

export default async function CalendarPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  const { data: profile } = await supabase
    .from("fiscal_profiles")
    .select("entity_type, regime, tva_status, caen_code")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const entityType = profile.entity_type as EntityType;
  const regime = profile.regime as FiscalRegime;
  const tvaStatus: TVAStatus = profile.tva_status ? "platitor" : "neplatitor";

  // Build timeline data for the annual view
  const yearStart = new Date(2026, 0, 1);
  const yearEnd = new Date(2026, 11, 31);
  const dateFilter = { regime, tvaStatus, fromDate: yearStart, toDate: yearEnd };

  const allDeadlines = entityType === "srl"
    ? filterDeadlinesGeneric(getAllSRLDeadlines(), dateFilter)
    : filterDeadlines(dateFilter);

  // Calculate tax breakdown for PFA payment amounts
  const isPFA = entityType === "pfa";
  const normaEntry = isPFA && regime === "norma_venit" ? getNormaDeVenitEntry(profile.caen_code) : null;
  const incomeBase = normaEntry ? normaEntry.normaValue : 0;
  const taxBreakdown = isPFA && incomeBase > 0 ? calculateTotalTax(incomeBase, regime, 0, profile.caen_code) : undefined;

  const timelineEntries = buildAnnualTimeline(allDeadlines, taxBreakdown);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Calendar fiscal 2026</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Toate obligatiile tale fiscale din 2026, personalizate pe regimul tau.
        </p>
      </div>

      <CalendarViewToggle
        regime={regime}
        tvaStatus={tvaStatus}
        entityType={entityType}
        timelineEntries={timelineEntries}
      />
    </div>
  );
}
