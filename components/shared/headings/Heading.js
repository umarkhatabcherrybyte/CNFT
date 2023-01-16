import React from "react";
import { Typography } from "@mui/material";
const Heading = ({ heading }) => {
  return (
    <>
      <Typography variant="h6" className="text_white bold" component="div">
        {heading}
      </Typography>
    </>
  );
};

export default Heading;
