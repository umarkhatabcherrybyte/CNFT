import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { useWallet } from "@meshsdk/react";
import { getKeyData } from "../../helper/localStorage";
import { INSTANCE } from "/config/axiosInstance";
import ClaimTable from "../../components/Sell/ClaimTable";
const Sell = () => {
  const router = useRouter();
  const { listing, user } = useSelector((store) => store);
  const { connected } = useWallet();
  const { type } = router.query;
  const [tabValue, setTabValue] = useState("list");
  const [activeBids, setActiveBids] = useState([]);
  const [claim, setClaim] = useState([]);
  useEffect(() => {
    const getActiveBid = async () => {
      try {
        const response = await INSTANCE.post("/bid/lister", {
          lister_id: user.user_id,
        });
        const data = response?.data?.data;
        const currentDate = new Date();
        const temp = data.map((obj) => {
          const targetDate = new Date(obj?.list_id?.sell_type_id?.end_time);
          const differenceInMilliseconds =
            targetDate.getTime() - currentDate.getTime();
          // Check if the target date is in the past
          if (differenceInMilliseconds > 0) {
            // Convert milliseconds to days, hours, and minutes
            const days = Math.floor(
              differenceInMilliseconds / (1000 * 60 * 60 * 24)
            );
            const hours = Math.floor(
              (differenceInMilliseconds % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
            );

            return {
              ...obj,
              days_remaining: days,
              hours_remaining: hours,
              minutes_remaining: minutes,
            };
          }
        });

        setActiveBids([...temp]);
      } catch (e) {
        setActiveBids([]);
        console.log(e);
      }
    };
    const getClaim = async () => {
      try {
        const response = await INSTANCE.post("/bid/all", {
          user_id: user.user_id,
        });
        setClaim(response?.data?.data);
      } catch (e) {
        setClaim([]);
        console.log(e);
      }
    };

    if (connected && user.user_id) {
      getActiveBid();
      getClaim();
    }
  }, [connected, user.user_id]);
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === "design") {
      navigate("/design");
    }
  };

  return (
    <SellStyled>
      <ContainerLayout>
        <Ballon />
        <Strips />
        {/* <BreadCrumHeader heading="Sell your token" /> */}

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
              <Tab
                label="Claim "
                value="claim"
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
                  {listing.step === "step1" && <MylistTabs />}
                  {listing.step === "step1" && <SellMethod />}
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
                <SellTable activeBids={activeBids} />
              </Box>
            </TabPanel>
            <TabPanel value="claim" sx={{ p: 0 }}>
              <Box
                sx={{
                  py: 5,
                  "& svg": {
                    width: "100%",
                  },
                }}
              >
                <ClaimTable claim={claim} />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </ContainerLayout>
    </SellStyled>
  );
};

export default Sell;

const SellStyled = styled.section``;
