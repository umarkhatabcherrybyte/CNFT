import React from "react";
import styled from "styled-components";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { termConditionRoute } from "../Routes/constants";
import { useRouter } from "next/router";
const Footer = () => {
  const router = useRouter();
  return (
    <FooterStyled>
      <Box>
        <Box sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item md={4.5} sm={6} xs={12}>
              <Box className="widget text_white proxima">
                CNFTGE`NIE.IO is a Cardano Non-Fungible Token marketplace. We
                are based in Austin,TX, a new silicone valley. While we are not
                the first market place based on the Cardano blockchain, we are
                the best and can officially say that we are the first to offer
                both an exchange and minting on the same platform. Additionally,
                we offer an auction feature as another way to sell your NFTs.{" "}
                <br></br>If you need any help, then please Contact Us, and we
                will be happy to assist` you
              </Box>
            </Grid>
            {/* <Grid item md={2} sm={6} xs={12}>
              <Box className="widget">
                <Typography
                  className="text_white title proxima"
                  variant="body"
                  sx={{ pb: 1 }}
                >
                  My ACCOUNT
                </Typography>
                <ul>
                  <li>
                    <Link to="">Profile</Link>
                  </li>
                  <li>
                    <Link to="">My Favorites </Link>
                  </li>
                  <li>
                    <Link to="">Log in or Sign up </Link>
                  </li>
                  <li>
                    <Link to="">Log Out</Link>
                  </li>
                </ul>
              </Box>
            </Grid> */}
            <Grid item md={2.5} sm={6} xs={12}>
              <Box className="widget">
                <Typography
                  className="text_white title proxima"
                  variant="body"
                  sx={{ pb: 1 }}
                >
                  MARKET PLACE
                </Typography>
                <ul>
                  <li>
                    <Link href="/">All NFTs</Link>
                  </li>
                  <li>
                    <Link href="/">Art</Link>
                  </li>
                  <li>
                    <Link href="/">Photo</Link>
                  </li>
                  <li>
                    <Link href="/">Music</Link>
                  </li>
                  <li>
                    <Link href="/">Video</Link>
                  </li>
                </ul>
              </Box>
            </Grid>
            <Grid item md={2.5} sm={6} xs={12}>
              <Box className="widget">
                <Typography
                  className="text_white title proxima"
                  variant="body"
                  sx={{ pb: 1 }}
                >
                  RESOURCES
                </Typography>
                <ul>
                  <li>
                    <Link href="/help-support">Help and Support</Link>
                  </li>
                  <li>
                    <Link href={termConditionRoute}>Terms and Conditions</Link>
                  </li>
                  {/* <li>
                    <Link href="/auction">Auctions</Link>
                  </li> */}
                  {/* <li>
                    <Link to="">Royalty System</Link>
                  </li>
                  <li>
                    <Link to="">How to use Smart Contracts</Link>
                  </li> */}
                </ul>
              </Box>
            </Grid>
            <Grid item md={2.5} sm={6} xs={12}>
              <Box className="widget">
                <Typography
                  className="text_white proxima"
                  variant="body"
                  sx={{ pb: 1 }}
                >
                  MENU
                </Typography>
                <ul>
                  <li>
                    <Link href="/buy">Buy</Link>
                  </li>
                  <li>
                    <Link href="/sell">Sell</Link>
                  </li>
                  <li>
                    <Link href="/auction">Auction</Link>
                  </li>
                  <li>
                    <Link href="/mint">Mint</Link>
                  </li>
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="subfooter">
          <Box
            className="text_center text_white proxima "
            sx={{ py: 4, borderTop: "1px solid #fff" }}
          >
            2023 copyright CNFTGENIE, LLC, all rights reserved.
          </Box>
        </Box>
      </Box>
    </FooterStyled>
  );
};

export default Footer;

const FooterStyled = styled.footer`
  li {
    color: #fff;
    padding: 5px 0;
    font-family: proxima;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #ffff;
    font-family: proxima;
  }
`;
