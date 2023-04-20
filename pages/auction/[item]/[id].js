import React, { useState, useEffect } from "react";
import ContainerLayout from "../../../components/shared/ContainerLayout";
import BreadCrumHeader from "../../../components/shared/BreadCrumHeader";
import styled from "styled-components";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  RemoveRedEyeOutlined,
  FavoriteBorderOutlined,
  CalendarTodayOutlined,
} from "@mui/icons-material";
import AuctionModal from "../../../components/Auction/AuctionModal";
import BarHeading from "../../../components/shared/headings/BarHeading";
import DetailCard from "../../../components/Auction/DetailCard";
import SuccessModal from "../../../components/Auction/SuccessModal";
import { useWallet, useLovelace } from "@meshsdk/react";
import { useRouter } from "next/router";
import GetAdaPriceService from "/services/get-ada-price.service";
import useFetchData from "../../../hooks/adaInfo";
import { INSTANCE } from "/config/axiosInstance";
import dynamic from "next/dynamic";
import FullScreenLoader from "../../../components/shared/FullScreenLoader";
import { isVideoOrIsAudio } from "../../../utils/utils";
const DateCountdown = dynamic(() => import("react-date-countdown-timer"), {
  ssr: false,
});

const cardData = [{}, {}, {}, {}];

const AuctionDetail = () => {
  const router = useRouter();

  const { id, item } = router.query;
  const [open, setOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const adaInfo = useFetchData(GetAdaPriceService.getPrice, 30000);

  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
  // console.log(detail, "sdada dasdas");
  const getData = async () => {
    // console.log("Sdsdadasdasdsad");
    setIsLoading(true);
    try {
      const res = await INSTANCE.get(`/list/get/${item}/${id}`);
      setDetail(res?.data?.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setDetail([]);
      console.log(e);
    }
  };
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <AuctionDetailStyled>
      <ContainerLayout>
        {isLoading && <FullScreenLoader />}

        <BreadCrumHeader heading="Live Action Details" />
        <Box sx={{ py: 5 }}>
          <Box sx={{ minHeight: "7rem" }}>
            {Object.keys(detail).length > 0 && (
              <Grid container spacing={4}>
                <Grid xs={12} md={6} item>
                  <Box>
                    <img
                      src={
                        !isVideoOrIsAudio(
                          detail?.list?.collection_id?.assets[item]
                        )
                          ? `https://ipfs.io/ipfs/${detail?.list?.collection_id?.assets[item]?.ipfs}`
                          : detail?.list?.collection_id?.assets[item]
                              ?.feature_image
                      }
                      alt=""
                      className="w_100 br_15 detail_img"
                    />
                  </Box>
                </Grid>
                <Grid xs={12} md={6} item>
                  <Typography
                    variant="h3"
                    className="uppercase text_white bold oswald"
                  >
                    {detail.list?.collection_id?.assets[item]?.asset_name}
                  </Typography>
                  {/* <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 2,
                  "& .detial": {
                    py: 0.5,
                    px: 2,
                    display: "flex",
                  },
                }}
                className="text_white "
              >
                <Box className="light_white_bg detial br_15" sx={{ mr: 2 }}>
                  <RemoveRedEyeOutlined sx={{ mr: 1 }} />
                  <Typography>150</Typography>
                </Box>
                <Box className="light_white_bg  detial br_15">
                  <FavoriteBorderOutlined sx={{ mr: 1 }} />
                  <Typography>235</Typography>
                </Box>
              </Box> */}
                  {/* <Box
                sx={{ py: 1, px: 1.5, width: "13rem" }}
                className="light_white_bg text_white br_15"
              >
                <Typography className="montserrat">Created By</Typography>
                <Typography className="bold montserrat">
                  Ralph Garraway
                </Typography>
              </Box> */}
                  <Typography sx={{ py: 2 }} className="text_white montserrat">
                    {detail.list?.collection_id?.assets[item]?.description}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <Box className="light_white_bg text_white br_15 montserrat">
                        <Typography sx={{ py: 1.5, px: 1 }}>
                          Curent Bid in USD :{" "}
                          <span>
                            {" "}
                            {!adaInfo
                              ? "..."
                              : parseFloat(
                                  adaInfo?.current_price * detail.highest_bid
                                ).toFixed(2)}
                            USD
                          </span>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box className="light_white_bg text_white br_15 montserrat">
                        <Typography sx={{ py: 1.5, px: 1 }}>
                          Curent Bid in ADA :{" "}
                          <span>{detail?.highest_bid} ADA</span>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      background: "#0e3b3b4d",
                      color: "#ffff",
                      py: 1.5,
                      my: 1,
                      mt: 2,
                    }}
                    className="flex br_15 montserrat"
                  >
                    {/* sell_type_id */}
                    <Typography sx={{ mr: 3 }}>Countdown</Typography>
                    <Typography>
                      <DateCountdown
                        dateTo={detail?.list?.sell_type_id?.end_time}
                        // callback={() => alert("Hello")}
                        locales_plural={["Y:", "M:", "D:", "H:", "M:", "S"]}
                      />
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      border: "2px solid #fff",
                      my: 1,
                      "&:hover": {
                        opacity: 0.7,
                      },
                    }}
                    className="w_100 text_white br_50 montserrat"
                    startIcon={<CalendarTodayOutlined />}
                    onClick={() => setOpen(true)}
                  >
                    Place Your Bid
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
        {!isLoading && detail?.lists_by_user.length > 0 && (
          <Box sx={{ py: 5 }}>
            <BarHeading heading="Live Auction" />
            <Grid container spacing={3}>
              {detail?.lists_by_user.map((card) => (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <DetailCard card={card} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </ContainerLayout>
      <AuctionModal
        auctionIndex={item}
        listId={id}
        detail={detail}
        open={open}
        highest_bid={2}
        setOpen={setOpen}
        setIsSuccessModal={setIsSuccessModal}
        getData={getData}
      />
      <SuccessModal open={isSuccessModal} setOpen={setIsSuccessModal} />
    </AuctionDetailStyled>
  );
};

export default AuctionDetail;

const AuctionDetailStyled = styled.section`
  .detail_img {
    object-fit: fill;
    max-height: 25rem;
  }
`;
