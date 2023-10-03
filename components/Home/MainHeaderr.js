import React from "react";
import styled from "styled-components";
import {
  Box,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GetAdaPriceService from "../../services/get-ada-price.service";
import { Straight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import useFetchData from "/hooks/adaInfo";
const MainHeaderr = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const adaInfo = useFetchData(GetAdaPriceService.getPrice, 30000);
  // console.log(router.isReady);
  // if (!router.isReady) {
  //   // return;
  // }
  return (
    <>
      <MainHeaderStyled>
        <Box className="main_wrapper">
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <Box sx={{ my: 1 }}>
                {/* <Typography
                  variant="body"
                  className="text_white proxima"
                  sx={{
                    backgroundColor: "rgb(44, 95, 128)",
                    padding: "3px 10px",
                  }}
                >
                  CNFT GENIE
                </Typography> */}
              </Box>
              <Typography
                variant="h2"
                className="text_white poppin"
                sx={{ typography: { sm: "h2", xs: "h4" }, my: 1 }}
              >
                NFT
              </Typography>
              <Typography
                variant="h2"
                className="text_white poppin"
                sx={{ typography: { sm: "h2", xs: "h4" }, my: 1 }}
              >
                MARKETPLACE
              </Typography>
              <Typography
                variant="body"
                className="text_white proxima initialcase"
                sx={{ my: 1 }}
              >
                The Cardano Non-Fungible Token exchange with Smart Contracts and
                Minting.
              </Typography>
              <Box sx={{ my: 2 }}>
                <Button
                  variant="contained"
                  className="btn2 initialcase"
                  sx={{ mr: 2 }}
                  onClick={() => router.push("/buy")}
                >
                  Browse
                </Button>
                <Button
                  variant="contained"
                  className="btn initialcase"
                  onClick={() => router.push("/mint")}
                >
                  Create
                </Button>
              </Box>
            </Grid>
            <Grid md={4} xs={12} item>
              <Box sx={{ position: "relative" }}>
                <Box>
                  <img
                    src={
                      !isMatch
                        ? "/images/price_pane_background-01.png"
                        : "/images/panel_2.png"
                    }
                    className="w_100"
                    alt=""
                    style={{ maxWidth: `${isMatch ? "278px" : "350px"}` }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: "3.5rem", md: "3rem" },
                    left: { xs: "2.3rem", md: "8.3rem" },
                    width: "11.3rem",
                  }}
                >
                  <Box className="space_between">
                    <Typography variant="h6" className="text_white oswald bold">
                      CARDANO
                    </Typography>
                    <Typography
                      variant="body"
                      className="text_white oswald bold br_15"
                      sx={{ background: "#FFFFFF33", padding: "3px 15px" }}
                    >
                      ADA
                    </Typography>
                  </Box>

                  <Box sx={{ marginTop: "5px" }}>
                    <Typography variant="body" className="text_white">
                      Price
                    </Typography>
                    <Typography variant="h6" className="text_white oswald bold">
                      ${adaInfo?.current_price}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: { xs: "27px", md: "36px" } }}>
                    <Typography
                      variant="body"
                      className="text_white oswald bold"
                    >
                      24 HR % CHANGE
                    </Typography>
                    <Typography variant="h6" className="text_white oswald bold">
                      {adaInfo?.price_change_percentage_24h}%
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: { xs: "21px", md: "47px" } }}>
                    <Typography variant="body" className="text_white">
                      MARKET CAPITAL
                    </Typography>
                    <Typography variant="h6" className="text_white oswald bold">
                      $
                      {Number.parseFloat(
                        adaInfo?.market_cap / 1000000000
                      ).toFixed(2)}
                      B
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-56px",
                      left: { xs: "5.1rem", md: "4.1rem" },
                      background:
                        "linear-gradient(118deg, #4DB593 0%, #275F9B 53%, #27379F 100%)",
                      borderRadius: "50%",
                      height: "34px",
                      width: "34px",
                      border: "1px solid #fff",
                      transform: "rotate(180deg)",
                    }}
                    className="flex"
                  >
                    <Straight />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainHeaderStyled>
    </>
  );
};

export default MainHeaderr;

const MainHeaderStyled = styled.section`
  .main_wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-bottom: 5rem;
  }
`;
