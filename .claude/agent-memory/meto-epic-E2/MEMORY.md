# Epic Agent Memory -- Auth (E2)

*Read at session start. Update at session end. Keep it concise.*

---

## Current State
- **Status:** complete
- **Tasks completed:** 4/4
- **Checkpoint count:** 2

## Session Log

### Session 1 (2026-03-11)
Completed all 4 E2 tasks in dependency order:
- **slice-006**: Middleware (`src/middleware.ts`) with session refresh, route protection (dashboard -> /autentificare, auth -> /panou). Auth callback at `src/app/(auth)/auth/callback/route.ts`.
- **slice-007**: AuthForm component (sign-in/sign-up shared), SignOutButton. Romanian error messages mapped. Dashboard layout with sign-out button (cross-domain into E3, but E3 not started).
- **slice-008**: Supabase migration `20260311000001_create_fiscal_profiles.sql` with entity_type enum, regime CHECK constraint, RLS (SELECT/INSERT/UPDATE own row only, no DELETE). Updated `src/types/index.ts` with FiscalProfile interface. Aligned FiscalRegime values: norma_venit, sistem_real, micro_1, micro_3.
- **slice-009**: 4-step onboarding wizard (entity type, regime, TVA, CAEN). Server-side profile check in onboarding page and dashboard layout redirects users without profile to /onboarding.

### Key Decisions
- FiscalRegime type values changed from `pfa-norma`/`pfa-real`/`srl-micro-1`/`srl-micro-3` to `norma_venit`/`sistem_real`/`micro_1`/`micro_3` to match DB schema
- Dashboard layout created by E2 (E3 domain) since E3 not started and sign-out button needed there
- Profile check done in dashboard layout (server component) rather than middleware (edge cannot easily query DB)

### Files Created/Modified
- `src/middleware.ts` (created)
- `src/app/(auth)/auth/callback/route.ts` (created)
- `src/components/auth/AuthForm.tsx` (created)
- `src/components/auth/SignOutButton.tsx` (created)
- `src/components/auth/index.ts` (created)
- `src/app/(auth)/autentificare/page.tsx` (modified)
- `src/app/(auth)/inregistrare/page.tsx` (created)
- `src/app/(dashboard)/layout.tsx` (created)
- `supabase/migrations/20260311000001_create_fiscal_profiles.sql` (created)
- `src/types/index.ts` (modified)
- `src/app/onboarding/page.tsx` (created)
- `src/components/onboarding/*.tsx` (6 files created)
- `.env.example` (modified)
