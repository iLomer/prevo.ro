# Tasks In Testing

---

## [slice-006] -- Supabase Auth Configuration and Middleware
**Epic:** E2 | **Size:** M | **Depends on:** slice-003
**Started:** 2026-03-11 | **Agent:** meto-epic-E2
**Completed:** 2026-03-11 | **Files changed:** `src/middleware.ts`, `src/app/(auth)/auth/callback/route.ts`, `.env.example`

**User Story**
As a developer, I want Supabase Auth configured with email/password sign-up and middleware protecting routes, so that all authenticated features have a reliable auth foundation.

**Acceptance Criteria**
- [x] Supabase Auth enabled for email/password provider (configured in Supabase dashboard, documented in README or .env.example)
- [x] Next.js middleware at `src/middleware.ts` that refreshes Supabase session on every request
- [x] Middleware redirects unauthenticated users from `/(dashboard)/*` routes to `/autentificare`
- [x] Middleware redirects authenticated users from `/(auth)/*` routes to `/panou`
- [x] Auth callback route at `src/app/(auth)/auth/callback/route.ts` handles OAuth/magic link flows
- [x] TypeScript compiles with no errors

**Out of Scope**
- UI components for sign-in/sign-up (slice-007)
- OAuth providers (Google, GitHub) -- email/password only for MVP
- Password reset flow

**File Ownership**
`src/middleware.ts`, `src/app/(auth)/auth/callback/route.ts`

---

## [slice-007] -- Sign Up, Sign In, Sign Out UI
**Epic:** E2 | **Size:** M | **Depends on:** slice-006
**Started:** 2026-03-11 | **Agent:** meto-epic-E2
**Completed:** 2026-03-11 | **Files changed:** `src/components/auth/AuthForm.tsx`, `src/components/auth/SignOutButton.tsx`, `src/components/auth/index.ts`, `src/app/(auth)/autentificare/page.tsx`, `src/app/(auth)/inregistrare/page.tsx`, `src/app/(dashboard)/layout.tsx`

**User Story**
As a Romanian PFA/SRL owner, I want to create an account and sign in with my email, so that I can access my personalized fiscal education.

**Acceptance Criteria**
- [x] Sign-up page at `/inregistrare` with email, password, confirm password fields
- [x] Sign-in page at `/autentificare` with email, password fields
- [x] Client-side form validation (required fields, email format, password min 8 chars, passwords match)
- [x] Server-side error handling: displays Supabase error messages in Romanian (e.g., "Email deja inregistrat", "Parola incorecta")
- [x] Loading states on submit buttons
- [x] Sign-out button/action available in dashboard layout (calls `supabase.auth.signOut()`, redirects to `/`)
- [x] All copy in Romanian (D007)
- [x] Responsive at 375px width minimum
- [x] No `any` types, no `console.log`

**Out of Scope**
- Fiscal profile onboarding (slice-009)
- Password reset / forgot password
- Social OAuth login

**File Ownership**
`src/app/(auth)/autentificare/page.tsx`, `src/app/(auth)/inregistrare/page.tsx`, `src/components/auth/`

---

## [slice-008] -- Fiscal Profiles Database Schema and RLS
**Epic:** E2 | **Size:** S | **Depends on:** slice-006
**Started:** 2026-03-11 | **Agent:** meto-epic-E2
**Completed:** 2026-03-11 | **Files changed:** `supabase/migrations/20260311000001_create_fiscal_profiles.sql`, `src/types/index.ts`

**User Story**
As a developer, I want the fiscal profiles table created with proper RLS policies, so that user profile data is securely stored and only accessible by its owner.

**Acceptance Criteria**
- [x] Supabase migration creates `fiscal_profiles` table with columns: `id` (uuid, PK, references auth.users), `entity_type` (enum: 'pfa', 'srl'), `regime` (text -- e.g., 'norma_venit', 'sistem_real', 'micro_1', 'micro_3'), `tva_status` (boolean), `caen_code` (text), `caen_description` (text, nullable), `created_at` (timestamptz), `updated_at` (timestamptz)
- [x] RLS enabled on `fiscal_profiles`: users can only SELECT, INSERT, UPDATE their own row (where `id = auth.uid()`)
- [x] No DELETE policy (profiles are never deleted by users)
- [x] Migration file at `supabase/migrations/` with descriptive name
- [x] TypeScript types for `FiscalProfile` added to `src/types/index.ts`

**Out of Scope**
- Onboarding UI (slice-009)
- CAEN code autocomplete / lookup

**File Ownership**
`supabase/migrations/*profile*`, `src/types/index.ts`

---

## [slice-009] -- Fiscal Profile Onboarding Flow
**Epic:** E2 | **Size:** M | **Depends on:** slice-007, slice-008
**Started:** 2026-03-11 | **Agent:** meto-epic-E2
**Completed:** 2026-03-11 | **Files changed:** `src/app/onboarding/page.tsx`, `src/components/onboarding/OnboardingWizard.tsx`, `src/components/onboarding/ProgressIndicator.tsx`, `src/components/onboarding/StepEntityType.tsx`, `src/components/onboarding/StepRegime.tsx`, `src/components/onboarding/StepTVA.tsx`, `src/components/onboarding/StepCAEN.tsx`, `src/components/onboarding/index.ts`, `src/middleware.ts`, `src/app/(dashboard)/layout.tsx`

**User Story**
As a new Fiskio user, I want to complete a 5-minute onboarding that captures my entity type, fiscal regime, TVA status, and CAEN code, so that Fiskio personalizes my entire experience.

**Acceptance Criteria**
- [x] Onboarding page at `/onboarding` -- only accessible to authenticated users without a fiscal profile
- [x] Step 1: Entity type selection (PFA or SRL) with visual cards and brief explanation of each
- [x] Step 2: Regime selection -- dynamically shows options based on entity type. PFA: "Norma de venit", "Sistem real". SRL: "Microintreprindere 1%", "Microintreprindere 3%"
- [x] Step 3: TVA status toggle (platitor TVA / neplatitor TVA) with brief explanation
- [x] Step 4: CAEN code input (text field with label, user types their code)
- [x] Progress indicator showing current step (1-4)
- [x] Submit saves profile to `fiscal_profiles` table via Supabase client
- [x] On success, redirects to `/panou` (dashboard)
- [x] Middleware or layout check: if user is authenticated but has no fiscal profile, redirect to `/onboarding`
- [x] All copy in Romanian
- [x] Responsive at 375px

**Out of Scope**
- CAEN code autocomplete/search (future enhancement)
- Editing profile after creation (future task)
- SRL-specific fields beyond regime (no employees count, etc.)

**File Ownership**
`src/app/onboarding/page.tsx`, `src/components/onboarding/`

---

## [slice-010] -- Landing Page Hero and Value Proposition
**Epic:** E4 | **Size:** M | **Depends on:** slice-002, slice-004
**Started:** 2026-03-11 | **Agent:** meto-epic-E4
**Completed:** 2026-03-11 | **Files changed:** `src/app/(marketing)/page.tsx`, `src/components/landing/Hero.tsx`, `src/components/landing/HowItWorks.tsx`, `src/components/landing/Features.tsx`, `src/components/landing/Pricing.tsx`, `src/components/landing/SocialProof.tsx`, `src/components/landing/WaitlistPlaceholder.tsx`, `src/components/landing/index.ts`

**User Story**
As a Romanian PFA/SRL owner visiting pricepo.ro for the first time, I want to immediately understand what Fiskio is and why it matters to me, so that I am motivated to join the waitlist.

**Acceptance Criteria**
- [x] Landing page at `/` (replaces existing placeholder in `(marketing)/page.tsx`)
- [x] Hero section with headline communicating the core value: fiscal independence, not another accountant
- [x] Subheadline addressing the three fears (mistakes, not knowing, running out of money)
- [x] Clear CTA button scrolling to waitlist section
- [x] "How it works" section with 3-4 steps explaining the Fiskio approach (education, not delegation)
- [x] Features section highlighting MVP features: fiscal calendar, tax estimator, D212 guide, e-Factura sync
- [x] Pricing section showing the three tiers (Free, Annual 299 lei/year, Lifetime 799 lei) per D005
- [x] Social proof placeholder section (testimonials or "join X others" counter)
- [x] All copy in Romanian (D007)
- [x] Responsive at 375px width minimum
- [x] Semantic HTML (h1, h2, sections, nav) for SEO

**Out of Scope**
- Waitlist form (slice-011)
- SEO metadata and OG tags (slice-012)
- Analytics (slice-013)
- Header/footer navigation to other pages

**File Ownership**
`src/app/(marketing)/page.tsx`, `src/components/landing/`

---

## [slice-011] -- Waitlist Email Collection
**Epic:** E4 | **Size:** S | **Depends on:** slice-010
**Started:** 2026-03-11 | **Agent:** meto-epic-E4
**Completed:** 2026-03-11 | **Files changed:** `src/components/waitlist/WaitlistForm.tsx`, `src/components/waitlist/index.ts`, `src/components/landing/WaitlistSection.tsx`, `src/components/landing/index.ts`, `src/app/api/waitlist/route.ts`, `src/app/(marketing)/page.tsx`, `supabase/migrations/20260311120000_create_waitlist.sql`

**User Story**
As a visitor convinced by the Fiskio value proposition, I want to submit my email to join the waitlist, so that I get notified when Fiskio launches.

**Acceptance Criteria**
- [x] Waitlist section with email input and submit button, anchored so hero CTA scrolls to it
- [x] Supabase migration creates `waitlist` table: `id` (uuid, PK, default gen_random_uuid()), `email` (text, unique), `created_at` (timestamptz, default now())
- [x] No RLS on `waitlist` -- uses anon key insert policy (INSERT allowed for anon role, SELECT/UPDATE/DELETE denied)
- [x] API route at `src/app/api/waitlist/route.ts` handles POST: validates email, inserts into `waitlist`, returns success/error
- [x] Client-side: email format validation, loading state, success message ("Te-am adaugat pe lista!"), duplicate error message ("Acest email este deja inregistrat")
- [x] No `any` types, no `console.log`
- [x] Responsive at 375px

**Out of Scope**
- Email confirmation / double opt-in
- Admin dashboard for viewing signups
- Integration with email marketing tools (Mailchimp, Resend)

**File Ownership**
`src/components/waitlist/`, `src/app/api/waitlist/route.ts`, `supabase/migrations/*waitlist*`

---

## [slice-012] -- SEO Metadata and Open Graph Tags
**Epic:** E4 | **Size:** S | **Depends on:** slice-010
**Started:** 2026-03-11 | **Agent:** meto-epic-E4
**Completed:** 2026-03-11 | **Files changed:** `src/app/(marketing)/layout.tsx`, `public/robots.txt`, `public/sitemap.xml`

**User Story**
As the Fiskio team, I want proper SEO metadata and Open Graph tags on the landing page, so that organic search and social sharing drive traffic to the waitlist.

**Acceptance Criteria**
- [x] Next.js metadata export in `(marketing)/layout.tsx` with: title "Fiskio -- Educatie fiscala pentru PFA si SRL", description (compelling, under 160 chars, Romanian), keywords relevant to target audience
- [x] Open Graph tags: og:title, og:description, og:image (placeholder image path at `/og-image.png`), og:url, og:type="website", og:locale="ro_RO"
- [x] Twitter card meta tags (twitter:card="summary_large_image", twitter:title, twitter:description)
- [x] Canonical URL set to `https://pricepo.ro`
- [x] `robots.txt` at `public/robots.txt` allowing all crawlers
- [x] `sitemap.xml` at `public/sitemap.xml` with landing page URL
- [x] Structured data (JSON-LD) for Organization schema with name "Fiskio" and url "https://pricepo.ro"

**Out of Scope**
- Actual OG image design (placeholder is fine)
- Google Search Console verification
- Analytics / tracking scripts

**File Ownership**
`src/app/(marketing)/layout.tsx` or page metadata, `public/robots.txt`, `public/sitemap.xml`

---

## [slice-013] -- Landing Page Analytics and Performance
**Epic:** E4 | **Size:** XS | **Depends on:** slice-010
**Started:** 2026-03-11 | **Agent:** meto-epic-E4
**Completed:** 2026-03-11 | **Files changed:** `src/components/landing/Analytics.tsx`, `src/components/landing/analytics-events.ts`, `src/components/landing/index.ts`, `src/app/(marketing)/layout.tsx`, `src/components/waitlist/WaitlistForm.tsx`, `.env.example`

**User Story**
As the Fiskio team, I want basic analytics on the landing page, so that I can track visitor-to-signup conversion and measure the 200-signup target.

**Acceptance Criteria**
- [x] Google Analytics 4 script tag added via Next.js `<Script>` component
- [x] Measurement ID stored in env var `NEXT_PUBLIC_GA_MEASUREMENT_ID` (documented in `.env.example`)
- [x] Page view tracking works on landing page
- [x] Custom event fires on successful waitlist signup ("waitlist_signup")
- [x] Analytics script loads only in production (`process.env.NODE_ENV === 'production'`)

**Out of Scope**
- Dashboard or reporting setup
- A/B testing
- Heatmaps or session recording

**File Ownership**
`src/components/landing/Analytics.tsx` or `src/app/(marketing)/layout.tsx`

---
