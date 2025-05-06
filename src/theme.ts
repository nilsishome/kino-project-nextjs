'use client';

import { createTheme } from '@mui/material/styles';

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
  },
});

export default theme;