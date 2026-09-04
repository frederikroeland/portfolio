# Quickstart & Validation Guide: Personal Portfolio Website

How to run, test, build, and deploy the framework-free static site, and how to validate it against the spec. Implementation details live in `tasks.md`; content types/contracts live in `data-model.md` and `contracts/`.

## Prerequisites

- Node.js 22 LTS and npm (build tooling only — the output is plain static files)
- A GitHub repository with GitHub Pages enabled (source: GitHub Actions)

## Setup

```bash
npm install
```

## Common commands

| Command                 | Purpose                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run dev`           | Watch-build CSS/TS/HTML and serve `dist/` locally                                                |
| `npm run build`         | Full static build → `dist/` (Tailwind CSS + esbuild TS + posthtml-include HTML + copy `public/`) |
| `npm run preview`       | Serve the built `dist/` locally                                                                  |
| `npm run typecheck`     | `tsc --noEmit` (strict) over all TypeScript                                                      |
| `npm run lint`          | ESLint (typescript-eslint)                                                                       |
| `npm run format`        | Prettier write                                                                                   |
| `npm run stylelint`     | Stylelint on `src/styles`                                                                        |
| `npm run validate:html` | `html-validate` over `dist/`                                                                     |
| `npm run guard:privacy` | Scan `dist/` for PII + denylisted client names (fails on hit)                                    |
| `npm run test:unit`     | Vitest (data modules, DOM helpers, privacy guard)                                                |
| `npm run test:e2e`      | Playwright E2E (incl. axe accessibility)                                                         |
| `npm run test`          | typecheck + lint + stylelint + validate:html + guard:privacy + unit + e2e                        |

## Content editing

- **Structured content** (engagements, insights, recognitions, expertise): edit the typed modules in `src/data/*.ts`. `tsc` and Vitest validate shape and invariants.
- **Adding an engagement**: add an entry to `src/data/engagements.ts` (unique `slug`, 3–4 total) AND create `src/pages/work/<slug>.html`. A structural test fails if a slug lacks its page or the count leaves 3–4.
- **Prose / hero / current role**: edit `src/pages/index.html` and the case-study HTML directly.
- **Shared chrome**: edit `src/partials/{head,header,footer}.html` once — changes apply to all pages.
- Never write email/phone/home address or real client names anywhere; the privacy guard fails the build if any appear.

## Validation scenarios (map to spec)

Run against `npm run preview` (or the deployed URL). Automated equivalents live in `tests/`.

1. **US1 — Instant impression (FR-001, SC-001, manual)**: Load `/`. Name, title, one-line value proposition, and headshot visible without scrolling on desktop and mobile.
2. **US2 — Experience & expertise (FR-003–FR-005)**: Current role shows quantified outcomes; history is reverse-chronological; expertise is grouped and scannable.
3. **US3 — Engagements & thought leadership (FR-006, FR-007, FR-017)**: Homepage shows 3–4 tagged cards; each links to `work/<slug>.html`; external insight links open in a new tab.
4. **US4 — Connect (FR-009, FR-011, FR-020, SC-003)**: LinkedIn opens in a new tab; CV downloads as PDF; no email/phone/home address anywhere.
5. **Privacy/confidentiality (FR-011, FR-018)**: `npm run guard:privacy` reports no matches in `dist/`.
6. **Responsive (FR-013, SC-002)**: At 320/768/1440px no horizontal scroll or clipped content.
7. **Accessibility (FR-014, SC-005)**: axe 0 serious/critical; contrast passes AA; keyboard-reachable with visible focus; `prefers-reduced-motion` disables decorative animation.
8. **Graceful degradation (FR-015)**: With JS disabled, identity/experience/contact remain readable; a broken external link still shows its card.
9. **Metadata/sharing (FR-019, SC-008)**: Each page has title, description, canonical, OG/Twitter tags; sharing renders a correct preview image.
10. **Performance (SC-006)**: Homepage meaningful content < 3s on broadband; Lighthouse Performance & Accessibility ≥ 95.
11. **Traceability (FR-016, SC-007, manual)**: Every published fact traces to `Knowledge/`.

## Deploy (GitHub Pages)

- `.github/workflows/deploy.yml` runs `npm ci && npm run build`, then publishes `dist/` via `actions/deploy-pages` on push to the default branch.
- `public/.nojekyll` ensures GitHub Pages serves the output unmodified.
- All internal links are **relative**, so the site works whether served from a project page (`/portfolio/`) or a user page root — no base-path configuration needed.
- Deploying replaces the existing site content (decommission).

## Definition of done (gates)

- `npm run test` passes (typecheck, lint, stylelint, html-validate, privacy guard, unit, E2E, a11y).
- All validation scenarios pass (incl. manual gates 1 and 11).
- `CHANGES.md` updated.
- Independent second-model review completed and findings resolved (Constitution VI).
