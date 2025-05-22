"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Select,
  MenuItem,
  Button,
  TextField,
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
const decades: { label: string; value: string }[] = [
  {label: "50-tal", value: "50"},
 { label: "60-tal", value: "60"},
 { label: "70-tal", value: "70"},
  {label: "80-tal", value: "80"},
  {label: "90-tal", value: "90"},
 {label:  "00-tal", value: "00"},
  {label: "10-tal", value: "10"},
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
              sx={{ color: "#f1ddc5", border: "2px solid #f1ddc5" }}
            >
              <MenuItem value="">Välj genre (Ingen vald)</MenuItem>
              {genres.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
            <Select
            value={decade}
            onChange={(e) => setDecade(e.target.value)}
            displayEmpty
            fullWidth
            sx={{color: "#f1ddc5", border: "2px solid #f1ddc5"}}
            >
              <MenuItem value="">Välj årtionde</MenuItem>
              {decades.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <Select 
            value={filmType}
            onChange={(e) => setFilmType(e.target.value)}
            displayEmpty
            fullWidth
            sx={{color: "#f1ddc5", border: "2px solid #f1ddc5"}}
            >
              <MenuItem value="">Välj Svartvit/Färgfilm</MenuItem>
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
                    setGenre((prev) => (prev === g ? "" : g));
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
              {decades.map(({ label, value }) => (
                <Button
                  key={value}
                  variant="contained"
                  onClick={() => {
                    setDecade((prev) => (prev === value ? "" : value));
                  }}
                  sx={{
                    backgroundColor: decade === value ? "#c43c3a" : "inherit",
                    "&:hover": { backgroundColor: "#c43c3a" },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              {filmTypes.map((type) => (
                <Button
                  key={type}
                  variant="contained"
                  onClick={() => {
                    setFilmType((prev) => (prev === type ? "" : type));
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
               </>
        )}
            <Button
              sx={{ color: "#f1ddc5" }}
              onClick={applyFilters}
              variant="contained"
            >
              Filtrera
            </Button>
            <Button 
            sx={{ color: "#f1ddc5"}}
            onClick={() => { 
              setGenre("");
              setDecade("");
              setFilmType("");
              setSearch("");
              router.push("/movies");
            }}
            variant="contained"
            >
              Visa alla filmer
            </Button>
       
      </Box>
    </ThemeProvider>
  );
}
