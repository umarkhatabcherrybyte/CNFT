import React, { useState, useEffect } from "react";
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
import Auction from "/public/images/auction.svg";
import { TabContext, TabPanel } from "@mui/lab";
import BarHeading from "../../components/shared/headings/BarHeading";
import CaptionHeading from "../shared/headings/CaptionHeading";
import AssetInputField from "./AssetInputField";
import LightText from "../shared/headings/LightText";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { fixedPriceSchema } from "../../schema/Index";
import { useFormik } from "formik";
import Image from "next/image";
import { useSelector } from "react-redux";
import PriceInputField from "./PriceInputField";
import { useDispatch } from "react-redux";
import { setAuction } from "../../redux/listing/ListingActions";
const FixedPrice = ({ setTotalAmount, setIsForm }) => {
  // const { auction, data: listing } = useSelector((state) => state.listing);
  // console.log(auction);
  // console.log(listing);
  // const dispatch = useDispatch();
  useEffect(() => {
    setIsForm(false);
  }, []);
  const formik = useFormik({
    initialValues: {
      price: "",
      is_open_for_offer: false,
      sell_type: "fixed",
    },
    validationSchema: fixedPriceSchema,
    onSubmit: (values) => {
      setTotalAmount(values.price * 0.025);
      setIsForm(true);
      window.localStorage.setItem("list-item-fixed", JSON.stringify(values));
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
            <PriceInputField
              formik={formik}
              name="price"
              placeholder="Price"
              ada
            />
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
                name="is_open_for_offer"
                onChange={formik.handleChange}
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
          <Button className="btn2" sx={{ width: "150px" }} type="submit">
            Set Price
          </Button>
        </Box>
      </form>
    </>
  );
};

export default FixedPrice;
