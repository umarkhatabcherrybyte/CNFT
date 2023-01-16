import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import styled from "styled-components";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, Minimize } from "@mui/icons-material";
const rows = [{}, {}, {}];
const ExcelSpreadSheet = forwardRef(({ checked }, ref) => {
  let defaultRowCount = 5; // No of rows
  let defaultColCount = 5; // No of cols
  const SPREADSHEET_DB = "spreadsheet_db";

  useImperativeHandle(ref, () => ({
    resetData() {
      // confirm(
      //     "This will erase all data and set default configs. Are you sure?"
      //   )
      if (true) {
        localStorage.removeItem(SPREADSHEET_DB);
        defaultRowCount = 5; // No of rows
        defaultColCount = 5;
        createSpreadsheet();
      }
    },
    convertToJson() {
      return getData();
    },
  }));

  const initializeData = () => {
    const data = [];
    for (let i = 0; i <= defaultRowCount; i++) {
      const child = [];
      for (let j = 0; j <= defaultColCount; j++) {
        if (i == 0) {
          if (j == 1) child.push("ImageName");
          else child.push("Col" + (j - 1));
        } else {
          child.push("");
        }
      }
      data.push(child);
    }
    return data;
  };

  const getData = () => {
    let data = localStorage.getItem(SPREADSHEET_DB);
    if (data === undefined || data === null) {
      return initializeData();
    }
    return JSON.parse(data);
  };

  const saveData = (data) => {
    localStorage.setItem(SPREADSHEET_DB, JSON.stringify(data));
  };

  const createHeaderRow = () => {
    const tr = document.createElement("tr");
    const data = getData();
    tr.setAttribute("id", "h-0");
    for (let i = 0; i <= defaultColCount; i++) {
      const th = document.createElement("th");
      th.setAttribute("id", `h-0-${i}`);
      th.setAttribute("class", `${i === 0 ? "" : "column-header"}`);
      // th.innerHTML = i === 0 ? `` : `Col ${i}`;
      if (i !== 0) {
        const headerColDiv = document.createElement("div");
        headerColDiv.setAttribute("class", "column-header-div");

        const input = document.createElement("input");

        input.value = data[0][i];
        input.setAttribute("class", "column-header-span");
        input.setAttribute("id", `c-0-${i}`);
        const dropDownDiv = document.createElement("div");
        dropDownDiv.setAttribute("class", "dropdown row-control-btn-div");

        dropDownDiv.innerHTML = `
                    <svg class="dropbtn addBtn" id="col-dropbtn-${i}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28">
                        <g class="rowAdd" id="col-dropbtn-${i}" data-name="Group 375" transform="translate(-216 -1374)">
                        <circle class="rowAdd" id="col-dropbtn-${i}" data-name="Ellipse 24" cx="14" cy="14" r="14" transform="translate(216 1374)" fill="#fff"/>
                        <path  class="rowAdd" id="col-dropbtn-${i}" data-name="Icon ionic-ios-add" d="M20.822,14.5H16.074V9.752a.787.787,0,0,0-1.574,0V14.5H9.752a.787.787,0,0,0,0,1.574H14.5v4.748a.787.787,0,1,0,1.574,0V16.074h4.748a.787.787,0,1,0,0-1.574Z" transform="translate(215.035 1373.035)"/>
                        </g>
                    </svg>
                    <svg class="dropbtn addBtn" id="col-dropbtn-${i}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28">
                        <g  class="rowDel" id="col-dropbtn-${i}" data-name="Group 374" transform="translate(-251 -1374)">
                            <circle  class="rowDel" id="col-dropbtn-${i}" data-name="Ellipse 25" cx="14" cy="14" r="14" transform="translate(251 1374)" fill="#fff"/>
                            <path  class="rowDel" id="col-dropbtn-${i}" data-name="Icon ionic-ios-add" d="M20.822,14.5H16.074V9.752a.787.787,0,0,0-1.574,0V14.5H9.752a.787.787,0,0,0,0,1.574H14.5v4.748a.787.787,0,1,0,1.574,0V16.074h4.748a.787.787,0,1,0,0-1.574Z" transform="translate(265.035 1366.416) rotate(45)"/>
                        </g>
                    </svg>
                    </div>`;
        headerColDiv.appendChild(input);
        headerColDiv.appendChild(dropDownDiv);
        th.appendChild(headerColDiv);
      }
      tr.appendChild(th);
    }
    return tr;
  };

  const createTableBodyRow = (rowNum) => {
    const tr = document.createElement("tr");
    tr.setAttribute("id", `r-${rowNum}`);
    for (let i = 0; i <= defaultColCount; i++) {
      const cell = document.createElement(`${i === 0 ? "th" : "td"}`);
      if (i === 0) {
        cell.contentEditable = false;
        const span = document.createElement("span");
        const dropDownDiv = document.createElement("div");
        span.innerHTML = rowNum;
        dropDownDiv.setAttribute("class", "dropdown row-control-btn-div");
        dropDownDiv.innerHTML = `
                    <svg class="dropbtn addBtn" id="row-dropbtn-${rowNum}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28">
                        <g class="rowAdd" id="row-dropbtn-${rowNum}" data-name="Group 375" transform="translate(-216 -1374)">
                        <circle class="rowAdd" id="row-dropbtn-${rowNum}" data-name="Ellipse 24" cx="14" cy="14" r="14" transform="translate(216 1374)" fill="#fff"/>
                        <path  class="rowAdd" id="row-dropbtn-${rowNum}" data-name="Icon ionic-ios-add" d="M20.822,14.5H16.074V9.752a.787.787,0,0,0-1.574,0V14.5H9.752a.787.787,0,0,0,0,1.574H14.5v4.748a.787.787,0,1,0,1.574,0V16.074h4.748a.787.787,0,1,0,0-1.574Z" transform="translate(215.035 1373.035)"/>
                        </g>
                    </svg>
                    <svg class="dropbtn addBtn" id="row-dropbtn-${rowNum}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28">
                        <g  class="rowDel" id="row-dropbtn-${rowNum}" data-name="Group 374" transform="translate(-251 -1374)">
                            <circle  class="rowDel" id="row-dropbtn-${rowNum}" data-name="Ellipse 25" cx="14" cy="14" r="14" transform="translate(251 1374)" fill="#fff"/>
                            <path  class="rowDel" id="row-dropbtn-${rowNum}" data-name="Icon ionic-ios-add" d="M20.822,14.5H16.074V9.752a.787.787,0,0,0-1.574,0V14.5H9.752a.787.787,0,0,0,0,1.574H14.5v4.748a.787.787,0,1,0,1.574,0V16.074h4.748a.787.787,0,1,0,0-1.574Z" transform="translate(265.035 1366.416) rotate(45)"/>
                        </g>
                    </svg>
                </div>`;
        cell.appendChild(span);
        cell.appendChild(dropDownDiv);
        cell.setAttribute("class", "row-header");
      } else {
        cell.contentEditable = checked;
      }
      cell.setAttribute("id", `r-${rowNum}-${i}`);
      // cell.id = `${rowNum}-${i}`;
      tr.appendChild(cell);
    }
    return tr;
  };

  const createTableBody = (tableBody) => {
    for (let rowNum = 1; rowNum <= defaultRowCount; rowNum++) {
      tableBody.appendChild(createTableBodyRow(rowNum));
    }
  };

  // Fill Data in created table from localstorage
  const populateTable = () => {
    const data = getData();
    if (data === undefined || data === null) return;

    for (let i = 1; i < data.length; i++) {
      for (let j = 1; j < data[i].length; j++) {
        const cell = document.getElementById(`r-${i}-${j}`);
        cell.innerHTML = data[i][j];
      }
    }
  };

  // Utility function to add row
  const addRow = (currentRow, direction) => {
    let data = getData();
    const colCount = data[0].length;
    const newRow = new Array(colCount).fill("");
    if (direction === "top") {
      data.splice(currentRow, 0, newRow);
    } else if (direction === "bottom") {
      data.splice(currentRow + 1, 0, newRow);
    }
    defaultRowCount++;
    saveData(data);
    createSpreadsheet();
  };

  // Utility function to delete row
  const deleteRow = (currentRow) => {
    let data = getData();
    data.splice(currentRow, 1);
    defaultRowCount++;
    saveData(data);
    createSpreadsheet();
  };

  // Utility function to add columns
  const addColumn = (currentCol, direction) => {
    let data = getData();
    if (direction === "left") {
      data[0].splice(currentCol, 0, "NewCol");
    } else if (direction === "right") {
      data[0].splice(currentCol + 1, 0, "NewCol");
    }

    for (let i = 1; i <= defaultRowCount; i++) {
      if (direction === "left") {
        data[i].splice(currentCol, 0, "");
      } else if (direction === "right") {
        data[i].splice(currentCol + 1, 0, "");
      }
    }
    defaultColCount++;
    saveData(data);
    createSpreadsheet();
  };

  // Utility function to delete column
  const deleteColumn = (currentCol) => {
    let data = getData();
    for (let i = 0; i <= defaultRowCount; i++) {
      data[i].splice(currentCol, 1);
    }
    defaultColCount++;
    saveData(data);
    createSpreadsheet();
  };

  const createSpreadsheet = () => {
    const spreadsheetData = getData();
    defaultRowCount = spreadsheetData.length - 1 || defaultRowCount;
    defaultColCount = spreadsheetData[0].length - 1 || defaultColCount;

    const tableHeaderElement = document.getElementById("table-headers");
    const tableBodyElement = document.getElementById("table-body");

    const tableBody = tableBodyElement.cloneNode(true);
    tableBodyElement.parentNode.replaceChild(tableBody, tableBodyElement);
    const tableHeaders = tableHeaderElement.cloneNode(true);
    tableHeaderElement.parentNode.replaceChild(
      tableHeaders,
      tableHeaderElement
    );

    tableHeaders.innerHTML = "";
    tableBody.innerHTML = "";

    tableHeaders.appendChild(createHeaderRow(defaultColCount));
    createTableBody(tableBody, defaultRowCount, defaultColCount);

    populateTable();

    // attach focusout event listener to whole table body container
    tableBody.addEventListener("focusout", function (e) {
      if (e.target && e.target.nodeName === "TD") {
        let item = e.target;
        const indices = item.id.split("-");
        let spreadsheetData = getData();
        spreadsheetData[indices[1]][indices[2]] = item.innerHTML;
        saveData(spreadsheetData);
      }
    });

    // Attach click event listener to table body
    tableBody.addEventListener("click", function (e) {
      if (e.target) {
        if (
          e.target.className?.baseVal === "dropbtn addBtn" ||
          e.target.className?.baseVal === "rowAdd"
        ) {
          const idArr = e.target.id.split("-");
          addRow(parseInt(idArr[2]), "bottom");
        } else if (
          e.target.className?.baseVal === "dropbtn delBtn" ||
          e.target.className?.baseVal === "rowDel"
        ) {
          const idArr = e.target.id.split("-");
          deleteRow(parseInt(idArr[2]));
        }
      }
    });
    tableHeaders.addEventListener("focusout", function (e) {
      if (e.target && e.target.nodeName === "INPUT") {
        let item = e.target;
        const indices = item.id.split("-");
        let spreadsheetData = getData();
        if (item.value == "") {
          e.target.value = spreadsheetData[indices[1]][indices[2]];
          return;
        }
        spreadsheetData[indices[1]][indices[2]] = item.value;
        saveData(spreadsheetData);
      }
    });
    // Attach click event listener to table headers
    tableHeaders.addEventListener("click", function (e) {
      if (e.target) {
        if (
          e.target.className?.baseVal === "dropbtn addBtn" ||
          e.target.className?.baseVal === "rowAdd"
        ) {
          const idArr = e.target.id.split("-");
          addColumn(parseInt(idArr[2]), "right");
        } else if (
          e.target.className?.baseVal === "dropbtn delBtn" ||
          e.target.className?.baseVal === "rowDel"
        ) {
          const idArr = e.target.id.split("-");
          deleteColumn(parseInt(idArr[2]));
        }
      }
    });
  };
  useEffect(() => {
    // createSpreadsheet();
  }, []);
  useEffect(() => {
    let elementList = document.querySelectorAll(
      '[contenteditable="' + !checked + '"]'
    );
    elementList.forEach(function (element) {
      element.contentEditable = checked;
    });
  }, [checked]);
  // window.onclick = function (event) {
  //   if (!event.target.matches(".dropbtn")) {
  //     var dropdowns = document.getElementsByClassName("dropdown-content");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains("show")) {
  //         openDropdown.classList.remove("show");
  //       }
  //     }
  //   }
  // };
  return (
    <ExcelSpreadSheetStyled>
      {/* <section className="spreadsheet">
        <table className="spreadsheet__table" id="table-main">
          <thead
            className="spreadsheet__table--headers"
            id="table-headers"
          ></thead>
          <tbody className="spreadsheet__table--body" id="table-body"></tbody>
        </table>
      </section> */}
      <Table
        sx={{
          borderRadius: "15px",
          minWidth: 650,
          "& th": {
            background: "var(--box-color)",
          },
          "& td": {
            background: "var(--dark-box-color)",
          },
          "& th , td": {
            color: "#fff",
          },
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="left">Head</TableCell>
            <TableCell align="left">Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <Box
                  className="flex_align"
                  sx={{
                    "& .icon": {
                      background: "#fff",
                      mr: 2,
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Box className="icon">
                    <Add sx={{ color: "#000" }} />
                  </Box>
                  <Box
                    className="icon"
                    sx={{
                      alignItems: "start",
                    }}
                  >
                    <Minimize sx={{ color: "#000" }} />
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="left">1.png</TableCell>
              <TableCell align="left">Black</TableCell>
              <TableCell align="left">Yellow</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ExcelSpreadSheetStyled>
  );
});
export default ExcelSpreadSheet;

const ExcelSpreadSheetStyled = styled.section`
  .spreadsheet {
    color: black;
    overflow: auto;
    max-height: 400px;
    border-radius: 15px;
  }

  .spreadsheet table td {
    color: white;
  }
  .spreadsheet td,
  .spreadsheet th,
  .spreadsheet tr {
    border: 0.05rem solid rgba(197, 197, 197, 0.486);
    height: 1rem;
    border-spacing: 0rem;
  }
  .spreadsheet table {
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
  }
  .spreadsheet th {
    font-weight: 500;
  }

  .spreadsheet thead {
    background-color: rgba(220, 220, 220, 0.3);
  }

  .spreadsheet td {
    min-width: 3rem;
    padding: 0.2rem 0.5rem;
  }

  .spreadsheet th {
    padding: 0.2rem 0.4rem;
  }
  .spreadsheet th > .dropdown {
    float: right;
  }

  .spreadsheet tbody th {
    min-width: 5rem;
    background-color: rgba(220, 220, 220, 0.4);
    color: white;
  }

  /* Dropdown Button */
  .dropbtn {
    color: rgba(0, 0, 0, 0.5);
    padding: 0rem 0.1rem;
    cursor: pointer;
    transition: ease 0.4s;
  }

  /* Dropdown button on hover & focus */
  .dropbtn img {
    height: 2rem;
  }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 16rem;
    box-shadow: 0 0.5rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  /* Links inside the dropdown */
  .dropdown-content p {
    color: rgb(133, 132, 132);
    padding: 0.4rem;
    font-weight: 400;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content p:hover {
    background-color: #ddd;
  }

  /* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
  .show {
    display: block;
  }

  .column-header-span {
    cursor: pointer;
    border: none;
    background: transparent;
    width: 100%;
    color: white;
    min-width: 30px;
  }

  .spreadsheet-controls {
    margin-left: 0.5rem;
  }

  .reset-btn,
  .convert-btn {
    padding: 0.5rem 1.5rem;
    background-color: #d9534f;
    color: #fff;
    border-color: #d43f3a;
    border-width: 1px;
    border-style: solid;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: ease 0.3s;
  }

  .reset-btn:hover,
  .convert-btn:hover {
    color: #fff;
    background-color: #c9302c;
    border-color: #ac2925;
  }

  .btn-reset {
    padding: 20px 0px;
    display: flex;
    align-items: center;
    color: white;
  }
  .column-header-div {
    display: flex;
  }
  .row-control-btn-div {
    display: flex;
    align-items: center;
  }
  .col-control-btn-div {
    width: 24px;
  }
  .down-json-btn {
    background: transparent;
    border: none;
    color: white;
    padding-left: 10px;
  }
`;
