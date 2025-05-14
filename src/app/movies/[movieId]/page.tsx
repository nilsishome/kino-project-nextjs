import { Box, Rating } from "@mui/material";
import Image from "next/image";

import { Movie } from "@/types";
import Text from "../../../../components/movies/[movieId]/text";

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const response = await fetch(`http://localhost:3000/api/movies/${movieId}`);

  if (!response.ok) {
    throw new Error("Failed to retrieve data!");
  }

  const payload = await response.json();
  const movie: Movie = payload.data;
  const rating: number = payload.rating;

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: { xs: "85vh", sm: "80vh" },
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
            src={movie.coverImage}
            width={300}
            height={400}
            style={{ margin: "0 0 1% 5%", display: "block" }}
          />
          <Text movie={movie} /> {/* This is all the text for the hero */}
        </Box>
        <Image
          alt="Cover image"
          src={movie.sliderImage}
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
          value={rating}
          precision={0.1}
          readOnly
        />
      </Box>
    </>
  );
}
