import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Header from "../../layout/header";
import Footer from "../../layout/footer";

export const metadata: Metadata = {
  title: "Kino project - Next JS",
  description: "Kino project",
};

export default function RootLayout(props: { children: any; }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Header></Header>
              {props.children}
            <Footer></Footer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}


