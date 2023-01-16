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

const SingleMintStep3 = () => {
  const [currentAddr, setCurrentAddr] = useState("");
  const [imgHash, setImgHash] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const { wallet, connected } = useWallet();

  useEffect(() => {
    let img = JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("img")
    );
    setImgHash(img.path);
  }, []);

  const onMint = async () => {
    if (selectedValue == undefined || selectedValue == null) {
      Toast("error", "Please Select an Option for Minting");
    } else if (imgHash && connected) {
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
  return (
    <SingleMintStep3Styled>
      {/* {connected ? (
        <button
          type="button"
          onClick={(e) => startMining(e)}
          disabled={loading}
        >
          {loading ? "Creating transaction..." : "Mint Mesh Token"}
        </button>
      ) : (
        <CardanoWallet />
      )} */}
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
