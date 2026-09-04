# Tasks: Personal Portfolio Website

**Input**: Design documents from `specs/001-portfolio-website/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Stack**: Framework-free static HTML + Tailwind CSS; TypeScript for enhancement scripts, typed content modules, and the build-time privacy guard. Build pipeline: Tailwind CLI + esbuild + posthtml-include. Deploy: GitHub Pages via GitHub Actions.

**Tests**: No backend, so Constitution Principle I's mandatory backend-TDD does not apply. Per plan (research D7), TypeScript modules (data, DOM helpers, privacy guard) are unit-tested and the site has E2E + accessibility tests; those test tasks are included and SHOULD be written before/with their code.

**Organization**: Tasks grouped by user story (US1–US4) in priority order; each story is an independently testable increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: User story the task belongs to
- Paths are repository-relative (single framework-free static project at root)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and build toolchain

- [x] T001 Initialize project at repo root: `package.json`, `tsconfig.json` (strict), `.gitignore`
- [x] T002 [P] Add Tailwind CSS (CLI) with `src/styles/input.css` (`@theme` tokens + `@apply` component classes)
- [x] T003 [P] Add esbuild bundling for `src/scripts/main.ts` → `dist/assets/main.js`
- [x] T004 [P] Add `posthtml` + `posthtml-include` HTML build for `src/pages/**` → `dist/**`
- [x] T005 Create `build.mjs` (or npm scripts) orchestrating CSS + TS + HTML + copy `public/` → `dist/`
- [x] T006 [P] Configure ESLint (typescript-eslint), Prettier, Stylelint, `.htmlvalidate.json`
- [x] T007 [P] Configure test tooling: `vitest.config.ts` (+ jsdom) and `playwright.config.ts` (+ `@axe-core/playwright`)
- [x] T008 [P] Add npm scripts (dev, build, preview, typecheck, lint, format, stylelint, validate:html, guard:privacy, test:unit, test:e2e, test)
- [x] T009 [P] Add GitHub Pages workflow `.github/workflows/deploy.yml` and `public/.nojekyll`

**Checkpoint**: `npm run build` produces an (empty) static `dist/` and CI can deploy it.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T010 [P] Define design tokens (colors, spacing, radius, type scale) from the moodboard in `src/styles/input.css` (FR-012)
- [x] T011 Create shared partials `src/partials/head.html` (meta/OG/canonical vars), `src/partials/header.html` (nav + skip-link), `src/partials/footer.html` (LinkedIn + CV) (FR-019, R2, C7)
- [x] T012 [P] Add client-name denylist in `src/data/denylist.ts` (FR-018)
- [x] T013 [P] Implement build-time privacy guard `src/lib/privacy-guard.ts` (`scan(distDir)`) for PII patterns + denylist (FR-011, FR-018)
- [x] T014 [P] Add optimized headshot to `public/assets/frederik-roeland.jpg` and social image to `public/og/og-image.png`
- [x] T015 [P] Add `public/robots.txt` and `public/sitemap.xml` (FR-019)
- [x] T016 [P] Unit test the privacy guard in `tests/unit/privacy-guard.test.ts` (matches PII + denylist; passes clean HTML)
- [x] T017 [P] Base page scaffold `src/pages/index.html` + `src/pages/404.html` wired to partials (no section content yet)

**Checkpoint**: Partials, tokens, privacy guard, and page scaffolds exist — user stories can begin.

---

## Phase 3: User Story 1 — Instant, credible impression (Priority: P1) 🎯 MVP

**Goal**: A visitor immediately grasps who Frederik is and his value proposition, with headshot and summary.

**Independent Test**: Load `/` on desktop and mobile; name, title, one-line value proposition, headshot, and summary are visible without scrolling.

### Tests for User Story 1

- [x] T018 [P] [US1] E2E: identity elements visible above the fold at desktop + mobile in `tests/e2e/us1-hero.spec.ts`
- [x] T019 [P] [US1] Accessibility: axe scan of homepage (0 serious/critical) in `tests/a11y/home.spec.ts`

### Implementation for User Story 1

- [x] T020 [US1] Author hero + professional summary in `src/pages/index.html` (name, title, value proposition, headshot with alt, LinkedIn) — sourced from `Knowledge/`, no PII (FR-001, FR-002)
- [x] T021 [US1] Set homepage `head` variables (title/description/canonical/OG) via the head partial in `src/pages/index.html` (FR-019)
- [x] T022 [US1] Style hero + summary with token-based Tailwind classes (responsive, WCAG AA) (FR-012, FR-013)

**Checkpoint**: Homepage delivers the MVP digital business card independently.

---

## Phase 4: User Story 2 — Experience & expertise (Priority: P2)

**Goal**: Visitor assesses seniority via current role, career history, and grouped expertise.

**Independent Test**: Current role shows quantified outcomes; history is reverse-chronological; expertise is grouped and scannable.

### Tests for User Story 2

- [x] T023 [P] [US2] Unit test `src/data/expertise.ts` shape/order in `tests/unit/expertise.test.ts`
- [x] T024 [P] [US2] E2E: current-role outcomes, reverse-chronological history, grouped expertise in `tests/e2e/us2-experience.spec.ts`

### Implementation for User Story 2

- [x] T025 [US2] Author current role + career history (reverse-chronological, anonymized orgs, quantified outcomes) in `src/pages/index.html` (FR-003, FR-004, FR-018)
- [x] T026 [P] [US2] Populate `src/data/expertise.ts` (regulatory/accounting, ESG, data governance, certifications, languages) (FR-005)
- [x] T027 [US2] Render expertise grid fragment from `src/data/expertise.ts` into `src/pages/index.html` (FR-005)
- [x] T028 [US2] Style experience + expertise sections (responsive, AA) (FR-012, FR-013)

**Checkpoint**: US1 and US2 both work independently.

---

## Phase 5: User Story 3 — Signature engagements & thought leadership (Priority: P3)

**Goal**: 3–4 tagged case-study cards with detail pages, plus commentaries and recognitions.

**Independent Test**: Homepage shows 3–4 cards; each opens a `work/<slug>.html` detail page; external insight links open in a new tab; recognitions visible.

### Tests for User Story 3

- [x] T029 [P] [US3] Unit tests for `engagements.ts` invariants (count 3–4, unique URL-safe slugs, tags 1–5, summary ≤200, not in denylist) in `tests/unit/engagements.test.ts`
- [x] T030 [P] [US3] Unit test slug↔page mapping (each slug has `src/pages/work/<slug>.html`) in `tests/unit/engagement-pages.test.ts`
- [x] T031 [P] [US3] E2E: 3–4 cards, card → detail navigation, external insight opens new tab, detail renders in `tests/e2e/us3-engagements.spec.ts`

### Implementation for User Story 3

- [x] T032 [US3] Populate `src/data/engagements.ts` with 3–4 anonymized entries (title, slug, summary, tags, impact, featuredOrder) (FR-006, FR-018)
- [x] T033 [P] [US3] Populate `src/data/insights.ts` (incl. use-case/insights library URL from `Knowledge/Urls.txt`) (FR-007, FR-010)
- [x] T034 [P] [US3] Populate `src/data/recognitions.ts` (awards) (FR-008)
- [x] T035 [US3] Render engagement cards fragment (sorted by `featuredOrder`) into `src/pages/index.html` (FR-006)
- [x] T036 [P] [US3] Render thought-leadership list fragment (external links new tab) into `src/pages/index.html` (FR-007)
- [x] T037 [P] [US3] Render recognitions list fragment into `src/pages/index.html` (FR-008)
- [x] T038 [US3] Create `src/pages/work/<slug>.html` for each engagement (hero, tags, role, impact, prose body, back-home nav) (FR-017)
- [x] T039 [US3] Style engagement cards, lists, and detail pages (responsive, AA) (FR-012, FR-013)

**Checkpoint**: All three content stories are independently functional.

---

## Phase 6: User Story 4 — Connect / follow-up (Priority: P4)

**Goal**: Visitor connects on LinkedIn and downloads the redacted CV; no private contact details exposed.

**Independent Test**: LinkedIn opens in a new tab; CV downloads as a PDF; no email/phone/home address anywhere.

### Tests for User Story 4

- [x] T040 [P] [US4] E2E: LinkedIn new-tab target + `rel`; CV returns 200 + `application/pdf`; DOM has no email/phone/address in `tests/e2e/us4-contact.spec.ts`

### Implementation for User Story 4

- [x] T041 [US4] Produce redacted PDF CV at `public/cv/frederik-roeland-cv-redacted.pdf` (remove home address, phone, personal emails; anonymize client names) (FR-020, FR-018)
- [x] T042 [US4] Author contact area in `src/pages/index.html` and finalize footer partial (LinkedIn + relative CV link, `rel="noopener noreferrer"`) (FR-009, FR-011, FR-020, SC-003)

**Checkpoint**: All four user stories complete.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Site-wide quality, accessibility, performance, privacy, and delivery gates

- [x] T043 [P] Implement `src/scripts/main.ts` (mobile nav, footer year, `prefers-reduced-motion` guard), loaded `defer` (FR-014, FR-015)
- [x] T044 [P] Unit test DOM helpers in `main.ts` via jsdom in `tests/unit/main.test.ts`
- [x] T045 [P] Responsive validation at 320/768/1440px (no horizontal scroll) in `tests/e2e/responsive.spec.ts` (SC-002)
- [x] T046 [P] Reduced-motion + JS-disabled graceful-degradation E2E in `tests/e2e/degradation.spec.ts` (FR-014, FR-015)
- [x] T047 [P] Internal relative-link check + `html-validate` over `dist/` wired into `npm run test` (R7, quality)
- [x] T048 [P] Add Lighthouse CI budget (Performance & Accessibility ≥ 95) to `.github/workflows/deploy.yml` (SC-006)
- [x] T049 Full accessibility pass: axe 0 serious/critical across all pages (SC-005)
- [x] T050 Run `guard:privacy` on `dist/` and confirm zero matches (FR-011, FR-018)
- [x] T051 Run all `quickstart.md` validation scenarios (incl. manual gates SC-001, FR-016/SC-007) and record results
- [x] T052 [P] Update `CHANGES.md` with implementation summary
- [x] T053 Independent second-model verification of the delivered site/code vs spec, success criteria, and privacy/confidentiality constraints; resolve findings (Constitution VI) — completed; findings resolved (see CHANGES.md)
- [ ] T054 Confirm deploy replaces the existing GitHub Pages site (decommission old content) (FR-021) — BLOCKED: requires the user's GitHub repo + Pages settings (no git remote configured locally)

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on Setup; **blocks all user stories**.
- **User Stories (Phase 3–6)**: depend on Foundational. US1 is the MVP. US2–US4 are independently testable but each appends sections to the shared `src/pages/index.html`, so those authoring/render tasks (T020, T025/T027, T035/T036/T037, T042) are serialized; data-module and detail-page tasks are parallelizable.
- **Polish (Phase 7)**: depends on the desired user stories being complete.

### Key intra-story dependencies

- Partials (T011) precede page authoring (T017, T020, …).
- `engagements.ts` (T032) precedes card render (T035) and detail pages (T038); slug↔page test (T030) covers their consistency.
- Privacy guard (T013) precedes T050 and CI wiring.

### Parallel opportunities

- Setup: T002, T003, T004, T006, T007, T008, T009 in parallel.
- Foundational: T010, T012, T013, T014, T015, T016 in parallel (T011/T017 touch shared HTML — serialize).
- Within a story, `[P]` data-module, test, and detail-page tasks run in parallel; only shared `index.html` edits serialize.

---

## Parallel Example: User Story 3

```bash
# Data modules + tests in parallel:
Task: "Populate src/data/insights.ts"
Task: "Populate src/data/recognitions.ts"
Task: "Unit tests for engagements.ts invariants"
Task: "Create src/pages/work/<slug>.html detail pages"
# Then serialize the shared index.html render tasks (cards → insights → recognitions).
```

---

## Implementation Strategy

### MVP first (User Story 1 only)

1. Phase 1 Setup → 2. Phase 2 Foundational → 3. Phase 3 US1 → **STOP & validate** → deploy MVP.

### Incremental delivery

Add US2 → validate/deploy; add US3 → validate/deploy; add US4 → validate/deploy; then Phase 7 polish. Each story adds value without breaking earlier ones.

---

## Notes

- `[P]` = different files, no incomplete dependencies.
- The shared `src/pages/index.html` is progressively composed; serialize its edits (T020 → T025/T027 → T035/T036/T037 → T042).
- Every content value must be traceable to `Knowledge/` (FR-016), anonymized (FR-018), and free of PII (FR-011); the privacy guard enforces the last two automatically.
- Commit after each task or logical group; keep `CHANGES.md` current.
