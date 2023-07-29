import * as XLSX from "xlsx";

export interface IExcelRow {
  [key: string]: string | number;
}

export const exportExcel = (data: IExcelRow[]) => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const excelData = XLSX.write(workbook, { type: "binary" });

  const buffer = new ArrayBuffer(excelData.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < excelData.length; i++) {
    view[i] = excelData.charCodeAt(i) & 0xff;
  }

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.xlsx";
  document.body.appendChild(link);
  link.click();
};
