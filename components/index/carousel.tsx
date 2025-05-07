"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Button } from "@mui/material";
// import { useRef } from "react";
import { Navigation } from "swiper/modules";

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

            {/* Left button */}
            <Button
              className="swiper-button-prev"
              sx={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid white",
              }}
            >
              ⬅
            </Button>

            {/* Right button */}
            <Button
              className="swiper-button-next"
              sx={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid white",
              }}
            >
              ➡
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CarouselComponent;
