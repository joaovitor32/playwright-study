// tests/index.spec.ts
import test from './next-fixture';
import { expect } from '@playwright/test';
test('book title', async ({ page, port }) => {
  await page.goto(`https://localhost:${port}/ssr`);
  const name = await page.innerText('h1');
  expect(name).toBe('The Intelligent Investor');
});
