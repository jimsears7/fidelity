import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://www.fidelity.com/stock-plan-services/fidelity-brokerage-account",
  );
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
    page.getByRole("link", { name: "Log in", exact: true }),
  ).toBeVisible();
});
