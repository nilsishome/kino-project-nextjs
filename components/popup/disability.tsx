import { Box, Button, Typography } from "@mui/material";

type Props = {
  handleDisabilityMessage: (state: boolean) => void;
};

const Disability: React.FC<Props> = ({ handleDisabilityMessage }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#1A323C",
        border: "2px solid #fff",
        borderRadius: "1rem",
        width: { xs: "100%", md: "60%" },
        margin: "2rem auto",
        padding: "10%",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.4rem", sm: "1.75rem" },
        }}
      >
        Du har valt en plats för besökare med funktionsnedsättning och dess
        ledsagare.
      </Typography>
      <Typography
        variant="h2"
        sx={{
          marginTop: { xs: "1rem", md: "0" },
          fontSize: { xs: "1.4rem", sm: "1.75rem" },
        }}
      >
        Vänligen kontakta 021 xxxx..
      </Typography>

      <Button
        sx={{
          display: "block",
          padding: "0.5rem 1.5rem",
          margin: "4rem auto 0 auto",
          border: "2px solid #fff",
          borderRadius: "1rem",
          fontWeight: "600",
        }}
        onClick={() => handleDisabilityMessage(false)}
      >
        Tillbaka
      </Button>
    </Box>
  );
};

export default Disability;
