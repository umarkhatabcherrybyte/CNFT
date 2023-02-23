import React from "react";
import CaptionHeading from "../../shared/headings/CaptionHeading";
import {
  Box,
  Card,
  Grid,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { buyDetailRoute, auctionDetailRoute } from "../../Routes/constants";
// const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
import { useRouter } from "next/router";
const MainCard = ({ data, type, id }) => {
  const router = useRouter();
  const navigationHanlder = (index) => {
    const route = type === "Auction" ? auctionDetailRoute : buyDetailRoute;
    router.push(`${route}/${index}/${id}`);
  };
  return (
    <>
      <>
        <Box sx={{ py: 5 }}>
          <Grid container spacing={3}>
            {data.length > 0 &&
              data.map((card, index) => (
                <Grid xs={12} sm={6} md={4} lg={2.4} item key={index}>
                  <Card
                    onClick={(e) => navigationHanlder(index)}
                    sx={{
                      boxShadow: "none",
                      background: "#193361",
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
                        // `https://ipfs.io/ipfs/${card?.collection_id?.assets[0]?.ipfs}`
                        image={`https://ipfs.io/ipfs/${card?.ipfs}`}
                        alt="green iguana"
                        sx={{
                          objectFit: "fill",
                          height: "245px",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ pb: "16px !important" }}>
                      <Typography
                        gutterBottom
                        variant="body"
                        component="div"
                        className="bold poppin text_center "
                        sx={{ textTransform: "uppercase " }}
                      >
                        {card?.asset_name}
                      </Typography>
                      <Box className="flex_align_center">
                        <Typography
                          gutterBottom
                          variant="body"
                          component="div"
                          sx={{ color: "var(--secondary-color)" }}
                          className="bold flex poppin"
                        >
                          {card?.price}

                          <Typography
                            variant="caption"
                            component="div"
                            sx={{
                              color: "var(--secondary-color)",
                              fontSize: "10px",
                              pl: 0.5,
                            }}
                            className="bold poppin uppercase"
                          >
                            Ada
                          </Typography>
                        </Typography>
                        {/* <CaptionHeading heading="julian_jokey" /> */}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </>
    </>
  );
};

export default MainCard;
