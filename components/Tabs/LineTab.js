import React from "react";
import { Tab } from "@mui/material";
import { TabList } from "@mui/lab";
const LineTab = ({ setTabValue, tabData }) => {
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <TabList
        onChange={onTabChange}
        aria-label="lab API tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            background: { md: "var(--secondary-color)", xs: "transparent" },
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
        {tabData.map((data) => (
          <Tab label={data.label} value={data.value} className="tab_btn" />
        ))}
      </TabList>
    </>
  );
};

export default LineTab;
