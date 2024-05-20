import { test, expect, request } from '@playwright/test';

//Global Variable
const loginPayload = { userEmail: "rahulnivangune13@gmail.com", userPassword: "Rahul@12345" };//Java Script Objects
const createOrderPayload = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakeOrdersPayload = { data: [], message: "No Orders" };

let loginToken: string, orderId: string;


test.beforeAll('BeforeAll', async () => {

    //Create request newContext
    const apiContext = await request.newContext();

    //Login API
    const loginResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    )
    expect((loginResponse).ok()).toBeTruthy();//200,201
    const loginResponseJson = await loginResponse.json();
    loginToken = loginResponseJson.token;
    console.log(loginToken);

    //Create Order API
    const createOrderResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: createOrderPayload,
            headers: {
                'Authorization': loginToken,
                'Content-Type': 'application/json'
            }
        }
    )
    //expect((createOrderResponse).ok()).toBeTruthy();//200,201
    const createOrderResponseJson = await createOrderResponse.json();
    orderId = createOrderResponseJson.orders[0];
    console.log(orderId);

})

test.beforeEach('BeforeEach', () => {

})

test('Client App Login ', async ({ page }) => {

    //To add localSession into browser window and bypass the login window
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, loginToken);

    await page.goto('https://www.rahulshettyacademy.com/client/');

    //Intercepting reposne = API Response->{Playwright fake Response}->Send reponse to browser-> Render data on front end
    //https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6649f719a86f8f74dce88a93 use  * for last product order id
    await page.route("https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //Take a real response of this api using fetch function
            const response = await page.request.fetch(route.request())

            //fake response body
            let body: any = JSON.stringify(fakeOrdersPayload);

            //It will send reponse back to browser.Everything you need to send like request,response,session
            route.fulfill({
                response,
                body, //explicity send fake response to browser 

            });
        })

    await page.locator("button[routerLink*='myorders']").click();
    //Wait for real response and then will make a fake reposne
    await page.waitForResponse("https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    
    //await page.pause();
    console.log(await page.locator(".mt-4").textContent());
})