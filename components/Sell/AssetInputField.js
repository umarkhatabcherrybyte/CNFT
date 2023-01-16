import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import CaptionHeading from "../shared/headings/CaptionHeading";
import { ContentCopy } from "@mui/icons-material";
const AssetInputField = ({ placeholder, ada, copy, label }) => {
  return (
    <>
      <TextField
        placeholder={placeholder}
        label={label && label}
        fullWidth
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        sx={{
          my: 1,
          fieldset: {
            border: "none",
          },
          "& .MuiOutlinedInput-root": {
            color: "#ffff",
            background: "var(--box-color)",
            borderRadius: "15px",
          },

          input: {
            "&::placeholder": {
              color: "#fff",
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={
                {
                  // background: "var(--box-color)",
                }
              }
            >
              {ada && <CaptionHeading heading="ADA" />}
              {copy && <ContentCopy className="text_white" />}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default AssetInputField;
