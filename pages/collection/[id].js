import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import Ballon from "../../components/Design/Ballon";
import Strips from "../../components/Design/Strips";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import ContainerLayout from "../../components/shared/ContainerLayout";
import ClientCard from "../../components/Cards/ClientCard";
import BarHeading from "../../components/shared/headings/BarHeading";
import styled from "styled-components";
import TabTable from "../../components/Collection/Collection Detail/TabTable";
import OfferModal from "../../components/Collection/My Collection/OfferModal";
import {
  CheckCircle,
  RemoveRedEyeOutlined,
  FavoriteBorderOutlined,
  ContentCopy,
} from "@mui/icons-material";
import CaptionHeading from "../../components/shared/headings/CaptionHeading";
import { useRouter } from "next/router";

const List = [{}, {}, {}, {}];

const cardData = [{}, {}, {}, {}];
const tabData = [
  {
    label: "Pay with ADA",
    value: "ada",
  },
  {
    label: "Pay with credit card",
    value: "credit",
  },
  {
    label: "Pay by  check",
    value: "check",
  },
];
const CollectionDetail = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState("ada");
  const [open, setOpen] = useState(false);
  return (
    <CollectionDetailStyled>
      <ContainerLayout>
        <Strips />
        <Ballon />
        <BreadCrumHeader heading="Token Details" />

        <Box sx={{ py: 10 }} className="montserrat">
          <Grid container spacing={3}>
            <Grid xs={12} md={6} item>
              <img
                src="/images/Buy Our Tokens/Layer 61.png"
                alt=""
                className="w_100 br_15 item_img"
              />
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
                  flexWrap: "wrap",
                  py: 2,
                  "& .detial": {
                    py: 0.5,
                    px: 2,
                    display: "flex",
                  },
                }}
                className="text_white "
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    className="bold text_white montserrat"
                  >
                    Julian Jokey
                  </Typography>
                  <Box sx={{ px: 1 }}>
                    <CheckCircle
                      sx={{
                        color: "var(--secondary-color)",
                        padding: "3px",
                      }}
                    />
                  </Box>
                </Box>
                <Box className="light_white_bg  detial br_15" sx={{ mr: 2 }}>
                  <RemoveRedEyeOutlined sx={{ mr: 1 }} />
                  <Typography>150</Typography>
                </Box>
                <Box className="light_white_bg  detial br_15">
                  <FavoriteBorderOutlined sx={{ mr: 1 }} />
                  <Typography>235</Typography>
                </Box>
              </Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ py: 2.5, px: 2 }}
                    className="light_white_bg text_white br_15"
                  >
                    <Typography className="bold">Price: 100 ADA</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{ py: 2.5, px: 2 }}
                    className="light_white_bg text_white br_15"
                  >
                    <Typography className="bold">Price: 19500 USD</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    className="btn2 w_100"
                    // onClick={() => navigate(`${buyPaymentRoute}/3434`)}
                  >
                    Buy now
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button className="btn w_100" onClick={() => setOpen(true)}>
                    Make an Offer
                  </Button>
                </Grid>
                <Grid xs={12} md={9} item>
                  <CaptionHeading heading="Asset Details" font="montserrat " />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="light_white_bg text_white br_15">
                    <Typography
                      sx={{ pt: 1.5, px: 2 }}
                      className="font_12 light_text"
                    >
                      Asset Name
                    </Typography>
                    <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                      Industrial Revolution
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="light_white_bg text_white br_15">
                    <Typography
                      sx={{ pt: 1.5, px: 2 }}
                      className="font_12 light_text"
                    >
                      Asset ID
                    </Typography>
                    <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                      0411256
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="light_white_bg text_white br_15">
                    <Typography
                      sx={{ pt: 1.5, px: 2 }}
                      className="font_12 light_text"
                    >
                      Listing ID
                    </Typography>
                    <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                      00012456875568552
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={6} xs={12}>
                  <Box className="light_white_bg text_white br_15">
                    <Typography
                      sx={{ pt: 1.5, px: 2 }}
                      className="font_12 light_text"
                    >
                      Minted On
                    </Typography>
                    <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                      Wed Dec 31 2021
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="light_white_bg text_white br_15">
                    <Typography
                      sx={{ pt: 1.5, px: 2 }}
                      className="font_12 light_text"
                    >
                      Number of Tokens
                    </Typography>
                    <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                      05
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="light_white_bg text_white br_15">
                    <Typography
                      sx={{ pt: 1.5, px: 2 }}
                      className="font_12 light_text"
                    >
                      {" "}
                      Listed On
                    </Typography>
                    <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                      Sun Dec 12 2021
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box className="light_white_bg text_white br_15">
                    <Typography
                      sx={{ pt: 1.5, px: 2 }}
                      className="font_12 light_text"
                    >
                      Creator
                    </Typography>
                    <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                      James
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    className="light_white_bg text_white br_15"
                    sx={{ px: 2, py: 1.5 }}
                  >
                    <Box className="space_between">
                      <Typography
                        variant="caption"
                        className="font_12 light_text"
                      >
                        Policy ID
                      </Typography>
                      <ContentCopy className="text_white" sx={{ p: 0.5 }} />
                    </Box>
                    <Box sx={{ py: 0.5 }}></Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    className="light_white_bg text_white br_15"
                    sx={{ px: 2, py: 1.5, height: "200px" }}
                  >
                    <Box className="space_between">
                      <Typography
                        variant="caption"
                        className="font_12 light_text"
                      >
                        Description
                      </Typography>
                    </Box>
                    <Box sx={{ py: 0.5 }}></Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              background: "var(--dark-box-color)",
              py: 4,
              px: 2,
              mt: 15,
              mb: 5,
            }}
            className="br_15"
          >
            <TabTable />
          </Box>
          <Box>
            <BarHeading heading="Our Collections" />
            {/* <Box sx={{ py: 5 }}>
              <Grid container spacing={3}>
                {cardData.map((item, index) => (
                  <Grid xs={12} sm={6} md={3} item key={index}>
                    <ClientCard />
                  </Grid>
                ))}
              </Grid>
            </Box> */}
          </Box>
        </Box>
      </ContainerLayout>
      <OfferModal open={open} setOpen={setOpen} />
    </CollectionDetailStyled>
  );
};

const CollectionDetailStyled = styled.section``;

export default CollectionDetail;
