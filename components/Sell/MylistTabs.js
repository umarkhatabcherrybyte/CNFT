import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Grid,
  Tab,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import InputField from "./InputField";
import LightText from "../shared/headings/LightText";
import { addSingleListingSchema } from "../../schema/Index";
import { useFormik } from "formik";
import ListCollection from "./ListCollection";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { create } from "ipfs-http-client";
import { setListing } from "../../redux/listing/ListingActions";
import { setStep } from "../../redux/listing/ListingActions";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Toast } from "../shared/Toast";
import { INSTANCE } from "../../config/axiosInstance";
import FullScreenLoader from "../shared/FullScreenLoader";
const inputFileStyle = {
  my: 2,
  background: "#FFFFFF33 ",
  border: "3px dashed #fff",
  height: "12rem",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
];

const MylistTabs = () => {
  const { wallet, connected } = useWallet();
  const [recipientAddress, setRecipientAddress] = useState("");
  React.useEffect(() => {
    async function getAddress() {
      if (connected) {
        let address = await wallet?.getUsedAddresses();
        setRecipientAddress(address[0]);
      }
    }
    getAddress();
  }, [wallet]);
  const listing = useSelector((state) => state.listing.data);
  // console.log(listing);
  const dispatch = useDispatch();
  const router = useRouter();
  const [tabValue, setTabValue] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const formik = useFormik({
    initialValues: {
      type: "single",
      file: null,
      name: "",
      description: "",
      collection_name: "",
    },
    validationSchema: addSingleListingSchema,
    onSubmit: async (values) => {
      try {
        if (connected) {
          setIsLoading(true);
          let connectedWallet = window.localStorage.getItem("connectedWallet");
          if (values.file != null || values.file != undefined) {
            const projectId = "2IAoACw6jUsCjy7i38UO6tPzYtX";
            const projectSecret = "136393a5b7f4e47a9e153a88eb636003";
            const auth = `Basic ${Buffer.from(
              `${projectId}:${projectSecret}`
            ).toString("base64")}`;
            const client = create({
              host: "ipfs.infura.io",
              port: 5001,
              protocol: "https",
              headers: {
                authorization: auth,
              },
            });
            const uploaded_image = await client.add(values.file);
            if (uploaded_image) {
              console.log(uploaded_image, "img");

              const transferLucid = await Lucid.new(
                new Blockfrost(
                  "https://cardano-preprod.blockfrost.io/api/v0",
                  "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"
                ),
                "Preprod"
              );

              transferLucid.selectWalletFromSeed(
                "cake throw fringe stock then already drip toss hunt avocado what walk divert noodle fork above hurt carbon leisure siege hand enter air surprise"
              );

              const lucidBrowser = await Lucid.new(
                new Blockfrost(
                  "https://cardano-preprod.blockfrost.io/api/v0",
                  "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"
                ),
                "Preprod"
              );

              const api = await window.cardano[
                String(connectedWallet)
              ].enable();
              lucidBrowser.selectWallet(api);

              const { paymentCredential } =
                lucidBrowser.utils.getAddressDetails(
                  await lucidBrowser.wallet.address()
                );
              const mintingPolicy = lucidBrowser.utils.nativeScriptFromJson({
                type: "all",
                scripts: [
                  { type: "sig", keyHash: paymentCredential?.hash },
                  {
                    type: "before",
                    slot: lucidBrowser.utils.unixTimeToSlot(
                      Date.now() + 518400000
                    ),
                  },
                ],
              });

              const policyId =
                lucidBrowser.utils.mintingPolicyToId(mintingPolicy);
              console.log(mintingPolicy, policyId, "pm");
              let metadataX = {};
              let metadata = {
                name: values.name,
                image: `ipfs://${uploaded_image.path}`,
                mediaType: values.file.type,
              };
              if (values.description.length > 0) {
                metadata["description"] = values.description;
              }
              metadataX[metadata.name] = metadata;
              console.log(metadataX, "dsadasd");
              const unit = policyId + fromText(metadata.name);

              let obj = { [policyId]: metadataX };
              console.log(obj, "obj");
              const tx = await lucidBrowser
                .newTx()
                .attachMetadata("721", obj)
                .mintAssets({ [unit]: 1n })
                .payToAddress(await transferLucid.wallet.address(), {
                  [unit]: 1n,
                })
                .validTo(Date.now() + 100000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
              const signedTx = await tx.sign().complete();
              const txHash = await signedTx.submit();
              console.log(txHash, "hasg");
              if (txHash) {
                //  api call
                try {
                  const user_id = window.localStorage.getItem("userid");
                  metadata["unit"] = unit;
                  metadata["ipfs"] = uploaded_image.path;
                  const data = {
                    metadata: [metadata],
                    user_id: user_id,
                    recipient_address: recipientAddress,
                    policy_id: policyId,
                    type: "single",
                    minting_policy: JSON.stringify(mintingPolicy),
                    // asset_hex_name: unit,
                  };
                  const res = await INSTANCE.post("/collection/create", data);
                  if (res) {
                    setIsLoading(false);
                    dispatch(setStep("step2"));
                    // dispatch(setListing())
                    window.localStorage.setItem(
                      "listing",
                      JSON.stringify(res?.data.data)
                    );
                  }
                } catch (e) {
                  setIsLoading(false);

                  console.log(e);
                }
                //
                // window.localStorage.setItem("policy-id", policyId);
                // window.localStorage.setItem(
                //   "minting-script",
                //   JSON.stringify(mintingPolicy)
                // );
              }
            }
          } else {
            Toast("error", "Please connect your wallet first");
          }
        } else {
          Toast("error", "Connect Your Wallet First");
        }
      } catch (error) {
        console.log(error, "err");
        setIsLoading(false);

        Toast("error", "Error Occured During Minting");
      }
    },
  });

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <TabContext value={tabValue}>
        <TabList
          onChange={onTabChange}
          aria-label="lab API tabs example"
          sx={{
            minHeight: "auto",
            "& .MuiTabs-flexContainer": {
              alignItems: "center",
            },
            "& .MuiTabs-indicator": {
              background: "transparent",
            },

            "& 	.Mui-selected": {
              color: "#000 !important",
              background: "var(--secondary-color) !important",
            },
            "& 	.MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
            "& .tab_btn": {
              color: "#ffff",
              minHeight: "58px",
              border: "none !important",
              maxWidth: "inherit",
              flexShrink: "inherit",
              background: "#0000004d",
              width: { sm: "50%", xs: "100%" },
              fontWeight: "bold",
              alignItems: "flex-start",
              fontSize: "1.4rem",
              padding: 0,
              py: 3,
              pl: 3,
            },
          }}
        >
          <Tab
            label="Add Listing"
            value="add"
            className="tab_btn initialcase oswald"
            sx={{ borderTopLeftRadius: "15px" }}
          />
          <Tab
            label="List Collection"
            value="collection"
            className="tab_btn initialcase oswald"
            sx={{ borderTopRightRadius: "15px" }}
          />
        </TabList>
        <TabPanel
          value="add"
          sx={{
            background: "#0009",
            borderRadius: "0px 0px  15px 15px",
            py: 5,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} item>
                <Typography variant="h6" className="text_white bold montserrat">
                  Upload
                </Typography>
              </Grid>
              <Grid xs={12} md={6} item>
                <Typography variant="h6" className="text_white bold montserrat">
                  Preview
                </Typography>
              </Grid>
              <Grid xs={12} item>
                <Divider sx={{ borderColor: "#fff", opacity: "0.6" }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ ...inputFileStyle }}>
                  <Typography
                    variant="h6"
                    className="bold text_white montserrat"
                  >
                    PNG, GIF, WEBP, MP4, Max 100mb.
                  </Typography>
                </Box>
                <Box sx={{ py: 1 }}>
                  <InputField
                    label="Name"
                    placeholder="Name of Your Token"
                    name="name"
                    formik={formik}
                  />
                </Box>
                <Box sx={{ py: 1 }}>
                  <InputField
                    label="Description"
                    placeholder="Describe what your token is about (Optional)"
                    name="description"
                    formik={formik}
                  />
                </Box>
                {/* <Box sx={{ py: 1 }}>
                  <InputField
                    label="Policy ID*"
                    placeholder="Enter your policy ID"
                    name="policy_id"
                    formik={formik}
                  />
                  <LightText heading="with policy ID we can verify your token" />
                </Box> */}
                <Box sx={{ py: 1 }}>
                  <Typography className="text_white bold" variant="caption">
                    Collection
                  </Typography>
                  <LightText heading="if this is a part of collection select the collection." />
                  <Select
                    // value={selectedValue}
                    value={formik.values.collection_name}
                    displayEmpty
                    // onChange={onMenuChange}
                    onChange={formik.handleChange("collection_name")}
                    sx={{
                      background: "var(--box-color)",
                      color: "#fff",
                      borderRadius: "15px",
                      fieldset: {
                        border: "none",
                      },
                      svg: {
                        color: "#fff",
                      },
                    }}
                    renderValue={(selected) => {
                      // console.log(selected);
                      if (selected === "") {
                        return <p>Select</p>;
                      }
                      return selected;
                    }}
                    fullWidth
                    placeholder="Age"
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>Select</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {formik.touched.collection_name &&
                      formik.errors.collection_name}
                  </FormHelperText>
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    className="btn2"
                    sx={{ width: "150px" }}
                    type="submit"
                  // onClick={() => setListingSteps("step2")}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    // height: "67%",
                    my: 2,
                    background: "#FFFFFF33 ",
                    border: "3px dashed #fff",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "&:hover": {
                      backgroundColor: "inherit !important",
                    },
                  }}
                >
                  {formik.values.file ? (
                    <Box
                      sx={{
                        overflow: "hidden",
                        width: "100%",
                        img: {
                          width: "100%",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <img
                        src={URL.createObjectURL(formik.values.file)}
                        alt=""
                        className="thumbnail_overlay"
                        name="file"
                      />
                    </Box>
                  ) : (
                    <>
                      <Box
                        className="flex_align"
                        sx={{ flexDirection: "column" }}
                      >
                        <Image
                          sx={{ color: "#fff", width: "10em", height: "10em" }}
                        />
                        <Typography
                          variant="caption"
                          className="text_white montserrat"
                          sx={{ opacity: "0.7" }}
                          component="div"
                        >
                          Upload file to preview your brand new NFT
                        </Typography>
                      </Box>
                    </>
                  )}

                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    name="file"
                    onChange={(e) => {
                      formik.setFieldValue("file", e.currentTarget.files[0]);
                    }}
                  />
                </Button>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.file && formik.errors.file}
                </FormHelperText>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        <TabPanel
          value="collection"
          sx={{
            background: "#0009",
            borderRadius: "0px 0px  15px 15px",
            py: 5,
          }}
        >
          <ListCollection />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default MylistTabs;
