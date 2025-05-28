import { connectToDatabase } from "@/database/connect";
import User from "@/database/user_model";
import VerifyRedirect from "./VerifyRedirect";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return <div>Ogiltig verifieringslänk.</div>;
  }

  await connectToDatabase();
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return <div>Ogiltig eller förbrukad verifieringslänk.</div>;
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  const { firstName, lastName, email } = user;

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
            Tack! Din e-postadress är nu verifierad.
          </Typography>
          <Typography align="center"
  sx={{ fontSize: "1rem", mt: 1 }}>Du skickas strax till inloggningen...</Typography>
        </Paper>
      </Box>
      <VerifyRedirect />
    </>
  );
}
