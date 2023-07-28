import React, { useState, useEffect } from "react";
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
import {
  CardanoWallet,
  useAssets,
  useLovelace,
  useWallet,
} from "@meshsdk/react";
import { Toast } from "../shared/Toast";
import { INSTANCE } from "../../config/axiosInstance";
import FullScreenLoader from "../shared/FullScreenLoader";
import { transactionErrorHanlder } from "../../helper/transactionError";
import { seedPhraseMainnet } from "../../config/utils";
import { seedPhrasePreprod } from "../../config/utils";
import { getClientIp } from "../../helper/clientIP";
import Heading from "../shared/headings/Heading";
import axios from "axios";
import Layout from "../Mint/Layout";
import Mynft from "../Cards/Mynft";
//import { network_name, network_url, network_key } from "../../../base_network";
import { network_name, network_url, network_key } from "../../base_network";
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

// user id , type
const f = [
  {
    user_id: "6412bbe5ab27d2c9ebaa7307",
    asset:
      "d88c75a4b316dbdd387789a6eaed235e265ff90b3ae67b808d55c90254657374206c697665206d696e74",
    policy_id: "d88c75a4b316dbdd387789a6eaed235e265ff90b3ae67b808d55c902",
    asset_name: "54657374206c697665206d696e74",
    fingerprint: "asset19welxnfl0px73a6n5qr9ed25h3xlmva2xgarda",
    quantity: "1",
    type: "single",
    initial_mint_tx_hash:
      "48b7c67f3bd796621fc3becf1a18f7820501f86f0ee616e04a7d9f41ed57f7cf",
    mint_or_burn_count: 1,
    onchain_metadata: {
      link: "Test",
      name: "Test live mint",
      image: "ipfs://QmamkL42Rz6wZGD8YZeEG58YJvCvKBFNc4EhrQsUnkzxrD",
      creator: "Test",
      mediaType: "image/jpg",
      description: "Test",
    },
    onchain_metadata_standard: "CIP25v1",
    metadata: null,
  },
];
const hello = {
  user_id: "6412bbe5ab27d2c9ebaa7307",
  type: "single",
  assets: [
    {
      price: null,
      feature_image: "",
      asset_name: "23 mar 3 ",
      asset_quantity: 1,
      image: "ipfs://QmVYJgLxzBmxZAc2pZTsCTjYj16GDoyF4gVEPGLn7rZC3X",
      media_type: "image/jpeg",
      description: "",
      artist: "",
      ipfs: "QmVYJgLxzBmxZAc2pZTsCTjYj16GDoyF4gVEPGLn7rZC3X",
      is_sold: false,
      _id: "641c2d329a4080ee3d9013d3",
    },
  ],
  total_supply: 1,
  minting_policy:
    '{"type":"Native","script":"8201828200581c04074187b909c0754f026839a852dc380a47a944d599de22e16b6de282051a01745da8"}',
  policy_id: "4ce42d1798e66f42dfbbca0c1b8c1d53edbc0fd14b152f9dec6ec97a",
  recipient_address:
    "addr_test1qqzqwsv8hyyuqa20qf5rn2zjmsuq53afgn2enh3zu94kmcsa80ahhs9psx7lfvyy2krh9kpfts58tdtkc33wv47u78usrxuqgn",
  _id: "641c2d329a4080ee3d9013d2",
  createdAt: "2023-03-23T10:42:58.385Z",
  updatedAt: "2023-03-23T10:42:58.385Z",
  __v: 0,
};

const MylistTabs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const lovelace = useLovelace();
  const assets = useAssets();
  const { wallet, connected } = useWallet();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [lists, setLists] = useState([]);
  const [tabValue, setTabValue] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  console.log(assets, "assetsassetsassetsassetsassetsassetsassetsassetsassets");
  // const [assets, setAssets] = useState([]);
  React.useEffect(() => {
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
  // useEffect(() => {
  //   if (connected && recipientAddress) {
  //     setIsLoading(true);
  //     getCardanoWalletNFTs(
  //       "addr1qyzqwsv8hyyuqa20qf5rn2zjmsuq53afgn2enh3zu94kmcsa80ahhs9psx7lfvyy2krh9kpfts58tdtkc33wv47u78usqspqyv"
  //     );
  //   }
  // }, [recipientAddress, connected]);
  useEffect(() => {
    if (connected) {
      if (assets && assets.length > 0) {
        setIsLoading(false);
      }
    }
  }, [assets, connected]);
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [imageDataUrl, setImageDataUrl] = useState(null);

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
        // console.log(values, "values");
        if (connected) {
          if (lovelace < 1000000) {
            Toast(
              "error",
              "You do not have enough Ada to complete this transaction"
            );
            return;
          } else {
            setIsLoading(true);
            let connectedWallet =
              window.localStorage.getItem("connectedWallet");
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
                // console.log(uploaded_image, "img");

                // const transferLucid = await Lucid.new(
                //   new Blockfrost(
                //     "https://cardano-mainnet.blockfrost.io/api/v0",
                //     "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj"
                //   ),
                //   "Mainnet"
                // );
                const transferLucid = await Lucid.new(
                  new Blockfrost(network_url, network_key),

                  network_name
                );

                transferLucid.selectWalletFromSeed(seedPhraseMainnet);

                // const lucidBrowser = await Lucid.new(
                //   new Blockfrost(
                //     "https://cardano-mainnet.blockfrost.io/api/v0",
                //     "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj"
                //   ),
                //   "Mainnet"
                // );
                const lucidBrowser = await Lucid.new(
                  new Blockfrost(network_url, network_key),

                  network_name
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
                // console.log(mintingPolicy, policyId, "pm");
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
                // console.log(metadataX, "dsadasd");
                const unit = policyId + fromText(metadata.name);

                let obj = { [policyId]: metadataX };
                // console.log(obj, "obj");
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
                // console.log(txHash, "hasg");
                if (txHash) {
                  //  api call

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
                          minting_policy: JSON.stringify(mintingPolicy),
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
                        minting_policy: JSON.stringify(mintingPolicy),
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
                      }
                    } catch (e) {
                      setIsLoading(false);

                      console.log(e);
                    }
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
          }
        } else {
          Toast("error", "Connect Your Wallet First");
        }
      } catch (error) {
        console.log(error, "err");
        setIsLoading(false);
        transactionErrorHanlder(error, "mint");
        const clientIp = await getClientIp();
        if (clientIp) {
          try {
            const response = await INSTANCE.post(`/log/create`, {
              error: JSON.stringify(error),
              ip: clientIp,
              type: "list item by user, MyListTabs",
            });
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
  });
  // console.log(formik.values);
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
  // async function getCardanoWalletNFTs(walletAddress) {
  //   console.log("add", walletAddress);
  //   let AssetsArray = [];
  //   try {
  //     const endpoint = `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${walletAddress}/utxos`;
  //     // `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${walletAddress}/addresses/assets`;
  //     const response = await axios.get(endpoint, {
  //       headers: {
  //         project_id: "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj",
  //       },
  //     });
  //     let assets = response.data[0].amount;

  //     // console.log({assets});
  //     let index = 0;
  //     for (let i = 0; i < assets.length; i++) {
  //       const asset = assets[i];

  //       try {
  //         let assetEndPoint = `https://cardano-mainnet.blockfrost.io/api/v0/assets/${asset.unit}`;
  //         let asset_info = await axios.get(assetEndPoint, {
  //           headers: {
  //             project_id: "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj",
  //           },
  //         });
  //         let { data } = asset_info;
  //         AssetsArray.push(data);
  //         console.log(AssetsArray);
  //         setAssets([...AssetsArray]);
  //         setIsLoading(false);
  //       } catch (e) {
  //         console.log(e);
  //         setIsLoading(false);
  //         setAssets([]);
  //       }
  //       // console.log({asset_info});
  //     }
  //     console.log("Assets are ", AssetsArray);
  //     return AssetsArray;
  //   } catch (error) {
  //     setIsLoading(false);
  //     // setaAssets([]);
  //     console.error(error);
  //   }
  // }
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
          ) : isLoading ? (
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
