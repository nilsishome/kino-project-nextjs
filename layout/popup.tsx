"use client";

import React from "react";

import { Box, Fade, Typography, Stepper, StepLabel, Step, Button, Button } from "@mui/material";
import PaymentPopup from "./PaymentPopup";

import Seating from "../src/app/booking/seating";

const steps = ["Biljettbokning", "Platsbokning", "Inloggning", "Betalning"];

export default function () {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Fade in={true}>
      <Box
        sx={{
          backgroundColor: "#1A323C",
          border: "2px solid white",
          width: "80vw",
          height: "80vh",
          margin: "auto",
          borderRadius: "3px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#374B54",
            width: "95%",
            height: "7vh",
            borderRadius: "2rem",
            margin: "2vh auto 0 auto",
          }}
        >
          <Typography
            sx={{
              fontFamily: "yesteryear",
              fontSize: "3rem",
              color: "#F2753B",
              paddingLeft: "3rem",
              paddingTop: "0.5%",
              height: "100%",
            }}
          >
            Retro
          </Typography>
        </Box>
        <Stepper
          activeStep={activeStep}
          orientation="horizontal"
          sx={{
            width: "60vw",
            margin: "2rem auto auto auto",
          }}
        >
          {steps.map((step, index) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
         {/* Navigation buttons */}
        <Box sx={{ marginTop: "2rem", flexGrow: 1, height: "60%", borderRadius: "10px" }}>
          {activeStep === 3 && <PaymentPopup onNextStep={() => setActiveStep(4)} />}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", padding: "3rem"}}>
          {/* Back */}
          {activeStep > 0 && ( 
            <Button variant="outlined" color="secondary" onClick={handleBack} sx={{ position: "absolute", bottom: 0, left: "10rem"}}>
              Tillbaka
            </Button>
          )}
            {/* Continue */}
            {activeStep < steps.length - 1 && ( 
              <Button variant="outlined" color="secondary" onClick={handleNext} sx={{  position: "absolute", bottom: 0, right: "10rem" }}>
                Fortsätt
              </Button>
            )}
        </Box>
        {/* Booking components under here */}

        <Seating />


      </Box>
    </Fade>
  );
}
