import React from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import NftCard from "../shared/NftCard";

import { MycollectionRoute, buyDetailRoute } from "../Routes/constants";
const cardData = [{}, {}, {}, {}, {}, {}, {}];

const BuyCards = ({ tabValue, buy }) => {
  return (
    <BuyCardsStyled>
      <Grid container spacing={2}>
        {buy.length > 0 &&
          buy.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <NftCard tabValue={tabValue} card={card} />
            </Grid>
          ))}
      </Grid>
    </BuyCardsStyled>
  );
};

export default BuyCards;

const BuyCardsStyled = styled.section``;
