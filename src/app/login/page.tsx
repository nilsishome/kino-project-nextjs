
"use client";
import { Avatar, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Link, Grid, Container } from "@mui/material";
import NextLink from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

    const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        const res = await signIn ("credentials", {
            redirect: false,
            email,
            password,
        })
        if (res?.ok) {
            router.push("/");
            //setPending(false);
            toast.success("Inloggning lyckades!");
        } else if (res?.status === 401) {
            setError("Ogiltig e-postadress eller lösenord.");
            setPending(false);
        } else{
            setError("Ett fel inträffade vid inloggningen.");
            setPending(false);
        }
    }
  
return (
    
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
        <Typography component="h1" variant="h5">
          Logga in
        </Typography>
        {!!error && (
        <Box
          sx={{
            backgroundColor: "#ffe0e0",
            padding: 2,
            borderRadius: 1,
            color: "red",
            mt: 2,
            mb: 2,
          }}
        >
          {error}
        </Box>
      )}
        <Box 
        component ="form" 
        onSubmit={handleSubmit} 
        noValidate sx={{ mt: 1 }}
        >
    
            <TextField
            type="email"
            placeholder="e-mail"
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            fullWidth
            required
            sx={{ mb: 2}} 
            />

            <TextField
            typeof="password"
            disabled={pending}
            placeholder="lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            type="password"
            sx={{ mb: 2}} 
            />

            <FormControlLabel
            control={<Checkbox 
            value="remember" 
            color="primary" />}
            label="Kom ihåg mig"
            />
            <Box display="flex" gap={1}>
                <Button 
                //type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2, flex: 1}}
                >
                Tillbaka
                </Button>

                <Button 
                type="submit"
                disabled={pending} 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2, flex: 1 }}
                >
                Logga in
                </Button>
            </Box>
         </Box>

        <Grid container justifyContent='space-between' sx={{mt: 1}}>
            <Grid>
                <MuiLink component={NextLink} href="/register" variant="body2">
                    Registrera ett konto
                </MuiLink>
            </Grid>
            <Grid>
                <MuiLink component={NextLink} href="/forgot" variant="body2">
                    Glömt lösenord?
                </MuiLink>
            </Grid> 
        </Grid>
    </Container>

    
  );
}

export default Login;