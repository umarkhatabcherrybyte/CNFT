import React from "react";
import styled from "styled-components";
import { Box, Container, Typography, Grid } from "@mui/material";
import Heading from "/components/Mint/Heading";
import Ballon from "/components/Design/Ballon";
import {
  mintCollectionStep1,
  mintSingleStep1,
} from "/components/Routes/constants";
import { useRouter } from "next/router";
const Mint = () => {
  const router = useRouter();
  return (
    <MintStyled>
      <Ballon />
      <Container>
        <Heading />
        <Box
          className="text_white"
          sx={{
            background: "rgba(0,0,0,.4)",
            borderRadius: "1.5rem",
            p: 5,
            mb: 8,
          }}
        >
          <Typography variant="h4" className="bold text_center" sx={{ py: 7 }}>
            What would you like to mint?
          </Typography>
          <Grid container spacing={{ md: 2, xs: 3 }}>
            <Grid
              item
              md={4}
              xs={12}
              onClick={() => {
                router.push(mintSingleStep1);
              }}
            >
              <Box className="upload_panel">
                <Typography variant="h6">Mint a single token</Typography>
                <img src="/images/single_mint.png" alt="mint" />
              </Box>
            </Grid>
            <Grid item md={4} xs={12}></Grid>
            <Grid
              item
              md={4}
              xs={12}
              onClick={() => {
                router.push(mintCollectionStep1);
              }}
            >
              <Box className="upload_panel">
                <Typography variant="h6">Mint a collection</Typography>
                <img src="/images/collection_mint.png" alt="mint" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MintStyled>
  );
};

export default Mint;

const MintStyled = styled.section`
  .upload_panel {
    cursor: pointer;
    padding: 10px;
    border: 2px dashed rgba(255, 255, 255, 0.45);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.3);
    text-align: center;
    height: 100%;
    img {
      width: 100%;
      height: 10rem;
      object-fit: contain;
      margin: 10px 0;
    }
    &:hover {
      transform: translateY(-20px);
      transition: 0.5s;
      box-shadow: 0px 10px 20px 10px rgb(0 0 0 / 30%);
    }
  }
`;
