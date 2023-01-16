import React from "react";
import { Typography } from "@mui/material";
const LightText = ({ heading }) => {
  return (
    <>
      <Typography
        variant="caption"
        className="light_text"
        component="div"
        sx={{ py: 0.5 }}
      >
        {heading}
      </Typography>
    </>
  );
};

export default LightText;
