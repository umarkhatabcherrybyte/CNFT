import React from "react";
import { Typography, TextField, Box, Button } from "@mui/material";
import { Image } from "@mui/icons-material";
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
const ListCollection = () => {
  return (
    <>
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
          Tell us about your collection. 0 of 1000 characters used. (Optional)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
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
    </>
  );
};

export default ListCollection;
