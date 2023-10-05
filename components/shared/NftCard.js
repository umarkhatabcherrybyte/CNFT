import React from "react";
import { Box, Card, CardMedia, Typography, CardContent } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  buyDetailRoute,
  MycollectionRoute,
  auctionDetailRoute,
} from "../Routes/constants";
// import { isVideoOrIsAudio } from "../../utils/utils";
import { renderLovelace } from "../../services/cardanoService";
import { fromText } from "lucid-cardano";
import { useState } from "react";
import { useEffect } from "react";
import { getAssetDetail, listMarket } from "../../services/blockfrostService";
import axios from "axios";
import { getTxInfo } from "../../services/koiosService";
import { blockfrostApiKey, blockfrostUrl } from "../../config/blockfrost";
import { market } from "../../config/marketConfig";
import { BlockfrostProvider } from "@meshsdk/core";
const NftCard = ({ onClick, card, type }) => {
  const [datum, setDatum] = useState(null);
  console.log("NFT is ", card);

  const router = useRouter();
  // let _datum = card.detail.datum;
  // console.log("datum is ", _datum);

  let name = card.assetName
    ? card.assetName
    : card.asset_name
    ? card.asset_name
    : card.name;
  console.log({ name });
  let hexName = fromText(name);
  const navigationHanlder = () => {
    try {
      if (onClick) {
        onClick();
      }

      console.log("navigating....");
      router.push({
        pathname: `/buy/${hexName}/${card?.policy}`,
        query: {
          // policy: card?.policy,
        },
      });
    } catch (e) {
      console.log("error in NFt card ", e);
    }

    // router.push({
    //   pathname: `/buy/${name}/${card?.policy}`,
    //   query: {
    //     datum: card.detail.,
    //   },
    // });
  };
  let cardImage = "https://ipfs.io/ipfs/";

  let imageHash =
    card.detail.onchain_metadata?.image && type == 0
      ? card.detail.onchain_metadata.feature_image
      : card.detail.onchain_metadata?.image?.slice(7);

  if (!imageHash) {
    imageHash = card.detail._imageUrl;
  }
  if (imageHash?.startsWith("http")) {
    cardImage = imageHash;
  } else cardImage += imageHash;
if(imageHash==undefined){
  cardImage="https://i.pinimg.com/originals/f2/d1/22/f2d122bd112252d193a197e9d9c203d2.jpg"
}
  console.log("image is ", cardImage, card);

  // console.log("showing card", card);
  useEffect(() => {
    // getNftDatum();
  }, []);
  return (
    <NftCardStyled>
      <Card
        onClick={navigationHanlder}
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
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="290"
            // image={`${
            //   type
            //     ? card.feature_image
            //     : isVideoOrIsAudio(asset_detail)
            //     ? asset_detail?.feature_image
            //     : `https://ipfs.io/ipfs/${asset_detail?.ipfs}`
            // }`}

            image={cardImage}
            alt="nft image"
          />
        </Box>
        {type != 0 && (
          <CardContent>
            <Box className="flex">
              <Typography
                gutterBottom
                variant="body"
                component="div"
                className="bold"
                sx={{ textTransform: "uppercase" }}
              >
                {/* {type ? card.name : asset_detail?.asset_name} */}
                {card?.detail?.onchain_metadata?.name
                  ? card?.detail?.onchain_metadata?.name
                  : card?.detail._name}
              </Typography>
              <Typography
                gutterBottom
                variant="body"
                component="div"
                sx={{ color: "var(--secondary-color)" }}
                className="bold"
              >
                {card?.detail?.datum
                  ? card.detail?.datum.fields[1].int / 1000000
                  : "Free"}
                {/* {renderLovelace(card.detail?.datum?.fields[1]?.int)} */}
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ color: "var(--secondary-color)" }}
                  className="bold"
                >
                  {" "}
                  Ada{" "}
                </Typography>
              </Typography>
            </Box>
            {/* <Box className="flex">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                py: 1,
              }}
            >
              <Box
                sx={{ backgroundImage: `url("/images/heart.png")` }}
                className="bg_heart"
              >
                10+
              </Box>
              <Typography variant="caption" component="div" sx={{ ml: 2 }}>
                People Placed Bid
              </Typography>
            </Box>
            <Box>
              <Box className="next_arrow">
                <ArrowForwardIos sx={{ color: "var(--secondary-color)" }} />
              </Box>
            </Box>
          </Box> */}
          </CardContent>
        )}
      </Card>
    </NftCardStyled>
  );
};

export default NftCard;

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
