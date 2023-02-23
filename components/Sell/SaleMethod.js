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
import FixedPrice from "/public/images/fixed price.svg";
import Auction from "/public/images/auction.svg";
import { TabContext, TabPanel } from "@mui/lab";
import BarHeading from "../../components/shared/headings/BarHeading";
import CaptionHeading from "../shared/headings/CaptionHeading";
import AssetInputField from "./AssetInputField";
import LightText from "../shared/headings/LightText";
import { ArrowDropUp, ArrowDropDown, PriceChange } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { saleMethodSchema } from "../../schema/Index";
import { useFormik } from "formik";
import Image from "next/image";
import { useSelector } from "react-redux";
import Fixed from "./FixedPrice";
import AuctionDeal from "./Auction";
import { INSTANCE } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setListing } from "../../redux/listing/ListingActions";
import { setAuction } from "../../redux/listing/ListingActions";
import { getObjData } from "../../helper/localStorage";
import FullScreenLoader from "../shared/FullScreenLoader";
import moment from "moment";
import { Toast } from "../shared/Toast";
import { useRouter } from "next/router";
import { buyDetailRoute, auctionRoute } from "../Routes/constants";
const SaleMethod = () => {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const [listing, setListing] = useState();
  // const { auction } = useSelector((state) => state.listing);
  // console.log(auction);
  // console.log(listing);
  const listing_data = getObjData("listing");
  const [paymentValue, setPaymentValue] = useState("fixed");
  const [isLoading, setIsLoading] = useState(false);
  const [toalAmount, setTotalAmount] = useState("");
  const [isForm, setIsForm] = useState(false);
  console.log(toalAmount);
  const onPaymentChange = (event, newValue) => {
    setPaymentValue(newValue);
  };

  const submitData = async () => {
    if (isForm) {
      setIsLoading(true);
      const price_data =
        paymentValue === "fixed"
          ? getObjData("list-item-fixed")
          : getObjData("list-item-auction");
      if (listing_data && price_data) {
        const data =
          listing_data.type === "single"
            ? {
              user_id: listing_data?.user_id,
              collection_id: listing_data._id,
            }
            : {
              user_id: listing_data?.type,
            };
        try {
          // let formData = new FormData();
          // formData.append("price", fixed_data["price"]);
          // formData.append("is_open_for_offer", fixed_data["is_open_for_offer"]);
          // formData.append("sell_type", fixed_data["sell_type"]);
          // formData.append("user_id", listing_data?.user_id);
          // formData.append("nft_ids", JSON.stringify([listing_data._id]));
          // formData.append("mint_type", listing_data.type);
          const res = await INSTANCE.post(
            listing_data.type === "single"
              ? "/list/create/single"
              : "/list/create/collection",
            { ...price_data, ...data }
          );
          if (res) {
            setIsLoading(false);
            const route =
              paymentValue === "fixed" ? buyDetailRoute : auctionRoute;
            router.push(route);
            console.log(res, "response");
          }
        } catch (e) {
          setIsLoading(false);
          console.log(e);
        }
      }
    } else {
      Toast("error", "Please set your price.");
    }
  };
  return (
    <>
      {isLoading && <FullScreenLoader />}
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
                  <Fixed
                    setTotalAmount={setTotalAmount}
                    setIsForm={setIsForm}
                  />
                </TabPanel>
                <TabPanel value="auction" sx={{ px: 0 }}>
                  <AuctionDeal
                    setTotalAmount={setTotalAmount}
                    setIsForm={setIsForm}
                  />
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
                borderRadius: "15px ",
              }}
            >
              <LightText heading="Listing an items for sell is free, but once it sell you will pay the following fees:" />
              <Box className="space_between" sx={{ py: 1 }}>
                <CaptionHeading heading="To CNFT Genie" font="montserrat" />
                <CaptionHeading heading="2.5%" font="montserrat" />
              </Box>
              {/* <Box className="space_between" sx={{ py: 1 }}>
                <Box>
                  <CaptionHeading heading="To Creator" font="montserrat" />
                  <LightText heading="(If royalty fee is set by the artist)" />
                </Box>
                <CaptionHeading heading="10%" font="montserrat" />
              </Box> */}
              <Box className="space_between" sx={{ py: 1 }}>
                <CaptionHeading heading="Total %" font="montserrat" />
                <CaptionHeading heading="2.5%" font="montserrat" />
              </Box>
            </Box>
            {/* <Box
              className="space_between"
              sx={{
                p: 3,
                borderRadius: "0px 0px 15px  15px",

                background: "#ffffff4d ",
              }}
            >
              <CaptionHeading heading="Total ADA" font="montserrat" />
              <CaptionHeading heading={`${toalAmount} ADA`} font="montserrat" />
            </Box> */}
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
                placeholder="Enter Asset Name"
                name="asset_name"
                value={listing_data?.assets[0]?.asset_name}
              />
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Asset ID" font="montserrat" />
              <AssetInputField
                placeholder="Enter Asset ID"
                copy
                name="asset_id"
              />
            </Box>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Policy ID" font="montserrat" />
              <AssetInputField
                placeholder="Enter policy ID"
                copy
                name="policy_id"
                value={listing_data?.policy_id}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Quantity" font="montserrat" />
              <AssetInputField
                placeholder="Enter Quantity"
                name="quantity"
                value={listing_data?.assets?.length}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading heading="Minted On" font="montserrat" />
              <AssetInputField
                placeholder="Enter Minted Date"
                name="minted_on"
                value={moment(new Date(listing_data?.createdAt)).format(
                  "Do MMMM YYYY"
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} className="flex">
            <Button
              sx={{ width: "150px" }}
              className="btn2"
              onClick={submitData}
            >
              Sell
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SaleMethod;
