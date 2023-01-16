import React from "react";
import { TextField, Box, Typography } from "@mui/material";
const InputField = ({ placeholder, label }) => {
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Typography
          variant="caption"
          className="bold text_white"
          sx={{ position: "absolute", top: "11px", left: "15px" }}
        >
          {label}
        </Typography>
        <TextField
          placeholder={placeholder}
          fullWidth
          sx={{
            fieldset: {
              border: "none",
            },
            input: {
              color: "#ffff",
              paddingTop: "30px",
              background: "var(--box-color)",
              borderRadius: "15px",
              "&::placeholder": {
                color: "#fff",
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default InputField;
