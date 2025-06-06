"use client";
import { Movie } from "@/types";
import MovieFilter from "../../../components/movies/MovieFilter";

import { Box, Typography } from "@mui/material";
import * as styles from "../styles/moviesPage.style";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
          throw new Error("Failed to retrieve data!");
        }

        const payload = await response.json();

        setMovies(payload.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Suspense fallback={<Typography>Laddar filmer...</Typography>}>
      <Box sx={styles.container}>
        <MovieFilter movies={movies} />
      </Box>
    </Suspense>
  );
}
