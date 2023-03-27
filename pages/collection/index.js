import React, { useState } from "react";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import styled from "styled-components";
import Strips from "../../components/Design/Strips";
import Ballon from "../../components/Design/Ballon";
import ContainerLayout from "../../components/shared/ContainerLayout";
import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Filter from "../../components/shared/Filter";
import ClientCard from "../../components/Cards/ClientCard";
const cardData = [{}, {}, {}, {}, {}, {}, {}, {}];

const Collection = () => {
  const [tabValue, setTabValue] = useState("items");

  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <CollectionStyled>
        <Ballon />
        <Strips />
        <ContainerLayout>
          <BreadCrumHeader heading="Our Collection" />
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
                    <Tab label="Items" value="items" className="tab_btn" />
                    <Tab
                      label="Collections "
                      value="collections"
                      className="tab_btn"
                    />
                    <Tab
                      label="Trending"
                      value="trending"
                      className="tab_btn"
                    />
                  </TabList>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Filter />
                </Grid>
              </Grid>
            </Box>
            {/* <TabPanel value="items">
              <Grid container spacing={3}>
                {cardData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ClientCard />
                  </Grid>
                ))}
              </Grid>
            </TabPanel> */}
            {/* <TabPanel value="collections">
              <Grid container spacing={3}>
                {cardData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ClientCard />
                  </Grid>
                ))}
              </Grid>
            </TabPanel> */}
            {/* <TabPanel value="trending">
              <Grid container spacing={3}>
                {cardData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ClientCard />
                  </Grid>
                ))}
              </Grid>
            </TabPanel> */}
          </TabContext>
        </ContainerLayout>
      </CollectionStyled>
    </>
  );
};

export default Collection;

const CollectionStyled = styled.section``;
