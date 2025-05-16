import Link from "next/link";
import { Movie } from "@/types";
import { Box, Typography } from "@mui/material";
import * as styles from "./moviesPage.style";

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/movies");

  if (!response.ok) {
    throw new Error("Failed to retrieve data!");
  }

  const payload = await response.json();
  const movies: Movie[] = payload.data;

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Movies</Typography>
      <Box sx={styles.list}>
        {movies.map((movie) => (
          <Box key={movie._id} sx={styles.listItem}>
            <Link href={`/movies/${movie._id}`}>
              <img
                src={movie.coverImage}
                alt={movie.title}
                style={styles.image}
              />
              <Typography sx={styles.titleText}>{movie.title}</Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
