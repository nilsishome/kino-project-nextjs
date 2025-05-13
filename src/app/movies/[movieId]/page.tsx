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

  return (
    <Box
      sx={{
        width: "100vw",
        height: "80vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          padding: "6% 0 0 5%",
        }}
      >
        <Image
          alt="Poster image"
          src={movie.coverImage}
          width={300}
          height={400}
          style={{ marginBottom: "2%" }}
        />
        <Text movie={movie} /> {/* This is all the text for the hero */}
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
          value={3.5}
          precision={0.1}
          readOnly
        />
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
  );
}
