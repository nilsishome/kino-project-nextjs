"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { Movie, BookingScreening } from "@/types";

type Props = {
  movie: Movie;
  onScreeningClick: (screening: BookingScreening) => void;
};

const Screenings: React.FC<Props> = ({ movie, onScreeningClick }) => {
  const [availableScreenings, setAvailableScreenings] = useState<
    BookingScreening[]
  >([]);
  function retrieveDayFromDate(date: Date) {
    const fixedDate = new Date(date);
    const dayOfWeek = fixedDate.toLocaleString("sv-SV", { weekday: "long" });
    const dayOfMonth = fixedDate.getDate();
    let month = fixedDate.getMonth();
    month++;

    return dayOfWeek.substring(0, 3) + " " + dayOfMonth + "/" + month;
  }

  useEffect(() => {
    const screeningArray: BookingScreening[] = [];
    const date = new Date();
    movie.screenings.forEach((screening) => {
      const screeningDate = new Date(screening.date);

      if (date.getTime() < screeningDate.getTime()) {
        screeningArray.push(screening);
      }
    });

    setAvailableScreenings(screeningArray);
  }, [movie.screenings]);

  return (
    <>
      <List sx={{ marginLeft: "4vw" }}>
        {availableScreenings.map((screening, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Grid
                container
                spacing={3}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: "100%",
                }}
              >
                <Grid size={3}>
                  <Typography variant="body1">
                    {retrieveDayFromDate(screening.date)}
                  </Typography>
                </Grid>
                <Grid size={3}>
                  <Typography
                    variant="body1"
                    sx={{
                      padding: "3px",
                      maxWidth: "fit-content",
                      borderBlock: "2px solid gray",
                    }}
                  >
                    {screening.time}:00
                  </Typography>
                </Grid>
                <Grid size={3}>
                  <Typography variant="body1">{screening.saloon}</Typography>
                </Grid>
                <Grid size={3}>
                  <Button
                    onClick={() => onScreeningClick(screening)}
                    variant="text"
                  >
                    Boka
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            <Divider
              sx={{
                background: "gray",
                width: "100%",
              }}
            />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default Screenings;
