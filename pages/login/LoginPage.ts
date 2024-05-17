import { Locator, Page } from "@playwright/test";

/**
 * @Author : Rahul Nivangune 
 * @Date : 09-May-2024
 * @Use : This Page will contain most of Login Page. 
 * Path: login page
 */
export class LoginPage {

    /*******Start Global Variables**************************/
    protected readonly page: Page;
    str_img_LoginAuthenticationSpinnerProgressBar: string;
    
    inp_UserName: Locator;
    inp_UserPassword: Locator;
    btn_Login: Locator;
    btn_Logout: Locator;
    icon_UserImage: Locator;
    img_LoginAuthenticationSpinnerProgressBar: Locator; 
    /*******End Global Variables*****************************/

    /**Login Page Constructor*/
    constructor(page: Page) {
        this.page = page;
        //Input
        this.inp_UserName = page.getByPlaceholder('Enter username');
        this.inp_UserPassword = page.getByPlaceholder('Enter password');

        //Button
        this.btn_Login = page.locator('#loginButton');
        this.btn_Logout = page.locator('#sign-out-button');

        //Icon
        this.icon_UserImage = page.locator('.user-image');

        //Image
        this.str_img_LoginAuthenticationSpinnerProgressBar = '//div[@class="rfx-spinner"]';
        this.img_LoginAuthenticationSpinnerProgressBar = page.locator(this.str_img_LoginAuthenticationSpinnerProgressBar);
        

    }

    /**Set User Name on Login Page - By Rahul Nivangune -09-May-2024*/
    async setUserName(userName: string) {
        await this.inp_UserName.fill(userName);
    }

    /**Set User Password on Login Page - By Rahul Nivangune -09-May-2024*/
    async setUserPassword(userPassword: string) {
        await this.inp_UserPassword.fill(userPassword);
    }

    /**Click on Login Button on Login Page - By Rahul Nivangune -09-May-2024*/
    async clickLoginButton() {
        await this.btn_Login.click();
    }
    /**Click on User Image Icon Button on Login Page - By Rahul Nivangune -09-May-2024*/
    async clickUserImageIconButton() {
        await this.icon_UserImage.click();
    }

    /**Click on Logout Button on Login Page - By Rahul Nivangune -09-May-2024*/
    async clickLogoutButton() {
        await this.btn_Logout.click();
    }

    async waitForLoginAuthenticationSpinnerProgressBarToDisappear() {
        await this.page.waitForSelector(this.str_img_LoginAuthenticationSpinnerProgressBar, {state: "hidden",timeout:5000})
        await this.img_LoginAuthenticationSpinnerProgressBar.isHidden();
    }
    /**
    * Author: Rahul Nivangune
    * Date: 09-May-2024
    * Module: Login
    * Excel Parameter:username,password
    ** Description :This method used to Login the application..
    */
    async doLogin(username: string, password: string) {
        await this.setUserName(username);
        await this.setUserPassword(password);
        await this.clickLoginButton();
        await this.waitForLoginAuthenticationSpinnerProgressBarToDisappear();
    }
        
    /** 
    * Author: Rahul Nivangune
    * Date: 09-May-2024
    * Module: Login
    * ExcelParameter:
    * Description :This method used to Logout the application..
    */
    async doLogout() {
        await this.clickUserImageIconButton();
        await this.clickLogoutButton();
    }
}