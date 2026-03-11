# PM Agent Memory -- pricepo-ro

*Read at session start. Update at session end.*

---

## Active Decisions
- E1 complete (5/5 tasks done)
- E2 complete (4/4 tasks done)
- E3 complete (7/7 tasks done)
- E4 complete (4/4 tasks done)
- E5 complete (5/5 tasks done)
- E7 sliced into 7 tasks (slice-026 to slice-032), all in tasks-todo.md
- E8 DROPPED (D008) -- all 4 tasks (slice-033 to slice-036) marked DROPPED in backlog

## Product Pivot: No Bookkeeping (D008, 2026-03-11)
- Registru (transaction ledger) feature dropped entirely
- E8 (CAEN Expense Deductibility Guide) dropped -- depended on Registru
- ANAF e-Factura data is read-only input for estimator/alerts/calendar
- New principle added to product-vision.md: "reads data to power smarter education, never becomes bookkeeping tool"
- DashboardShell.tsx updated: Registru removed from both PFA_NAV_ITEMS and SRL_NAV_ITEMS
- The `ledger` icon definition was also removed from icons object (no longer used)

## Files Flagged for Developer Deletion (D008 cleanup)
These files/routes need to be deleted by @meto-developer -- PM does not own /src:
- `src/app/(dashboard)/registru/` (page)
- `src/components/transactions/TransactionLedger.tsx`
- `src/app/api/transactions/route.ts`
- `src/app/api/transactions/[id]/route.ts`
- `supabase/migrations/20260311160000_create_transactions.sql`
- `supabase/migrations/20260311170000_add_payment_method_to_transactions.sql`
- Remove "registru" from middleware.ts protected routes

## Task Dependencies (current sprint -- E7)
- **Wave 1 (no deps, parallel):** slice-026 (SRL fiscal logic, L) + slice-032 (SRL dashboard nav, S)
- **Wave 2 (after slice-026):** slice-027 (D100 calendar deadlines, M)
- **Wave 3 (after slice-026 + slice-032, parallel):** slice-028 (Dividend simulator, M) + slice-029 (CASS estimator, S) + slice-030 (Decizie Asociat, M)
- **Wave 4 (after slice-026 + slice-027 + slice-032):** slice-031 (Fiscal cash flow, M)
- **Critical path:** slice-026 -> slice-027 -> slice-031

## E7 Domain Awareness
- E7 owns: `/src/app/(dashboard)/srl/`, `/src/components/srl/`, `/src/lib/fiscal/srl/`
- slice-032 needs to update `DashboardShell.tsx` (E3 domain) -- CONFLICT FLAGGED in SWARM_AWARENESS
- slice-026 updates `src/lib/fiscal/index.ts` to re-export SRL module -- this file is in E3 domain, minor update (append only)
- Existing FISCAL_CONSTANTS_2026 has minimum salary 3,700 lei -- SRL constants use 4,050 lei (2026 updated value) in separate file
- No SRL code exists yet (only .gitkeep placeholders in components/srl/ and lib/fiscal/srl/)

## Key SRL Fiscal Constants (2026)
- Micro tax: 1% (micro_1) or 3% (micro_3) of revenue
- Dividend tax: 5% (retained at source by SRL)
- CASS on dividends: 10% if annual dividends > 6x minimum wage (24,300 lei)
- CASS cap: base capped at 60x minimum wages (243,000 lei)
- Minimum gross salary 2026: 4,050 lei/month
- D100 quarterly deadlines: Apr 25, Jul 25, Oct 25, Jan 25

## Patterns Found
- 8 epics total (7 active + E8 dropped), aligned with 3 MVP phases
- Romanian language only (D007), education not accounting (D002), PFA first (D003), no bookkeeping (D008)
- Tailwind v4 uses @theme inline in globals.css, not tailwind.config.ts
- Supabase client at `/src/lib/supabase/client.ts` and `server.ts`
- PFA tax rates 2026: CAS 25%, CASS 10%, income tax 10% (sistem real)
- D212 deadline: May 25 each year
- 36 total tasks across 8 epics (25 done, 7 in todo, 4 DROPPED in backlog)
- DashboardShell already receives entityType prop -- conditional nav is straightforward
- FiscalDeadline type already supports micro_1/micro_3 regimes
- PFA deadlines in pfa-deadlines.ts, SRL deadlines will be separate srl-deadlines.ts

## Watch Out
- slice-032 modifies DashboardShell.tsx -- shared file, needs user approval
- slice-026 updates src/lib/fiscal/index.ts -- minor shared file edit (append re-export)
- Minimum salary discrepancy: existing constants say 3,700, E7 uses 4,050 -- keep separate to avoid breaking PFA calculations
- No heavy chart libraries for v1 cash flow visual -- pure CSS/Tailwind bars

## Next Actions
- Developer needs to delete Registru-related files (see "Files Flagged for Developer Deletion" above)
- E7 tasks are in todo -- ready for development
- E6 (ANAF Integration) is the last active epic -- Phase 2, not yet sliced
- Consider updating FISCAL_CONSTANTS_2026 minimum salary from 3,700 to 4,050 as a separate chore task

## Session Log
- **2026-03-11 (session 1):** First planning session. Sliced E1 into 5 tasks.
- **2026-03-11 (session 2):** E1 complete. Sliced E2 (4 tasks) and E4 (4 tasks) for parallel swarm execution.
- **2026-03-11 (session 3):** E1 done, E2+E4 complete. Sliced E3 into 7 tasks. Total 20 tasks.
- **2026-03-11 (session 4):** E1-E4 complete. Sliced E5 into 5 tasks. Total 25 tasks.
- **2026-03-11 (session 5):** E1-E5 complete. Sliced E7 (SRL Features) into 7 tasks (slice-026 to slice-032). Total 32 tasks. Flagged DashboardShell.tsx conflict. E7 estimated 22-36 dev hours. 1L + 4M + 2S.
- **2026-03-11 (session 6):** Created E8 (CAEN Expense Deductibility Guide) with 4 tasks (slice-033 to slice-036). New educational feature for PFA sistem real users. 2S + 2M, estimated 8-14 dev hours. Total 36 tasks across 8 epics.
- **2026-03-11 (session 7):** PRODUCT PIVOT -- Dropped Registru and E8 per D008. Updated product-vision.md, decisions.md, epics.md, tasks-backlog.md, domain-map.md, DashboardShell.tsx. Flagged Registru-related files for developer deletion.
