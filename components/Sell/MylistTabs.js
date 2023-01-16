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
  InputLabel,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import InputField from "./InputField";
import LightText from "../shared/headings/LightText";
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
const AddImage = ({ heading, desc, width }) => {
  return (
    <>
      <Typography className="bold text_white">{heading}</Typography>
      <Typography
        variant="caption"
        className="text_white"
        sx={{ opacity: "0.7" }}
      >
        {desc}
      </Typography>
      <Box
        sx={{
          my: 2,
          background: "#FFFFFF33 ",
          border: "3px dashed #fff",
          maxWidth: width,
          height: "12rem",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image sx={{ color: "#fff", width: "4em", height: "4em" }} />
      </Box>
    </>
  );
};
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
                <Typography variant="h6" className="bold text_white montserrat">
                  PNG, GIF, WEBP, MP4, Max 100mb.
                </Typography>
              </Box>
              <Box sx={{ py: 1 }}>
                <InputField label="Name" placeholder="Name your token" />
              </Box>
              <Box sx={{ py: 1 }}>
                <InputField
                  label="Description"
                  placeholder="Describe what your token is about (Optional)"
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <InputField
                  label="Policy ID*"
                  placeholder="Enter your policy ID"
                />
                <LightText heading="with policy ID we can verify your token" />
              </Box>
              <Box sx={{ py: 1 }}>
                <Typography className="text_white bold" variant="caption">
                  Collection
                </Typography>
                <LightText heading="if this is a part of collection select the collection." />
                <Select
                  value={selectedValue}
                  displayEmpty
                  onChange={onMenuChange}
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
              </Box>
              <Box sx={{ py: 2 }}>
                <Button
                  className="btn2"
                  sx={{ width: "150px" }}
                  onClick={() => setListingSteps("step2")}
                >
                  Next
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "67%",
                  my: 2,
                  background: "#FFFFFF33 ",
                  border: "3px dashed #fff",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box className="flex_align" sx={{ flexDirection: "column" }}>
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
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel
          value="collection"
          sx={{
            background: "#0009",
            borderRadius: "0px 0px  15px 15px",
            py: 5,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#fff", opacity: "0.7", py: 2 }}
          >
            Required fields*
          </Typography>
          <AddImage
            heading="Logo Image*"
            desc="This  image will also be used for navigation. 350 x 350 recommendation."
            width="15rem"
          />
          <AddImage
            heading="Featured Image"
            desc="This image will be used for featuring your collection on homepage, category page, or other promotional areas of CNFT Genie. 600 x 600 recommendation."
            width="35rem"
          />
          <AddImage
            heading="Banner Image"
            desc="This image will be appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommendation."
            width="100%"
          />
          <Box sx={{ py: 1 }}>
            <TextField
              fullWidth
              placeholder="Name*"
              sx={{
                maxWidth: "400px",
                fieldset: {
                  border: "none",
                },
                input: {
                  background: "var(--light-white-color)",
                  borderRadius: "15px",
                  padding: "15px 10px",
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ py: 1 }}>
            <Typography
              variant="caption"
              className="bold text_white montserrat"
              component="div"
            >
              Description
            </Typography>
            <Typography
              variant="caption"
              className="text_white montserrat"
              component="div"
              sx={{ opacity: "0.7", pb: 1 }}
            >
              Tell us about your collection. 0 of 1000 characters used.
              (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              // placeholder="Name*"
              sx={{
                maxWidth: "400px",
                "& .MuiInputBase-root": {
                  padding: "0",
                },
                fieldset: {
                  border: "none",
                },
                textarea: {
                  background: "var(--light-white-color)",
                  borderRadius: "15px",
                  padding: "15px 10px",
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
            />
          </Box>
          <Button className="btn2" sx={{ width: "200px", my: 3 }}>
            Create
          </Button>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default MylistTabs;
