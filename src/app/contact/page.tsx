"use client";

import { Button, Box, Typography, Stack } from "@mui/material";
import FormField from "@/components/FormField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

export default function contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: 6,
            color: "text.primary",
            fontSize: "3rem",
            fontWeight: 700,
          }}
        >
          Kontakta oss
        </Typography>
        <Box
          sx={{
            padding: 40,
            borderRadius: 4,
            maxWidth: 600,
            width: "80%",
            margin: "auto",
            boxShadow: " 0 6px 10px #f2753b;",
          }}
        >
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ padding: "24px" }}
          >
            <Stack
              sx={{
                backgroundColor: "none",
                padding: 3,
                borderRadius: 2,
                width: "100%",
                gap: 3, // Gap between fields
                color: "text.primary",
                fontSize: "1rem",
                fontWeight: 800,
              
              }}
            >
              <FormField label="Namn" name="name" />
              <FormField label="Mejl" name="email" type="email" required />
              <FormField label="Telefon" name="phone" type="phone" required />
              <FormField label="Ämne" name="subject" required />
              <FormField label="Meddelande" name="message" multiline rows={3} />
            </Stack>
            <Button variant="contained" color="primary" type="submit">
              Skicka
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
