import { Typography, TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../shared/CustomModal";
import { CalendarTodayOutlined, Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { placeYourBidSchema } from "/schema/Index";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import { INSTANCE } from "/config/axiosInstance";
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
const AuctionModal = ({ open, setOpen, setIsSuccessModal, detail }) => {
  const [fee, setFee] = useState("0");
  const [total, setTotal] = useState("");
  const [inputVal, setInputVal] = useState("");
  const onPLaceBid = () => {
    console.log("wokring");
    // setIsSuccessModal(true);
    // setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema: placeYourBidSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await INSTANCE.post("/list/validate/bid", {
          price: "",
          list_id: "",
          unit: "",
        });

        const transferLucid = await Lucid.new(
          new Blockfrost(
            "https://cardano-preprod.blockfrost.io/api/v0",
            "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"
          ),
          "Preprod"
        );
        transferLucid.selectWalletFromSeed(
          "cake throw fringe stock then already drip toss hunt avocado what walk divert noodle fork above hurt carbon leisure siege hand enter air surprise"
        );
        const lucidBrowser = await Lucid.new(
          new Blockfrost(
            "https://cardano-preprod.blockfrost.io/api/v0",
            "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"
          ),
          "Preprod"
        );
        // .payToAddress(address, { lovelace: BigInt(user_value) })
        const tx = await lucidBrowser
          .newTx()
          .payToAddress(await transferLucid.wallet.address(), {
            [unit]: 1n,
          })
          .validTo(Date.now() + 100000)
          .complete();
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        if (txHash) {
        }
        const res = await INSTANCE.post("/list/add/bid", {});
      } catch (e) {
        console.log(e);
      }
    },
  });

  if (!open) {
    return null;
  }
  return (
    <>
      <CustomModal open={open} setOpen={setOpen}>
        <form onSubmit={formik.handleSubmit}>
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
          {/* 
        <Typography
          variant="caption"
          component="div"
          className="bold text_center"
          sx={{ pb: 1 }}
        >
          You must bid at least 1500.95 ADA
        </Typography> */}
          <TextField
            placeholder="00.00 ADA"
            sx={style}
            name="price"
            fullWidth
            value={formik?.values.price}
            onChange={formik?.handleChange}
            error={formik?.touched.price && Boolean(formik?.errors.price)}
            helperText={formik?.touched.price && formik?.errors.price}
          />
          {/* <Typography variant="caption" component="div" className="bold ">
          Enter Quantity. 10 Available
        </Typography>
        <TextField placeholder="01" sx={style} fullWidth /> */}

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
              {parseFloat(formik.values.price * 0.025).toFixed(3)} ADA
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
            type="submit"
            startIcon={<CalendarTodayOutlined />}
            sx={{
              background: "var(--secondary-color)",
              width: "100%",
              color: "#000",
            }}
            className=" br_50"
            disabled={formik.isSubmitting}
            // onClick={onPLaceBid}
          >
            Place Your Bid
          </Button>
        </form>
      </CustomModal>
    </>
  );
};

export default AuctionModal;
