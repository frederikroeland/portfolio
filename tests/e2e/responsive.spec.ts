import { expect, test } from '@playwright/test';

const widths = [320, 768, 1440];
const paths = ['/', '/work/global-ifrs9-rollout.html'];

for (const width of widths) {
  for (const path of paths) {
    test(`no horizontal overflow at ${width}px on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflows, `unexpected horizontal scroll at ${width}px`).toBe(false);
    });
  }
}

test('renders and is usable with reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  try {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const scrollBehavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    );
    expect(scrollBehavior).toBe('auto');
  } finally {
    await context.close();
  }
});
