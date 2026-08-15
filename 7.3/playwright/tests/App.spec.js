const { test, expect } = require('@playwright/test');

let step = 0;

test('Successful authorization', async ({ page }) => {
  await test.step('1. Открытие страницы входа', async () => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.screenshot({ path: `screenshots/1-1_open_page.png` });
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: `screenshots/1-2_page_loaded.png` });
  });

  await test.step('2. Ожидание ручного входа и перехода в профиль', async () => {
    await page.waitForURL(/.*profile/, { timeout: 60000 });
    await page.screenshot({ path: `screenshots/2-1_url_changed_to_profile.png` });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `screenshots/2-2_profile_page_ready.png` });
  });

  await test.step('3. Проверка текста приветствия', async () => {
    await expect(page.getByText('Здравствуйте').first()).toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: `screenshots/3-1_greeting_checked.png` });
  });
});

test('Failed authorization', async ({ page }) => {
  await test.step('4. Открытие страницы входа для невалидного сценария', async () => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.screenshot({ path: `screenshots/4-1_open_page_fail.png` });
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: `screenshots/4-2_page_loaded_fail.png` });
  });

  await test.step('5. Ожидание ручного ввода невалидных данных', async () => {
    await expect(page).toHaveURL(/.*modal=sign_in/, { timeout: 60000 });
    await page.screenshot({ path: `screenshots/5-1_url_unchanged_fail.png` });
  });
});