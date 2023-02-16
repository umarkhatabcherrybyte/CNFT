import React, { useState } from "react";
import styled from "styled-components";
import ContainerLayout from "../../components/shared/ContainerLayout";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import SellTable from "../../components/Sell/SellTable";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import MylistTabs from "../../components/Sell/MylistTabs";
import SellMethod from "../../components/Sell/SaleMethod";
import MyListCard from "../../components/Sell/MyListCard";
import Ballon from "../../components/Design/Ballon";
import Strips from "../../components/Design/Strips";
import { useRouter } from "next/router";
const Sell = () => {
  const router = useRouter();
  const { type } = router.query;
  const [tabValue, setTabValue] = useState("list");
  const [listTabValue, setListTabValue] = useState("add");
  const [listingSteps, setListingSteps] = useState("step1");
  const onListTabChange = (event, newValue) => {
    setListTabValue(newValue);
  };
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === "design") {
      navigate("/design");
    }
  };
  const validationSchema = yup.object({
    platform_url: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .required("Please enter website"),
    platform_name: yup.string("").required("Game Name is required"),
  });

  return (
    <SellStyled>
      <ContainerLayout>
        <Ballon />
        <Strips />
        <BreadCrumHeader heading="Sell your token" />

        <Box sx={{ py: 5 }}>
          <TabContext value={tabValue}>
            <TabList
              onChange={onTabChange}
              aria-label="lab API tabs example"
              sx={{
                "& .MuiTabs-flexContainer": {
                  alignItems: "center",
                },
                "& .MuiTabs-indicator": {
                  background: {
                    md: "var(--secondary-color)",
                    xs: "transparent",
                  },
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
                label="My listings"
                value="list"
                className="tab_btn initialcase poppin"
              />
              <Tab
                label="Active Bids "
                value="active"
                className="tab_btn initialcase poppin"
              />
              <img
                src="/images/heart.png"
                className="w_100"
                alt=""
                style={{ maxWidth: "22px", height: "22px" }}
              />
            </TabList>
            <TabPanel value="list" sx={{ p: 0, py: 2 }}>
              {type === "add-listing" ? (
                <>
                  {listingSteps === "step2" && (
                    <MylistTabs setListingSteps={setListingSteps} />
                  )}
                  {listingSteps === "step1" && (
                    <SellMethod setListingSteps={setListingSteps} />
                  )}
                </>
              ) : (
                <MyListCard />
              )}
            </TabPanel>
            <TabPanel value="active" sx={{ p: 0 }}>
              <Box
                sx={{
                  py: 5,
                  "& svg": {
                    width: "100%",
                  },
                }}
              >
                {/* <Nobid /> */}
                <SellTable />
              </Box>
            </TabPanel>
            <TabPanel value="wallet" sx={{ p: 0 }}>
              <MyListCard />
            </TabPanel>
            <TabPanel value="design" sx={{ p: 0 }}></TabPanel>
          </TabContext>
        </Box>
      </ContainerLayout>
    </SellStyled>
  );
};

export default Sell;

const SellStyled = styled.section``;
