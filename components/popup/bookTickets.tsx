import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Movie } from "@/types";
import TicketCounter from "./components/TicketCounter";
import LoginForm from "./LoginForm";
import { toast } from "sonner";

type Props = {
  movie: Movie;
  getTotalTickets: (totalSum: number) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  adultCount: number;
  setAdultCount: React.Dispatch<React.SetStateAction<number>>;
  childCount: number;
  setChildCount: React.Dispatch<React.SetStateAction<number>>;
  seniorCount: number;
  setSeniorCount: React.Dispatch<React.SetStateAction<number>>;
};

const BookTickets: React.FC<Props> = ({
  movie,
  getTotalTickets,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  seniorCount,
  setSeniorCount,
}) => {
  const ticketPrice = 120;

  const adultPrice = adultCount * ticketPrice;
  const childPrice = childCount * (ticketPrice / 2);
  const seniorPrice = seniorCount * (ticketPrice * 0.8);

  const totalPrice = adultPrice + childPrice + seniorPrice;
  const discount = isLoggedIn ? Math.round(totalPrice * 0.2) : 0;
  const totalAfterDiscount = totalPrice - discount;

  useEffect(() => {
    getTotalTickets(adultCount + childCount + seniorCount);
  }, [adultCount, childCount, seniorCount]);

  // console.log("adultCount:", adultCount, "childCount:", childCount, "seniorCount:", seniorCount, "totalPrice:", totalPrice);

  const sumOfTickets = () => {
    let totalSum = adultCount + childCount + seniorCount;

    if (totalSum <= 0) return;

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
            height: "30vh",
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
            {/* Visar rabatt om inloggad */}
            {isLoggedIn && discount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">Rabatt (20%)</Typography>
                <Typography variant="body1"> -{discount} kr</Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 1,
            }}
          >
            <Typography variant="h3">Summa:</Typography>
            <Typography>{totalAfterDiscount} kr</Typography>
          </Box>
        </Box>

        {/* Logga in-knapp endast om man inte är inloggad */}
        {!isLoggedIn && (
          <>
            <Button
              sx={{
                width: "100%",
                height: "5vh",
                gridColumn: {
                  xs: "1",
                  sm: "1 / 3",
                },
                mb: 1,
              }}
              onClick={onLoginClick}
              variant="outlined"
            >
              Logga in
            </Button>
            <Button
              sx={{
                border: "1px solid white",
                borderRadius: "7px",
                width: "100%",
                height: "5vh",
                gridColumn: {
                  xs: "1",
                  sm: "1 / 3",
                },
              }}
              onClick={onRegisterClick}
              variant="outlined"
            >
              Registrera
            </Button>
          </>
        )}

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
                //setAdultPrice((prev) => prev + ticketPrice);
                sumOfTickets();
              }}
              onDecrement={() => {
                setAdultCount((prev) => Math.max(prev - 1, 0));
                //setAdultPrice((prev) => Math.max(prev - ticketPrice, 0));
                sumOfTickets();
              }}
            />
            <TicketCounter
              label="Barn"
              count={childCount}
              onIncrement={() => {
                setChildCount((prev) => prev + 1);
                //setChildPrice((prev) => prev + ticketPrice / 2);
                sumOfTickets();
              }}
              onDecrement={() => {
                setChildCount((prev) => Math.max(prev - 1, 0));
                //setChildPrice((prev) => Math.max(prev - ticketPrice / 2, 0));
                sumOfTickets();
              }}
            />
            <TicketCounter
              label="Senior / Student"
              count={seniorCount}
              onIncrement={() => {
                setSeniorCount((prev) => prev + 1);
                //setSeniorPrice((prev) => prev + ticketPrice * 0.8);
                sumOfTickets();
              }}
              onDecrement={() => {
                setSeniorCount((prev) => Math.max(prev - 1, 0));
                //setSeniorPrice((prev) => Math.max(prev - ticketPrice * 0.8, 0));
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
