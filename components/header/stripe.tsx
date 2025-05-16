import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

export default function Stripe() {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
        position: "relative",
        minWidth: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          width: { sm: "210px", md: "240px", lg: "280px" },
          height: { sm: "150px", md: "170px", lg: "200px" },
        }}
      >
        <Image
          src="/popcorn_header.png"
          alt="Popcorn Header"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 210px, (max-width: 900px) 240px, 280px"
          priority={true}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "repeat(5, 2vh)",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Box sx={{ backgroundColor: "#F1DDC5" }}></Box>
        <Box sx={{ backgroundColor: "#F2753B" }}></Box>
        <Box sx={{ backgroundColor: "#C43C3A" }}></Box>
        <Box sx={{ backgroundColor: "#70A2AA" }}></Box>
      </Box>
    </Box>
  );
}
