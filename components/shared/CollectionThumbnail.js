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
  console.log(firstNFT, "first nft");
  let card = firstNFT;
  const router = useRouter();
  //   let _datum = card.detail.datum;
  //   console.log("datum is ", _datum);

  const navigationHanlder = () => {
    //   console.log("navigating....");
    //   let name = fromText(card.assetName ? card.assetName : card.name);
    console.log("showing ollection now..");
    router.push({
      pathname: `/collection/my-collection/Fixed/${policy}`,
      query: {
        // policy: "add-listing",
      },
    });
    // router.push(`/buy/collection/${policy}`);
  };
  let res = fetch(`"https://ipfs.io/ipfs/" +
${firstNFT.detail.onchain_metadata.feature_image}`);
  console.log(res);
  return (
    <AuctionCardStyled>
      <Card
        sx={{
          boxShadow: "none",
          background: "var(--main-color)",
          borderRadius: "20px",
          border: "solid 1px #ddd",
          cursor: "pointer",
          transition: "0.5s",
          "&:hover": { transform: "translateY(-14px)" },

          color: "#fff",
          "& .flex": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
        onClick={navigationHanlder}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="290"
            image={
              firstNFT.detail.onchain_metadata.feature_image
                ? "https://ipfs.io/ipfs/" +
                  firstNFT.detail.onchain_metadata.feature_image
                : "https://media.istockphoto.com/id/1264040074/vector/placeholder-rgb-color-icon.jpg?s=612x612&w=0&k=20&c=0ZFUNL28htu-zHRF9evishuNKYQAZVrfK0-TZNjnX3U="
            }
            alt="green iguana"
          />
          <Box sx={{ position: "absolute", bottom: "10px" }}></Box>
        </Box>
        {/* <CardContent sx={{ background: "#193361" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="uppercase poppin "
          >
            {firstNFT.name}
          </Typography>
        </CardContent> */}
        <CardContent></CardContent>
      </Card>
    </AuctionCardStyled>
  );
};

export default CollectionThumbnail;

const AuctionCardStyled = styled.section`
  .gray {
    color: #e4e4e4;
  }
`;
