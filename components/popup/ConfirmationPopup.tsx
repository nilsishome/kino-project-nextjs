"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { BookingScreening } from "@/types";

type ConfirmationPopupProps = {
  paymentMethod: "Kort" | "Swish" | "På plats";
  screeningData: BookingScreening;
  totalTickets: number;
  selectedSeats: number[];
};

const mockedData = {
  bookingId: "123456",
  firstName: "Sigrid",
  lastName: "Ohlsson",
  tickets: 2,
  filmTitle: "Star Wars: Retro saga",
};

const filmDetails = {
  image: "/swish.png", // Temporary
  time: "19:30",
  salon: "Salong 3",
};

export default function ConfirmationPopup({
  paymentMethod,
  screeningData,
  totalTickets,
  selectedSeats,
}: ConfirmationPopupProps) {
  const data = mockedData;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        padding: "4rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" color="#f1ddc5" gutterBottom>
        Tack för din bokning!
      </Typography>
      <Typography variant="body1" color="#f1ddc5">
        {/* Shows dynamically chosen payment method */}
        Boknings-id: {screeningData._id} <br />
        Namn: {data.firstName} {data.lastName} <br />
        Antal biljetter: {totalTickets + 1} <br />
        Betalningsätt: {paymentMethod} <br />
      </Typography>
      {/* Film details */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: "500px",
          mt: 4,
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography variant="h6" color="#f1ddc5" gutterBottom>
            {screeningData.title}
          </Typography>
          <Typography variant="body2" color="#f1ddc5">
            Tid: {screeningData.time}:00 <br />
            Salong: {screeningData.saloon}
          </Typography>
        </Box>
        <Box
          component="img"
          src={screeningData.image}
          alt={screeningData.title}
          sx={{
            width: "100px",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
}
