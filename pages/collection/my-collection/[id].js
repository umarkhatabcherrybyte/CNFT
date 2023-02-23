import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import MainCard from "/components/Collection/My Collection/MainCard";
import CaptionHeading from "/components/shared/headings/CaptionHeading";
import Heading from "/components/shared/headings/Heading";
import { INSTANCE } from "/config/axiosInstance";
import { useRouter } from "next/router";
import FullScreenLoader from "/components/shared/FullScreenLoader";
const MyCollection = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await INSTANCE.get(`/list/get/single/${id}`);
        setDetail(res?.data?.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setDetail([]);
        console.log(e);
      }
    };
    if (id) {
      getData();
    }
  }, [id]);
  return (
    <>
      {isLoading && <FullScreenLoader />}

      <Box sx={{ pt: { md: 15, xs: 20 } }}>
        <img
          src="/images/collections/collection_detail_bg.png"
          alt=""
          className="w_100"
        />
        <Box
          className="flex_align text_center"
          position="relative"
          sx={{
            flexDirection: "column",
            "& img": {
              borderRadius: "50%",
              border: "3px solid var(--secondary-color)",
              position: "absolute",
              top: "-39px",
            },
          }}
        >
          <img src="/images/Buy Our Tokens/cli.png" alt="" />
          <Box sx={{ py: 5 }}>
            {/* <CaptionHeading heading="Created by@Julian" /> */}
            <Heading heading="INDUSTRIAL REVOLUTION" />
            <Box
              className="flex"
              sx={{
                "& .fw": {
                  fontSize: "10px",
                  marginLeft: "5px",
                  color: "#fff",
                },
              }}
            >
              <Box className="flex_align">
                <Heading heading="992" />
                <Typography
                  className="fw"
                  sx={{ color: "var(--secondary-color)" }}
                >
                  items
                </Typography>
              </Box>
              <Box className="flex_align" sx={{ pl: 2 }}>
                <Typography
                  variant="h6"
                  className=" bold"
                  component="div"
                  sx={{ color: "var(--secondary-color)" }}
                >
                  1500
                </Typography>
                <Typography
                  className="fw"
                  sx={{ color: "var(--secondary-color) !important" }}
                >
                  ADA
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ pt: { md: 2, xs: 3 }, minHeight: "5rem" }}>
        {!isLoading && Object.keys(detail).length > 0 && (
          <Container maxWidth="xl">
            <MainCard data={detail?.list?.collection_id?.assets} />
          </Container>
        )}
      </Box>
    </>
  );
};

export default MyCollection;
