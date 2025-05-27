import { Box, Button, Typography } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Movie } from "@/types";

type Props = {
  movie: Movie;
};

const BookTickets: React.FC<Props> = ({ movie }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },

          width: {
            xs: "95%",
            sm: "90%",
          },
          marginLeft: {
            sm: "40px",
          },
          marginTop: "20px",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "2fr 1fr 1fr",
            },
            gridTemplateRows: {
              xs: "auto auto",
              sm: "auto",
            },
          }}
        >
          <Box
            sx={{
              maxWidth: "100%",
            }}
          >
            <Typography variant="h2">{movie.title}</Typography>
            <Typography variant="body1">{movie.story}</Typography>
          </Box>

          <Box
            component="img"
            src={movie.coverImage}
            alt="Filmomslag"
            sx={{
              width: "80%",
              height: "auto",
            }}
          />

          <Box
            sx={{
              borderRadius: "16px",
              backgroundColor: "#374B54",
              marginTop: {
                xs: "10px",
                sm: "0",
              },
              gridColumn: {
                xs: "1 / span 2",
                sm: "auto",
              },
              height: "20vh",
            }}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Button
          sx={{
            border: "1px solid white",
            borderRadius: "16px",
            width: {
              xs: "70vw",
              sm: "50vw",
            },
            height: "5vh",
            display: "block",
            margin: {
              xs: "auto",
              sm: "0 0 0 40px",
            },
          }}
        >
          Logga in
        </Button>

        <Box
          sx={{
            border: "1px solid white",
            borderRadius: "16px",
            width: {
              xs: "70vw",
              sm: "50vw",
            },
            height: {
              xs: "30vh",
              sm: "25vh",
            },
            display: "block",
            margin: {
              xs: "auto",
              sm: "10px 0 0 40px",
            },
          }}
        >
          <Typography variant="h3" sx={{ margin: "10px" }}>
            Välj antal biljetter
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: "15px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Vuxen</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                  gap: 8,
                }}
              >
                <RemoveCircleOutlineIcon sx={{ fontSize: "30px" }} />
                <AddCircleOutlineIcon sx={{ fontSize: "30px" }} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Barn</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                  gap: 8,
                }}
              >
                <RemoveCircleOutlineIcon sx={{ fontSize: "30px" }} />
                <AddCircleOutlineIcon sx={{ fontSize: "30px" }} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>
                Pensionär/ <br />
                Student
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                  gap: 8,
                }}
              >
                <RemoveCircleOutlineIcon sx={{ fontSize: "30px" }} />
                <AddCircleOutlineIcon sx={{ fontSize: "30px" }} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: {
              xs: "10%",
              sm: "85%",
            },
            margin: {
              xs: "10px 0 0 0",
              sm: "0 10px 0 10px",
            },
          }}
        >
          <Button
            sx={{
              border: "1px solid white",
              borderRadius: "16px",
              marginBottom: "5px",
            }}
          >
            Tillbaka
          </Button>
          <Button
            sx={{
              border: "1px solid white",
              borderRadius: "16px",
              width: "90px",
              marginBottom: "5px",
            }}
          >
            Fortsätt
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default BookTickets;
