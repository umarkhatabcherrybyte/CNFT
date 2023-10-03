import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
    Table,
    Box,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
} from "@mui/material";
import { Add, Minimize, HighlightOff } from "@mui/icons-material";
import TextField from '@mui/material/TextField';

const ExcelSpreadSheet = ({ checked }) => {

    const [metadataObject, setMetadataObject] = useState({
        "prop1": ''
    })

    const [metadataObjectProperties, setMetadataObjectProperties] = useState([])

    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        // console.log('yo')
    }, [metadataObject])

    const addTableRow = () => {
        const rowsInput = metadataObject
        setRowsData([...rowsData, rowsInput])
    }

    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const addTableCol = () => {
        let metadata = [...metadataObjectProperties]
        metadata.push('')
        setMetadataObjectProperties(metadata)
        let x = { ...metadataObject }
        let length = Object.keys(x).length + 1
        let name = `prop` + length
        x[name] = "value";
        setMetadataObject(x)
    }

    const updateTableColName = (value, index) => {
        let metadata = [...metadataObjectProperties]
        metadata[index] = value;
        setMetadataObjectProperties(metadata)
    }

    const deleteTableCol = (index) => {
        let metadata = [...metadataObjectProperties]
        if (index !== -1) {
            metadata.splice(index, 1);
            setMetadataObjectProperties(metadata)
            if (metadata.length == 0) {
                setRowsData([])
            }
        }
        let x = { ...metadataObject }
        delete x['prop' + index]
        setMetadataObject(x)
    }

    const viewMetaData = () => {
        console.log(metadataObject)
        console.log(metadataObjectProperties)
        console.log(rowsData, 'rows')
    }

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        // console.log(name, value, 'dasdas')
        const rowsInput = [...rowsData];
        // console.log(rowsInput[index])
        // rowsInput[index][name] = value;
        // setRowsData(rowsInput);
    }

    return (
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
                                                        updateTableColName(e.target.value, index)
                                                    }}
                                                    autoComplete="current-password"
                                                />
                                                <HighlightOff sx={{
                                                    mt: "7px",
                                                    ml: "3px",
                                                    "&:hover": {
                                                        cursor: "pointer"
                                                    }
                                                }} onClick={() => {
                                                    deleteTableCol(index)
                                                }} />
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
                        {rowsData.map((row, index) => (
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
                                                deleteTableRows(index)
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
                                    metadataObjectProperties.length > 0 && metadataObjectProperties.map((val, index) => {
                                        return (
                                            <TableCell key={index} align="left">
                                                <TextField
                                                    sx={{
                                                        width: '100px',
                                                        '& .MuiOutlinedInput-root': {
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                        },
                                                    }}
                                                    name={'prop' + index}
                                                    InputLabelProps={{ shrink: false }}
                                                    id="outlined-password-input"
                                                    label=" "
                                                    type="text"
                                                    size="small"
                                                    onChange={e => handleChange(index, e)}
                                                    autoComplete="current-password"
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
                <Button className="btn2" onClick={() => console.log('yo')}>
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
                <Button sx={{
                    width: '180px',
                    marginLeft: '10px'
                }} className="btn2" onClick={viewMetaData}>
                    View Metadata
                </Button>
            </Box>
        </ExcelSpreadSheetStyled>
    );
};

export default ExcelSpreadSheet;

const ExcelSpreadSheetStyled = styled.section`
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
