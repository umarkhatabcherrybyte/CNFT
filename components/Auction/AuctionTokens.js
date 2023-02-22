import React from "react";
import { Grid } from "@mui/material";
import AuctionCard from "./AuctionCard";

import NoData from "../Design/NoData";
const AuctionTokens = ({ auction }) => {
  return (
    <>
      {auction.length > 0 ? (
        <Grid container spacing={2}>
          {auction.map((data) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AuctionCard data={data} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default AuctionTokens;
