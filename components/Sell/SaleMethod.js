import React, { useState, useEffect } from "react";
import PaymentHeader from "../shared/header/PaymentHeader";
import { Box, Grid, Tabs, Tab, Button } from "@mui/material";
import axios from "axios";
import Heading from "../shared/headings/Heading";
import FixedPrice from "/public/images/fixed price.svg";
import Auction from "/public/images/auction.svg";
import { TabContext, TabPanel } from "@mui/lab";
import BarHeading from "../../components/shared/headings/BarHeading";
import CaptionHeading from "../shared/headings/CaptionHeading";
import AssetInputField from "./AssetInputField";
import LightText from "../shared/headings/LightText";
import Image from "next/image";
import { useSelector } from "react-redux";
import Fixed from "./FixedPrice";
import AuctionDeal from "./Auction";
import { INSTANCE } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setListing } from "../../redux/listing/ListingActions";
import { setAuction } from "../../redux/listing/ListingActions";
import { setStep } from "../../redux/listing/ListingActions";
import { getObjData } from "../../utils/storageUtils";
import FullScreenLoader from "../shared/FullScreenLoader";
import { Toast } from "../shared/Toast";
import { useRouter } from "next/router";
import { buyDetailRoute, auctionRoute } from "../Routes/constants";
import { getAssetDetail } from "../../services/koiosService";
import { formatDateFromTimestamp } from "../../utils/formattingUtils";
import { callKuberAndSubmit } from "../../services/kuberService";
import { Address, BaseAddress } from "@emurgo/cardano-serialization-lib-asmjs";
import { market } from "../../config/marketConfig";
import { useLovelace, useWallet } from "@meshsdk/react";
import { transferNFT } from "../../services/nftService";
import { transactionErrorHanlder } from "../../utils/errorUtils";
import { blockfrostApiKey } from "../../config/blockfrost";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

import { BlockfrostProvider } from "@meshsdk/core";

const SaleMethod = () => {
  const router = useRouter();
  const { wallet, name: walletName, connected, connect } = useWallet();

  const { action } = router.query;
  const dispatch = useDispatch();

  // const { instance } = useSelector((state) => state.wallet);
  const listing_data = getObjData("listing");
  const [paymentValue, setPaymentValue] = useState("fixed");
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [isForm, setIsForm] = useState(false);
  const [asset, setAsset] = useState([]);
  console.log(asset, "assetassetassetassetassetassetassetassetasset");
  const asset_name = localStorage.getItem("asset_name");
  const onPaymentChange = (event, newValue) => {
    setPaymentValue(newValue);
  };
  const sellNft = async (policyId, selectedNFTsNames, price) => {
    setIsLoading(true);
    const providerInstance = await window.cardano.nami.enable();
    const res = await connect(walletName);
    const blockfrostProvider = new BlockfrostProvider(blockfrostApiKey);
    let selectedNFTs = [];
    let latestAssets = null;
    /** Wait until the latest transaction is mined and we obtain the assets by latest policy id */
    while (!latestAssets || latestAssets.assets.length == 0) {
      console.log("fetching assets...");
      try {
        latestAssets = await blockfrostProvider.fetchCollectionAssets(policyId);
        console.log({ latestAssets });
      } catch (e) {
        console.log(e);
      }

      await delay(5000);
      // Insert some notifier here
    }
    latestAssets = latestAssets.assets;
    console.log(latestAssets, "latest assets");
    for (let index = 0; index < latestAssets.length; index++) {
      const item = latestAssets[index];
      const main = await blockfrostProvider.fetchAssetMetadata(item.unit);

      // console.log("metadata is ", main);
      const url = new URL(main.image);
      // const hash = url.pathname.slice(1);
      console.log(selectedNFTsNames, main.name);
      if (selectedNFTsNames.includes(main.name)) {
        console.log("match ".main);
        selectedNFTs.push({
          ...main,
          isSelling: false,
          // price: "",
          ...item,
          policyId: policyId,
        });
      }
    }

    // console.log(providerInstance, "providerInstance");

    console.log(selectedNFTs, "selectedNFTs");

    const addresses = await providerInstance.getUsedAddresses();
    // console.log(addresses, "addressesaddressesaddresses");

    const sellerAddr = BaseAddress.from_address(
      Address.from_bytes(Uint8Array.from(Buffer.from(addresses[0], "hex")))
    );

    // console.log("sellerAddr", sellerAddr);
    const sellerPkh = Buffer.from(
      sellerAddr.payment_cred().to_keyhash().to_bytes()
    ).toString("hex");
    const sellerStakeKey = Buffer.from(
      sellerAddr.stake_cred().to_keyhash().to_bytes()
    ).toString("hex");
    // console.log("selected NFTs ", selectedNFTs);

    const outputs = selectedNFTs.map((asset) => ({
      address: market.address,
      value: `${asset.policyId}.${asset.name}`,
      datum: {
        fields: [
          {
            fields: [
              {
                fields: [{ bytes: `${sellerPkh}` }],
                constructor: 0,
              }, // pubkeyhash
              {
                fields: [
                  {
                    fields: [
                      {
                        fields: [{ bytes: `${sellerStakeKey}` }],
                        constructor: 0,
                      },
                    ],
                    constructor: 0,
                  },
                ],
                constructor: 0,
              }, // stakekeyHash
            ],
            constructor: 0,
          },
          { int: Math.round(parseFloat(price) * 1e6) },
        ],
        constructor: 0,
      },
    }));

    const selections = await providerInstance.getUtxos();
    console.log(selections, "selections");
    const body = {
      selections,
      outputs,
    };
    console.log("Selling NFTs ");
    console.log(body, "body");

    let res_ = await callKuberAndSubmit(providerInstance, JSON.stringify(body));

    await delay(10000); // 15 seconds delay
    setIsLoading(false);

    // insert some notifier here
    console.log(res_);
  };

  const submitData = async () => {
    if (!connected) {
      Toast("error", "Please connect your wallet");
      return;
    }
    if (isForm) {
      let connectedWallet = window.localStorage.getItem("connectedWallet");
      setIsLoading(true);
      const price_data =
        paymentValue === "fixed"
          ? getObjData("list-item-fixed")
          : getObjData("list-item-auction");
      console.log(price_data, "price_data");
      if (listing_data && price_data) {
        try {
          if (action === "listing") {
            // console.log("listing");
            if (paymentValue === "fixed") {
              await sellNft(
                listing_data.policy_id,
                [listing_data.assets[0].asset_name],
                price_data.price
              );
              setIsLoading(false);
            } else {
              // all work of auction if user wants to list nft

              let recipientAddress = await wallet?.getUsedAddresses();
              recipientAddress[0];
              try {
                const hash = await transferNFT(connectedWallet, {
                  policy_id: listing_data.policy_id,
                  name: listing_data.assets[0].asset_name,
                });
                if (hash) {
                  setIsLoading(false);
                  // fdfdfd
                  const data =
                    listing_data.type === "single"
                      ? {
                          user_id: listing_data?.user_id,
                          collection_id: listing_data._id,
                          mint_type: listing_data?.type,
                        }
                      : {
                          collection_id: listing_data?._id,
                          user_id: listing_data?.user_id,
                          logo_image: listing_data?.logo_image,
                          feature_image: listing_data?.feature_image,
                          mint_type: listing_data?.type,
                          name: listing_data?.name,
                          // sell_type: price_data?.sell_type,
                        };
                  console.log("writing to databse ", {
                    ...price_data,
                    ...data,
                  });
                  const res = await INSTANCE.post("/list/create", {
                    ...price_data,
                    ...data,
                  });
                  if (res) {
                    setIsLoading(false);
                    Toast("success", "Listed Successfully");
                    // dispatch(setStep("step1"));
                    router.push(auctionRoute);
                  }
                }
              } catch (e) {
                setIsLoading(false);
                transactionErrorHanlder(e);
                console.log(e);
              }
            }
          } else {
            if (paymentValue === "fixed") {
              let policyId = window.localStorage.getItem("policy_id");
              policyId = policyId ? policyId : listing_data.policy_id;
              console.log({ listing_data });
              let selectedNFTsNames = [];
              console.log({ assts: listing_data.assets });
              console.log(listing_data.type, "collection");
              if (listing_data.type == "collection") {
                for (
                  let index = 0;
                  index < listing_data.assets.length;
                  index++
                ) {
                  const name_ = listing_data.assets[index].asset_name;
                  selectedNFTsNames.push(name_);
                }
              } else {
                selectedNFTsNames = [asset_name];
              }
              console.log({ selectedNFTsNames, policyId });

              await sellNft(policyId, selectedNFTsNames, price_data.price);
            } else {
              if (listing_data.type === "single") {
                try {
                  const hash = await transferNFT(connectedWallet, {
                    policy_id: listing_data.policy_id,
                    name: listing_data.assets[0].asset_name,
                  });
                  if (hash) {
                    setIsLoading(false);
                    // fdfdfd

                    const data = {
                      user_id: listing_data?.user_id,
                      collection_id: listing_data._id,
                      mint_type: listing_data?.type,
                    };
                    console.log("writing to databse ", {
                      ...price_data,
                      ...data,
                    });
                    const res = await INSTANCE.post("/list/create", {
                      ...price_data,
                      ...data,
                    });
                    if (res) {
                      setIsLoading(false);
                      Toast("success", "Listed Successfully");
                      // dispatch(setStep("step1"));
                      router.push(auctionRoute);
                    }
                  }
                } catch (e) {
                  console.log(e);
                  setIsLoading(false);
                }
              } else {
                const data =
                  listing_data.type === "single"
                    ? {
                        user_id: listing_data?.user_id,
                        collection_id: listing_data._id,
                        mint_type: listing_data?.type,
                      }
                    : {
                        collection_id: listing_data?._id,
                        user_id: listing_data?.user_id,
                        logo_image: listing_data?.logo_image,
                        feature_image: listing_data?.feature_image,
                        mint_type: listing_data?.type,
                        name: listing_data?.name,
                        // sell_type: price_data?.sell_type,
                      };
                console.log("writing to databse ", {
                  ...price_data,
                  ...data,
                });
                const res = await INSTANCE.post("/list/create", {
                  ...price_data,
                  ...data,
                });
                if (res) {
                  setIsLoading(false);
                  Toast("success", "Listed Successfully");
                  // dispatch(setStep("step1"));
                  // router.push(auctionRoute);
                }
              }
            }
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

  useEffect(async () => {
    setIsLoading(true);
    const response = await getAssetDetail(listing_data?.policy_id);
    console.log(response, "datadatadatadata");
    setAsset(response?.data);
    setIsLoading(false);
  }, []);

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
              <BarHeading
                heading={`${
                  listing_data.type === "collection" ? "Collection" : "Asset"
                } Details`}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <CaptionHeading
                font="montserrat"
                heading="Asset Name"
                // heading={`${
                //   listing_data.type === "collection" ? "Collection" : "Asset"
                // } Name`}
              />
              <AssetInputField
                placeholder={`Enter Asset Name`}
                name="asset_name"
                value={asset_name && asset_name}
              />
              {/* <AssetInputField
                placeholder={`Enter Asset Name`}
                name="asset_name"
                value={
                  listing_data.type === "collection"
                    ? listing_data.name
                    : listing_data?.metadata &&
                      listing_data?.metadata.length > 0
                    ? listing_data?.metadata[0]?.name
                    : ""
                }
              /> */}
              {/* <AssetInputField
                placeholder={`Enter ${
                  listing_data.type === "collection"
                    ? "Collection Name"
                    : "Asset Name"
                }`}
                name="asset_name"
                value={
                  listing_data.type === "collection"
                    ? listing_data.name
                    : listing_data?.assets.length > 0
                    ? listing_data?.assets[0]?.asset_name
                    : listing_data?.onchain_metadata?.name
                }
              /> */}
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

          {asset?.length > 0 && (
            <>
              <Grid item xs={12} md={6}>
                <Box>
                  <CaptionHeading heading="Quantity" font="montserrat" />
                  <AssetInputField
                    placeholder="Enter Quantity"
                    name="quantity"
                    // value={listing_data?.assets?.length}
                    value={asset[0]?.mint_cnt}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <CaptionHeading heading="Minted On" font="montserrat" />
                  <AssetInputField
                    placeholder="Enter Minted Date"
                    name="minted_on"
                    value={formatDateFromTimestamp(asset[0].creation_time)}
                    // value={localStorage.getItem("policyId")}
                  />
                </Box>
              </Grid>
            </>
          )}

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
