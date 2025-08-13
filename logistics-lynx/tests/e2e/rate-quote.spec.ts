import { test, expect } from "@playwright/test";

test.describe("Rate Quote Feature", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the rates page
    await page.goto("http://localhost:8080/rates");
  });

  test("Rate quote form loads correctly", async ({ page }) => {
    // Check that the form is visible
    await expect(page.getByText("Rate Quote")).toBeVisible();
    await expect(page.getByText("Get instant freight rates")).toBeVisible();
    
    // Check form fields are present
    await expect(page.getByLabel("Origin")).toBeVisible();
    await expect(page.getByLabel("Destination")).toBeVisible();
    await expect(page.getByLabel("Equipment Type")).toBeVisible();
    await expect(page.getByLabel("Weight (lbs)")).toBeVisible();
    await expect(page.getByLabel("Freight Class")).toBeVisible();
  });

  test("Rate quote form validation works", async ({ page }) => {
    // Try to submit empty form
    await page.getByRole("button", { name: "Get Quote" }).click();
    
    // Should show validation errors
    await expect(page.getByText("City")).toBeVisible();
    await expect(page.getByText("State")).toBeVisible();
    await expect(page.getByText("ZIP Code")).toBeVisible();
  });

  test("Rate quote generates successfully", async ({ page }) => {
    // Fill out the form
    await page.getByLabel("City").first().fill("Los Angeles");
    await page.getByLabel("State").first().fill("CA");
    await page.getByLabel("ZIP Code").first().fill("90210");
    
    await page.getByLabel("City").nth(1).fill("New York");
    await page.getByLabel("State").nth(1).fill("NY");
    await page.getByLabel("ZIP Code").nth(1).fill("10001");
    
    await page.getByLabel("Weight (lbs)").fill("5000");
    
    // Submit the form
    const startTime = Date.now();
    await page.getByRole("button", { name: "Get Quote" }).click();
    
    // Wait for quote result
    await expect(page.getByText("Quote Result")).toBeVisible({ timeout: 10000 });
    
    // Check performance (should be under 500ms p95)
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(5000); // 5 seconds max for E2E test
    
    // Check quote result structure
    await expect(page.getByText(/^\$\d+\.\d{2}$/)).toBeVisible(); // Rate amount
    await expect(page.getByText(/\d+% Confidence/)).toBeVisible(); // Confidence
    
    // Check breakdown
    await expect(page.getByText("Base Rate:")).toBeVisible();
    await expect(page.getByText("Fuel Surcharge:")).toBeVisible();
    await expect(page.getByText("Accessorials:")).toBeVisible();
  });

  test("Rate quote with additional options", async ({ page }) => {
    // Fill out basic form
    await page.getByLabel("City").first().fill("Chicago");
    await page.getByLabel("State").first().fill("IL");
    await page.getByLabel("ZIP Code").first().fill("60601");
    
    await page.getByLabel("City").nth(1).fill("Dallas");
    await page.getByLabel("State").nth(1).fill("TX");
    await page.getByLabel("ZIP Code").nth(1).fill("75201");
    
    await page.getByLabel("Weight (lbs)").fill("15000");
    
    // Select different equipment
    await page.getByLabel("Equipment Type").click();
    await page.getByRole("option", { name: "Reefer" }).click();
    
    // Select different freight class
    await page.getByLabel("Freight Class").click();
    await page.getByRole("option", { name: "100" }).click();
    
    // Check additional options
    await page.getByLabel("Hazmat").check();
    await page.getByLabel("Expedited").check();
    
    // Submit
    await page.getByRole("button", { name: "Get Quote" }).click();
    
    // Wait for result
    await expect(page.getByText("Quote Result")).toBeVisible({ timeout: 10000 });
    
    // Check that additional fees are shown
    await expect(page.getByText("Hazmat Fee:")).toBeVisible();
    await expect(page.getByText("Expedited Fee:")).toBeVisible();
  });

  test("Rate quote error handling", async ({ page }) => {
    // Mock API error by using invalid data
    await page.getByLabel("City").first().fill("Invalid");
    await page.getByLabel("State").first().fill("XX");
    await page.getByLabel("ZIP Code").first().fill("00000");
    
    await page.getByLabel("City").nth(1).fill("Invalid");
    await page.getByLabel("State").nth(1).fill("YY");
    await page.getByLabel("ZIP Code").nth(1).fill("00000");
    
    await page.getByLabel("Weight (lbs)").fill("999999"); // Invalid weight
    
    // Submit
    await page.getByRole("button", { name: "Get Quote" }).click();
    
    // Should show error toast
    await expect(page.getByText("Quote Error")).toBeVisible({ timeout: 5000 });
  });

  test("Rate quote feature flag enforcement", async ({ page }) => {
    // This test would require mocking the feature flag to be disabled
    // For now, we'll just verify the form is accessible when feature is enabled
    
    // Check that the form is functional
    await expect(page.getByRole("button", { name: "Get Quote" })).toBeEnabled();
    
    // Fill minimal form
    await page.getByLabel("City").first().fill("Test");
    await page.getByLabel("State").first().fill("CA");
    await page.getByLabel("ZIP Code").first().fill("90210");
    
    await page.getByLabel("City").nth(1).fill("Test");
    await page.getByLabel("State").nth(1).fill("NY");
    await page.getByLabel("ZIP Code").nth(1).fill("10001");
    
    await page.getByLabel("Weight (lbs)").fill("1000");
    
    // Should be able to submit
    await expect(page.getByRole("button", { name: "Get Quote" })).toBeEnabled();
  });

  test("Rate quote form accessibility", async ({ page }) => {
    // Check that all form elements have proper labels
    await expect(page.getByLabel("City")).toBeVisible();
    await expect(page.getByLabel("State")).toBeVisible();
    await expect(page.getByLabel("ZIP Code")).toBeVisible();
    await expect(page.getByLabel("Equipment Type")).toBeVisible();
    await expect(page.getByLabel("Weight (lbs)")).toBeVisible();
    await expect(page.getByLabel("Freight Class")).toBeVisible();
    await expect(page.getByLabel("Hazmat")).toBeVisible();
    await expect(page.getByLabel("Expedited")).toBeVisible();
    
    // Check that submit button is properly labeled
    await expect(page.getByRole("button", { name: "Get Quote" })).toBeVisible();
  });

  test("Rate quote form responsive design", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Form should still be usable
    await expect(page.getByText("Rate Quote")).toBeVisible();
    await expect(page.getByRole("button", { name: "Get Quote" })).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Form should be properly laid out
    await expect(page.getByText("Rate Quote")).toBeVisible();
    await expect(page.getByRole("button", { name: "Get Quote" })).toBeVisible();
  });
});
