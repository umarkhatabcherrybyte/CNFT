import React from "react";
import OptionMenu from "./OptionMenu";
// import heartImg from "/images/heart.png";
import { Box } from "@mui/material";
const Filter = () => {
  return (
    <>
      <>
        <Box
          className="space_between w_100"
          sx={{
            "& .w_100": {
              margin: "10px",
            },
            flexWrap: { md: "nowrap", xs: "wrap" },
          }}
        >
          <Box className="w_100">
            <OptionMenu placeholder="Projects" />
          </Box>
          <Box className="w_100">
            <OptionMenu placeholder="Type" />
          </Box>
          <Box className="w_100">
            <OptionMenu placeholder="Price Range" />
          </Box>
          <Box className="w_100">
            <OptionMenu placeholder="Recent Listing" />
          </Box>
          <Box className="w_100" sx={{ width: "18% !important" }}>
            <img
              src="/images/heart.png"
              alt=""
              className="w_100"
              style={{ maxWidth: "22px" }}
            />
          </Box>
        </Box>
      </>
    </>
  );
};

export default Filter;
