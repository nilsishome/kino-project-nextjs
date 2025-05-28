"use client";
import { useEffect, useState } from "react";
import VerifyRedirect from "./VerifyRedirect";
import { Box, Paper, Typography } from "@mui/material";

export default function VerifyEmailPage({ searchParams }: { searchParams: { token?: string } }) {
  const [message, setMessage] = useState("Verifierar...");
  const token = searchParams.token;

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setMessage("Ogiltig verifieringslänk.");
        return;
      }
      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        setMessage(data.message);
      } catch {
        setMessage("Ett fel uppstod vid verifiering.");
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 300,
            height: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#333333",
            p: 2,
            mt: 4,
          }}
        >
          <Typography
            variant='h6'
            align='center'
            sx={{ fontSize: "1.5rem", fontWeight: 600, color: "#22c55e" }}
          >
            {message}
          </Typography>
          {message === "Verifiering lyckades!" && (
            <Typography align="center" sx={{ fontSize: "1rem", mt: 1 }}>
              Du skickas strax till inloggningen...
            </Typography>
          )}
        </Paper>
      </Box>
      <VerifyRedirect />
    </>
  );
}