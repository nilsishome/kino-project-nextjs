"use client";

import React from "react";
import {
  Box,
  Fade,
  Typography,
  Stepper,
  StepLabel,
  Step,
  Button,
} from "@mui/material";
import { Movie } from "@/types";
import BookTickets from "../components/booking/bookTickets";
import PaymentPopup from "./PaymentPopup";
import ConfirmationPopup from "./ConfirmationPopup";

type Props = {
  movie: Movie;
};

const steps = [
  "Biljettbokning",
  "Platsbokning",
  "Inloggning",
  "Betalning",
  "Bokningsbekräftelse",
];

import Seating from "../src/app/booking/seating";

const Popup: React.FC<Props> = ({ movie }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<
    "Kort" | "Swish" | "På plats" | null
  >(null);

  const handlePaymentComplete = (method: "Kort" | "Swish" | "På plats") => {
    setSelectedPaymentMethod(method);
    setActiveStep(4);
  };

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
          border: {
            //ingen border på liten skärm
            md: "2px solid white",
          },
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
        {/* Navigation buttons */}
        <Box
          sx={{
            marginTop: "2rem",
            flexGrow: 1,
            height: "60%",
            borderRadius: "20px",
          }}
        >
          {activeStep === 3 && (
            <PaymentPopup onNextStep={handlePaymentComplete} />
          )}
          {activeStep === 4 && selectedPaymentMethod && (
            <ConfirmationPopup paymentMethod={selectedPaymentMethod} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "3rem",
          }}
        >
          {/* Back */}
          {activeStep > 0 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBack}
              sx={{ position: "absolute", bottom: 0, left: "10rem" }}
            >
              Tillbaka
            </Button>
          )}
          {/* Continue */}
          {activeStep < steps.length - 1 && activeStep !== 3 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleNext}
              sx={{ position: "absolute", bottom: 0, right: "10rem" }}
            >
              Fortsätt
            </Button>
          )}
        </Box>
        {/* Booking components under here */}
        <BookTickets movie={movie} />
        <Seating totalTickets={3} />
      </Box>
    </Fade>
  );
};

export default Popup;
