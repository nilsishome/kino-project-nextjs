"use client";

import Lottie from "lottie-react";
import popCornAnimation from "../../public/animations/PopcornAnimation.json";
import { Box } from "@mui/material";

export default function Animation404() {
  return (
    <Box sx={{ width: 300, height: 300 }}>
      <Lottie animationData={popCornAnimation} loop autoplay />
    </Box>
  );
}
