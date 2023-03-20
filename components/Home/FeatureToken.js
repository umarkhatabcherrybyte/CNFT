import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Typography, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { fetchNftsBreakdown } from "/redux/actions/thunks/nfts";
import { useDispatch } from "react-redux";
import FeatureTokenSlider from "./FeatureTokenSlider";
import { INSTANCE } from "/config/axiosInstance";
const FeatureToken = () => {
  const dispatch = useDispatch();
  const [featureTokens, setFeatureTokens] = useState([]);
  useEffect(() => {
    // dispatch(fetchNftsBreakdown());
    getFeaturedToken();
  }, [dispatch]);

  const getFeaturedToken = async () => {
    try {
      const res = await INSTANCE.get("/list/featured/tokens");
      if (res) {
        setFeatureTokens(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <FeatureTokenStyed>
      <Box sx={{ py: { xs: 2, md: 18 } }}>
        <Box>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  className="text_white poppin"
                  sx={{ my: 2 }}
                >
                  FEATURED TOKENS
                </Typography>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTabs-indicator": {
                      background: "none",
                    },
                    "& 	.Mui-selected": {
                      background: "var(--secondary-color) !important",
                      fontWeight: "bold",
                      color: "#000 !important",
                    },
                    // "& 	.MuiTabs-flexContainer": {
                    //   flexWrap: "wrap",
                    // },
                    "& .btn": {
                      minHeight: "40px",
                      margin: " 5px 10px",
                    },
                  }}
                >
                  <Tab label="All Art" value="1" className="btn proxima" />
                  <Tab label="Photo " value="2" className="btn proxima" />
                  <Tab label="Music" value="3" className="btn proxima" />
                  <Tab label="Video" value="4" className="btn proxima" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: 0 }}>
                <FeatureTokenSlider nfts={featureTokens.all} />
              </TabPanel>
              <TabPanel value="2" sx={{ p: 0 }}>
                <FeatureTokenSlider nfts={featureTokens.images} />
              </TabPanel>
              <TabPanel value="3" sx={{ p: 0 }}>
                <FeatureTokenSlider nfts={featureTokens.audios} />
              </TabPanel>
              <TabPanel value="4" sx={{ p: 0 }}>
                <FeatureTokenSlider nfts={featureTokens.videos} />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </FeatureTokenStyed>
  );
};

export default FeatureToken;

const FeatureTokenStyed = styled.section`
  @media (max-width: 990px) {
    .btn {
      padding: 0 !important;
      min-width: 65px !important;
      font-size: 12px !important;
    }
  }
`;
