"use client"

import React from 'react';
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import Image from 'next/image';
import { useTheme } from "@mui/material/styles";

export default function header() {
  const theme = useTheme();

  return (
    <Box sx={{
      height: "20vh",
      minWidth: "100%",
      position: "relative",
    }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center", minWidth: "100%", marginBottom: "1rem"}}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gridColumn: "1" }}>
          <Typography variant="h1" sx={{ margin: "1rem 0 0 0", color: "#F2753B", fontFamily: theme.typography.fonts?.yesteryear, fontSize: "5rem"}}>
            Retro
          </Typography>
          <Typography variant="body1" sx={{ color: "#F1DDC5", fontSize: "1rem", textAlign: "center" }}>
            - FILMER FRÅN FÖRR -
          </Typography>
        </Box>

        <Typography variant="h1" sx={{ marginBottom: "1rem", color: "#F1DDC5", letterSpacing: "1rem", gridColumn: "2", justifySelf: "center"}}>
          VÄSTERÅS
        </Typography>
      </Box>

      <Box sx={{ position: "relative", minWidth: "100%" }}>
        <Box sx={{
          position: "absolute", 
          top: "40%", 
          left: "50%",
          transform: "translate(-50%, -50%)", 
          zIndex: 2, 
        }}>
          <Image src="/popcorn_header.png" alt="Popcorn Header"
            width={300} 
            height={300} 
            layout="intrinsic"
            style={{ maxWidth: "100%", height: "auto" }} 
          />
        </Box>

        <Box sx={{
          display: "grid",
          gridTemplateRows: "repeat(5, 2vh)", 
          width: "100%",
          zIndex: 1, 
        }}>
          <Box sx={{ backgroundColor: "#F1DDC5" }}></Box>
          <Box sx={{ backgroundColor: "#F2753B" }}></Box>
          <Box sx={{ backgroundColor: "#C43C3A" }}></Box>
          <Box sx={{ backgroundColor: "#70A2AA" }}></Box>
        </Box>
      </Box>

      <ButtonGroup aria-label="Header button group"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "1rem",
          boxShadow: "none",
          "& .MuiButtonGroup-grouped": {
            border: "none",
          },
        }}
      >
        <Button sx={{ margin: "1rem", fontSize: "1.5rem"}}>START</Button>
        <Button sx={{ margin: "1rem", fontSize: "1.5rem"}}>FILMER</Button>
        <Button sx={{ margin: "1rem", fontSize: "1.5rem"}}>SERVERING</Button>
        <Button sx={{ margin: "1rem", fontSize: "1.5rem"}}>OM OSS</Button>
        <Button sx={{ margin: "1rem", fontSize: "1.5rem"}}>KONTAKT</Button>
        <Button sx={{ margin: "1rem", fontSize: "1.5rem"}}>ÖPPETTIDER</Button>
      </ButtonGroup>
    </Box>
  )
}
