import React from "react";
import styled from "styled-components";
import { Box, Card, CardMedia, Typography, CardContent } from "@mui/material";
import { auctionDetailRoute } from "../Routes/constants";
import { useRouter } from "next/router";
const DetailCard = () => {
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
          onClick={() => router.push(`${auctionDetailRoute}/2323`)}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="290"
              image="/images/Buy Our Tokens/Layer 61.png"
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
              iNDUSTRIAL REvolution
            </Typography>
            <Typography
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
            </Typography>

            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "var(--secondary-color) ",
                justifyContent: "center !important",
              }}
              className="bold  poppin text_center flex"
            >
              1500
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
              03D : 19H : 54M : 05S
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
