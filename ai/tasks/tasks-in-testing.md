# Tasks In Testing

---

## [slice-001] -- Initialize Next.js App with TypeScript
**Epic:** E1 | **Size:** S | **Depends on:** none
**Started: 2026-03-11 | Agent: meto-epic-E1**
**Completed: 2026-03-11 | Files changed: package.json, package-lock.json, tsconfig.json, next.config.ts, next-env.d.ts, eslint.config.mjs, postcss.config.mjs, src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, src/app/favicon.ico, public/**

**User Story**
As a developer, I want a Next.js project initialized with TypeScript in strict mode, so that all subsequent work has a solid foundation.

**Acceptance Criteria**
- [x] Next.js app created with `create-next-app` using App Router (not Pages Router)
- [x] TypeScript strict mode enabled in `tsconfig.json`
- [x] Default boilerplate pages cleaned out (no Next.js demo content)
- [x] `npm run dev` starts successfully on localhost:3000
- [x] `npm run build` completes with zero errors
- [x] Project uses `src/` directory structure (`src/app/`, `src/lib/`, etc.)
