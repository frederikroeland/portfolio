# Changes

Major changes and features are tracked here as the project is built and changed.

## 2026-09-04 — Published to GitHub Pages + CI registry fix

- First CI run failed at `npm ci` with `E401 Incorrect or missing password`: the machine-global
  `~/.npmrc` pointed npm at a private corporate registry (`artifactory.frrdev.com`), so the
  generated `package-lock.json` contained private `resolved` URLs that GitHub runners cannot
  authenticate to. (No credentials were committed — the token lives only in the user-global npmrc.)
- Fix: added a project `.npmrc` pinning the public registry (`https://registry.npmjs.org/`) and
  regenerated `package-lock.json` so every dependency resolves from the public registry. Verified a
  clean `npm ci` + build + guard + unit tests locally.
- Result: CI is green (build + deploy). Site is live at
  `https://frederikroeland.github.io/portfolio/` (home, case studies, and redacted CV all 200).
  Published via the GitHub Actions Pages source; the old `master` branch is retained but no longer
  the publishing source (supersedes previous site content — FR-021 / T054).

## 2026-09-04 — Publish prep: keep PII/client names out of the public repo

- The GitHub repo is public, so the real privacy denylist and source material must not be
  committed. Refactored so the published source is clean while local/CI enforcement is intact:
  - `src/data/denylist.ts` no longer contains any real values; it loads them at build/test time
    from `src/data/denylist.local.json` (gitignored) with an empty fallback. Added
    `denylist.local.example.json` as a template. Loader verified: 18 client names + 7 PII values.
  - `scanText()` now accepts an optional denylist override; the unit test uses fake fixtures
    (`ACME BANK`, `+1 555 010 1234`) instead of real client/PII data.
  - `.gitignore` now excludes `Knowledge/` (résumé/feedback with personal data) and
    `src/data/denylist.local.json`.
  - Deploy workflow materialises `denylist.local.json` from an optional `PRIVACY_DENYLIST_JSON`
    secret so CI can enforce the full list; when unset, the regex email/phone checks still run.
- Verified: typecheck, lint, build, privacy guard, and unit tests (16) all pass.

## 2026-09-04 — Security review (pre-launch)

- Reviewed the site's security posture before going online. Result: clean for a static,
  backend-less GitHub Pages site.
  - Dependencies: 0 production vulnerabilities; 1 moderate dev-only advisory in esbuild
    (dev-server CORS, GHSA-67mh-4wv8-2f99) — not exploitable here (esbuild is used only via
    `esbuild.build()` at build time, never as a running dev server, and is never shipped).
  - No secrets, credentials, `.env`, or key files in the repo; nothing sensitive in `dist/`.
  - `main.js` uses only `textContent`/`setAttribute` — no `innerHTML`/`eval`/`document.write`
    and no inline event handlers, scripts or styles anywhere.
  - All external links carry `rel="noopener noreferrer"`; all resource loads are same-origin.
  - CI workflow uses least-privilege permissions (contents: read, pages: write, id-token: write),
    official actions, and OIDC deploy; no untrusted input in `run` steps.
- Hardening applied: added a strict **Content-Security-Policy** meta (default-src 'self';
  object-src 'none'; base-uri 'self'; form-action 'none'; script/style/img/font/connect 'self')
  and a **Referrer-Policy** (`strict-origin-when-cross-origin`) to the shared `<head>`. Verified
  the CSP does not block the stylesheet or script (48 Playwright tests pass under enforced CSP).
  Note: clickjacking protection (`frame-ancestors`/X-Frame-Options) requires HTTP headers that
  GitHub Pages does not support and cannot be set via `<meta>`.

## 2026-09-04

- Layout: removed the `max-w-2xl` cap on the Expertise/Work/Insights section-intro "lead"
  paragraphs so single-sentence intros use the full column width instead of wrapping early.
- Insights: replaced marketing-hub link with the Regnology CFO's finance-transformation guide;
  swapped the "Banks, ESG and Climate-Risk Management" card for "Break free from IFRS 9
  workarounds", the "Navigating Climate-Risk Disclosures" card for "IFRS 18 Accounting Changes:
  A Practical Guide for Banks", and "CRD V Prudential Consolidation" for "Risk Mitigation
  Accounting under IFRS 9" — each linked to the matching Regnology insight.
- Copy: replaced em dashes with commas across the site content.
- Grammar/consistency pass (reviewer-approved):
  - Fixed a typo ("Aligne d" → "Aligned") and removed a dangling "products" in the About copy.
  - Added the missing article to "act as a subject-matter expert" / "As a subject-matter expert".
  - Standardised the role title to **"Global Product Director for Finance, data & ESG"** across
    the hero, page title, About panel, footer and CV; dropped "Product CEO" (now "Product owner").
  - Unified profile wording ("I lead product for…", "I define…") between the About and CV summary.
  - Switched spelling to **en-GB** (organisation, standardised, recognised, analyse, centralised,
    modernising; keeping programme/modelling).
  - Reworded the IFRS 9 approach sentence and the Finance Transformation summary for clarity;
    capitalised the climate-risk "Product" value.
  - Certification "Team Coach Assistant" → "Start2Coach Certification".
  - Ran Prettier to remove trailing whitespace.
  - Gates green: build, typecheck, ESLint, Stylelint, html-validate, privacy guard, 16 unit tests,
    48 Playwright tests.

## 2026-09-01

- Applied reviewer feedback (`Knowledge/Feedback_v1.docx`) — content and copy revisions:
  - **Hero/About**: new tagline "Turning finance, data and ESG regulation into products
    financial institutions can trust."; rewritten intro and about paragraph (Finance,
    data & ESG framing; "subledger and accounting hub solutions, financial instrument &
    hedge accounting"); value proposition/meta updated to match.
  - **Expertise**: category renamed to "Regulatory & Accounting Standards"; removed
    "IAS 39 hedge accounting" and the CECL/ASU 2016-13 reference (now "US GAAP");
    "Data-warehouse design" → "Data modelling design"; "P&L, revenue growth & EBITDA"
    → "Drive in front of P&L, revenue growth & EBITDA"; "FRM (Financial Risk Manager)"
    → "FRM (Financial Risk Management)"; added languages Ukrainian (basic) and German (basic).
  - **Experience**: heading "Two decades…" → "Three decades in finance, insurance and
    software."; Practice Lead highlight now "…focus on IFRS 9 and accounting hubs"; removed
    CECL and switched "data-warehouse" → "data-modelling" in the career highlight.
  - **Revenue metric**: current-role outcome changed from 20% → **10% year-over-year revenue
    growth** per the feedback document (please confirm this figure).
  - **Signature work**: removed "Client names are anonymized" from the section intro.
    IFRS 9 engagement: "Led" → "Setup", "global systemic banking group" → "global finance
    group", and "hedge" → "FINREP" in impact + case-study narrative; added "managed and
    operated centrally" to the outcome.
  - **Climate-risk case study**: replaced the Client field with a **Product** field —
    "a solution to analyze the impact of physical and transition risk on credit risk"
    (added optional `product` to the `Engagement` type; render shows Product/Client and no
    longer appends "(anonymized)").
  - **Finance Transformation**: replaced the hedge-accounting engagement/page entirely —
    new slug `work/finance-transformation.html`, role "Subject Matter Expert", narrative
    rewritten (anonymized) from the OneSumX General Ledger finance-transformation case study.
  - **Insights**: "Finance Transformation" card now links to the Regnology CFO's guide to
    finance transformation.
  - Gates re-run green: typecheck, ESLint, Stylelint, build, html-validate, privacy guard,
    16 unit tests, and 48 Playwright tests (desktop + mobile).

## 2026-08-30

- Imported GitHub Spec Kit (v0.10.2, cursor-agent integration, PowerShell scripts)
  from the DisclosureManagement project:
  - Added `.cursor/skills/speckit-*` (10 skills): constitution, specify, clarify,
    plan, tasks, analyze, checklist, implement, taskstoissues, agent-context-update.
  - Added `.specify/` toolkit: scripts, templates, memory, extensions
    (agent-context), integrations, and workflows.
  - Reused the constitution principles, retitled to "Portfolio Constitution".
  - Reset feature state: removed the source `feature.json` so no stale feature
    directory is referenced.
  - Reset `.cursor/rules/specify-rules.mdc` to a clean placeholder
    (regenerated by `speckit-agent-context-update` once a feature is planned).
- Created feature `001-portfolio-website` via `/speckit-specify`:
  - Added `specs/001-portfolio-website/spec.md` (personal portfolio website
    spec sourced from `Knowledge/`) and `checklists/requirements.md`.
  - Clarifications resolved: LinkedIn-only contact (no email/phone/address,
    no form), multi-page structure with case-study detail pages, all client
    names anonymized, and a downloadable redacted PDF CV.
  - `/speckit-clarify` session added a `## Clarifications` section and resolved:
    3–4 curated case-study detail pages, no analytics/tracking, no testimonials
    section, and GitHub Pages static hosting (added FR-021).
  - `/speckit-plan` produced `plan.md`, `research.md`, `data-model.md`,
    `quickstart.md`, and `contracts/` (routes, content schemas, components).
    Chosen stack: static Astro 5 + TypeScript + Tailwind 4, typed content
    collections, GitHub Pages deploy; Vitest + Playwright + axe testing.
    Updated `.cursor/rules/specify-rules.mdc` to point at the active plan.
  - `/speckit-tasks` produced `tasks.md`: 59 tasks across Setup, Foundational,
    US1–US4 (by priority), and Polish, with dependencies, parallel markers, and
    an MVP-first strategy.
  - Stack revised per owner decision: replaced Astro with a **framework-free**
    static HTML + Tailwind CSS approach (TypeScript for enhancement scripts,
    typed content modules, and a build-time privacy guard; Tailwind CLI +
    esbuild + posthtml-include; relative links for path-agnostic GitHub Pages).
    Verified Astro is GitHub Pages-compatible but not required for a no-DB site.
    Rewrote plan/research/data-model/quickstart/contracts/tasks and refreshed the
    agent context accordingly. U1/C1 kept as manual validation gates.
- Implemented feature `001-portfolio-website` via `/speckit-implement`:
  - **Toolchain**: `package.json` (Node ≥ 22, ESM), `tsconfig.json` (strict, all
    strictness flags), ESLint (typescript-eslint) + Prettier + Stylelint +
    `html-validate`, Vitest (+ jsdom) and Playwright (+ `@axe-core/playwright`).
  - **Build pipeline** (`build.ts`, run via `tsx`): Tailwind CSS v4 CLI → CSS,
    esbuild → bundled/minified `main.js`, `posthtml-include` for shared partials,
    per-page token/slot injection, `public/` copy, sitemap generation, and a
    redacted PDF CV generated with `pdfkit` (`src/lib/cv.ts`).
  - **Content** (typed modules in `src/data/`): `site.ts` (profile, current role,
    reverse-chronological career history), `expertise.ts`, `engagements.ts`
    (3 anonymized flagship case studies), `insights.ts` (incl. external resource
    library), `recognitions.ts`, and `denylist.ts` (client + PII denylists).
  - **Pages**: `src/pages/index.html` (hero, about/current role with quantified
    outcomes, expertise, experience, work, insights, recognition, contact),
    3 case-study pages under `src/pages/work/`, and a `404.html`; shared
    `head`/`header`/`footer` partials; skip link + semantic landmarks.
  - **Privacy by construction**: build-time privacy guard (`src/lib/privacy-guard.ts`
    - `scripts/guard.ts`) fails the build on any email/phone/PII or denylisted
      client name in `dist/`. LinkedIn-only contact; all clients anonymized; no
      analytics/cookies; internal links relative for GitHub Pages.
  - **Progressive enhancement**: `src/scripts/main.ts` (footer year, active-section
    highlight), site fully functional without JS; `prefers-reduced-motion` honored.
  - **Tests**: 16 unit tests (privacy guard, content invariants, render/DOM helpers)
    and 22 Playwright tests across desktop + mobile (identity, LinkedIn, CV download,
    no-email assertion, case-study routing, 404, and axe accessibility) — all green.
  - **Quality gates all pass**: typecheck, ESLint, Stylelint, build, `html-validate`,
    privacy guard, unit, and E2E/accessibility.
  - **CI/CD**: `.github/workflows/deploy.yml` runs all gates + Lighthouse CI budgets
    (`.lighthouserc.json`, Performance & Accessibility ≥ 95) and deploys `dist/` to
    GitHub Pages.
  - **Deviations from task text (intentional)**: OG image reuses the headshot rather
    than a separate `og/og-image.png`; test files are consolidated by concern
    (`tests/unit`, `tests/e2e`) instead of one file per user story, with equivalent
    coverage. T054 (decommission existing Pages site) is blocked pending the user's
    GitHub repo/remote.
- Independent second-model verification (T053) and resolutions:
  - Reviewer confirmed privacy/contact constraints clean (no email/phone/address,
    clients anonymized, LinkedIn-only, all external links `rel="noopener noreferrer"`,
    relative internal links) and all gates green.
  - False positives: "missing headshot/CV" — both assets are present and valid in
    `public/assets/` and `dist/` (headshot ~1 MB JPG, CV ~3.9 KB PDF); the reviewer
    had not run the build.
  - Valid finding (FR-004): employers must be named. Per owner decision, career
    history and current role now name employers — **Regnology (formerly Wolters Kluwer
    Finance, Risk & Reporting)**, **Collibra**, **Wolters Kluwer Financial Services**,
    **Moore Stephens, Antwerp** — while all _clients_ remain anonymized (FR-018).
    Award recognitions restored to Wolters Kluwer attribution.
  - Coverage/quality improvements from minor findings: privacy guard now scans
    `.js/.xml/.txt/.svg` (not only HTML); added E2E for real CV download + PDF
    signature, headshot serving, 320/768/1440px no-overflow, and reduced-motion;
    axe now runs on homepage, 404, and all case studies; migrated Vitest off the
    deprecated `environmentMatchGlobs` to `projects`.
  - Final gates: typecheck, ESLint, Stylelint, build, html-validate, privacy guard,
    16 unit tests, and 48 Playwright tests (desktop + mobile) — all passing.
- Optimized the headshot (`public/assets/frederik-roeland.jpg`): cropped the 2100×1400
  landscape original to the portrait 4:5 the card actually displays (centered on the subject)
  and downscaled to 640×800 at JPEG quality 82 — ~1,035 KB → ~50 KB (95% smaller),
  helping the Lighthouse performance budget (SC-006). Updated the `<img>` intrinsic
  dimensions to 640×800.
