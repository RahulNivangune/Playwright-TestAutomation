const ExcelJS = require('exceljs');
const path = require('path');


async function excelFile(filepath,searchtext) {
    const workbook = new ExcelJS.Workbook();   
    readFile(workbook,searchtext);
    writeFile(workbook,searchtext);
}

 //Read file
async function readFile(workbook,searchtext) {     
    await workbook.xlsx.readFile(path.join(process.cwd()+"\\resources\\testdata\\AUTOM\\excel\\TaskManager\\", "TC-419"+".xlsx"));
    const worksheet = workbook.getWorksheet("TC-419");
    const dataMap  = new Map();
    worksheet.eachRow(async (row, rowNumber) => {     
        var key= row.getCell(1).value;
        var value= row.getCell(2).value;
        console.log("key->" + key);
        console.log("value->" + value);
        dataMap.set(key,value);
    });    
    console.log("dataMap->" + dataMap);
    return dataMap;
 }

 //Write file
 async function writeFile(workbook,searchtext) {
    const worksheet = workbook.getWorksheet("TC-419");
    const cell = worksheet.getCell(1,2);
    cell.value="Data"//replace new value
    await workbook.xlsx.writeFile(path.join(process.cwd()+"\\resources\\testdata\\AUTOM\\excel\\TaskManager\\", "TC-419"+".xlsx"));
    console.log("dataMap->" + dataMap);
 }


 async function MapValue() {
    const fruits = new Map();
    // Set Map Values
    fruits.set("apples", 500);
    fruits.set("bananas", 300);
    fruits.set("oranges", 200);
    console.log("fruits->" + fruits);
    console.log("Apple vale->" + fruits.get('bananas'));

    let map1 = new Map([
        [1 , 10], [2 , 20] ,
        [3, 30],[4, 40]
        ]);
         
    console.log("Map1: "+map1);
 }

 readFile();
 //MapValue();