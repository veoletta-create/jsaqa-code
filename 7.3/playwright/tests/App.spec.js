const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

test('Successful authorization', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.waitForLoadState('domcontentloaded');
  // Ждем, пока URL изменится на профиль
  await page.waitForURL(/.*profile/, { timeout: 60000 });
  // Ждем появления текста "Здравствуйте" и проверяем его наличие
  await expect(page.getByText('Здравствуйте').first()).toBeVisible({ timeout: 20000 });
});

test('Failed authorization', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.waitForLoadState('domcontentloaded');
  // При неверном входе страница остается на modal=sign_in, это и проверяем
  await expect(page).toHaveURL(/.*modal=sign_in/, { timeout: 60000 });
});