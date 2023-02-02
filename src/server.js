const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const excel4node = require("excel4node");
const dbMysql = require("./config/dbMysql");
const dbMssql = require("./config/dbMssql");

app.get("/dow", (req, res) => {
  const testJsonToXlsx = async () => {
    const workbook = new excel4node.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    const resultSQL = await dbMssql.query(process.env.SELECT_BASE, {
      type: dbMssql.QueryTypes.SELECT,c
    });

    const headers = Object.keys(resultSQL[0]);

    headers.forEach((header, index) => {
      worksheet.cell(1, index + 1).string(header);
    });
    resultSQL.forEach((data, dataIndex) => {
      headers.forEach((header, headerIndex) => {
        const value = data[header];
        if (typeof value === "number" || typeof value === 'object') {
          worksheet
            .cell(dataIndex + 2, headerIndex + 1)
            .string(JSON.stringify(value));
        } else {
          worksheet.cell(dataIndex + 2, headerIndex + 1).string(value);
        }
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");


    workbook.write("data.xlsx", res);

    console.log(resultSQL);
  };
  testJsonToXlsx();
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
