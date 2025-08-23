import { test, expect } from '@playwright/test';

test('shell visible without crash', async ({ page }) => {
  await page.goto('/#/super-admin');
  // Check that the shell loads without crashing
  await expect(page.locator('h1')).toContainText(/Command Center|Trans Bot AI/i);
  // Check that sidebar is present
  await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
});
