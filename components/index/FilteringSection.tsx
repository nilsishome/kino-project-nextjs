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

const genres: string[] = ["Thriller", "Komedi", "Äventyr", "Action", "Drama"];
const decades: { label: string; value: string }[] = [
  { label: "50-tal", value: "50" },
  { label: "60-tal", value: "60" },
  { label: "70-tal", value: "70" },
  { label: "80-tal", value: "80" },
  { label: "90-tal", value: "90" },
  { label: "00-tal", value: "00" },
  { label: "10-tal", value: "10" },
];
const filmTypes: string[] = ["Svartvit", "Färgfilm"];

//Helper function for rendering Select-components for mobile view.
const mobileSelectSX = { color: "#f1ddc5", border: "2px solid #f1ddc5" };

function renderSelect(
  value: string,
  setValue: (value: string) => void,
  placeholder: string,
  options: (string | { label: string; value: string })[]
) {
  return (
    <Select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      displayEmpty
      fullWidth
      sx={mobileSelectSX}
    >
      <MenuItem value="">{placeholder}</MenuItem>
      {options.map((option) =>
        typeof option === "string" ? (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ) : (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        )
      )}
    </Select>
  );
}

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
            {renderSelect(genre, setGenre, "Välj genre(Ingen vald)", genres)}
            {renderSelect(decade, setDecade, "Välj årtionde", decades)}
            {renderSelect(
              filmType,
              setFilmType,
              "Välj Svartvit/Färgfilm",
              filmTypes
            )}
          </>
        ) : (
          //Imported from FilterButtons file

          <FilterButtons
            isMobile={isMobile}
            genre={genre}
            setGenre={setGenre}
            decade={decade}
            setDecade={setDecade}
            filmType={filmType}
            setFilmType={setFilmType}
          />
        )}
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
