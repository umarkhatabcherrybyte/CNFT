import React, { useEffect } from "react";
// import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
// import { MeshProvider } from "@martifylabs/mesh-react";
import GlobalStyle from "../assets/css/GlobalStyle";
import Head from "next/head";
import Footer from "../components/Footer/Footer";
import FooterBanner from "../components/Footer/FooterBanner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import { store, wrapper } from "/store/Store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import { MeshProvider } from "@meshsdk/react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  //   useEffect(()=>{
  //     router.push(window.location.href)
  // },[])
  return (
    <MeshProvider>
      <ToastContainer />
      <Head>
        <title>CNFT</title>
      </Head>
      <Provider store={store}>
        <Wrapper>
          <Navbar />
          <GlobalStyle />
          <div className="main_background"> </div>
          <Component {...pageProps} />
          <Container maxWidth="xl">
            <FooterBanner />
            <Footer />
          </Container>
        </Wrapper>
      </Provider>
    </MeshProvider>
  );
}
export default wrapper.withRedux(MyApp);

const Wrapper = styled.section`
  position: relative;
`;
