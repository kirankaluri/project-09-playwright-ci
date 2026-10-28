import { test, expect } from '@playwright/test';

test('demonstrate Playwright locators', async ({ page }) => {
  await page.goto('/');

  // CSS locator using data-test
  await page.getByPlaceholder('Username').fill('standard_user');

  // CSS locator using data-test
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');

  // Role-based locator
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page).toHaveURL(/inventory/);

  await expect(page.getByText('Products')).toBeVisible();
});
