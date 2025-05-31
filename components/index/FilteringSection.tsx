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
import FilterButtons from "../index/FilterButtons";

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
          onKeyDown={(e) => { 
            if (e.key === "Enter") { 
              applyFilters();
            }
          }}
          fullWidth
          sx={{
            backgroundColor: "#f1ddc5",
            color: "#f1ddc5",
            borderRadius: "8px",
            width: isMobile ? "90%" : "50%",
            maxWidth: 400,
          }}
        />

          <FilterButtons
            isMobile={isMobile}
            genre={genre}
            setGenre={setGenre}
            decade={decade}
            setDecade={setDecade}
            filmType={filmType}
            setFilmType={setFilmType}
          />
      
        <Button
          sx={{ color: "#f1ddc5" }}
          onClick={applyFilters}
          variant="contained"
        >
          Filtrera
        </Button>
        <Button
          sx={{ color: "#f1ddc5" }}
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
