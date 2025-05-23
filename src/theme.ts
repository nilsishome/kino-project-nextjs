"use client";

import { createTheme } from "@mui/material/styles";
import { Yesteryear, Poppins } from "next/font/google";

export const yesteryear = Yesteryear({ subsets: ["latin"], weight: "400" });
export const poppinsRegular = Poppins({ subsets: ["latin"], weight: "400" });
export const poppinsSemiBold = Poppins({ subsets: ["latin"], weight: "600" });

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A323C",
    },
    text: {
      primary: "#f1ddc5",
    },
  },

  typography: {
    fontFamily: poppinsRegular.style.fontFamily,
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      color: "text.primary",
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "text.primary",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "text.primary",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      textAlign: "left",
      color: "text.primary",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
          },
          "&:hover": {
            backgroundColor: "#c43c3a",
          },
          "&.MuiButton-outlined": {
            border: "1.5px solid #f1ddc5",
            borderRadius: "2px",

            "&:hover": {
              backgroundColor: "#c43c3a",
              border: "1.5px solid #c43c3a",
            },
          },
          "&.MuiButton-outlinedSecondary": {
            border: "1.5px solid #f1ddc5",
            borderRadius: "2px",

            "&:hover": {
              backgroundColor: "#c43c3a",
              border: "1.5px solid #c43c3a",
            },
          },

          color: "#f1ddc5",
        },
      },
    },
    MuiLink: {
      //Påverkar alla Link
      styleOverrides: {
        root: {
          color: "#f1ddc5",
          textDecoration: "none",
          transition: "color 0.2s ease",
          "&:hover": {
            color: "#c43c3a",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          // margin: 0, Tar bort centreringen på container om den är 0
          // padding: 0,Tar bort centreringen på container om den är 0
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          color: "#f1ddc5",
        },
      },
    },
  },
});

export default theme;
