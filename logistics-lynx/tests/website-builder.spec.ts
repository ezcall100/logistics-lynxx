import { test, expect } from '@playwright/test';

test.describe('Trans Bot AI Website Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
  });

  test('Website builder shows live progress', async ({ page }) => {
    // Navigate to autonomous dashboard
    await page.getByRole('link', { name: /Open TMS Dashboard/i }).click();
    await page.waitForURL('**/autonomous-dashboard');
    
    // Click on Website Builder tab
    await page.getByRole('tab', { name: /Website Builder/i }).click();
    
    // Wait for the builder to load
    await page.waitForSelector('[data-testid="pages-built"]', { timeout: 10000 });
    
    // Get initial page count
    const initialCount = await page.locator('[data-testid="pages-built"]').innerText();
    const initialNumber = parseInt(initialCount);
    
    // Wait for pages to be built (should increase within 30 seconds)
    await page.waitForFunction(
      (initial) => {
        const currentElement = document.querySelector('[data-testid="pages-built"]');
        if (!currentElement) return false;
        const currentNumber = parseInt(currentElement.textContent || '0');
        return currentNumber > initial;
      },
      initialNumber,
      { timeout: 30000 }
    );
    
    // Verify the count increased
    const finalCount = await page.locator('[data-testid="pages-built"]').innerText();
    const finalNumber = parseInt(finalCount);
    expect(finalNumber).toBeGreaterThan(initialNumber);
  });

  test('Pause/Resume functionality works', async ({ page }) => {
    // Navigate to autonomous dashboard
    await page.getByRole('link', { name: /Open TMS Dashboard/i }).click();
    await page.waitForURL('**/autonomous-dashboard');
    
    // Click on Website Builder tab
    await page.getByRole('tab', { name: /Website Builder/i }).click();
    
    // Wait for the builder to load
    await page.waitForSelector('button:has-text("Pause")', { timeout: 10000 });
    
    // Click pause button
    await page.getByRole('button', { name: /Pause/i }).click();
    
    // Verify status shows paused
    await expect(page.locator('text=Paused')).toBeVisible({ timeout: 5000 });
    
    // Click resume button
    await page.getByRole('button', { name: /Resume/i }).click();
    
    // Verify status shows running
    await expect(page.locator('text=Building')).toBeVisible({ timeout: 5000 });
  });

  test('SEO score progress is displayed', async ({ page }) => {
    // Navigate to autonomous dashboard
    await page.getByRole('link', { name: /Open TMS Dashboard/i }).click();
    await page.waitForURL('**/autonomous-dashboard');
    
    // Click on Website Builder tab
    await page.getByRole('tab', { name: /Website Builder/i }).click();
    
    // Wait for SEO progress bar to appear
    await page.waitForSelector('[data-testid="seo-progress"]', { timeout: 10000 });
    
    // Verify SEO progress bar exists and has a value
    const seoProgress = page.locator('[data-testid="seo-progress"]');
    await expect(seoProgress).toBeVisible();
    
    // Check that the progress bar has a value (not 0)
    const progressValue = await seoProgress.getAttribute('aria-valuenow');
    expect(parseInt(progressValue || '0')).toBeGreaterThan(0);
  });

  test('Real-time metrics are displayed', async ({ page }) => {
    // Navigate to autonomous dashboard
    await page.getByRole('link', { name: /Open TMS Dashboard/i }).click();
    await page.waitForURL('**/autonomous-dashboard');
    
    // Click on Website Builder tab
    await page.getByRole('tab', { name: /Website Builder/i }).click();
    
    // Wait for metrics to load
    await page.waitForSelector('text=Pages Built', { timeout: 10000 });
    
    // Verify key metrics are displayed
    await expect(page.locator('text=Pages Built')).toBeVisible();
    await expect(page.locator('text=Avg Build Time')).toBeVisible();
    await expect(page.locator('text=Avg SEO Score')).toBeVisible();
    await expect(page.locator('text=Uptime')).toBeVisible();
    
    // Verify metrics have numeric values
    const pagesBuilt = page.locator('[data-testid="pages-built"]');
    await expect(pagesBuilt).toHaveText(/\d+/);
  });

  test('Live page building shows progress', async ({ page }) => {
    // Navigate to autonomous dashboard
    await page.getByRole('link', { name: /Open TMS Dashboard/i }).click();
    await page.waitForURL('**/autonomous-dashboard');
    
    // Click on Website Builder tab
    await page.getByRole('tab', { name: /Website Builder/i }).click();
    
    // Wait for live page building section
    await page.waitForSelector('text=Live TMS Website Building', { timeout: 10000 });
    
    // Verify page building elements are present
    await expect(page.locator('text=Live TMS Website Building')).toBeVisible();
    await expect(page.locator('text=Trans Bot AI TMS Website Building')).toBeVisible();
    
    // Check for building indicators
    const buildingBadges = page.locator('text=Building...');
    await expect(buildingBadges.first()).toBeVisible({ timeout: 15000 });
  });

  test('Website builder console functionality', async ({ page }) => {
    // Navigate to autonomous dashboard
    await page.getByRole('link', { name: /Open TMS Dashboard/i }).click();
    await page.waitForURL('**/autonomous-dashboard');
    
    // Click on Website Builder tab
    await page.getByRole('tab', { name: /Website Builder/i }).click();
    
    // Wait for console elements
    await page.waitForSelector('text=Trans Bot AI Website Builder Console', { timeout: 10000 });
    
    // Verify console controls are present
    await expect(page.locator('text=Builder Controls')).toBeVisible();
    await expect(page.locator('text=Real-time Metrics')).toBeVisible();
    await expect(page.locator('text=Live Builder Logs')).toBeVisible();
    
    // Check for control buttons
    await expect(page.locator('button:has-text("Pause")')).toBeVisible();
    await expect(page.locator('button:has-text("Resume")')).toBeVisible();
    await expect(page.locator('button:has-text("Refresh")')).toBeVisible();
  });

  test('TMS-specific content is generated', async ({ page }) => {
    // Navigate to autonomous dashboard
    await page.getByRole('link', { name: /Open TMS Dashboard/i }).click();
    await page.waitForURL('**/autonomous-dashboard');
    
    // Click on Website Builder tab
    await page.getByRole('tab', { name: /Website Builder/i }).click();
    
    // Wait for content to load
    await page.waitForSelector('text=Trans Bot AI', { timeout: 10000 });
    
    // Verify TMS-specific content is present
    await expect(page.locator('text=Trans Bot AI')).toBeVisible();
    await expect(page.locator('text=TMS Software')).toBeVisible();
    await expect(page.locator('text=Transportation Management')).toBeVisible();
    
    // Check for TMS-related page types
    await expect(page.locator('text=tms-software')).toBeVisible();
    await expect(page.locator('text=features')).toBeVisible();
    await expect(page.locator('text=pricing')).toBeVisible();
  });

  test('Real-time activity indicators are working', async ({ page }) => {
    // Navigate to autonomous dashboard
    await page.getByRole('link', { name: /Open TMS Dashboard/i }).click();
    await page.waitForURL('**/autonomous-dashboard');
    
    // Click on Website Builder tab
    await page.getByRole('tab', { name: /Website Builder/i }).click();
    
    // Wait for activity indicators
    await page.waitForSelector('text=Real-time TMS Content Generation', { timeout: 10000 });
    
    // Verify activity indicators are present and animated
    await expect(page.locator('text=Real-time TMS Content Generation')).toBeVisible();
    await expect(page.locator('text=TMS Software SEO Optimization')).toBeVisible();
    await expect(page.locator('text=50-Page TMS Website')).toBeVisible();
    
    // Check for animated elements (pulsing dots)
    const animatedElements = page.locator('.animate-pulse');
    await expect(animatedElements.first()).toBeVisible();
  });
});
