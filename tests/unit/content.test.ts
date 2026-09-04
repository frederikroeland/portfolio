import { describe, expect, it } from 'vitest';
import { engagements } from '../../src/data/engagements.ts';
import { expertise } from '../../src/data/expertise.ts';
import { insights } from '../../src/data/insights.ts';
import { recognitions } from '../../src/data/recognitions.ts';
import { clientDenylist } from '../../src/data/denylist.ts';

describe('engagements data', () => {
  it('has a curated set of 3–4 flagship engagements', () => {
    expect(engagements.length).toBeGreaterThanOrEqual(3);
    expect(engagements.length).toBeLessThanOrEqual(4);
  });

  it('uses unique, URL-safe slugs', () => {
    const slugs = engagements.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('has unique featured ordering', () => {
    const orders = engagements.map((e) => e.featuredOrder);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it('never names a denylisted client', () => {
    const haystack = JSON.stringify(engagements).toLowerCase();
    for (const client of clientDenylist) {
      expect(haystack).not.toContain(client.toLowerCase());
    }
  });
});

describe('supporting content', () => {
  it('provides expertise groups with items', () => {
    expect(expertise.length).toBeGreaterThan(0);
    for (const group of expertise) {
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it('provides insights and recognitions', () => {
    expect(insights.length).toBeGreaterThan(0);
    expect(recognitions.length).toBeGreaterThan(0);
  });
});
