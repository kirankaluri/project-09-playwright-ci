import { test, expect } from '@playwright/test';

test('user can loggin successfully', async({ page }) => {

	// 1. open application
	await page.goto('/');

	// 2. Verify the login page
	await expect(page).toHaveTitle(/Swag Labs/);

	// 3. Enter user name
	await page.getByPlaceholder('Username').fill('standard_user');

	// 4. Enter Password
	await page.getByPlaceholder('Password').fill('secret_sauce');

	// 5. verify the Username was entered
	await expect(page.getByPlaceholder('Username')).toHaveValue('standard_user');

	//6. Click login
	await page.getByRole('button', { name: 'Login' }).click();

	// 7. verify the successful navigation
	await expect(page).toHaveURL(/inventory/);

	// 8. Verify the product page
	await expect(page.getByText('Products')).toBeVisible();

	});
