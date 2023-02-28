import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import CaptionHeading from "../shared/headings/CaptionHeading";
import { ContentCopy } from "@mui/icons-material";
const PriceInputField = ({ placeholder, ada, copy, label, name, formik }) => {
  return (
    <>
      <TextField
        placeholder={placeholder}
        label={label && label}
        fullWidth={true}
        name={name}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        error={formik?.touched[name] && Boolean(formik?.errors[name])}
        helperText={formik?.touched[name] && formik?.errors[name]}
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

export default PriceInputField;
