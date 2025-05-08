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
          // padding: 5,
        }}
      >
        <Box sx={{ maxWidth: 500, width: "100%" }}>
          <Typography variant="h1" gutterBottom>
            Kontakta oss
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack
              spacing={3}
              sx={{ backgroundColor: "none", padding: 3, borderRadius: 2 }}
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
