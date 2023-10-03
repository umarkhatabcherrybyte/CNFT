import React from "react";
import { Box } from "@mui/material";
const SearchBar = () => {
  return (
    <>
      <Box className="search" sx={{ width: { md: "auto", xs: "100%" } }}>
        <input
          id="quick_search"
          className="xs-hide font-proximanova-semibold search_bar"
          name="quick_search"
          placeholder="Search..."
          type="text"
        />
      </Box>
    </>
  );
};

export default SearchBar;
