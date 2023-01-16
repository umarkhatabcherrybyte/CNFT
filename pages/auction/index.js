import React, { useState } from "react";
import styled from "styled-components";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import ContainerLayout from "../../components/shared/ContainerLayout";
import Filter from "../../components/shared/Filter";
import { Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AuctionTokens from "../../components/Auction/AuctionTokens";
const Auction = () => {
  const [tabValue, setTabValue] = useState("items");

  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <AuctionStyled>
      <Box>
        <img
          src="/images/balloon-right-1.png"
          alt="no img"
          className="auction_ballon"
        />
      </Box>
      <ContainerLayout>
        <BreadCrumHeader heading="Live Auction" />
        <TabContext value={tabValue}>
          <Box sx={{ pb: 4, pt: 10 }}>
            <Grid container spacing={2} alignItems="center ">
              <Grid item xs={12} md={4}>
                <TabList
                  onChange={onTabChange}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTabs-indicator": {
                      background: "none",
                    },
                    "& 	.Mui-selected": {
                      color: "var(--secondary-color) !important",
                      fontWeight: "bold",
                    },
                    "& 	.MuiTabs-flexContainer": {
                      flexWrap: "wrap",
                    },
                    "& .tab_btn": {
                      color: "#ffff",
                      minHeight: "40px",
                      marginRight: "50px",
                      border: "none !important",
                      fontSize: "12px",
                      // alignItems: "start",
                      padding: 0,
                    },
                  }}
                >
                  <Tab
                    label="Items"
                    value="items"
                    className="tab_btn initialcase poppin"
                  />
                  <Tab
                    label="Collections "
                    value="collections"
                    className="tab_btn initialcase poppin"
                  />
                  <Tab
                    label="Trending"
                    value="trending"
                    className="tab_btn initialcase poppin"
                  />
                </TabList>
              </Grid>
              <Grid item xs={12} md={8}>
                <Filter />
              </Grid>
            </Grid>
          </Box>
          <TabPanel value="items">
            <AuctionTokens />
          </TabPanel>
          <TabPanel value="collections">
            <AuctionTokens />
          </TabPanel>
          <TabPanel value="trending">
            <AuctionTokens />
          </TabPanel>
        </TabContext>
      </ContainerLayout>
    </AuctionStyled>
  );
};

export default Auction;

const AuctionStyled = styled.section`
  .auction_ballon {
    position: absolute;
    z-index: -1;
    top: 4%;
    right: -7%;
  }
`;
