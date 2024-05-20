import { test, expect, request } from '@playwright/test';

//Global Variable
const loginPayload= {userEmail:"rahulnivangune13@gmail.com",userPassword:"Rahul@12345"};//Java Script Objects
const createOrderPayload= {orders:[{country:"India",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};

let loginToken: string, orderId: string;


test.beforeAll('BeforeAll', async () =>{

    //Create request newContext
    const apiContext = await request.newContext();

    //Login API
    const loginResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload
        }
    )
    expect((loginResponse).ok()).toBeTruthy();//200,201
    const loginResponseJson =  await loginResponse.json();
    loginToken = loginResponseJson.token;
    console.log(loginToken);

    //Create Order API
    const createOrderResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:createOrderPayload,
            headers:{
                'Authorization':loginToken,
                'Content-Type':'application/json'
            }
        }
    )
    //expect((createOrderResponse).ok()).toBeTruthy();//200,201
    const createOrderResponseJson =  await createOrderResponse.json();
    orderId = createOrderResponseJson.orders[0];
    console.log(orderId);

})

test.beforeEach('BeforeEach', () =>{
    
})

test('Client App Login ', async ({page}) => {

    //To add localSession into browser window and bypass the login window
    page.addInitScript( value => {
       window.localStorage.setItem('token',value);
    },loginToken);

    await page.goto('https://www.rahulshettyacademy.com/client/')
    const products = page.locator(".card-body");

   
 })