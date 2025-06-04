"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

interface PaymentPopupProps {
  onNextStep: (method: "Kort" | "Swish" | "På plats") => void;
}

export default function PaymentPopup({ onNextStep }: PaymentPopupProps) {
  const [swishLoading, setSwishLoading] = React.useState(false);
  const [cardLoading, setCardLoading] = React.useState(false);

  const handleMockPayment = (type: "swish" | "card") => {
    if (type === "swish") {
      setSwishLoading(true);
    } else {
      setCardLoading(true);
    }

    setTimeout(() => {
      if (type === "swish") {
        setSwishLoading(false);
      } else {
        setCardLoading(false);
      }
      alert(`Betalningen med ${type === "swish" ? "Swish" : "Kort"} lyckades!`);
      // Payment method is sent to confirmationPopup
      onNextStep(type === "swish" ? "Swish" : "Kort");
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        widht: "100%",
        padding: { xs:"2rem", sm: "4rem", md: "7rem" }, 
        maxWidth: "500px",
        mx: "auto",
      }}
    >
      <Typography variant="h5" color="#f1ddc5" sx={{ mt: 3 }}>
        Hur vill du betala?
      </Typography>
      {/* Swish payment*/}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleMockPayment("swish")}
        disabled={swishLoading}
        sx={{
          mt: 1,
          width: { xs: "100%", sm: "300px" },
          height: "60px",
          display: "flex",
          textAlign: "center",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
          // width: "100%",
          color: "#f1ddc5",
          "&.Mui-disabled": {
            color: "#f1ddc5",
          },
        }}
      >
        {swishLoading ? (
          <>
            Behandlar...
            <CircularProgress size={20} sx={{ ml: 2, color: "#f1ddc5" }} />
          </>
        ) : (
          <>
            Betala med Swish
            <Image
              src="/swish.png"
              alt="swish"
              width={50}
              height={50}
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                padding: "2px",
                marginLeft: "10px",
              }}
            />
          </>
        )}
      </Button>
      {/* Card payment */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleMockPayment("card")}
        disabled={cardLoading}
        sx={{
          mt: 1,
          width: { xs: "100%", sm: "300px" },
          height: "60px",
          display: "flex",
          textAlign: "center",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
          color: "#f1ddc5",
          "&.Mui-disabled": {
            color: "#f1ddc5",
          },
        }}
      >
        {cardLoading ? (
          <>
            Behandlar...
            <CircularProgress size={20} sx={{ ml: 2, color: "#f1ddc5" }} />
          </>
        ) : (
          <>
            Kortbetalning
            <Image
              src="/PaymentCard.jpg"
              alt="payment"
              width={120}
              height={40}
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                padding: "2px",
                marginLeft: "10px",
              }}
            />
          </>
        )}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => onNextStep("På plats")}
        sx={{ mt: 1, width: { xs: "100%", sm: "300px" },
          height: "60px", }}
      >
        Betala på plats
      </Button>
    </Box>
  );
}
