import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../../components/Mint/Layout";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Toast } from "../../../components/shared/Toast";
import { createTransaction, signTransaction } from "../../../backend";
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
import Strips from "/components/Design/Strips";
import Baloon from "/components/Design/Ballon";
import { useRouter } from "next/router";
import { singleMintStep1 } from "../../../components/Routes/constants";
import {
  Transaction,
  ForgeScript,
  resolveSlotNo,
  resolvePaymentKeyHash,
  largestFirst,
  AppWallet,
  BlockfrostProvider,
} from "@meshsdk/core";
import { costLovelace, bankWalletAddress } from "../../../config/utils";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import { INSTANCE } from "/config/axiosInstance";

const payData = [
  // {
  //   title: "Mint for free and list with us ",
  //   description:
  //     "If you list your NFT(s) with us for at least 90 days, then you only pay the network fees per mint. Under this option, you won't be able to transfer your NFT(s) until the end of 90 days, unless sold on the site.",
  //   value: "a",
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

const SingleMintStep3 = () => {
  let router = useRouter();

  const { wallet, connected } = useWallet();
  const [currentAddr, setCurrentAddr] = useState("");
  const [selectedValue, setSelectedValue] = React.useState();

  const onMint = async () => {
    try {
      if (!connected) {
        Toast("error", "Please Connect Your Wallet First");
      } else {
        let img = window.localStorage.getItem("img");
        let connectedWallet = window.localStorage.getItem("connectedWallet");
        if (selectedValue == undefined || selectedValue == null) {
          Toast("error", "Please Select an Option for Minting");
        } else if (img && connected) {
          if (selectedValue == "a") {
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
            let metadataX = {};
            let metadata = JSON.parse(window.localStorage.getItem("metadata"));
            metadataX[metadata.name] = metadata;
            console.log(metadataX, "dsadasd");

            const unit = policyId + fromText(metadata.name);
            let obj = { [policyId]: metadataX };
            const tx = await lucid
              .newTx()
              .attachMetadata("721", obj)
              .mintAssets({ [unit]: 1n })
              .validTo(Date.now() + 100000)
              .payToAddress(bankWalletAddress, { [unit]: 1n })
              .attachMintingPolicy(mintingPolicy)
              .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            if (txHash) {
              try {
                const user_id = window.localStorage.getItem("userid");
                metadata["unit"] = unit;
                metadata["ipfs"] = img;
                const data = {
                  metadata: [metadata],
                  user_id: user_id,
                  claimable: true,
                  recipient_address: await lucid.wallet.address(),
                  policy_id: policyId,
                  type: "single",
                  minting_policy: JSON.stringify(mintingPolicy),
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
              } catch (e) {
                console.log(e);
              }
            }
          } else if (selectedValue == "b") {
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
            let metadataX = {};
            let metadata = JSON.parse(window.localStorage.getItem("metadata"));
            metadataX[metadata.name] = metadata;
            console.log(metadataX, "dsadasd");

            const unit = policyId + fromText(metadata.name);
            let obj = { [policyId]: metadataX };
            const tx = await lucid
              .newTx()
              .attachMetadata("721", obj)
              .mintAssets({ [unit]: 1n })
              .validTo(Date.now() + 100000)
              .payToAddress(bankWalletAddress, { lovelace: 5000000n })
              .attachMintingPolicy(mintingPolicy)
              .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            if (txHash) {
              try {
                const user_id = window.localStorage.getItem("userid");
                metadata["unit"] = unit;
                metadata["ipfs"] = img;
                const data = {
                  metadata: [metadata],
                  user_id: user_id,
                  recipient_address: await lucid.wallet.address(),
                  policy_id: policyId,
                  type: "single",
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
              } catch (e) {
                console.log(e);
              }
            }
          } else if (selectedValue == "c") {
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
            let metadataX = {};
            let metadata = JSON.parse(window.localStorage.getItem("metadata"));
            metadataX[metadata.name] = metadata;
            console.log(metadataX, "dsadasd");
            const unit = policyId + fromText(metadata.name);
            let obj = { [policyId]: metadataX };
            const tx = await lucid
              .newTx()
              .attachMetadata("721", obj)
              .mintAssets({ [unit]: 1n })
              .payToAddress(currentAddr, { [unit]: 1n })
              .payToAddress(bankWalletAddress, { lovelace: 5000000n })
              .validTo(Date.now() + 100000)
              .attachMintingPolicy(mintingPolicy)
              .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            if (txHash) {
              try {
                const user_id = window.localStorage.getItem("userid");
                metadata["unit"] = unit;
                metadata["ipfs"] = img;

                const data = {
                  metadata: [metadata],
                  user_id: user_id,
                  recipient_address: await lucid.wallet.address(),
                  policy_id: policyId,
                  type: "single",
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
              } catch (e) {
                console.log(e);
              }
            }
          }
        } else {
          Toast("error", "You are Not Connected");
        }
      }
    } catch (error) {
      console.log("error", error);
      Toast("error", "Error Occured while Minting");
    }
  };

  return (
    <SingleMintStep3Styled>
      <Strips />
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
                <Box className="check_panel" key={index}>
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
                          <Grid item xs={12}>
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

export default SingleMintStep3;

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
