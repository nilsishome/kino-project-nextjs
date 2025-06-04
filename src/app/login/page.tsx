"use client";

import {
  Alert,
  IconButton,
  Collapse,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Grid,
  Container,
  InputAdornment,
} from "@mui/material";
import NextLink from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import outlinedTextField from "@/styles/outlinedTextField";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(""); // Rensar error vid varje inlämning
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      remember,
    });
    if (res?.ok) {
      router.push("/mina-sidor");
      setPending(false);
      toast.success("Inloggning lyckades!");
    } else if (res?.status === 401) {
      setError("Ogiltig e-postadress eller lösenord.");
      setPending(false);
    } else {
      setError("Ett fel inträffade vid inloggningen.");
      setPending(false);
    }
  };

  return (
    <Container maxWidth='xs' sx={{ mt: 8, mb: 4 }}>
      <Typography component='h1' variant='h5'>
        Logga in
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
        <TextField
          type='email'
          placeholder='e-mail'
          variant='outlined'
          disabled={pending}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          fullWidth
          required
          sx={outlinedTextField}
        />

        <TextField
          type={showPassword ? "text" : "password"}
          variant='outlined'
          placeholder='lösenord'
          disabled={pending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <FormControlLabel
          control={
            <Checkbox
              value='remember'
              color='primary'
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              icon={<CheckBoxOutlineBlankIcon sx={{ color: "#F1DDC5" }} />}
              checkedIcon={<CheckBoxIcon sx={{ color: "#F1DDC5" }} />}
            />
          }
          label='Kom ihåg mig'
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
            Logga in
          </Button>
        </Box>
      </Box>

      <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
        <Grid>
          <Link component={NextLink} href='/register' variant='body2'>
            Registrera ett konto
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

export default Login;
