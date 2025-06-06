"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "@fortawesome/fontawesome-free/css/all.min.css"; // rullstol ikonen.

type Seat = {
  row: number;
  col: number;
  isTaken: boolean;
  isSelected: boolean;
  isWheelchair?: boolean;
};

const rows = 6;
const cols = 8;

type Props = {
  totalTickets: number;
  getSeatingData: (data: number[]) => void;
  occupiedSeats: number[];
};

export default function Seating({
  totalTickets,
  getSeatingData,
  occupiedSeats,
}: Props) {
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: rows * cols }, (_, index) => ({
      row: Math.floor(index / cols),
      col: index % cols,
      isTaken: false,
      isSelected: false,
      isWheelchair: index === 8 || index === 9,
    }))
  );
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    selectedSeats.sort();

    getSeatingData(selectedSeats);

    if (occupiedSeats) {
      seats.forEach((seat, index) => {
        occupiedSeats.map((value) => {
          if (index === value - 1) {
            seat.isTaken = true;
          }
        });
      });

      setSeats(seats);
    }
  }, [selectedSeats]);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Hjälpfunktion för att hämta en rad med platser
  const getRowSeats = (startIndex: number) => {
    const row = Math.floor(startIndex / cols);
    const startCol = startIndex % cols;
    if (startCol + totalTickets > cols) return [];
    const indices = [];
    for (let i = 0; i < totalTickets; i++) {
      const idx = row * cols + startCol + i;
      if (idx >= seats.length || seats[idx].row !== row || seats[idx].isTaken)
        return [];
      indices.push(idx);
    }
    return indices;
  };

  // När man klickar på en plats, välj hela raden om möjligt
  const handleSeatClick = (index: number) => {
    const indices = getRowSeats(index);
    if (indices.length !== totalTickets) return;
    setSeats((prevSeats) =>
      prevSeats.map((seat, i) =>
        indices.includes(i)
          ? { ...seat, isSelected: true }
          : { ...seat, isSelected: false }
      )
    );
    setSelectedSeats(indices);
  };

  // Förhandsvisa rad på hover
  const hoverRow = hoverIndex !== null ? getRowSeats(hoverIndex) : [];

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: 2,
        maxWidth: "fit-content",
        margin: "auto",
        mt: 15,
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        Filmduk
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 40px)`,
          gap: 1,
          margin: "2rem auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {seats.map((seat, index) => {
          const isHover = hoverIndex !== null && hoverRow.includes(index);

          return (
            <Button
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => handleSeatClick(index)}
              sx={{
                width: 25,
                height: 25,
                minWidth: 25,
                backgroundColor: seat.isTaken
                  ? "grey"
                  : seat.isSelected
                    ? "lightgreen"
                    : isHover
                      ? "#ffe082"
                      : seat.isWheelchair
                        ? "white"
                        : "lightgray",
                color: seat.isWheelchair ? "black" : "inherit",
                border: seat.isWheelchair ? "2px solid black" : "none",
                fontSize: 14,
                borderRadius: "50%",
                cursor: seat.isTaken ? "not-allowed" : "pointer",
                "&:hover": seat.isTaken
                  ? {}
                  : {
                      backgroundColor: "#ffe082",
                    },
              }}
              disabled={seat.isTaken}
            >
              {seat.isWheelchair ? (
                <i className="fa fa-wheelchair" style={{ fontSize: 14 }}></i>
              ) : null}
            </Button>
          );
        })}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "lightgreen",
            }}
          />
          <Typography variant="body2">Vald plats</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#ffe082",
            }}
          />
          <Typography variant="body2">Förhandsvisning rad</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "lightgray",
            }}
          />
          <Typography variant="body2">Ledig plats</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "gray",
            }}
          />
          <Typography variant="body2">Upptagen plats</Typography>
        </Box>
      </Box>
    </Box>
  );
}
