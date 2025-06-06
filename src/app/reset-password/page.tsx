"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Link,
  Grid,
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
import NextLink from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
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

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    } else {
      const data = await res.json();
      setError(data.message || "Något gick fel.");
    }
  };

  return (
    <Suspense>
      <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
        <Typography component="h1" variant="h5" mb={2}>
          Återställ lösenord
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
              Lösenordet är återställt! Du kan nu logga in.
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
            placeholder="Nytt lösenord"
            type="password"
            fullWidth
            required
            value={password}
            sx={outlinedTextField}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            placeholder="Bekräfta nytt lösenord"
            type="password"
            fullWidth
            required
            value={confirmPassword}
            sx={outlinedTextField}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth>
            Spara nytt lösenord
          </Button>
        </form>
        <Grid container justifyContent="center" sx={{ mt: 1 }}>
          <Grid>
            <Link component={NextLink} href="/login" variant="body2">
              Logga in
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
}
