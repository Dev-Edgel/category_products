import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, CssBaseline } from "@mui/material";
import CartProvider from "@/modulos/compras/context/CartProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <CssBaseline />
        <Box sx={{ backgroundColor: '#d3d3d3', minHeight: '100vh' }}>
          <Component {...pageProps} />
        </Box>
      </CartProvider>
    </>
  );
}
