import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "./DashboardShell";
import type { FiscalRegime, EntityType } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  // Check if user has completed onboarding
  const { data: profile, error } = await supabase
    .from("fiscal_profiles")
    .select("id, entity_type, regime, tva_status, caen_code")
    .eq("id", user.id)
    .single();

  if (!profile || error) {
    redirect("/onboarding");
  }

  return (
    <DashboardShell
      entityType={profile.entity_type as EntityType}
      regime={profile.regime as FiscalRegime}
    >
      {children}
    </DashboardShell>
  );
}
