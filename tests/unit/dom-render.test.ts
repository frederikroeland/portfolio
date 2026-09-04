import { describe, expect, it } from 'vitest';
import { engagements } from '../../src/data/engagements.ts';
import { expertise } from '../../src/data/expertise.ts';
import {
  escapeHtml,
  renderEngagements,
  renderExpertise,
  renderWorkHeader,
} from '../../src/lib/render.ts';

function parse(html: string): HTMLDivElement {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

describe('render helpers', () => {
  it('escapes HTML-sensitive characters', () => {
    expect(escapeHtml('<a> & "b" \'c\'')).toBe('&lt;a&gt; &amp; &quot;b&quot; &#39;c&#39;');
  });

  it('links each engagement card to its detail page', () => {
    const container = parse(renderEngagements(engagements, ''));
    const links = Array.from(container.querySelectorAll('a'));
    expect(links).toHaveLength(engagements.length);
    for (const engagement of engagements) {
      const match = links.find((a) => a.getAttribute('href') === `work/${engagement.slug}.html`);
      expect(match, `missing card link for ${engagement.slug}`).toBeTruthy();
    }
  });

  it('renders one expertise card per group', () => {
    const container = parse(renderExpertise(expertise));
    expect(container.querySelectorAll('.card')).toHaveLength(expertise.length);
  });

  it('renders a work header with the engagement title', () => {
    const engagement = engagements[0]!;
    const container = parse(renderWorkHeader(engagement, '../'));
    expect(container.querySelector('h1')?.textContent).toContain(engagement.title);
  });
});
