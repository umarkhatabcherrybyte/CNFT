import React from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import NftCard from "../shared/NftCard";
import NoData from "../Design/NoData";
import { MycollectionRoute, buyDetailRoute } from "../Routes/constants";
const cardData = [{}, {}, {}, {}, {}, {}, {}];

const BuyCards = ({ type, uniquePolicies, buy, nfts, policyNFTs, label }) => {
  // console.log(nfts, "nftsnftsnftsnfts");
  // console.log(label, "nftsnftsnftsnfts");
  // console.log({type});
  console.log("nfts in Buycards", { nfts }, { policyNFTs });

  return <NftCard type={1} card={nfts[0]} />;
};

export default BuyCards;

const BuyCardsStyled = styled.section``;
