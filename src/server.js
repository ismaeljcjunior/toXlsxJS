const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("nome planilha");
const dbMysql = require("./config/dbMysql");
const dbMssql = require("./config/dbMssql");

const testJsonToXlsx = async () => {
  const headerNames = new Set()
  let rouIndex = 2;

  const resultSQL = await dbMssql.query(process.env.SELECT_BASE, {
    type: dbMssql.QueryTypes.SELECT,
  });
  resultSQL.forEach((obj) => { Object.keys(obj).forEach((key) => {headerNames.add(key)}) })

  console.log(headerNames);
};
testJsonToXlsx();

// const headingColumNanes = ["nome", "email", "phone"];
// let headingColumNanesIndex = 1;
// headingColumNanes.forEach((heading) => {
//   ws.cell(1, headingColumNanesIndex++).string(heading);
// });
// let rowIndex = 2;
// data.forEach((record) => {
//   let columnIndex = 1;
//   Object.keys(record).forEach((columnName) => {
//     ws.cell(rowIndex, columnIndex++).string(record[columnName]);
//   });
//   rowIndex++;
// });
// wb.write('teste.xlsx')
