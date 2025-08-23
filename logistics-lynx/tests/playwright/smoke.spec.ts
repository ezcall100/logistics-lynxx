import { test, expect } from '@playwright/test';

test.describe('Super Admin + MCP smoke', () => {
  test('redirect to MCP intro from /#/super-admin', async ({ page }) => {
    await page.goto('/#/super-admin');
    await expect(page).toHaveURL(/\/#\/super-admin\/mcp\/introduction$/);
    await expect(page.getByText(/MCP Control Center|Introduction/i)).toBeVisible();
  });

  test('features/integrations/docs/support render inside shell', async ({ page }) => {
    for (const sub of ['features', 'integrations', 'documentation', 'support']) {
      await page.goto(`/#/super-admin/mcp/${sub}`);
      // Shell bits should exist (sidebar + header)
      await expect(page.getByRole('navigation')).toBeVisible();
      await expect(page.getByRole('banner')).toBeVisible();
      // Page content renders
      await expect(page.locator('main')).toContainText(new RegExp(sub, 'i'));
    }
  });

  test('404 fence sends unknown paths to intro', async ({ page }) => {
    await page.goto('/#/super-admin/not-a-real-route');
    await expect(page).toHaveURL(/\/#\/super-admin\/mcp\/introduction$/);
  });
});
