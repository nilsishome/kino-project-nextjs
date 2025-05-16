//Styling av filmer på movie-page.
import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const container: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const title: SxProps<Theme> = {
  color: "#F1DDC5",
  fontWeight: 1000,
  fontSize: 30,
  marginBottom: 4,
  marginTop: 2,
};

export const list: SxProps<Theme> = {
  display: "grid",
  width: "100%",
  maxWidth: 1000,

  gridTemplateColumns: {
    xs: "repeat(2, 1fr)",
    sm: "repeat (3, 1fr)",
    md: "repeat(4, 1fr)",
    lg: "repeat(5, 1fr)",
  },

  gap: 0.25,
};

export const listItem: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#F1DDC5",
};

export const image: CSSProperties = {
  width: "100%",
  height: 250,
  objectFit: "scale-down",
};

export const titleText: SxProps<Theme> = {
  marginTop: 2,
  marginBottom: 4,
  textAlign: "center",
};
