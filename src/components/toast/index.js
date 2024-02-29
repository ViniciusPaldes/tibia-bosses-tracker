import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import React from "react";

export const Toast = ({
  visible,
  handleClose,
  success,
  message,
}) => {
  return (
    <Snackbar open={visible} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={success ? "success" : "error"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
