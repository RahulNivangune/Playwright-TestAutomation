import { Page } from "@playwright/test";
import { CommonPage } from "../pages/common/CommonPage";

/**
 * @ScriptName : BaseTest
 * @Description : This class will load all test data, load all objects,
 *              initialize web driver, start reports. Contains generic
 *              functionalities like open browser, login/logout
 * @Author : Framework Developer
 */

export class BaseTest {
    protected readonly page:Page;   
    
    /**BaseTest Constructor*/
    constructor(page:Page) {        
        this.page = page;
    }

    /**Load Application Url*/
    async loadBaseUrl(appUrl: string){
        await this.page.goto(appUrl);
    }

     /**Tear Down Web Environment */
    async tearDownWebEnvironment(){
        await this.page.close();
    }
}
