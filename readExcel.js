var pathToFile = './excelDocs/testSheet.xlsx';
var XLSX = require('xlsx');

var workbook = XLSX.readFile(pathToFile);
console.log("\n ~~~~~~~~~~~~~~~~~~~ XLSX Node module:",  workbook);
