import React, { useState } from "react";
import styled from "styled-components";
import { Box, Grid, Typography, Button } from "@mui/material";
import ContainerLayout from "../../components/shared/ContainerLayout";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";

import {
  RemoveRedEyeOutlined,
  FavoriteBorderOutlined,
  CheckCircle,
  ContentCopy,
  Circle,
} from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";

import Strips from "../../components/Design/Strips";
import Ballon from "../../components/Design/Ballon";
import BarHeading from "../../components/shared/headings/BarHeading";
import ClientCard from "../../components/Cards/ClientCard";
import LineTab from "../../components/Tabs/LineTab";
import { buyPaymentRoute } from "../../components/Routes/constants";
import { useRouter } from "next/router";
const List = [{}, {}, {}, {}];

const cardData = [{}, {}, {}, {}];
const tabData = [
  {
    label: "Pay with ADA",
    value: "ada",
  },
  {
    label: "Pay with Credit Card",
    value: "credit",
  },
  {
    label: "Pay by  Check",
    value: "check",
  },
];
const BuyDetail = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState("ada");
  return (
    <BuyDetailStyled>
      <ContainerLayout>
        <Strips />
        <Ballon />
        <BreadCrumHeader heading="Buy with ADA" />
        <TabContext value={tabValue}>
          <Box sx={{ pb: 4, pt: 10 }}>
            <Box sx={{ borderBottom: 1, borderColor: "white" }}>
              <Grid container spacing={2} alignItems="center ">
                <Grid item xs={12} md={8}>
                  <LineTab tabData={tabData} setTabValue={setTabValue} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    className="flex_align"
                    sx={{ justifyContent: { xs: "start", md: "end" } }}
                  >
                    <Button className="btn2" sx={{ my: 2 }}>
                      Connect Your Wallet
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <TabPanel value="ada" sx={{ p: 0 }}>
            <Box sx={{ py: 10 }}>
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
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3.5}>
                        <Box className="flex_align">
                          <Typography
                            variant="h6"
                            className="bold text_white montserrat"
                          >
                            Julian Jokey
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ px: 1 }}>
                              <CheckCircle
                                sx={{
                                  color: "var(--secondary-color)",
                                  padding: "3px",
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid xs={4} md={2.4} item>
                        <Box
                          className="light_white_bg  detial br_15"
                          sx={{ mr: 2 }}
                        >
                          <RemoveRedEyeOutlined sx={{ mr: 1 }} />
                          <Typography>150</Typography>
                        </Box>
                      </Grid>
                      <Grid xs={3.7} md={2.4} item>
                        <Box className="light_white_bg  detial br_15">
                          <FavoriteBorderOutlined sx={{ mr: 1 }} />
                          <Typography>235</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Box
                        sx={{ py: 2.5, px: 2 }}
                        className="light_white_bg text_white br_15"
                      >
                        <Typography className="bold montserrat">
                          Price: 100 ADA
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box
                        sx={{ py: 2.5, px: 2 }}
                        className="light_white_bg text_white br_15 montserrat"
                      >
                        <Typography className="bold montserrat">
                          Price: 19500 USD
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button
                        className="btn2 w_100 montserrat initialcase"
                        onClick={() => router.push(`${buyPaymentRoute}`)}
                      >
                        Buy Now
                      </Button>
                    </Grid>
                    <Grid xs={12} md={9} item>
                      <Typography
                        sx={{ py: 0 }}
                        className="text_white bold montserrat"
                      >
                        Make Payment
                      </Typography>
                      <Typography
                        sx={{ pb: 2 }}
                        variant="caption"
                        className="text_white montserrat"
                      >
                        Please follow the instruction given below and make the
                        payment with the chosen payment method.
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box className="light_white_bg text_white br_15">
                        <Typography
                          sx={{ pt: 1.5, px: 2 }}
                          className="font_12 light_text"
                        >
                          Address
                        </Typography>
                        <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                          aodlsjjsdbms,n,d.kokjdhjkskdjdkll….
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box className="light_white_bg text_white br_15 light_text">
                        <Typography sx={{ pt: 1.5, px: 2 }} className="font_12">
                          Timer
                        </Typography>
                        <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                          19 : 20
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Box className="light_white_bg text_white br_15">
                        <Typography
                          sx={{ pt: 1.5, px: 2 }}
                          className="font_12 light_text "
                        >
                          Asset ID
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
                          Project
                        </Typography>
                        <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                          Julian Jokey
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid md={12} xs={12} item>
                      <Box
                        className="light_white_bg text_white br_15"
                        sx={{ px: 2, py: 1.5 }}
                      >
                        <Box className="space_between">
                          <Typography
                            variant="caption"
                            className="light_text font_12"
                          >
                            Instructions
                          </Typography>
                          <ContentCopy className="text_white" sx={{ p: 0.5 }} />
                        </Box>
                        <Box sx={{ py: 0.5 }}>
                          {List.map((item) => (
                            <Box sx={{ display: "flex" }}>
                              <Circle sx={{ mr: 1, width: "0.5em" }} />
                              <Typography variant="caption">
                                Your text goes here, This is placeholder text.
                                Your text goes here
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box>
                <BarHeading heading="Explore more from this artist" />
                <Box sx={{ py: 5 }}>
                  <Grid container spacing={3}>
                    {cardData.map((item) => (
                      <Grid xs={12} sm={6} md={3} item>
                        <ClientCard />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="credit">
            <Typography sx={{}} variant="h1" className="text_white text_center">
              coming soon
            </Typography>
          </TabPanel>
          <TabPanel value="check">
            <Typography sx={{}} variant="h1" className="text_white text_center">
              coming soon
            </Typography>
          </TabPanel>
        </TabContext>
      </ContainerLayout>
    </BuyDetailStyled>
  );
};

export default BuyDetail;

const BuyDetailStyled = styled.section`
  .item_img {
    height: 100%;
    object-fit: cover;
  }
`;
