import React from "react";
import PaymentHeader from "../../components/shared/header/PaymentHeader";
import Strips from "../../components/Design/Strips";
import Ballon from "../../components/Design/Ballon";
import ContainerLayout from "../../components/shared/ContainerLayout";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import LineTab from "../../components/Tabs/LineTab";
import { TabContext } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import { ContentCopy, Circle } from "@mui/icons-material";
import QrCode from "../../components/QR Code/Qr";
import DarkBgLayout from "../../components/Design/DarkBgLayout";
import BarHeading from "../../components/shared/headings/BarHeading";
import ClientCard from "../../components/Cards/ClientCard";

const cardData = [{}, {}, {}, {}];
const tabData = [
  {
    value: "ada",
    label: "Pay with ADA",
  },
];

const Payment = () => {
  const [tabValue, setTabValue] = React.useState("ada");
  return (
    <>
      <ContainerLayout>
        <Strips />
        <Ballon />
        <BreadCrumHeader heading="Buy with ada" />
        <TabContext value={tabValue} sx={{ py: 5 }}>
          <LineTab setTabValue={setTabValue} tabData={tabData} />
          {/* <TabPanel value="ada"></TabPanel> */}
        </TabContext>
        <Box sx={{ py: 5 }}>
          <PaymentHeader heading="INDUSTRIAL REVOLUTION" show />
          <DarkBgLayout>
            {/* <Box className="light_white_bg" sx={{ p: 3, px: 4 }}> */}
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box className="flex_align" sx={{ flexWrap: "wrap" }}>
                  <Box sx={{ mr: 2 }}>
                    <QrCode />
                  </Box>
                  <Box className="text_white" sx={{ py: 2 }}>
                    <Typography variant="h6">Make Payment</Typography>
                    <Typography variant="caption">
                      Please follow the instruction given below and make the
                      payment with the chosen payment method.
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  <Grid xs={12} md={6} item>
                    <Box
                      className="light_white_bg space_between br_15"
                      sx={{ p: 2 }}
                    >
                      <Typography variant="caption" className="montserrat bold">
                        Price: 19500 ADA
                      </Typography>
                      <ContentCopy sx={{ p: 0.4 }} />
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} item>
                    <Box
                      className="light_white_bg space_between br_15"
                      sx={{ p: 2 }}
                    >
                      <Typography variant="caption" className="montserrat bold">
                        Price: 100 USD
                      </Typography>
                      <ContentCopy sx={{ p: 0.4 }} />
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} item>
                    <Box
                      className="light_white_bg space_between br_15"
                      sx={{ p: 1, px: 2 }}
                    >
                      <Box>
                        <Typography variant="caption" component="div">
                          Address
                        </Typography>
                        <Typography variant="caption bold" component="div">
                          aodlsjjsdbmjkskdjdkll….
                        </Typography>
                      </Box>
                      <ContentCopy sx={{ p: 0.4 }} />
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} item>
                    <Box className="light_white_bg  br_15" sx={{ p: 1, px: 2 }}>
                      <Typography variant="caption" component="div">
                        Timer
                      </Typography>
                      <Typography variant="caption bold" component="div">
                        19 : 20
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} item>
                    <Box
                      className="light_white_bg space_between br_15"
                      sx={{ p: 1, px: 2 }}
                    >
                      <Box>
                        <Typography variant="caption" component="div">
                          Asset ID
                        </Typography>
                        <Typography variant="caption bold" component="div">
                          00012456875568552.
                        </Typography>
                      </Box>
                      <ContentCopy sx={{ p: 0.4 }} />
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} item>
                    <Box className="light_white_bg  br_15" sx={{ p: 1, px: 2 }}>
                      <Typography variant="caption" component="div">
                        Project
                      </Typography>
                      <Typography variant="caption bold" component="div">
                        Julian Jokey
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} item>
                    <Box
                      className="light_white_bg  br_15"
                      sx={{ py: 2, px: 2 }}
                    >
                      <Typography variant="caption" component="div">
                        Policy Id
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} item>
                    <Box
                      className="light_white_bg  br_15"
                      sx={{ py: 2, px: 2 }}
                    >
                      <Typography variant="caption" component="div">
                        Instructions
                      </Typography>
                      <Box className="flex_align">
                        <Circle sx={{ mr: 1, width: "0.5em" }} />
                        <Typography variant="caption">
                          Your text goes here, This is placeholder text. Your
                          text goes here
                        </Typography>
                      </Box>
                      <Box className="flex_align">
                        <Circle sx={{ mr: 1, width: "0.5em" }} />
                        <Typography variant="caption">
                          Your text goes here, This is placeholder text. Your
                          text goes here
                        </Typography>
                      </Box>
                      <Box className="flex_align">
                        <Circle sx={{ mr: 1, width: "0.5em" }} />
                        <Typography variant="caption">
                          Your text goes here, This is placeholder text. Your
                          text goes here
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <img
                  src="/images/Buy Our Tokens/Layer 61.png"
                  alt=""
                  className="w_100 br_15"
                />
              </Grid>
            </Grid>
            {/* </Box> */}
          </DarkBgLayout>
          <Box sx={{ py: 2 }}>
            <BarHeading heading="Explore More of Our Tokens" />
          </Box>
          {/* <Box sx={{ py: 5 }}>
            <Grid container spacing={3}>
              {cardData.map((item) => (
                <Grid xs={12} sm={6} md={3} item>
                  <ClientCard />
                </Grid>
              ))}
            </Grid>
          </Box> */}
        </Box>
      </ContainerLayout>
    </>
  );
};

export default Payment;
