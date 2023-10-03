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
import FullScreenLoader from "/components/shared/FullScreenLoader";
import useFetchData from "../../../../hooks/adaInfo";
import { isVideoOrIsAudio } from "../../../../utils/fileUtlis";
import { transactionErrorHanlder } from "../../../../utils/errorUtils";
import {
  getAssetDetail,
  getDatum,
  listMarket,
} from "../../../../services/blockfrostService";
import {
  BaseAddress,
  Ed25519KeyHash,
  StakeCredential,
} from "@emurgo/cardano-serialization-lib-asmjs";
import axios from "axios";
import {
  decodeAssetName,
  transformNftImageUrl,
} from "../../../../services/cardanoService";
import { getAssetDetail as getNFTDetail } from "../../../../services/koiosService";

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
  const { id, item, cost, sellerPubKeyHashHex, sellerStakeKeyHashHex } =
    router.query;
  const adaInfo = useFetchData(GetAdaPriceService.getPrice, 30000);
  const [tabValue, setTabValue] = useState("ada");
  const [detail, setDetail] = useState({});
  // const [selectedUtxo, setSelectedUtxo] = useState(null);
  const [datum, setDatum] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
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

  const onBuy = async (e) => {};
  // const onBuy = async (e) => {
  //   if (connected) {
  //     const price =
  //       detail.list?.mint_type === "single"
  //         ? detail.list?.sell_type_id?.price
  //         : detail.list?.collection_id?.assets[item]?.price;
  //     if (lovelace < price * 1000000) {
  //       Toast(
  //         "error",
  //         "You do not have enough Ada to complete this transaction"
  //       );
  //       return;
  //     } else {
  //       try {
  //         const user_address = getKeyData("user_address");
  //         const connectedWallet = getKeyData("connectedWallet");
  //         const address = detail.list?.collection_id?.recipient_address;
  //         const lovelace = detail.list?.sell_type_id?.price * 1000000;
  //         const user_value = Number(lovelace * 0.975);
  //         const owner_value = Number(lovelace * 0.025);
  //         const owner_address =
  //           "addr_test1qpm6srkw5vndavk72khy58cht0f0u796xdmwq9kfu2j63064cwwrleufnnz36s8v0pk0l54kvfn3m7et69xxsvh4ajus55y7tq";
  //         // const lucid = await Lucid.new(
  //         //   new Blockfrost(
  //         //     "https://cardano-mainnet.blockfrost.io/api/v0",
  //         //     "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj"
  //         //   ),
  //         //   "Mainnet"
  //         // );
  //         const lucid = await Lucid.new(
  //           new Blockfrost(network_url, network_key),

  //           network_name
  //         );

  //         const api = await window.cardano[String(connectedWallet)].enable();
  //         lucid.selectWallet(api);
  //         // console.log(await lucid.wallet.address());

  //         const tx = await lucid
  //           .newTx()
  //           .payToAddress(address, { lovelace: BigInt(user_value) })
  //           .payToAddress(owner_address, {
  //             lovelace: BigInt(owner_value),
  //           })
  //           .validTo(Date.now() + 100000)
  //           .complete();
  //         // console.log(tx);
  //         const signedTx = await tx.sign().complete();
  //         const txHash = await signedTx.submit();
  //         if (txHash) {
  //           try {
  //             const res = await INSTANCE.post("/list/approve", {
  //               list_id: id,
  //               index: item,
  //               recipient_address: user_address,
  //             });
  //             if (res) {
  //               Toast("success", "NFT Transfered to Your Wallet");
  //               router.push("/buy");
  //             }
  //           } catch (e) {
  //             Toast("error", "Try again later.");
  //           }
  //           // window.localStorage.setItem('policy', mintingPolicy.script)
  //           // window.localStorage.setItem('policy-id', policyId)
  //           // window.localStorage.setItem('minting-script', JSON.stringify(mintingPolicy))
  //           // router.push('/mint')
  //         }
  //       } catch (e) {
  //         transactionErrorHanlder(e, "buy");

  //         if (clientIp) {
  //           try {
  //             const response = await INSTANCE.post(`/log/create`, {
  //               error: JSON.stringify(error),
  //               ip: clientIp,
  //               type: "single buy item",
  //             });
  //             console.log(response.data);
  //           } catch (error) {
  //             console.error(error);
  //           }
  //         }
  //         console.log(e, "errro");
  //       }
  //     }
  //   } else {
  //     Toast("error", "Please connect your wallet.");
  //   }
  // };

  const [asset, setAsset] = useState({});
  console.log({ asset });
  useEffect(() => {
    setIsLoading(true);
    getNFTDetail();
  }, [id]);

  const getNFTDetail = async () => {
    if (id) {
      try {
        let asset = await getAssetDetail(id + item);
        
        setIsLoading(false);
        setAsset(asset);
      } catch (e) {
        console.log(e);
        setAsset({});
      }
    }
  };
  const buy_utxo = async () => {
    // const datum = utxo.detail.datum;
    // const cost = datum.fields[1].int;
    // const sellerPubKeyHashHex = datum.fields[0].fields[0].fields[0].bytes;
    // const sellerStakeKeyHashHex =
    //   datum.fields[0].fields[1].fields[0].fields[0].fields[0].bytes;
    let utxo = asset;
    console.log("buying ", utxo);
    const vkey = StakeCredential.from_keyhash(
      Ed25519KeyHash.from_bytes(Buffer.from(sellerPubKeyHashHex, "hex"))
    );
    const stakeKey = StakeCredential.from_keyhash(
      Ed25519KeyHash.from_bytes(Buffer.from(sellerStakeKeyHashHex, "hex"))
    );
    const sellerAddr = BaseAddress.new(0, vkey, stakeKey);
    let utxos__ = await wallet.getUtxos();
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

    return callKuberAndSubmit(wallet, JSON.stringify(request));
    // };

    // walletAction.enable = true;
  };
  let AdaPrice = asset?.onchain_metadata?.price
    ? parseFloat(asset?.onchain_metadata?.price / 1000000).toFixed(2)
    : 0;
  if (!AdaPrice) AdaPrice = 0;
  console.log({ AdaPrice });

  useEffect(() => {
    // getUsdPrice(setUsdPrice);
  }, []);

  async function getUtxos() {
    const response = await listMarket();
    // console.log("All Market Utxos", response);

    const utxos = response.filter((utxo) => {
      const amount_ = utxo.amount.filter((x) => x.unit !== "lovelace");
      if (amount_.length == 1 && amount_[0].quantity == 1) {
        const nft = amount_[0].unit;
        const policy = nft.substring(0, 56);
        const asset_ = nft.substring(56);
        const assetUtf8 = decodeAssetName(asset_);
        utxo.policy = policy;
        utxo.assetName = assetUtf8;
        utxo.detail = {};
        utxo.nft = nft;
        utxo.id = utxo.tx_hash + "#" + utxo.tx_index;

        return true;
      } else {
        return false;
      }
    });

    const promises = utxos.map(async (utxo) => {
      const dataResponse = await getDatum(utxo.data_hash);
      utxo.datum = dataResponse.json_value;

      const nftDetail = await getAssetDetail(utxo.nft);

      if (nftDetail.onchain_metadata) {
        if (nftDetail.onchain_metadata.name) {
          nftDetail._name = nftDetail.onchain_metadata.name;
        }
        if (nftDetail.onchain_metadata.image) {
          nftDetail._imageUrl = transformNftImageUrl(
            nftDetail.onchain_metadata.image
          );
        }
      }

      nftDetail.utxo = utxo.id;
      nftDetail.datum = utxo.datum;

      // setTimeout(() => {
      //   database.saveUtxos(db, [nftDetail]);
      // });
      console.log(nftDetail, "nftDetailnftDetailnftDetail");
      return nftDetail;
    });

    const settledPromises = await Promise.allSettled(promises);

    const lookup = {};
    settledPromises
      .filter((v) => v.value && v.value.datum)
      .forEach((x) => {
        lookup[x.value.utxo] = x.value;
      });

    utxos.forEach((v) => (v.detail = lookup[v.id]));

    const validUtxos = utxos.filter((v) => v.detail);
    validUtxos.map((item) => {
      console.log(fromText(item.assetName), asset.asset_name);
      fromText(item.assetName) == asset.asset_name ? setSelectedUtxo(item) : "";
    });
    console.log({ validUtxos });
    return validUtxos;
  }
  async function getNftDatum() {
    if (!asset.asset_name) {
      return;
    }
    const assetPolicy = asset.policy_id;
    const assetName = asset.asset_name;

    let res = await getNFTDetail(assetPolicy);
    console.log(res.data);
    let hash = res.data[0].minting_tx_hash;
    console.log({ hash });
    const data = {
      _tx_hashes: [
        "f144a8264acf4bdfe2e1241170969c930d64ab6b0996a4a45237b623f1dd670e",
      ],
    };

    axios
      .post("https://api.koios.rest/api/v0/tx_info", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    // getUtxos();
    // setDatum(asset.datum);
    getNftDatum();
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
