# Content Structure Contract

There is no framework content layer. This contract fixes the TypeScript interfaces for the typed content modules and the build-time invariants that pages, partials, and tests depend on. Field semantics live in [data-model.md](../data-model.md).

## TypeScript interfaces (`src/data/*.ts`)

```ts
export interface Engagement {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  clientDescriptor?: string;
  role?: string;
  impact?: string[];
  heroImage?: string;
  externalUrl?: string;
  featuredOrder: number;
}

export interface Insight {
  title: string;
  summary?: string;
  topic?: string;
  externalUrl?: string;
  year?: number;
  order?: number;
}

export interface Recognition {
  title: string;
  awardingBody?: string;
  year: number;
  order?: number;
}

export interface ExpertiseGroup {
  category: string;
  items: string[];
  order?: number;
}

export const engagements: Engagement[]; // length 3–4
export const insights: Insight[];
export const recognitions: Recognition[];
export const expertise: ExpertiseGroup[];
export const clientDenylist: string[];
```

## Invariants (asserted by Vitest + privacy guard)

- **SI-1**: No interface has `email`, `phone`, or `streetAddress` fields; no source file contains such values (FR-011).
- **SI-2**: `engagements.length` is 3–4 (FR-006/FR-017).
- **SI-3**: `engagements[].slug` values are unique, URL-safe, and each has a matching `src/pages/work/<slug>.html` (FR-017).
- **SI-4**: `engagements[].tags` length 1–5; `summary` ≤ 200 chars.
- **SI-5**: No `clientDenylist` entry appears in any `dist/**/*.html` output, nor in `clientDescriptor` values (FR-018).
- **SI-6**: Every `externalUrl` is a valid absolute URL and is rendered with `target="_blank" rel="noopener noreferrer"` (FR-007, FR-009).

## Build-time rendering contract

- Typed modules are rendered into HTML fragments by the build (via `posthtml` templating / small render helpers). The rendered card/list markup for engagements, insights, recognitions, and expertise MUST match the component contracts in [components.md](./components.md).
- The privacy guard (`src/lib/privacy-guard.ts`) exposes `scan(distDir: string): { file: string; match: string }[]` and MUST return an empty array for a clean build.
