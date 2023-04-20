import React, { useState } from "react";
import styled from "styled-components";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid
} from "@mui/material";
import { Add, HighlightOff } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import { Toast } from "../../shared/Toast";
import MintService from '../../../services/mint.service'
import { List } from "@mui/icons-material";

const ExcelSpreadSheet = ({
  metadataObjects,
  setMetadataObjects,
  metadataObjectProperties,
  setMetadataObjectProperties,
  isWebform
}) => {

  const convertToJson = () => {
    let metadataObjectPropertiesClone = metadataObjects
    let metadataArr = []
    for (let index = 0; index < metadataObjectPropertiesClone.length; index++) {
      let obj = {}
      const element = metadataObjectPropertiesClone[index];
      for (let index = 0; index < metadataObjectProperties.length; index++) {
        obj[metadataObjectProperties[index]] = element[Object.keys(element)[index]]
      }
      metadataArr.push(obj)
    }
    console.log(metadataArr, 'arr')
    return metadataArr
  };

  const addTableRow = () => {
    const rows = [...metadataObjects]
    if (rows.length > 0 && Object.keys(rows[0]).length > 0) {
      let obj = {}
      Object.keys(rows[0]).map((val) => {
        obj[val] = ''
      })
      setMetadataObjects([...metadataObjects, obj])
    }
    else if (metadataObjectProperties.length > 0) {
      let obj = {}
      metadataObjectProperties.map((val, index) => {
        obj['dummy' + index] = ''
        setMetadataObjects([...metadataObjects, obj])
      })
    }
    else {
      Toast('error', 'Please Add a Property First')
    }
  }

  const deleteTableRows = (index) => {
    const rows = [...metadataObjects];
    rows.splice(index, 1);
    setMetadataObjects(rows);
  }

  const addTableCol = () => {
    // console.log('here')
    let metadataObjectsClone = [...metadataObjects]
    for (let index = 0; index < metadataObjectsClone.length; index++) {
      let length = Object.keys(metadataObjectsClone[index]).length + 1
      let name = `dummy` + length
      // console.log(name, 'ddasd')
      metadataObjectsClone[index][name] = "";
    }
    setMetadataObjects(metadataObjectsClone)
    let metadata = [...metadataObjectProperties]
    metadata.push('')
    setMetadataObjectProperties(metadata)
  }

  const updateTableColName = (index, value) => {
    let metadata = [...metadataObjectProperties]
    metadata[index] = value;
    setMetadataObjectProperties(metadata)
  }

  const deleteTableCol = (propIndex) => {
    // console.log(propIndex, 'indexx')
    let metadata = [...metadataObjectProperties]
    let metadataObjectsClone = [...metadataObjects]
    if (propIndex !== -1) {
      metadata.splice(propIndex, 1);
      setMetadataObjectProperties(metadata)
    }
    for (let index = 0; index < metadataObjectsClone.length; index++) {
      let obj = metadataObjectsClone[index]
      // console.log(obj, 'bef')
      delete obj['dummy' + propIndex]
      let newObjlength = Object.keys(obj).length
      let newObj = {}
      for (let index = 0; index < newObjlength; index++) {
        // console.log('HERE')
        let name = `dummy` + index
        newObj[name] = Object.values(obj)[index];
      }
      // console.log(newObj, 'af')
      metadataObjectsClone[index] = newObj
    }
    if (metadata.length == 0) {
      setMetadataObjects([])
    } else {
      setMetadataObjects(metadataObjectsClone)
    }
  }

  const resetData = (e) => {
    let metaDataObjClone = [...metadataObjects]
    let metaDataObjPropertiesClone = [...metadataObjectProperties]
    metaDataObjClone.map(obj => {
      Object.keys(obj).map(val => {
        obj[val] = ''
      })
    })
    for (let index = 0; index < metaDataObjPropertiesClone.length; index++) {
      metaDataObjPropertiesClone[index] = '';
    }
    setMetadataObjects(metaDataObjClone)
    setMetadataObjectProperties(metaDataObjPropertiesClone)
  }

  const viewMetaData = () => {
    console.log(metadataObjects, 'obj')
    console.log(metadataObjectProperties, 'props')
  }

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    let metadataObjectsClone = [...metadataObjects]
    Object.keys(metadataObjectsClone[index]).map(val => {
      if (val == name) {
        metadataObjectsClone[index][val] = value
      }
    })
    metadataObjectsClone[index][name] = value;
    setMetadataObjects(metadataObjectsClone)
  }

  const metaFileDown = async () => {
    let data = JSON.stringify(convertToJson())
    MintService.downloadMetadataFile(data)
      .then((res) => {

      })
      .catch((e) => {
        Toast("error", e.message);
      });
  };

  return (
    <>
      <Grid item xs={12} md={8}>
        <div className={isWebform ? "" : "disabled-div"}>
          <ExcelSpreadSheetStyled>
            <Box className="table-wrap">
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
                    <TableCell align="left">
                      <Box
                        className="flex_align_center"
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
                          <Add sx={{
                            color: "#000",
                            "&:hover": {
                              cursor: "pointer"
                            }
                          }}
                            onClick={addTableRow}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    {
                      metadataObjectProperties.length > 0 ? metadataObjectProperties.map((val, index) => {
                        return (
                          <TableCell key={index} align="left">
                            <Box>
                              <TextField
                                sx={{
                                  width: '70px',
                                  '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                      borderColor: 'white',
                                    },
                                  },
                                }}
                                InputLabelProps={{ shrink: false }}
                                id="outlined-password-input"
                                label=" "
                                type="text"
                                size="small"
                                value={metadataObjectProperties[index]}
                                onChange={e => {
                                  updateTableColName(index, e.target.value)
                                }}
                                autoComplete="current-password"
                              />
                              <HighlightOff
                                sx={{
                                  mt: "7px",
                                  ml: "3px",
                                  "&:hover": {
                                    cursor: "pointer",
                                  },
                                }}
                                onClick={() => {
                                  deleteTableCol(index);
                                }}
                              />
                            </Box>
                          </TableCell>
                        )
                      }) :
                        <TableCell align="left">
                          <Button sx={{
                            width: '250px',
                            marginLeft: '10px'
                          }} className="btn2" onClick={addTableCol}>
                            Click to Add Property
                          </Button>
                        </TableCell>
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metadataObjects.map((row, rowIndex) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Box
                          className="flex_align_center"
                          sx={{
                            "& .icon": {
                              background: "#fff",
                              mr: 2,
                              borderRadius: "50%",
                              borderColor: "white",
                              height: "30px",
                              width: "30px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            },
                          }}
                        >
                          <Box
                            className="icon"
                            sx={{
                              alignItems: "start",
                            }}
                          >
                            <HighlightOff onClick={() => {
                              deleteTableRows(rowIndex)
                            }} sx={{
                              color: "#000",
                              border: "#fff",
                              "&:hover": {
                                cursor: "pointer"
                              }
                            }} />
                          </Box>
                        </Box>
                      </TableCell>
                      {
                        Object.keys(row).map((val, index) => {
                          return (
                            <TableCell key={val} align="left">
                              <TextField
                                sx={{
                                  width: '100px',
                                  '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                      borderColor: 'white',
                                    },
                                  },
                                }}
                                InputLabelProps={{ shrink: false }}
                                id="outlined-password-input"
                                label=" "
                                type="text"
                                size="small"
                                autoComplete="current-password"
                                value={metadataObjects[rowIndex][val]}
                                name={val}
                                onChange={e => {
                                  handleChange(rowIndex, e)
                                }}
                              />
                            </TableCell>
                          )
                        })
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box sx={{
              mt: 3,
              display: 'flex'
            }} className="">
              <Button className="btn2" onClick={resetData}>
                Reset Data
              </Button>
              {
                metadataObjectProperties.length > 0 ?
                  <Button sx={{
                    width: '220px',
                    marginLeft: '10px'
                  }} className="btn2" onClick={addTableCol}>
                    Add More Properties
                  </Button> :
                  null
              }
            </Box>
          </ExcelSpreadSheetStyled >
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          className={`${isWebform ? "" : "disabled-div"} br_15 flex`}
          sx={{
            background: "var(--box-color)",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Button
            className="btn2"
            onClick={() => convertToJson()}
            sx={{ my: 2 }}
          >
            Convert to JSON
          </Button>
          <Box className="flex_align">
            <List />
            <Button
              onClick={() => {
                if (metaDataUrl) metaFileDown();
              }}
              sx={{ background: "none", color: "#fff" }}
            >
              Download Your JSON File
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default ExcelSpreadSheet;

const ExcelSpreadSheetStyled = styled.section`
  .disabled-div {
    pointer-events: none;
    opacity: 0.4;
  }
  .table-wrap {
    padding-bottom: 10px;
    overflow-x: auto;
    overflow-y: auto;
  }
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
