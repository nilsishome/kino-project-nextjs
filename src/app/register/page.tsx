
"use client";
import { Typography, Box, TextField, FormControlLabel, Checkbox, Button, Link, Grid, Container, dividerClasses } from "@mui/material";
import NextLink from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        console.log(form);
        setPending(false);
        
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
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
    
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
        <Typography component="h1" variant="h5">
          Skapa ett konto
        </Typography>
        {!!error && (
            <div className="bg-destrucive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                <p>{error}</p>
                <p>hejsan</p>
            </div>
        )}
        
        <Box 
        component ="form" 
        onSubmit={handleSubmit} 
        noValidate sx={{ mt: 1 }}
        >
            <Box display="flex" gap={2}>
                <TextField
                placeholder="Förnamn"
                disabled={pending}
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value})}
                fullWidth
                required
                autoFocus
                sx={{ mb: 1}} 
                />

                <TextField
                placeholder="Efternamn"
                disabled={pending}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value})}
                fullWidth
                required
                autoFocus
                sx={{ mb: 2}} 
                />
            </Box>
            <TextField
            placeholder="e-mail"
            disabled={pending}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value})}
            fullWidth
            required
            sx={{ mb: 2}} 
            />

            <TextField
            placeholder="lösenord"
            disabled={pending}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value})}
            fullWidth
            required
            type="password"
            sx={{ mb: 2}} 
            />

            <TextField
            placeholder="bekräfta lösenord"
            disabled={pending}
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value})}
            fullWidth
            required
            type="password"/>

            <FormControlLabel
            control={<Checkbox 
            value="remember" 
            color="primary" />}
            label="Kom ihåg mig"
            />
            <Box display="flex" gap={1}>
                <Button 
                //type="submit"
                disabled={pending} 
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
                Skapa konto
                </Button>
            </Box>
         </Box>

        <Grid container justifyContent='space-between' sx={{mt: 1}}>
            <Grid>
                <Link component={NextLink} href="/login" variant="body2">
                    Har du redan ett konto? Logga in
                </Link>
            </Grid>
            <Grid>
                <Link component={NextLink} href="/forgot" variant="body2">
                    Glömt lösenord?
                </Link>
            </Grid> 
        </Grid>
    </Container>

    
  );
}

export default Register;