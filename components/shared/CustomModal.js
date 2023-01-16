import React from "react";
import { Dialog, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
const CustomModal = ({ children, setOpen, open }) => {
  const handleModalClose = () => setOpen(false);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "hsl(0deg 0% 100% / 50%)",
            backdropFilter: "blur(25px)",
            maxWidth: "25rem",
            width: "50%",
            padding: "15px 2rem",
            borderRadius: "15px",
          },
        }}
      >
        <Box>{children}</Box>
      </Dialog>
    </>
  );
};

export default CustomModal;
