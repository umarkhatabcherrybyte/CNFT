import React from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import * as selectors from "/redux/selectors/Selector";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { carouselNew } from "../setting/Slider";
import { ArrowForwardIos } from "@mui/icons-material";
import { collectionDetailRoute } from "/components/Routes/constants";
import { useRouter } from "next/router";
import Heading from "../shared/headings/Heading";
import { isVideoOrIsAudio } from "../../utils/utils";

export function SliderArrow(props) {
  const { className, style, onClick, arrow } = props;

  return (
    <SliderArrowStyled>
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          // top: "-6rem",
          // right: arrow === "right" ? "10rem" : "4rem",
          // left: "auto",
        }}
        onClick={onClick}
      >
        <img
          // className="hover:opacity-70"
          src="/images/royalty/arrow.png"
          style={{
            maxWidth: "3rem",
            transform: arrow === "right" ? "rotate(-180deg)" : "rotate(0deg)",
          }}
        />
      </div>
    </SliderArrowStyled>
  );
}
const FeatureTokenSlider = ({ nfts }) => {
  const router = useRouter();

  // const nftsState = useSelector(selectors.nftBreakdownState);
  // const nfts = nftsState.data ? nftsState.data : [];
  return (
    <FeatureTokenStyled>
      <Box sx={{ py: 4 }}>
        <Slider {...carouselNew}>
          {nfts && nfts.length > 0 ? (
            nfts.map((nft, index) => (
              <Box sx={{ px: 1 }} key={index}>
                <Card
                  sx={{
                    // maxWidth: 345,
                    cursor: "pointer",
                    boxShadow: "none",
                    background: "var(--main-color)",
                    borderRadius: "20px",
                    border: "solid 1px #ddd",
                    color: "#fff",
                    // height: {
                    //   xs: "17rem",
                    //   md: "21rem",
                    // },
                    "& .flex": {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  }}
                  onClick={() => router.push(`buy/0/${nft._id}`)}
                >
                  <CardMedia
                    component="img"
                    // height="205"

                    image={
                      !isVideoOrIsAudio(nft?.collection_id?.assets[0])
                        ? `https://ipfs.io/ipfs/${nft?.collection_id?.assets[0]?.ipfs}`
                        : nft?.collection_id?.assets[0]?.feature_image
                    }
                    // image={
                    //   !isVideoOrIsAudio(nft?.collection_id?.assets[0])
                    //     ? `https://ipfs.io/ipfs/${nft?.collection_id?.assets[0]?.ipfs}`
                    //     : nft?.collection_id?.assets[0]?.featured_image
                    // }
                    alt="green iguana"
                    sx={{
                      borderRadius: "15px",
                      maxHeight: "205px",
                      height: "15rem",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ padding: "10px !important" }}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ flexWrap: "nowrap !important" }}
                    >
                      <Grid item xs={12} lg={6}>
                        <Typography
                          gutterBottom
                          variant="caption"
                          component="div"
                          className="bold poppin"
                        >
                          {nft?.collection_id?.assets[0]?.asset_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={6} justifyContent="end">
                        <Typography
                          gutterBottom
                          variant="body"
                          component="div"
                          sx={{
                            color: "var(--secondary-color)",
                            textAlign: "end",
                            fontSize: { xs: "8px", md: "inherit" },
                          }}
                          className="bold poppin"
                        >
                          {nft?.sell_type_id?.price}
                          <Typography
                            // className="font_12"
                            sx={{
                              fontSize: { xs: "8px", md: "10px" },
                            }}
                          >
                            ADA
                          </Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid
                      container
                      spacing={1}
                      alignItems="center"
                      sx={{ flexWrap: "nowrap !important" }}
                    >
                      <Grid item xs={12} lg={8}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            py: 1,
                          }}
                        >
                          <Box
                            sx={{
                              backgroundImage: `url("/images/heart.png")`,
                              alignItems: { xs: "flex-start", md: "center" },
                            }}
                            className="bg_heart"
                          >
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "8px",
                                  md: "12px",
                                },
                              }}
                            >
                              {nft?.bid}+
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            component="div"
                            sx={{
                              ml: 2,
                              fontSize: { xs: "8px", md: "auto" },
                            }}
                          >
                            People Placed Bid
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <Box className="next_arrow">
                            <ArrowForwardIos
                              sx={{ color: "var(--secondary-color)" }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid> */}
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Box className="flex">
              <Heading heading="No Tokens" />
            </Box>
          )}
        </Slider>
      </Box>
    </FeatureTokenStyled>
  );
};

export default FeatureTokenSlider;

const FeatureTokenStyled = styled.section`
  .bg_heart {
    width: 36px;
    height: 36px;
    background-size: contain;
    text-align: center;
    background-repeat: no-repeat;
    color: white;
    display: flex;
    justify-content: center;
  }
  .next_arrow {
    background: #fff;
    width: 29px;
    height: 29px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: 0.5s;
    &:hover {
      opacity: 0.6s;
    }
  }
`;
const SliderArrowStyled = styled.div`
  .slick-prev:before,
  .slick-next:before {
    font-size: 50px !important;
    display: none;
  }
  .slick-prev {
    left: -54px !important;
  }
  .slick-next {
    right: -24px !important;
  }
  @media (max-width: 1024px) {
    .next_arrow {
      width: 20px !important;
      height: 20px !important;
      svg {
        width: 10px !important;
      }
    }
    .slick-prev {
      left: 38% !important;
    }
    .slick-next {
      right: 41% !important;
    }
    .slick-prev,
    .slick-next {
      top: auto !important;
      bottom: -7%;
    }
    .bg_heart {
      width: 30px !important;
      height: 30px !important;
    }
  }
`;
