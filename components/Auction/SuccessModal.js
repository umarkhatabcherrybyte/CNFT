import React from "react";
import { Typography, TextField, Box, Button, Grid } from "@mui/material";
import CustomModal from "../shared/CustomModal";
import { CalendarTodayOutlined, Close } from "@mui/icons-material";
import Heading from "../shared/headings/Heading";

const style = {
  fieldset: {
    border: "none",
  },
  input: {
    border: "1px solid #000",
    borderRadius: "10px",
    padding: "8px 10px",
    mb: 2,
  },
};

const SuccessModal = ({ open, setOpen }) => {
  if (!open) {
    return null;
  }
  return (
    <>
      <div>
        <CustomModal open={open} setOpen={setOpen}>
          <Box onClick={() => setOpen(false)}>
            <Close
              sx={{
                background: "#fff",
                position: "absolute",
                right: "0",
                top: "1px",
                zIndex: "99999",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>
            <img
              src="/images/single_mint.png"
              alt=""
              className="w_100"
              style={{
                maxWidth: "17rem",
                margin: "auto",
                display: "flex",
              }}
            />
            <Typography
              variant="h6"
              className="bold montserrat text_center"
              component="div"
            >
              Congratulations! You have successfully purchased a NFT with CNFT
              GENIE
            </Typography>
            <Grid container spacing={3} sx={{ py: 2 }}>
              <Grid xs={12} md={4} item>
                <Button className="btn w_100">Create NFTs</Button>
              </Grid>
              <Grid xs={12} md={4} item>
                <Button className="btn2 w_100">Explore NFTs</Button>
              </Grid>
              <Grid xs={12} md={4} item>
                <Button className="btn w_100">Home</Button>
              </Grid>
            </Grid>
          </Box>
        </CustomModal>
      </div>
    </>
  );
};

export default SuccessModal;
