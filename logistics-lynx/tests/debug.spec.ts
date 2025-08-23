import { test, expect } from '@playwright/test';

test('debug - check if React app loads', async ({ page }) => {
  // Listen for console errors
  page.on('console', msg => {
    console.log('Browser console:', msg.text());
  });
  
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });
  
  // Try to load the root page
  await page.goto('/');
  
  // Wait for any content to load
  await page.waitForTimeout(5000);
  
  // Check if there's a root element
  const rootElement = await page.locator('#root').count();
  console.log('Root element count:', rootElement);
  
  // Check if there's any content in the body
  const bodyContent = await page.textContent('body');
  console.log('Body content length:', bodyContent?.length || 0);
  console.log('Body content (first 300 chars):', bodyContent?.substring(0, 300));
  
  // Take a screenshot to see what's there
  await page.screenshot({ path: 'debug-root.png' });
  
  // Check the page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check if there are any script tags
  const scriptCount = await page.locator('script').count();
  console.log('Script count:', scriptCount);
});
