import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { engagements } from '../../src/data/engagements.ts';

const paths = ['/', '/404.html', ...engagements.map((e) => `/work/${e.slug}.html`)];

for (const path of paths) {
  test(`no accessibility violations: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
