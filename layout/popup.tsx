"use client";

import React from "react";
import { Movie } from "@/types";
import { Box, Fade, Typography, Stepper, StepLabel, Step } from "@mui/material";
import BookTickets from "../components/booking/bookTickets";

type Props = {
  movie: Movie;
}


const steps = ["Biljettbokning", "Platsbokning", "Inloggning"];

const Popup: React.FC<Props> = ({ movie }) => {
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
          border: { //ingen border på liten skärm
            md: "2px solid white"
          } ,
          width: "80vw",
          height: "auto",
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

        {/* Booking components under here */}
          <BookTickets movie={movie}/>
        
      </Box>
    </Fade>
  );
}

export default Popup;