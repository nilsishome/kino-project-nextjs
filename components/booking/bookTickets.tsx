import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Movie } from "@/types";
import TicketCounter from "./components/TicketCounter";

type Props = {
  movie: Movie;
};

const BookTickets: React.FC<Props> = ({ movie }) => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);

	const totalTickets = adultCount + childCount + seniorCount;
const ticketPrice = 120; // exempelpris per biljett
const totalPrice = totalTickets * ticketPrice;

  return (
    <>
          <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr", 
          sm: "2fr 1fr 1fr", 
        },
        gridAutoRows: "auto",
        gap: 2,
        width: "95%",
        margin: "20px auto",
      }}
    >
    
      <Box
        sx={{
          gridColumn: { xs: "1", sm: "1" },
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
          width: {
						xs: "50%",
						sm: "80%"
					},
					justifySelf: {
						xs: "start",
						sm: "end"
					},
          height: "auto",
          gridColumn: { xs: "1", sm: "2" },
        }}
      />

    
<Box
        sx={{
          borderRadius: "16px",
          backgroundColor: "#374B54",
          height: "20vh",
          padding: 2,
          color: "white",
          gridColumn: {
            xs: "1",
            sm: "3",
          },
          gridRow: {
            xs: "5",
            sm: "1",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: {
            xs: "flex-start",
            sm: "flex-start",
          },
					
        }}
      >
        <Typography variant="body1">Biljetter: {totalTickets}</Typography>
        <Typography variant="body1">Totalt pris: {totalPrice} kr</Typography>
      </Box>
			
		

      <Button
        sx={{
          border: "1px solid white",
          borderRadius: "16px",
          width: "100%",
          height: "5vh",
          gridColumn: {
            xs: "1",
            sm: "1 / 3", 
          },
        }}
      >
        Logga in
      </Button>

    
      <Box
        sx={{
          border: "1px solid white",
          borderRadius: "16px",
          padding: 2,
          gridColumn: {
            xs: "1",
            sm: "1 / 3",
          },
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          Välj antal biljetter
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TicketCounter
            label="Vuxen"
            count={adultCount}
            onIncrement={() => setAdultCount((prev) => prev + 1)}
            onDecrement={() => setAdultCount((prev) => Math.max(prev - 1, 0))}
          />
          <TicketCounter
            label="Barn"
            count={childCount}
            onIncrement={() => setChildCount((prev) => prev + 1)}
            onDecrement={() => setChildCount((prev) => Math.max(prev - 1, 0))}
          />
          <TicketCounter
            label="Pensionär / Student"
            count={seniorCount}
            onIncrement={() => setSeniorCount((prev) => prev + 1)}
            onDecrement={() => setSeniorCount((prev) => Math.max(prev - 1, 0))}
          />
        </Box>
      </Box>

     
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gridColumn: "1 / -1",
        }}
      >
        <Button sx={{ border: "1px solid white", borderRadius: "16px" }}>
          Tillbaka
        </Button>
        <Button
          sx={{
            border: "1px solid white",
            borderRadius: "16px",
            width: "90px",
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
