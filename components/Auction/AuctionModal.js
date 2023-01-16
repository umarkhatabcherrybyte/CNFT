import { Typography, TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../shared/CustomModal";
import { CalendarTodayOutlined, Close } from "@mui/icons-material";

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
const AuctionModal = ({ open, setOpen, setIsSuccessModal }) => {
  if (!open) {
    return null;
  }

  const onPLaceBid = () => {
    console.log("wokring");
    setIsSuccessModal(true);
    setOpen(false);
  };
  return (
    <div>
      <CustomModal open={open} setOpen={setOpen}>
        <Typography className="bold text_center">Place a Bid</Typography>
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

        <Typography
          variant="caption"
          component="div"
          className="bold text_center"
          sx={{ pb: 1 }}
        >
          You must bid at least 1500.95 ADA
        </Typography>
        <TextField placeholder="00.00 ADA" sx={style} fullWidth />
        <Typography variant="caption" component="div" className="bold ">
          Enter Quantity. 10 Available
        </Typography>
        <TextField placeholder="01" sx={style} fullWidth />

        <Box className="space_between" sx={{ py: 1 }}>
          <Typography variant="caption" component="div" className="bold ">
            You must bid at least
          </Typography>
          <Typography variant="caption" component="div" className="bold ">
            1500.95 ADA
          </Typography>
        </Box>
        <Box className="space_between" sx={{ py: 1 }}>
          <Typography variant="caption" component="div" className="bold ">
            Cardano service fee
          </Typography>
          <Typography variant="caption" component="div" className="bold ">
            0.5 ADA
          </Typography>
        </Box>
        <Box className="space_between" sx={{ py: 1 }}>
          <Typography variant="caption" component="div" className="bold ">
            Total bid amount:
          </Typography>
          <Typography variant="caption" component="div" className="bold ">
            15.01 ADA
          </Typography>
        </Box>
        <Button
          startIcon={<CalendarTodayOutlined />}
          sx={{
            background: "var(--secondary-color)",
            width: "100%",
            color: "#000",
          }}
          className=" br_50"
          onClick={onPLaceBid}
        >
          Place Your Bid
        </Button>
      </CustomModal>
    </div>
  );
};

export default AuctionModal;
