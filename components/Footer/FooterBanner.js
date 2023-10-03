import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const FooterBanner = () => {
  const router = useRouter();
  return (
    <>
      <FooterBannerStyled>
        <Box>
          <img
            src="/images/balloon-left-1.png"
            className="left_ballon_footer"
            alt="no img"
          />
          <img
            src="/images/balloon-right-1.png"
            className="right_ballon_footer"
            alt="no img"
          />
        </Box>
        <Box sx={{ py: { md: 5, xs: 2 } }}>
          <Box className="wrapper" sx={{ py: { md: 15, xs: 2 } }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item md={6} xs={12}>
                <Box>
                  <Typography
                    variant="h3"
                    className="text_white poppin"
                    sx={{ fontSize: { xs: "2rem", md: "3rem", my: 1 } }}
                    // sx={{ fontSize: "2rem", md: {"3rem"} }}
                  >
                    CREATE, BUY, OR SELL NFTS ON CNFT GENIE
                  </Typography>
                  <Box sx={{ py: 2 }}>
                    <Button
                      onClick={() => router.push("/buy")}
                      // onClick={() => window.open("/#", "_self")}
                      className="btn2"
                      sx={{ mr: 2, my: 1, whiteSpace: "nowrap" }}
                    >
                      Browse
                    </Button>
                    <Button
                      onClick={() => router.push("/mint")}
                      className="btn"
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                md={12}
                lg={6}
                sx={{
                  "& img": {
                    maxWidth: "400px",
                    margin: "auto",
                    display: "flex",
                  },
                }}
              >
                <img src="/images/ada.png" alt="no img" className="w_100" />
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Main footer  */}
      </FooterBannerStyled>
    </>
  );
};

export default FooterBanner;

const FooterBannerStyled = styled.section`
  .left_ballon_footer {
    position: absolute;
    z-index: -1;
    top: 62%;
    left: 0%;
  }
  .right_ballon_footer {
    position: absolute;
    z-index: -1;
    top: 67%;
    right: -2%;
  }
  .wrapper {
    background-color: #14205a;
    border: 2px solid #5cd1a9;
    border-radius: 50px;
    padding-left: 15%;
    padding-right: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
`;
