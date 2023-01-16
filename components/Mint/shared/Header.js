import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const Header = ({ heading, desc }) => {
  return (
    <>
      <Box sx={{ py: 4 }} className="text_white">
        <Typography variant="h5" className="bold montserrat">
          {heading}
        </Typography>
        <Typography
          variant="body"
          sx={{ py: 1, fontSize: "14px" }}
          component="div"
          className="montserrat"
        >
          {desc}
        </Typography>
      </Box>
    </>
  );
};

export default Header;
