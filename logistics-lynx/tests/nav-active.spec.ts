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
      // Find the active nav link by aria-current
      const active = page.locator('nav a[aria-current="page"]');
      await expect(active).toBeVisible();
      await expect(active).toHaveAttribute('href', new RegExp(`/super-admin/mcp/${path}$`));
      // Visual class hint (optional): adjust to your classes
      await expect(active).toHaveClass(/bg-slate-200|dark:bg-slate-800/);
    });
  }
});
