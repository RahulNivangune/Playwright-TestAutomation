import { test, expect, request } from '@playwright/test';

test.beforeAll('BeforeAll', async () => {
})

test.beforeEach('BeforeEach', () => {

})

test('Abort Network calls using intercept', async ({ page }) => {

    //login and reach orders page

    // Abort jpg,png,jpeg calls
    page.route('**/*.{jpg,png,jpeg}',route=> route.abort());

    //Request Event
    page.on('request', request=> console.log(request.url()));

    //Response Event
    page.on('response', response=> console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    

})