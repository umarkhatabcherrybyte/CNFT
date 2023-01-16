import React from "react";
import { Box, Card, CardMedia, Typography, CardContent } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import styled from "styled-components";
import { useRouter } from "next/router";
import { buyDetailRoute } from "../Routes/constants";
const NftCard = () => {
  const router = useRouter();
  return (
    <NftCardStyled>
      <Card
        onClick={() => router.push(`${buyDetailRoute}/2323`)}
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
            image="/images/Buy Our Tokens/Layer 61.png"
            alt="green iguana"
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              width: "100%",
              padding: " 0px 12px",
            }}
            className="client_detail"
          >
            <Box
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
            </Box>
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
              iNDUSTRIAL REvolution
            </Typography>
            <Typography
              gutterBottom
              variant="body"
              component="div"
              sx={{ color: "var(--secondary-color)" }}
              className="bold"
            >
              1000{" "}
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
          <Box className="flex">
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
          </Box>
        </CardContent>
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
