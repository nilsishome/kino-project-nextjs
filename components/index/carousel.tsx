"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@mui/material";
import { Navigation } from "swiper/modules";
import SwiperButtons from "./SwiperButtons";
const images = [
  "/psycho.jpg",
  "/singing in the rain.jpg",
  "/studie i brott.jpg",
 
];

const CarouselComponent: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Swiper
        style={{ width: "100vw", maxWidth: "1280px" }}
        spaceBetween={0}
        slidesPerView={1}
        loop
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img
              src={image}
              alt="Slide"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "1280px",
                height: "auto",
                aspectRatio: "1280/554",
                objectFit: "cover",
                margin: "auto",
                borderRadius: "10px",
              }}
            />
    <SwiperButtons />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CarouselComponent;
