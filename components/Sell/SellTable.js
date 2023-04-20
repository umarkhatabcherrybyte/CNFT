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
const SellTable = ({ activeBids }) => {
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const adaInfo = useFetchData(GetAdaPriceService.getPrice, 30000);
  const onAcceptBid = async (id) => {
    setIsLoading(true);
    try {
      const res = await INSTANCE.post("/bid/accept", {
        bid_id: id,
      });
      if (res) {
        setIsLoading(false);
        window.location.reload();
        Toast("success", "Your bid has been accepted.");
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };
  return (
    <SellTableStyled>
      {isLoading && <FullScreenLoader />}
      {connected ? (
        activeBids.length > 0 ? (
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
                  <TableCell align="center">Expiration Date</TableCell>
                  {/* <TableCell align="center">From</TableCell> */}
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeBids.map((row) =>
                  row?.list_id?.collection_id?.assets.map((item, index) => {
                    if (index == row.asset_index) {
                      return (
                        <TableRow
                          key={item.asset_name}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                              // borderRadius: "15px 15px 0  0",
                            },
                            background: "#3b3b3b4d",
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item?.asset_name}
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
                            In {row?.days_remaining} days {row?.hours_remaining}{" "}
                            hours {row?.minutes_remaining} minutes
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              className="btn2"
                              onClick={() => onAcceptBid(row._id)}
                            >
                              Accept
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              img: {
                width: "100%",
              },
            }}
          >
            <img src="/images/no_bid.png" />
          </Box>
        )
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
