import React from "react";
import { Typography } from "@mui/material";
const CaptionHeading = ({ heading, font }) => {
  return (
    <>
      <Typography
        variant="caption"
        component="div"
        className={`bold text_white  ${font ? font : "proxima"}`}
      >
        {heading}
      </Typography>
    </>
  );
};

export default CaptionHeading;
