"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@mui/material";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperButtons from "./SwiperButtons";
import Image from "next/image";

interface Movie {
  _id: string;
  title: string;
  sliderImage: string;
  genre: string;
  hour: number;
  minute: number;
}

const CarouselComponent: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const useFeaturedOnly = false; // True only shows movies from original design. False show all in API.

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies");
        const json = await res.json();

        if (useFeaturedOnly) {
          const featuredTitles = [
            "Psycho",
            "Studie i brott",
            "Singin' In The Rain",
          ];
          const filtered = json.data.filter((movie: Movie) =>
            featuredTitles.includes(movie.title)
          );
          setMovies(filtered);
        } else setMovies(json.data);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    }
    fetchMovies();
  }, [useFeaturedOnly]);

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
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        style={{ width: "100vw", maxWidth: "1280px" }}
        spaceBetween={0}
        slidesPerView={1}
        loop={movies.length > 2}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation, Autoplay]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "1280px",
                aspectRatio: "1280 / 554",
                margin: "auto",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <Image
                src={movie.sliderImage}
                alt={movie.title}
                fill
                style={{
                  objectFit: "cover",
                  borderRadius: "10px",
                  margin: "auto",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  padding: "16px",
                  boxSizing: "border-box",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#f1ddc5" }}>
                  {movie.title}
                </h2>
                <p style={{ margin: 0, color: "#f1ddc5" }}>
                  {movie.genre} | {movie.hour}h {movie.minute}min
                </p>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
        <SwiperButtons />
      </Swiper>
    </Box>
  );
};

export default CarouselComponent;
