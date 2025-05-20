"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import { useRouter } from "next/navigation";

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

const genres: string[] = ["Thriller", "Komedi", "Äventyr", "Action", "Drama"];
const decades: string[] = [
  "50-tal",
  "60-tal",
  "70-tal",
  "80-tal",
  "90-tal",
  "00-tal",
  "10-tal",
];
const filmTypes: string[] = ["Svartvit", "Färgfilm"];

export default function FilteringSection() {
  const [genre, setGenre] = useState<string>("");
  const [decade, setDecade] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filmType, setFilmType] = useState<string>("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const router = useRouter();

  const applyFilters = () => {
    const params = new URLSearchParams({
      genre,
      decade,
      filmType,
      search,
    });
    router.push(`/movies?${params.toString()}`);
  };

  return (
    <ThemeProvider theme={localTheme}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background: "none",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Sök"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: "#f1ddc5",
            color: "#f1ddc5",
            borderRadius: "8px",
            width: isMobile ? "90%" : "50%",
            maxWidth: 400,
          }}
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
              {genres.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
            <Select>
              <MenuItem value="">Välj årtionde</MenuItem>
              {decades.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
            <Select>
              <MenuItem value="">Svartvit</MenuItem>
              {filmTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
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
              {genres.map((g) => (
                <Button
                  key={g}
                  variant="contained"
                  onClick={() => {
                    console.log("Genre ändrad till:", g);
                    setGenre(g);
                  }}
                  sx={{
                    backgroundColor: genre === g ? "#c43c3a" : "inherit",
                    "&:hover": { backgroundColor: "#c43c3a" },
                  }}
                >
                  {g}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {decades.map((d) => (
                <Button
                  key={d}
                  variant="contained"
                  onClick={() => {
                    console.log("Årtal ändrad:", d);
                    setDecade(d);
                  }}
                  sx={{
                    backgroundColor: decade === d ? "#c43c3a" : "inherit",
                    "&:hover": { backgroundColor: "#c43c3a" },
                  }}
                >
                  {d}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              {filmTypes.map((type) => (
                <Button
                  key={type}
                  variant="contained"
                  onClick={() => {
                    console.log("Typ ändrad:", type);
                    setFilmType(type);
                  }}
                  sx={{
                    backgroundColor: filmType === type ? "#c43c3a" : "inherit",
                    "&:hover": { backgroundColor: "#c43c3a" },
                  }}
                >
                  {type}
                </Button>
              ))}
            </Box>
            <Button
              sx={{ color: "red" }}
              onClick={applyFilters}
              variant="contained"
            >
              Filtrera
            </Button>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
