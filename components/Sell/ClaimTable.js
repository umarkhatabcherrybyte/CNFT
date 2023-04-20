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
import FullScreenLoader from "../shared/FullScreenLoader";
import { Toast } from "../shared/Toast";
import GetAdaPriceService from "/services/get-ada-price.service";
import useFetchData from "/hooks/adaInfo";
const ClaimTable = ({ claim }) => {
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const adaInfo = useFetchData(GetAdaPriceService.getPrice, 30000);
  const onClaimBid = async (id) => {
    setIsLoading(true);
    try {
      const res = await INSTANCE.post("/bid/claim", {
        bid_id: id,
      });
      if (res) {
        setIsLoading(false);
        Toast("success", "You have claim your bid.");
        window.location.reload();
      }
    } catch (e) {
      setIsLoading(false);
      Toast(
        "error",
        "Our servers are currently processing a high volume of requests. Please try again in a few minutes."
      );

      console.log(e);
    }
  };
  return (
    <ClaimTableStyled>
      {isLoading && <FullScreenLoader />}
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
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="center">USD Price (est)</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {claim &&
                claim.length > 0 &&
                claim.map((row) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        // borderRadius: "15px 15px 0  0",
                      },
                      background: "#3b3b3b4d",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {
                        row?.list_id?.collection_id?.assets[row.asset_index]
                          .asset_name
                      }
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {Number(row.price)}
                    </TableCell>
                    <TableCell align="center">
                      {!adaInfo
                        ? "..."
                        : parseFloat(
                            adaInfo?.current_price * row.price
                          ).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        className="btn2"
                        onClick={() => onClaimBid(row._id)}
                      >
                        Claim
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
    </ClaimTableStyled>
  );
};

export default ClaimTable;

const ClaimTableStyled = styled.section``;
