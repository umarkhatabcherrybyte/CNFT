import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
} from "@mui/material";
// import Paper from "@mui/material/Paper";
import styled from "styled-components";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    price: "10 ADA",
    usd: "$4.02",
    expire: "2",
    from: "Deodeep",
  },
  {
    price: "10 ADA",
    usd: "$4.02",
    expire: "2",
    from: "Deodeep",
  },
  {
    price: "10 ADA",
    usd: "$4.02",
    expire: "2",
    from: "Deodeep",
  },
  {
    price: "10 ADA",
    usd: "$4.02",
    expire: "2",
    from: "Deodeep",
  },
  {
    price: "10 ADA",
    usd: "$4.02",
    expire: "2",
    from: "Deodeep",
  },
  {
    price: "10 ADA",
    usd: "$4.02",
    expire: "2",
    from: "Deodeep",
  },
  {
    price: "10 ADA",
    usd: "$4.02",
    expire: "2",
    from: "Deodeep",
  },
  {
    price: "10 ADA",
    usd: "$4.02",
    expire: "2",
    from: "Deodeep",
  },
];
const SellTable = () => {
  return (
    <SellTableStyled>
      <TableContainer sx={{ py: 4 }}>
        <Box
          sx={{
            background: "var(--secondary-color)",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <Typography variant="h6" className="bold" sx={{ py: 2, px: 2 }}>
            Bids Placed On Your NFT
          </Typography>
        </Box>
        <Table
          aria-label="simple table"
          sx={{
            minWidth: 650,
            "& .MuiTableCell-root": {
              color: "#fff",
            },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                background: "#3b3b3b4d",
              }}
            >
              <TableCell>Price</TableCell>
              <TableCell align="center">USD Price</TableCell>
              <TableCell align="center">Expiration</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                    // borderRadius: "15px 15px 0  0",
                  },
                  background: "#3b3b3b4d",
                }}
              >
                <TableCell component="th" scope="row">
                  {row?.price}
                </TableCell>
                <TableCell align="center">{row?.usd}</TableCell>
                <TableCell align="center">In {row?.expire} days</TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "var(--secondary-color) !important" }}
                >
                  {row?.from}
                </TableCell>
                <TableCell align="center">
                  <Button className="btn2" sx={{}}>
                    Accept
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SellTableStyled>
  );
};

export default SellTable;

const SellTableStyled = styled.section``;
