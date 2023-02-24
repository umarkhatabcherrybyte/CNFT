import React, { useEffect, useState } from "react";
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
import Layout from "../Mint/Layout";
import Heading from "../shared/headings/Heading";

import { useWallet, useLovelace } from "@meshsdk/react";
import { INSTANCE } from "../../config/axiosInstance";
import styled from "styled-components";
import { getKeyData } from "../../helper/localStorage";

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

  const {
    wallet,
    connected,
    name,
    connecting,
    connect,
    disconnect,
    error } =
    useWallet();

  useEffect(() => {
    const getData = async () => {
      try {
        const user_id = getKeyData("user_id");
        const response = await INSTANCE.post("/list/find/all", {
          user_id,
        });
        // setListing(response?.data?.data);
      } catch (e) {
        // setListing([]);
        console.log(e);
      }
    };
    if (connected) {
      getData();
    }
  }, [connected]);

  return (
    <SellTableStyled>
      {connected ? (
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
      ) : (
        <Layout>
          <Box className="flex_align_center">
            <Heading heading="Please connect your wallet first." />
          </Box>
        </Layout>
      )}
    </SellTableStyled>
  );
};

export default SellTable;

const SellTableStyled = styled.section``;
