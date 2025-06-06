"use client";

import { ThemeProvider } from "@mui/material/styles";
// Update the import path below if your theme file is located elsewhere
import theme from "../theme";
import CarouselComponent from "../../components/index/carousel";
import FilteringSection from "../../components/index/FilteringSection";
import GiftSection from "../../components/index/giftSection";
import CurrentScreenings from "../../components/index/currentScreenings";

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <FilteringSection />
        <CarouselComponent />
        <CurrentScreenings />
        <GiftSection />
      </ThemeProvider>
    </>
  );
}
