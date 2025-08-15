import { test, expect } from "@playwright/test";

const paths = [
  "/super-admin","/admin","/tms-admin","/onboarding",
  "/broker","/shipper","/carrier","/driver","/owner-operator",
  "/factoring","/load-board","/crm","/financials","/edi",
  "/marketplace","/analytics","/autonomous","/workers","/rates","/directory"
];

test.describe("Portals behind auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(process.env.E2E_EMAIL || "demo@example.com");
    await page.getByLabel("Password").fill(process.env.E2E_PASSWORD || "password123");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForURL("**/portal-selection");
  });

  for (const p of paths) {
    test(`renders ${p}`, async ({ page }) => {
      await page.goto(p);
      await expect(page.locator("h1")).toBeVisible();
    });
  }
});

test("deprecated routes return UI 410 page (dev) or HTTP 410 via middleware", async ({ page }) => {
  await page.goto("/carrier-admin");
  await expect(page.getByText(/410/i)).toBeVisible();
});

test("portal selection shows correct portals for user role", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(process.env.E2E_EMAIL || "demo@example.com");
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD || "password123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL("**/portal-selection");
  
  // Should show portal selection page
  await expect(page.getByText("Portal Selection")).toBeVisible();
  
  // Should show portal cards
  await expect(page.locator('[data-testid="portal-card"]')).toHaveCount.greaterThan(0);
});
