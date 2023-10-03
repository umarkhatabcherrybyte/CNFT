import React from "react";
import Header from "/components/Mint/shared/Header";
import Layout from "/components/Mint/Layout";
import ContainerLayout from "/components/shared/ContainerLayout";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";
import { mintCollectionStep3 } from "/components/Routes/constants";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Toast } from "../../../components/shared/Toast";

const CollectionStep2 = () => {
  const router = useRouter();
  const [rangeValue, setRangeValue] = React.useState(10);
  const [metadata, setMetadata] = React.useState({
    item_name: "",
    item_description: "",
    item_creator: "",
    item_link: "",
  });
  var params = {};

  const onInputChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  const onInputRangeChange = (e) => {
    params = { ...params, [e.target.name]: e.target.value };
    setRangeValue(e.target.value);
  };

  const onNextButton = () => {
    console.log(params, 'lolxxx')
    if (metadata?.item_name == undefined || metadata?.item_name == null) {
      Toast('error', 'Name Field is Missing')
      return
    }
    window.localStorage.setItem("params", JSON.stringify(params));
    router.push(mintCollectionStep3);
  };

  return (
    <Step2Styled>
      <ContainerLayout>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Header
              heading="Add additional metadata"
              desc="Royalty fees may be set up to 15%; However, the lower your royalty fee, the better chance that your NFT(s) will sell, Royalty fees in excess of 10% are not recommended."
            />
          </Grid>
        </Grid>
        <Layout>
          <TextField
            placeholder="Name your item"
            name="item_name"
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
            name="item_description"
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
            name="item_creator"
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
            name="item_link"
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
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <Button className="btn" onClick={onNextButton}>
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Layout>
      </ContainerLayout>
    </Step2Styled>
  );
};

export default CollectionStep2;

const Step2Styled = styled.section`
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
