import React, { useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Grid,
  Tab,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import InputField from "./InputField";
import { addSingleListingSchema } from "../../schema/Index";
import { useFormik } from "formik";
import ListCollection from "./ListCollection";
import {
  Lucid,
  fromText,
  Blockfrost,
  applyParamsToScript,
  Data,
} from "lucid-cardano";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setListing } from "../../redux/listing/ListingActions";
import { setStep } from "../../redux/listing/ListingActions";
import { useAssets, useLovelace, useWallet } from "@meshsdk/react";
import { Toast } from "../shared/Toast";
import { INSTANCE } from "../../config/axiosInstance";
import FullScreenLoader from "../shared/FullScreenLoader";
import { transactionErrorHanlder } from "../../utils/errorUtils";
import { seedPhrase } from "../../config/walletConstants";
import Heading from "../shared/headings/Heading";
import Layout from "../Mint/Layout";
import Mynft from "../Cards/Mynft";
import {
  blockfrostUrl,
  blockfrostApiKey,
  blockfrostNetworkName,
} from "../../config/blockfrost";
import { handleFileUpload } from "../../utils/ipfsUtlis";
import { checkAdaBalance } from "../../utils/balanceUtils";
import { cborHex } from "../../config/constants";
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

const MylistTabs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const lovelace = useLovelace();
  const assets = useAssets();
  const { wallet, connected, connecting } = useWallet();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [lists, setLists] = useState([]);
  const [tabValue, setTabValue] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getAddress() {
      if (connected) {
        const user_id = window.localStorage.getItem("user_id");
        let address = await wallet?.getUsedAddresses();
        setRecipientAddress(address[0]);
        let res = await INSTANCE.post("list/user/collection", {
          user_id,
        });

        if (res) {
          // console.log(res.data);
          setLists(res.data.data);
        }
      }
    }
    getAddress();
  }, [wallet]);

  useEffect(() => {
    if (connected) {
      setIsLoading(true);
      if (assets && assets.length > 0) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [assets, connected]);
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formik = useFormik({
    initialValues: {
      type: "single",
      file: null,
      imageFile: null,
      name: "",
      description: "",
      collection_name: "",
    },
    validationSchema: addSingleListingSchema,
    onSubmit: async (values) => {
      try {
        if (connected) {
          if (!checkAdaBalance(lovelace)) {
            return null;
          } else {
            setIsLoading(true);
            let connectedWallet =
              window.localStorage.getItem("connectedWallet");
            if (values.file != null || values.file != undefined) {
              const uploaded_image = await handleFileUpload(values.file);
              if (uploaded_image) {
                const transferLucid = await Lucid.new(
                  new Blockfrost(blockfrostUrl, blockfrostApiKey),
                  blockfrostNetworkName
                );

                transferLucid.selectWalletFromSeed(seedPhrase);
                const lucid = await Lucid.new(
                  new Blockfrost(blockfrostUrl, blockfrostApiKey),

                  blockfrostNetworkName
                );

                const api = await window.cardano[
                  String(connectedWallet)
                ].enable();
                lucid.selectWallet(api);

                const { paymentCredential } = lucid.utils.getAddressDetails(
                  await lucid.wallet.address()
                );
                const addr = await lucid.wallet.address();
                const utxos = await lucid.utxosAt(addr);
                const utxo = utxos[0]; // assign utxo having x amount
                const tn = fromText("nft");
                const image = fromText("nft");

                let policyId = "";
                const nftPolicy = {
                  type: "PlutusV2",
                  script: applyParamsToScript(cborHex, [
                    utxo.txHash,
                    BigInt(utxo.outputIndex),
                    tn,
                    image,
                  ]),
                };

                policyId = lucid.utils.mintingPolicyToId(nftPolicy);

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
                const unit = policyId + fromText(metadata.name);

                let obj = { [policyId]: metadataX };
                const tx = await lucid
                  .newTx()
                  .mintAssets({ [unit]: 1n }, Data.void())
                  .attachMintingPolicy(nftPolicy)
                  .attachMetadata("721", obj)
                  // .payToAddress(addr, assetObj)
                  .payToAddress(await lucid.wallet.address(), {
                    [unit]: 1n,
                  })
                  .collectFrom([utxo])
                  .complete();

                // const tx = await lucidBrowser
                //   .newTx()
                //   .attachMetadata("721", obj)
                //   .mintAssets({ [unit]: 1n })
                //   .payToAddress(await transferLucid.wallet.address(), {
                //     [unit]: 1n,
                //   })
                //   .validTo(Date.now() + 100000)
                //   .attachMintingPolicy(mintingPolicy)
                //   .complete();
                const signedTx = await tx.sign().complete();
                const txHash = await signedTx.submit();
                console.log({txHash});
                if (txHash) {
                  if (values.imageFile) {
                    var reader = new FileReader();
                    reader.readAsDataURL(values.imageFile);
                    reader.onload = async () => {
                      const file3DataURL = reader.result;
                      try {
                        const user_id = window.localStorage.getItem("user_id");
                        metadata["unit"] = unit;
                        metadata["ipfs"] = uploaded_image.path;
                        const data = {
                          metadata: [metadata],
                          user_id: user_id,
                          recipient_address: recipientAddress,
                          policy_id: policyId,
                          type: "single",
                          minting_policy: "",

                          image_file: file3DataURL,
                        };
                        const res = await INSTANCE.post(
                          "/collection/create",
                          data
                        );
                        if (res) {
                          setIsLoading(false);
                          dispatch(setStep("step2"));
                          // dispatch(setListing())
                          window.localStorage.setItem(
                            "listing",
                            JSON.stringify(res?.data.data)
                          );
                          window.localStorage.setItem(
                            "asset_name",
                            values.name
                          );
                        }
                      } catch (e) {
                        setIsLoading(false);

                        console.log(e);
                      }
                    };
                  } else {
                    try {
                      const user_id = window.localStorage.getItem("user_id");
                      metadata["unit"] = unit;
                      metadata["ipfs"] = uploaded_image.path;
                      const data = {
                        metadata: [metadata],
                        user_id: user_id,
                        recipient_address: recipientAddress,
                        policy_id: policyId,
                        type: "single",
                        minting_policy: "",
                        image_file: "",
                      };
                      const res = await INSTANCE.post(
                        "/collection/create",
                        data
                      );
                      if (res) {
                        setIsLoading(false);
                        dispatch(setStep("step2"));
                        // dispatch(setListing())
                        window.localStorage.setItem(
                          "listing",
                          JSON.stringify(res?.data.data)
                        );
                        window.localStorage.setItem("asset_name", values.name);
                      }
                    } catch (e) {
                      setIsLoading(false);
                      console.log(e);
                    }
                  }
                }
              }
            } else {
              Toast("error", "Please connect your wallet first");
            }
          }
        } else {
          Toast("error", "Connect Your Wallet First");
        }
      } catch (error) {
        console.log(error, "err");
        setIsLoading(false);
        transactionErrorHanlder(error, "mint");
      }
    },
  });
  const onMintFileChange = (e) => {
    if (e.currentTarget.files[0]) {
      formik.setFieldValue("file", e.currentTarget.files[0]);
      // if (
      //   (e.currentTarget.files[0].type === "image/png" ||
      //     e.currentTarget.files[0].type === "image/jpeg" ||
      //     e.currentTarget.files[0].type === "image/jpg") &&
      //   (!formik.values.imageFile ||
      //     (formik.values.imageFile &&
      //       (formik.values.imageFile.type === "image/png" ||
      //         formik.values.imageFile.type === "image/jpeg" ||
      //         formik.values.imageFile.type === "image/jpg")))
      // ) {
      //   return;
      // }
      // formik.setFieldValue("imageFile", null);
    }
  };

  // console.log(formik.values, "formik");
  return (
    <>
      {isLoading && <FullScreenLoader />}
      <Box sx={{ my: 5 }}>
        <Box
          sx={{
            py: 2,
            px: 2,
            background: "var(--secondary-color) !important",
            borderRadius: "15px 15px 0 0",
            span: {
              color: "#fff !important",
            },
          }}
        >
          <Heading heading="My NFT's" color="#000" />
        </Box>
        <Box sx={{ py: 4 }}>
          {!connected ? (
            <Layout>
              <Box className="flex_align_center">
                <Heading heading="Please connect your wallet first." />
              </Box>
            </Layout>
          ) : connecting || isLoading ? (
            <FullScreenLoader />
          ) : assets && assets.length > 0 ? (
            <Grid container spacing={2}>
              {assets.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Mynft card={card} />
                  {/* <NftCard tabValue={tabValue} card={card} /> */}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box>
              <img
                src="/images/no_nft.png"
                alt=""
                className="w_100"
                onClick={() => router.push("/mint")}
              />
            </Box>
          )}
        </Box>
      </Box>
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
                    PNG, GIF, MP4, Max 100mb.
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
                {/* <Box sx={{ py: 1 }}>
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
                </Box> */}
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
                    height: "22rem",
                    label: {},
                    padding: "0",
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
                  {!formik.values.file || formik.errors.file ? (
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
                  ) : (
                    <Box
                      className="flex"
                      sx={{
                        overflow: "hidden",
                        width: "100%",
                        height: "100%",
                        img: {
                          width: "100%",
                          borderRadius: "10px",
                          objectFit: "cover",
                        },
                      }}
                    >
                      {formik.values.file.type.startsWith("video/") && (
                        <>
                          <video
                            controls
                            style={{ width: "100%", height: "19rem" }}
                          >
                            <source
                              src={URL.createObjectURL(formik.values.file)}
                            ></source>
                          </video>
                        </>
                      )}
                      {formik.values.file.type.startsWith("audio/") && (
                        <>
                          <audio controls>
                            <source
                              src={URL.createObjectURL(formik.values.file)}
                            />
                          </audio>
                        </>
                      )}
                      {formik.values.file.type.startsWith("image/") && (
                        <img src={URL.createObjectURL(formik.values.file)} />
                      )}
                    </Box>
                  )}

                  <input
                    hidden
                    // accept="image/*"
                    type="file"
                    name="file"
                    onChange={(e) => onMintFileChange(e)}
                  />
                </Button>
                {formik.touched.file && formik.errors.file && (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {formik.errors.file}
                  </FormHelperText>
                )}
                {/* feature image for audio and video  */}
                {formik.values.file &&
                  (formik.values.file.type === "audio/mpeg" ||
                    formik.values.file.type === "video/mp4") && (
                    <Box>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          height: "100%",
                          // height: "22rem",
                          label: {},
                          padding: "0",
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
                          img: {
                            width: "100%",
                            borderRadius: "15px",
                            height: "22rem",
                            objectFit: "cover",
                          },
                        }}
                      >
                        {!formik.values.imageFile || formik.errors.imageFile ? (
                          <>
                            <Box
                              className="flex_align"
                              sx={{ flexDirection: "column" }}
                            >
                              <Image
                                sx={{
                                  color: "#fff",
                                  width: "10em",
                                  height: "10em",
                                }}
                              />
                              <Typography
                                variant="caption"
                                className="text_white montserrat"
                                sx={{ opacity: "0.7" }}
                                component="div"
                              >
                                Upload feature image to preview your brand new
                                NFT
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <img
                            src={URL.createObjectURL(formik.values.imageFile)}
                          />
                        )}

                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          name="imageFile"
                          onChange={(e) => {
                            if (e.currentTarget.files[0]) {
                              formik.setFieldValue(
                                "imageFile",
                                e.currentTarget.files[0]
                              );
                            }
                          }}
                        />
                      </Button>
                      {formik.touched.imageFile && formik.errors.imageFile && (
                        <FormHelperText sx={{ color: "#d32f2f" }}>
                          {formik.errors.imageFile}
                        </FormHelperText>
                      )}
                    </Box>
                  )}
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
