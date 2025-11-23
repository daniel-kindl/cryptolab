import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cryptolab/);
});

test('navigates to encoding lab', async ({ page }) => {
  await page.goto('/');
  // Mantine NavLink with onClick renders as a button or generic clickable
  await page.getByText('Encoding').first().click();
  await expect(page.getByRole('heading', { name: 'Encoding Lab' })).toBeVisible();
});

test('encoding lab updates output', async ({ page }) => {
  await page.goto('/#/encoding');
  const input = page.getByLabel('Text to Encode');
  await input.fill('Playwright');

  // Check Base64 output (Playwright in Base64 is UGxheXdyaWdodA==)
  await expect(page.getByText('UGxheXdyaWdodA==')).toBeVisible();
});

test('hashing lab computes hash', async ({ page }) => {
  await page.goto('/#/hashing');
  const input = page.getByLabel('Text Input', { exact: true });
  await input.fill('Test');

  // Wait for hash to appear (SHA-256 of 'Test' starts with 532ea...)
  await expect(
    page.getByText('532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25'),
  ).toBeVisible();
});
