import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Grid,
  Tab,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import InputField from "./InputField";
import LightText from "../shared/headings/LightText";
import { addSingleListingSchema } from "../../schema/Index";
import { useFormik } from "formik";
import ListCollection from "./ListCollection";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";

const inputFileStyle = {
  my: 2,
  background: "#FFFFFF33 ",
  border: "3px dashed #fff",
  height: "12rem",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
];

const MylistTabs = ({ setListingSteps }) => {
  const [tabValue, setTabValue] = useState("add");
  const [selectedValue, setSelectedValue] = useState("");

  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const onMenuChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValue(value);
  };
  const [singleListLogo, setSingleListLogo] = useState(null);
  const onUploadFile = ({ currentTarget: input }) => {
    if (input.files && input.files[0]) {
      const files = input.files[0];
      const _url = URL.createObjectURL(files);
      setSingleListLogo(files);
    }
  };
  const formik = useFormik({
    initialValues: {
      file: null,
      name: "",
      description: "",
      policy_id: "",
      collection_name: "",
    },
    validationSchema: addSingleListingSchema,
    onSubmit: async (values) => {
      console.log(values);
      const lucid = await Lucid.new(
        new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodmdx0R847kjabyIdpC8eHr7ZZOMxlpXbm"),
        "Preprod"
      );

      const api = await window.cardano[String(connectedWallet)].enable();
      lucid.selectWallet(api);

      const { paymentCredential } = lucid.utils.getAddressDetails(
        await lucid.wallet.address(),
      );

      const mintingPolicy = lucid.utils.nativeScriptFromJson(
        {
          type: "all",
          scripts: [
            { type: "sig", keyHash: paymentCredential?.hash },
            {
              type: "before",
              slot: lucid.utils.unixTimeToSlot(Date.now() + 518400000),
            },
          ],
        },
      );

      // const policyId = lucid.utils.mintingPolicyToId(
      //   mintingPolicy,
      // );
      const policyId = "e8d7b7b0943cc239c8ed7c7d4f5351ab05f0f8c19beb1f0f73a53ad2"
      console.log(policyId, mintingPolicy.script)
      let metadata = JSON.parse(window.localStorage.getItem("metadata"))
      const unit = policyId + fromText(metadata.name);
      let obj = { [policyId]: metadata };
      const txL = await lucid
        .newTx()
        .attachMetadata('721', obj)
        .mintAssets({ [unit]: 1n })
        .validTo(Date.now() + 100000)
        .attachMintingPolicy({ "type": "Native", "script": "8201828200581c006312b255ff7dafd0d1680e6ed40357d063ac459b78d0c2c0855aad82051a0143a3dc" })
        .complete();

      const signedTxL = await txL.sign().complete();

      const txHashL = await signedTxL.submit();

      console.log(txHashL, 'das')

      if (txHashL) {
        window.localStorage.setItem('policy', mintingPolicy.script)
        window.localStorage.setItem('policy-id', policyId)
        window.localStorage.setItem('minting-script', JSON.stringify(mintingPolicy))
        router.push('/mint')
      }


      // setListingSteps("step2");
      // let data = new FormData();
      // data.append("platform_id", product);
      // data.append("product_url", values.platform_url);
      // data.append("product_name", values.platform_name);
      // data.append("icon", appIcon);
      // dispatch(createProduct(data));
    },
  });

  console.log(formik);
  return (
    <>
      <TabContext value={tabValue}>
        <TabList
          onChange={onTabChange}
          aria-label="lab API tabs example"
          sx={{
            minHeight: "auto",
            "& .MuiTabs-flexContainer": {
              alignItems: "center",
            },
            "& .MuiTabs-indicator": {
              background: "transparent",
            },

            "& 	.Mui-selected": {
              color: "#000 !important",
              background: "var(--secondary-color) !important",
            },
            "& 	.MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
            "& .tab_btn": {
              color: "#ffff",
              minHeight: "58px",
              border: "none !important",
              maxWidth: "inherit",
              flexShrink: "inherit",
              background: "#0000004d",
              width: { sm: "50%", xs: "100%" },
              fontWeight: "bold",
              alignItems: "flex-start",
              fontSize: "1.4rem",
              padding: 0,
              py: 3,
              pl: 3,
            },
          }}
        >
          <Tab
            label="Add Listing"
            value="add"
            className="tab_btn initialcase oswald"
            sx={{ borderTopLeftRadius: "15px" }}
          />
          <Tab
            label="List Collection"
            value="collection"
            className="tab_btn initialcase oswald"
            sx={{ borderTopRightRadius: "15px" }}
          />
        </TabList>
        <TabPanel
          value="add"
          sx={{
            background: "#0009",
            borderRadius: "0px 0px  15px 15px",
            py: 5,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} item>
                <Typography variant="h6" className="text_white bold montserrat">
                  Upload
                </Typography>
              </Grid>
              <Grid xs={12} md={6} item>
                <Typography variant="h6" className="text_white bold montserrat">
                  Preview
                </Typography>
              </Grid>
              <Grid xs={12} item>
                <Divider sx={{ borderColor: "#fff", opacity: "0.6" }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ ...inputFileStyle }}>
                  <Typography
                    variant="h6"
                    className="bold text_white montserrat"
                  >
                    PNG, GIF, WEBP, MP4, Max 100mb.
                  </Typography>
                </Box>
                <Box sx={{ py: 1 }}>
                  <InputField
                    label="Name"
                    placeholder="Name of Your Token"
                    name="name"
                    formik={formik}
                  />
                </Box>
                <Box sx={{ py: 1 }}>
                  <InputField
                    label="Description"
                    placeholder="Describe what your token is about (Optional)"
                    name="description"
                    formik={formik}
                  />
                </Box>
                <Box sx={{ py: 1 }}>
                  <InputField
                    label="Policy ID*"
                    placeholder="Enter your policy ID"
                    name="policy_id"
                    formik={formik}
                  />
                  <LightText heading="with policy ID we can verify your token" />
                </Box>
                <Box sx={{ py: 1 }}>
                  <Typography className="text_white bold" variant="caption">
                    Collection
                  </Typography>
                  <LightText heading="if this is a part of collection select the collection." />
                  <Select
                    // value={selectedValue}
                    value={formik.values.collection_name}
                    displayEmpty
                    // onChange={onMenuChange}
                    onChange={formik.handleChange("collection_name")}
                    sx={{
                      background: "var(--box-color)",
                      color: "#fff",
                      borderRadius: "15px",
                      fieldset: {
                        border: "none",
                      },
                      svg: {
                        color: "#fff",
                      },
                    }}
                    renderValue={(selected) => {
                      console.log(selected);
                      if (selected === "") {
                        return <p>Select</p>;
                      }
                      return selected;
                    }}
                    fullWidth
                    placeholder="Age"
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>Select</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {formik.touched.collection_name &&
                      formik.errors.collection_name}
                  </FormHelperText>
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    className="btn2"
                    sx={{ width: "150px" }}
                    type="submit"
                  // onClick={() => setListingSteps("step2")}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    // height: "67%",
                    my: 2,
                    background: "#FFFFFF33 ",
                    border: "3px dashed #fff",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    "&:hover": {
                      backgroundColor: "inherit !important",
                    },
                  }}
                >
                  {formik.values.file ? (
                    <Box
                      sx={{
                        overflow: "hidden",
                        width: "100%",
                        img: {
                          width: "100%",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <img
                        src={URL.createObjectURL(formik.values.file)}
                        alt=""
                        className="thumbnail_overlay"
                        name="file"
                      />
                    </Box>
                  ) : (
                    <>
                      <Box
                        className="flex_align"
                        sx={{ flexDirection: "column" }}
                      >
                        <Image
                          sx={{ color: "#fff", width: "10em", height: "10em" }}
                        />
                        <Typography
                          variant="caption"
                          className="text_white montserrat"
                          sx={{ opacity: "0.7" }}
                          component="div"
                        >
                          Upload file to preview your brand new NFT
                        </Typography>
                      </Box>
                    </>
                  )}

                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    name="file"
                    onChange={(e) => {
                      formik.setFieldValue("file", e.currentTarget.files[0]);
                    }}
                  />
                </Button>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.file && formik.errors.file}
                </FormHelperText>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        <TabPanel
          value="collection"
          sx={{
            background: "#0009",
            borderRadius: "0px 0px  15px 15px",
            py: 5,
          }}
        >
          <ListCollection />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default MylistTabs;
