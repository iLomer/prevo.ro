# Tasks In Progress

---

## [slice-002] -- Configure Tailwind CSS with Fiskio Design Tokens
**Epic:** E1 | **Size:** S | **Depends on:** slice-001
**Started: 2026-03-11 | Agent: meto-epic-E1**

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
