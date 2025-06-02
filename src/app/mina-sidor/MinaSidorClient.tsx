"use client";

import { SessionProvider } from "next-auth/react";
import UserButton from "@/components/ui/userButton";
import { Box, Paper, Typography } from "@mui/material";

export default function MinaSidorClient({ session }: { session: any }) {
  const { firstName, lastName, email } = session?.user || {};

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 2 }}>
        <SessionProvider session={session}>
          <UserButton />
        </SessionProvider>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
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
            gap: 1,
            mt: 4,
          }}
        >
          <Typography variant="h6" align="center"
  sx={{ fontSize: "1.5rem", fontWeight: 600, color: "#22c55e" }}>Välkommen!</Typography>
          <Typography>{firstName} {lastName}</Typography>
          <Typography>E-post: {email}</Typography>
        </Paper>
      </Box>
    </>
  );
}