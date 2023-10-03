import React from "react";
import OptionMenu from "./OptionMenu";
// import heartImg from "/images/heart.png";
import { Box } from "@mui/material";
import { price_range_data, recent_listing } from "../../data/Index";
const Filter = ({ setFilter, filter }) => {
  return (
    <Box
      className="space_between w_100"
      sx={{
        "& .w_100": {
          margin: "10px",
        },
        flexWrap: { md: "nowrap", xs: "wrap" },
      }}
    >
      {/* <Box className="w_100">
      <OptionMenu
        placeholder="Projects"
        setFilter={setFilter}
        name="project"
      />
    </Box> */}
      {/* <Box className="w_100">
      <OptionMenu placeholder="Type" setFilter={setFilter} name="type" />
    </Box> */}
      <Box className="w_100">
        <OptionMenu
          placeholder="Price Range"
          setFilter={setFilter}
          name="price_range"
          data={price_range_data}
          filter={filter}
        />
      </Box>
      <Box className="w_100">
        <OptionMenu
          placeholder="Recent Listing"
          setFilter={setFilter}
          name="sort"
          data={recent_listing}
          filter={filter}
        />
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
  );
};

export default Filter;
