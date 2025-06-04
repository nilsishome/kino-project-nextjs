import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Btns() {
  return (
    <Link href="/" passHref>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Go back home
      </Button>
    </Link>
  );
}
