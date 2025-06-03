"use client"; 
import React from "react"; 
import { Box, Typography } from "@mui/material";



type ConfirmationPopupProps = { 
  paymentMethod: "Kort" | "Swish" | "På plats";
};

const mockedData = { 
  bookingId: "123456",
  firstName: "Sigrid", 
  lastName: "Ohlsson", 
  tickets: 2, 
  filmTitle: "Star Wars: Retro saga",

};

export default function ConfirmationPopup( {paymentMethod }: ConfirmationPopupProps) { 
  const data = mockedData;
return ( 
    <Box 
    sx={{ 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        height: "100%", 
        alignItems: "center", 
        padding: "4rem", 
        textAlign: "center", 
    }}
>

  <Typography variant="h4" color="#f1ddc5" gutterBottom>
    Tack för din bokning!  
  </Typography>
  <Typography variant="body1" color="#f1ddc5"> 
    {/* Shows dynamically chosen payment method */}
   Boknings-id: {data.bookingId} <br />
   Namn: {data.firstName} {data.lastName} <br />
   Antal biljetter: {data.tickets} <br />
   Betalningsätt: {paymentMethod} <br />
   Film: {data.filmTitle}
  </Typography>
  </Box>
);

}

