import { test, expect } from '@playwright/test';

test.describe('Super Admin + MCP smoke', () => {
  test('super admin portal loads', async ({ page }) => {
    await page.goto('/#/super-admin');
    // Check that the shell loads
    await expect(page.locator('h1')).toContainText(/Command Center|Trans Bot AI/i);
    // Check that sidebar is present
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
  });

  test('MCP pages render inside shell', async ({ page }) => {
    for (const sub of ['features', 'integrations', 'documentation', 'support']) {
      await page.goto(`/#/super-admin/mcp/${sub}`);
      // Check that the shell loads
      await expect(page.locator('h1')).toContainText(/Command Center|Trans Bot AI/i);
      // Check that sidebar is present
      await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
      // Check that page content renders (basic check)
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('unknown paths show shell', async ({ page }) => {
    await page.goto('/#/super-admin/not-a-real-route');
    // Should still show the shell even if route doesn't exist
    await expect(page.locator('h1')).toContainText(/Command Center|Trans Bot AI/i);
  });
});
