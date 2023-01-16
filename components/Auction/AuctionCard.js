import React from "react";
import styled from "styled-components";
import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Card, CardMedia, Typography, CardContent } from "@mui/material";
import { auctionDetailRoute } from "../Routes/constants";
import { useRouter } from "next/router";
const AuctionCard = () => {
  const router = useRouter();
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
            className="uppercase poppin "
          >
            iNDUSTRIAL REvolution
          </Typography>
          <Typography
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
          </Typography>

          <Box className="space_between" sx={{ pt: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "var(--secondary-color)" }}
              className="bold flex poppin"
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
            <Typography
              variant="body"
              component="div"
              className="bold gray poppin"
            >
              $199.53
            </Typography>
          </Box>
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
    </AuctionCardStyled>
  );
};

export default AuctionCard;

const AuctionCardStyled = styled.section`
  .gray {
    color: #e4e4e4;
  }
`;
