import CarouselComponent from "../../components/index/carousel";
import { Typography, Box, Button } from "@mui/material";

import GiftSection from "../../components/index/giftSection";
import CurrentScreenings from "../../components/index/currentScreenings";

export default function Home() {
  return (
    <>
      <CarouselComponent />
      <CurrentScreenings />
      <GiftSection />
    </>
  );
}
