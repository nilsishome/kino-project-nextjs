import { useState } from "react";
import { Box, Tooltip } from "@mui/material";

// Typ för ett säte
type Seat = {
  row: number;
  seat: number;
  booked: boolean;
};

type Props = {
  rows: number;
  seatsPerRow: number;
  bookedSeats: { row: number; seat: number }[];
  numTickets: number;
  onSelect: (selected: { row: number; seat: number }[]) => void;
};

export default function SeatMap({ rows, seatsPerRow, bookedSeats, numTickets, onSelect }: Props) {
  // Håller koll på valda säten
  const [selected, setSelected] = useState<{ row: number; seat: number }[]>([]);

  // Hjälpfunktion för att kolla om ett säte är bokat
  const isBooked = (row: number, seat: number) =>
    bookedSeats.some(s => s.row === row && s.seat === seat);

  // Hjälpfunktion för att kolla om ett säte är valt
  const isSelected = (row: number, seat: number) =>
    selected.some(s => s.row === row && s.seat === seat);

  // Kolla om det är tillåtet att välja dessa säten (ingen ensam stol mellan bokningar)
  function canSelect(row: number, startSeat: number) {
    // Kolla att alla säten är lediga
    for (let i = 0; i < numTickets; i++) {
      if (isBooked(row, startSeat + i)) return false;
    }
    // Kolla att vi inte lämnar ett ensamt ledigt säte till vänster
    if (
      startSeat > 1 &&
      !isBooked(row, startSeat - 1) &&
      !isBooked(row, startSeat - 2) &&
      !selected.some(s => s.row === row && s.seat === startSeat - 1)
    ) {
      return false;
    }
    // Kolla att vi inte lämnar ett ensamt ledigt säte till höger
    if (
      startSeat + numTickets <= seatsPerRow &&
      !isBooked(row, startSeat + numTickets) &&
      !isBooked(row, startSeat + numTickets + 1) &&
      !selected.some(s => s.row === row && s.seat === startSeat + numTickets)
    ) {
      return false;
    }
    return true;
  }

  // När användaren hovrar över ett säte
  function handleHover(row: number, seat: number) {
    if (seat + numTickets - 1 > seatsPerRow) return;
    if (!canSelect(row, seat)) return;
    const newSelection = Array.from({ length: numTickets }, (_, i) => ({
      row,
      seat: seat + i,
    }));
    setSelected(newSelection);
    onSelect(newSelection);
  }

  // När användaren klickar på ett säte
  function handleClick(row: number, seat: number) {
    if (seat + numTickets - 1 > seatsPerRow) return;
    if (!canSelect(row, seat)) return;
    const newSelection = Array.from({ length: numTickets }, (_, i) => ({
      row,
      seat: seat + i,
    }));
    setSelected(newSelection);
    onSelect(newSelection);
  }

  return (
    <Box>
      {Array.from({ length: rows }, (_, rowIdx) => (
        <Box key={rowIdx} sx={{ display: "flex", mb: 1 }}>
          {Array.from({ length: seatsPerRow }, (_, seatIdx) => {
            const row = rowIdx + 1;
            const seat = seatIdx + 1;
            const booked = isBooked(row, seat);
            const selectedSeat = isSelected(row, seat);
            return (
              <Tooltip key={seatIdx} title={`Rad ${row}, Säte ${seat}`}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: booked
                      ? "#c43c3a"
                      : selectedSeat
                      ? "#22c55e"
                      : "#1A323C",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: 0.5,
                    cursor: booked ? "not-allowed" : "pointer",
                    border: "2px solid #f1ddc5",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={() => handleHover(row, seat)}
                  onClick={() => handleClick(row, seat)}
                >
                  {seat}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}