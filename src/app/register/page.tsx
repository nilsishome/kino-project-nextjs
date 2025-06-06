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
import NextLink from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import outlinedTextField from "@/styles/outlinedTextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null); // Rensar error vid varje inlämning

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      router.push("/login");
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
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
            autoFocus
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
          type={showPassword ? "text" : "password"}
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
                  {showPassword ? 
                  <VisibilityOff sx={{ color: "#F1DDC5" }}/>
                  : <Visibility sx={{ color: "#F1DDC5" }}/>}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type={showPassword ? "text" : "password"}
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
                  {showPassword ? 
                  <VisibilityOff sx={{ color: "#F1DDC5" }}/>
                  : <Visibility sx={{ color: "#F1DDC5" }}/>}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box display='flex' gap={1}>
          <Button
            type='button'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, flex: 1 }}
            onClick={() => router.back()}
          >
            Tillbaka
          </Button>

          <Button
            type='submit'
            disabled={pending}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, flex: 1 }}
          >
            Skapa konto
          </Button>
        </Box>
      </Box>

      <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
        <Grid>
          <Link component={NextLink} href='/login' variant='body2'>
            Har du redan ett konto? Logga in
          </Link>
        </Grid>
        <Grid>
          <Link component={NextLink} href='/forgot' variant='body2'>
            Glömt lösenord?
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
