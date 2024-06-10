import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Click the get started link.
  await page.getByRole("button", { name: "Login" }).click();

  // Expects page to have a heading with the name of Log in.
  await expect(page.getByRole("heading", { name: "Log in" })).toBeVisible();

  // Fill the registration form.
  await page.fill('input[id="username"]', "david");
  await page.fill('input[id="password"]', "David123!");

  // Submit the form.
  await page.getByRole("button", { name: "Login" }).click();

  // Expect user to be redirected to dashboard
  await expect(page).toHaveURL(/dashboard/);

  await page.context().storageState({ path: authFile });
});
