import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Grid, Typography, Button } from "@mui/material";
import ContainerLayout from "/components/shared/ContainerLayout";
import BreadCrumHeader from "/components/shared/BreadCrumHeader";

import { TabContext, TabPanel } from "@mui/lab";

import Strips from "/components/Design/Strips";
import Ballon from "/components/Design/Ballon";

import LineTab from "/components/Tabs/LineTab";

import { useRouter } from "next/router";
import { INSTANCE } from "/config/axiosInstance";
import GetAdaPriceService from "/services/get-ada-price.service";
import { useWallet, useLovelace } from "@meshsdk/react";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";

import FullScreenLoader from "/components/shared/FullScreenLoader";
import useFetchData from "../../../hooks/adaInfo";

import {
  getAssetDetail,
  getDatum,
  listMarket,
} from "../../../services/blockfrostService";
import {
  BaseAddress,
  Ed25519KeyHash,
  StakeCredential,
} from "@emurgo/cardano-serialization-lib-asmjs";
import axios from "axios";
import {
  decodeAssetName,
  transformNftImageUrl,
} from "../../../services/cardanoService";
import { useFetchNFTData } from "../../../hooks/useFetchNFTData";
import { market } from "../../../config/marketConfig";
import { callKuberAndSubmit } from "../../../services/kuberService";
import { useSelector } from "react-redux";

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
  const {
    utxos,
    isLoading: notFetchedUtxosCompletely,
    message,
  } = useFetchNFTData();
  const { id, item } = router.query;
  console.log(router.query);
  console.log("policy ", id, " token ", item);
  const adaInfo = useFetchData(GetAdaPriceService.getPrice, 30000);
  const [tabValue, setTabValue] = useState("ada");
  const [detail, setDetail] = useState({});
  // const [selectedUtxo, setSelectedUtxo] = useState(null);
  const [datum, setDatum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUtxo, setCurrentUtxo] = useState(null);
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();

  const lovelace = useLovelace();

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
      // getData();
    }
  }, [id]);

  const [asset, setAsset] = useState({});
  const provider = useSelector((store) => store.wallet);

  console.log({ asset });
  useEffect(() => {
    setIsLoading(true);
    getNFTDetail();
  }, [id]);

  const buy_utxo = async () => {
    // const api = await window.cardano.nami.enable();
    // const res = await connect("Nami");
    let provider_ = provider.instance;

    if (notFetchedUtxosCompletely) {
      return 0;
    }
    console.log({ wallet });
    if (!connected) {
      alert("Please connect your wallet first !");
      return 0;
    }
    console.log(asset);
    const validUtxos = utxos;
    console.log("Valid market utxos", validUtxos);
    if (currentUtxo) {
      let utxo = currentUtxo;
      console.log("buying ", utxo);
      const datum = utxo.detail.datum;
      const cost = datum.fields[1].int;
      const sellerPubKeyHashHex = datum.fields[0].fields[0].fields[0].bytes;
      const sellerStakeKeyHashHex =
        datum.fields[0].fields[1].fields[0].fields[0].fields[0].bytes;
      console.log({ cost, sellerPubKeyHashHex, sellerStakeKeyHashHex });
      const vkey = StakeCredential.from_keyhash(
        Ed25519KeyHash.from_bytes(Buffer.from(sellerPubKeyHashHex, "hex"))
      );
      const stakeKey = StakeCredential.from_keyhash(
        Ed25519KeyHash.from_bytes(Buffer.from(sellerStakeKeyHashHex, "hex"))
      );
      const sellerAddr = BaseAddress.new(0, vkey, stakeKey);
      let utxos__ = await provider_.getUtxos();
      console.log({ utxos__ });
      // Create constraints for buying
      // walletAction.callback
      // const by2 = async (provider) => {

      const request = {
        selections: utxos__,
        inputs: [
          {
            address: market.address,
            utxo: {
              hash: utxo.tx_hash,
              index: utxo.tx_index,
            },
            script: market.script,
            redeemer: { fields: [], constructor: 0 },
          },
        ],
        outputs: [
          {
            address: sellerAddr
              .to_address()
              .to_bech32(
                market.address.startsWith("addr_test") ? "addr_test" : "addr"
              ),
            value: cost,
            insuffientUtxoAda: "increase",
          },
        ],
      };
      console.log({ request });
      return callKuberAndSubmit(provider_, JSON.stringify(request));
      // };
    }

    // walletAction.enable = true;
  };
  let AdaPrice = currentUtxo?.detail.datum.fields[1].int
    ? parseFloat(currentUtxo?.detail.datum.fields[1].int / 1000000).toFixed(2)
    : 0;
  if (!AdaPrice) AdaPrice = 0;
  console.log({ AdaPrice });

  useEffect(() => {
    utxos.map(async (utxo) => {
      if (fromText(utxo.assetName) == item) {
        setCurrentUtxo(utxo);
      }
    });
  }, [item, utxos]);

  const getNFTDetail = async () => {
    if (id) {
      try {
        let asset_ = await getAssetDetail(id + item);

        setIsLoading(false);
        setAsset(asset_);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        setAsset({});
      }
    }
  };

  useEffect(() => {
    // getUtxos();
    // setDatum(asset.datum);
    // getNftDatum();
  }, [asset]);
  console.log({ AdaPrice, datum });
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
                {Object.keys(asset).length > 0 && (
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6} item>
                      <img
                        src={`https://ipfs.io/ipfs/${
                          asset?.onchain_metadata?.ipfs
                            ? asset?.onchain_metadata?.ipfs
                            : asset?.onchain_metadata?.image.slice(7)
                        }`}
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
                        {asset?.onchain_metadata?.name}
                        {/* {detail.list?.collection_id?.assets[item]?.asset_name} */}
                      </Typography>
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
                              Price: {AdaPrice}
                              {/* {detail.list?.mint_type === "single"
                                ? detail.list?.sell_type_id?.price
                                : detail.list?.collection_id?.assets[item]
                                    ?.price} */}{" "}
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
                                    adaInfo?.current_price * AdaPrice
                                  ).toFixed(2)}{" "}
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
                              {asset?.fingerprint
                                ? asset?.fingerprint.slice(0, 35) + "...."
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
                              {asset?.policy_id}
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
                          onClick={buy_utxo}
                        >
                          Buy Now
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Box>
              {/* {!isLoading && detail?.lists_by_user.length > 0 && (
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
              )} */}
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
