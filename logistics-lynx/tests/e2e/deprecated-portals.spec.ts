import { test, expect } from "@playwright/test";

const deprecated = [
  "/carrier-admin",
  "/broker-admin", 
  "/shipper-admin",
  "/freight-broker",
  "/carrier-dispatch",
];

test.describe("Deprecated portals", () => {
  for (const path of deprecated) {
    test(`UI route ${path} returns NotAvailable`, async ({ page }) => {
      await page.goto(`http://localhost:8080${path}`);
      
      // Should show the not available page
      await expect(page.getByText("Portal No Longer Available")).toBeVisible();
      await expect(page.getByText("This portal has been deprecated")).toBeVisible();
      await expect(page.getByText("HTTP 410 Gone")).toBeVisible();
      
      // Should have navigation buttons
      await expect(page.getByRole("button", { name: "Go to Dashboard" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Go Back" })).toBeVisible();
    });

    test(`UI route ${path} with subpaths returns NotAvailable`, async ({ page }) => {
      await page.goto(`http://localhost:8080${path}/dashboard`);
      await expect(page.getByText("Portal No Longer Available")).toBeVisible();
      
      await page.goto(`http://localhost:8080${path}/settings`);
      await expect(page.getByText("Portal No Longer Available")).toBeVisible();
      
      await page.goto(`http://localhost:8080${path}/reports`);
      await expect(page.getByText("Portal No Longer Available")).toBeVisible();
    });
  }
});

test.describe("API endpoints", () => {
  test("Deprecated portal API endpoints return 410", async ({ request }) => {
    const baseUrl = "http://localhost:8080";
    
    // Test various API endpoints for each deprecated portal
    const apiEndpoints = [
      "/api/carrier-admin/health",
      "/api/carrier-admin/dashboard",
      "/api/broker-admin/health", 
      "/api/broker-admin/loads",
      "/api/shipper-admin/health",
      "/api/shipper-admin/shipments",
      "/api/freight-broker/health",
      "/api/carrier-dispatch/health",
    ];

    for (const endpoint of apiEndpoints) {
      const response = await request.get(`${baseUrl}${endpoint}`);
      
      // Should return 410 Gone
      expect(response.status()).toBe(410);
      
      const body = await response.json();
      expect(body.error).toBe("portal_deprecated");
      expect(body.message).toContain("deprecated");
      expect(body.status).toBe(410);
    }
  });

  test("Deprecated portal POST endpoints return 410", async ({ request }) => {
    const baseUrl = "http://localhost:8080";
    
    const postEndpoints = [
      "/api/carrier-admin/settings",
      "/api/broker-admin/loads",
      "/api/shipper-admin/shipments",
    ];

    for (const endpoint of postEndpoints) {
      const response = await request.post(`${baseUrl}${endpoint}`, {
        data: { test: "data" }
      });
      
      expect(response.status()).toBe(410);
      
      const body = await response.json();
      expect(body.error).toBe("portal_deprecated");
    }
  });
});

test.describe("Navigation", () => {
  test("Deprecated portal links are not visible in navigation", async ({ page }) => {
    await page.goto("http://localhost:8080");
    
    // Check that deprecated portal links are not in the main navigation
    for (const portal of ["carrier-admin", "broker-admin", "shipper-admin", "freight-broker", "carrier-dispatch"]) {
      await expect(page.getByRole("link", { name: new RegExp(portal, "i") })).not.toBeVisible();
    }
  });

  test("Direct navigation to deprecated portals redirects to not available", async ({ page }) => {
    // Test that direct navigation shows the not available page
    for (const path of deprecated) {
      await page.goto(`http://localhost:8080${path}`);
      await expect(page.getByText("Portal No Longer Available")).toBeVisible();
    }
  });
});

test.describe("Feature flags", () => {
  test("Deprecated portal feature flags are disabled", async ({ page }) => {
    await page.goto("http://localhost:8080");
    
    // Check that feature flags are properly disabled
    // This would require checking the feature flags API
    const response = await page.request.get("http://localhost:8080/api/flags/portal.carrier-admin.enabled");
    const data = await response.json();
    expect(data.value).toBe(false);
  });
});
