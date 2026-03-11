import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  const { data: profile, error } = await supabase
    .from("fiscal_profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (profile && !error) {
    redirect("/panou");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <OnboardingWizard />
    </main>
  );
}
