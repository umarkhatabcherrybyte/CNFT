import React, { useEffect } from "react";
import { createTransaction } from "/backend";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import styled from "styled-components";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import Layout from "/components/Mint/Layout";
import { Toast } from "/components/shared/Toast";
import { useRouter } from "next/router";
import {
  mintSingleStep3,
  mintSingleStep1,
} from "../../../components/Routes/constants";
import CaptionHeading from "/components/shared/headings/CaptionHeading";


const SingleMintStep2 = () => {
  const router = useRouter();
  const { wallet, connected } = useWallet();
  const [rangeValue, setRangeValue] = React.useState(10);
  const [loading, setLoading] = React.useState(false);

  const [metadata, setMetadata] = React.useState({
    image: `ipfs://${
      typeof window !== "undefined" && window.localStorage.getItem("img")
    }`,
    mediaType: "image/jpg",
    description: "",
    name: "",
    description: "",
    creator: "",
    link: "",
  });

  const onInputChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  const onInputRangeChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
    setRangeValue(e.target.value);
  };

  const byteSize = str => new Blob([str]).size;

  const onNextButton = async () => {
    setLoading(true);
    let img = window.localStorage.getItem("img");
    if(byteSize(metadata.name)>32){
      Toast("error", "Name is Too Long")
      setLoading(false);
      return
    }
    else if(byteSize(metadata.description)>64){
      Toast("error", "Description is Too Long");
      setLoading(false);
      return
    }
    else if(byteSize(metadata.link)>64){
      Toast("error", "Link is Too Long");
      setLoading(false);
      return
    }
    else if(byteSize(metadata.creator)>64){
      Toast("error", "Creator is Too Long");
      setLoading(false);
      return
    }
    else if (!metadata.name || metadata.name === null || metadata.name === "") {
      Toast("error", "Name is invalid.");
      setLoading(false);
      return;
    }
    if (img && connected) {
      if (typeof window !== "undefined") {
        // window.localStorage.setItem("txHash", String(unsignedTx));
        window.localStorage.setItem("metadata", JSON.stringify(metadata));
      }
      setLoading(false);
      router.push(mintSingleStep3);
    } else {
      Toast("error", "Please Connect Your Wallet");
      setLoading(false);
    }
  };

  const onBackButton = async () => {
    // setLoading(true);
    router.push(mintSingleStep1);
  };

  return (
    <SingleMintStep2Styled>
      <Container>
        <Box sx={{ pt: 15, pb: 3 }} className="text_white">
          <Typography variant="h5" className="bold">
            Add metadata
          </Typography>
          <Typography
            variant="body"
            sx={{ py: 1, fontSize: "14px" }}
            component="div"
          >
            Royalty fees may be set up to 15%; However, the lower your royalty
            fee, the better chance that your NFT(s) will sell, Royalty fees in
            excess of 10% are not recommended.
          </Typography>
        </Box>
        <Layout>
          {!loading ? (
            <>
              <TextField
                placeholder="Name your item"
                name="name"
                onChange={(e) => onInputChange(e)}
                fullWidth={true}
                sx={{
                  fieldset: {
                    border: "none",
                  },
                  "& .Mui-focused": {
                    background: "#fff !important",
                  },
                  input: {
                    padding: "10.5px 14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    margin: "5px 0",
                  },
                  "& ::placeholder": {
                    color: "#FFFFFF !important",
                    fontWeight: "bold",
                  },
                }}
              ></TextField>
              <TextField
                placeholder="Description(optional)"
                name="description"
                onChange={(e) => onInputChange(e)}
                fullWidth={true}
                sx={{
                  fieldset: {
                    border: "none",
                  },
                  "& .Mui-focused": {
                    background: "#fff !important",
                  },
                  "& .MuiOutlinedInput-root": {
                    padding: "10.5px 14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    margin: "5px 0",
                  },
                  "& ::placeholder": {
                    color: "#FFFFFF !important",
                    fontWeight: "bold",
                  },
                }}
                minRows={3}
                multiline
              />
              <TextField
                name="creator"
                placeholder="Creator(optional)"
                onChange={(e) => onInputChange(e)}
                fullWidth={true}
                sx={{
                  fieldset: {
                    border: "none",
                  },
                  "& .Mui-focused": {
                    background: "#fff !important",
                  },
                  input: {
                    padding: "10.5px 14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    margin: "5px 0",
                  },
                  "& ::placeholder": {
                    color: "#FFFFFF !important",
                    fontWeight: "bold",
                  },
                }}
              ></TextField>
              <TextField
                name="link"
                placeholder="Web link(optional)"
                onChange={(e) => onInputChange(e)}
                fullWidth={true}
                sx={{
                  fieldset: {
                    border: "none",
                  },
                  "& .Mui-focused": {
                    background: "#fff !important",
                  },
                  input: {
                    padding: "10.5px 14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    margin: "5px 0",
                  },
                  "& ::placeholder": {
                    color: "#FFFFFF !important",
                    fontWeight: "bold",
                  },
                }}
              ></TextField>

              <Box className="text_white">
                {/* <Typography variant="body" sx={{ pt: 1 }} component="div">
                  Set your royalties
                </Typography>
                <Box>
                  <div align="left">
                    <div className="range-wrap">
                      <div
                        className="range-value"
                        style={{
                          left:
                            25 -
                            Math.floor(rangeValue / 10) * 19 -
                            Math.floor(rangeValue / 12) * 3 -
                            (1 - Math.floor(rangeValue / 10)) * rangeValue +
                            (rangeValue / 15) * 300 +
                            "px",
                          position: "relative",
                          top: "12px",
                        }}
                        id="rangeV"
                      >
                        <span>{rangeValue}%</span>
                      </div>
                      <div
                        className="progress-bar"
                        style={{ width: (rangeValue / 15) * 300 + "px" }}
                      ></div>
                      <span className="form-label">0%&nbsp;</span>
                      <input
                        type="range"
                        className="slider"
                        id="royalty_range"
                        name="royalty"
                        step="0.1"
                        max="15"
                        min="0"
                        value={rangeValue}
                        onChange={(e) => onInputRangeChange(e)}
                      />
                      <span className="form-label">&nbsp;15%</span>
                    </div>
                  </div>
                </Box> */}
                <Box>
                  {/* <Typography variant="body" sx={{ pt: 1 }} component="div">
                    You can set up 15% royalty and get paid every time your nft
                    sells.
                  </Typography>
                  <Typography variant="body" sx={{ pt: 1 }} component="div">
                    * We collect a 2.55 royalty fee each tome your NFT sells,
                    click here for more information
                  </Typography> */}
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 3 }}
                  >
                    <Button style={{}} className="btn" onClick={onBackButton}>
                      Back
                    </Button>
                    <Button
                      style={{
                        marginLeft: "10px",
                      }}
                      className="btn"
                      onClick={onNextButton}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box className="flex" sx={{ flexDirection: "column" }}>
                <CircularProgress sx={{ color: "#fff" }} />
                <Box sx={{ py: 3 }}>
                  <CaptionHeading heading="Please wait for a while ..." />
                </Box>
              </Box>
            </>
          )}
        </Layout>
      </Container>
    </SingleMintStep2Styled>
  );
};

export default SingleMintStep2;

const SingleMintStep2Styled = styled.section`
  .slider {
    -webkit-appearance: none;
    width: 300px;
    height: 1px;
    border-radius: 5px;
    background: white;
    outline: none;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 20px;
    border: 0;
    background: url("/images/slide_icon.png");
    cursor: pointer;
  }
  .progress-bar {
    position: relative;
    left: 25px;
    height: 4px;
    top: 16px;
    background: #45e6bd;
    border-radius: 15px;
  }
  .range-value {
    span {
      color: white;
      font-size: 12px;
      margin-bottom: 9px;
      display: inline-block;
    }
  }
  .range-wrap {
    margin-bottom: 10px;
  }
`;
