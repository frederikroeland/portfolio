# Phase 1 Data Model: Personal Portfolio Website

There is no database and no framework content layer. Content is either authored directly in HTML (prose) or defined in **typed TypeScript data modules** (`src/data/*.ts`) that are rendered into HTML at build time. This document defines the content types, their fields/validation, and the privacy model. All content MUST be traceable to `Knowledge/` (FR-016), anonymized (FR-018), and free of PII (FR-011).

Legend: `?` = optional field. Types are TypeScript.

## Authored-in-HTML content

These are written directly in `src/pages/*.html` (and composed with partials); they have no data module:

- **Profile / hero** (US1, FR-001, FR-002): full name, professional title, one-line value proposition, professional summary, headshot (`<img>` with required `alt`), LinkedIn link, CV link. Authored in `index.html` using the `head`/`header` partials. No email/phone/street-address is ever written (FR-011).
- **Current role** (US2, FR-003): title, scope, quantified outcomes (revenue growth, gross margin, NPS, team size) — authored in `index.html`.
- **Case-study prose** (US3, FR-017): the narrative body of each `src/pages/work/<slug>.html`.

## Typed content modules (`src/data/`)

### `engagements.ts` — `Engagement[]` (3–4 items)

Drives homepage cards (FR-006) and links to the matching `work/<slug>.html` (FR-017).

```ts
export interface Engagement {
  title: string;
  slug: string; // URL-safe; matches work/<slug>.html
  summary: string; // ≤ 200 chars, card description
  tags: string[]; // 1–5 domain/industry/role tags
  clientDescriptor?: string; // MUST be anonymized (never a real client name)
  role?: string;
  impact?: string[]; // quantified outcomes
  heroImage?: string; // path under public/assets/
  externalUrl?: string; // opens in new tab
  featuredOrder: number; // homepage card order
}
```

Validation (unit-tested): length 3–4; `slug` unique and `^[a-z0-9]+(?:-[a-z0-9]+)*$`; `tags` length 1–5; `summary` ≤ 200; `clientDescriptor` not in denylist.

### `insights.ts` — `Insight[]`

Thought-leadership items (FR-007, FR-010).

```ts
export interface Insight {
  title: string;
  summary?: string;
  topic?: string; // e.g., "Climate Risk", "IFRS 9"
  externalUrl?: string; // new tab + rel="noopener noreferrer"
  year?: number;
  order?: number;
}
```

Validation: if `externalUrl` present, valid absolute URL.

### `recognitions.ts` — `Recognition[]`

Awards/recognitions (FR-008); social proof (testimonials excluded).

```ts
export interface Recognition {
  title: string;
  awardingBody?: string;
  year: number;
  order?: number;
}
```

### `expertise.ts` — `ExpertiseGroup[]`

Grouped skills (FR-005).

```ts
export interface ExpertiseGroup {
  category: string; // e.g., "Regulatory & Accounting", "ESG", "Certifications", "Languages"
  items: string[]; // ≥ 1
  order?: number;
}
```

### `denylist.ts` — `string[]`

Known client names that MUST NOT appear in built output (FR-018), consumed by the privacy guard and unit tests.

## Derived / non-module data

- **Contact Channel** (spec entity): not a module; the LinkedIn URL and CV path are authored constants in the `footer`/`head` partials and `index.html` (FR-011, FR-020). No other channels exist.
- **Site metadata** (FR-019): title/description/canonical/OG variables passed per page into the `head` partial; `sitemap.xml` + `robots.txt` in `public/`.

## Cross-cutting validation rules (enforced automatically)

1. **Privacy-by-construction**: no source file contains email, phone, or street-address values (FR-011). Interfaces have no such fields.
2. **Build-time privacy guard** (`src/lib/privacy-guard.ts`): scans `dist/**/*.html` for email/phone/address patterns and every entry in `denylist.ts`; the build FAILS on any match (FR-011, FR-018). Runs in CI and as a Vitest test.
3. **Structural guards** (Vitest): engagements count 3–4 and unique slugs (FR-006/FR-017); each `engagements[].slug` has a corresponding `src/pages/work/<slug>.html`; tags within bounds.
4. **Source traceability** (FR-016): every populated field corresponds to a fact in `Knowledge/`; verified by manual review (accepted manual gate).
