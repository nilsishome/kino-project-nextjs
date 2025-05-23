"use client";

import { useSearchParams } from "next/navigation";
import { Movie } from "@/types";
import Link from "@mui/material/Link";
import * as styles from "@/app/movies/moviesPage.style";
import { Box, Typography, CardMedia } from "@mui/material";

const MovieFilter = ({ movies }: { movies: Movie[] }) => {
  const searchParams = useSearchParams();

  const genre = searchParams.get("genre") || "";
  const decade = searchParams.get("decade") || "";
  const filmType = searchParams.get("filmType") || "";
  const search = searchParams.get("search") || "";

  const filteredMovies = movies.filter((movie) => { 
    const matches =
      (!genre || movie.genre.toLowerCase() === genre.toLowerCase()) &&
      (!decade || movie.decade.toString() === decade) &&
      (!filmType ||
        (filmType === "Svartvit"
          ? movie.color === false
          : movie.color === true)) &&
      (!search ||
        movie.title.toLowerCase().includes((search as string).toLowerCase()));

return matches; 
  });

  const moviesToRender = filteredMovies;

  return (
    <Box sx={styles.container}>
      {moviesToRender.length > 0 ? (
      <>
      <Typography sx={styles.title}>Movies</Typography>
      <Box sx={styles.list}>
      
        {moviesToRender.map((movie) => (
          <Box key={movie._id} sx={styles.listItem}>
            <Link href={`/movies/${movie._id}`}>
            <CardMedia
              component="img"
              image={movie.coverImage}
              alt={movie.title}
              style={styles.image}
            />
  <Typography sx={styles.titleText}>{movie.title}</Typography>
                </Link>
              </Box>
        ))}
        </Box>
        </>
      ) : (
        <Typography variant="h6">Inga filmer matchar din filtrering</Typography>
      )}
    </Box>
  );
};

export default MovieFilter;
