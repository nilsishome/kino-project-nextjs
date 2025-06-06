"use client";
import { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Typography,
  Alert,
  IconButton,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import outlinedTextField from "@/styles/outlinedTextField";
import { useEffect } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error || success) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const res = await fetch("/api/auth/reset-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSuccess(true);
      setEmail("");
    } else {
      const data = await res.json();
      setError(data.message || "Något gick fel.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h5" mb={2}>
        Glömt lösenord?
      </Typography>
      <Collapse in={showAlert}>
        {success && (
          <Alert
            severity="success"
            sx={{ mb: 2, borderRadius: 2 }}
            action={
              <IconButton
                aria-label="stäng"
                size="small"
                onClick={() => setShowAlert(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Om e-postadressen finns skickas en återställningslänk.
          </Alert>
        )}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: 2 }}
            action={
              <IconButton
                aria-label="stäng"
                size="small"
                onClick={() => setShowAlert(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}
      </Collapse>

      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="e-mail"
          type="email"
          value={email}
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
          sx={outlinedTextField}
        />
        <Button type="submit" variant="contained" fullWidth>
          Skicka återställningslänk
        </Button>
      </form>
    </Container>
  );
}
