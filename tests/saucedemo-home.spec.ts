import { test, expect } from '@playwright/test';

test('SauceDemo home page loads successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Swag Labs/);

  await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
});
