"use client";
import { Box, Button, Select, MenuItem } from "@mui/material";
import React from "react";

type FilterButtonsProps = {
  isMobile: boolean;
  genre: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  decade: string;
  setDecade: React.Dispatch<React.SetStateAction<string>>;
  filmType: string;
  setFilmType: React.Dispatch<React.SetStateAction<string>>;
};

const genres = ["Thriller", "Komedi", "Äventyr", "Action", "Drama"];
const decades = [
  { label: "50-tal", value: "50" },
  { label: "60-tal", value: "60" },
  { label: "70-tal", value: "70" },
  { label: "80-tal", value: "80" },
  { label: "90-tal", value: "90" },
  { label: "00-tal", value: "00" },
  { label: "10-tal", value: "10" },
];
const filmTypes = ["Svartvit", "Färgfilm"];

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

export default function FilterButtons({
  isMobile,
  genre,
  setGenre,
  decade,
  setDecade,
  filmType,
  setFilmType,
}: FilterButtonsProps) {
  if (isMobile) {
    return (
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
    );
  }

  return (
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
            onClick={() => setGenre((prev: string) => (prev === g ? "" : g))}
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
            onClick={() =>
              setDecade((prev: string) => (prev === value ? "" : value))
            }
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
              setFilmType((prev: string) => (prev === type ? "" : type));
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
  );
}
