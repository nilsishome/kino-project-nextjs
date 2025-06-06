"use client";

import CarouselComponent from "../../components/index/carousel";
import FilteringSection from "../../components/index/FilteringSection";
import GiftSection from "../../components/index/giftSection";
import CurrentScreenings from "../../components/index/currentScreenings";

export default function Home() {
  return (
    <>
      <FilteringSection />
      <CarouselComponent />
      <CurrentScreenings />
      <GiftSection />
    </>
  );
}
