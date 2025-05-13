import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function GiftSection() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f1ddc5",
      }}
    >
      <Typography
        sx={{
          padding: 1,
        }}
        variant="h1"
      >
        BIOGÅVA
      </Typography>
      <Typography
        sx={{
          padding: 8,
        }}
        variant="body1"
      >
        En biogåva är ett fint sätt att visa uppskattning - till någon du tycker
        om, jobbar med eller vill fira.
        <br />
        Istället för en sak, ger du något med känsla och mening.
      </Typography>
      <Button
        sx={{
          color: "#000",
          padding: 0.5,
          marginBottom: 1,
        }}
        variant="outlined"
      >
        Köp gåva
      </Button>
    </Box>
  );
}
