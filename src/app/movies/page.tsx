import { Movie } from "@/types";
import MovieFilter from "../../../components/movies/MovieFilter";

import { Box } from "@mui/material";
import * as styles from "../styles/moviesPage.style";

export default async function Page() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve data!");
  }

  const payload = await response.json();
  const movies: Movie[] = payload.data;

  return (
    <Box sx={styles.container}>
      <MovieFilter movies={movies} />
    </Box>
  );
}
