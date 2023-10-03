import Head from "next/head";
import React from "react";
import MainHeader from "../components/Home/MainHeaderr";
import styled from "styled-components";
import { Box, Container } from "@mui/material";
import Royality from "../components/Home/Royality";
import FeatureToken from "/components/Home/FeatureToken";

const Layout = ({ children }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Container>{children}</Container>
    </Box>
  );
};
const Home = () => {
  return (
    <>
      <Head>
        <title>CNFT</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
        <link
          rel="icon"
          href="https://mesh.martify.io/favicon/favicon-32x32.png"
        />
        <link
          href="https://mesh.martify.io/css/template.css"
          rel="stylesheet"
          key="mesh-demo"
        />
      </Head>
      <HomeStyled>
        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          <img src="/images/steam.png" alt="" className="thunder" />
        </Box>
        <Layout>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <img
              src="/images/balloon-left-1.png"
              alt="no img"
              className="left_ballon"
            />
            <img
              src="/images/balloon-right-1.png"
              alt="no img"
              className="right_ballon"
            />
            <img
              src="/images/price_pane_stripe.png"
              alt="no img"
              className="stripe_up"
            />
            <img
              src="/images/price_pane_stripe.png"
              alt="no img"
              className="stripe_down"
            />
          </Box>
          <MainHeader />
        </Layout>
        <Layout>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <img
              src="/images/token_gallery_background.png"
              alt="no img"
              className="rounded_bg"
            />
            <img
              src="/images/balloon-right-1.png"
              alt="no img"
              className="royality_baloon"
            />
          </Box>
          <Royality />
        </Layout>
        <Container>
          <FeatureToken />
        </Container>
      </HomeStyled>
    </>
  );
};

export default Home;

const HomeStyled = styled.section`
  .thunder {
    position: absolute;
    z-index: -1;
    top: -6%;
    right: 48%;
    transform: translate(50%, 0px);
    width: 408px;
  }
  .left_ballon {
    position: absolute;
    z-index: -1;
    top: 72%;
    left: 0%;
  }
  .right_ballon {
    position: absolute;
    z-index: -1;
    top: 20%;
    right: -2%;
  }
  .stripe_up {
    position: absolute;
    z-index: -1;
    top: 10%;
    right: 35%;
  }
  .stripe_down {
    position: absolute;
    z-index: -1;
    top: 68%;
    right: 28%;
  }
  .rounded_bg {
    position: absolute;
    z-index: -1;
    top: 35%;
    left: 0%;
    opacity: 0.4;
  }
  .royality_baloon {
    position: absolute;
    z-index: -1;
    top: 23%;
    right: -2%;
  }
`;
