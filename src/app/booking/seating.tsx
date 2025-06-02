"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Popup from "../../../layout/popup";


type Seat = {
  row: number;
  col: number;
  isTaken: boolean;
  isSelected: boolean;
  isWheelchair?: boolean;
};

const rows = 6;
const cols = 8;

export default function Seating() {
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: rows * cols }, (_, index) => ({
      row: Math.floor(index / cols),
      col: index % cols,
      isTaken: false,
      isSelected: false,
      isWheelchair: index === 8 || index === 9,
    }))

  );

  const handleSeatClick = (index: number) => {
    setSeats((prev) =>
      prev.map((seat, i) =>
        i === index && !seat.isTaken
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  };



  return (
   
   <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: 2,
        maxWidth: "fit-content",
        margin: "2rem auto",
      }}
    >


    <Typography
      variant="h6"
      align="center"
      sx={{ marginTop: 2, marginBottom: 2 }}
    >
      Filmduk
    </Typography>


    <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 40px)`, gap: 1, margin: "2rem auto", justifyContent: "center", alignItems: "center"  }}>
      {seats.map((seat, index) => (
        <Button
          key={index}
          onClick={() => handleSeatClick(index)}
          sx={{
            width: 25,
            height: 25,
            minWidth: 25,
            backgroundColor: seat.isTaken
              ? "grey"
              : seat.isSelected
              ? "lightgreen"
              : seat.isWheelchair
              ? "white"
              : "lightgray",
            color: seat.isWheelchair ? "black" : "inherit",
            border: seat.isWheelchair ? "2px solid black" : "none",
            fontSize: 14,
            borderRadius: "50%",
            cursor: seat.isTaken ? "not-allowed" : "pointer", //grön markör för lediga platser
            "&:hover": seat.isTaken
              ? {} // Ingen grön hover på upptagna platser
              : {
                  backgroundColor: "lightgreen", 
                },

          }}
        >
          {seat.isWheelchair ? "♿" : ""}
        </Button>
      ))}
    </Box>

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 3,
        maxWidth: "400px",
        marginX: "auto",
      }}
    >

    </Box>
  
  </Box>

  );
}
