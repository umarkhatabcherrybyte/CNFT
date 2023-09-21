import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Strips from "../../components/Design/Strips";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import ContainerLayout from "../../components/shared/ContainerLayout";
import Filter from "../../components/shared/Filter";
import BuyCards from "../../components/Buy/BuyCards";
import { useRouter } from "next/router";
import FullScreenLoader from "../../components/shared/FullScreenLoader";
import { INSTANCE } from "../../config/axiosInstance";
import NftCard from "../../components/shared/NftCard";

const Buy = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState("single");
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState({
    price_range: {
      min: "0",
      max: "99999999999999999999999999999",
    },
    sort: "",
    type: "",
  });
  const [buy, setBuy] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const res = await INSTANCE.post("/list/find/single/fixed", {
          mint_type: tabValue,
          ...filter,
        });
        // console.log("filter");

        setBuy([...res?.data?.data]);
        setIsLoading(false);
      } catch (e) {
        setBuy([]);
        setIsLoading(false);

        // console.log("filter error");
      }
    };
    getData();
  }, [tabValue, filter]);
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
    // if (newValue === "collections") {
    //   router.push(MycollectionRoute);
    // }
  };
  return (
    <BuyStyled>
      {isLoading && <FullScreenLoader />}

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
                      flexWrap: { xs: "wrap", lg: "nowrap" },
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
                    value="single"
                    className="tab_btn initialcase"
                  />
                  <Tab
                    label="Collections "
                    value="collection"
                    className="tab_btn initialcase"
                  />
                  {/* <Tab
                    label="Trending"
                    value="trending"
                    className="tab_btn initialcase"
                  /> */}
                </TabList>
              </Grid>
              <Grid item xs={12} md={8}>
                <Filter setFilter={setFilter} filter={filter} />
              </Grid>
            </Grid>
          </Box>
          <TabPanel value="single">
            <BuyCards tabValue={tabValue} buy={buy} />
          </TabPanel>
          <TabPanel value="collection">
            <BuyCards tabValue={tabValue} buy={buy} />
          </TabPanel>
          {/* <TabPanel value="trending">
            <BuyCards tabValue={tabValue} />
          </TabPanel> */}
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
