import React, { useState } from "react";
import PaymentHeader from "../shared/header/PaymentHeader";
import {
  Box,
  Grid,
  Tabs,
  Tab,
  Button,
  FormGroup,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Heading from "../shared/headings/Heading";
import FixedPrice from "/public/images/fixed price.svg";
import Auction from "/public/images/auction.svg";
import { TabContext, TabPanel } from "@mui/lab";
import BarHeading from "../../components/shared/headings/BarHeading";
import CaptionHeading from "../shared/headings/CaptionHeading";
import AssetInputField from "./AssetInputField";
import LightText from "../shared/headings/LightText";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { saleMethodSchema } from "../../schema/Index";
import { useFormik } from "formik";
import Image from "next/image";
const SaleMethod = ({ setListingSteps }) => {
  const [paymentValue, setPaymentValue] = useState("fixed");
  const [auctionDuration, setAuctionDuration] = useState({
    days: "",
    hours: "",
    minutes: "",
  });

  const onPaymentChange = (event, newValue) => {
    setPaymentValue(newValue);
  };
  const [value, setValue] = React.useState(new Date());
  const onAuctionDurationChange = (e, type) => {
    // let form = ev.currentTarget;
    setAuctionDuration({
      ...auctionDuration,
      [e.target.name]: e.target.value,
    });
  };
  const onAuctionArrowChange = (e, val) => {
    if (val === "up") {
      if (auctionDuration.days || auctionDuration.days === 1) {
        console.log("if");
        setAuctionDuration({
          ...auctionDuration,
          days: parseInt(auctionDuration.days) + 1,
        });
      } else {
        console.log("else");
        setAuctionDuration({
          ...auctionDuration,
          days: 1,
        });
      }
    } else {
      setAuctionDuration({
        ...auctionDuration,
        days: parseInt(auctionDuration.days) - 1,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      asset_name: "",
      asset_id: "",
      policy_id: "",
      quantity: "",
      minted_on: "",
      creator: "",
    },
    validationSchema: saleMethodSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* <Button
        className="btn2"
        sx={{ my: 2 }}
        onClick={() => setListingSteps("step1")}
      >
        Back
      </Button> */}
      <PaymentHeader heading="Heading Goes Here #001254" show={false} />
      <Box
        sx={{
          background: "var(--dark-box-color)",
          px: 2,
          py: 3,
          borderRadius: "0 0 15px 15px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box className="flex">
              <Heading heading="Select your sale method" />
            </Box>
            <Box sx={{ py: 3 }}>
              <TabContext value={paymentValue}>
                <Tabs
                  value={paymentValue}
                  onChange={onPaymentChange}
                  aria-label="icon label tabs example"
                  sx={{
                    "& .MuiTabs-indicator": {
                      background: "transparent",
                    },
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "space-between",
                    },
                    "& 	.Mui-selected": {
                      border: "1px solid #fff !important",
                    },
                    "& .tab_btn": {
                      border: "1px solid transparent",

                      borderRadius: "15px",
                      fontWeight: "bold",
                      color: "#fff !important",
                      background: "var(--box-color)",
                      width: "47.5%",
                      py: 2,
                      // marginRight: "15px",
                    },
                  }}
                >
                  <Tab
                    icon={<Image src={FixedPrice} />}
                    label="Fixed Price"
                    value="fixed"
                    className="tab_btn"
                  />

                  <Tab
                    icon={<Image src={Auction} />}
                    label="Auction"
                    className="tab_btn"
                    value="auction"
                  />
                </Tabs>
                <TabPanel value="fixed" sx={{ px: 0 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} lg={6}>
                      <CaptionHeading heading="Set you price" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <AssetInputField placeholder="Price" ada />
                    </Grid>
                  </Grid>
                  <FormGroup
                    sx={{
                      label: {
                        color: "#fff",
                      },
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          size="small"
                          sx={{
                            color: "#fff",
                            "&.Mui-checked": {
                              color: "#fff",
                            },
                          }}
                        />
                      }
                      label="I am open to offers"
                    />
                  </FormGroup>
                  <Box sx={{ py: 2 }}>
                    <Button className="btn2" sx={{ width: "150px" }}>
                      Set Price
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel value="auction" sx={{ px: 0 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} lg={6}>
                      <CaptionHeading heading="Set you price" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <AssetInputField placeholder="Price" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <CaptionHeading heading="Minimum price" />
                      <LightText heading="(Optional)" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <AssetInputField placeholder="Price" />
                    </Grid>
                    <Grid item xs={12}>
                      <LightText heading="(Your listing will not sell unless it reached your minimum price)" />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <CaptionHeading heading="Auction Duration" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={8}
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      {/* <AssetInputField
                        type="number"
                        // placeholder="2 Days 00:00 Min"
                        placeholder="Day"
                        label="Day"
                      /> */}
                      <Box
                        sx={{
                          pl: 2,
                          pr: 6,
                          position: "relative",
                          width: "fit-content",
                          display: "flex",
                          alignItems: "center",
                          background: "var(--box-color)",
                          borderRadius: "15px 0  0 15px",
                        }}
                      >
                        {/* <form
                          id="time_form"
                          onInput={(e) => onAuctionDurationChange(e)}
                        > */}
                        <TextField
                          type="text"
                          // min="0"
                          // max="30"
                          // step="1"
                          autocomplete="off"
                          // label="Days"
                          placeholder="0"
                          value={auctionDuration.days}
                          onChange={(e) => onAuctionDurationChange(e, "days")}
                          InputLabelProps={{
                            style: {
                              color: "#fff",
                            },
                          }}
                          name="days"
                          sx={{
                            width: "18px",
                            fieldset: {
                              border: "none",
                            },
                            "& .MuiOutlinedInput-root": {
                              color: "#ffff",
                              background: "transparent",
                              borderRadius: "15px 0  0 15px",
                            },

                            input: {
                              padding: "16.5px  0px",
                              "&::placeholder": {
                                color: "#fff",
                              },
                            },
                          }}
                        />
                        <Box sx={{ pl: 0.5, pr: 0.5 }}>
                          <CaptionHeading heading="days" font="montserrat" />
                        </Box>
                        <TextField
                          type="text"
                          autocomplete="off"
                          // label="hours"
                          placeholder="00"
                          value={auctionDuration.hours}
                          onChange={(e) => onAuctionDurationChange(e, "hours")}
                          InputLabelProps={{
                            style: {
                              color: "#fff",
                            },
                          }}
                          name="hours"
                          sx={{
                            width: "18px",
                            fieldset: {
                              border: "none",
                            },
                            "& .MuiOutlinedInput-root": {
                              color: "#ffff",
                              background: "transparent",
                              borderRadius: "0",
                            },

                            input: {
                              padding: "16.5px  0px",

                              "&::placeholder": {
                                color: "#fff",
                              },
                            },
                          }}
                        />
                        <Box sx={{ px: 0.5 }}>
                          <CaptionHeading heading=":" font="montserrat" />
                        </Box>
                        <TextField
                          type="text"
                          autocomplete="off"
                          // label="min"
                          placeholder="00"
                          value={auctionDuration.minutes}
                          onChange={(e) =>
                            onAuctionDurationChange(e, "minutes")
                          }
                          InputLabelProps={{
                            style: {
                              color: "#fff",
                            },
                          }}
                          name="minutes"
                          sx={{
                            width: "18px",
                            fieldset: {
                              border: "none",
                            },
                            "& .MuiOutlinedInput-root": {
                              color: "#ffff",
                              background: "transparent",
                              borderRadius: "0",
                            },
                            input: {
                              padding: "16.5px  0px",
                              "&::placeholder": {
                                color: "#fff",
                              },
                            },
                          }}
                        />
                        <Box sx={{ px: 1 }}>
                          <CaptionHeading
                            heading="hours/min"
                            font="montserrat"
                          />
                        </Box>
                        <Box
                          sx={{
                            background: "var(--box-color)",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <IconButton
                            sx={{ height: "24px" }}
                            onClick={(e) => onAuctionArrowChange(e, "up")}
                          >
                            <ArrowDropUp sx={{ color: "#fff" }} />
                          </IconButton>
                          <IconButton
                            sx={{ height: "24px" }}
                            onClick={(e) => onAuctionArrowChange(e, "down")}
                          >
                            <ArrowDropDown sx={{ color: "#fff" }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Button className="btn2" sx={{ width: "100%", my: 2 }}>
                    Set Price
                  </Button>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Heading heading="Summary" />
            <Box
              sx={{
                mt: 3,
                background: "var(--box-color)",
                p: 3,
                borderRadius: "15px 15px 0  0",
              }}
            >
              <LightText heading="Listing an items for sell is free, but once it sell you will pay the following fees:" />
              <Box className="space_between" sx={{ py: 1 }}>
                <CaptionHeading heading="To CNFT Genie" font="montserrat" />
                <CaptionHeading heading="2.5%" font="montserrat" />
              </Box>
              <Box className="space_between" sx={{ py: 1 }}>
                <Box>
                  <CaptionHeading heading="To Creator" font="montserrat" />
                  <LightText heading="(If royalty fee is set by the artist)" />
                </Box>
                <CaptionHeading heading="10%" font="montserrat" />
              </Box>
              <Box className="space_between" sx={{ py: 1 }}>
                <CaptionHeading heading="Total %" font="montserrat" />
                <CaptionHeading heading="12.5%" font="montserrat" />
              </Box>
            </Box>
            <Box
              className="space_between"
              sx={{
                p: 3,
                borderRadius: "0px 0px 15px  15px",

                background: "#ffffff4d ",
              }}
            >
              <CaptionHeading heading="Total ADA" font="montserrat" />
              <CaptionHeading heading="XX ADA" font="montserrat" />
            </Box>
          </Grid>

          {/* form data  */}
          <Grid xs={12} item>
            <Box sx={{ pt: 0, pb: 1 }}>
              <BarHeading heading="Asset Details" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Asset Name" font="montserrat" />
              <AssetInputField
                formik={formik}
                placeholder="Enter Asset Name"
                name="asset_name"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Asset ID" font="montserrat" />
              <AssetInputField
                formik={formik}
                placeholder="Enter Asset ID"
                copy
                name="asset_id"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Policy ID" font="montserrat" />
              <AssetInputField
                formik={formik}
                placeholder="Enter policy ID"
                copy
                name="policy_id"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Quantity" font="montserrat" />
              <AssetInputField
                formik={formik}
                placeholder="Enter Quantity"
                name="quantity"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Minted On" font="montserrat" />
              <AssetInputField
                formik={formik}
                placeholder="Enter Minted Date"
                name="minted_on"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Creator" font="montserrat" />

              <AssetInputField
                formik={formik}
                placeholder="Enter Creator"
                name="creator"
              />
            </Box>
          </Grid>
          <Grid item xs={12} className="flex">
            <Button sx={{ width: "150px" }} className="btn2" type="submit">
              Sell
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default SaleMethod;
