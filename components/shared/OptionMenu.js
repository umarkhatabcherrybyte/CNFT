import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const OptionMenu = ({ placeholder, setFilter, name, data, filter }) => {
  const onMenuChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <FormControl
        fullWidth={true}
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
          // value={age}
          name={name}
          label={placeholder}
          onChange={onMenuChange}
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "10px 12px",
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
          {data &&
            data.map((item, index) => (
              <MenuItem value={item.value}>{item.title}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default OptionMenu;
