import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import styled from "styled-components";
import { useRouter } from "next/router";
import { fromText } from "lucid-cardano";
import NftCard from "./NftCard";
import { BlockfrostProvider } from "@meshsdk/core";
const CollectionThumbnail = ({ policy, firstNFT }) => {
  // console.log(card, "card1");
  let card = firstNFT;
  const router = useRouter();
  //   let _datum = card.detail.datum;
  //   console.log("datum is ", _datum);

  const navigationHanlder = () => {
    //   console.log("navigating....");
    //   let name = fromText(card.assetName ? card.assetName : card.name);
    console.log("showing ollection now..");
    router.push({
        pathname: `/buy/collection/${policy}`,
        query: {
          policy: "add-listing",
        },
      });
    // router.push(`/buy/collection/${policy}`);
  };


  return (
    <NftCardStyled>
      <>
        <Grid item xs={12} sm={6} md={4} lg={3} key={"nft" + Date.now()}>
          <NftCard onClick={navigationHanlder} type={0} card={firstNFT} />
        </Grid>
        <hr />;
      </>
    </NftCardStyled>
  );
};

export default CollectionThumbnail;

const NftCardStyled = styled.section`
  .next_arrow {
    background: #fff;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: 0.5s;
    &:hover {
      opacity: 0.6s;
    }
  }
  .bg_heart {
    padding: 5px;
    font-size: 14px;
    width: 30px;
    height: 30px;
    background-size: contain;
    text-align: center;
    background-repeat: no-repeat;
    color: white;
  }

  .client_detail {
    .img_parent {
      background: #fff;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
  }
`;
