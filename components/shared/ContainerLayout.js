import React from "react";
import { Box, Container } from "@mui/material";
const ContainerLayout = ({ children }) => {
  return (
    <>
      <Box sx={{ pt: { md: 15, xs: 20 } }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </>
  );
};

export default ContainerLayout;
