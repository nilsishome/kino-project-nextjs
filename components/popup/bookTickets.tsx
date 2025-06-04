import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Movie } from "@/types";
import TicketCounter from "./components/TicketCounter";

type Props = {
  movie: Movie;
  getTotalTickets: (totalSum: number) => void;
};

const BookTickets: React.FC<Props> = ({ movie, getTotalTickets }) => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [seniorPrice, setSeniorPrice] = useState(0);

  const ticketPrice = 120;

  const sumOfTickets = () => {
    let totalSum = adultCount + childCount + seniorCount;

    if (totalSum <= 0) {
      return;
    }

    getTotalTickets(totalSum);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "2fr 1fr 1fr",
          },
          gridAutoRows: "auto",
          gap: 2,
          width: "95%",
          margin: "20px auto",
        }}
      >
        <Box
          sx={{
            gridColumn: { xs: "1", sm: "1 / span 1" },
            display: "flex",
            alignItems: "start",
            maxHeight: "20vh",
            gap: 2,
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: "1", sm: "1" },
            }}
          >
            <Typography variant="h2">{movie.title}</Typography>
            <Typography variant="body1">{movie.story}</Typography>
          </Box>
        </Box>
        <Box
          component="img"
          src={movie.coverImage}
          alt="Filmomslag"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            width: "auto",
            height: { xs: "40%", sm: "70%" },
            justifySelf: {
              xs: "start",
              sm: "end",
            },

            gridColumn: { xs: "1", sm: "2" },
          }}
        />

        <Box
          sx={{
            borderRadius: "16px",
            backgroundColor: "#374B54",
            height: "20vh",
            padding: 2,
            color: "white",
            gridColumn: {
              xs: "1",
              sm: "3",
            },
            gridRow: {
              xs: "5",
              sm: "1",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              width: "100%",
            }}
          >
            {adultCount !== 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Vuxen</Typography>
                <Typography variant="body1">{adultPrice} kr</Typography>
              </Box>
            )}
            {childCount !== 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Barn</Typography>
                <Typography variant="body1">{childPrice} kr</Typography>
              </Box>
            )}
            {seniorCount !== 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Senior / Student</Typography>
                <Typography variant="body1">{seniorPrice} kr</Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h3">Summa:</Typography>
            <Typography>{adultPrice + childPrice + seniorPrice} kr</Typography>
          </Box>
        </Box>

        <Button
          sx={{
            border: "1px solid white",
            borderRadius: "16px",
            width: "100%",
            height: "5vh",
            gridColumn: {
              xs: "1",
              sm: "1 / 3",
            },
          }}
        >
          Logga in
        </Button>

        <Box
          sx={{
            border: "1px solid white",
            borderRadius: "16px",
            padding: 2,
            gridColumn: {
              xs: "1",
              sm: "1 / 3",
            },
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            Välj antal biljetter
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TicketCounter
              label="Vuxen"
              count={adultCount}
              onIncrement={() => {
                setAdultCount((prev) => prev + 1);
                setAdultPrice((prev) => prev + ticketPrice);
                sumOfTickets();
              }}
              onDecrement={() => {
                setAdultCount((prev) => Math.max(prev - 1, 0));
                setAdultPrice((prev) => Math.max(prev - ticketPrice, 0));
                sumOfTickets();
              }}
            />
            <TicketCounter
              label="Barn"
              count={childCount}
              onIncrement={() => {
                setChildCount((prev) => prev + 1);
                setChildPrice((prev) => prev + ticketPrice / 2);
                sumOfTickets();
              }}
              onDecrement={() => {
                setChildCount((prev) => Math.max(prev - 1, 0));
                setChildPrice((prev) => Math.max(prev - ticketPrice / 2, 0));
                sumOfTickets();
              }}
            />
            <TicketCounter
              label="Senior / Student"
              count={seniorCount}
              onIncrement={() => {
                setSeniorCount((prev) => prev + 1);
                setSeniorPrice((prev) => prev + ticketPrice * 0.8);
                sumOfTickets();
              }}
              onDecrement={() => {
                setSeniorCount((prev) => Math.max(prev - 1, 0));
                setSeniorPrice((prev) => Math.max(prev - ticketPrice * 0.8, 0));
                sumOfTickets();
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BookTickets;
