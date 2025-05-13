import React from 'react';
import { Button, ButtonGroup } from "@mui/material";

export default function Nav() {
  return (
    <ButtonGroup aria-label="Header button group"
      sx={{
        display: {xs: "none", sm: "flex"},
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "1rem",
        boxShadow: "none",
        "& .MuiButtonGroup-grouped": {
          border: "none",
        },
      }}
    >
      <Button sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" }}}>START</Button>
      <Button sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" }}}>FILMER</Button>
      <Button sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" }}}>SERVERING</Button>
      <Button sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" }}}>OM OSS</Button>
      <Button sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" }}}>KONTAKT</Button>
      <Button sx={{ margin: "1rem", fontSize: { sm: "1rem", md: "1.5rem" }}}>ÖPPETTIDER</Button>
    </ButtonGroup>
  )
}
