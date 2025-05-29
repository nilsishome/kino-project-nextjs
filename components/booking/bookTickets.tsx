import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Movie } from "@/types";
import TicketCounter from "./components/TicketCounter";

type Props = {
  movie: Movie;
};

const BookTickets: React.FC<Props> = ({ movie }) => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [seniorPrice, setSeniorPrice] = useState(0);

  const ticketPrice = 120;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
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
            gridColumn: { xs: "1", sm: "1" },
          }}
        >
          <Typography variant="h2">{movie.title}</Typography>
          <Typography variant="body1">{movie.story}</Typography>
        </Box>

        <Box
          component="img"
          src={movie.coverImage}
          alt="Filmomslag"
          sx={{
            width: {
              xs: "50%",
              sm: "80%",
            },
            justifySelf: {
              xs: "start",
              sm: "end",
            },
            height: "auto",
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
            alignItems: {
              xs: "flex-start",
              sm: "flex-start",
            },
          }}
        >
          {adultCount !== 0 && (
            <Typography variant="body1">Vuxen {adultPrice} kr</Typography>
          )}
          {childCount !== 0 && (
            <Typography variant="body1">Barn {childPrice} kr</Typography>
          )}
          {seniorCount !== 0 && (
            <Typography variant="body1">
              Senior / Student {seniorPrice} kr
            </Typography>
          )}

          <Typography variant="body1">Summa:{adultPrice + childPrice + seniorPrice} kr</Typography>
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
              }}
              onDecrement={() => {
                setAdultCount((prev) => Math.max(prev - 1, 0))
                setAdultPrice((prev) => Math.max(prev - ticketPrice, 0))
              }}
            />
            <TicketCounter
              label="Barn"
              count={childCount}
              onIncrement={() => {
                setChildCount((prev) => prev + 1);
                setChildPrice((prev) => prev + ticketPrice / 2);
              }}
              onDecrement={() => {
                setChildCount((prev) => Math.max(prev - 1, 0))
                setChildPrice((prev) => Math.max(prev - ticketPrice / 2, 0))
              }}
            />
            <TicketCounter
              label="Senior / Student"
              count={seniorCount}
              onIncrement={() => {
                setSeniorCount((prev) => prev + 1);
                setSeniorPrice((prev) => prev + ticketPrice * 0.8);
              }}
              onDecrement={() => {
                setSeniorCount((prev) => Math.max(prev - 1, 0))
                setSeniorPrice((prev) => Math.max(prev - ticketPrice * 0.8, 0))
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gridColumn: "1 / -1",
          }}
        >
          <Button sx={{ border: "1px solid white", borderRadius: "16px" }}>
            Tillbaka
          </Button>
          <Button
            sx={{
              border: "1px solid white",
              borderRadius: "16px",
              width: "90px",
            }}
          >
            Fortsätt
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default BookTickets;
