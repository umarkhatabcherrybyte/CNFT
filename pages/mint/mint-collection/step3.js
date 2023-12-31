import React, { useState } from "react";
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
import { Data } from "lucid-cardano";
import { bankWalletAddress } from "../../../config/walletConstants";
import FullScreenLoader from "/components/shared/FullScreenLoader";
import { transactionErrorHanlder } from "../../../utils/errorUtils";
import { checkAdaBalance } from "../../../utils/balanceUtils";
import {
  connectWallet,
  createTextValue,
  generatePolicyFromSmartContract,
  generateUnit,
  getAddressFromLucid,
  getUtxosForAddress,
  initializeLucid,
  signAndSubmitTransaction,
} from "../../../utils/lucidUtils";

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
      } else if (connected) {
        if (!checkAdaBalance(lovelace)) {
          return null;
        } else {
          if (selectedValue == "b") {
            setIsLoading(true);
            let metadata_objs = JSON.parse(
              window.localStorage.getItem("metadataObjects")
            );
            const lucid = await initializeLucid();
            const api = await connectWallet(connectedWallet);
            lucid.selectWallet(api);
            const addr = await getAddressFromLucid(lucid);
            const utxos = await getUtxosForAddress(lucid, addr);
            const utxo = utxos[0];
            const tn = createTextValue("nft");
            const image = createTextValue("nft");

            const { nftPolicy, policyId } = generatePolicyFromSmartContract(
              lucid,
              utxo,
              tn,
              image
            );

            let obj;
            let assetObj = {};
            let metadataX = {};
            for (let index = 0; index < metadata_objs.length; index++) {
              const element = metadata_objs[index];
              let metadata = element;
              metadataX[metadata.name] = metadata;
              assetObj[generateUnit(policyId, metadata.name)] = 1n;
              obj = { [policyId]: metadataX };
            }

            const tx = await lucid
              .newTx()
              .mintAssets(assetObj, Data.void())
              .attachMintingPolicy(nftPolicy)
              .attachMetadata("721", obj)
              .payToAddress(bankWalletAddress, { lovelace: 1000000 })
              .collectFrom([utxo])
              .complete();
            const txHash = await signAndSubmitTransaction(tx);
            if (txHash) {
              //   let arr = [];
              //   const user_id = window.localStorage.getItem("user_id");
              //   for (let index = 0; index < metadata_objs.length; index++) {
              //     const element = metadata_objs[index];
              //     element["unit"] = String(policyId + fromText(element.name));
              //     element["price"] = Number(prices[index]);
              //     element["ipfs"] = element.image;
              //     arr.push(element);
              //   }
              //   const data = {
              //     metadata: arr,
              //     prices,
              //     user_id: user_id,
              //     recipient_address: await lucid.wallet.address(),
              //     policy_id: policyId,
              //     type: "collection",
              //     minting_policy: JSON.stringify(mintingPolicy),
              //     // asset_hex_name: unit,
              //   };
              //   const res = await INSTANCE.post("/collection/create", data);
              //   if (res) {
              Toast("success", "Minted Successfully");
              //     window.localStorage.setItem("policy", mintingPolicy.script);
              //     window.localStorage.setItem("policy-id", policyId);
              //     window.localStorage.setItem(
              //       "minting-script",
              //       JSON.stringify(mintingPolicy)
              //     );
              router.push("/mint");
              //   }
            }
            setIsLoading(false);
          } else if (selectedValue == "c") {
            setIsLoading(true);
            let metadata_objs = JSON.parse(
              window.localStorage.getItem("metadataObjects")
            );

            const lucid = await initializeLucid();
            const api = await connectWallet(connectedWallet);
            lucid.selectWallet(api);
            const addr = await getAddressFromLucid(lucid);
            const utxos = await getUtxosForAddress(lucid, addr);
            const utxo = utxos[0];
            const tn = createTextValue("nft");
            const image = createTextValue("nft");

            const { nftPolicy, policyId } = generatePolicyFromSmartContract(
              lucid,
              utxo,
              tn,
              image
            );

            let obj;
            let assetObj = {};
            let metadataX = {};

            for (let index = 0; index < metadata_objs.length; index++) {
              const element = metadata_objs[index];
              let metadata = element;
              metadataX[metadata.name] = metadata;
              assetObj[generateUnit(policyId, metadata.name)] = 1n;
              obj = { [policyId]: metadataX };
            }

            const tx = await lucid
              .newTx()
              .mintAssets(assetObj, Data.void())
              .attachMintingPolicy(nftPolicy)
              .attachMetadata("721", obj)
              .payToAddress(bankWalletAddress, { lovelace: 1000000 })
              .payToAddress(currentAddr, assetObj)
              .collectFrom([utxo])
              .complete();
            const txHash = await signAndSubmitTransaction(tx);
            if (txHash) {
              //   let arr = [];
              //   const user_id = window.localStorage.getItem("user_id");
              //   for (let index = 0; index < metadata_objs.length; index++) {
              //     const element = metadata_objs[index];
              //     element["unit"] = String(policyId + fromText(element.name));
              //     element["price"] = Number(prices[index]);
              //     element["ipfs"] = element.image;
              //     arr.push(element);
              //   }
              //   const data = {
              //     metadata: arr,
              //     prices,
              //     user_id: user_id,
              //     recipient_address: await lucid.wallet.address(),
              //     policy_id: policyId,
              //     type: "collection",
              //     minting_policy: JSON.stringify(mintingPolicy),
              //     // asset_hex_name: unit,
              //   };
              //   const res = await INSTANCE.post("/collection/create", data);
              //   if (res) {
              Toast("success", "Minted Successfully");
              //     window.localStorage.setItem("policy", mintingPolicy.script);
              //     window.localStorage.setItem("policy-id", policyId);
              //     window.localStorage.setItem(
              //       "minting-script",
              //       JSON.stringify(mintingPolicy)
              //     );
              router.push("/mint");
              //   }
            }
            setIsLoading(false);
          }
        }
      } else {
        Toast("error", "Please connect your wallet.");
      }
    } catch (error) {
      console.log("error", error);
      transactionErrorHanlder(error, "mint");

      // Toast("error", "Error Occured while Minting");
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
