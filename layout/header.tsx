"use client";

import React, { useState } from "react";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import Image from "next/image";
import Text from "../components/header/text";
import Stripe from "../components/header/stripe";
import Nav from "../components/header/nav";
import PhoneNav from "../components/header/phoneNav";

export default function header() {
  const [phoneNavState, setPhoneNavState] = useState<boolean>(false);

  const handlePhoneNavState = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPhoneNavState((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minWidth: "100%",
        position: "relative",
      }}
    >
      <Text />

      <PhoneNav navToggle={phoneNavState} onNavToggle={handlePhoneNavState} />

      <Stripe />

      <Nav />
    </Box>
  );
}
