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
import {
  buyDetailRoute,
  MycollectionRoute,
  auctionDetailRoute,
} from "../../../components/Routes/constants";
// import { isVideoOrIsAudio } from "../../utils/utils";
import { renderLovelace } from "../../../services/cardanoService";
import { fromText } from "lucid-cardano";
import { BlockfrostProvider } from "@meshsdk/core";
import { useState } from "react";
import { useEffect } from "react";
import { blockfrostApiKey } from "../../../config/blockfrost";
import NftCard from "../../../components/shared/NftCard";
const CollectionContent = () => {
  // console.log(card, "card1");
  //   let card = policyNFTs[0];
  const router = useRouter();
  const { policy } = router.query;
  console.log({ policy });
  const [nfts, setNfts] = useState([]);
  //   let _datum = card.detail.datum;
  //   console.log("datum is ", _datum);

  // const navigationHanlder = () => {
  //   try {
  //     // const route = type
  //     //   ? `${MycollectionRoute}/${sell_model}`
  //     //   : `${buyDetailRoute}/0`;
  //     // router.push(`${route}/${card._id}`);
  //     console.log("navigating....");
  //     let name = fromText(card.assetName ? card.assetName : card.name);
  //     if (type == 1) {
  //       console.log("individual");
  //       /**
  //      *     const cost = datum.fields[1].int;
  //   const sellerPubKeyHashHex = datum.fields[0].fields[0].fields[0].bytes;
  //   const sellerStakeKeyHashHex =
  //     datum.fields[0].fields[1].fields[0].fields[0].fields[0].bytes;
  //      */
  //       // setAnchorEl(null);
  //       router.push({
  //         pathname: `/buy/${card.policy}`,
  //         query: {
  //           cost: _datum.fields[1].int,
  //           sellerPubKeyHashHex: _datum.fields[0].fields[0].fields[0].bytes,
  //           sellerStakeKeyHashHex:
  //             _datum.fields[0].fields[1].fields[0].fields[0].fields[0].bytes,
  //         }, // sellerPubKeyHashHex,sellerStakeKeyHashHex
  //       });
  //       // router.push(`/buy/${name}/${card?.policy}`);
  //     }
  //   } catch (e) {
  //     console.log("error in NFt card ", e);
  //   }
  // };
  //   let cardImage = "https://ipfs.io/ipfs/";

  //   let imageHash =
  //     type == 0
  //       ? card.detail.onchain_metadata.feature_image
  //       : card.detail.onchain_metadata.image.slice(7);

  //   if (!imageHash) {
  //     imageHash = card.detail._imageUrl;
  //   }
  //   if (imageHash.startsWith("http")) {
  //     cardImage = imageHash;
  //   } else cardImage += imageHash;
  //   console.log("image is ", cardImage, card);

  // console.log("showing card", card);
  async function fetchAssets() {
    let policy_id = policy;
    if (!policy_id) return;

    try {
      const blockfrostProvider = new BlockfrostProvider(blockfrostApiKey);
      let latestAssets = await blockfrostProvider.fetchCollectionAssets(
        policy_id
      );
      latestAssets = latestAssets.assets;
      console.log({ latestAssets });
      let _nfts = [];
      for (let index = 0; index < latestAssets.length; index++) {
        const item_ = latestAssets[index];
        const main = await blockfrostProvider.fetchAssetMetadata(item_.unit);
        _nfts.push({
          detail: { onchain_metadata: main },
          ...main,
          policy: policy_id,
          unit: item_.unit,
          type: 0,
        });
      }
      console.log("assets are", _nfts);
      setNfts(_nfts);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchAssets();
  }, [policy]);

  return (
    <NftCardStyled>
      <>
        {" "}
        {nfts.length > 0 ? (
          nfts.map((nft) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={"nft" + Date.now()}>
                <NftCard card={nft} type={1} />
              </Grid>
            );
            <hr />;
          })
        ) : (
          <h2>Loading NFTs....</h2>
        )}
      </>
    </NftCardStyled>
  );
};

export default CollectionContent;

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
