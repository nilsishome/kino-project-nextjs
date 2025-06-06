"use client";

import { Box, Rating, Typography } from "@mui/material";
import Image from "next/image";

import { Movie, BookingScreening } from "@/types";
import Text from "../../../../components/movies/[movieId]/text";
import Popup from "../../../../layout/popup";
import Screenings from "../../../../components/movies/[movieId]/screenings";
import Reviews from "../../../../components/movies/[movieId]/reviews";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const [popupState, setPopupState] = useState<boolean>(false);
  const [movieState, setMovieState] = useState<Movie>();
  const [movieRating, setMovieRating] = useState<number>(0);
  const [screeningData, setScreeningData] = useState<BookingScreening>();
  

  useEffect(() => {
    const fetchData = async () => {
      const { movieId } = await params;

      try {
        const response = await fetch(
          `http://localhost:3000/api/movies/${movieId}`
        );
        if (!response.ok) throw new Error("Failed to retrieve data!");

        const payload = await response.json();
        setMovieState(payload.data);
        setMovieRating(payload.rating);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handlePopupState = (state: boolean) => {
    setPopupState(state);
  };

  const onScreeningClick = (screening: BookingScreening) => {
    let screeningArray = {
      title: movieState!.title,
      time: screening.time,
      date: screening.date,
      saloon: screening.saloon,
      _id: screening._id,
      image: movieState?.coverImage,
    };

    setScreeningData(screeningArray);

    handlePopupState(true);
  };

  if (movieState) {
    return (
      <>
        {!popupState ? (
          <>
            <Box
              sx={{
                width: "100vw",
                height: { xs: "45rem", sm: "47rem" },
                position: "relative",
                paddingBottom: "2%",
              }}
            >
              <Box
                sx={{
                  paddingTop: "6%",
                }}
              >
                <Image
                  alt="Poster image"
                  src={movieState!.coverImage}
                  width={300}
                  height={400}
                  style={{ margin: "0 0 1% 5%", display: "block" }}
                />
                <Text movie={movieState!} />{" "}
                {/* This is all the text for the hero */}
              </Box>
              <Image
                alt="Cover image"
                src={movieState!.sliderImage}
                fill
                style={{
                  objectFit: "cover",
                  filter: "brightness(30%)",
                  zIndex: "-1",
                }}
              />
            </Box>
            <Box
              sx={{
                backgroundColor: "#242424",
                width: "100%",
                minHeight: "10%",
                boxShadow: "0 0 20px 20px #242424",
              }}
            >
              <Rating
                sx={{ margin: "1% 0 0 5%", fontSize: "2.5rem" }}
                name="read-only"
                value={movieRating}
                precision={0.1}
                readOnly
              />

              <Box sx={{ maxWidth: { xs: "100%", sm: "45%" } }}>
                <Typography variant="h2" sx={{ margin: "2vh 0 0 4.5vw" }}>
                  Visningar
                </Typography>

                <Screenings
                  onScreeningClick={onScreeningClick}
                  movie={movieState!}
                />
              </Box>

              <Box>
                <Typography variant="h2" sx={{ margin: "2vh 0 0 4.5vw" }}>
                  Recensioner
                </Typography>

                <Reviews movie={movieState!} />
              </Box>
            </Box>
          </>
        ) : (
          <Popup
            movie={movieState}
            screeningData={screeningData!}
            handlePopupState={handlePopupState}
          />
        )}
      </>
    );
  }
}
