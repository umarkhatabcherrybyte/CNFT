import React, { useState } from "react";
import styled from "styled-components";
import { Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Strips from "../../components/Design/Strips";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import ContainerLayout from "../../components/shared/ContainerLayout";
import Filter from "../../components/shared/Filter";
import BuyCards from "../../components/Buy/BuyCards";
import { useRouter } from "next/router";

const Buy = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState("items");

  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
    // if (newValue === "collections") {
    //   router.push(MycollectionRoute);
    // }
  };
  return (
    <BuyStyled>
      <Box>
        <img
          src="/images/balloon-right-1.png"
          alt="no img"
          className="buy_ballon"
        />
      </Box>
      <Strips />
      <ContainerLayout>
        <BreadCrumHeader heading=" Buy our tokens" />
        {/* Tabs and filter  */}
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
                    className="tab_btn initialcase"
                  />
                  <Tab
                    label="Collections "
                    value="collections"
                    className="tab_btn initialcase"
                  />
                  <Tab
                    label="Trending"
                    value="trending"
                    className="tab_btn initialcase"
                  />
                </TabList>
              </Grid>
              <Grid item xs={12} md={8}>
                <Filter />
              </Grid>
            </Grid>
          </Box>
          <TabPanel value="items">
            <BuyCards tabValue={tabValue} />
          </TabPanel>
          <TabPanel value="collections">
            <BuyCards tabValue={tabValue} />
          </TabPanel>
          <TabPanel value="trending">
            <BuyCards tabValue={tabValue} />
          </TabPanel>
        </TabContext>
      </ContainerLayout>
    </BuyStyled>
  );
};

export default Buy;

const BuyStyled = styled.section`
  .buy_ballon {
    position: absolute;
    z-index: -1;
    top: 7%;
    right: -2%;
  }
`;
