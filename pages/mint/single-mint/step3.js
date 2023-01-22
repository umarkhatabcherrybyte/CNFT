import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../../components/Mint/Layout";
import { CardanoWallet, useWallet } from "@meshsdk/react";
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
import { Toast } from "../../../components/shared/Toast";
import Strips from "/components/Design/Strips";
import Baloon from "/components/Design/Ballon";
import NamiWalletApi, { Cardano } from "../../../nami-js/nami";


const payData = [
  {
    title: "Mint for free and list with us ",
    description:
      "If you list your NFT(s) with us for at least 90 days, then you only pay the network fees per mint. Under this option, you won't be able to transfer your NFT(s) until the end of 90 days, unless sold on the site.",
    value: "a",
  },
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

let nami;

const SingleMintStep3 = () => {
  const [currentAddr, setCurrentAddr] = useState("");
  const [imgHash, setImgHash] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [recipientAddressMain, setRecipientAddressMain] = useState("");
  const [recipientAddressTest, setRecipientAddressTest] = useState("");

  const { wallet, connected } = useWallet();

  // useEffect(() => {
  //   let img = JSON.parse(
  //     typeof window !== "undefined" && window.localStorage.getItem("img")
  //   );
  //   setImgHash(img.path);
  // }, []);

  const onMint = async () => {
    let img = typeof window !== "undefined" && window.localStorage.getItem("img")
    if (selectedValue == undefined || selectedValue == null) {
      Toast("error", "Please Select an Option for Minting");
    } else if (img && connected) {
      if (selectedValue == "a") {
        Toast("error", "This Option is Currently in Development");
      } else if (selectedValue == "b") {
        const signedTx = await wallet.signTx(
          typeof window !== "undefined" &&
          window.localStorage.getItem("txHash"),
          true
        );
        const { txHash } = await signTransaction(
          "nice",
          signedTx,
          typeof window !== "undefined" &&
          window.localStorage.getItem("original")
        );
        console.log(txHash, "hasafh3333");
      } else if (selectedValue == "c") {
        const utxos = await wallet.getUtxos();
        const { maskedTx, originalMetadata } = await createTransaction(
          currentAddr,
          utxos,
          imgHash,
          JSON.parse(
            typeof window !== "undefined" &&
            window.localStorage.getItem("metadata")
          )
        );
        const signedTx = await wallet.signTx(maskedTx, true);
        const { txHash } = await signTransaction(
          "nice",
          signedTx,
          originalMetadata
        );
        if (txHash) {
          Toast("success", "Minted Succesfully");
        }
      }
    } else {
      Toast("error", "You are not nonnected");
    }
  };

  const sendFeesAndNFT = async () => {

    try {
      const mediaType = window.localStorage.getItem("file_mimeType");
      const item_name = window.localStorage.getItem("item_name");
      const item_description = window.localStorage.getItem("item_description");

      //await nami.enable();
      let adaPrice = 0.8;
      try {
        const adaInfo = await GetAdaPriceService.getPrice();
        adaPrice = Number(adaInfo?.data[0]?.current_price);
      } catch (e) {

      }
      var myAddress = await nami.getHexAddress();

      let networkId = await nami.getNetworkId();
      var newPolicy;
      newPolicy = await nami.createLockingPolicyScript(myAddress, networkId.id, policyExpiration);
      var complexTrans = complexTransaction;
      myAddress = await nami.getAddress();


      let recipientAddress = recipientAddressMain;
      if (networkId.id == 0) recipientAddress = recipientAddressTest;
      //recipients[0] => mint owner
      complexTrans.recipients[0].address = myAddress;
      complexTrans.recipients[0].mintedAssets[0].policyId = newPolicy.id;
      complexTrans.recipients[0].mintedAssets[0].policyScript = newPolicy.script;
      complexTrans.recipients[0].mintedAssets[0].assetName = item_name;
      //recipients[1] => mint site Manger

      if (mintingOption === 2) {
        complexTrans.recipients = [...complexTrans.recipients, {
          address: recipientAddress,
          amount: Math.round(4 / adaPrice)
        }]

      }
      if (mintingOption === 3) {
        complexTrans.recipients = [...complexTrans.recipients, {
          address: recipientAddress,
          amount: Math.round(4 / adaPrice)
        }]
      }

      complexTrans.metadata =
      {
        "721":
        {
          [newPolicy.id]:
          {
            [complexTrans.recipients[0].mintedAssets[0].assetName]:
            {
              name: item_name,
              description: item_description,
              image: `ipfs://${typeof window !== "undefined" && window.localStorage.getItem("img")}`,
              mediaType: mediaType
            }
          }
        }
      };
      const recipients = complexTrans.recipients
      const metadataTransaction = complexTrans.metadata
      let utxos = await nami.getUtxosHex();

      let netId = await nami.getNetworkId();
      const t = await nami.transaction({
        PaymentAddress: myAddress,
        recipients: recipients,
        metadata: metadataTransaction,
        utxosRaw: utxos,
        networkId: netId.id,
        ttl: 3600,
        multiSig: null
      })
      const signature = await nami.signTx(t)
      const txHash = await nami.submitTx({
        transactionRaw: t,
        witnesses: [signature],
        networkId: netId.id
      })
      console.log("txHash = ", txHash)
      if (txHash?.status_code == 400) {
        sendFeesAndNFT();
        return;
      }
      setMintSuccess(true);
      NotificationManager.success("Minting succeed.");
    }
    catch (error) {
      console.log("error : ", error);
      if (error.message == "INPUTS_EXHAUSTED") {
        Toast("error", "Minting failed. You don't have enough ADA in your wallet.")
      }
      else {
        Toast("error", "Minting failed. " + error.message);
      }
    }
  }
  useEffect(() => {
    if (connected) {
      async function t() {
        // const S = await Cardano();
        setRecipientAddressMain("addr_test1qqhg0fa30eglhmkg57eh7z2uenthgtzs3pcrqhjmtxw2m73a5fqzs44y203szvnyrtvkdcppa8we6tecc45n4c4j56wsafczlj");
        setRecipientAddressTest("addr_test1qqhg0fa30eglhmkg57eh7z2uenthgtzs3pcrqhjmtxw2m73a5fqzs44y203szvnyrtvkdcppa8we6tecc45n4c4j56wsafczlj");
        let Wallet;
        if (window.localStorage.getItem("connectedWallet") == "nami")
          Wallet = await window.cardano.nami.enable();
        else if (window.localStorage.getItem("connectedWallet") == "eternl")
          Wallet = await window.cardano.eternl.enable();
        else Wallet = await window.cardano.flint.enable();
        nami = new NamiWalletApi(
          S,
          Wallet,
          blockfrostApiKey
        )
        await nami.getAddress().then((newAddress) => {
          setCurrentAddr(newAddress)
        })
      }
      t();
    }
  }, []);
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
              {payData.map((data) => (
                <>
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
                          {/* <Typography
                            variant="body"
                            sx={{ py: 2 }}
                            component="div"
                          >
                            Send 10 ADA for minting. Note: do not use an
                            exchange, only use the your wallet. Send the
                            specified amount. You can also use the barcode or
                            copy the wallet address bellow.
                          </Typography> */}
                          <Grid container spacing={3} sx={{ py: 2 }}>
                            <Grid item lg={5}>
                              <QRCode value={currentAddr} />
                            </Grid>
                            <Grid item lg={7}>
                              <Typography variant="h6">Make Payment</Typography>
                              <TextField
                                placeholder="e.g addr1qykn8nchkf5ckg0clq6pa580a50t3zdc06prgwcaj605wpd2g0z6sy0pturmfuru097z3yxknjpnm7fymm96n2vyfxaq0gk62p"
                                fullWidth
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
                </>
              ))}
            </RadioGroup>
          </FormControl>
          <Button className="btn2" sx={{ my: 3 }} onClick={(e) => onMint(e)}>
            Pay and Mint
          </Button>
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
