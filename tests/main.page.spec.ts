import { test, expect } from '@playwright/test';

test.describe('Main page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Create Next App/);
  });
  test('Has specific visible text', async ({ page }) => {
    await expect(page.getByText('Get started by editing src/pages/index.tsx')).toBeVisible();
  });
  test('Test redirection page', async ({ page, context }) => {
    await page.getByTestId('ahref').click();

    const pagePromise = await context.waitForEvent('page');

    const url = await pagePromise.url();
    await expect(url).toMatch(/nextjs.org/);
  });
});
