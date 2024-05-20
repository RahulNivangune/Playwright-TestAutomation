import { test, expect, request } from '@playwright/test';

let loginToken: any;
let webContext: any;

test.beforeAll('BeforeAll', async ({browser}) =>{

//Create request newContext
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://www.rahulshettyacademy.com/client/');
await page.locator('#userEmail').fill('rahulnivangune13@gmail.com');
await page.locator('#userPassword').fill('Rahul@12345');
await page.locator("[value='Login']").click();
await page.waitForLoadState('networkidle');

//Save browser storage in to json file of this browser context
await context.storageState({path: 'storageState.json'})

//Add saved storage into browser new context
webContext = await browser.newContext({storageState: 'storageState.json'});




})

test.beforeEach('BeforeEach', () =>{
    
})

test('Client App Login1 ', async () => {

    const page = await webContext.newPage();
    await page.goto('https://www.rahulshettyacademy.com/client/')
    const products = page.locator(".card-body");
    
})

test('Client App Login2 ', async () => {

    const page = await webContext.newPage();
    await page.goto('https://www.rahulshettyacademy.com/client/')
    const products = page.locator(".card-body");
    
})

