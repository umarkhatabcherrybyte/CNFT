import React from "react";
import Heading from "../shared/headings/Heading";
import Layout from "../Mint/Layout";
import { Box } from "@mui/material";
const NoData = () => {
  return (
    <>
      <Layout>
        <Box className="flex_align_center">
          <Heading heading="No Data." />
        </Box>
      </Layout>
    </>
  );
};

export default NoData;
