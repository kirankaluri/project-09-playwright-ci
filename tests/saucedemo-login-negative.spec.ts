import { test, expect } from '@playwright/test';

test('user cannot login with invalid credentials', async ({ page }) => {

  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').fill('wrong_password');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});
