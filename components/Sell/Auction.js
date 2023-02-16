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
import CaptionHeading from "../shared/headings/CaptionHeading";
import AssetInputField from "./AssetInputField";
import LightText from "../shared/headings/LightText";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { auctionDealSchema } from "../../schema/Index";
import { useFormik } from "formik";
import Image from "next/image";
import { useSelector } from "react-redux";
import PriceInputField from "./PriceInputField";
import { setAuction } from "../../redux/listing/ListingActions";

const Auction = () => {
  const auction = useSelector((state) => state.listing.auction);
  const [auctionDuration, setAuctionDuration] = useState({
    days: "",
    hours: "",
    minutes: "",
  });

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
      price: "",
      min_price: "",
      duration: "4",
    },
    validationSchema: auctionDealSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(setAuction(values));
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} lg={6}>
            <CaptionHeading heading="Set you price" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <PriceInputField placeholder="Price" name="price" formik={formik} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CaptionHeading heading="Minimum price" />
            <LightText heading="(Optional)" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <PriceInputField
              placeholder="Price"
              name="min_price"
              formik={formik}
            />
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
                  readOnly: true,

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
                onChange={(e) => onAuctionDurationChange(e, "minutes")}
                InputLabelProps={{
                  readOnly: true,
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
                <CaptionHeading heading="hours/min" font="montserrat" />
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
        <Button className="btn2" sx={{ width: "100%", my: 2 }} type="submit">
          Set Price
        </Button>
      </form>
    </>
  );
};

export default Auction;
