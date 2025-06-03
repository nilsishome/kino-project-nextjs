"use client";


import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "@fortawesome/fontawesome-free/css/all.min.css"; //rullstol ikonen.



type Seat = {
  row: number;
  col: number;
  isTaken: boolean;
  isSelected: boolean;
  isWheelchair?: boolean;
};

//48 sittplatser
const rows = 6;
const cols = 8;

export default function Seating() {
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: rows * cols }, (_, index) => ({   //En array för alla sittplatser.
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
            backgroundColor: seat.isTaken   //olika färger utifrån status på sittplats.
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
        
        {seat.isWheelchair ? <i className="fa fa-wheelchair" style={{ fontSize: 14 }}></i> : null}

        </Button>
      ))}
    </Box>


    <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 3 }}>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box sx={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "lightgreen" }} />
    <Typography variant="body2">Vald plats</Typography>
  </Box>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box sx={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "lightgray" }} />
    <Typography variant="body2">Ledig plats</Typography>
  </Box>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box sx={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "gray" }} />
    <Typography variant="body2">Upptagen plats</Typography>
  </Box>
</Box>
  
  </Box>

  );
}
