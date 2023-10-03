import React from "react";
import { Box, Divider, Typography, Breadcrumbs, Link } from "@mui/material";
import { useRouter } from "next/router";
const BreadCrumHeader = ({ heading }) => {
  const router = useRouter();
  function onLinkClick(event) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <>
      <Box>
        <Divider sx={{ borderColor: "#ffffff80" }} />
        <Box
          className="space_between"
          sx={{
            py: 2,
            alignItems: "baseline !important",
            flexWrap: { md: "nowrap", xs: "wrap" },
          }}
        >
          <Typography
            variant="h6"
            className="text_white oswald"
            sx={{ my: 2, mr: 2 }}
          >
            {heading}
          </Typography>
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            sx={{
              "& .MuiBreadcrumbs-separator": {
                color: "#fff",
                px: 2,
              },
            }}
          >
            <Link
              underline="hover"
              color="#8CA3CF"
              href="/"
              onClick={onLinkClick}
              className="oswald"
            >
              Home
            </Link>
            <Typography color="#fff" className="bold oswald" component="div">
              {heading}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Divider sx={{ borderColor: "#ffffff80" }} />
      </Box>
    </>
  );
};

export default BreadCrumHeader;
