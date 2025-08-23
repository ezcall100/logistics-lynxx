import { test, expect } from '@playwright/test';

test('shell visible without crash', async ({ page }) => {
  await page.goto('/#/super-admin');
  await expect(page.getByRole('navigation')).toBeVisible();
});
