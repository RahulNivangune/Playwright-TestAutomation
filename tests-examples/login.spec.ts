import {test,expect} from '@playwright/test'

test('Login apptools', async ({page}) =>{
    await page.goto('https://demo.applitools.com/')
    await page.pause()
    await page.locator('[placeholder="Enter your username"]').fill('Raghav');
    await page.locator('[placeholder="Enter your password"]').fill('1234');
    await page.waitForSelector('text=Sign in',{timeout:4000})
    await expect(page.locator('text=Sign in')).toHaveCount(1)
    await page.locator('text=Sign in').click();
    await page.locator('text=ACME').isVisible();
})

test.only('Login nopcommerce', async ({page}) =>{   
    await page.pause()
    await page.goto('https://admin-demo.nopcommerce.com/login');
    await page.getByLabel('Email:').click();
    await page.getByLabel('Email:').press('Control+a');
    await page.getByLabel('Email:').fill('admin@yourstore.com');
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').press('Control+a');
    await page.getByLabel('Password:').fill('admin');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.close();
})