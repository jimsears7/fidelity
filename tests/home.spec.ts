import { test, expect } from "@playwright/test";

test("test", async ({ page }, testInfo) => {
  await page.goto(
    "https://www.fidelity.com/stock-plan-services/fidelity-brokerage-account",
  );

  // One of step for mobile to open hamburger menu
  if (testInfo.project.name === "Mobile Chrome") {
    await page.getByRole("button", { name: "Open navigation overlay" }).click();
  }

  await expect(
    page.getByRole("link", { name: "Accounts & Trade" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Investing", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Retirement", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Wealth Management", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "News & Research" }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "search or get a quote, please" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Log in", exact: true }).first(),
  ).toBeVisible();
});
