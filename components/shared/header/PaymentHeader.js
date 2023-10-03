import React from "react";
import { Box, Button, Typography } from "@mui/material";
const PaymentHeader = ({ heading, show }) => {
  return (
    <>
      <Box
        sx={{
          background: "var(--secondary-color)",
          py: 2,
          px: 2,
          borderRadius: " 15px 15px 0 0",
          flexWrap: "wrap",
        }}
        className="space_between"
      >
        <Typography variant="h6" className="bold" sx={{ mr: 2 }}>
          {heading}
        </Typography>
        {show && (
          <Button
            className="btn2"
            sx={{ background: "transparent", border: "1px solid #000" }}
          >
            Connect Wallet
          </Button>
        )}
      </Box>
    </>
  );
};

export default PaymentHeader;
