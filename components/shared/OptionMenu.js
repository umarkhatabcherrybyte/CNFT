import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const OptionMenu = ({ placeholder }) => {
  const [age, setAge] = React.useState("");

  const onMenuChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <FormControl
        fullWidth
        size="small"
        sx={{
          label: {
            color: "#fff !important",
          },
        }}
      >
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={placeholder}
          onChange={onMenuChange}
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "10px 0",
            },
            fieldset: {
              border: "1px solid #fff !important",
            },
            "&.MuiInputBase-root": {
              borderRadius: "50px",
              color: "#fff",
              background: "#FFFFFF17",
            },
            svg: {
              color: "#ffff",
            },
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default OptionMenu;
