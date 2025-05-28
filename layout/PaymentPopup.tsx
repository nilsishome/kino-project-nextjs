"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from  "next/image"; 




interface PaymentPopupProps { 
  onNextStep: () => void;
}

export default function PaymentPopup({ onNextStep }: PaymentPopupProps ) {

  const [loading, setLoading] = React.useState(false); 

  const handleMockPayment = () => { 
    setLoading(true);
    setTimeout(() => { 
      setLoading(false); 
      alert("Betalningen lyckades!"); 
      onNextStep();
    }, 2000);
  }; 

    return (
       <Box 
               sx={{
                 display: "flex",
                 flexDirection: "column", 
                 justifyContent: "center", 
                 height: "100%", 
                 padding: "7rem",
                 width: "50%", 
                 mx: "auto"
               }}
             >
               <Typography variant="h5" color="#f1ddc5" sx={{ mt: 3 }}>
                Hur vill du betala? 
               </Typography>
       <Button variant="outlined" color="secondary" onClick={handleMockPayment} disabled={loading} sx={{ mt: 1, display: "flex", textAlign: "center", justifyContent: "space-between", alignItems: "center", width: "100%"}}
       >
        {loading ? "Behandlar..." : "Betala med Swish"}  // Text for Behandlar is black and unreadable 
        {!loading && (
         <Image src="/swish.png" alt="swish" width={50} height={50} style={{
          backgroundColor: "white", 
          borderRadius: "4px", 
          padding: "2px",
          marginLeft: "10px"
         }} />
        )}
      </Button>
      <Button variant="outlined" color="secondary" onClick={onNextStep} sx={{ mt: 1, display: "flex", textAlign: "center", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        Kortbetalning
         <Image src="/PaymentCard.jpg" alt="payment" width={120} height={40} style={{
          backgroundColor: "white", 
          borderRadius: "4px", 
          padding: "2px",
          marginLeft: "10px"
         }} />
      </Button>
      <Button variant="outlined" color="secondary" onClick={onNextStep} sx={{ mt: 1 }}>
        Betala på plats 
        </Button>
    </Box>
    );
   
 }