import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Card, CardMedia, Typography, CardContent } from "@mui/material";
import { auctionDetailRoute, MycollectionRoute } from "../Routes/constants";
import { useRouter } from "next/router";
import GetAdaPriceService from "/services/get-ada-price.service";
import useFetchData from "../../hooks/adaInfo";
// import DateCountdown from "react-date-countdown-timer";
// import Countdown from "react-countdown";
import dynamic from "next/dynamic";
import { isVideoOrIsAudio } from "../../utils/utils";
const DateCountdown = dynamic(() => import("react-date-countdown-timer"), {
  ssr: false,
});
const AuctionCard = ({ data, index }) => {
  const router = useRouter();
  const adaInfo = useFetchData(GetAdaPriceService.getPrice, 30000);
  const [date, setDate] = useState("");

  const asset_detail = data?.collection_id?.assets[0];
  const type = data.mint_type === "collection";
  const sell_model = data?.sell_model;
  // console.log("model", sell_model);
  const navigationHanlder = () => {
    const route = type
      ? `${MycollectionRoute}/${sell_model}`
      : `${auctionDetailRoute}/0`;
    router.push(`${route}/${data._id}`);
  };

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
              isVideoOrIsAudio(asset_detail)
                ? asset_detail?.feature_image
                : `https://ipfs.io/ipfs/${asset_detail?.ipfs}`
            }
            alt="green iguana"
          />
          <Box sx={{ position: "absolute", bottom: "10px" }}></Box>
        </Box>
        <CardContent sx={{ background: "#193361" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="uppercase poppin "
          >
            {data.mint_type === "collection"
              ? data?.name
              : asset_detail?.asset_name}
          </Typography>
          {/* <Typography
            gutterBottom
            variant="caption"
            component="div"
            className="bold  proxima"
            sx={{ textTransform: "lowercase" }}
          >
            by{" "}
            <span style={{ color: "var(--secondary-color)" }}>
              julian_jokey
            </span>
          </Typography> */}
          <Typography
            sx={{ pt: 2 }}
            variant="caption"
            component="div"
            className="bold uppercase poppin"
          >
            Base Price
          </Typography>
          <Box className="space_between">
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "var(--secondary-color)" }}
              className="bold flex poppin"
            >
              {data?.sell_type_id?.price}
              <Typography
                variant="caption"
                component="div"
                className="bold uppercase poppin"
                sx={{ pl: 1 }}
              >
                Ada
              </Typography>
            </Typography>
            <Typography
              variant="body"
              component="div"
              className="bold gray poppin"
            >
              ${" "}
              {!adaInfo
                ? "..."
                : parseFloat(
                    adaInfo?.current_price * data?.sell_type_id?.price
                  ).toFixed(2)}
              {/* {parseFloat(
                adaInfo?.current_price * data?.sell_type_id?.price
              ).toFixed(2)} */}
            </Typography>
          </Box>
        </CardContent>
        <CardContent>
          <Typography className="gray text_center poppin">
            Time Remaining
          </Typography>

          <Typography className="gray text_center bold poppin">
            <DateCountdown
              dateTo={data?.sell_type_id?.end_time}
              // callback={() => alert("Hello")}
              locales_plural={["Y:", "M:", "D:", "H:", "M:", "S"]}
            />
          </Typography>
        </CardContent>
      </Card>
    </AuctionCardStyled>
  );
};

export default AuctionCard;

const AuctionCardStyled = styled.section`
  .gray {
    color: #e4e4e4;
  }
`;
