
import { test, expect, type Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

const selectors = {
  username: '[data-test="username"]',
  password: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  backpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
  bikeLight: '[data-test="add-to-cart-sauce-labs-bike-light"]',
  cartLink: '[data-test="shopping-cart-link"]',
  checkoutButton: '[data-test="checkout"]',
  firstName: '[data-test="firstName"]',
  lastName: '[data-test="lastName"]',
  postalCode: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  cancelButton: '[data-test="cancel"]',
  finishButton: '[data-test="finish"]',
  backHomeButton: '[data-test="back-to-products"]',
  errorMessage: '[data-test="error"]',
  cartItem: '[data-test="inventory-item"]',
  subtotal: '[data-test="subtotal-label"]',
  tax: '[data-test="tax-label"]',
  total: '[data-test="total-label"]',
};

async function login(page: Page) {
  await page.goto(BASE_URL);

  await page.locator(selectors.username).fill(USERNAME);
  await page.locator(selectors.password).fill(PASSWORD);
  await page.locator(selectors.loginButton).click();

  await expect(page).toHaveURL(/inventory\.html/);
}

async function addBackpackAndOpenCheckout(page: Page) {
  await login(page);

  await page.locator(selectors.backpack).click();
  await page.locator(selectors.cartLink).click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator(selectors.cartItem)).toHaveCount(1);

  await page.locator(selectors.checkoutButton).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

async function fillCheckoutDetails(page: Page) {
  await page.locator(selectors.firstName).fill('Test');
  await page.locator(selectors.lastName).fill('Customer');
  await page.locator(selectors.postalCode).fill('500001');
}

async function continueToOverview(page: Page) {
  await fillCheckoutDetails(page);
  await page.locator(selectors.continueButton).click();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
}

function currencyAmount(text: string | null): number {
  if (!text) {
    throw new Error('Expected a currency value, but none was found.');
  }

  const match = text.match(/\$([\d,]+\.\d{2})/);

  if (!match) {
    throw new Error(`Could not parse currency value: ${text}`);
  }

  return Number(match[1].replaceAll(',', ''));
}

test.describe('SauceDemo checkout', () => {
  test('CHK-01: proceeds to checkout overview with one item', async ({
    page,
  }) => {
    await addBackpackAndOpenCheckout(page);
    await continueToOverview(page);

    await expect(page.locator(selectors.cartItem)).toHaveCount(1);
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true }),
    ).toBeVisible();

    await expect(page.locator(selectors.finishButton)).toBeVisible();
  });

  test('CHK-04: requires first name', async ({ page }) => {
    await addBackpackAndOpenCheckout(page);

    await page.locator(selectors.lastName).fill('Customer');
    await page.locator(selectors.postalCode).fill('500001');
    await page.locator(selectors.continueButton).click();

    await expect(page.locator(selectors.errorMessage))
      .toHaveText('Error: First Name is required');

    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('CHK-05: requires last name', async ({ page }) => {
    await addBackpackAndOpenCheckout(page);

    await page.locator(selectors.firstName).fill('Test');
    await page.locator(selectors.postalCode).fill('500001');
    await page.locator(selectors.continueButton).click();

    await expect(page.locator(selectors.errorMessage))
      .toHaveText('Error: Last Name is required');

    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('CHK-06: requires postal code', async ({ page }) => {
    await addBackpackAndOpenCheckout(page);

    await page.locator(selectors.firstName).fill('Test');
    await page.locator(selectors.lastName).fill('Customer');
    await page.locator(selectors.continueButton).click();

    await expect(page.locator(selectors.errorMessage))
      .toHaveText('Error: Postal Code is required');

    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('CHK-03 and CHK-08: reviews two products and their subtotal', async ({
    page,
  }) => {
    await login(page);

    await page.locator(selectors.backpack).click();
    await page.locator(selectors.bikeLight).click();
    await page.locator(selectors.cartLink).click();

    await expect(page.locator(selectors.cartItem)).toHaveCount(2);

    await page.locator(selectors.checkoutButton).click();
    await continueToOverview(page);

    await expect(page.locator(selectors.cartItem)).toHaveCount(2);
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Sauce Labs Bike Light', { exact: true }),
    ).toBeVisible();

    const itemPrices = await page
      .locator(selectors.cartItem)
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    const expectedSubtotal = itemPrices.reduce(
      (sum, price) => sum + currencyAmount(price),
      0,
    );

    const actualSubtotal = currencyAmount(
      await page.locator(selectors.subtotal).textContent(),
    );

    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
  });

  test('CHK-09: total equals subtotal plus displayed tax', async ({
    page,
  }) => {
    await addBackpackAndOpenCheckout(page);
    await continueToOverview(page);

    const subtotal = currencyAmount(
      await page.locator(selectors.subtotal).textContent(),
    );
    const tax = currencyAmount(
      await page.locator(selectors.tax).textContent(),
    );
    const total = currencyAmount(
      await page.locator(selectors.total).textContent(),
    );

    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  test('CHK-02: completes checkout and returns home', async ({ page }) => {
    await addBackpackAndOpenCheckout(page);
    await continueToOverview(page);

    await page.locator(selectors.finishButton).click();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(
      page.getByRole('heading', {
        name: 'Thank you for your order!',
      }),
    ).toBeVisible();

    await page.locator(selectors.backHomeButton).click();

    await expect(page).toHaveURL(/inventory\.html/);
  });
});
