
import React from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Container } from "@mui/material";

export default function footer() {
  return (
    <footer
      style={{ paddingTop: "5rem"}}
      className='footer'
    >
      <Box className='footer__screen'>
        <Image
          src='/filmduk.png'
          alt='Illustration of a screen'
          width={1280}
          height={200}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
            textAlign: "center",
            paddingTop: "2rem",
          }}
        />
      </Box>

      <Box className='footer__seats'>
        <Image
          src='/stolar.png'
          alt='Illustration of a movie theater'
          width={1280}
          height={200}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ pt: "1.5rem", pb: "1.5rem" }}>
        <Grid container spacing={2}>
            {/* Första kolumnen */}
          <Grid size={{ xs: 6, sm: 3}}>
            <Box textAlign="left">
              <Typography variant="h3" sx={{ color: 'text.primary'}}>Kontakt</Typography>
              <Box component="ul" sx={{ fontSize:  "0.9rem", listStyle: "none", padding: 0, color: 'text.primary', marginTop: '0.2rem'}}>
                <li>RETRO - filmer från förr -</li>
                <li>Fiskartorget 1</li>
                <li>722 12 Västerås</li>
                <li>Tel: 123 45 56</li>
              </Box>
            </Box>
          </Grid>
          
          {/* Andra kolumnen */}
          <Grid size={{ xs: 6, sm: 3}}>
            <Box textAlign="left">
              <Typography variant="h3" sx={{ color: 'text.primary'}}>För företag</Typography>
              <Box component="ul" sx={{ fontSize:  "0.9rem", listStyle: "none", padding: 0, marginTop: '0.2rem'}}>
                <li><Link href="#">Företagsbiljetter</Link></li>
                <li><Link href="#">Möten och event</Link></li>
                <li><Link href="#">Bioreklam</Link></li>
              </Box>
            </Box>
          </Grid>
          
          {/* Tredje kolumnen */}
          <Grid size={{ xs: 6, sm: 3}}>
            <Box textAlign="left">
              <Typography variant="h3" sx={{ color: 'text.primary'}}>Hjälp</Typography>
              <Box component="ul" sx={{ fontSize:  "0.9rem", listStyle: "none", padding: 0, color: 'text.primary', marginTop: '0.2rem'}}>
                <li><Link href="#">Vanliga frågor</Link></li>
                <li><Link href="#">Kundservice</Link></li>
                <li><Link href="#">Cookiepolicy</Link></li>
                <li><Link href="#">Personliguppgiftspolicy</Link></li>
                <li><Link href="#">Kontakta oss</Link></li>
              </Box>
            </Box>
          </Grid>
          
          {/* Fjärde kolumnen */}
          <Grid size={{ xs: 6, sm: 3 }}>
            <Box textAlign="left">
              <Typography variant="h3" sx={{ color: 'text.primary'}}>Sociala medier</Typography>
              <Box component="ul" sx={{ fontSize: "0.9rem", listStyle: "none", padding: 0, color: 'text.primary', marginTop: '0.2rem'}}>
                <li><Link href="#">Facebook</Link></li>
                <li><Link href="#">Instagram</Link></li>
                <li><Link href="#">TikTok</Link></li>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>


      <Box
        sx={{
          textAlign: "center",
          p: "0.1rem",
          bgcolor: "#70A2AA;",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '.8rem', textAlign: 'center', color: 'black', padding: ".5rem"}}>&copy; 2025 Kino Project. All rights reserved.</Typography>
      </Box>
    </footer>
  );
}
