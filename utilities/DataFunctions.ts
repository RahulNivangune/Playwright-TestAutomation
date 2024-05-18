const ExcelJS = require('exceljs');
const path = require('path');
const PropertiesReader = require('properties-reader');

/**
 * @ClassName : DataFunctions
 * @Description :
 * @Author : Framework Developer
 */
export class DataFunctions {

    /**
     * @Method : loadTestData( String sheetName)
     * @Description : Load Data from Excel for the running testCase and return
     *              as Object array
     * @author : Framework Developer
     */
    public async loadTestData(filePath: string, fileName: string, sheetName: string) {
        let excelFile =  path.join(process.cwd() + filePath, fileName + ".xlsx");
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(path.join(excelFile));
        const worksheet = workbook.getWorksheet(sheetName);
        const dataMap = new Map();
        worksheet.eachRow(async (row, rowNumber) => {
            let key = row.getCell(1).value;
            let value = row.getCell(2).value;
            console.log("key->" + key);
            console.log("value->" + value);
            dataMap.set(key, value);
        });

        console.log("loadTestData->" + dataMap);
        return dataMap;

    }
    
      /**
	 * @Method : loadPrpertiesFileTestData
	 * @param :fileName - properties file Name
	 * @Description : Load data from Properties file for the running testCase
	 * @author : Framework Developer
	 */
	public async loadPropertiesFileTestData(filePath: string, fileName: string) {
        let propertiesFile =  path.join(process.cwd() + filePath, fileName + ".properties");
        const propertiesData = await PropertiesReader(propertiesFile);
        console.log("loadPropertiesFileTestData->" + propertiesData);
		return propertiesData;
	}

    /**
     * @Method : loadJSONTestData( String fileName)
     * @Description : Load Data from JSON for the running testCase and return
     *              as Object array
     * @author : Framework Developer
     */
    public async loadJSONTestData(filePath: string, fileName: string) {
        let jsonFile =  path.join(process.cwd() + filePath, fileName + ".json");
        const dataMap =JSON.parse(JSON.stringify(require(jsonFile)));       
        console.log("loadJSONTestData->" + dataMap);
        return dataMap;

    }

}


