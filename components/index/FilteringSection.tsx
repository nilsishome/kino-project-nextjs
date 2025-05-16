"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Box, Select, MenuItem, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";

const localTheme = createTheme({ 
  components: { 
    MuiButton: { 
      styleOverrides: { 
        root: { 
          border: "2px solid #f1ddc5",
          borderRadius: "8px",
          color: "#f1ddc5",
          backgroundColor: "inherit",
          "&:hover": { 
           backgroundColor: "#c43c3a",
          },
        },
      },
    },
  },
});

const genres = ["Thriller", "Komedi", "Äventyr", "Action", "Drama"];
const decades = ["50-tal", "60-tal", "70-tal", "80-tal", "90-tal", "00-tal", "10-tal"];
const filmTypes = ["Svartvit", "Färgfilm"];

export default function FilteringSection() {
  const [genre, setGenre] = useState("");
  const [search, setSearch] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <ThemeProvider theme={localTheme}>
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: "none",
        alignItems: "center"
      }}
    >
      <TextField
        placeholder="Sök"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ backgroundColor: "#f1ddc5", color: "#f1ddc5", borderRadius: "8px", width: isMobile ? "90%" : "50%", maxWidth: 400}}
      />
      {isMobile ? (
        // Dropdown mobile
        <>
          <Select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ bgcolor: "primary.color" }}
          >
            <MenuItem value="">Välj genre (Ingen vald)</MenuItem>
            {genres.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
            <Select>
              <MenuItem value="">Välj årtionde</MenuItem>
              {decades.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </Select>
              <Select> 
                <MenuItem value="">Svartvit</MenuItem>
                {filmTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
          </Select>
        </>
      ) : (
        //Desktop
        <>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
             {genres.map((g) => <Button key={g} variant="contained">{g}</Button>)}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {decades.map((d) => <Button key={d} variant="contained">{d}</Button>)}
          </Box>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            {filmTypes.map((type) => <Button key={type} variant="contained">{type}</Button>)}
          </Box>
        </>
      )}
    </Box>
    </ThemeProvider>
  );
}