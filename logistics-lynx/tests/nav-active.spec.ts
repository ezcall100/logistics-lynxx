import { test, expect } from '@playwright/test';

const items = [
  { path: 'introduction', label: /mcp.*intro/i },
  { path: 'features',     label: /features/i },
  { path: 'integrations', label: /integrations/i },
  { path: 'documentation',label: /documentation|docs/i },
  { path: 'support',      label: /support/i },
];

test.describe('Sidebar active highlighting', () => {
  for (const { path } of items) {
    test(`active state on ${path}`, async ({ page }) => {
      await page.goto(`/#/super-admin/mcp/${path}`);
      
      // Check that the page loads
      await expect(page.locator('h1')).toContainText(/Command Center|Trans Bot AI/i);
      
      // Look for NavLink elements with the expected href
      const navLink = page.locator(`a[href*="/super-admin/mcp/${path}"]`);
      await expect(navLink).toBeVisible();
      
      // Check for active styling classes (more flexible)
      await expect(navLink).toHaveClass(/bg-blue-600|bg-slate-200|dark:bg-slate-800/);
    });
  }
});
