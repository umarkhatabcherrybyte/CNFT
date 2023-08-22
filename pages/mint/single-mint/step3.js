import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../../components/Mint/Layout";
import { CardanoWallet, useLovelace, useWallet } from "@meshsdk/react";
import { Toast } from "../../../components/shared/Toast";
import { createTransaction, signTransaction } from "../../../backend";
import CircularJSON from "circular-json";
//import { Lucid } from "lucid-cardano";
import { network_name, network_url, network_key } from "../../../base_network";
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
import {
  costLovelace,
  bankWalletAddress,
  seedPhrasePreprod,
} from "../../../config/utils";
import {
  Lucid,
  fromText,
  Blockfrost,
  Data,
  applyParamsToScript,
} from "lucid-cardano";
import { INSTANCE } from "/config/axiosInstance";
import FullScreenLoader from "/components/shared/FullScreenLoader";
import { transactionErrorHanlder } from "../../../helper/transactionError";
import { getClientIp } from "../../../helper/clientIP";
import { cborHex } from "../../../config";
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
  const lovelace = useLovelace();
  const { wallet, connected } = useWallet();
  const [currentAddr, setCurrentAddr] = useState("");
  const [selectedValue, setSelectedValue] = React.useState();
  const [isLoading, setIsLoading] = useState(false);

  const onMint = async () => {
    try {
      console.log("dasdasd1");

      if (!connected) {
        Toast("error", "Please Connect Your Wallet First");
      } else if (lovelace < 1000000) {
        Toast(
          "error",
          "You do not have enough Ada to complete this transaction"
        );
      } else {
        let img = window.localStorage.getItem("img");
        let connectedWallet = window.localStorage.getItem("connectedWallet");
        if (selectedValue == undefined || selectedValue == null) {
          console.log("dasdasd2");
          Toast("error", "Please Select an Option for Minting");
        } else if (img && connected) {
          console.log("dasdasd3");
          if (selectedValue == "a") {
            setIsLoading(true);
            //------------------Lucid mainnet---------------
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
            //-------------------Lucid preprod---------------
            // const lucid = await Lucid.new(
            //   new Blockfrost(
            //     "https://cardano-preprod.blockfrost.io/api/v0",
            //     "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"
            //   ),
            //   "Preprod"
            // );

            const api = await window.cardano[String(connectedWallet)].enable();
            lucid.selectWallet(api);

            let network = await lucid.network;
            let addDeet = await lucid.utils.getAddressDetails(
              await lucid.wallet.address()
            );
            let seed = await lucid.utils.generateSeedPhrase();

            console.log(network, addDeet);

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
            // console.log(metadataX, "dsadasd");

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
                  setIsLoading(false);
                }
              } catch (e) {
                setIsLoading(false);

                console.log(e);
              }
            }
          } else if (selectedValue == "b") {
            setIsLoading(true);
            const lucid = await Lucid.new(
              new Blockfrost(network_url, network_key),
              network_name
            );
            const api = await window.cardano[String(connectedWallet)].enable();
            lucid.selectWallet(api);
            const addr = await lucid.wallet.address();
            const utxos = await lucid.utxosAt(addr);
            const utxo = utxos[0];
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
            let metadata = JSON.parse(window.localStorage.getItem("metadata"));
            metadataX[metadata.name] = metadata;
            const unit = policyId + fromText(metadata.name);
            let obj = { [policyId]: metadataX };
            const tx = await lucid
              .newTx()
              .mintAssets({ [unit]: 1n }, Data.void())
              .attachMetadata("721", obj)
              .attachMintingPolicy(nftPolicy)
              .collectFrom([utxo])
              .payToAddress(bankWalletAddress, { lovelace: 1000n })
              .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            if (txHash) {
              try {
                // const user_id = window.localStorage.getItem("userid");
                // metadata["unit"] = unit;
                // metadata["ipfs"] = img;
                // const data = {
                //   metadata: [metadata],
                //   user_id: user_id,
                //   recipient_address: await lucid.wallet.address(),
                //   policy_id: policyId,
                //   type: "single",
                //   minting_policy: JSON.stringify(nftPolicy),
                //   // asset_hex_name: unit,
                // };
                // const res = await INSTANCE.post("/collection/create", data);
                // if (res) {
                Toast("success", "Minted Successfully");
                // window.localStorage.setItem("policy", nftPolicy.script);
                // window.localStorage.setItem("policy-id", policyId);
                // window.localStorage.setItem(
                //   "minting-script",
                //   JSON.stringify(nftPolicy)
                // );
                router.push("/mint");
                setIsLoading(false);
                // }
              } catch (e) {
                setIsLoading(false);
                console.log(e);
              }
            }
            setIsLoading(false);
          } else if (selectedValue == "c") {
            setIsLoading(true);
            const lucid = await Lucid.new(
              new Blockfrost(network_url, network_key),
              network_name
            );
            const api = await window.cardano[String(connectedWallet)].enable();
            lucid.selectWallet(api);
            const addr = await lucid.wallet.address();
            const utxos = await lucid.utxosAt(addr);
            const utxo = utxos[0];
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
            let metadata = JSON.parse(window.localStorage.getItem("metadata"));
            metadataX[metadata.name] = metadata;
            const unit = policyId + fromText(metadata.name);
            let obj = { [policyId]: metadataX };
            const tx = await lucid
              .newTx()
              .mintAssets({ [unit]: 1n }, Data.void())
              .attachMetadata("721", obj)
              .attachMintingPolicy(nftPolicy)
              .collectFrom([utxo])
              .payToAddress(currentAddr, { [unit]: 1n })
              .payToAddress(bankWalletAddress, { lovelace: 1000000n })
              .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            if (txHash) {
              try {
                // const user_id = window.localStorage.getItem("userid");
                // metadata["unit"] = unit;
                // metadata["ipfs"] = img;
                // const data = {
                //   metadata: [metadata],
                //   user_id: user_id,
                //   recipient_address: await lucid.wallet.address(),
                //   policy_id: policyId,
                //   type: "single",
                //   minting_policy: JSON.stringify(nftPolicy),
                //   // asset_hex_name: unit,
                // };
                // const res = await INSTANCE.post("/collection/create", data);
                // if (res) {
                Toast("success", "Minted Successfully");
                // window.localStorage.setItem("policy", nftPolicy.script);
                // window.localStorage.setItem("policy-id", policyId);
                // window.localStorage.setItem(
                //   "minting-script",
                //   JSON.stringify(nftPolicy)
                // );
                router.push("/mint");
                setIsLoading(false);
                // }
              } catch (e) {
                setIsLoading(false);
                console.log(e);
              }
              setIsLoading(false);
            }
          }
        } else {
          Toast("error", "You are Not Connected");
        }
      }
    } catch (error) {
      transactionErrorHanlder(error, "mint");
      setIsLoading(false);
      const errorString = JSON.stringify(Object.values(error));
      const clientIp = await getClientIp();
      if (clientIp) {
        try {
          console.log(error, "sdsdfdsf error");
          const response = await INSTANCE.post(`/log/create`, {
            error: errorString,
            ip: clientIp,
            type: "single mint",
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
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
