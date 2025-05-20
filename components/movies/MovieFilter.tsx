"use client"; 

import { useSearchParams } from "next/navigation"; 
import { Movie } from "@/types";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material"; 

const MovieFilter = ({ movies }: { movies: Movie[] }) => { 
const searchParams = useSearchParams();
// const { genre, decade, filmType, search } = router.query;
const genre = searchParams.get("genre") || "";
  const decade = searchParams.get("decade") || "";
  const filmType = searchParams.get("filmType") || "";
  const search = searchParams.get("search") || "";

console.log("Mottagna query-parametrar: ", { genre, decade, filmType, search });

const filteredMovies = movies.filter(movie => 
(!genre || movie.genre.toLowerCase() === genre.toLowerCase()) &&
(!decade || movie.decade === decade) && 
(!filmType || (filmType === "Svartvit" ? movie.color === false: movie.color === true)) && 
(!search || movie.title.toLowerCase().includes((search as string).toLowerCase()))
);

return ( 
  <Box>
    {filteredMovies.length > 0 
    ? filteredMovies.map((movie) => <Box key={movie._id}>{movie.title}</Box>) 
    : movies.map((movie) => <Box key={movie._id}>{movie.title}</Box>)}
  
  </Box>
  // setFilteredMovies(filteredMovies);

  // return null; 

 );
};
    // <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
    //   {filteredMovies.length > 0 ? (
    //      filteredMovies.map(movie => (
       
    //       <Card key={movie._id} sx={{ width: 250 }}>
    //         <CardMedia
    //           component="img"
    //           height="140"
    //           image={movie.coverImage}
    //           alt={movie.title}
    //         />
    //         <CardContent>
    //           <Typography variant="h6">{movie.title}</Typography>
    //           <Typography variant="body2">
    //             {movie.genre} ({movie.decade}) {movie.color ? "Färgfilm" : "Svartvit"}
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     ))
    //   ) : movies.length > 0 ? ( 
    //     movies.map(movie => ( 
    //       <Card key={movie._id} sx={{ width: 250 }}>
    //       <CardMedia
    //         component="img"
    //         height="140"
    //         image={movie.coverImage}
    //         alt={movie.title}
    //       />
    //       <CardContent>
    //         <Typography variant="h6">{movie.title}</Typography>
    //         <Typography variant="body2">
    //           {movie.genre} ({movie.decade}) {movie.color ? "Färgfilm" : "Svartvit"}
    //         </Typography>
    //       </CardContent>
    //     </Card>
    //   ))
      
    //   ) : (


    // Kanske kan behålla ? 
        // <Typography variant="h6">Inga filmer matchar din filtrering.</Typography>
      // )}
    // </Box>
  


export default MovieFilter;
