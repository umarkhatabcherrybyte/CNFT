import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const rows = [
  {
    token: "Attrbutes Eyes",
    gov: "None",
    twitter: "Attributes Type",
    rats: "Skull",
  },
  {
    token: "Attrbutes Eyes",
    gov: "None",
    twitter: "Attributes Type",
    rats: "Skull",
  },
  {
    token: "Attrbutes Eyes",
    gov: "None",
    twitter: "Attributes Type",
    rats: "Skull",
  },
];

const TabTable = () => {
  const [tabValue, setTabValue] = useState("history");
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Box></Box>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "white" }}>
          <TabList
            onChange={onTabChange}
            aria-label="lab API tabs example"
            sx={{
              overflow: "inherit",
              minHeight: "71px",
              "& .MuiTabs-flexContainer": {
                alignItems: "center",
              },
              "& .MuiTabs-scroller": {
                overflow: "inherit !important",
              },
              "& .MuiTabs-indicator": {
                height: "4px",
                bottom: "-2px",
                borderRadius: "10px",
                zIndex: "9999",
                background: {
                  md: "var(--secondary-color)",
                  xs: "transparent",
                },
              },
              "& 	.Mui-selected": {
                opacity: "1",
                fontWeight: "bold",
              },
              "& 	.MuiTabs-flexContainer": {
                flexWrap: "wrap",
              },
              "& .tab_btn": {
                color: "#fff !important",
                minHeight: "40px",
                marginRight: "50px",
                border: "none !important",
                fontSize: "1.5rem",
                // alignItems: "start",
                padding: 0,
              },
            }}
          >
            <Tab
              label="Token Activity History"
              value="history"
              className="tab_btn oswald light_text initialcase "
            />
            <Tab
              label="Properties "
              value="properties"
              className="tab_btn oswald light_text initialcase"
            />
          </TabList>
        </Box>

        <TabPanel value="history" sx={{ p: 0, py: 2 }}>
          <TableContainer>
            <Table
              sx={{
                minWidth: 650,
                background: "transparent",
                th: {
                  color: "#fff",
                },
                td: {
                  color: "#fff",
                },
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Token</TableCell>
                  <TableCell align="left">Governance</TableCell>
                  <TableCell align="left">twitter</TableCell>
                  <TableCell align="left">@RatsDao</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.token}
                    </TableCell>
                    <TableCell align="left">{row.gov}</TableCell>
                    <TableCell align="left">{row.twitter}</TableCell>
                    <TableCell align="left">{row.rats}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="properties" sx={{ p: 0, py: 2 }}>
          <TableContainer>
            <Table
              sx={{
                minWidth: 650,
                background: "transparent",
                th: {
                  color: "#fff",
                },
                td: {
                  color: "#fff",
                },
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Token</TableCell>
                  <TableCell align="left">Governance</TableCell>
                  <TableCell align="left">twitter</TableCell>
                  <TableCell align="left">@RatsDao</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.token}
                    </TableCell>
                    <TableCell align="left">{row.gov}</TableCell>
                    <TableCell align="left">{row.twitter}</TableCell>
                    <TableCell align="left">{row.rats}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default TabTable;
