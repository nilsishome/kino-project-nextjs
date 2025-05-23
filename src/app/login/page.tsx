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
} from "@mui/material";
import NextLink from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mounted, setMounted] = useState(false);
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
      }, 3000);
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
    });
    if (res?.ok) {
      router.push("/");
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
          disabled={pending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          disabled={pending}
          placeholder='lösenord'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          type='password'
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Kom ihåg mig'
        />

        <Box display='flex' gap={1}>
          <Button
            //type="submit"
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, flex: 1 }}
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
