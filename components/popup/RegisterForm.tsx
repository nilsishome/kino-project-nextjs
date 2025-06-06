"use client";
import {
  Alert,
  IconButton,
  Collapse,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Grid,
  Container,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import outlinedTextField from "@/styles/outlinedTextField";

type Props = {
  onRegisterSuccess?: () => void;
  onBackToLogin?: () => void;
};

const RegisterForm = ({ onRegisterSuccess, onBackToLogin }: Props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      if (onRegisterSuccess) onRegisterSuccess();
    } else {
      setError(data.message);
      setPending(false);
    }
  };

  return (
    <Container maxWidth='xs' sx={{ mt: 8, mb: 4 }}>
      <Typography component='h1' variant='h5'>
        Skapa ett konto
      </Typography>
      {mounted && !!error && (
        <Collapse in={showAlert}>
          <Alert
            severity='error'
            sx={{
              mb: 2,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.875rem",
            }}
            action={
              <IconButton
                aria-label='stäng'
                size='small'
                onClick={() => setShowAlert(false)}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Collapse>
      )}
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Box display='flex' gap={2}>
          <TextField
            type='text'
            variant='outlined'
            placeholder='Förnamn'
            disabled={pending}
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            fullWidth
            required
            autoFocus
            sx={outlinedTextField}
          />
          <TextField
            type='text'
            variant='outlined'
            placeholder='Efternamn'
            disabled={pending}
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            fullWidth
            required
            sx={outlinedTextField}
          />
        </Box>
        <TextField
          type='email'
          variant='outlined'
          placeholder='e-mail'
          disabled={pending}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          fullWidth
          required
          sx={outlinedTextField}
        />
        <TextField
          type='password'
          variant='outlined'
          placeholder='lösenord'
          disabled={pending}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          fullWidth
          required
          sx={outlinedTextField}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
                  onClick={() => setShowPassword((show) => !show)}
                  edge='end'
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#F1DDC5" }} />
                  ) : (
                    <Visibility sx={{ color: "#F1DDC5" }} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          type='password'
          variant='outlined'
          placeholder='bekräfta lösenord'
          disabled={pending}
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          sx={outlinedTextField}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
                  onClick={() => setShowPassword((show) => !show)}
                  edge='end'
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#F1DDC5" }} />
                  ) : (
                    <Visibility sx={{ color: "#F1DDC5" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type='submit'
          disabled={pending}
          fullWidth
          variant='outlined'
          sx={{ mt: 3, mb: 2, flex: 1 }}
        >
          Skapa konto
        </Button>
      </Box>
      <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
        <Grid>
          <Link component='button' variant='body2' onClick={onBackToLogin}>
            Har du redan ett konto? Logga in
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
