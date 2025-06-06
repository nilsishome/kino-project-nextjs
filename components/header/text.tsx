import React from "react";
import { Box, Typography } from "@mui/material";
import { Yesteryear } from "next/font/google";

export const yesteryear = Yesteryear({ subsets: ["latin"], weight: "400" });

export default function Text() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        alignItems: "center",
        minWidth: "100%",
        marginBottom: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gridColumn: { xs: "2", sm: "1" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "yesteryear",
            fontWeight: "200",
            margin: "1rem 0 0 0",
            color: "#F2753B",
            fontSize: { xs: "6rem", sm: "3rem", md: "5rem" },
          }}
        >
          Retro
        </Typography>
        <Typography
          variant="body1"
          sx={{
            display: { xs: "none", sm: "block" },
            color: "#F1DDC5",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          - FILMER FRÅN FÖRR -
        </Typography>
      </Box>

      <Typography
        variant="h1"
        sx={{
          display: { xs: "none", sm: "block" },
          marginBottom: "1rem",
          color: "#F1DDC5",
          letterSpacing: "1rem",
          gridColumn: "2",
          justifySelf: "center",
        }}
      >
        VÄSTERÅS
      </Typography>
    </Box>
  );
}
