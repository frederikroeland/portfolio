import { describe, expect, it } from 'vitest';
import { setCurrentYear } from '../../src/scripts/main.ts';

describe('main.ts DOM helpers', () => {
  it('fills every [data-current-year] element with the current year', () => {
    document.body.innerHTML =
      '<span data-current-year>2000</span><small data-current-year></small>';
    setCurrentYear(document);
    const year = String(new Date().getFullYear());
    for (const el of document.querySelectorAll('[data-current-year]')) {
      expect(el.textContent).toBe(year);
    }
  });
});
