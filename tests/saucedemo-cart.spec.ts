import { test, expect } from '@playwright/test';

test('user can add a product to the cart', async ({ page }) => {

  // Login
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  // Verify Products page
  await expect(page).toHaveURL(/inventory/);

  await expect(page.getByText('Products')).toBeVisible();

  // Add Sauce Labs Backpack to cart
  const backpack = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  await backpack
    .getByRole('button', { name: 'Add to cart' })
    .click();

  // Verify cart contains one item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Open shopping cart
  await page.locator('.shopping_cart_link').click();

  // Verify cart page
  await expect(page).toHaveURL(/cart/);

  // Verify Backpack is in the cart
  await expect(
    page.locator('.cart_item')
      .filter({ hasText: 'Sauce Labs Backpack' })
  ).toBeVisible();

});
