"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface PaymentPopupProps { 
  onNextStep: () => void;
}

export default function PaymentPopup({ onNextStep }: PaymentPopupProps ) {
    return (
       <Box 
               sx={{
                //  display: "flex",
                //  flexDirection: "column", 
                 justifyContent: "space-between", 
                 height: "100%", 
                 padding: "2rem"
               }}
             >
               <Typography variant="h5" color="#f1ddc5" sx={{ mt: 3}}>
                Hur vill du betala? 
               </Typography>
               <Typography variant="body1" color="white">
        betalningsmetod
      </Typography>
      <Typography variant="body1" color="white">
        betalningsmetod
      </Typography>
      <Typography variant="body1" color="white">
        betalningsmetod
      </Typography>
       <Button variant="outlined" color="secondary" onClick={onNextStep} sx={{ mt: 3 }}>
        Bekräfta betalning
      </Button>
    </Box>
    );
   
 }