import { Typography, TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../shared/CustomModal";
import { CalendarTodayOutlined, Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { placeYourBidSchema } from "/schema/Index";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import { INSTANCE } from "/config/axiosInstance";
import { getKeyData } from "../../helper/localStorage";
import { Toast } from "../shared/Toast";
import { useWallet, useLovelace } from "@meshsdk/react";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
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
const AuctionModal = ({
  open,
  setOpen,
  setIsSuccessModal,
  detail,
  listId,
  auctionIndex,
  getData,
}) => {
  const [fee, setFee] = useState("0");
  const router = useRouter();
  const [total, setTotal] = useState("");
  const [inputVal, setInputVal] = useState("");
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
  const formik = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema: placeYourBidSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (Number(detail?.highest_bid) > values.price) {
        Toast("error", "Your values must be greater than highest bid values");
        return;
      }
      if (connected) {
        try {
          const connectedWallet = getKeyData("connectedWallet");
          const unit =
            detail?.list?.collection_id.policy_id +
            fromText(
              detail?.list?.collection_id.assets[auctionIndex]?.asset_name
            );
          const response = await INSTANCE.post("/bid/validate", {
            price: values.price,
            list_id: listId,
            unit: unit,
          });
          if (response.status) {
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
            console.log(values.price, "dasd");
            const api = await window.cardano[String(connectedWallet)].enable();
            const price_value = Number(values.price * 1000000);
            lucidBrowser.selectWallet(api);
            const tx = await lucidBrowser
              .newTx()
              .payToAddress(await transferLucid.wallet.address(), {
                lovelace: BigInt(price_value),
              })
              .validTo(Date.now() + 100000)
              .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            if (txHash) {
              // bidder_id  current user
              // lister_id user who list this auction
              // list_id  _id that's on the top of the page
              // asset_index  index that's on the top of the page
              const res = await INSTANCE.post("/bid/create", {
                bidder_id: getKeyData("user_id"),
                lister_id: detail.list.user_id._id,
                list_id: listId,
                list_id: listId,
                asset_index: auctionIndex,
                price: Number(values.price),
                unit: unit,
              });
              if (res) {
                setOpen(false);
                Toast("success", "Bid Added Successfully");
                router.push("/");
                getData();
              } else {
                Toast("error", "Could Not Add Bid");
              }
            }
          }
        } catch (e) {
          Toast("error", "Could Not Add Bid");
          console.log(e);
        }
      } else {
        Toast("error", "Please connect your wallet");
      }
    },
  });
  console.log(formik.isSubmitting);

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
            fullWidth={true}
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
              {detail?.highest_bid} ADA
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
              {isNaN(parseFloat(formik.values.price))
                ? 0
                : parseFloat(formik.values.price) +
                  parseFloat((formik.values.price * 0.025).toFixed(3))}
              ADA
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
          >
            Place Your Bid
          </Button>
          {/* <LoadingButton
            type="submit"
            fullWidth
            startIcon={<CalendarTodayOutlined />}
            loading={formik.isSubmitting}
            // variant="outlined"
            disabled={formik.isSubmitting}
            className="btn2"
            sx={{ width: "100%" }}
          >
            {!formik.isSubmitting ? "Place Your Bid" : "Submitting"}
          </LoadingButton> */}
        </form>
      </CustomModal>
    </>
  );
};

export default AuctionModal;
