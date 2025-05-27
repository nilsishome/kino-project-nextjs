import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import { MovieScreening } from "@/types";

// This is a server component for rendering movie screenings on the home page.

const CurrentScreenings: React.FC = async () => {
  const response = await fetch("http://localhost:3000/api/movies/showing");

  if (!response.ok) throw new Error("Failed to retrieve data!");

  const payload = await response.json();
  const movieData: MovieScreening[] = payload.data;

  const dates: string[] = [];
  const movieScreenings: MovieScreening[][] = [];

  sortScreenings(movieData, dates, movieScreenings);

  return (
    <>
      {dates.map((day: string, dateIndex: number) => (
        <Box key={dateIndex}>
          <Typography
            variant="h2"
            sx={{
              margin: "1rem 1rem",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Filmer som visas {day}
          </Typography>
          <Divider
            variant="middle"
            sx={{ bgcolor: "#f1ddc5", marginBottom: 2 }}
          />
          <List sx={{ display: "flex", overflow: "auto" }}>
            {movieScreenings[dateIndex].map(
              (movie: MovieScreening, listIndex: number) => (
                <ListItem
                  key={listIndex}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#f1ddc5",
                    width: "fit-content",
                  }}
                >
                  <Image
                    alt={`Filmposter av ${movie.title}`}
                    src={movie.coverImage}
                    width={150}
                    height={220}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      marginTop: 2,
                      fontWeight: 600,
                      width: 150,
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "center", marginTop: 1, marginBottom: 4 }}
                  >
                    {movie.time}:00
                  </Typography>
                </ListItem>
              )
            )}
          </List>
        </Box>
      ))}
    </>
  );
};

// Algorithm for sorting movies and dates into 2 arrays
function sortScreenings(
  movieData: MovieScreening[],
  dates: string[],
  movieScreenings: MovieScreening[][]
) {
  const usedDates: number[] = [];

  let movieIndex: number = -1;

  for (let i = 0; i < movieData.length; i++) {
    const date = new Date(movieData[i].date!);
    const monthDay = date.getDate();

    if (!usedDates.includes(monthDay)) {
      // Initialize new date
      const weekDay = date.toLocaleString("sv-SV", { weekday: "long" });
      const month = date.getMonth() + 1;

      const screening = `${weekDay}, ${monthDay}/${month}`;

      dates.push(screening);
      usedDates.push(monthDay);

      movieIndex++;
      movieScreenings[movieIndex] = []; // Initialize new array for new date
    }

    const movie = {
      title: movieData[i].title,
      coverImage: movieData[i].coverImage,
      time: movieData[i].time,
    };

    movieScreenings[movieIndex].push(movie);
  }
}

export default CurrentScreenings;
