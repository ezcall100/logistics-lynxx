import { test, expect } from '@playwright/test';

test('debug - see what is on the page', async ({ page }) => {
  // Listen for console errors
  page.on('console', msg => {
    console.log('Browser console:', msg.text());
  });
  
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });
  
  // First try the root URL
  await page.goto('/');
  console.log('Root URL title:', await page.title());
  console.log('Root URL body text (first 200 chars):', (await page.textContent('body'))?.substring(0, 200));
  
  // Then try the super-admin URL
  await page.goto('/#/super-admin');
  console.log('Super admin URL title:', await page.title());
  console.log('Super admin URL body text (first 200 chars):', (await page.textContent('body'))?.substring(0, 200));
  
  // Wait a bit for the page to load
  await page.waitForTimeout(3000);
  
  // Take a screenshot
  await page.screenshot({ path: 'debug-screenshot.png' });
  
  // Check if there are any elements
  const h1Count = await page.locator('h1').count();
  console.log('H1 count:', h1Count);
  
  const sidebarCount = await page.locator('[data-testid="sidebar"]').count();
  console.log('Sidebar count:', sidebarCount);
  
  // List all elements with text
  const elements = await page.locator('*').all();
  console.log('Total elements:', elements.length);
  
  // Check for any React root
  const rootElement = await page.locator('#root').count();
  console.log('Root element count:', rootElement);
});
