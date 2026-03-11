# Epics -- Fiskio (pricepo.ro)

High-level orientation. Full task definitions live in `tasks-backlog.md`.
Aligned with MVP phases from product vision. Refine with @meto-pm.

---

## E1 -- Project Setup
**Goal:** Initialize the Next.js app with Tailwind CSS, configure Supabase client, establish the development environment, and set up the project structure for a Romanian fiscal education platform.
**Status:** In progress -- sliced into 5 tasks (slice-001 through slice-005), in tasks-todo.md
**Tasks:** slice-001, slice-002, slice-003, slice-004, slice-005

---

## E2 -- Auth & Fiscal Profile
**Goal:** Implement sign up, sign in, sign out using Supabase Auth with RLS. Build the fiscal profile onboarding flow (5 min: entity type PFA/SRL, regime, TVA status, CAEN code) that personalizes the entire experience.
**Status:** Not started
**Tasks:** To be sliced by @meto-pm

---

## E3 -- Core PFA Features (Phase 1)
**Goal:** Build the primary PFA features: personalized fiscal calendar, live tax estimator, interactive D212 guide with auto calculations, export ready-to-submit files, and email deadline alerts. This is the heart of the MVP.
**Status:** Not started
**Tasks:** To be sliced by @meto-pm

---

## E4 -- Landing Page & Validation
**Goal:** Build a waitlist landing page for pricepo.ro. Communicate the Fiskio value proposition, collect emails, target 200 signups in 30 days organic. Deploy to Vercel with custom domain.
**Status:** Not started
**Tasks:** To be sliced by @meto-pm

---

## E5 -- Deploy & Production
**Goal:** Deploy to Vercel, configure custom domain (pricepo.ro), set up environment variables, Supabase production project, and CI/CD pipeline.
**Status:** Not started
**Tasks:** To be sliced by @meto-pm

---

## E6 -- ANAF Integration (Phase 2)
**Goal:** OAuth2 integration with SPV ANAF, automatic e-Factura sync, fiscal vector reading, and automatic legislative alerts. Requires qualified digital certificate per user.
**Status:** Not started (Phase 2 -- after PFA features validated)
**Tasks:** To be sliced by @meto-pm

---

## E7 -- SRL Features (Phase 3)
**Goal:** SRL micro onboarding, dividend simulator, quarterly D100 calendar, Sole Associate Decision generator, and visual fiscal cash flow.
**Status:** Not started (Phase 3 -- after ANAF integration)
**Tasks:** To be sliced by @meto-pm
