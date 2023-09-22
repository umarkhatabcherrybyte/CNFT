import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../../components/Mint/Layout";
import { useLovelace, useWallet } from "@meshsdk/react";
import { Toast } from "../../../components/shared/Toast";
import { mintNFT } from "../../../utils/nftMinter";
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
      if (!connected) {
        Toast("error", "Please Connect Your Wallet First");
      } else if (lovelace < 1000000) {
        Toast(
          "error",
          "You do not have enough Ada to complete this transaction"
        );
      } else {
        let connectedWallet = window.localStorage.getItem("connectedWallet");
        if (selectedValue == undefined || selectedValue == null) {
          Toast("error", "Please Select an Option for Minting");
        } else {
          setIsLoading(true);
          if (selectedValue == "a") {
          } else if (selectedValue == "b" || selectedValue == "c") {
            const txHash = await mintNFT(
              selectedValue,
              connectedWallet,
              currentAddr
            );
            if (txHash) {
              Toast("success", "Minted Successfully");
              router.push("/mint");
              setIsLoading(false);
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
              // window.localStorage.setItem("policy", nftPolicy.script);
              // window.localStorage.setItem("policy-id", policyId);
              // window.localStorage.setItem(
              //   "minting-script",
              //   JSON.stringify(nftPolicy)
              // );

              // }
            }
          }
          setIsLoading(false);
        }
      }
    } catch (error) {
      transactionErrorHanlder(error, "mint");
      setIsLoading(false);
    }
  };

  return (
    <SingleMintStep3Styled>
      <Strips />
      <Baloon />
      {isLoading && <FullScreenLoader />}
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
