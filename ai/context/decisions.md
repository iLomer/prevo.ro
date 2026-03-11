# Decisions Log — Fiskio (pricepo.ro)

Settled decisions. Never re-debate these.

---

## D001 — Product Name: Fiskio
**Date:** 2026-03-11
**Decision:** The product is called Fiskio, hosted at pricepo.ro
**Alternatives considered:** Generic naming
**Reason:** Fiskio communicates fiscal focus, is memorable, and differentiates from accounting software
**Consequences:** All branding, copy, and metadata use "Fiskio"

---

## D002 — Education, Not Accounting Software
**Date:** 2026-03-11
**Decision:** Fiskio is a fiscal education platform, NOT accounting software or a digital accountant
**Alternatives considered:** Building a cheaper accounting SaaS, building an AI accountant
**Reason:** The market gap is education and independence, not another delegation tool. Competitors (SOLO, StartCo, Keez) already cover delegation.
**Consequences:** We never build features that do the work FOR the user. We build features that teach and guide the user to do it themselves.

---

## D003 — PFA First, SRL Second
**Date:** 2026-03-11
**Decision:** MVP Phase 1 targets PFA owners exclusively. SRL comes in Phase 3.
**Alternatives considered:** Building both simultaneously
**Reason:** PFA is simpler fiscally, larger addressable market (700K+), and faster to validate
**Consequences:** All Phase 1 features, onboarding, and content are PFA-specific

---

## D004 — ANAF Integration via Official APIs
**Date:** 2026-03-11
**Decision:** Integrate with ANAF through official OAuth2/API infrastructure (logincert.anaf.ro, api.anaf.ro, SPVWS2)
**Alternatives considered:** Screen scraping, manual data entry only
**Reason:** Official APIs are reliable, legal, and provide the best UX for e-Factura sync and fiscal vector reading
**Consequences:** Users need a qualified digital certificate for full integration. Pre-fill only — no programmatic declaration submission (ANAF limitation).

---

## D005 — Freemium Business Model
**Date:** 2026-03-11
**Decision:** Three tiers: Free (forever), Annual (299 lei/year), Lifetime (799 lei)
**Alternatives considered:** Subscription only, pay-per-use
**Reason:** Free tier drives adoption and trust. Annual is the main revenue driver. Lifetime creates urgency and early cash flow.
**Consequences:** Free tier must be genuinely useful (calendar, alerts, library). Paid features must clearly justify the price.

---

## D006 — Landing Page Validation First
**Date:** 2026-03-11
**Decision:** Launch a waitlist landing page before building the full product. Target: 200 emails in 30 days organic.
**Alternatives considered:** Build first, validate later
**Reason:** De-risk before investing months of development
**Consequences:** Landing page is the first deliverable. If <200 signups, pivot the message before building.

---

## D007 — Romanian Language Only (v1)
**Date:** 2026-03-11
**Decision:** All UI, content, and documentation is in Romanian for v1
**Alternatives considered:** Bilingual (RO/EN)
**Reason:** Target users are Romanian entrepreneurs dealing with Romanian fiscal system. English adds complexity with no value for v1.
**Consequences:** All copy, guides, fiscal library content in Romanian. i18n can be added later if needed.
