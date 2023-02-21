import React from "react";
import { Grid } from "@mui/material";
import AuctionCard from "./AuctionCard";

import NoData from "../Design/NoData";
const AuctionTokens = ({ auction }) => {
  return (
    <>
      <Grid container spacing={2}>
        {auction.length > 0 ? (
          auction.map((data) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AuctionCard data={data} />
            </Grid>
          ))
        ) : (
          <NoData />
        )}
      </Grid>
    </>
  );
};

export default AuctionTokens;
