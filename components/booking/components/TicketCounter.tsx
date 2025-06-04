import React from "react";
import { Box, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type TicketCounterProps = {
    label: string;
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
  };
  
  const TicketCounter: React.FC<TicketCounterProps> = ({
    label,
    count,
    onIncrement,
    onDecrement,
  }) => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography>{label}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          gap: 4,
        }}
      >
        <RemoveCircleOutlineIcon
          sx={{ fontSize: "30px", cursor: "pointer" }}
          onClick={onDecrement}
        />
        <Typography sx={{ minWidth: "20px", textAlign: "center" }}>{count}</Typography>
        <AddCircleOutlineIcon
          sx={{ fontSize: "30px", cursor: "pointer" }}
          onClick={onIncrement}
        />
      </Box>
    </Box>
  );

  export default TicketCounter;