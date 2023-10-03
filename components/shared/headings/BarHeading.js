import React from "react";
import styled from "styled-components";
import { Box, Typography, Divider } from "@mui/material";
const BarHeading = ({ heading }) => {
  return (
    <BarHeadingStyled>
      <Box sx={{ py: 4, flexWrap: "wrap" }} className="space_between">
        <Typography variant="h6" className="bold text_white oswald ">
          {heading}
        </Typography>
        <Divider sx={{ borderColor: "#fff3", width: "70%" }} />
      </Box>
    </BarHeadingStyled>
  );
};

export default BarHeading;

const BarHeadingStyled = styled.section``;
