import React from "react";
import { Typography } from "@mui/material";
import { Movie } from "@/types";

type Props = {
  movie: Movie;
};

const Text: React.FC<Props> = ({ movie }) => {
  return (
    <>
      <Typography variant="h1" sx={{ marginBottom: "1rem" }}>
        {movie.title}{" "}
        <Typography
          variant="body1"
          sx={{
            display: "inline",
            fontWeight: "600",
            fontSize: "1.4rem",
          }}
        >
          ({movie.release})
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: "0.5%", fontSize: "0.95rem", color: "#adadad" }}
      >
        {movie.genre}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: "600", width: "50%", paddingBottom: "1.5%" }}
      >
        {movie.story}
      </Typography>
    </>
  );
};

export default Text;
