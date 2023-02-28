import { test, expect } from '@playwright/test';

const site = 'http://localhost:5173';

test('verify that the page renders properly', async ({ page }) => {
  await page.goto(site);

  const res = await page.evaluate(async () => {
    const pageContent = document.body.innerText;
    return pageContent.includes('This is Layout Component');
  });
  expect(res).toBe(true);
});
