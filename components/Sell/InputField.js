import React from "react";
import { TextField, Box, Typography } from "@mui/material";
const InputField = ({ placeholder, label, name, formik }) => {
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
          fullWidth={true}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
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
