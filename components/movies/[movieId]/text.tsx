import React from "react";
import { Typography } from "@mui/material";
import { Movie } from "@/types";

type Props = {
  movie: Movie;
};

const Text: React.FC<Props> = ({ movie }) => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          margin: { xs: "5% 0 2% 5%", sm: "0 0 1% 5%" },
          fontSize: { xs: "2rem", sm: "3rem" },
        }}
      >
        {movie.title}{" "}
        <Typography
          variant="body1"
          sx={{
            display: "inline",
            fontWeight: "600",
            fontSize: { xs: "1.2rem", sm: "1.4rem" },
          }}
        >
          ({movie.release})
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          margin: "0 0 0.5% 5%",
          fontSize: "0.95rem",
          color: "#adadad",
        }}
      >
        {movie.genre}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "600",
          width: { xs: "90%", sm: "70%", md: "50%" },
          paddingBottom: "1.5%",
          marginLeft: "5%",
        }}
      >
        {movie.story}
      </Typography>
    </>
  );
};

export default Text;
