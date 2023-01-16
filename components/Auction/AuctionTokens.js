import React from "react";
import { Grid } from "@mui/material";
import AuctionCard from "./AuctionCard";
const cardData = [{}, {}, {}, {}, {}, {}, {}];
const AuctionTokens = () => {
  return (
    <>
      <Grid container spacing={2}>
        {cardData.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AuctionCard />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AuctionTokens;
