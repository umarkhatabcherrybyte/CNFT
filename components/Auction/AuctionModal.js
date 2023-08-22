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
import { transactionErrorHanlder } from "../../helper/transactionError";
import { seedPhraseMainnet } from "../../config/utils";
import { seedPhrasePreprod } from "../../config/utils";
import { network_name, network_url, network_key } from "../../base_network";
import { getClientIp } from "../../helper/clientIP";

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
  const lovelace = useLovelace();
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
        if (lovelace < 1000000) {
          Toast(
            "error",
            "You do not have enough Ada to complete this transaction"
          );
          return;
        } else {
          if (lovelace < 1000000 * detail?.highest_bid) {
            Toast(
              "error",
              "You do not have enough Ada to complete this transaction"
            );
            return;
          } else {
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
              if (response.data.status) {
                // const transferLucid = await Lucid.new(
                //   new Blockfrost(
                //     "https://cardano-mainnet.blockfrost.io/api/v0",
                //     "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj"
                //   ),
                //   "Mainnet"
                // );
                const transferLucid = await Lucid.new(
                  new Blockfrost(network_url, network_key),

                  network_name
                );
                transferLucid.selectWalletFromSeed(seedPhraseMainnet);
                // const lucidBrowser = await Lucid.new(
                //   new Blockfrost(
                //     "https://cardano-mainnet.blockfrost.io/api/v0",
                //     "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj"
                //   ),
                //   "Mainnet"
                // );
                const lucidBrowser = await Lucid.new(
                  new Blockfrost(network_url, network_key),

                  network_name
                );
                // console.log(values.price, "dasd");
                const api = await window.cardano[
                  String(connectedWallet)
                ].enable();
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
                    window.location.href = "/";
                    getData();
                  } else {
                    Toast("error", "Could Not Add Bid");
                  }
                }
              } else {
                Toast("error", "Current Bid Is Higher, Please Bid More");
              }
            } catch (e) {
              transactionErrorHanlder(e, "auction");
              const clientIp = await getClientIp();
              if (clientIp) {
                try {
                  const response = await INSTANCE.post(`/log/create`, {
                    error: JSON.stringify(error),
                    ip: clientIp,
                    type: "AuctionModal",
                  });
                  console.log(response.data);
                } catch (error) {
                  console.error(error);
                }
              }
              console.log(e);
              console.log(e.info);
            }
          }
        }
      } else {
        Toast("error", "Please connect your wallet");
      }
    },
  });
  // console.log(formik.isSubmitting);

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
