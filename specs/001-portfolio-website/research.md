# Phase 0 Research: Personal Portfolio Website

All Technical Context unknowns are resolved below. Each decision records what was chosen, why, and the alternatives considered.

**Stack decision (confirmed with owner)**: Plain, hand-authored **static HTML + Tailwind CSS**, **no UI framework** (no Astro/React/Vue). TypeScript is used for progressive-enhancement scripts and build-time guards. Rationale: the owner prefers the simplest possible runtime for a static, no-database site on GitHub Pages.

## D1. Build approach — no framework

- **Decision**: Author pages as static HTML. Assemble a minimal build pipeline: **Tailwind CSS CLI** (styles), **esbuild** (bundle/minify TypeScript enhancement scripts), and **`posthtml` + `posthtml-include`** (compose shared HTML partials at build time). Output is a plain static site in `dist/`.
- **Rationale**: No UI framework runtime ships to the browser. A build step already exists for Tailwind and TypeScript, so adding HTML partial includes to it is consistent and keeps authoring in plain HTML. This satisfies KISS while still honoring DRY for shared chrome.
- **Alternatives considered**:
  - _Astro_ (recommended by analysis, declined by owner): TS-first SSG with typed content and 0-KB JS; rejected in favor of a framework-free runtime.
  - _Fully hand-duplicated HTML (no partials)_: Would duplicate `<head>`, header, and footer across ~5 pages — violates the DRY rule; rejected.
  - _Vite + vanilla TS MPA_: Bundler is app-oriented; would require hand-rolled templating/routing anyway; rejected (YAGNI).

## D2. Styling / design system

- **Decision**: Tailwind CSS (v4) compiled via the Tailwind CLI. Design tokens (colors, spacing, radius, type scale) declared once via Tailwind's CSS-first `@theme` in `src/styles/input.css`; shared component classes (buttons, cards, section) via `@apply`.
- **Rationale**: One source of design tokens → visual consistency (FR-012) and one place to tune the moodboard aesthetic. Tailwind purges unused CSS → tiny stylesheet (SC-006).
- **Alternatives considered**: Hand-written CSS (more drift/boilerplate across components); a UI kit (fights the bespoke aesthetic, adds weight — YAGNI).

## D3. Content authoring & typing

- **Decision**: Content is authored directly in the HTML pages and partials (no CMS, no content collections). Structured, repeated content (engagements, insights, recognitions, expertise) is kept in typed **TypeScript data modules** under `src/data/*.ts` and rendered into HTML by small build-time partial templates; one-off prose (case-study bodies) is authored in the page HTML.
- **Rationale**: Typed data modules give TypeScript a real, meaningful role (compile-time checking of content shape) without a framework, and keep repeated content DRY and consistent. Prose stays in HTML for simplicity.
- **Alternatives considered**:
  - _All content inline in HTML_: repetitive card markup, easy to introduce inconsistencies; rejected for structured lists.
  - _Framework content collections (Zod)_: requires the framework the owner declined; rejected.

## D4. Client names — anonymization

- **Decision**: Store only anonymized descriptors (e.g., "a global systemic bank", "a European telecom operator", "a global chemicals group"). Named clients never enter any source file.
- **Rationale**: Enforces FR-018 at the source; names cannot leak into output because they are never written down.
- **Enforcement**: Build-time guard (D7) additionally scans built HTML for a denylist of known client names.

## D5. Contact model

- **Decision**: LinkedIn link (new tab, `rel="noopener noreferrer"`) plus a static, redacted PDF CV under `public/cv/`. No email, phone, address, or contact form.
- **Rationale**: Implements FR-011 and FR-020 with the simplest static mechanism.
- **Alternatives considered**: `mailto:` / form service — rejected by clarification (privacy).

## D6. CV redaction

- **Decision**: Produce a redacted PDF from `Knowledge/Frederik_Roeland_Resume.docx` with home address, phone, and both personal emails removed, and client names anonymized. Store as `public/cv/frederik-roeland-cv-redacted.pdf`.
- **Rationale**: The downloadable artifact must satisfy the same privacy/confidentiality rules as the site (FR-018, FR-020). One-time content task, verified by checklist.
- **Alternatives considered**: Auto-generating the PDF at build time — more machinery than warranted (YAGNI).

## D7. Testing & quality gates

- **Decision**:
  - _Type checking_: `tsc --noEmit` (strict) over all TypeScript (enhancement scripts, data modules, build/guard scripts).
  - _Unit_: Vitest for TypeScript modules — the data modules, the DOM enhancement helpers (via jsdom), and the privacy-guard scanner.
  - _HTML validation_: `html-validate` over `dist/`.
  - _Accessibility_: `@axe-core/playwright` on every built page (0 serious/critical) — SC-005.
  - _E2E_: Playwright for routing (home ↔ each case study), LinkedIn target + attributes, CV download (200 + `application/pdf`), responsive at 320/768/1440px (SC-002), reduced-motion.
  - _Privacy guard_: a TypeScript script (run in CI and as a Vitest test) scans `dist/**/*.html` for personal email/phone/address patterns and denylisted client names → fails the build on any hit (FR-011, FR-018).
  - _Lint/format_: ESLint (typescript-eslint) + Prettier + Stylelint; link check across internal relative links.
- **Rationale**: Covers all measurable criteria and edge cases with tooling appropriate to a framework-free static site. Constitution Principle I's mandatory backend-TDD does not apply (no backend); the TypeScript build/guard code is unit-tested.
- **Alternatives considered**: Manual testing only — fails the automated-quality-gates principle.

## D8. Performance & metadata

- **Decision**: Open Graph/Twitter meta + canonical per page (via the shared `<head>` partial with per-page variables); a `sitemap.xml` and `robots.txt` in `public/`; a social preview image. Optional Lighthouse CI budget (Performance & Accessibility ≥ 95).
- **Rationale**: Makes SC-006 and SC-008 measurable and regression-safe.

## D9. Hosting & links (GitHub Pages)

- **Decision**: GitHub Pages via GitHub Actions (build `dist/`, publish with `actions/deploy-pages`). Because there is no framework base-path handling, **all internal links and asset references are relative** (e.g., `./`, `../work/…`, `./assets/…`), which makes the site path-agnostic and works identically whether served from a project page (`/portfolio/`) or a user page root. Add `public/.nojekyll`.
- **Rationale**: Satisfies FR-021 and the "must be GitHub Pages" constraint; relative links avoid the base-path pitfalls of subpath project pages — a genuine simplicity win for the no-framework approach.
- **Alternatives considered**: Absolute `/portfolio/...` paths — brittle if the repo/URL changes; rejected.

## D10. Second-model verification (Constitution VI)

- **Decision**: Before final delivery, an independent second AI model reviews the built site and code against the spec, success criteria, and privacy/confidentiality constraints; findings are recorded and resolved.
- **Rationale**: Mandated by Constitution Principle VI and the user rules.

## Manual gates (accepted by owner)

- **FR-016 / SC-007 (content traceability)** and **SC-001 (5-second impression)** are validated by **manual review** (quickstart scenarios + second-model check), not automated tests. Confirmed acceptable by the owner.

## Open items

- None blocking.
