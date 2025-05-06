"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Button} from "@mui/material";
import { useRef } from "react";

const images = [
  "/psycho.jpg",
  "/singing in the rain.jpg",
  "/studie i brott.jpg",
];

const CarouselComponent: React.FC = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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
        {/* Left button */}
        <Button 
        className="swiper-button-prev"
        ref={prevRef}
        sx={{
          position: "absolute",
          left: "20px", 
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.6)"
        }}
        >
          ⬅
        </Button>
      <Swiper style= {{ width: "100vw", maxWidth: "1280px" }} spaceBetween={0} slidesPerView={1} loop>
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img
              src={image}
              alt="Slide"
              style={{
                width: "100%",
                maxWidth: "1280px",
                height: "auto",
                aspectRatio: "1280/554",
                objectFit: "cover",
                margin: "auto",
                borderRadius: "10px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

       {/* Right button */}
       <Button
        className="swiper-button-next"
        ref={nextRef}
        sx={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.6)"
        }}
      >
        ➡
      </Button>
    </Box>
  );
};

export default CarouselComponent;
