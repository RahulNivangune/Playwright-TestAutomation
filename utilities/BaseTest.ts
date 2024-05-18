import { Page } from "@playwright/test";
import { DataFunctions } from "../utilities/DataFunctions";

/**
 * @ScriptName : BaseTest
 * @Description : This class will load all test data, load all objects,
 *              initialize web driver, start reports. Contains generic
 *              functionalities like open browser, login/logout
 * @Author : Framework Developer
 */

export class BaseTest {
    protected readonly page:Page;   
    objDataFunctions: DataFunctions;
    
    // /**BaseTest Constructor*/
    // constructor(page:Page) {        
    //     this.page = page;
    // }

    /**Tear Down Web Environment */
    async initializeWebEnvironment(){
        this.objDataFunctions = new DataFunctions();
    }

    /**Load Application Url*/
    async loadBaseUrl(page:Page,appUrl: string){
        await page.goto(appUrl);
    }

     /**Tear Down Web Environment */
    async tearDownWebEnvironment(page:Page){
        await page.close();
    }

     /**Load Test Data */
     async loadTestData(fileName: string, sheetName: string){
        let filePath = "\\resources\\testdata\\AUTOM\\excel\\TaskManager\\";
        const dataMap = await this.objDataFunctions.loadTestData(filePath,fileName,sheetName);
        console.log("Load Test Data ->" + dataMap);
        return dataMap;
    }

    /**Load Test Data */
    async loadTestSheetData(fileName: string){
        let filePath = "\\resources\\testdata\\AUTOM\\excel\\TaskManager\\";
        const dataMap = await this.objDataFunctions.loadTestData(filePath,fileName,fileName);
        console.log("Load Test Data ->" + dataMap);
        return dataMap;
    }

    /**Load Master Test Data Properties */
    async loadMasterTestData(){
        let filePath = "\\resources\\testdata\\AUTOM\\properties\\";
        let fileName ="masterdata";
        const propertiesData = await this.objDataFunctions.loadPropertiesFileTestData(filePath,fileName);
        console.log("Master Properties file Test Data ->" + propertiesData);
        return propertiesData;
    }

    /**Load JSON Test Data */
    async loadJSONTestData(fileName: string){
        let filePath = "\\resources\\testdata\\AUTOM\\excel\\TaskManager\\";
        const dataMap = await this.objDataFunctions.loadJSONTestData(filePath,fileName);
        console.log("Load JSON Test Data ->" + dataMap);
        return dataMap;
    }
}
