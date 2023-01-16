import React from "react";
import { Typography, TextField, Box, Button } from "@mui/material";
import CustomModal from "../../shared/CustomModal";
import {
  CalendarTodayOutlined,
  Close,
  AttachMoney,
  Wallet,
} from "@mui/icons-material";
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

const OfferModal = ({ open, setOpen }) => {
  if (!open) {
    return null;
  }

  const onMakeOffer = () => {
    setOpen(false);
  };
  return (
    <>
      <CustomModal open={open} setOpen={setOpen}>
        <Typography className="bold text_center">Make an offer</Typography>
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
        <Typography variant="caption" component="div" className="bold ">
          Enter Price in ADA
        </Typography>
        <TextField placeholder="01" sx={style} fullWidth />
        {/* <Box className="space_between" sx={{ py: 1 }}>
          <Typography variant="caption" component="div" className="bold ">
            Cardano service fee
          </Typography>
          <Typography variant="caption" component="div" className="bold ">
            0.5 ADA
          </Typography>
        </Box> */}
        <Button
          startIcon={<Wallet />}
          sx={{
            background: "var(--secondary-color)",
            width: "100%",
            color: "#000",
          }}
          className=" br_50 initialcase"
          onClick={onMakeOffer}
        >
          Make an offer
        </Button>
      </CustomModal>
    </>
  );
};

export default OfferModal;
