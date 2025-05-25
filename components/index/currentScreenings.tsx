import { Typography } from "@mui/material";
import React from "react";

interface MovieTemplate {
  title: string;
  coverImage: string;
  time: string;
}

const CurrentScreenings: React.FC = async () => {
  const response = await fetch("http://localhost:3000/api/movies/showing");

  if (!response.ok) throw new Error("Failed to retrieve data!");

  const payload = await response.json();
  const movieData = payload.data;

  const dates: string[] = [];
  const movieScreenings: MovieTemplate[][] = [];

  const usedDates: number[] = [];

  let movieIndex: number = -1;

  for (let i = 0; i < movieData.length; i++) {
    const date = new Date(movieData[i].date);
    const monthDay = date.getDate();

    if (!usedDates.includes(monthDay)) {
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

  return (
    <>
      {dates.map((day: string, index: number) => (
        <Typography key={index} variant="h2">
          Filmer som visas {day}
        </Typography>
      ))}
    </>
  );
};

export default CurrentScreenings;
