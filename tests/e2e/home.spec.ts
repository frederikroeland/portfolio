import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
  test('presents a credible first impression', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Frederik Roeland/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('offers LinkedIn as the primary contact', async ({ page }) => {
    await page.goto('/');
    const linkedin = page.getByRole('link', { name: /connect on linkedin/i }).first();
    await expect(linkedin).toHaveAttribute('href', /linkedin\.com\/in\/frederik-r-38763a3/);
  });

  test('offers a downloadable CV', async ({ page }) => {
    await page.goto('/');
    const cv = page.getByRole('link', { name: /download cv/i }).first();
    await expect(cv).toHaveAttribute('href', /cv\/.*\.pdf$/);
  });

  test('does not expose an email address', async ({ page }) => {
    await page.goto('/');
    const body = (await page.locator('body').innerText()).toLowerCase();
    expect(body).not.toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/);
  });

  test('navigates to the work section', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Work', exact: true }).click();
    await expect(page).toHaveURL(/#work/);
  });
});
