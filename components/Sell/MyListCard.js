import React from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import styled from "styled-components";
import CaptionHeading from "../shared/headings/CaptionHeading";
const data = [{}, {}, {}, {}, {}, {}, {}, {}];
const MyListCard = () => {
  return (
    <MyListCardStyled>
      <Box sx={{ py: 5 }}>
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid xs={12} md={4} lg={3} item key={index}>
              <Card
                //   onClick={() => navigate(`${buyDetailRoute}/2323`)}
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
                      height: "4rem",
                      width: "4rem",
                      top: "15px",
                      padding: " 0px 12px",
                    }}
                    className="client_detail"
                  >
                    <Box
                      sx={{
                        background: "var(--secondary-color)",
                        borderRadius: "50%",
                        padding: "7px 0 ",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Settings sx={{ color: "#000000" }} />
                    </Box>
                  </Box>
                </Box>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body"
                    component="div"
                    className="bold"
                    sx={{ textTransform: "uppercase" }}
                  >
                    iNDUSTRIAL REvolution
                  </Typography>
                  <Box className="space_between">
                    <CaptionHeading heading="julian_jokey" />
                    <Typography
                      gutterBottom
                      variant="body"
                      component="div"
                      sx={{ color: "var(--secondary-color)" }}
                      className="bold flex"
                    >
                      1000
                      <Typography
                        variant="caption"
                        component="div"
                        sx={{
                          color: "var(--secondary-color)",
                          fontSize: "10px",
                          pl: 1,
                        }}
                        className="bold"
                      >
                        ADA
                      </Typography>
                    </Typography>
                  </Box>
                </CardContent>
                <CardContent sx={{ background: "#12274D", py: "1 !important" }}>
                  <Box className="space_between">
                    <CaptionHeading heading="You have 10 offers" />
                    <Box
                      sx={{ backgroundImage: `url("/images/heart.png")` }}
                      className="bg_heart"
                    ></Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MyListCardStyled>
  );
};

export default MyListCard;

const MyListCardStyled = styled.section`
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
`;
