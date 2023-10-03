import React from "react";
import { Box, Typography } from "@mui/material";
const Heading = () => {
  return (
    <>
      <Box sx={{ pt: 15, pb: 3 }} className="text_white">
        <Typography variant="h4" className="bold">
          Upload file for minting
        </Typography>
        <Typography
          variant="body"
          sx={{ py: 1, fontSize: "18px" }}
          component="div"
        >
          The minting process on CNFT GENIE is simple and the NFT (s) may be
          sold on the marketplace using smart contracts, making the money
          exchange for NFT(s) occur automatically and simultaneously.
        </Typography>
      </Box>
    </>
  );
};

export default Heading;
