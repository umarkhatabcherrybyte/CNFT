import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import styled from "styled-components";
import { setStep } from "../../redux/listing/ListingActions";
import { INSTANCE } from "/config/axiosInstance";
import FullScreenLoader from "../shared/FullScreenLoader";
import { BlockfrostProvider } from "@meshsdk/core";
import { useDispatch } from "react-redux";
import { network_key } from "../../base_network";
const Mynft = ({ card }) => {
  console.log(card);
  console.log("Policy if of nft is: ", card.policyId);
  const dispatch = useDispatch();
  const [metadata, setMetadata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user_id = window.localStorage.getItem("user_id");
  const recipientAddress = window.localStorage.getItem("user_address");
  const blockfrostProvider = new BlockfrostProvider(
    // "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj" //this was the mainnet key
    network_key // I added the key declared globally but importing in this file
  );
  React.useEffect(() => {
    getMetaData();
  }, []);
  const getMetaData = async () => {
    const data = await blockfrostProvider.fetchAssetMetadata(card.unit);
    setMetadata(data);
  };
  if (metadata) {
    const imgURL = metadata?.image;
    const url = new URL(imgURL);
    var hash = url.pathname.slice(1);
  }

  const navigationHanlder = async () => {
    setIsLoading(true);
    console.log(
      "The policy id of this nft is------------------: ",
      card.policyId
    );
    window.localStorage.setItem("policyId", JSON.stringify(card.policyId));
    window.localStorage.setItem("assetName", JSON.stringify(card.assetName));
    try {
      console.log("The policy id of this nft is: ", card.policyId);
      const ipfsHash = metadata?.image.replace("ipfs://", "");
      const data = {
        metadata: [
          {
            name: metadata?.name || "",
            asset_quantity: card?.quantity || 1,
            link: metadata?.link || "",
            mediaType: metadata?.mediaType || "",
            artist: metadata?.creator || "",
            description: metadata?.description || "",
            ipfs: ipfsHash || "",
            image: ipfsHash || "",
          },
        ],
        user_id: user_id,
        recipient_address: recipientAddress,
        policy_id: card.policyId,
        type: "single",
        image_file: ``,
      };
      const res = await INSTANCE.post("/collection/create", data);
      if (res) {
        setIsLoading(false);
        const obj = {
          ...res.data.data,
          ...data,
        };
        window.localStorage.setItem("listing", JSON.stringify(obj));
        dispatch(setStep("step2"));
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <MynftStyled>
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
            "&:hover .list_btn": {
              opacity: 1,
            },
          }}
          className="list_card"
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="290"
              image={`https://ipfs.io/ipfs${hash}`}
              alt="green iguana"
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                width: "100%",
                padding: " 0px 12px",
                button: {
                  width: "100% !important",
                },
              }}
              className="client_detail"
            >
              <Button
                className="btn2  list_btn"
                sx={{ opacity: "0" }}
                onClick={navigationHanlder}
              >
                Add Listing
              </Button>
              {/* <Box
              sx={{
                background: "#00000099",
                borderRadius: "10px",
                padding: "7px 0 ",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box className="img_parent">
                <img src="/images/client.jfif" className="w_100" />
              </Box>
              <Typography
                variant="caption"
                className="bold text_white"
                sx={{ pl: 2 }}
              >
                Created by@Julian
              </Typography>
            </Box> */}
            </Box>
          </Box>
          <CardContent>
            <Box className="flex">
              <Typography
                gutterBottom
                variant="body"
                component="div"
                className="bold"
                sx={{ textTransform: "uppercase" }}
              >
                {metadata?.policyId}
              </Typography>

              {/* <Typography
              gutterBottom
              variant="body"
              component="div"
              sx={{ color: "var(--secondary-color)" }}
              className="bold"
            >
              {card?.sell_type_id?.price}

              <Typography
                variant="caption"
                component="div"
                sx={{ color: "var(--secondary-color)" }}
                className="bold"
              >
                {" "}
                Ada{" "}
              </Typography>
            </Typography> */}
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
        </Card>
      </MynftStyled>
    </>
  );
};

export default Mynft;

const MynftStyled = styled.section`
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
