import { teacher } from "@prisma/client";
import ExcelJS from "exceljs";

export const ExportTeacherTable = (timeSlotData, allTeacher:teacher[], semester:string, academicYear:string) => {
      const teachers = [...allTeacher]
      const addHours = (time: Date, hours: number): Date => {
        //set เวลาด้วยการบวกตาม duration และคูณ hours ถ้าจะให้ skip ไปหลายชั่วโมง
        time.setMinutes(time.getMinutes() + timeSlotData.Duration * hours);
        return time;
      };
      const mapTime = () => {
        let map = [
          ...timeSlotData.SlotAmount.map((hour) => {
            //สร้าง format เวลา ตัวอย่าง => 2023-07-27T17:24:52.897Z
            let timeFormat = `0${timeSlotData.StartTime.Hours}:${
              timeSlotData.StartTime.Minutes == 0
                ? "00"
                : timeSlotData.StartTime.Minutes
            }`;
            //แยก เวลาเริ่มกับเวลาจบไว้ตัวแปรละอัน
            const timeStart = new Date(`2024-03-14T${timeFormat}:00.000Z`);
            const timeEnd = new Date(`2024-03-14T${timeFormat}:00.000Z`);
            //นำไปใส่ใน function addHours เพื่อกำหนดเวลาเริ่ม-จบ
            let start = addHours(timeStart, hour - 1); //เวลาเริ่มใส่ hours-1 เพราะคาบแรกไม่ต้องการให้บวกเวลา
            let end = addHours(timeEnd, hour); //จะต้องมากกว่า start ตาม duration ที่กำหนดไว้
            //แปลงจาก 2023-07-27T17:24:52.897Z เป็น 17:24 โดยใช้ slice
            return {
              Start: start.toISOString().slice(11, 16),
              End: end.toISOString().slice(11, 16),
            };
          }),
        ];
        return map;
      };
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("ครู", {pageSetup :{paperSize: 9, orientation:'landscape'}}); //add worksheet to created workbook
    const generateTableHead = [
      "ชั่วโมงที่",
      ...timeSlotData.SlotAmount.map((item) => item),
    ];
    const alignCell = (v:string, h:string): object => {
      return {
        vertical: v,
        horizontal: h,
      };
    }
    let slotLength = timeSlotData.SlotAmount.length+1 //เก็บว่ามีกี่คาบพร้อมบวกหนึ่ง จะได้จำนวนคอลัมน์จริง
    let tableRow = { start: 1, end: 31 }; //เริ่ม-จบที่ excel แถวเท่าไหร่
    //เก็บแถวที่จะต้องตีเส้นตาราง
    let keepCellRow = []
    let keepCellCol = []
    let keepLastRowLine = []
    //เก็บแถวที่จะต้องตีเส้นตาราง
    let keepTimeLine = [] //เก็บแถวที่ต้องแมพเวลาลงตารางเพื่อปรับ font
    //Brute force แบบ 300%
    for (let i = 0; i < teachers.length; i++) {
      let tch = teachers[i]; //นำข้อมูลของครูมาใช้ในแต่ละรอบ
      for (let j = tableRow.start; j <= tableRow.end; j++) { //loop j คือ loop เขียนข้อมูลลงแถวในแต่ละชุด
        if (j == tableRow.start) {
          const rowAfirst = sheet.getCell(`A${tableRow.start}`);
          const rowEfirst = sheet.getCell(`E${tableRow.start}`);
          rowAfirst.alignment = alignCell("middle", "left")
          rowEfirst.alignment = alignCell("middle", "left")
          rowAfirst.value = `ตารางสอน ${tch.Prefix}${tch.Firstname} ${tch.Lastname}`;
          rowEfirst.value = `ภาคเรียนที่ ${semester}/${academicYear}`;
        } else if (j == tableRow.start + 1) {
          const row = sheet.getRow(tableRow.start + 1);
          row.alignment = alignCell("middle", "center")
          row.values = generateTableHead;
          keepCellRow.push(tableRow.start + 1)
        } else if (j == tableRow.start + 2) {
          const row = sheet.getRow(tableRow.start + 2);
          row.alignment = alignCell("middle", "center")
          row.values = [
            "วัน / เวลา", 
            ...mapTime().map(item => `${item.Start}-${item.End}`)
          ];
          keepCellCol.push(tableRow.start + 2)
          keepTimeLine.push(tableRow.start + 2)
        } else if (j == tableRow.start + 3) {
          const row = sheet.getRow(tableRow.start + 3);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellRow.push(tableRow.start + 3)
        } else if (j == tableRow.start + 4) {
          const row = sheet.getRow(tableRow.start + 4);
          row.alignment = alignCell("middle", "center")
          row.values = ["จันทร์", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 4)
        } else if (j == tableRow.start + 5) {
          const row = sheet.getRow(tableRow.start + 5);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 5)
        } else if (j == tableRow.start + 6) {
          const row = sheet.getRow(tableRow.start + 6);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellRow.push(tableRow.start + 6)
        } else if (j == tableRow.start + 7) {
          const row = sheet.getRow(tableRow.start + 7);
          row.alignment = alignCell("middle", "center")
          row.values = ["อังคาร", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 7)
        } else if (j == tableRow.start + 8) {
          const row = sheet.getRow(tableRow.start + 8);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 8)
        } else if (j == tableRow.start + 9) {
          const row = sheet.getRow(tableRow.start + 9);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellRow.push(tableRow.start + 9)
        } else if (j == tableRow.start + 10) {
          const row = sheet.getRow(tableRow.start + 10);
          row.alignment = alignCell("middle", "center")
          row.values = ["พุธ", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 10)
        } else if (j == tableRow.start + 11) {
          const row = sheet.getRow(tableRow.start + 11);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 11)
        } else if (j == tableRow.start + 12) {
          const row = sheet.getRow(tableRow.start + 12);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellRow.push(tableRow.start + 12)
        } else if (j == tableRow.start + 13) {
          const row = sheet.getRow(tableRow.start + 13);
          row.alignment = alignCell("middle", "center")
          row.values = ["พฤหัสบดี", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 13)
        } else if (j == tableRow.start + 14) {
          const row = sheet.getRow(tableRow.start + 14);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 14)
        } else if (j == tableRow.start + 15) {
          const row = sheet.getRow(tableRow.start + 15);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellRow.push(tableRow.start + 15)
        } else if (j == tableRow.start + 16) {
          const row = sheet.getRow(tableRow.start + 16);
          row.alignment = alignCell("middle", "center")
          row.values = ["ศุกร์", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 16)
        } else if (j == tableRow.start + 17) {
          const row = sheet.getRow(tableRow.start + 17);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
          keepCellCol.push(tableRow.start + 17)
          keepLastRowLine.push(tableRow.start + 17)
        } else if (j == tableRow.start + 18) {
          const row = sheet.getRow(tableRow.start + 18);
          row.alignment = alignCell("middle", "center")
          row.values = ["", ...timeSlotData.SlotAmount.map(item => "")];
        }else if (j == tableRow.start + 21) {
          const rowlast = sheet.getCell(`B${tableRow.start + 21}`);
          rowlast.alignment = {
            vertical: "middle",
            horizontal: "left",
          };
          rowlast.value = `ลงชื่อ..........................................รองผอ.วิชาการ  ลงชื่อ..........................................ผู้อำนวยการ`;
        }
      }
      tableRow = { start: tableRow.start + 31, end: tableRow.end + 31 };
    }
    // console.log(keepCellRow)
    sheet.eachRow(function (row, rowNumber) {
        if(keepCellRow.includes(rowNumber)){
          row.eachCell(function (cell, colNumber) {
            if(colNumber == 1){
              row.getCell(colNumber).border = {
                top: { style: "thin" },
                right: { style: "thin" },
                left: { style: "thin" },
              };
            }
            else if(colNumber <= slotLength){
              row.getCell(colNumber).border = {
                top: { style: "thin" },
                right: { style: "thin" },
              };
            }
          });
        }
        if(keepCellCol.includes(rowNumber)){
          row.eachCell(function (cell, colNumber) {
            if(colNumber == 1){
              row.getCell(colNumber).border = {
                right: { style: "thin" },
                left: { style: "thin" },
              };
            }
            else if(colNumber <= slotLength){
              row.getCell(colNumber).border = {
                right: { style: "thin" },
              };
            }
          });
        }
        if(keepLastRowLine.includes(rowNumber)){
          row.eachCell(function (cell, colNumber) {
            if(colNumber == 1){
              row.getCell(colNumber).border = {
                bottom: { style: "thin" },
                right: { style: "thin" },
                left: { style: "thin" },
              };
            }
            else if(colNumber <= slotLength){
              row.getCell(colNumber).border = {
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
            }
          });
        }
    });
    sheet.eachRow(function (row, rowNumber) {
      row.font = { name: "TH SarabunPSK", size: keepTimeLine.includes(rowNumber) ? 12 : 14 };
      row.height = 16.5;
      row.eachCell(function (col, colNumber) {
        if(colNumber == 1){
            row.getCell(colNumber).font = { name: "TH SarabunPSK", size: 14 };
        }
      })
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      (anchor.href = url), (anchor.download = "ตารางครู.xlsx");
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
}