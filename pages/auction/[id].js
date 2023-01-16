import React, { useState } from "react";
import ContainerLayout from "../../components/shared/ContainerLayout";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import styled from "styled-components";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  RemoveRedEyeOutlined,
  FavoriteBorderOutlined,
  CalendarTodayOutlined,
} from "@mui/icons-material";
import AuctionModal from "../../components/Auction/AuctionModal";
import BarHeading from "../../components/shared/headings/BarHeading";
import DetailCard from "../../components/Auction/DetailCard";
import SuccessModal from "../../components/Auction/SuccessModal";
const cardData = [{}, {}, {}, {}];
const AuctionDetail = () => {
  const [open, setOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  console.log(isSuccessModal, open);
  return (
    <AuctionDetailStyled>
      <ContainerLayout>
        <BreadCrumHeader heading="Live Action Details" />
        <Box sx={{ py: 5 }}>
          <Grid container spacing={4}>
            <Grid xs={12} md={6} item>
              <Box>
                <img
                  src="/images/Buy Our Tokens/Layer 61.png"
                  alt=""
                  className="w_100 br_15"
                />
              </Box>
            </Grid>
            <Grid xs={12} md={6} item>
              <Typography
                variant="h3"
                className="uppercase text_white bold oswald"
              >
                Industrail revolution
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 2,
                  "& .detial": {
                    py: 0.5,
                    px: 2,
                    display: "flex",
                  },
                }}
                className="text_white "
              >
                <Box className="light_white_bg detial br_15" sx={{ mr: 2 }}>
                  <RemoveRedEyeOutlined sx={{ mr: 1 }} />
                  <Typography>150</Typography>
                </Box>
                <Box className="light_white_bg  detial br_15">
                  <FavoriteBorderOutlined sx={{ mr: 1 }} />
                  <Typography>235</Typography>
                </Box>
              </Box>
              <Box
                sx={{ py: 1, px: 1.5, width: "13rem" }}
                className="light_white_bg text_white br_15"
              >
                <Typography className="montserrat">Created By</Typography>
                <Typography className="bold montserrat">
                  Ralph Garraway
                </Typography>
              </Box>
              <Typography sx={{ py: 2 }} className="text_white montserrat">
                Your text goes here this is just placeholder text. Your text
                goes here this is just placeholder text. Your text goes here
                this is just placeholder text. Your text goes here this is just
                placeholder text. Your text goes here this is just placeholder
                text.
              </Typography>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Box className="light_white_bg text_white br_15 montserrat">
                    <Typography sx={{ py: 1.5, px: 1 }}>
                      Curent Bid in USD : <span>1500 USD</span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="light_white_bg text_white br_15 montserrat">
                    <Typography sx={{ py: 1.5, px: 1 }}>
                      Curent Bid in ADA : <span>1500 ADA</span>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  background: "#0e3b3b4d",
                  color: "#ffff",
                  py: 1.5,
                  my: 1,
                  mt: 2,
                }}
                className="flex br_15 montserrat"
              >
                <Typography sx={{ mr: 3 }}>Countdown</Typography>
                <Typography> 4 : 15 : 55 : 43</Typography>
              </Box>
              <Button
                sx={{
                  border: "2px solid #fff",
                  my: 1,
                  "&:hover": {
                    opacity: 0.7,
                  },
                }}
                className="w_100 text_white br_50 montserrat"
                startIcon={<CalendarTodayOutlined />}
                onClick={() => setOpen(true)}
              >
                Place Your Bid
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ py: 5 }}>
          <BarHeading heading="Live Auction" />
          <Grid container spacing={3}>
            {cardData.map((data) => (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <DetailCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </ContainerLayout>
      <AuctionModal
        open={open}
        setOpen={setOpen}
        setIsSuccessModal={setIsSuccessModal}
      />
      <SuccessModal open={isSuccessModal} setOpen={setIsSuccessModal} />
    </AuctionDetailStyled>
  );
};

export default AuctionDetail;

const AuctionDetailStyled = styled.section``;
