import CarouselComponent from "../../components/index/carousel";
import { Typography, Box, Button } from "@mui/material";
import FilteringSection from "../../components/index/FilteringSection";


import GiftSection from "../../components/index/giftSection";

export default function Home() {
  return (
    <>

    <FilteringSection />
        <CarouselComponent /> 
      <GiftSection/>

    </>
  );
}
