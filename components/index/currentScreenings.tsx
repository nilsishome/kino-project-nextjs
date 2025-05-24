import { Typography } from "@mui/material";
import React from "react";

const CurrentScreenings: React.FC = async () => {
  const response = await fetch("http://localhost:3000/api/movies/showing");

  if (!response.ok) throw new Error("Failed to retrieve data!");

  const payload = await response.json();
  const movies = payload.data;

  console.log(movies);

  const dates: string[] = [];
  const usedDates: number[] = [];

  for (let i = 0; i < movies.length; i++) {
    const date = new Date(movies[i].date);
    const monthDay = date.getDate();

    if (!usedDates.includes(monthDay)) {
      const weekDay = date.toLocaleString("sv-SV", { weekday: "long" });
      const month = date.getMonth() + 1;

      const screening = `${weekDay}, ${monthDay}/${month}`;

      dates.push(screening);
      usedDates.push(monthDay);
    }
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
