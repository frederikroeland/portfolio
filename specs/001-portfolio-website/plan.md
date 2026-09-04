# Implementation Plan: Personal Portfolio Website

**Branch**: `001-portfolio-website` | **Date**: 2026-08-30 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-portfolio-website/spec.md`

## Summary

A framework-free, fully static, multi-page personal portfolio website presenting Frederik Roeland as a senior Finance & ESG product leader. It replaces the existing GitHub Pages site, adopts a clean modern aesthetic (light theme, bold sans-serif, rounded cards, soft accent panels), and is sourced entirely from `Knowledge/` (resume, URLs, headshot, moodboard). Contact is LinkedIn-only plus a downloadable redacted PDF CV; all client names are anonymized; no analytics, no forms, no testimonials.

**Technical approach**: Hand-authored **static HTML** styled with **Tailwind CSS**, with **no UI framework**. A minimal build pipeline uses the **Tailwind CLI** (CSS), **esbuild** (bundle TypeScript progressive-enhancement scripts), and **`posthtml-include`** (compose shared `<head>`/header/footer partials at build time to keep markup DRY). Structured, repeated content lives in typed **TypeScript data modules** rendered into HTML at build time; prose case-study bodies are authored in HTML. TypeScript also powers a **build-time privacy guard** that scans the built site for PII and denylisted client names (FR-011, FR-018). Output is a plain `dist/` deployed to **GitHub Pages** via GitHub Actions; all internal links are relative so the site is path-agnostic. Quality gates: `tsc` (strict), ESLint + Prettier + Stylelint, `html-validate`, Vitest (TS units), Playwright + axe-core (E2E/accessibility).

## Technical Context

**Language/Version**: TypeScript 5.x (strict), HTML5, CSS via Tailwind 4.x. Node.js 22 LTS (build-time only).

**Primary Dependencies**: Tailwind CSS CLI (`@tailwindcss/cli`), esbuild, `posthtml` + `posthtml-include`. Dev/test: TypeScript, ESLint (typescript-eslint), Prettier, Stylelint, `html-validate`, Vitest (+ jsdom), Playwright, `@axe-core/playwright`.

**Storage**: None. Content is static HTML + typed TypeScript data modules committed to the repo. No database, no runtime storage.

**Testing**: `tsc --noEmit`, Vitest (data modules, DOM helpers, privacy-guard scanner), `html-validate` on `dist/`, Playwright E2E (routing, LinkedIn, CV download, responsive, reduced-motion), `@axe-core/playwright` accessibility.

**Target Platform**: Static site on GitHub Pages over HTTPS; modern evergreen browsers, 320px–1920px.

**Project Type**: Framework-free static web application (frontend only; no backend).

**Performance Goals**: Meaningful homepage content < 3s on broadband (SC-006); minimal CSS and near-zero JS (only small enhancement scripts); Lighthouse Performance & Accessibility ≥ 95.

**Constraints**: Fully static GitHub Pages, no server-side runtime (FR-021); no UI framework; WCAG AA contrast + keyboard reachability (FR-014, SC-005); respects `prefers-reduced-motion`; no cookies/analytics/consent banner; no email/phone/home address published; all clients anonymized; internal links relative (path-agnostic).

**Scale/Scope**: 1 homepage + 3–4 case-study detail pages + a 404 page. ~4 typed content data modules, ~3 HTML partials, a handful of small TS enhancement modules. Single maintainer; low, mostly-static traffic.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design._

| Principle                                               | Assessment                                                                                                                                                                                                   | Status                 |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| I. Test-First Development (backend TDD, NON-NEGOTIABLE) | No backend in scope. TypeScript build/guard/enhancement code is unit-tested with Vitest; UI is covered by E2E + accessibility tests. No backend tests are skipped because there is no backend.               | PASS (N/A for backend) |
| II. Type Safety & Automated Quality Gates               | TypeScript strict (`tsc --noEmit`) over all scripts/data; ESLint + Prettier + Stylelint + `html-validate`. No plain-JS UI logic — enhancement scripts are TypeScript.                                        | PASS                   |
| III. Simplicity: DRY, KISS, YAGNI                       | Framework-free static site (owner's KISS preference); DRY via HTML partials + typed data modules + Tailwind `@apply`; no speculative features (analytics, forms, testimonials, theme switcher all excluded). | PASS                   |
| IV. Production-Grade, Self-Documenting Code             | Descriptive partial/module naming, typed content, no dead code, optimized assets, zero known tech debt at delivery.                                                                                          | PASS                   |
| V. Spec-Driven Clarity & Explicit Verification          | Spec + 7 clarifications recorded; stack decision (plain HTML + Tailwind, no framework) explicitly verified with the owner; manual gates (FR-016/SC-007, SC-001) accepted by owner.                           | PASS                   |
| VI. Independent Second-Model Verification               | A dedicated task requires an independent second AI model to review the delivered output before final.                                                                                                        | PASS (gated in tasks)  |
| Change Tracking (`CHANGES.md`)                          | `CHANGES.md` exists and is updated across spec/clarify/plan; continues through implementation.                                                                                                               | PASS                   |

No violations requiring justification. Complexity Tracking is intentionally empty.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (content inventory + privacy model)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── content-structure.md
│   ├── routes.md
│   └── components.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
package.json                     # scripts + devDependencies (build tools only)
tsconfig.json                    # strict TS
eslint.config.js                 # typescript-eslint
.prettierrc / .stylelintrc.json
.htmlvalidate.json
playwright.config.ts
vitest.config.ts
tailwind.config.ts               # (if needed alongside CSS-first @theme)
build.mjs                        # orchestrates posthtml-include + esbuild + tailwind (or npm scripts)

public/                          # copied verbatim into dist/
├── cv/frederik-roeland-cv-redacted.pdf   # redacted CV (FR-020)
├── og/og-image.png                       # social preview (FR-019)
├── assets/frederik-roeland.jpg           # optimized headshot
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── .nojekyll

src/
├── pages/                       # authored HTML (with <include> partials)
│   ├── index.html               # homepage (US1–US4 sections)
│   ├── work/                    # 3–4 case-study detail pages
│   │   ├── <slug-1>.html
│   │   └── …
│   └── 404.html
├── partials/                    # shared chrome (DRY)
│   ├── head.html                # meta/OG/canonical (per-page vars)
│   ├── header.html
│   └── footer.html
├── data/                        # typed content modules (build-time)
│   ├── engagements.ts
│   ├── insights.ts
│   ├── recognitions.ts
│   ├── expertise.ts
│   └── denylist.ts              # client-name denylist (FR-018)
├── scripts/                     # TypeScript progressive enhancement (→ esbuild)
│   └── main.ts                  # mobile nav, reduced-motion, footer year
├── lib/
│   └── privacy-guard.ts         # scans dist/ for PII + denylisted names
└── styles/
    └── input.css                # Tailwind @theme tokens + @apply components

tests/
├── unit/                        # Vitest: data modules, DOM helpers, privacy guard
├── a11y/                        # axe checks per page
└── e2e/                         # Playwright: routing, LinkedIn, CV, responsive, reduced-motion

.github/workflows/deploy.yml     # build + deploy dist/ to GitHub Pages
```

**Structure Decision**: A single framework-free static project at the repository root. DRY is achieved without a UI framework by (a) shared HTML partials composed at build time, (b) typed TypeScript data modules for repeated content, and (c) Tailwind `@apply` component classes. Case-study pages are individual HTML files under `src/pages/work/` (3–4), satisfying FR-017. Internal links are relative, so the built site is path-agnostic across GitHub Pages project/user URLs.

## Complexity Tracking

> No constitution violations. No justifications required.
