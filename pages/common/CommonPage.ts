import { FrameLocator, Locator, Page } from "@playwright/test";
import { TIMEOUT } from "dns";
/**
 * @Author : Rahul Nivangune 
 * @Date : 09-May-2024
 * @Use : This Page will contain most of Application Common Page. 
 * Path: Application Common Page
 */
export class CommonPage{

    /*******Start Global Variables**************************/
    protected readonly page: Page;
    str_lnk_SubMenuExpanded: string;
    str_img_ClockLoader : string;
    str_img_DefaultProgressLoader : string;

    img_ClockLoader : Locator;    
    img_DefaultProgressLoader : Locator;
    /*******End Global Variables*****************************/

    /**CommonPage Constructor*/
    constructor(page: Page) {
        this.page = page;       

        //Input    

        //Link   
        this.str_lnk_SubMenuExpanded ='//mat-expansion-panel[@id="##SubMenuId##"]/mat-expansion-panel-header[@aria-expanded="false"]';

        //Button

        //Image
        this.str_img_ClockLoader = "//div[@class='check-box-container']//div[@class='clock']";
        this.img_ClockLoader = page.locator(this.str_img_ClockLoader);
        this.str_img_DefaultProgressLoader = "//div[contains(@class,'loader loader-default is-active')]";
        this.img_DefaultProgressLoader = page.locator(this.str_img_DefaultProgressLoader);
    }

     /**This method used for goto LHS tree menu structure - By Rahul Nivangune -09-May-2024*/
     async commonGotoLHSTreeMenu(mainMenu: string, subMenu: string, menuLink: string) {
        
        if(mainMenu !== ""){
            await this.page.waitForSelector(mainMenu);
            const mainMenuIsVisible = await this.page.locator(mainMenu).isVisible();
            
            if(mainMenuIsVisible){
                await this.page.locator(mainMenu).click();
            }
        }
        if(subMenu !== ""){
            await this.page.waitForSelector(subMenu);       
            this.str_lnk_SubMenuExpanded =this.str_lnk_SubMenuExpanded.replace("##SubMenuId##", subMenu);
            const subMenuExpanedPanelIsVisible =  await this.page.locator(this.str_lnk_SubMenuExpanded).isVisible();
            if(subMenuExpanedPanelIsVisible){
                await this.page.locator(subMenu).click();
            }
        }
        if(menuLink !== ""){
            await this.page.waitForSelector(menuLink);
            const menuLinkIsVisible = await this.page.locator(menuLink).isVisible();           
            if(menuLinkIsVisible){
                await this.page.locator(menuLink).click();
            }
        }
    }

     /**This method used for goto LHS tree more menu structure - By Rahul Nivangune -09-May-2024*/
     async commonGotoLHSTreeMoreMenu(mainMenu: string, moreMenu: string, subMenu: string, menuLink: string) {
     
     }

     /**This method waits for 'Clock Loader' is disappear - By Rahul Nivangune -09-May-2024*/
     async waitForClockLoaderToDisappear(iframe: FrameLocator ){            
        if(iframe !==null){
            await iframe.locator(this.str_img_ClockLoader).waitFor({state: "hidden",timeout:5000});  
            await iframe.locator(this.str_img_ClockLoader).isHidden();
        }else{
            await this.page.waitForSelector(this.str_img_ClockLoader, {state: "hidden",timeout:5000}); 
            await this.img_ClockLoader.isHidden();
        }
     }

      /**This method waits for 'Default Progress Loader' is disappear - By Rahul Nivangune -09-May-2024*/
      async waitForDefaultProgressLoaderToDisappear(iframe: FrameLocator){
        await iframe.locator(this.str_img_DefaultProgressLoader).waitFor({state: "hidden",timeout:5000});
        if(iframe !==null){
            await iframe.locator(this.str_img_DefaultProgressLoader).isHidden();
        }else{
            await this.page.waitForSelector(this.str_img_DefaultProgressLoader, {state: "hidden",timeout:5000});
            await this.img_DefaultProgressLoader.isHidden();
        }
     }
}