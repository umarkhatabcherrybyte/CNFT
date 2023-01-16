import React from "react";
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import { dummyData } from "/helper/dummyData";
import styled from "styled-components";

const RoyalityCard = ({ card, isMatch }) => {
  return (
    <Box className="card">
      <Box className="img_wrapper">
        <img src={card.img} alt="no img" className="w_100" />
      </Box>
      <Typography
        className="text_center bold text_white oswald"
        sx={{ py: 2 }}
        variant={{ xs: "caption ", md: "body" }}
        component="div"
      >
        {card.title}
      </Typography>
    </Box>
  );
};
const Royality = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <RoyalityStyled>
      <Box sx={{ width: { md: "66%", xs: "100%" } }}>
        <Typography className="text_white oswald bold" variant="h4">
          OUR ROYALTIES
        </Typography>
        <Box className="royalty-text" sx={{ py: 2 }}>
          <Typography className="text_white proxima" variant="body">
            Our royalties feature gives you a percentage of the sale price each
            time your NFT creation is sold on a marketplace. Your royalty
            payments are perpetual and are executed by smart contracts
            automatically each time your artwork sells
          </Typography>
        </Box>
      </Box>
      {/* cards  */}
      <Box>
        {isMatch ? (
          <Grid container spacing={3}>
            {dummyData.map((card, index) => (
              <>
                <Grid item xs={5.5}>
                  <RoyalityCard card={card} isMatch={isMatch} />
                </Grid>
                {(index + 1) % 2 != 0 && (
                  <Grid item xs={1} className="flex_align">
                    <img
                      src="/images/royalty/arrow.png"
                      alt="no img"
                      className="w_100"
                      style={{ width: "1.2rem" }}
                    />
                  </Grid>
                )}
              </>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {dummyData.map((card, index) => (
              <>
                <Grid item xs={5.5} md={2.5}>
                  <RoyalityCard card={card} />
                </Grid>
                <Grid item xs={1} md={0.5} className="flex_align">
                  {card.arrow && (
                    <img
                      src="/images/royalty/arrow.png"
                      alt="no img"
                      className="w_100"
                      style={{ width: "1.2rem" }}
                    />
                  )}
                </Grid>
              </>
            ))}
          </Grid>
        )}
      </Box>
    </RoyalityStyled>
  );
};

export default Royality;

const RoyalityStyled = styled.section`
  .card {
    background: rgba(70, 193, 231, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 20px;
    .img_wrapper {
      display: flex;
      /* align-items: center; */
      justify-content: center;
    }
    img {
      /* width: 100%; */
      height: 130px;
      object-fit: contain;
      /* max-width: 85px; */
    }
    @media (max-width: 990px) {
      img {
        height: 50px;
      }
    }
  }
`;
