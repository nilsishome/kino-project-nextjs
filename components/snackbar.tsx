import React from "react";
import { Snackbar, Alert } from "@mui/material";

type Props = {
  open: boolean;
  message: string;
  type: any;
  closeSnackbar: () => void;
};

const AlertSnackbar: React.FC<Props> = ({
  open,
  message,
  type,
  closeSnackbar,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        sx={{
          backgroundColor: "text.primary",
          color: "primary.main",
          width: "100%",
        }}
        severity={type ? type : "info"}
        onClose={closeSnackbar}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
