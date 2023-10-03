import React from "react";
import { Box } from "@mui/material";
const Layout = ({ children }) => {
  return (
    <Box
      className="text_white"
      sx={{
        background: "var(--dark-box-color)",
        borderRadius: "1.5rem",
        py: 10,
        px: 5,
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
