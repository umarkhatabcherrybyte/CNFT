import React from "react";
import styled from "styled-components";
import { Box, Card, CardMedia, Typography, CardContent } from "@mui/material";
import { auctionDetailRoute } from "../Routes/constants";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { isVideoOrIsAudio } from "../../utils/utils";
const DateCountdown = dynamic(() => import("react-date-countdown-timer"), {
  ssr: false,
});
const DetailCard = ({ card }) => {
  const router = useRouter();

  return (
    <>
      <DetailCardStyled>
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
          onClick={() => router.push(`${auctionDetailRoute}/0/${card?._id}`)}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="290"
              src={
                !isVideoOrIsAudio(card.collection_id?.assets[0])
                  ? `https://ipfs.io/ipfs/${card?.collection_id?.assets[0]?.ipfs}`
                  : card?.collection_id?.assets[0]?.feature_image
              }
              // src="/images/download.jpg"
              // image={`https://ipfs.io/ipfs/${card?.collection_id?.assets[0]?.ipfs}`}
              alt="green iguana"
            />
            <Box sx={{ position: "absolute", bottom: "10px" }}></Box>
          </Box>
          <CardContent sx={{ background: "#193361" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="uppercase poppin text_center"
            >
              {card?.collection_id?.assets[0]?.asset_name}
            </Typography>
            {/* <Typography
              gutterBottom
              variant="caption"
              component="div"
              className="bold  proxima text_center"
              sx={{ textTransform: "lowercase" }}
            >
              by{" "}
              <span style={{ color: "var(--secondary-color)" }}>
                julian_jokey
              </span>
            </Typography> */}

            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "var(--secondary-color) ",
                justifyContent: "center !important",
              }}
              className="bold  poppin text_center flex"
            >
              {card?.sell_type_id?.price}

              <Typography
                variant="caption"
                component="div"
                className="bold uppercase poppin"
                sx={{ pl: 1 }}
              >
                Ada
              </Typography>
            </Typography>
          </CardContent>
          <CardContent>
            <Typography className="gray text_center poppin">
              Time Remaining
            </Typography>
            <Typography className="gray text_center bold poppin">
              {card?.list?.sell_type_id?.end_time}
              <DateCountdown
                dateTo={card?.sell_type_id?.end_time}
                // callback={() => alert("Hello")}
                locales_plural={["Y:", "M:", "D:", "H:", "M:", "S"]}
              />
            </Typography>
          </CardContent>
        </Card>
      </DetailCardStyled>
    </>
  );
};

export default DetailCard;
const DetailCardStyled = styled.section`
  .gray {
    color: #e4e4e4;
  }
`;
