import type { Engagement, ExpertiseGroup, Insight, Recognition } from '../data/types.ts';
import type { CareerRole } from '../data/site.ts';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const byOrder = <T extends { order?: number }>(a: T, b: T): number =>
  (a.order ?? 0) - (b.order ?? 0);

export function renderOutcomes(outcomes: readonly string[]): string {
  return `<ul class="grid gap-3 sm:grid-cols-2">${outcomes
    .map(
      (o) =>
        `<li class="flex items-start gap-3"><span aria-hidden="true" class="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent"></span><span class="prose-body text-ink">${escapeHtml(
          o,
        )}</span></li>`,
    )
    .join('')}</ul>`;
}

export function renderExperience(roles: CareerRole[]): string {
  return `<ol class="space-y-6">${roles
    .map(
      (r) => `<li class="card">
        <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 class="heading-md">${escapeHtml(r.role)}</h3>
          <p class="text-sm font-medium text-muted">${escapeHtml(r.period)}</p>
        </div>
        <p class="prose-body mt-1 font-medium text-accent">${escapeHtml(r.organization)}</p>
        <ul class="mt-4 space-y-2">${r.highlights
          .map(
            (h) =>
              `<li class="flex items-start gap-3"><span aria-hidden="true" class="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent"></span><span class="prose-body">${escapeHtml(
                h,
              )}</span></li>`,
          )
          .join('')}</ul>
      </li>`,
    )
    .join('')}</ol>`;
}

export function renderExpertise(groups: ExpertiseGroup[]): string {
  return `<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${[...groups]
    .sort(byOrder)
    .map(
      (g) => `<div class="card">
        <h3 class="heading-md">${escapeHtml(g.category)}</h3>
        <ul class="mt-4 flex flex-wrap gap-2">${g.items
          .map((item) => `<li class="tag">${escapeHtml(item)}</li>`)
          .join('')}</ul>
      </div>`,
    )
    .join('')}</div>`;
}

export function renderEngagements(engagements: Engagement[], root = ''): string {
  return `<div class="grid gap-6 md:grid-cols-3">${[...engagements]
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
    .map(
      (
        e,
      ) => `<a class="card group flex flex-col transition-shadow hover:shadow-lg" href="${escapeHtml(
        root,
      )}work/${escapeHtml(e.slug)}.html">
        <div class="flex flex-wrap gap-2">${e.tags
          .slice(0, 3)
          .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
          .join('')}</div>
        <h3 class="heading-md mt-4 group-hover:text-accent">${escapeHtml(e.title)}</h3>
        <p class="prose-body mt-3 flex-1">${escapeHtml(e.summary)}</p>
        <span class="link-underline mt-4 inline-flex items-center gap-1">Read the case study
          <span aria-hidden="true">&rarr;</span></span>
      </a>`,
    )
    .join('')}</div>`;
}

export function renderInsights(insights: Insight[]): string {
  return `<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${[...insights]
    .sort(byOrder)
    .map((i) => {
      const inner = `<div class="flex flex-wrap items-center gap-2">${
        i.topic ? `<span class="tag">${escapeHtml(i.topic)}</span>` : ''
      }</div>
        <h3 class="heading-md mt-4">${escapeHtml(i.title)}</h3>
        ${i.summary ? `<p class="prose-body mt-3">${escapeHtml(i.summary)}</p>` : ''}`;
      if (i.externalUrl) {
        return `<a class="card group flex flex-col transition-shadow hover:shadow-lg" href="${escapeHtml(
          i.externalUrl,
        )}" rel="noopener noreferrer" target="_blank">${inner}
          <span class="link-underline mt-4 inline-flex items-center gap-1">Explore
            <span aria-hidden="true">&rarr;</span></span></a>`;
      }
      return `<article class="card flex flex-col">${inner}</article>`;
    })
    .join('')}</div>`;
}

export function renderWorkHeader(engagement: Engagement, root = '../'): string {
  const impact = engagement.impact ?? [];
  return `<section class="section pb-0" aria-labelledby="work-title">
    <div class="container-page">
      <a class="link-underline inline-flex items-center gap-1" href="${escapeHtml(
        root,
      )}index.html#work"><span aria-hidden="true">&larr;</span> Back to work</a>
      <div class="mt-6 flex flex-wrap gap-2">${engagement.tags
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join('')}</div>
      <h1 id="work-title" class="heading-xl mt-5 max-w-3xl">${escapeHtml(engagement.title)}</h1>
      <p class="lead mt-5 max-w-2xl">${escapeHtml(engagement.summary)}</p>
      <dl class="mt-8 grid gap-6 sm:grid-cols-2">
        ${
          engagement.role
            ? `<div><dt class="eyebrow">Role</dt><dd class="prose-body mt-2 text-ink">${escapeHtml(
                engagement.role,
              )}</dd></div>`
            : ''
        }
        ${
          engagement.product
            ? `<div><dt class="eyebrow">Product</dt><dd class="prose-body mt-2 text-ink">${escapeHtml(
                engagement.product,
              )}</dd></div>`
            : engagement.clientDescriptor
              ? `<div><dt class="eyebrow">Client</dt><dd class="prose-body mt-2 text-ink">${escapeHtml(
                  engagement.clientDescriptor,
                )}</dd></div>`
              : ''
        }
      </dl>
      ${
        impact.length > 0
          ? `<div class="panel mt-10"><h2 class="heading-md">Impact</h2><ul class="mt-4 space-y-2">${impact
              .map(
                (i) =>
                  `<li class="flex items-start gap-3"><span aria-hidden="true" class="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent"></span><span class="prose-body text-ink">${escapeHtml(
                    i,
                  )}</span></li>`,
              )
              .join('')}</ul></div>`
          : ''
      }
    </div>
  </section>`;
}

export function renderWorkCta(root = '../'): string {
  return `<section class="section" aria-labelledby="work-cta">
    <div class="container-page">
      <div class="panel flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="work-cta" class="heading-md">Interested in work like this?</h2>
          <p class="prose-body mt-2">Let's connect on LinkedIn to talk finance and ESG product.</p>
        </div>
        <div class="flex flex-wrap gap-4">
          <a class="btn-primary" href="https://www.linkedin.com/in/frederik-r-38763a3/" rel="noopener noreferrer" target="_blank">Connect on LinkedIn</a>
          <a class="btn-ghost" href="${escapeHtml(root)}index.html#work">More work</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderRecognitions(recognitions: Recognition[]): string {
  return `<ul class="grid gap-4 sm:grid-cols-2">${[...recognitions]
    .sort(byOrder)
    .map(
      (r) => `<li class="panel flex items-baseline justify-between gap-4">
        <span class="font-semibold text-ink">${escapeHtml(r.title)}</span>
        <span class="text-sm font-medium text-accent">${r.year}</span>
      </li>`,
    )
    .join('')}</ul>`;
}
