"use client";

import { Typography, Box, Button } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import CarouselComponent from "../../components/index/carousel";
import UserButton from "@/components/ui/userButton";

import GiftSection from "../../components/index/giftSection";

export default function Home() {
  return (
    <>
      <CarouselComponent />
      <GiftSection />
    </>
  );
}
