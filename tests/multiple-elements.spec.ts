import { test, expect } from '@playwright/test';

test('work with multiple elements', async ({ page }) => {

  // Login
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  // Verify Products page
  await expect(page).toHaveURL(/inventory/);

  await expect(page.getByText('Products')).toBeVisible();

  // Find all Add to cart buttons
  const addToCartButtons = page.getByRole('button', {
    name: 'Add to cart'
  });

  // Count matching elements
  const count = await addToCartButtons.count();

  console.log('Number of Add to cart buttons:', count);

  console.log('First button:', await addToCartButtons.first().getAttribute('data-test'));

  console.log('Last button:', await addToCartButtons.last().getAttribute('data-test'));

  console.log('Third button:', await addToCartButtons.nth(2).getAttribute('data-test'));

  expect(count).toBeGreaterThan(0);
});
