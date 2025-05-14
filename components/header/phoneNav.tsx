import React from "react";
import { Zoom, Box, IconButton, ButtonGroup, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface navProps {
  navToggle: boolean;
  onNavToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PhoneNav: React.FC<navProps> = ({ navToggle, onNavToggle }) => {
  return (
    <>
      <IconButton
        onClick={onNavToggle}
        sx={{
          color: "white",
          position: "absolute",
          right: "2vh",
          top: "4vh",
          display: { xs: "block", sm: "none" },
        }}
      >
        <MenuIcon sx={{ fontSize: "2.5rem" }} />
      </IconButton>

      {navToggle ? (
        <Zoom in={true}>
          <Box
            sx={{
              display: "flex",
              position: "fixed",
              width: "100%",
              height: "100%",
              backgroundColor: "primary.main",
              opacity: 0.8,
            }}
          >
            <ButtonGroup
              aria-label="Header button group"
              sx={{
                flexDirection: "column",
                alignContent: "center",
                margin: "5rem auto 0 auto",
                boxShadow: "none",
                "& .MuiButtonGroup-grouped": {
                  border: "none",
                },
              }}
            >
              <Button sx={{ fontSize: "1rem", marginBottom: "1rem" }}>
                START
              </Button>
              <Button sx={{ fontSize: "1rem", marginBottom: "1rem" }}>
                FILMER
              </Button>
              <Button sx={{ fontSize: "1rem", marginBottom: "1rem" }}>
                SERVERING
              </Button>
              <Button sx={{ fontSize: "1rem", marginBottom: "1rem" }}>
                OM OSS
              </Button>
              <Button sx={{ fontSize: "1rem", marginBottom: "1rem" }}>
                KONTAKT
              </Button>
              <Button sx={{ fontSize: "1rem", marginBottom: "1rem" }}>
                ÖPPETTIDER
              </Button>
            </ButtonGroup>
          </Box>
        </Zoom>
      ) : null}
    </>
  );
};

export default PhoneNav;
