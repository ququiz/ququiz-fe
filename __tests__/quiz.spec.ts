import { test, expect } from "@playwright/test";

test("can create a quiz", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/quiz/create");

  // Expects page to have a paragraph with the name of "Initialize your quiz!".
  await expect(page.getByText("Initialize your quiz!")).toBeVisible();

  // Open the dialog.
  await page.getByText("Create a new quiz").click();

  // Fill the quiz form.
  await page.fill('input[name="title"]', "Test Quiz");
  await page.fill('input[name="start_time"]', "2023-08-24T00:00");
  await page.fill('input[name="end_time"]', "2024-08-24T00:00");
  await page.fill('input[name="questions[0].question"]', "Test Quiz");
  await page.click('button[role="radio"][value="MULTIPLE"]');
  await page.fill('input[name="questions[0].weight"]', "10");
  await page.fill('input[name="questions[0].choices[0]"]', "Correct Test Quiz");
  await page.fill('input[name="questions[0].choices[1]"]', "Test Quiz");
  await page.fill('input[name="questions[0].choices[2]"]', "Test Quiz");
  await page.fill('input[name="questions[0].choices[3]"]', "Test Quiz");
  await page.fill('input[name="questions[0].answer"]', "1");

  // Submit the form.
  await page.getByRole("button", { name: "Initialize quiz" }).click();

  // Expect user to be redirected to quiz edit page
  await expect(page).toHaveURL(/dashboard\/quiz\/[a-zA-Z0-9]+\/edit/);
});
