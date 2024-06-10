import { test, expect } from "@playwright/test";

// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });

// test("QuQuiz has title", async ({ page }) => {
//   await page.goto("http://localhost:3000");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/QuQuiz/);
// });

test("can login", async ({ page }) => {
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
});
