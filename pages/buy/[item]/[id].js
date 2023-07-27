import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Grid, Typography, Button } from "@mui/material";
import ContainerLayout from "/components/shared/ContainerLayout";
import BreadCrumHeader from "/components/shared/BreadCrumHeader";

import {
  RemoveRedEyeOutlined,
  FavoriteBorderOutlined,
  CheckCircle,
  ContentCopy,
  Circle,
} from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";

import Strips from "/components/Design/Strips";
import Ballon from "/components/Design/Ballon";
import BarHeading from "/components/shared/headings/BarHeading";
import ClientCard from "/components/Cards/ClientCard";
import LineTab from "/components/Tabs/LineTab";
import { buyPaymentRoute } from "/components/Routes/constants";
import { useRouter } from "next/router";
import { INSTANCE } from "/config/axiosInstance";
import GetAdaPriceService from "/services/get-ada-price.service";
import { useWallet, useLovelace } from "@meshsdk/react";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import { Toast } from "/components/shared/Toast";
import { getKeyData } from "/helper/localStorage";
import FullScreenLoader from "/components/shared/FullScreenLoader";
import useFetchData from "../../../hooks/adaInfo";
import { isVideoOrIsAudio } from "../../../utils/utils";
import { transactionErrorHanlder } from "../../../helper/transactionError";
import { getClientIp } from "../../../helper/clientIP";
import { network_name, network_url, network_key } from "../../../base_network";
// import { BigInt } from "lucid-cardano/types/src/core/wasm_modules/cardano_multiplatform_lib_web/cardano_multiplatform_lib";
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
  const lovelace = useLovelace();
  const { id, item } = router.query;
  const adaInfo = useFetchData(GetAdaPriceService.getPrice, 30000);
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState("ada");
  const [detail, setDetail] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const {
    wallet,
    connected,
    name,
    connecting,
    connect,
    disconnect,
    error,
  } = useWallet();
  console.log(detail);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await INSTANCE.get(`/list/get/${item}/${id}`);
        setDetail(res?.data?.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setDetail([]);
      }
    };
    if (id) {
      getData();
    }
  }, [id]);

  const onBuy = async (e) => {
    if (connected) {
      const price =
        detail.list?.mint_type === "single"
          ? detail.list?.sell_type_id?.price
          : detail.list?.collection_id?.assets[item]?.price;
      if (lovelace < price * 1000000) {
        Toast(
          "error",
          "You do not have enough Ada to complete this transaction"
        );
        return;
      } else {
        try {
          const user_address = getKeyData("user_address");
          const connectedWallet = getKeyData("connectedWallet");
          const address = detail.list?.collection_id?.recipient_address;
          const lovelace = detail.list?.sell_type_id?.price * 1000000;
          const user_value = Number(lovelace * 0.975);
          const owner_value = Number(lovelace * 0.025);
          const owner_address =
            "addr_test1qpm6srkw5vndavk72khy58cht0f0u796xdmwq9kfu2j63064cwwrleufnnz36s8v0pk0l54kvfn3m7et69xxsvh4ajus55y7tq";
          // const lucid = await Lucid.new(
          //   new Blockfrost(
          //     "https://cardano-mainnet.blockfrost.io/api/v0",
          //     "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj"
          //   ),
          //   "Mainnet"
          // );
          const lucid = await Lucid.new(
            new Blockfrost(network_url, network_key),

            network_name
          );

          const api = await window.cardano[String(connectedWallet)].enable();
          lucid.selectWallet(api);
          // console.log(await lucid.wallet.address());

          const tx = await lucid
            .newTx()
            .payToAddress(address, { lovelace: BigInt(user_value) })
            .payToAddress(owner_address, {
              lovelace: BigInt(owner_value),
            })
            .validTo(Date.now() + 100000)
            .complete();
          // console.log(tx);
          const signedTx = await tx.sign().complete();
          const txHash = await signedTx.submit();
          if (txHash) {
            try {
              const res = await INSTANCE.post("/list/approve", {
                list_id: id,
                index: item,
                recipient_address: user_address,
              });
              if (res) {
                Toast("success", "NFT Transfered to Your Wallet");
                router.push("/buy");
              }
            } catch (e) {
              Toast("error", "Try again later.");
            }
            // window.localStorage.setItem('policy', mintingPolicy.script)
            // window.localStorage.setItem('policy-id', policyId)
            // window.localStorage.setItem('minting-script', JSON.stringify(mintingPolicy))
            // router.push('/mint')
          }
        } catch (e) {
          transactionErrorHanlder(e, "buy");
          const clientIp = await getClientIp();
          if (clientIp) {
            try {
              const response = await INSTANCE.post(`/log/create`, {
                error: JSON.stringify(error),
                ip: clientIp,
                type: "single buy item",
              });
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }
          }
          console.log(e, "errro");
        }
      }
    } else {
      Toast("error", "Please connect your wallet.");
    }
  };
  return (
    <BuyDetailStyled>
      <ContainerLayout>
        {isLoading && <FullScreenLoader />}
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
                {/* <Grid item xs={12} md={4}>
                  <Box
                    className="flex_align"
                    sx={{ justifyContent: { xs: "start", md: "end" } }}
                  >
                    <Button className="btn2" sx={{ my: 2 }}>
                      Connect Your Wallet
                    </Button>
                  </Box>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
          <TabPanel value="ada" sx={{ p: 0 }}>
            <Box sx={{ py: 10 }}>
              <Box sx={{ minHeight: "7rem" }}>
                {Object.keys(detail).length > 0 && (
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6} item>
                      <img
                        src={
                          !isVideoOrIsAudio(
                            detail?.list?.collection_id?.assets[item]
                          )
                            ? `https://ipfs.io/ipfs/${detail?.list?.collection_id?.assets[item]?.ipfs}`
                            : detail?.list?.collection_id?.assets[item]
                                ?.feature_image
                        }
                        // src={
                        //   !isVideoOrIsAudio(
                        //     detail?.list?.collection_id?.assets[item]
                        //   )
                        //     ? `https://ipfs.io/ipfs/${detail?.list?.collection_id?.assets[item]?.ipfs}`
                        //     : detail?.list?.collection_id?.assets[item]
                        //         ?.feature_image
                        // }
                        alt=""
                        className="w_100 br_15 item_img"
                      />
                    </Grid>
                    <Grid xs={12} md={6} item>
                      <Typography
                        variant="h3"
                        className="uppercase text_white bold oswald"
                      >
                        {detail.list?.collection_id?.assets[item]?.asset_name}
                      </Typography>
                      {/* <Box
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
                        </Box> */}
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        sx={{ py: 1 }}
                      >
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{ py: 2.5, px: 2 }}
                            className="light_white_bg text_white br_15"
                          >
                            <Typography className="bold montserrat">
                              Price:{" "}
                              {detail.list?.mint_type === "single"
                                ? detail.list?.sell_type_id?.price
                                : detail.list?.collection_id?.assets[item]
                                    ?.price}
                              ADA
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{ py: 2.5, px: 2 }}
                            className="light_white_bg text_white br_15 montserrat"
                          >
                            <Typography className="bold montserrat">
                              Price:{" "}
                              {!adaInfo
                                ? "..."
                                : parseFloat(
                                    adaInfo?.current_price *
                                      detail.list?.sell_type_id?.price
                                  ).toFixed(2)}
                              USD
                            </Typography>
                          </Box>
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
                            Please follow the instruction given below and make
                            the payment with the chosen payment method.
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
                            <Typography
                              sx={{ pb: 1.5, px: 2 }}
                              variant="caption"
                            >
                              {detail.list?.collection_id?.recipient_address.slice(
                                0,
                                35
                              ) + "...."}
                            </Typography>
                          </Box>
                        </Grid>
                        {/* <Grid item md={6} xs={12}>
                              <Box className="light_white_bg text_white br_15 light_text">
                                <Typography
                                  sx={{ pt: 1.5, px: 2 }}
                                  className="font_12"
                                >
                                  Timer
                                </Typography>
                                <Typography sx={{ pb: 1.5, px: 2 }} variant="caption">
                                  19 : 20
                                </Typography>
                              </Box>
                            </Grid> */}

                        <Grid item md={6} xs={12}>
                          <Box className="light_white_bg text_white br_15">
                            <Typography
                              sx={{ pt: 1.5, px: 2 }}
                              className="font_12 light_text "
                            >
                              Asset ID
                            </Typography>
                            <Typography
                              sx={{ pb: 1.5, px: 2 }}
                              variant="caption"
                            >
                              {detail?.asset_details.fingerprint
                                ? detail?.asset_details?.fingerprint.slice(
                                    0,
                                    35
                                  ) + "...."
                                : "......"}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box className="light_white_bg text_white br_15">
                            <Typography
                              sx={{ pt: 1.5, px: 2 }}
                              className="font_12 light_text"
                            >
                              Policy Id
                            </Typography>
                            <Typography
                              sx={{ pb: 1.5, px: 2 }}
                              variant="caption"
                            >
                              {detail.list?.collection_id?.policy_id}
                            </Typography>
                          </Box>
                        </Grid>
                        {/* <Grid item md={6} xs={12}>
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
                            </Grid> */}
                        {/* <Grid md={12} xs={12} item>
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
                                  <ContentCopy
                                    className="text_white"
                                    sx={{ p: 0.5 }}
                                  />
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
                            </Grid> */}
                      </Grid>
                      <Grid item xs={12} md={6} sx={{ py: 1 }}>
                        <Button
                          className="btn2 w_100 montserrat initialcase"
                          // onClick={() => router.push(`${buyPaymentRoute}`)}
                          onClick={onBuy}
                        >
                          Buy Now
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Box>
              {!isLoading && detail?.lists_by_user.length > 0 && (
                <Box>
                  <BarHeading heading="Explore more from this artist" />
                  <Box sx={{ py: 5 }}>
                    <Grid container spacing={3}>
                      {detail?.lists_by_user?.map((card, index) => (
                        <Grid key={index} xs={12} sm={6} md={3} item>
                          <ClientCard card={card} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              )}
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
    /* object-fit: cover; */
    object-fit: fill;
    max-height: 31rem;
  }
`;
