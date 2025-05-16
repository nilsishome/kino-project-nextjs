"use client";
import {
  Box,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

export default function FilteringSection() {
  const [genre, setGenre] = useState("");
  const [search, setSearch] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: "none",
      }}
    >
      {isMobile ? (
        // Dropdown
        <Select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ bgcolor: "primary.color" }}
        >
          {/* <Typography sx={{bgcolor: "#none"}}>  */}
          <MenuItem value="">Välj genre (Ingen vald)</MenuItem>
          <MenuItem value="Thriller">Thriller</MenuItem>
          <MenuItem value="Komedi">Komedi</MenuItem>
          <MenuItem value="Äventyr">Äventyr</MenuItem>
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          {/* </Typography> */}
        </Select>
      ) : (
        //Desktop
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
          {["Thriller", "Komedi", "Äventyr", "Action", "Drama"].map((genre) => (
            <Button
              key={genre}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              {genre}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
