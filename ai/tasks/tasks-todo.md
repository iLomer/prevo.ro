# Tasks Todo

---

## [slice-002] -- Configure Tailwind CSS with Fiskio Design Tokens
**Epic:** E1 | **Size:** S | **Depends on:** slice-001

**User Story**
As a developer, I want Tailwind CSS configured with base design tokens, so that all UI work uses consistent styling from the start.

**Acceptance Criteria**
- [ ] Tailwind CSS installed and configured in `tailwind.config.ts`
- [ ] Base color palette defined (primary, secondary, accent, neutral, error, success, warning)
- [ ] Custom font family configured (system font stack or chosen font)
- [ ] Global CSS file (`src/app/globals.css`) includes Tailwind directives (`@tailwind base/components/utilities`)
- [ ] A simple test element renders with Tailwind classes correctly on `npm run dev`
- [ ] Dark mode class strategy configured (manual toggle, not system preference)

**Out of Scope**
- Component library or reusable components
- Full brand identity or logo
- Dark mode toggle UI (just the config)

---

## [slice-003] -- Set Up Supabase Client and Environment Variables
**Epic:** E1 | **Size:** S | **Depends on:** slice-001

**User Story**
As a developer, I want the Supabase client configured with proper environment variables, so that database and auth integrations can be built on top of it.

**Acceptance Criteria**
- [ ] `@supabase/supabase-js` installed
- [ ] `@supabase/ssr` installed for server-side usage in Next.js App Router
- [ ] Browser client helper created at `src/lib/supabase/client.ts`
- [ ] Server client helper created at `src/lib/supabase/server.ts`
- [ ] `.env.local` created with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` placeholders
- [ ] `.env.example` created with all required env vars documented (no real values)
- [ ] `.env.local` is in `.gitignore`
- [ ] TypeScript types compile without errors

**Out of Scope**
- Database migrations or table creation
- Auth implementation (E2)
- Row-level security policies (E2)
- Supabase project creation (user does this manually)

---

## [slice-004] -- Establish Project Folder Structure and Shared Layout
**Epic:** E1 | **Size:** S | **Depends on:** slice-001, slice-002

**User Story**
As a developer, I want the folder structure and root layout established, so that all epics have clear directories to work in without conflicts.

**Acceptance Criteria**
- [ ] Route groups created: `src/app/(marketing)/`, `src/app/(auth)/`, `src/app/(dashboard)/`
- [ ] Root layout (`src/app/layout.tsx`) configured with HTML lang="ro", meta charset, viewport, and base metadata (title: "Fiskio", description in Romanian)
- [ ] Placeholder `page.tsx` in each route group so the routes resolve
- [ ] `src/components/` directory created with `ui/` subfolder
- [ ] `src/lib/` directory exists with `supabase/` subfolder (from slice-003)
- [ ] `src/types/` directory created for shared TypeScript types
- [ ] Folder structure matches the domain map in `ai/swarm/domain-map.md`

**Out of Scope**
- Actual page content or components
- Navigation or header/footer components
- Auth middleware or route protection

---

## [slice-005] -- Configure ESLint and Dev Tooling
**Epic:** E1 | **Size:** XS | **Depends on:** slice-001

**User Story**
As a developer, I want ESLint configured, so that code quality is enforced automatically from the first line of code.

**Acceptance Criteria**
- [ ] ESLint configured with Next.js recommended rules
- [ ] TypeScript ESLint rules enabled (no `any`, no unused vars)
- [ ] `npm run lint` passes with zero warnings and zero errors
- [ ] `.gitignore` includes standard Next.js ignores (`.next/`, `node_modules/`, `.env.local`, etc.)

**Out of Scope**
- Prettier (keep it simple, ESLint only)
- Husky or pre-commit hooks
- CI/CD pipeline (E5)
