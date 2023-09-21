import React from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import NftCard from "../shared/NftCard";
import NoData from "../Design/NoData";
import { MycollectionRoute, buyDetailRoute } from "../Routes/constants";
const cardData = [{}, {}, {}, {}, {}, {}, {}];

const BuyCards = ({ buy, nfts, label }) => {
  console.log(nfts, "nftsnftsnftsnfts");
  console.log(label, "nftsnftsnftsnfts");
  return (
    <BuyCardsStyled>
      <Grid container spacing={2}>
        {nfts.length > 0 ? (
          nfts.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <NftCard card={card} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <NoData />
          </Grid>
        )}
        {/* {buy.length > 0 ? (
          buy.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <NftCard card={card} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <NoData />
          </Grid>
        )} */}
      </Grid>
    </BuyCardsStyled>
  );
};

export default BuyCards;

const BuyCardsStyled = styled.section``;
