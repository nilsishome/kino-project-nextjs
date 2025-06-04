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
import PaymentPopup from "../components/popup/PaymentPopup";
import ConfirmationPopup from "../components/popup/ConfirmationPopup";
import Seating from "../components/popup/seating";
import Login from "@/app/login/page";
import { Movie } from "@/types";
import BookTickets from "../components/popup/bookTickets";

type Props = {
  movie: Movie;
};

const steps = [
  "Biljettbokning",
  "Platsbokning",
  "Betalning",
  "Bokningsbekräftelse",
];

type PopupProps = {
  handlePopupState: (state: boolean) => void;
  movie: Movie;
};

const Popup: React.FC<PopupProps> = ({ handlePopupState, movie }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<
    "Kort" | "Swish" | "På plats" | null
  >(null);

  const handlePaymentComplete = (method: "Kort" | "Swish" | "På plats") => {
    setSelectedPaymentMethod(method);
    setActiveStep(3);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      handlePopupState(false);
    }

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
            display: "flex",
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
              justifyContent: "flex-start",
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
          {activeStep === 0 && <BookTickets movie={movie} />}
          {activeStep === 1 && <Seating totalTickets={3} />}
          {activeStep === 2 && (
            <PaymentPopup onNextStep={handlePaymentComplete} />
          )}
          {activeStep === 3 && selectedPaymentMethod && (
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
            marginBottom: "2rem",
          }}
        >
          {/* Back */}

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            sx={{ position: "absolute", bottom: 0, left: "10rem" }}
          >
            Tillbaka
          </Button>
          {/* Continue */}
          {activeStep < steps.length - 1 && activeStep !== 2 && (
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
      </Box>
    </Fade>
  );
};

export default Popup;
