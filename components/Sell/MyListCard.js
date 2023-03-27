import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import styled from "styled-components";
import CaptionHeading from "../shared/headings/CaptionHeading";
import { useWallet, useLovelace } from "@meshsdk/react";
import Layout from "../Mint/Layout";
import Heading from "../shared/headings/Heading";
const data = [{}, {}, {}, {}, {}, {}, {}, {}];
import { INSTANCE } from "../../config/axiosInstance";
import { getKeyData } from "../../helper/localStorage";
import {
  MycollectionRoute,
  buyDetailRoute,
  auctionDetailRoute,
} from "../Routes/constants";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const MyListCard = () => {
  const router = useRouter();
  const { user_id } = useSelector((store) => store.user);
  console.log(user_id, "userid");
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
  const [listing, setListing] = useState([]);
  // console.log(listing);
  useEffect(() => {
    // const user_id = getKeyData("user_id");
    const getData = async () => {
      try {
        const response = await INSTANCE.post("/list/find/all", {
          user_id,
        });
        setListing(response?.data?.new_data);
      } catch (e) {
        setListing([]);
        console.log(e);
      }
    };

    if (connected && user_id) {
      getData();
    }
  }, [connected, user_id]);

  const navigationHandler = (type, id, model) => {
    // console.log(type);
    const route =
      type === "single"
        ? model === "Auction"
          ? `${auctionDetailRoute}/0/${id}`
          : `${buyDetailRoute}/0/${id}`
        : `${MycollectionRoute}/${model}/${id}`;
    router.push(route);
  };
  return (
    <MyListCardStyled>
      <Box sx={{ py: 5 }}>
        {connected ? (
          listing.length > 0 ? (
            <Grid container spacing={3}>
              {listing.map((card, index) => (
                <Grid xs={12} md={4} lg={3} item key={index}>
                  <Card
                    onClick={(e) =>
                      navigationHandler(
                        card.mint_type,
                        card._id,
                        card?.sell_model
                      )
                    }
                    sx={{
                      boxShadow: "none",
                      height: "100%",
                      background: "var(--main-color)",
                      borderRadius: "20px",
                      border: "solid 1px #ddd",
                      cursor: "pointer",
                      transition: "0.5s",
                      "&:hover": { transform: "translateY(-14px)" },
                      color: "#fff",
                      "& .flex": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="290"
                        image={card?.image}
                        alt="green iguana"
                      />
                      {/* <Box
                        sx={{
                          position: "absolute",
                          height: "4rem",
                          width: "4rem",
                          top: "15px",
                          padding: " 0px 12px",
                        }}
                        className="client_detail"
                      >
                        <Box
                          sx={{
                            background: "var(--secondary-color)",
                            borderRadius: "50%",
                            padding: "7px 0 ",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Settings sx={{ color: "#000000" }} />
                        </Box>
                      </Box> */}
                    </Box>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body"
                        component="div"
                        className="bold"
                        sx={{ textTransform: "uppercase" }}
                      >
                        {card?.name}
                      </Typography>
                      {card?.price > 0 ? (
                        <Box className="space_between">
                          {/* <CaptionHeading heading="julian_jokey" /> */}
                          <Typography
                            gutterBottom
                            variant="body"
                            component="div"
                            sx={{ color: "var(--secondary-color)" }}
                            className="bold flex"
                          >
                            {card?.price}
                            <Typography
                              variant="caption"
                              component="div"
                              sx={{
                                color: "var(--secondary-color)",
                                fontSize: "10px",
                                pl: 1,
                              }}
                              className="bold"
                            >
                              ADA
                            </Typography>
                          </Typography>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </CardContent>
                    {/* {card?.sell_model != "FixedPrice" && (
                      <CardContent
                        sx={{ background: "#12274D", py: "1 !important" }}
                      >
                        <Box className="space_between">
                          <CaptionHeading heading="You have 10 offers" />
                          <Box
                            sx={{ backgroundImage: `url("/images/heart.png")` }}
                            className="bg_heart"
                          ></Box>
                        </Box>
                      </CardContent>
                    )} */}
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              className="flex_align_center"
              sx={{
                position: "relative",
                img: {
                  width: "100%",
                },
              }}
            >
              <img
                src="/images/no_list.png"
                onClick={(e) => {
                  router.push({
                    pathname: "/sell",
                    query: {
                      type: "add-listing",
                    },
                  });
                }}
              />
            </Box>
          )
        ) : (
          <Layout>
            <Box className="flex_align_center">
              <Heading heading="Please connect your wallet first." />
            </Box>
          </Layout>
        )}
      </Box>
    </MyListCardStyled>
  );
};

export default MyListCard;

const MyListCardStyled = styled.section`
  .bg_heart {
    padding: 5px;
    font-size: 14px;
    width: 30px;
    height: 30px;
    background-size: contain;
    text-align: center;
    background-repeat: no-repeat;
    color: white;
  }
`;
