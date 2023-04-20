import React from "react";
import { Box, Card, CardMedia, Typography, CardContent } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { isVideoOrIsAudio } from "../../utils/utils";
import styled from "styled-components";
import { MycollectionRoute, buyDetailRoute } from "../Routes/constants";
import { useRouter } from "next/router";
const ClientCard = ({ card }) => {
  const router = useRouter();
  return (
    <ClientCardStyled>
      <Card
        onClick={() => router.push(`${buyDetailRoute}/0/${card._id}`)}
        sx={{
          boxShadow: "none",
          background: "#193361",
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
            // image={`/images/download.jpg`}
            src={
              !isVideoOrIsAudio(card?.collection_id?.assets[0])
                ? `https://ipfs.io/ipfs/${card?.collection_id?.assets[0]?.ipfs}`
                : card?.collection_id?.assets[0]?.feature_image
            }
            alt="green iguana"
          />
          {/* <Box
            sx={{
              position: "absolute",
              bottom: "-32px",
              width: "100%",
              padding: " 0px 12px",
            }}
            className="client_detail"
          >
            <Box
              className="img_parent flex"
              sx={{ justifyContent: "center !important" }}
            >
              <img src="/images/client.jfif" className="w_100" />
            </Box>
          </Box> */}
        </Box>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            className="bold text_center poppin"
            sx={{ textTransform: "uppercase", pt: 3 }}
          >
            {card?.collection_id?.assets[0]?.asset_name}
          </Typography>

          {/* <Typography
            variant="caption"
            sx={{ color: "#fff", display: "block" }}
            className="text_center"
          >
            by{" "}
            <span style={{ color: "var(--secondary-color)" }}>
              julian_jokey
            </span>
          </Typography> */}
          <Typography
            variant="caption"
            sx={{ color: "#3263BB", display: "block" }}
            className="text_center"
          >
            {card?.collection_id?.assets[0]?.description}
          </Typography>
        </CardContent>
      </Card>
    </ClientCardStyled>
  );
};

export default ClientCard;

const ClientCardStyled = styled.section`
  .img_parent {
    img {
      border-radius: 50%;
      height: 70px;
      width: 70px;
      object-fit: cover;
      border: 3px solid var(--secondary-color);
    }
  }
`;
