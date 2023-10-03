import React from "react";
import { Box } from "@mui/material";
const DarkBgLayout = ({ children }) => {
  return (
    <>
      <Box
        className="text_white"
        sx={{
          background: "rgba(0,0,0,.4)",
          borderRadius: "0  0 1.5rem 1.5rem ",
          py: 2,
          px: 5,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DarkBgLayout;
