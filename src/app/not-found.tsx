import Link from "next/link";
import { Button, Container, Typography } from "@mui/material";
import Animation404 from "../../components/404/animation";
import Text from "../../components/404/text";
import Btns from "../../components/404/btns";

export default function Custom404() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Animation404 />
      <Text />
      <Btns />
    </Container>
  );
}
