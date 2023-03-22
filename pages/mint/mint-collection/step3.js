import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../../components/Mint/Layout";
import {
  Box,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import QRCode from "react-qr-code";
import { Toast } from "../../../components/shared/Toast";
import Strips from "/components/Design/Strips";
import Baloon from "/components/Design/Ballon";
import { useLovelace, useWallet } from "@meshsdk/react";
import { useRouter } from "next/router";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import { INSTANCE } from "/config/axiosInstance";
import { costLovelace, bankWalletAddress } from "../../../config/utils";
import FullScreenLoader from "/components/shared/FullScreenLoader";
const payData = [
  // {
  // 	title: "Mint for free and list with us ",
  // 	description:
  // 		"If you list your NFT(s) with us for at least 90 days, then you only pay the network fees per mint. Under this option, you won't be able to transfer your NFT(s) until the end of 90 days, unless sold on the site.",
  // 	value: "a",
  // },
  {
    title: "Mint, pay, and stay",
    description:
      "Pay a minting fee in addtion to the network fee per mint, but you can transfer your NFT(s) at anytime.",
    value: "b",
  },
  {
    title: "Mint and go ",
    description:
      "Pay CNFT GENIE fee in addition to network fee to mint and send NFT(s) elsewhere.",
    value: "c",
  },
];

const CollectionStep3 = () => {
  let router = useRouter();
  const lovelace = useLovelace();
  const { wallet, connected } = useWallet();
  const [currentAddr, setCurrentAddr] = useState("");
  const [selectedValue, setSelectedValue] = React.useState();
  const [isLoading, setIsLoading] = useState(false);
  const onMint = async () => {
    try {
      let connectedWallet = window.localStorage.getItem("connectedWallet");

      let img = window.localStorage.getItem("img");
      if (selectedValue == undefined || selectedValue == null) {
        Toast("error", "Please Select an Option for Minting");
      } else if (img && connected) {
        if (lovelace < 1000000) {
          Toast(
            "error",
            "You do not have enough Ada to complete this transaction"
          );
          return;
        } else {
          if (selectedValue == "a") {
            setIsLoading(true);
            let metadata_objs = JSON.parse(
              window.localStorage.getItem("metadataObjects")
            );
            const lucid = await Lucid.new(
              new Blockfrost(
                "https://cardano-preprod.blockfrost.io/api/v0",
                "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"
              ),
              "Preprod"
            );

            const api = await window.cardano[String(connectedWallet)].enable();
            lucid.selectWallet(api);

            const { paymentCredential } = lucid.utils.getAddressDetails(
              await lucid.wallet.address()
            );

            const mintingPolicy = lucid.utils.nativeScriptFromJson({
              type: "all",
              scripts: [
                { type: "sig", keyHash: paymentCredential?.hash },
                {
                  type: "before",
                  slot: lucid.utils.unixTimeToSlot(Date.now() + 518400000),
                },
              ],
            });

            const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
            let obj;
            let assetObj = {};
            let units = [];
            let metadataX = {};
            let prices = [];
            for (let index = 0; index < metadata_objs.length; index++) {
              const element = metadata_objs[index];
              prices.push(element.price);
              // console.log(element, "elem");
              let metadata = element;
              metadataX[metadata.name] = metadata;
              console.log(metadataX, "dsadasd");
              assetObj[String(policyId + fromText(metadata.name))] = 1n;
              units.push(policyId + fromText(metadata.name));
              obj = { [policyId]: metadataX };
              delete element["price"];
            }
            console.log(assetObj, "onjf");

            const txL = await lucid
              .newTx()
              .validTo(Date.now() + 100000)
              .attachMintingPolicy(mintingPolicy)
              .mintAssets(assetObj)
              .attachMetadata("721", obj)
              .payToAddress(bankWalletAddress, assetObj)
              .complete();

            const signedTxL = await txL.sign().complete();
            const txHashL = await signedTxL.submit();
            if (txHashL) {
              let arr = [];
              const user_id = window.localStorage.getItem("user_id");
              for (let index = 0; index < metadata_objs.length; index++) {
                const element = metadata_objs[index];
                element["unit"] = String(policyId + fromText(element.name));
                element["price"] = Number(prices[index]);
                element["ipfs"] = element.image;
                arr.push(element);
              }
              const data = {
                metadata: arr,
                prices,
                user_id: user_id,
                claimable: true,
                recipient_address: await lucid.wallet.address(),
                policy_id: policyId,
                type: "collection",
                minting_policy: JSON.stringify(mintingPolicy),
                // asset_hex_name: unit,
              };
              const res = await INSTANCE.post("/collection/create", data);
              if (res) {
                Toast("success", "Minted Token Successfully");
                window.localStorage.setItem("policy", mintingPolicy.script);
                window.localStorage.setItem("policy-id", policyId);
                window.localStorage.setItem(
                  "minting-script",
                  JSON.stringify(mintingPolicy)
                );
                router.push("/mint");
              }
            }
            setIsLoading(false);
          } else if (selectedValue == "b") {
            setIsLoading(true);
            let metadata_objs = JSON.parse(
              window.localStorage.getItem("metadataObjects")
            );
            const lucid = await Lucid.new(
              new Blockfrost(
                "https://cardano-preprod.blockfrost.io/api/v0",
                "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"
              ),
              "Preprod"
            );

            const api = await window.cardano[String(connectedWallet)].enable();
            lucid.selectWallet(api);

            const { paymentCredential } = lucid.utils.getAddressDetails(
              await lucid.wallet.address()
            );

            const mintingPolicy = lucid.utils.nativeScriptFromJson({
              type: "all",
              scripts: [
                { type: "sig", keyHash: paymentCredential?.hash },
                {
                  type: "before",
                  slot: lucid.utils.unixTimeToSlot(Date.now() + 518400000),
                },
              ],
            });

            const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
            let obj;
            let assetObj = {};
            let units = [];
            let metadataX = {};
            let prices = [];
            for (let index = 0; index < metadata_objs.length; index++) {
              const element = metadata_objs[index];
              prices.push(element.price);
              // console.log(element, "elem");
              let metadata = element;
              metadataX[metadata.name] = metadata;
              console.log(metadataX, "dsadasd");
              assetObj[String(policyId + fromText(metadata.name))] = 1n;
              units.push(policyId + fromText(metadata.name));
              obj = { [policyId]: metadataX };
              delete element["price"];
            }
            console.log(assetObj, "onjf");

            const txL = await lucid
              .newTx()
              .validTo(Date.now() + 100000)
              .attachMintingPolicy(mintingPolicy)
              .mintAssets(assetObj)
              .attachMetadata("721", obj)
              .complete();

            const signedTxL = await txL.sign().complete();
            const txHashL = await signedTxL.submit();
            if (txHashL) {
              let arr = [];
              const user_id = window.localStorage.getItem("user_id");
              for (let index = 0; index < metadata_objs.length; index++) {
                const element = metadata_objs[index];
                element["unit"] = String(policyId + fromText(element.name));
                element["price"] = Number(prices[index]);
                element["ipfs"] = element.image;
                arr.push(element);
              }
              const data = {
                metadata: arr,
                prices,
                user_id: user_id,
                recipient_address: await lucid.wallet.address(),
                policy_id: policyId,
                type: "collection",
                minting_policy: JSON.stringify(mintingPolicy),
                // asset_hex_name: unit,
              };
              const res = await INSTANCE.post("/collection/create", data);
              if (res) {
                Toast("success", "Minted Successfully");
                window.localStorage.setItem("policy", mintingPolicy.script);
                window.localStorage.setItem("policy-id", policyId);
                window.localStorage.setItem(
                  "minting-script",
                  JSON.stringify(mintingPolicy)
                );
                router.push("/mint");
              }
            }
            setIsLoading(false);
          } else if (selectedValue == "c") {
            setIsLoading(true);
            if (currentAddr.length > 0) {
              let metadata_objs = JSON.parse(
                window.localStorage.getItem("metadataObjects")
              );
              const lucid = await Lucid.new(
                new Blockfrost(
                  "https://cardano-preprod.blockfrost.io/api/v0",
                  "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"
                ),
                "Preprod"
              );

              const api = await window.cardano[
                String(connectedWallet)
              ].enable();
              lucid.selectWallet(api);

              const { paymentCredential } = lucid.utils.getAddressDetails(
                await lucid.wallet.address()
              );

              const mintingPolicy = lucid.utils.nativeScriptFromJson({
                type: "all",
                scripts: [
                  { type: "sig", keyHash: paymentCredential?.hash },
                  {
                    type: "before",
                    slot: lucid.utils.unixTimeToSlot(Date.now() + 518400000),
                  },
                ],
              });

              const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
              let obj;
              let assetObj = {};
              let metadataX = {};
              let prices = [];
              for (let index = 0; index < metadata_objs.length; index++) {
                const element = metadata_objs[index];

                console.log(element, "elem");
                let metadata = element;
                metadataX[metadata.name] = metadata;
                // console.log(metadataX, 'dsadasd')
                assetObj[String(policyId + fromText(metadata.name))] = 1n;
                obj = { [policyId]: metadataX };
                prices.push(element.price);
                delete element["price"];
              }
              console.log(assetObj, "onjf");

              const txL = await lucid
                .newTx()
                .validTo(Date.now() + 100000)
                .attachMintingPolicy(mintingPolicy)
                .mintAssets(assetObj)
                .payToAddress(currentAddr, assetObj)
                .attachMetadata("721", obj)
                .complete();

              const signedTxL = await txL.sign().complete();
              const txHashL = await signedTxL.submit();
              if (txHashL) {
                let arr = [];
                const user_id = window.localStorage.getItem("user_id");
                for (let index = 0; index < metadata_objs.length; index++) {
                  const element = metadata_objs[index];
                  element["unit"] = String(policyId + fromText(element.name));
                  element["price"] = Number(prices[index]);
                  element["ipfs"] = element.image;
                  arr.push(element);
                }
                const data = {
                  metadata: arr,
                  prices,
                  user_id: user_id,
                  recipient_address: currentAddr,
                  policy_id: policyId,
                  type: "collection",
                  minting_policy: JSON.stringify(mintingPolicy),
                  // asset_hex_name: unit,
                };
                const res = await INSTANCE.post("/collection/create", data);
                if (res) {
                  Toast("success", "Minted Successfully");
                  window.localStorage.setItem("policy", mintingPolicy.script);
                  window.localStorage.setItem("policy-id", policyId);
                  window.localStorage.setItem(
                    "minting-script",
                    JSON.stringify(mintingPolicy)
                  );
                  router.push("/mint");
                }
              }
            } else {
              Toast("error", "Please Set the Recipeint Address");
            }
            setIsLoading(false);
          }
        }
      } else {
        Toast("error", "Please connect your wallet.");
      }
    } catch (error) {
      console.log("error", error);
      Toast("error", "Error Occured while Minting");
      setIsLoading(false);
    }
  };

  return (
    <SingleMintStep3Styled>
      <Strips />
      {isLoading && <FullScreenLoader />}
      <Baloon />
      <Container>
        <Box sx={{ pt: 15, pb: 3 }} className="text_white">
          <Typography variant="h4" className="bold">
            Pay
          </Typography>
        </Box>
        <Layout>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {payData.map((data, index) => (
                <div key={index}>
                  <Box className="check_panel">
                    <FormControlLabel
                      value={data.value}
                      control={<Radio />}
                      label={data.title}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      sx={{
                        "& .Mui-checked": {
                          color: "var(--secondary-color)",
                        },
                      }}
                    />
                    <Box>
                      <Typography sx={{ pl: 4 }}>{data.description}</Typography>
                      {data.value === "c" && (
                        <>
                          <Grid container spacing={3} sx={{ py: 2 }}>
                            {/* <Grid item lg={5}>
															<QRCode value={currentAddr} />
														</Grid> */}
                            <Grid item xs={7}>
                              <Typography
                                sx={{
                                  mb: 1,
                                }}
                                variant="h6"
                              >
                                Make Payment
                              </Typography>
                              <TextField
                                placeholder="e.g addr1qykn8nchkf5ckg0clq6pa580a50t3zdc06prgwcaj605wpd2g0z6sy0pturmfuru097z3yxknjpnm7fymm96n2vyfxaq0gk62p"
                                fullWidth={true}
                                onChange={(e) => setCurrentAddr(e.target.value)}
                                defaultValue={currentAddr}
                                sx={{
                                  background: "transparent",
                                  input: {
                                    padding: "9px 10px",
                                    borderRadius: "10px",
                                    border: "1px solid #fff",
                                  },
                                  fieldset: {
                                    border: "none",
                                  },
                                }}
                              />
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Box>
                  </Box>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <Box>
            <Button className="btn2" sx={{ my: 3 }} onClick={(e) => onMint(e)}>
              Pay and Mint
            </Button>
          </Box>
        </Layout>
      </Container>
    </SingleMintStep3Styled>
  );
};

export default CollectionStep3;

const SingleMintStep3Styled = styled.section`
  .check_panel {
    font-size: 1.2rem;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 25px;
    margin-bottom: 20px;
  }
`;
