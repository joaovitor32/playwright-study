import { test, expect } from '@playwright/test';

const name = 'João Vitor Munizlopes';
const email = 'joaovitormunizlopes@gmail.com';

test.describe('Form page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/form');
  });

  test('Check form error name on submission, --fail case', async ({ page }) => {
    await page.getByTestId('input-name').type('');
    await page.getByTestId('input-email').type(email);

    await page.getByTestId('form-button').click();

    await expect(page.getByText('First name is required')).toBeVisible();
  });
  test('Check form error email on submission, --fail case', async ({ page }) => {
    await page.getByTestId('input-name').type(name);
    await page.getByTestId('input-email').type('');

    await page.getByTestId('form-button').click();

    await expect(page.getByText('Need a valid email')).toBeVisible();
  });
  test('Check form on submission, --success case', async ({ page }) => {
    await page.getByTestId('input-name').type(name);
    await page.getByTestId('input-email').type(email);

    page.on('dialog', async (dialog) => {
      const dialogMessage = dialog.message();

      await expect(dialogMessage).toEqual(`{"name":"${name}","email":"${email}"}`);

      dialog.accept();
    });

    await page.getByTestId('form-button').click();
  });
});
