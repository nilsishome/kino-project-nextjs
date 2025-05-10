'use client';

import { createTheme } from '@mui/material/styles';
import { Yesteryear, Poppins } from "next/font/google";

const yesteryear = Yesteryear({ subsets: ["latin"], weight: "400" });
const poppinsRegular = Poppins({ subsets: ["latin"], weight: "400" });
const poppinsSemiBold = Poppins({ subsets: ["latin"], weight: "600" });

declare module "@mui/material/styles" {
  interface TypographyOptions {
    fonts?: {
      yesteryear: string;
      poppinsRegular: string;
      poppinsSemiBold: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#27272b",
      dark: "#0066CC",
    },
    text: {
      primary: "#f1ddc5",
    },
  },

  typography: {
    fontFamily: poppinsRegular.style.fontFamily, // Default for the app
    fonts: {
      yesteryear: yesteryear.style.fontFamily,
      poppinsRegular: poppinsRegular.style.fontFamily,
      poppinsSemiBold: poppinsSemiBold.style.fontFamily,
    },
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      color: "text.primary"
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "text.primary"
    },
    body1: {
      fontSize: "1rem",
      color: "text.primary"
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
          color: "#f1ddc5"
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
        }
      }
    }
  },
});

export default theme;