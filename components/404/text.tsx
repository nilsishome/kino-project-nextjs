import React from "react";
import { Typography } from "@mui/material";

export default function Text() {
  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 4 }}>
        404
      </Typography>
      <Typography
        sx={{ color: "text.primary" }}
        variant="h6"
        color="text.secondary"
      >
        Oops! The page you were looking for does not exist
      </Typography>
    </>
  );
}
