"use client";

import React from "react";
import { Button, ButtonGroup } from "@mui/material";

export default function Nav() {
  return (
    <ButtonGroup
      aria-label="Header button group"
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "1rem",
        boxShadow: "none",
        "& .MuiButtonGroup-grouped": {
          border: "none",
        },
      }}
    >
      <Button
        href="/"
        variant="text"
        sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" } }}
      >
        START
      </Button>
      <Button
        href="/movies"
        variant="text"
        sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" } }}
      >
        FILMER
      </Button>
      <Button
        href="/about"
        variant="text"
        sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" } }}
      >
        OM OSS
      </Button>
      <Button
        href="/contact"
        variant="text"
        sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" } }}
      >
        KONTAKT
      </Button>
      <Button
        variant="text"
        sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" } }}
      >
        ÖPPETTIDER
      </Button>
    </ButtonGroup>
  );
}
