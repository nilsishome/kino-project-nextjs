import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { poppinsRegular } from "../theme";
import { yesteryear } from "../theme";
import { Toaster } from "sonner";
import theme from "../theme";
import Header from "../../layout/header";
import Footer from "../../layout/footer";

export const metadata: Metadata = {
  title: "Kino project - Next JS",
  description: "Kino project",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={`${poppinsRegular.className} ${yesteryear.className}`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Header />
            <Toaster />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
