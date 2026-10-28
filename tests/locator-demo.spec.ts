import { test, expect } from '@playwright/test';

test('demonstrate Playwright locators', async ({ page }) => {
  await page.goto('/');

  // CSS locator using data-test
  await page.locator('[data-test="username"]').fill('standard_user');

  // CSS locator using data-test
  await page.locator('[data-test="password"]').fill('secret_sauce');


  // Role-based locator
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page).toHaveURL(/inventory/);
});
