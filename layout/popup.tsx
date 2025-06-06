"use client";

import React, { useEffect, useState } from "react";
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
import LoginForm from "../components/popup/LoginForm";
import RegisterForm from "../components/popup/RegisterForm";
import { BookingScreening, Movie } from "@/types";
import BookTickets from "../components/popup/bookTickets";
import { useRouter } from "next/navigation";

const steps = [
  "Biljettbokning",
  "Platsbokning",
  "Betalning",
  "Bokningsbekräftelse",
];

type PopupProps = {
  handlePopupState: (state: boolean) => void;
  movie: Movie;
  screeningData: BookingScreening;
};

const Popup: React.FC<PopupProps> = ({
  handlePopupState,
  movie,
  screeningData,
}) => {
  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "Kort" | "Swish" | "På plats" | null
  >(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);

  // Hantera auth-vy och inloggningsstatus
  const [authView, setAuthView] = useState<"login" | "register" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [occupiedSeats, setOccupiedSeats] = React.useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    router.push(`${movie._id}?movie=${movie.title}&id=${screeningData._id}`);
    retrieveBookedSeats();
  }, []);

  const handlePaymentComplete = (method: "Kort" | "Swish" | "På plats") => {
    setSelectedPaymentMethod(method);
    sendToDatabase();
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

  const getTotalTickets = (totalSum: number) => {
    setTotalTickets(totalSum);
  };

  const getSeatingData = (data: number[]) => {
    setSelectedSeats(data);
  };

  const sendToDatabase = async () => {
    const data = {
      selectedSeats: selectedSeats,
      totalTickets: totalTickets,
      screeningData: screeningData,
    };

    await fetch(`/api/movies/${movie._id}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
  };

  const retrieveBookedSeats = async () => {
    const response = await fetch(
      `/api/movies/${movie._id}/bookings?movie=${movie.title}&id=${screeningData._id}`
    );

    if (!response.ok) {
      throw new Error("Response is not okey!");
    }

    const payLoad = await response.json();
    const seats = payLoad.seats;

    setOccupiedSeats(seats);
  };

  return (
    <Fade in={true}>
      <Box
        sx={{
          backgroundColor: "#1A323C",
          border: { md: "2px solid white" },
          width: "80vw",
          height: "90vh",
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
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            marginTop: "2rem",
            flexGrow: 1,
            height: "60%",
            borderRadius: "20px",
          }}
        >
          {/* Steg 0: Visa BookTickets, LoginForm eller RegisterForm */}
          {activeStep === 0 && authView === null && (
            <BookTickets
              getTotalTickets={getTotalTickets}
              movie={movie}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setAuthView("login")}
              onRegisterClick={() => setAuthView("register")}
              adultCount={adultCount}
              setAdultCount={setAdultCount}
              childCount={childCount}
              setChildCount={setChildCount}
              seniorCount={seniorCount}
              setSeniorCount={setSeniorCount}
            />
          )}
          {activeStep === 0 && authView === "login" && (
            <LoginForm
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setAuthView(null);
              }}
              onRegisterClick={() => setAuthView("register")}
            />
          )}
          {activeStep === 0 && authView === "register" && (
            <RegisterForm
              onRegisterSuccess={() => setAuthView("login")}
              onBackToLogin={() => setAuthView("login")}
            />
          )}
          {/* Steg 1: Platsbokning */}
          {activeStep === 1 && (
            <Seating
              occupiedSeats={occupiedSeats}
              getSeatingData={getSeatingData}
              totalTickets={totalTickets}
            />
          )}
          {/* Steg 2: Betalning */}
          {activeStep === 2 && (
            <PaymentPopup onNextStep={handlePaymentComplete} />
          )}
          {/* Steg 3: Bekräftelse */}
          {activeStep === 3 && selectedPaymentMethod && (
            <ConfirmationPopup
              screeningData={screeningData}
              totalTickets={totalTickets}
              selectedSeats={selectedSeats}
              paymentMethod={selectedPaymentMethod}
            />
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            sx={{ position: "absolute", bottom: 0, left: "10rem" }}
          >
            Tillbaka
          </Button>
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
