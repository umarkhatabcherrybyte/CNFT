import React from "react";
import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import CaptionHeading from "../shared/headings/CaptionHeading";
import { ContentCopy } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const AssetInputField = ({ placeholder, ada, copy, label, name, value }) => {
  // console.log(value);
  return (
    <>
      {/* <h1>{value || 'dd'}</h1> */}
      <TextField
        // placeholder={placeholder}
        label={label && label}
        fullWidth={true}
        name={name}
        // value={formik?.values[name]}
        // onChange={formik?.handleChange}
        // error={formik?.touched[name] && Boolean(formik?.errors[name])}
        // helperText={formik?.touched[name] && formik?.errors[name]}
        defaultValue={value}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        inputProps={{
          readOnly: true,
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
              {copy && (
                <CopyToClipboard text={value}>
                  <Tooltip title="Copy policy id">
                    <IconButton>
                      <ContentCopy
                        className="text_white"
                        sx={{ cursor: "pointer" }}
                      />
                    </IconButton>
                  </Tooltip>
                </CopyToClipboard>
              )}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default AssetInputField;
