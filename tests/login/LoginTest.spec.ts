import { test, expect } from '@playwright/test';
import { BaseTest } from '../../utilities/BaseTest';
import { LoginPage } from '../../pages/login/LoginPage';

/**
 * @Author : Rahul Nivangune
 * @Date : 09-May-2024
 * @ScriptName : LoginTest
 * @Description : This is Login Test
 * @TestCaseCover : LoginTest_01
 */

/*******Start Global Variables**************************/
let objBaseTest: any;
let objLoginPage: any;
let appUrl= 'https://knlcl01uspt.reflexisinc.com/kernel/views/authenticate/W/AUTOM.view';
let userName= '1003952';
let userPassword= '1003952Zebra@123!';
/*******End Global Variables*****************************/


//Group Test
test.describe('All Login Test', () => {

    //Before All Test
    test.beforeAll('Initialize Web Environment', async ({ browser }) => {    

    })

   //Before Each Test
    test.beforeEach('Before Each Test', async ({ page }) => {       
           //Initialize Pages
         objBaseTest = new BaseTest(page);
         objLoginPage = new LoginPage(page);   

          //Load Base url
          await objBaseTest.loadBaseUrl(appUrl);
    })


    /**Login Test with Annotations '@Login'*/
    test('Login Test @Login', async ({ page }) => {   
         await objLoginPage.doLogin(userName,userPassword);
         await objLoginPage.doLogout();
    });

    
    //After Each Test
    test.afterEach('After Each Test', async ({ page }) => {
        await objBaseTest.tearDownWebEnvironment();
    })

    //After All Test
    test.afterAll('TearDown Web Environment', async ({ browser }) => {
        
    })

})