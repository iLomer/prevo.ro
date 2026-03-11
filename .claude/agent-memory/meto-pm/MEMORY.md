# PM Agent Memory -- pricepo-ro

*Read at session start. Update at session end.*

---

## Active Decisions
- E1 complete (5/5 tasks done, in testing)
- E2 sliced into 4 tasks (slice-006 to slice-009), all in tasks-todo.md
- E4 sliced into 4 tasks (slice-010 to slice-013), all in tasks-todo.md
- E2 and E4 run in parallel -- zero file overlap confirmed via domain map

## Task Dependencies (current sprint)
- **E2 chain:** slice-006 (no deps) -> slice-007 + slice-008 (parallel, both depend on 006) -> slice-009 (depends on 007 + 008)
- **E4 chain:** slice-010 (no deps) -> slice-011 + slice-012 + slice-013 (parallel, all depend on 010)
- **Cross-epic:** E2 and E4 are fully independent. No shared files.

## Patterns Found
- 7 epics total, aligned with 3 MVP phases
- Romanian language only (D007), education not accounting (D002), PFA first (D003)
- Landing page first for validation (D006)
- Tailwind v4 uses @theme inline in globals.css, not tailwind.config.ts
- Supabase client at `/src/lib/supabase/client.ts` and `server.ts`
- E1 tasks are in tasks-in-testing.md -- need to be moved to tasks-done.md by tester

## Watch Out
- slice-009 (onboarding) modifies middleware behavior -- needs coordination with slice-006 (which creates middleware). Both E2 domain so no conflict.
- slice-011 (waitlist) needs a Supabase migration -- ensure anon key insert policy is correct
- E4 domain includes `/src/app/api/waitlist/` -- added to swarm awareness domains
- E2 domain includes `src/middleware.ts` -- added to swarm awareness domains
- E5 (Deploy) should be sliced after E4 is done -- landing page needs to ship fast per D006

## Next Actions
- After E2+E4 are in progress: slice E5 (Deploy) -- it's needed to ship the landing page
- After E2 done: slice E3 (Core PFA Features)
- Consider: E5 could start as soon as E4 hero page (slice-010) is done -- doesn't need all E4 tasks

## Session Log
- **2026-03-11 (session 1):** First planning session. Sliced E1 into 5 tasks.
- **2026-03-11 (session 2):** E1 complete. Sliced E2 (4 tasks) and E4 (4 tasks) for parallel swarm execution. 8 new tasks total (slice-006 to slice-013) in tasks-todo.md. Updated epics.md, SWARM_AWARENESS.md.
