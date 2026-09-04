import { expect, test } from '@playwright/test';
import { engagements } from '../../src/data/engagements.ts';

for (const engagement of engagements) {
  test(`case study loads: ${engagement.slug}`, async ({ page }) => {
    await page.goto(`/work/${engagement.slug}.html`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(engagement.title);
    await expect(page.getByRole('link', { name: /back to work/i })).toBeVisible();
  });
}

test('returns a 404 page for unknown routes', async ({ page }) => {
  const response = await page.goto('/does-not-exist.html');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/could not be found/i);
});
