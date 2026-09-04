import { expect, test } from '@playwright/test';

test('serves the redacted CV as a downloadable PDF', async ({ request }) => {
  const response = await request.get('/cv/frederik-roeland-cv-redacted.pdf');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  const body = await response.body();
  expect(body.length).toBeGreaterThan(1000);
  expect(body.subarray(0, 5).toString('latin1')).toBe('%PDF-');
});

test('serves the headshot image', async ({ request }) => {
  const response = await request.get('/assets/frederik-roeland.jpg');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/jpeg');
});

test('triggers a real CV download from the homepage', async ({ page }) => {
  await page.goto('/');
  const downloadPromise = page.waitForEvent('download');
  await page
    .getByRole('link', { name: /download cv/i })
    .first()
    .click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
});
